import withSession from "../../lib/session"

const handler = async (req: any, res: any) => {
  const user = req.session.get("user")
  if (user.user && user.user != "") {
    const tranInfo = req.session.get("tranInfo")
    if (tranInfo) {
      res.status(200).json(tranInfo)
    } else {
      res.status(200).send({ err: true })
    }
  } else {
    res.status(401).send({ error: "Not authorized to access this resource" })
  }
}

export default withSession(handler)
