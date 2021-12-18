import { NextApiResponse } from "next"
import withSession from "../../lib/session"

const handler = async (req: any, res: NextApiResponse) => {
  const user = req.session.get("user")
  if (user && user.user != "") {
    if (req.session.get(`${user.user}phone`)) {
      req.session.unset(`${user.user}phone`)
    }
    await req.session.save()
    res.status(200).json({ removed: true })
  } else {
    res.status(401).send({ error: "Not authorized to access this resource" })
  }
}
export default withSession(handler)
