import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() =>
  createStyles({
    serviceTextLayout: {
      overflow: "scroll",
      height: "71.5vh",
    },
    serviceText: {
      fontSize: 14,
      // marginTop: 10,
      textAlign: "justify",
      padding: "0 5px",
      // lineHeight: 1.3,
    },
    title: {
      fontWeight: 550,
      fontSize: 14,
    },
    titleHeader: {
      textAlign: "center",
      fontWeight: 550,
      marginBottom: 15,
      fontSize: 14,
    },
    termText: {
      opacity: 0.95,
      textAlign: "justify",
      // paddingRight: 15,
      fontSize: 13.5,
      fontWeight: 550,
      marginTop: 12,
    },
    subTermText: {
      lineHeight: 1.2,
      opacity: 0.95,
      textAlign: "justify",
      // fontStyle: "italic",
      fontSize: 13,
      fontWeight: 550,
      paddingRight: 20,
      marginTop: 1,
      "@media (max-width: 404px)": {
        fontSize: 12,
        marginTop: 2,
      },
    },
    termPhone: {
      opacity: 0.95,
      color: "#e73b40",
    },
    conBtn: {
      color: "rgba(0, 0, 0, 0.5)",
      background:
        "linear-gradient(rgb(255, 222, 1) 0%, rgb(250, 167, 26) 100%)",
      fontWeight: 550,
      borderRadius: 8,
      marginRight: 15,
      marginLeft: 5,
    },
    declineBtn: {
      color: "#ffffffde",
      background: "#808080de",
      fontWeight: 550,
      borderRadius: 8,
      marginLeft: 15,
      marginRight: 5,
    },
    phoneErr: {
      color: "red",
      fontSize: 13,
      textAlign: "center",
      margin: "15px 15px 0 15px",
    },
    checkedTerm: {
      padding: "9px 3px 0 9px",
    },
    horizontalrule: {
      marginRight: 5,
      width: 15,
      height: 10,
    },
  })
)

export default useStyles
