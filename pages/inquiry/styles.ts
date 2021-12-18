import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() =>
  createStyles({
    // searchIcon: {
    //   fontSize: 40,
    //   background: "#eaeef2",
    //   color: "#454f5b",
    //   borderRadius: 5,
    //   padding: 5,
    //   "&:hover": {
    //     cursor: "pointer",
    //   },
    // },
    // searchBtn: {
    //   height: 40,
    //   minWidth: 40,
    //   // marginTop: 4,
    //   marginLeft: 10,
    // },
    // searchCaptchaIcon: {
    //   fontSize: 40,
    //   width: "100%",
    //   background: "#eaeef2",
    //   color: "#454f5b",
    //   borderRadius: 5,
    //   padding: 5,
    //   "&:hover": {
    //     cursor: "pointer",
    //   },
    // },
    // searchCaptchaBtn: {
    //   background: "#eaeef2",
    //   fontWeight: 550,
    //   borderRadius: 5,
    //   padding: 0,
    //   width: "100%",
    //   height: 40,
    //   minWidth: 40,
    //   "&:hover": {
    //     cursor: "pointer",
    //     background: "#eaeef2",
    //   },
    // },
    // errIcon: {
    //   color: "red",
    // },
    formControl: {
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
        // color: "#626262",
        opacity: 0.9,
        fontWeight: 550,
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
    input: {
      "&::placeholder": {
        // textOverflow: "ellipsis !important",
        fontWeight: 550,
        opacity: 1,
      },
    },
    btn: {
      color: "rgba(0, 0, 0, 0.5)",
      background:
        "linear-gradient(rgb(255, 222, 1) 0%, rgb(250, 167, 26) 100%)",
      fontWeight: 550,
      borderRadius: 8,
    },
    title: {
      // color: "#9d9d9d",
      opacity: 0.6,
      fontWeight: 550,
      marginLeft: 5,
      marginTop: 2,
    },
    paymentTitle: {
      fontWeight: 580,
      color: "#454f5b",
    },
    payErr: {
      color: "red",
      fontSize: 13,
      margin: 5,
    },
    warnIcon: {
      marginTop: 2.5,
      marginLeft: 3,
      color: "#e73b40",
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
      fontWeight: 550,
      textAlign: "center",
      marginTop: 10,
      fontSize: 14,
      color: "#454f5b",
    },
    icon: {
      fontSize: 20,
      color: "#e73b40",
    },
    select: {
      "& .MuiSelect-icon": {
        color: "#e73b40",
        background: "#ff00000f",
        marginRight: 10,
        width: 22,
        height: 22,
        marginTop: 2,
        padding: 5,
      },
      padding: "8px 10px 5px 12px",
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
      padding: "8px 10px 5px 12px",
    },
    cusIcon: {
      color: "#e73b40",
      position: "absolute",
      right: 18,
      marginTop: 10,
      zIndex: 1000,
      width: 20,
      height: 20,
    },
    infoIcon: {
      width: 20,
      height: 20,
      marginRight: 10,
      borderRadius: 50,
      border: "2px solid #e73b40",
    },
    infoIconText: {
      textAlign: "center",
      fontWeight: 550,
      color: "#be1128",
      fontSize: 12,
    },
  })
)

export default useStyles
