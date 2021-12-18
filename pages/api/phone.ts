import axios from "axios"
import type { NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"
import { url } from "../../config/api/api"
import withSession from "../../lib/session"
import { writeLog } from "../../utils/writeLog"

const handler = async (req: any, res: NextApiResponse<any>) => {
  const user = req.session.get("user")
  if (user && user.user != "") {
    try {
      const reqData = {
        data: JSON.stringify({
          userName: user.user,
        }),
        requestId: uuidv4(),
        requestTime: new Date(),
        channel: "THUHO",
        serviceCode: "billing",
      }
      const response = await axios({
        method: "POST",
        url: url + "/GetAuthenMethod",
        headers: {
          "Content-Type": "text/plain",
        },
        data: reqData,
      })
      console.log(response.data)
      let { data } = response.data
      const { resultCode, request } = response.data
      writeLog(
        request.requestId,
        new Date(),
        "/hocphi/api/phone",
        user.user,
        "get sms phone"
      )
      if (resultCode === "00000") {
        data = JSON.parse(data)
        res.status(200).json(data)
      } else {
        res.status(200).json({ errCode: resultCode })
      }
    } catch {
      res.status(200).json({ errCode: 500 })
    }
  } else {
    res.status(401).send({ error: "Not authorized to access this resource" })
  }
}

export default withSession(handler)
