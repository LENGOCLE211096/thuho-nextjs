import { NextApiResponse } from "next"
import withSession from "../../lib/session"

const handler = async (req: any, res: NextApiResponse) => {
  const account = req.session.get("account")
  const balance = req.session.get("balance")
  const user = req.session.get("user")
  if (account) {
    user.account = account
    user.balance = balance
  }
  if (user) {
    res.send(user)
  } else {
    res.send({ err: true })
  }
}
export default withSession(handler)
