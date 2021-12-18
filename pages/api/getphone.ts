import { NextApiResponse } from "next"
import withSession from "../../lib/session"

const handler = async (req: any, res: NextApiResponse) => {
  const user = req.session.get("user")
  if (user && user.user != "") {
    const phone = req.session.get(`${user.user}phone`)
    if (phone) {
      res.status(200).json(phone)
    } else {
      res.status(200).json({ err: "not saved phone" })
    }
  } else {
    res.status(401).send({ error: "Not authorized to access this resource" })
  }
}
export default withSession(handler)
