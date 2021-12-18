import { configure, getLogger } from "log4js"

configure({
  appenders: {
    application: {
      type: "console",
    },
    file: {
      type: "file",
      filename: "./app.log",
      compression: true,
      maxLogSize: 10485760,
      backups: 100,
    },
  },
  categories: {
    default: {
      appenders: ["application", "file"],
      level: "info",
    },
  },
})

const logger = getLogger()

export const writeLog = (
  reqId: string,
  date: Date,
  path: string,
  username: string,
  content: string
) => {
  logger.info(
    `${reqId} - ${date} - ${path} - [${username}]---content: ${content}`
  )
}
