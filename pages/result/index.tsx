import { Box, Button, Typography } from "@material-ui/core"
import CheckIcon from "@material-ui/icons/Check"
import axios from "axios"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
// import { useRouter } from "next/router"
import React from "react"
import HeadPage from "../../components/Head"
import Progress from "../../components/Progress"
import nextI18NextConfig from "../../next-i18next.config.js"
import Error from "../_error"
import useStyles from "./style"

interface IInfo {
  account: string
  balance: string
  ObjectInfo: any
  billItems: []
  afBalance: string
  total: string
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(
      locale,
      ["result", "resultCode"],
      nextI18NextConfig
    )),
  },
})

const resultPage = () => {
  const { t } = useTranslation()
  const classes = useStyles()
  // const router = useRouter()
  const [errCode, setErrCode] = React.useState<number>(0)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [data, setData] = React.useState<IInfo>({
    account: "",
    balance: "",
    afBalance: "",
    ObjectInfo: {},
    billItems: [],
    total: "",
  })

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

  const hanldeFinish = async () => {
    setLoading(true)
    localStorage.removeItem("selectedData")
    history.go(-2)
    // router.back()
    // router.back()
    // router.push(`/${router.locale}/inquiry`)
  }

  if (errCode) {
    return <Error statusCode={errCode} />
  }

  return (
    <Box minHeight="100vh" height="100%" bgcolor="#f2f2f4" padding={1.5}>
      <HeadPage />
      {data ? (
        <Box>
          <Box
            bgcolor="#FFFFFF"
            boxShadow="1px 1px 10px 1px #c0c0c052"
            padding={2}
            borderRadius={5}
          >
            <Box
              textAlign="center"
              borderBottom="2px dashed rgb(192 192 192 / 51%)"
            >
              <CheckIcon className={classes.successIcon} color="primary" />
              <Typography color="primary" className={classes.successText}>
                {t("result:success")}!
              </Typography>
            </Box>
            <Box
              borderBottom="1px solid #c0c0c073"
              paddingY={2}
              display="flex"
              justifyContent="space-between"
            >
              <Typography className={classes.contentTitle}>
                {t("result:cusId")}
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
                {t("result:cusName")}
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
                {t("result:sourceAcc")}
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
                {t("result:payAmount")}
              </Typography>
              <Typography color="primary" className={classes.totalInfo}>
                {data.total}
              </Typography>
            </Box>
            <Box
              borderBottom="1px solid #c0c0c073"
              paddingY={2}
              display="flex"
              justifyContent="space-between"
            >
              <Typography className={classes.contentTitle}>
                {t("result:afBa")}
              </Typography>
              <Typography className={classes.info}>{data.afBalance}</Typography>
            </Box>
            <Box paddingTop={2} display="flex" justifyContent="space-between">
              <Typography className={classes.contentTitle}>
                {t("result:payFee")}
              </Typography>
              <Typography className={classes.info}>0 VNĐ</Typography>
            </Box>
          </Box>
          <Box marginX={1} marginTop={2} textAlign="center">
            <Button
              onClick={hanldeFinish}
              fullWidth={true}
              disabled={loading}
              className={classes.btn}
              variant="contained"
            >
              {t("result:confirm")}
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

export default resultPage
