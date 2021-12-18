import { Box, Typography } from "@material-ui/core"
import React from "react"

interface IProps {
  statusCode: number
}

function Error({ statusCode }: IProps) {
  return (
    <Box>
      {statusCode == 401 && <Typography>{statusCode} Unauthorized</Typography>}
      {statusCode == 500 && <Typography>{statusCode} System error</Typography>}
    </Box>
  )
}

/**
 * Server side rendering
 */
Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
