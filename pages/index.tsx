import { Box, Button, Checkbox, Typography } from "@material-ui/core"
import axios from "axios"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import React from "react"
import { MdHorizontalRule } from "react-icons/md"
import HeadPage from "../components/Head"
import Progress from "../components/Progress"
import { verifyUser } from "../hooks"
import nextI18NextConfig from "../next-i18next.config.js"
import useStyles from "../styles"
import Error from "./_error"

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "resultCode"],
        nextI18NextConfig
      )),
    },
  }
}

function Home() {
  const { t } = useTranslation()
  const router = useRouter()
  const classes = useStyles()
  const [errCode, setErrCode] = React.useState<number>(0)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [tcLoading, setTcLoading] = React.useState<boolean>(false)
  const [checkedTerm, setCheckedTerm] = React.useState<boolean>(false)
  const [phone, setPhone] = React.useState<string>("")
  const [clickedContinue, setClickedContinue] = React.useState<boolean>(false)
  const [currentUser, setCurrentUser] = React.useState<string>("")

  const hanldeContinue = async () => {
    setClickedContinue(true)
    if (phone != "") {
      setTcLoading(true)
      const res = await axios.post("/hocphi/api/savephone", {
        phone,
        checkedTerm,
      })
      if (res.data.errCode) {
        setErrCode(res.data.errCode)
      } else {
        router.replace("/inquiry")
      }
    }
  }

  const removePhone = async () => {
    const res = await axios.get("/hocphi/api/removephone")
    if (res.data.removed) {
      return res.data.removed
    }
  }

  const getPhone = async (user: any) => {
    const res = await axios.get("/hocphi/api/phone")
    if (!res.data.errCode) {
      const newData = res.data.listAuthenMethod.find(
        (phone: any) => phone.mediaType === "58"
      )
      console.log(user.phone.length, newData.serialNo.length)
      if (newData.serialNo == user.phone) {
        return newData
      }
    }
  }

  React.useEffect(() => {
    if (!router.isReady) return
    setLoading(true)
    const token = router.query.jwt || null
    if (token) {
      async function userAuthorize() {
        const user = await verifyUser(token as string)
        if (user.err) {
          setErrCode(401)
        } else {
          localStorage.removeItem("selectedData")
          if (user.user === "") {
            router.replace("/inquiry")
          } else {
            setCurrentUser(user.user)
            const phoneSession = await axios.get("/hocphi/api/getphone")
            // const time = new Date().getTime()
            const data = await getPhone(user)
            if (data) {
              if (phoneSession.data.err) {
                setPhone(
                  data.status == "0" || data.status == "1" ? data.serialNo : ""
                )
                setLoading(false)
              } else {
                if (data.status == "9") {
                  removePhone()
                  setLoading(false)
                } else if (data.status == "0" || data.status == "1") {
                  if (phoneSession.data.phone != data.serialNo) {
                    removePhone()
                    setPhone(data.serialNo)
                    setLoading(false)
                  } else {
                    router.replace("/inquiry")
                  }
                } else setLoading(false)
              }
            } else setLoading(false)
          }
        }
      }
      userAuthorize()
    } else {
      setErrCode(401)
    }
  }, [router.isReady])

  if (errCode) {
    return <Error statusCode={errCode} />
  }

  return (
    <Box>
      <HeadPage />
      {currentUser && !loading ? (
        <Box height="100%" minHeight="100vh" bgcolor="#f2f2f4">
          <Box
            bgcolor="white"
            padding={1.5}
            paddingY={3}
            className={classes.serviceTextLayout}
          >
            <Box paddingX={1}>
              <Typography className={classes.titleHeader}>
                {t("common:title")}
              </Typography>
            </Box>
            <Box>
              <Box>
                <Typography className={classes.title}>
                  {t("common:title1")}
                </Typography>
              </Box>
              <Box marginLeft={3}>
                <Box display="flex">
                  <Typography className={classes.serviceText}>a.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service11")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>b.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service12")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>c.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service13")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>d.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service14")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>e.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service15")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>f.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service16")}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Box>
                <Typography className={classes.title}>
                  {t("common:title2")}
                </Typography>
              </Box>
              <Box marginLeft={3}>
                <Box display="flex">
                  <Typography className={classes.serviceText}>a.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service21")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>b.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service22")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>c.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service23")}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Box>
                <Typography className={classes.title}>
                  {t("common:title3")}
                </Typography>
              </Box>
              <Box marginLeft={3}>
                <Box display="flex">
                  <Typography className={classes.serviceText}>a.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service31")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>b.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service32")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>c.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service33")}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Box>
                <Typography className={classes.title}>
                  {t("common:title4")}
                </Typography>
              </Box>
              <Box marginLeft={3}>
                <Box display="flex">
                  <Typography className={classes.serviceText}>
                    {t("common:service41")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>a.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service42")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>b.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service43")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>c.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service44")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>d.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service45")}
                  </Typography>
                </Box>
                <Box marginLeft={2.7}>
                  <Typography className={classes.serviceText}>
                    {t("common:service46")}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box>
              <Box>
                <Typography className={classes.title}>
                  {t("common:title5")}
                </Typography>
              </Box>
              <Box marginLeft={3}>
                <Box display="flex">
                  <Typography className={classes.serviceText}>a.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service51")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>b.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service52")}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography className={classes.serviceText}>c.</Typography>
                  <Typography className={classes.serviceText}>
                    {t("common:service53")}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            marginTop={1}
            paddingX={0.6}
            display="flex"
            alignItems="flex-start"
          >
            <Checkbox
              color="primary"
              checked={checkedTerm}
              onChange={() => setCheckedTerm(!checkedTerm)}
              className={classes.checkedTerm}
            />
            <Typography className={classes.termText}>
              {t("common:term1")}
            </Typography>
          </Box>
          <Box marginLeft={5}>
            <Box marginTop={0.8} display="flex">
              <Box>
                <MdHorizontalRule className={classes.horizontalrule} />
              </Box>
              <Box>
                <Typography className={classes.subTermText}>
                  {t("common:term2")}
                </Typography>
              </Box>
            </Box>
            <Box marginTop={0.6} display="flex">
              <Box>
                <MdHorizontalRule className={classes.horizontalrule} />
              </Box>
              <Box>
                <Typography className={classes.subTermText}>
                  {t("common:term3")}
                  <span
                    className={classes.termPhone}
                  >{` "${phone}"`}</span>{" "}
                  <span className={classes.subTermText}>
                    {t("common:term4")}
                  </span>
                </Typography>
              </Box>
            </Box>
            <Box marginTop={1} display="flex">
              <Box>
                <MdHorizontalRule className={classes.horizontalrule} />
              </Box>
              <Box>
                <Typography className={classes.subTermText}>
                  {t("common:term5")}
                </Typography>
              </Box>
            </Box>
          </Box>
          {phone === "" && clickedContinue && (
            <Typography className={classes.phoneErr}>
              {t("common:phoneErr")}
            </Typography>
          )}
          <Box paddingY={3} display="flex" justifyContent="space-between">
            <Button
              fullWidth={true}
              className={classes.declineBtn}
              variant="contained"
              onClick={() => {
                router.push("/decline")
              }}
            >
              {t("common:refuse")}
            </Button>
            <Button
              fullWidth={true}
              disabled={!checkedTerm}
              onClick={hanldeContinue}
              className={classes.conBtn}
              variant="contained"
            >
              {t("common:continue")}
            </Button>
          </Box>
          {tcLoading && <Progress bg="rgb(0 0 0 / 16%)" />}
        </Box>
      ) : (
        loading && <Progress bg="#ffffff" />
      )}
    </Box>
  )
}

export default Home
