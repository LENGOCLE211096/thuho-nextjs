import { createStyles, makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(() =>
  createStyles({
    successIcon: {
      padding: 10,
      fontSize: 65,
      border: "3px solid #e73b40",
      borderRadius: 50,
      background: "#be11281c",
    },
    successText: {
      fontWeight: 550,
      margin: "15px 0 20px 0",
      fontSize: 20,
      textTransform: "uppercase",
    },
    title: {
      color: "#666666",
      fontWeight: 550,
      marginLeft: 5,
      marginTop: 1,
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
    btn: {
      color: "rgba(0, 0, 0, 0.5)",
      background:
        "linear-gradient(rgb(255, 222, 1) 0%, rgb(250, 167, 26) 100%)",
      fontWeight: 550,
      borderRadius: 8,
    },
    link: {
      textDecoration: "none",
    },
    err: {
      color: "red",
      fontSize: 13,
      margin: "5px 20px",
    },
    totalInfo: {
      fontWeight: 550,
    },
  })
)

export default useStyles
