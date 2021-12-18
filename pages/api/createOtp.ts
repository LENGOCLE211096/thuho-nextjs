import axios from "axios"
import type { NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"
import { AccountType } from "../../config/account"
import { url } from "../../config/api/api"
import { formatMoney, getStringLength, getTotal } from "../../hooks"
import withSession from "../../lib/session"
import { writeLog } from "../../utils/writeLog"

const handler = async (req: any, res: NextApiResponse<any>) => {
  const user = req.session.get("user")
  if (user && user.user != "") {
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
    if (resultCode === "00000") {
      data = JSON.parse(data)
      const newData = data.dataSet.filter((data: any) => {
        return (
          AccountType.indexOf(data.AcctType) != -1 &&
          !(data.AcctType === "700" && data.clientInd === "S")
        )
      })
      const checkAccount = newData.filter(
        (acc: any) => acc.accountNo === req.session.get("account")
      )

      if (!getStringLength(req.body)) {
        res.status(200).json({ errCode: 500 })
      } else if (!checkAccount.length) {
        res.status(200).json({ errCode: 50009 })
      } else {
        const total = getTotal(req.body.billItems)
        const afBalance = formatMoney(
          Number(req.body.balance.replace(/\D/g, "")) -
            Number(total.replace(/\D/g, ""))
        )
        req.body.afBalance = afBalance
        req.body.total = total
        req.body.account = checkAccount[0].accountNo
        delete req.body.billItems
        const reqData = {
          data: JSON.stringify({
            userName: user.phone,
            narrative: `Dr:${
              req.body.account
            },+Billing,+${req.body.total
              .replace(/\s/g, "")
              .split(",")
              .join(".")}`,
            isReqChalCode: "N",
          }),
          requestId: uuidv4(),
          requestTime: new Date(),
          channel: "THUHO",
          serviceCode: "billing",
        }
        console.log(reqData.data)
        const response = await axios({
          method: "POST",
          url: url + "/CreateOTP",
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
          "/hocphi/api/createOtp",
          user.user,
          "create otp"
        )

        if (resultCode === "00000") {
          req.session.set("account", checkAccount[0].accountNo)
          req.session.set("tranInfo", req.body)
          await req.session.save()
          data = JSON.parse(data)
          res.status(200).json(data)
        } else {
          res.status(200).json({ errCode: resultCode })
        }
        // } catch {
        //   res.status(200).json({ errCode: 500 })
        // }
      }
    } else {
      res.status(200).json({ errCode: resultCode })
    }
  } else {
    res.status(401).send({ error: "Not authorized to access this resource" })
  }
}

export default withSession(handler)
