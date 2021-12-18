import compression from "compression"
import express from "express"
import next from "next"
import { getSession } from "./lib/getSession"
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()
const port = dev ? 3000 : 8080

app
  .prepare()
  .then(() => {
    const server = express()
    // support gzip
    server.use(compression())
    app.use(async (req, res, next) => {
      await getSession(req, res) // session is set to req.session
      next()
    })
    server.get("*", (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
