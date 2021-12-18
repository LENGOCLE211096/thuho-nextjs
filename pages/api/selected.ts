import { NextApiResponse } from "next"
import withSession from "../../lib/session"

const handler = async (req: any, res: NextApiResponse) => {
  const selected = req.session.get("selected")
  if (selected) {
    res.send(selected)
  } else {
    res.send({ err: true })
  }
}
export default withSession(handler)
