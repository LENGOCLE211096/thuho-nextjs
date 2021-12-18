import { NextApiResponse } from "next"
import withSession from "../../lib/session"

const handler = async (req: any, res: NextApiResponse) => {
  const user = req.session.get("user")
  if (user && user.user != "") {
    // const now = new Date()
    // const time = now.getTime()
    //   const expireTime = time + 1000 * 60 //test
    // const expireTime = time + 1000 * 777600
    const { phone, term } = req.body
    const phoneSession = {
      phone: phone,
      term: term,
      // expire: expireTime,
    }
    req.session.set(`${user.user}phone`, phoneSession)
    await req.session.save()
    if (phone) {
      res.send(phone)
    } else {
      res.send({ errCode: 500 })
    }
  } else {
    res.status(401).send({ error: "Not authorized to access this resource" })
  }
}
export default withSession(handler)
