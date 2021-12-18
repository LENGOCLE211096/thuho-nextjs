import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      fontSize: 20,
      color: "#e73b40",
    },
    title: {
      // color: "#666666",
      opacity: 0.6,
      fontWeight: 550,
      marginLeft: 5,
      marginTop: 3,
    },
    moneyTitle: {
      opacity: 0.6,
      fontWeight: 550,
      marginLeft: 5,
      marginTop: 6,
    },
    info: {
      // whiteSpace: "unset",
      // maxWidth: 160,
      color: "#333333",
      fontWeight: 550,
    },
    contentTitle: {
      color: "#b7b5b7",
    },
    otbTitle: {
      color: "#b7b5b7",
    },
    otbText: {
      width: 45,
      "& .MuiInputBase-root": {
        height: 45,
      },
    },
    btn: {
      color: "rgba(0, 0, 0, 0.5)",
      background:
        "linear-gradient(rgb(255, 222, 1) 0%, rgb(250, 167, 26) 100%)",
      fontWeight: 550,
      borderRadius: 8,
    },
    backBtn: {
      background: "#ff4d4d",
    },
    link: {
      textDecoration: "none",
    },
    err: {
      color: "red",
      fontSize: 13,
      margin: "15px 5px",
    },
    sms: {
      marginLeft: 5,
      color: "#e73b40",
      fontWeight: 550,
      marginTop: 5,
    },
    totalInfo: {
      fontWeight: 550,
    },
  })
)

export default useStyles
