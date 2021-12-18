import axios from "axios"
import type { NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"
import { url } from "../../config/api/api"
import { getStringLength } from "../../hooks"
import withSession from "../../lib/session"
import { writeLog } from "../../utils/writeLog"

const handler = async (req: any, res: NextApiResponse<any>) => {
  if (!getStringLength(req.body)) {
    res.status(200).json({ errCode: 500 })
  } else {
    const user = req.session.get("user")
    if (user) {
      try {
        const reqData = {
          data: JSON.stringify({
            userName: user.user,
            accountNumber: "089959080000004",
            providerId: "NTT",
            paraOption2: req.body.selectedFee,
            merchantId: "NTT",
            amount: 0,
            challengeCode: "",
            accountType: "CASA",
            serviceType: "THUHO",
            customerCode: req.body.cusId,
          }),
          requestId: uuidv4(),
          requestTime: new Date(),
          channel: "THUHO",
          serviceCode: "billing",
        }
        console.log(reqData.data)
        const response = await axios({
          method: "POST",
          url: url + "/InquiryHub",
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
          "/hocphi/api/inquiry",
          user.user,
          "inquiry"
        )
        if (resultCode === "00000") {
          data = JSON.parse(data)
          data.address = JSON.parse(data.address)
          console.log(req.body.accountNumber)

          req.session.set("account", req.body.accountNumber)
          req.session.set("balance", req.body.balance)

          await req.session.save()
          res.status(200).json(data)
        } else {
          res.status(200).send({ errCode: resultCode })
        }
      } catch {
        res.status(200).send({ errCode: 500 })
      }
    } else {
      res.status(401).send({ error: "Not authorized to access this resource" })
    }
  }
}

export default withSession(handler)
