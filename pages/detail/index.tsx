import {
  Box,
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  // Tooltip,
  Typography,
} from "@material-ui/core"
// import { withStyles } from "@material-ui/core/styles"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import axios from "axios"
import copy from "clipboard-copy"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import React, { useState } from "react"
import HeadPage from "../../components/Head"
import Progress from "../../components/Progress"
// import { Receiver } from "../../config/account"
import { formatMoney, getTotal, removeAccents } from "../../hooks"
// import { IAccount } from "../../interfaces/account.interfaces"
import nextI18NextConfig from "../../next-i18next.config.js"
import { resultCodeCreateOtp } from "../../utils/resultCode"
import Error from "../_error"
import useStyles from "./styles"

// const WhiteTooltip = withStyles({
//   tooltip: {
//     border: "none",
//     borderRadius: 10,
//     boxShadow: "1px 1px 10px 1px gray",
//     color: "black",
//     backgroundColor: "white",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 15,
//   },
//   arrow: {
//     fontSize: 15,
//     borderTop: "1px solid white",
//     color: "#c0c0c080;",
//   },
// })(Tooltip)

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["detail", "resultCode"],
        nextI18NextConfig
      )),
    },
  }
}

function Home() {
  const inquiryData = JSON.parse(localStorage.getItem("inquiryData") as string)
  const selectedData = JSON.parse(
    localStorage.getItem("selectedData") as string
  )
  const { t } = useTranslation()
  const router = useRouter()
  const classes = useStyles()
  // const loading = useSelector((state: any) => state.loading)
  const [loading, setLoading] = useState<boolean>(false)
  // const [inquiryData, setInquiryData] = useState<any>()
  // const inquiryData = useSelector((state: any) => state.inquiryData)
  const [paymentContent, setPaymentContent] = useState<string>("")
  // const [selectedSchool, setSelectedSchool] = React.useState<number>(0)
  // const [account, setAccount] = React.useState<string>()
  const [errCode, setErrCode] = React.useState<number>(0)
  const [balance, setBalance] = React.useState<string>()
  const [checkedBill, setCheckedBill] = React.useState<any>([])
  // const [accountList, setAccountList] = React.useState<IAccount[]>([])
  const [chooseBill, setChooseBill] = React.useState<boolean>(false)
  const [total, setTotal] = React.useState<string>("0 VND")
  const [errCodeCreateOtp, setErrCodeCreateOtp] = React.useState<string>("")
  const [shared, setShared] = React.useState<string>("")
  const [currentUser, setCurrentUser] = React.useState<string>("")

  // const [openTootip, setOpenTooltip] = React.useState<boolean>(false)
  // // const [got, setGot] = React.useState<boolean>(false)

  // const handleTooltipOpen = () => {
  //   setOpenTooltip(true)
  // }

  // const handleTooltipClose = () => {
  //   setOpenTooltip(false)
  // }

  const getInquiryData = async () => {
    const billData = inquiryData.billItems.filter(
      (data: any) =>
        removeAccents(data.billDetail).toLowerCase().indexOf("bao hiem") === -1
    )
    setCheckedBill(billData)
    setTotal(getTotal(billData))
    let billSeriesStr = ""

    inquiryData.billItems.reduce((res: any, val: any) => {
      if (!res[val.billSeries.slice(1).slice(1)]) {
        res[val.billSeries.slice(1).slice(1)] = val.billSeries.slice(1).slice(1)
        billSeriesStr += res[val.billSeries.slice(1).slice(1)] + " "
      }
      return res
    }, {})
    const narrative =
      inquiryData.address.ObjectInfo.LoaiPhi == "2"
        ? `${inquiryData.address.ObjectInfo.MaDoiTuong} ${
            inquiryData.address.ObjectInfo.HoVaTen
          } Nop tien ${billSeriesStr.substring(0, billSeriesStr.length - 1)}`
        : inquiryData.address.ObjectInfo.LoaiPhi == "1"
        ? `${inquiryData.address.ObjectInfo.MaDoiTuong} ${inquiryData.address.ObjectInfo.HoVaTen} Nop phi nhap hoc`
        : ""
    setPaymentContent(narrative)
  }

  const getAccountList = async () => {
    const userResponse = await axios.get("/hocphi/api/user")
    if (!userResponse.data.err) {
      setCurrentUser(userResponse.data.user)
      // const currentSelecting = await axios.get("/hocphi/api/selected")
      // if (currentSelecting.data.err) {
      //   setErrCode(500)
      // } else {
      setBalance(userResponse.data.balance)
      getInquiryData()
      // setSelectedSchool(currentSelecting.data.supplier)
      // if (userResponse.data.user !== "") {
      // const account = await axios.get("/hocphi/api/account")
      // if (!account.data.errCode) {
      // setErrCode(0)
      // setAccountList(account.data)
      // if (account.data.length) {
      // const currentBalance = account.data.filter(
      //   (data: any) => data.accountNo == userResponse.data.account
      // )
      // setAccount(currentSelecting.data.account)
      // setBalance(currentBalance[0].balance)
      // }
      // setGot(true)
      // } else {
      //   setErrCode(500)
      // }

      // }
    } else {
      setErrCode(401)
    }
  }

  const handleCheckedAll = (): void => {
    setChooseBill(false)
    const billData = inquiryData.billItems.filter(
      (data: any) =>
        removeAccents(data.billDetail).toLowerCase().indexOf("bao hiem") === -1
    )
    setCheckedBill(
      checkedBill.length === inquiryData.billItems?.length
        ? billData
        : inquiryData.billItems
    )
    setTotal(
      checkedBill.length === inquiryData.billItems?.length
        ? getTotal(billData)
        : getTotal(inquiryData.billItems)
    )
  }

  const handleRecieveOtp = async (e: any) => {
    const objectInforSendding = {
      LoaiPhi: inquiryData.address.ObjectInfo.LoaiPhi,
      IDKhoaChinh: inquiryData.address.ObjectInfo.IDKhoaChinh,
      MaDoiTuong: inquiryData.address.ObjectInfo.MaDoiTuong,
      HoVaTen: inquiryData.address.ObjectInfo.HoVaTen,
    }
    setChooseBill(true)
    if (
      Number(balance) >= Number(total.replace(/\D/g, "")) &&
      checkedBill.length
    ) {
      e.preventDefault()
      setLoading(true)
      const newCheckedBill = checkedBill.map((bill: any) => {
        return { localBillID: bill.localBillID, billValue: bill.billValue }
      })

      const sending = {
        ObjectInfo: objectInforSendding,
        billItems: newCheckedBill,
        balance: formatMoney(Number(balance)),
        // account: account,
        // total: total,
        // afBalance: formatMoney(
        //   Number(balance) - Number(total.replace(/\D/g, ""))
        // ),
      }
      const res = await axios.post("/hocphi/api/createOtp", sending)
      console.log(res)

      if (!res.data.errCode) {
        localStorage.setItem("billData", JSON.stringify(checkedBill))
        router.push("/otp")
      } else {
        const errCode = resultCodeCreateOtp(res.data.errCode)
        setErrCodeCreateOtp(t(`resultCode:createOtp_${errCode}`))
        setLoading(false)
      }
    }
  }

  React.useEffect(() => {
    if (!inquiryData) {
      setErrCode(500)
      return
    }
    getAccountList()
    if (localStorage.getItem("billData")) {
      localStorage.removeItem("billData")
    }
  }, [])

  const handleChecked = (bill: any): void => {
    setChooseBill(false)
    const currentIndex = checkedBill.findIndex(
      (x: any) => x.billNo === bill.billNo
    )
    const newChecked = [...checkedBill]
    currentIndex === -1
      ? newChecked.push(bill)
      : newChecked.splice(currentIndex, 1)

    setCheckedBill(newChecked)
    setTotal(getTotal(newChecked))
  }

  // const handleAccount = (value: string): void => {
  //   setAccount(value)
  //   const currentAccount = accountList.find((x) => x.accountNo === value)
  //   setBalance(currentAccount?.balance)
  // }

  const handleShare = (): void => {
    copy(paymentContent)
    setShared(t("detail:copied"))
  }

  if (errCode) {
    return <Error statusCode={errCode} />
  }

  return (
    <Box>
      <HeadPage />
      <Box minHeight="100vh" height="100%" bgcolor="#f8f9fa" padding={2}>
        {/* <Box>
          <Box display="flex" alignItems="center">
            <PersonIcon className={classes.icon} />
            <Typography className={classes.accTitle}>
              {t("detail:baseAcc")}
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
                  <option value="0">{t("detail:accErr")}</option>
                )}
              </Select>
              {accountList.length !== 0 && (
                <Box
                  bgcolor="#ff00000f"
                  paddingX={1}
                  paddingY={1}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography className={classes.balance}>
                    {t("detail:balance")}
                  </Typography>
                  <Typography className={classes.balanceRight}>
                    {formatMoney(Number(balance))}
                  </Typography>
                </Box>
              )} */}
        {/* {!accountList.length && (
                  <Typography className={classes.payErr}>
                    {t("detail:accErr")}
                  </Typography>
                )} */}
        {/* </FormControl>
          </Box>
        </Box> */}
        {inquiryData && (
          <Box>
            <Box paddingBottom={3}>
              <Box marginTop={1}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop={1}
                >
                  <Typography className={classes.title}>
                    {t("detail:sup")}:
                  </Typography>
                  {selectedData.selectedSchool == 1 && (
                    <Typography>{t("detail:collect1")}</Typography>
                  )}
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop={1}
                >
                  <Typography className={classes.title}>
                    {t("detail:fee")}:
                  </Typography>
                  <Typography>
                    {inquiryData.address.ObjectInfo.LoaiPhi == 1 &&
                      t("detail:loan1")}
                    {inquiryData.address.ObjectInfo.LoaiPhi == 2 &&
                      t("detail:loan2")}
                    {inquiryData.address.ObjectInfo.LoaiPhi == 3 &&
                      t("detail:loan3")}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop={1}
                >
                  <Typography className={classes.title}>
                    {t("detail:cusId")}:
                  </Typography>
                  <Typography>
                    {inquiryData.address.ObjectInfo.MaDoiTuong}
                  </Typography>
                </Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginTop={1}
                >
                  <Typography className={classes.title}>
                    {t("detail:cusName")}:
                  </Typography>
                  <Typography>
                    {inquiryData.address.ObjectInfo.HoVaTen}
                  </Typography>
                </Box>
                <Box marginTop={3}>
                  <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                      <TableHead className={classes.tableHead}>
                        <TableRow>
                          <TableCell>
                            <Typography className={classes.tableTitle}>
                              {t("detail:content")}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography className={classes.tableTitle}>
                              {t("detail:money")}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              display="flex"
                              justifyContent="flex-end"
                              alignItems="center"
                            >
                              <Checkbox
                                disabled={
                                  inquiryData.billItems.findIndex(
                                    (data: any) =>
                                      removeAccents(data.billDetail)
                                        .toLowerCase()
                                        .indexOf("bao hiem") === -1
                                  )
                                    ? false
                                    : true
                                }
                                color="primary"
                                checked={
                                  checkedBill.length ===
                                  inquiryData.billItems.length
                                    ? true
                                    : false
                                }
                                onChange={handleCheckedAll}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {inquiryData.billItems.map(
                          (row: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                {`${row.billDetail} (${row.billSeries
                                  .substring(1)
                                  .substring(1)
                                  .replace("(", "")
                                  .replace(")", "")})`}
                              </TableCell>
                              <TableCell align="right">
                                {formatMoney(row.billValue)}
                              </TableCell>
                              <TableCell align="right">
                                <Checkbox
                                  disabled={
                                    removeAccents(row.billDetail)
                                      .toLowerCase()
                                      .indexOf("bao hiem") === -1
                                      ? true
                                      : false
                                  }
                                  color="primary"
                                  checked={
                                    checkedBill.findIndex(
                                      (x: any) => x.billNo === row.billNo
                                    ) != -1 ||
                                    removeAccents(row.billDetail)
                                      .toLowerCase()
                                      .indexOf("bao hiem") === -1
                                      ? true
                                      : false
                                  }
                                  onChange={() => handleChecked(row)}
                                  inputProps={{
                                    "aria-label": "primary checkbox",
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
              <Box marginTop={3}>
                <Box marginBottom={1} alignItems="center" display="flex">
                  <Typography className={classes.paymentTitle}>
                    {t("detail:tranInfo")}:
                  </Typography>
                  {/* <WhiteTooltip
                    title={
                      <Box>
                        <Box display="flex">
                          <Typography className={classes.tooltipTitle}>
                            {t("detail:reciever")}:
                          </Typography>
                          <Typography className={classes.tooltipContent}>
                            {Receiver}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <Typography className={classes.tooltipTitle}>
                            {t("detail:total")}:
                          </Typography>
                          <Typography className={classes.tooltipContent}>
                            {getTotal(inquiryData.billItems)}
                          </Typography>
                        </Box>
                        <Box display="flex">
                          <Typography className={classes.tooltipTitle}>
                            {t("detail:content")}:
                          </Typography>
                          <Typography className={classes.tooltipContent}>
                            NOP HOC PHI NTT
                          </Typography>
                        </Box>
                        <Typography className={classes.tooltipContent}>
                          {inquiryData.address.ObjectInfo.MaDoiTuong}
                        </Typography>
                      </Box>
                    }
                    placement="top"
                    onClose={handleTooltipClose}
                    open={openTootip}
                    arrow
                  >
                    <Button
                      onClick={handleTooltipOpen}
                      className={classes.tutorialBtn}
                      variant="contained"
                    >
                      {t("detail:tutorial")}
                    </Button>
                  </WhiteTooltip> */}
                </Box>
                <Box
                  onClick={handleShare}
                  position="relative"
                  alignItems="center"
                  display="flex"
                >
                  <TextField
                    style={{ background: "#f8f9fa" }}
                    size="small"
                    className={classes.textTranfer}
                    fullWidth={true}
                    variant="outlined"
                    value={paymentContent}
                    disabled={true}
                  />
                  <Box
                    className={classes.share}
                    justifyContent="center"
                    alignItems="center"
                    display="flex"
                  >
                    <FileCopyIcon
                      className={classes.shareIcon}
                      fontSize="small"
                    />
                    <Typography className={classes.shareText}>
                      {t("detail:copy")}
                    </Typography>
                  </Box>
                </Box>
                <Typography className={classes.payErr}>
                  {shared != "" ? shared : ""}
                </Typography>
              </Box>
              <Box display="flex" marginTop={3}>
                <Box width="50%">
                  <Typography className={classes.title}>
                    {t("detail:total")}:
                  </Typography>
                </Box>
                <Box textAlign="center" width="50%">
                  <Typography className={classes.title}>{total}</Typography>
                </Box>
              </Box>

              <Box marginTop={2}>
                <Box textAlign="center">
                  {currentUser !== "" &&
                    balance &&
                    Number(balance) < Number(total.replace(/\D/g, "")) && (
                      <Typography className={classes.payErr}>
                        {t("detail:payErr")}
                      </Typography>
                    )}
                  <Typography className={classes.payErr}>
                    {currentUser !== "" && !checkedBill.length && chooseBill
                      ? t("detail:continueErr")
                      : ""}
                  </Typography>
                  <Typography className={classes.payErr}>
                    {errCodeCreateOtp != "" ? errCodeCreateOtp : ""}
                  </Typography>
                  {/* <Typography className={classes.payErr}>
                    {currentUser !== "" && accountList.length === 0
                      ? t("detail:accErr")
                      : ""}
                  </Typography> */}
                  <Typography className={classes.errCodeJwt}>
                    {currentUser === "" ? t("detail:errCodeJwt") : ""}
                  </Typography>
                  {currentUser !== "" && (
                    <Button
                      fullWidth={true}
                      disabled={balance ? false : loading}
                      onClick={handleRecieveOtp}
                      className={classes.btn}
                      variant="contained"
                    >
                      {t("detail:continue")}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {loading && <Progress bg="rgb(0 0 0 / 16%)" />}
      </Box>
    </Box>
  )
}

export default Home
