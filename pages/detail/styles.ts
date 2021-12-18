import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 120,
      background: "white",
      boxShadow: "0px 0px 5px 0px silver",
      borderRadius: 5,
      "& .MuiInputBase-root.Mui-disabled": {
        color: "black", // (default alpha is 0.38)
      },
      "& .MuiInputBase-root": {
        color: "#626262",
        fontWeight: 550,
        opacity: 1,
      },
    },
    noAcc: {
      position: "relative",
      "& fieldset": {
        border: "none",
      },
      minWidth: 120,
      background: "white",
      boxShadow: "0px 0px 5px 0px silver",
      borderRadius: 5,
      // "& .MuiInputBase-root.Mui-disabled": {
      //   color: "black", // (default alpha is 0.38)
      // },
      "& .MuiInputBase-root": {
        color: "#e73b40",
        fontWeight: 550,
        fontSize: 14.5,
      },
    },
    btn: {
      color: "rgba(0, 0, 0, 0.5)",
      background:
        "linear-gradient(rgb(255, 222, 1) 0%, rgb(250, 167, 26) 100%)",
      fontWeight: 550,
      borderRadius: 8,
    },
    accTitle: {
      color: "#9d9d9d",
      fontWeight: 550,
      marginLeft: 5,
      marginTop: 5,
    },
    title: {
      fontWeight: 550,
      opacity: 0.9,
      // color: "#454f5b",
      marginBottom: 10,
    },
    paymentTitle: {
      fontWeight: 550,
      opacity: 0.9,
    },
    tableHead: {
      background: "#eaeef2",
    },
    tableTitle: {
      fontWeight: 580,
    },
    link: {
      textDecoration: "none",
    },
    payErr: {
      color: "red",
      fontSize: 13,
      margin: 5,
    },
    share: {
      color: "#1890ff",
      borderRadius: 5,
      position: "absolute",
      right: 1,
      padding: "0 5px",
      zIndex: 100,
      background: "#f8f9fa",
      width: 120,
      height: 38,
      // marginTop: 3,
    },
    shareText: {
      marginLeft: 5,
      fontWeight: 550,
    },
    textTranfer: {
      position: "relative",
      minWidth: 120,
      boxShadow: "0px 0px 5px 0px silver",
      borderRadius: 5,
      "& .MuiInputBase-root.Mui-disabled": {
        color: "black", // (default alpha is 0.38)
        fontWeight: 550,
        background: "#f8f9fa",
        paddingRight: 110,
      },
    },
    shareIcon: {
      marginRight: 2,
      marginTop: 1,
    },
    warnIcon: {
      marginTop: 2.5,
      marginLeft: 3,
      color: "#be1128",
    },
    tooltipTitle: {
      fontWeight: 550,
      marginRight: 3,
      fontSize: 13,
    },
    tooltipContent: { fontSize: 13 },
    tutorialBtn: {
      marginLeft: 5,
      padding: "0 5px 0 5px",
      fontSize: 11,
      color: "rgba(0, 0, 0, 0.5)",
      background:
        "linear-gradient(rgb(255, 222, 1) 0%, rgb(250, 167, 26) 100%)",
      fontWeight: 550,
      borderRadius: 8,
    },
    icon: {
      fontSize: 20,
      color: "#e73b40",
    },
    selectAcc: {
      "& .MuiSelect-icon": {
        color: "#e73b40",
        background: "#ff00000f",
        marginRight: 10,
        width: 22,
        height: 22,
        marginTop: 2,
        padding: 5,
      },
      padding: 10,
    },
    balance: {
      fontSize: 14,
      color: "#9d9d9d",
      fontWeight: 550,
    },
    balanceRight: {
      fontWeight: 550,
      color: "#e73b40",
    },
    errCodeJwt: {
      textAlign: "center",
      fontWeight: 550,
      fontSize: 13,
    },
  })
)

export default useStyles
