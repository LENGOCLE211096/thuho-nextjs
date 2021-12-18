import { Box, CircularProgress } from "@material-ui/core"
// import { createStyles, makeStyles } from "@material-ui/core/styles"
import React from "react"

// const useStyles = makeStyles(() =>
//   createStyles({
//     progress: {
//       color: "#e73b40",
//       // background: "green",
//     },
//   })
// )

interface IProps {
  bg: string
}

export default function Progress(props: IProps) {
  // const classes = useStyles()
  return (
    <Box
      height="100%"
      width="100%"
      left={0}
      top={0}
      zIndex={1000}
      overflow="hidden"
      position="fixed"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor={props.bg}
      // className={classes.progress}
      color="primary"
    >
      <CircularProgress color="secondary" />
    </Box>
  )
}
