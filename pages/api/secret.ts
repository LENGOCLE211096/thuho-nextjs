import jwt from "jsonwebtoken"
import { NextApiResponse } from "next"
import { KEY } from "../../config/secret/secret"
import withSession from "../../lib/session"

export default withSession(async (req: any, res: NextApiResponse) => {
  const token = req.headers["authorization"]?.replace("Bearer ", "")
  try {
    req.session.unset("user")
    req.session.unset("account")
    req.session.unset("balance")
    const data = jwt.verify(token, KEY)
    console.log(data)
    req.session.set("user", data)
    await req.session.save()
    res.status(200).json(data)
  } catch {
    res.status(401).send({ error: "Not authorized to access this resource" })
  }
})
