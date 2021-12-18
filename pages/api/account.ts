import axios from "axios"
import type { NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"
import { AccountType } from "../../config/account"
import { url } from "../../config/api/api"
import withSession from "../../lib/session"
import { writeLog } from "../../utils/writeLog"

const handler = async (req: any, res: NextApiResponse<any>) => {
  const user = req.session.get("user")
  if (user && user.user != "") {
    try {
      const reqData = {
        data: JSON.stringify({
          clientNo: user.clientNo,
        }),
        requestId: uuidv4(),
        requestTime: new Date(),
        channel: "THUHO",
        serviceCode: "billing",
      }
      console.log(reqData.data)
      const response = await axios({
        method: "POST",
        url: url + "/ListAccountNo",
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
        "/hocphi/api/account",
        user.user,
        "get account list"
      )
      req.session.unset("tranInfo")
      await req.session.save()
      if (resultCode === "00000") {
        data = JSON.parse(data)
        const newData = data.dataSet.filter((data: any) => {
          return (
            AccountType.indexOf(data.AcctType) != -1 &&
            !(data.AcctType === "700" && data.clientInd === "S")
          )
        })
        newData.sort((a: any, b: any) => Number(b.balance) - Number(a.balance))
        res.status(200).json(newData)
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
