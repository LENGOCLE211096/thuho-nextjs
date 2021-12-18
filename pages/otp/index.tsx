import { Box, Button, TextField, Typography } from "@material-ui/core"
import axios from "axios"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { useRouter } from "next/router"
import React, { useRef } from "react"
import HeadPage from "../../components/Head"
import Progress from "../../components/Progress"
import { formatMoney } from "../../hooks"
import nextI18NextConfig from "../../next-i18next.config.js"
import { resultCodePayment } from "../../utils/resultCode"
import Error from "../_error"
import useStyles from "./styles"

const myLoader = ({ src, width, quality }: any) => {
  return `${window.location.protocol}//${
    window.location.host
  }/${src}?w=${width}&q=${quality || 75}`
}

interface IOtb {
  name: string
  value: string
}

interface IInfo {
  account: string
  balance: string
  ObjectInfo: any
  billItems: []
  total: string
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ["otp", "resultCode"],
      nextI18NextConfig
    )),
  },
})

const OtpPage = () => {
  const { t } = useTranslation()
  const billData = JSON.parse(localStorage.getItem("billData") as string)

  const router = useRouter()
  const classes = useStyles()
  const [verifyOtpErr, setVerifyOtpErr] = React.useState<string>("")
  const [paymentErr, setPaymentErr] = React.useState<string>("")
  const [errCode, setErrCode] = React.useState<number>(0)
  const inputRefs = useRef<HTMLInputElement[]>([])
  const [loading, setLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<IInfo>({
    account: "",
    balance: "",
    ObjectInfo: {},
    billItems: [],
    total: "",
  })
  const [otb, setOtb] = React.useState<IOtb[]>([
    { name: "otb1", value: "" },
    { name: "otb2", value: "" },
    { name: "otb3", value: "" },
    { name: "otb4", value: "" },
    { name: "otb5", value: "" },
    { name: "otb6", value: "" },
  ])

  const changeTextFocus = (index: number) => {
    const ref = inputRefs.current[index]
    if (ref) {
      ref.focus()
    }
  }

  const onKeyDownOtp = (e: any, index: number) => {
    const { value } = e.target
    if (e.keyCode === 8 && value == "") {
      changeTextFocus(index - 1)
    }
  }

  const handleChangeOtb = (e: any, index: number) => {
    const { value, name } = e.target
    if (value.length <= 1) {
      setOtb([
        ...otb.slice(0, index),
        { name: name, value: value },
        ...otb.slice(index + 1),
      ])
      if (e.nativeEvent.inputType === "deleteContentBackward") {
        return
      }
      if (value == "") {
        changeTextFocus(index - 1)
      } else {
        changeTextFocus(index + 1)
      }
    }
    // (index < otb.length-1) ? changeTextFocus(index + 1) : changeTextFocus(0)
  }

  const getData = async () => {
    const userResponse = await axios.get("/hocphi/api/user")
    if (userResponse.data.user) {
      const res = await axios.get("/hocphi/api/getInfo")
      if (res.data.err) {
        setErrCode(500)
      } else {
        setErrCode(0)
        setData(res.data)
      }
    } else {
      setErrCode(401)
    }
  }

  React.useEffect(() => {
    getData()
  }, [])

  const getLimit = (resCode: string, limitData: any) => {
    switch (resCode) {
      case "600002":
        return limitData.serviceTransactionLimit
      case "600003":
        return limitData.accountDailyLimitRemain
      case "600004":
        return limitData.serviceDailyLimitRemain
      case "600008":
        return limitData.userTransactionLimit
      case "600009":
        return limitData.userDailyLimitRemain
      case "117055":
        return limitData.userDailyLimitRemain
      default:
        return limitData.serviceTransactionLimit
    }
  }

  const handleCheckOut = async () => {
    let finalOtp = ""
    for (const i of otb) {
      finalOtp += i.value
    }
    if (finalOtp.length === 0) {
      setVerifyOtpErr(t(`resultCode:verifyOtp_10009`))
    } else if (finalOtp.length < 6) {
      setVerifyOtpErr(t(`resultCode:verifyOtp_10010`))
    } else {
      setPaymentErr("")
      setVerifyOtpErr("")
      setLoading(true)
      setVerifyOtpErr("")
      // const sending = {
      //   total: data.total,
      //   otp: finalOtp,
      //   accountNumber: data.account,
      // }
      // const verifyOtp = await axios.post("/hocphi/api/verifyOtp", sending)
      // if (!verifyOtp.data.errCode) {
      const req = {
        ObjectInfo: data.ObjectInfo,
        billItems: billData,
        // amount: data.total,
        accountOtp: finalOtp,
      }
      const payment = await axios.post("/hocphi/api/payment", req)
      if (!payment.data.errCode) {
        router.replace("/result")
      } else {
        setLoading(false)
        const errCodePayment = resultCodePayment(payment.data.errCode)
        if (errCodePayment === "20022") {
          const resCode = resultCodePayment(
            JSON.parse(payment.data.data).responseCode
          )
          if (
            resCode == "117031" ||
            resCode == "117032" ||
            resCode == "117003"
          ) {
            setPaymentErr(t(`resultCode:payment_${resCode}`))
          } else {
            setPaymentErr(
              t(`resultCode:payment_200221`) +
                " " +
                data.total +
                " " +
                t(`resultCode:payment_${resCode}`) +
                " " +
                formatMoney(
                  Number(getLimit(resCode, JSON.parse(payment.data.data)))
                )
            )
          }
        } else {
          setPaymentErr(t(`resultCode:payment_${errCodePayment}`))
        }
      }
      // } else {
      //   setLoading(false)
      //   const errCodeVerifyOtp = resultCodeVerifyOtp(verifyOtp.data.errCode)
      //   setVerifyOtpErr(t(`resultCode:verifyOtp_${errCodeVerifyOtp}`))
      // }
    }
  }

  if (errCode) {
    return <Error statusCode={errCode} />
  }

  return (
    <Box minHeight="100vh" height="100%" bgcolor="#f2f2f4">
      <HeadPage />
      {data ? (
        <Box>
          <Box marginTop={1} marginBottom={2} bgcolor="white" padding={2}>
            <Box display="flex" alignItems="center">
              <Image
                loader={myLoader}
                src="/hocphi/money_tit.svg"
                width={20}
                height={20}
              />
              <Typography className={classes.title}>
                {t("otp:infor")}
              </Typography>
            </Box>
            <Box
              marginTop={1}
              borderBottom="1px solid #c0c0c073"
              paddingY={2}
              display="flex"
              justifyContent="space-between"
            >
              <Typography className={classes.contentTitle}>
                {t("otp:cusId")}
              </Typography>
              <Typography className={classes.info}>
                {data.ObjectInfo.MaDoiTuong}
              </Typography>
            </Box>
            <Box
              borderBottom="1px solid #c0c0c073"
              paddingY={2}
              display="flex"
              justifyContent="space-between"
            >
              <Typography className={classes.contentTitle}>
                {t("otp:cusName")}
              </Typography>
              <Typography className={classes.info}>
                {data.ObjectInfo.HoVaTen}
              </Typography>
            </Box>
            <Box
              borderBottom="1px solid #c0c0c073"
              marginTop={1}
              paddingY={2}
              display="flex"
              justifyContent="space-between"
            >
              <Typography className={classes.contentTitle}>
                {t("otp:sourceAcc")}
              </Typography>
              <Typography className={classes.info}>{data.account}</Typography>
            </Box>
            <Box
              borderBottom="1px solid #c0c0c073"
              paddingY={2}
              display="flex"
              justifyContent="space-between"
            >
              <Typography className={classes.contentTitle}>
                {t("otp:avaBa")}
              </Typography>
              <Typography className={classes.info}>{data.balance}</Typography>
            </Box>
            <Box
              borderBottom="1px solid #c0c0c073"
              paddingY={2}
              display="flex"
              justifyContent="space-between"
            >
              <Typography className={classes.contentTitle}>
                {t("otp:payAmount")}
              </Typography>
              <Typography color="primary" className={classes.totalInfo}>
                {data.total}
              </Typography>
            </Box>
            <Box paddingTop={2} display="flex" justifyContent="space-between">
              <Typography className={classes.contentTitle}>
                {t("otp:payFee")}
              </Typography>
              <Typography className={classes.info}>0 VNĐ</Typography>
            </Box>
          </Box>
          <Box marginTop={2} bgcolor="white" padding={2}>
            <Box display="flex" alignItems="center">
              <Image
                loader={myLoader}
                src="/hocphi/pass_tit.svg"
                width={20}
                height={18}
              />
              <Typography className={classes.moneyTitle}>
                {t("otp:tranPass")}
              </Typography>
              <Typography className={classes.sms}>{t("otp:sms")}</Typography>
            </Box>
            <Box marginTop={2.5}>
              <Typography className={classes.otbTitle}>
                {t("otp:otp")}:
              </Typography>
              <Box
                maxWidth={343}
                margin="auto"
                marginTop={2}
                display="flex"
                justifyContent="space-between"
              >
                {otb.map((o, index) => (
                  <TextField
                    type="number"
                    key={index}
                    inputRef={(el) => {
                      if (el) {
                        inputRefs.current[index] = el
                      }
                    }}
                    name={o.name}
                    value={o.value}
                    onKeyDown={(e) => onKeyDownOtp(e, index)}
                    onChange={(e) => handleChangeOtb(e, index)}
                    onFocus={(e) => e.target.select()}
                    className={classes.otbText}
                    variant="outlined"
                    size="small"
                    placeholder="_"
                    inputProps={{ min: 0, style: { textAlign: "center" } }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
          <Box marginX={1.5} marginTop={2} textAlign="center">
            <Typography className={classes.err}>
              {(verifyOtpErr != "" && verifyOtpErr) ||
                (paymentErr != "" && paymentErr)}
            </Typography>
            <Button
              fullWidth={true}
              onClick={handleCheckOut}
              disabled={loading}
              className={classes.btn}
              variant="contained"
            >
              {t("otp:confirm")}
            </Button>
          </Box>
          {loading && <Progress bg="rgb(0 0 0 / 16%)" />}
        </Box>
      ) : (
        <Progress bg="white" />
      )}
    </Box>
  )
}

export default OtpPage
