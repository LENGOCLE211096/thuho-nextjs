import {
  Box,
  Button,
  FormControl,
  Select,
  TextField,
  Typography,
} from "@material-ui/core"
// import { withStyles } from "@material-ui/core/styles"
// import AccountBoxIcon from "@material-ui/icons/AccountBox"
import PersonIcon from "@material-ui/icons/Person"
import axios from "axios"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { FaChevronDown } from "react-icons/fa"
import HeadPage from "../../components/Head"
import SimpleModal from "../../components/Modal"
import Progress from "../../components/Progress"
import { formatMoney, myLoader } from "../../hooks"
import { IAccount } from "../../interfaces/account.interfaces"
import nextI18NextConfig from "../../next-i18next.config.js"
import { resultCodeInquiry } from "../../utils/resultCode"
import Error from "../_error"
import useStyles from "./styles"

// const WhiteTooltip = withStyles({
//   tooltip: {
//     border: "none",
//     borderRadius: 10,
//     boxShadow: "1px 1px 10px 1px rgba(0,0,0,.5)",
//     color: "black",
//     backgroundColor: "white",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 15,
//     marginRight: 7,
//   },
//   arrow: {
//     fontSize: 8,
//     color: "white",
//     // filter: "drop-shadow(1px 1px 10px rgba(0,0,0,.6))",
//   },
// })(Tooltip)

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["inquiry", "resultCode"],
        nextI18NextConfig
      )),
    },
  }
}

function Home() {
  const { t } = useTranslation()
  // const dispatch = useDispatch()
  const selectedData = JSON.parse(
    localStorage.getItem("selectedData") as string
  )
  // const wrapperRef = React.useRef<any>(null)
  const router = useRouter()
  const classes = useStyles()
  const [inquiryErr, setInquiryErr] = React.useState<string>("")
  const [captchaCode, setCaptchaCode] = React.useState<string>("")
  const [selectedSchool, setSelectedSchool] = React.useState<number>(
    selectedData ? selectedData.selectedSchool : 0
  )
  const [selectedFee, setSelectedFee] = React.useState<number>(
    selectedData ? selectedData.selectedFee : 0
  )
  const [account, setAccount] = React.useState<string>()
  const [errCode, setErrCode] = React.useState<number>(0)
  const [balance, setBalance] = React.useState<string>()
  const [accountList, setAccountList] = React.useState<IAccount[]>([])
  const [searchValue, setSearchValue] = React.useState<string>(
    selectedData ? selectedData.cusId : ""
  )
  const [loading, setLoading] = React.useState<boolean>(false)
  const [captchaErr, setCaptchaErr] = React.useState<string>("")
  const [currentUser, setCurrentUser] = React.useState<string>()
  // const [openTootip, setOpenTooltip] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [got, setGot] = React.useState<boolean>(false)

  // const handleTooltipOpen = () => {
  //   setOpenTooltip(!openTootip)
  // }

  // const handleTooltipClose = () => {
  //   setOpenTooltip(false)
  // }

  const getAccountList = async (
    accountSelected: string,
    balanceSelected: string
  ) => {
    const account = await axios.get("/hocphi/api/account")
    // console.log(AccountType)
    if (!account.data.errCode) {
      setErrCode(0)
      setAccountList(account.data)
      if (account.data.length) {
        setAccount(
          accountSelected ? accountSelected : account.data[0].accountNo
        )
        setBalance(balanceSelected ? balanceSelected : account.data[0].balance)
      }
      setGot(true)
    } else {
      setErrCode(500)
    }
  }

  const getInquiry = async (cusId: string, accountNumber: string) => {
    setSearchValue(cusId)
    setLoading(true)
    const res = await axios.post("/hocphi/api/inquiry", {
      cusId,
      selectedFee,
      accountNumber,
      selectedSchool,
      balance,
    })
    if (!res.data.errCode) {
      localStorage.setItem("inquiryData", JSON.stringify(res.data))
      localStorage.setItem(
        "selectedData",
        JSON.stringify({
          cusId,
          selectedFee,
          selectedSchool,
        })
      )
      router.push("/detail")
    } else {
      const errCode = resultCodeInquiry(res.data.errCode)
      setInquiryErr(errCode)
      setLoading(false)
    }
  }

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    // setSearched(true)
    e.preventDefault()
    const check = /^[A-Za-z0-9_.]+$/
    if (currentUser === "") {
      if (captchaCode) {
        if (selectedFee == 0 && selectedSchool == 0) setInquiryErr("02406")
        else if (selectedFee == 0) setInquiryErr("00306")
        else if (selectedSchool == 0) setInquiryErr("01302")
        else if (searchValue === "") setInquiryErr("10010")
        else if (!check.test(searchValue)) setInquiryErr("096")
        else {
          getInquiry(searchValue, account as string)
          setInquiryErr("")
        }
        setCaptchaErr("")
        setCaptchaCode("")
        grecaptcha.reset()
      } else {
        setCaptchaErr(t("inquiry:emptyCaptcha"))
      }
    } else {
      // if (currentUser.state === 1) {
      if (accountList.length === 0) setInquiryErr("02405")
      else if (selectedFee == 0 && selectedSchool == 0) setInquiryErr("02406")
      else if (selectedFee == 0) setInquiryErr("00306")
      else if (selectedSchool == 0) setInquiryErr("01302")
      else if (searchValue === "") setInquiryErr("10010")
      else if (!check.test(searchValue)) setInquiryErr("096")
      else {
        getInquiry(searchValue, account as string)
        setInquiryErr("")
      }
    }
  }

  const getUser = async () => {
    const userResponse = await axios.get("/hocphi/api/user")
    if (!userResponse.data.err) {
      setErrCode(0)
      setCurrentUser(userResponse.data.user)
      userResponse.data.user !== "" &&
        getAccountList(userResponse.data.account, userResponse.data.balance)
    } else {
      setErrCode(401)
    }
  }

  React.useEffect(() => {
    getUser()
    localStorage.removeItem("inquiryData")
    localStorage.removeItem("billData")

    // function handleClickOutside(event: any) {
    //   if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
    //     // handleTooltipClose()
    //   }
    // }

    // // Bind the event listener
    // document.addEventListener("mousedown", handleClickOutside)
    // return () => {
    //   // Unbind the event listener on clean up
    //   document.removeEventListener("mousedown", handleClickOutside)
    // }
  }, [router.isReady])

  const handleAccount = (value: string): void => {
    setAccount(value)
    const currentAccount = accountList.find((x) => x.accountNo === value)
    setBalance(currentAccount?.balance)
  }

  const onChangeCaptcha = (value: any) => {
    setCaptchaCode(value)
  }

  if (errCode) {
    return <Error statusCode={errCode} />
  }

  return (
    <Box>
      <HeadPage />
      <SimpleModal
        open={openModal}
        handleModal={() => setOpenModal(!openModal)}
      />
      <form onSubmit={handleSearch}>
        <Box minHeight="100vh" height="100%" bgcolor="#f2f2f4">
          {currentUser !== "" && (
            <Box bgcolor="white" padding={1.7}>
              <Box display="flex" alignItems="center">
                <PersonIcon className={classes.icon} />
                <Typography className={classes.title}>
                  {t("inquiry:baseAcc")}
                </Typography>
              </Box>
              <Box marginTop={1}>
                <FormControl
                  fullWidth={true}
                  // variant="outlined"
                  className={
                    accountList.length ? classes.formControl : classes.noAcc
                  }
                  size="small"
                >
                  <Select
                    onChange={(e: any) => handleAccount(e.target.value)}
                    disabled={accountList.length ? false : true}
                    value={account}
                    className={classes.selectAcc}
                    disableUnderline
                    native
                    IconComponent={FaChevronDown}
                  >
                    {accountList?.map((acc, index) => (
                      <option key={index} value={acc.accountNo}>
                        {acc.accountNo}
                      </option>
                    ))}
                    {got && accountList.length === 0 && (
                      <option value="0">{t("inquiry:accErr")}</option>
                    )}
                  </Select>
                  {accountList.length !== 0 && (
                    <Box
                      bgcolor="#ff00000f"
                      paddingX={1.5}
                      paddingY={1}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography className={classes.balance}>
                        {t("inquiry:balance")}
                      </Typography>
                      <Typography className={classes.balanceRight}>
                        {formatMoney(Number(balance))}
                      </Typography>
                    </Box>
                  )}
                  {/* {!accountList.length && (
                    <Typography className={classes.payErr}>
                      {t("inquiry:accErr")}
                    </Typography>
                  )} */}
                </FormControl>
              </Box>
            </Box>
          )}
          <Box bgcolor="white" padding={1.7} marginTop={2}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Image
                  loader={myLoader}
                  src="/hocphi/money_tit.svg"
                  width={20}
                  height={20}
                />
                <Typography className={classes.title}>
                  {t("inquiry:accInfo")}
                </Typography>
              </Box>
              {/* <WhiteTooltip
                    ref={wrapperRef}
                    title={
                      <Box>
                        <Typography className={classes.tooltipTitle}>
                          Chọn nhà cung cấp (Chọn trường học cần thanh toán học
                          phí):
                        </Typography>
                        <Typography className={classes.tooltipContent}>
                          Lựa chọn trường học cần thanh toán trong danh sách.
                        </Typography>
                        <Typography className={classes.tooltipTitle}>
                          Chọn loại phí:
                        </Typography>
                        <Typography className={classes.tooltipContent}>
                          Chọn loại học phí cần thanh toán
                        </Typography>
                        <Typography className={classes.tooltipTitle}>
                          Mã khách hàng:
                        </Typography>
                        <Typography className={classes.tooltipContent}>
                          Nhập mã sinh viên/ mã nhập học/ mã học sinh/ mã thanh
                          toán… do nhà trường cung cấp.
                        </Typography>
                      </Box>
                    }
                    // placement="right"
                    // onClose={handleTooltipClose}
                    open={openTootip}
                    arrow
                  > */}
              <Box
                bgcolor="rgb(255 0 0 / 18%)"
                className={classes.infoIcon}
                onClick={() => setOpenModal(!openModal)}
              >
                <Typography className={classes.infoIconText}>i</Typography>
              </Box>
              {/* </WhiteTooltip> */}
            </Box>
            <Box marginTop={1}>
              <FormControl
                fullWidth={true}
                size="small"
                // variant="outlined"
                className={classes.formControl}
              >
                {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                <Select
                  IconComponent={FaChevronDown}
                  onChange={(event) => {
                    setSelectedSchool(Number(event.target.value))
                  }}
                  native
                  className={classes.select}
                  disableUnderline
                  value={selectedSchool}
                  // displayEmpty
                  // renderValue={
                  //   selectedSchool !== 0
                  //     ? undefined
                  //     : () => <Box>{t("inquiry:chooseSup")}</Box>
                  // }
                >
                  <option hidden value={0}>
                    {t("inquiry:chooseSup")}
                  </option>
                  <option value={1}>{t("inquiry:collect1")}</option>
                </Select>
              </FormControl>
            </Box>
            <Box marginTop={2}>
              <FormControl
                fullWidth={true}
                size="small"
                // variant="outlined"
                className={classes.formControl}
              >
                <Select
                  IconComponent={FaChevronDown}
                  onChange={(event) => {
                    setSelectedFee(Number(event.target.value))
                  }}
                  native
                  // displayEmpty
                  // renderValue={
                  //   selectedSchool !== 0
                  //     ? undefined
                  //     : () => <Box>{t("inquiry:choose")}</Box>
                  // }
                  className={classes.select}
                  disableUnderline
                  value={selectedFee}
                >
                  <option hidden value={0}>
                    {t("inquiry:choose")}
                  </option>
                  <option value={1}>{t("inquiry:loan1")}</option>
                  <option value={2}>{t("inquiry:loan2")}</option>
                  <option value={9}>{t("inquiry:loan3")}</option>
                </Select>
              </FormControl>
            </Box>
            <Box marginTop={2} marginBottom={3}>
              <Box
                // display={currentUser.state != 2 ? "flex" : "block"}
                display="flex"
                justifyContent="space-between"
                // justifyContent={
                //   currentUser.state != 2 ? "space-between" : "none"
                // }
              >
                <TextField
                  placeholder={t("inquiry:cusId")}
                  size="small"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  fullWidth={true}
                  className={classes.formControl}
                  error={inquiryErr != "" ? true : false}
                  helperText={
                    inquiryErr != "" && t(`resultCode:inquiry_${inquiryErr}`)
                  }
                  InputProps={{
                    classes: {
                      input: classes.input,
                    },
                  }}
                  variant="outlined"
                />
                {/* <AccountBoxIcon className={classes.cusIcon} /> */}
              </Box>
              {currentUser === "" && (
                <Box marginY={2}>
                  <ReCAPTCHA
                    sitekey="6LcdANkcAAAAANyKTqMAOCutgHZR-84cPRzayBx3"
                    onChange={onChangeCaptcha}
                  />
                  <Typography className={classes.payErr}>
                    {captchaErr != "" ? captchaErr : ""}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Box paddingY={3} paddingX={1.7} textAlign="center">
            <Button
              fullWidth={true}
              type="submit"
              disabled={accountList.length > 0 ? false : loading}
              //   onClick={handleRecieveOtp}
              className={classes.btn}
              variant="contained"
            >
              {t("inquiry:continue")}
            </Button>
          </Box>
          {loading && <Progress bg="rgb(0 0 0 / 16%)" />}
        </Box>
      </form>
    </Box>
  )
}

export default Home
