import axios from "axios"
import type { NextApiResponse } from "next"
import { v4 as uuidv4 } from "uuid"
import { url } from "../../config/api/api"
import { getStringLength, getTotal } from "../../hooks"
import withSession from "../../lib/session"
import { writeLog } from "../../utils/writeLog"

const handler = async (req: any, res: NextApiResponse<any>) => {
  const user = req.session.get("user")
  if (user.user && user.user != "") {
    const account = req.session.get("account")
    if (!getStringLength(req.body)) {
      res.status(200).json({ errCode: 500 })
    } else {
      try {
        const clientTotal = getTotal(req.body.billItems)

        if (clientTotal === req.session.get("tranInfo").total) {
          const total = getTotal(req.body.billItems)
          req.body.amount = total
          let billSeriesStr = ""
          req.body.billItems.reduce((res: any, val: any) => {
            if (!res[val.billSeries.slice(1).slice(1)]) {
              res[val.billSeries.slice(1).slice(1)] = val.billSeries
                .slice(1)
                .slice(1)
              billSeriesStr += res[val.billSeries.slice(1).slice(1)] + " "
            }
            return res
          }, {})
          const narrative =
            req.body.ObjectInfo.LoaiPhi == "2"
              ? `${req.body.ObjectInfo.MaDoiTuong} ${
                  req.body.ObjectInfo.HoVaTen
                } Nop tien ${billSeriesStr.substring(
                  0,
                  billSeriesStr.length - 1
                )}`
              : req.body.ObjectInfo.LoaiPhi == "1"
              ? `${req.body.ObjectInfo.MaDoiTuong} ${req.body.ObjectInfo.HoVaTen} Nop phi nhap hoc`
              : ""
          const requestFromClient = {
            userName: user.user,
            phoneNumber: user.phone,
            accountNumber: account,
            providerId: "NTT",
            merchantId: "NTT",
            amount: Number(req.body.amount.replace(/\D/g, "")),
            challengeCode: "",
            accountType: "CASA",
            serviceType: "THUHO",
            customerCode: req.body.ObjectInfo.MaDoiTuong,
            paraOption2: JSON.stringify(req.body.ObjectInfo),
            billItems: req.body.billItems,
            accountOtp: req.body.accountOtp,
            narrative: narrative,
          }
          const reqData = {
            data: JSON.stringify(requestFromClient),
            requestId: uuidv4(),
            requestTime: new Date(),
            channel: "THUHO",
            serviceCode: "billing",
          }
          console.log(reqData.data)
          const response = await axios({
            method: "POST",
            url: url + "/PayMentHub",
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
            "/hocphi/api/payment",
            user.user,
            "payment"
          )

          if (resultCode === "00000") {
            req.session.unset("account")
            await req.session.save()
            data = JSON.parse(data)
            res.status(200).json(data)
          } else {
            res.status(200).send({ errCode: resultCode, data: data })
          }
        } else {
          res.status(200).send({ errCode: 500 })
        }
      } catch {
        res.status(200).send({ errCode: 500 })
      }
    }
  } else {
    res.status(401).send({ error: "Not authorized to access this resource" })
  }
}

export default withSession(handler)
