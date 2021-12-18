//verify user with jwt from url
export const verifyUser = async (token: string) => {
  const res = await fetch("/hocphi/api/secret", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  if (res.ok) {
    const user = await res.json()
    return user
  } else {
    return { err: true }
  }
}

// Money format
export const formatMoney = (money: number) => {
  return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VND"
}

// string length of a body request
export const getStringLength = (reqBody: object) => {
  const reqLength = JSON.stringify(reqBody).length
  if (reqLength > 5000) {
    return false
  }
  return true
}

//remove accents
export const removeAccents = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
}

// Get bill total
export const getTotal = (bill: any) => {
  let total = 0
  for (const i of bill) {
    total += Number(i.billValue)
  }
  return formatMoney(total)
}

// load image
export const myLoader = ({ src, width, quality }: any) => {
  return `${window.location.protocol}//${
    window.location.host
  }/${src}?w=${width}&q=${quality || 75}`
}
