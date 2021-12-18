export const resultCodeInquiry = (code: string) => {
  switch (code) {
    case "00043":
      return "00043" // khach hang khong ton tai
    case "096":
      return "096" // khach hang khong ton tai
    case "00210":
      return "00210" // hoa don chua dc xuat
    default:
      return "99"
  }
}

export const resultCodeVerifyOtp = (result: string) => {
  switch (result) {
    case "50002":
      return "50002" // otp khong hop le
    default:
      return "99"
  }
}

export const resultCodeCreateOtp = (result: string) => {
  switch (result) {
    case "50001":
      return "50001" // otp khong hop le
    case "50009":
      return "50009" // tài khoản kh hop le
    default:
      return "99"
  }
}

export const resultCodePayment = (result: string) => {
  switch (result) {
    case "00015":
      return "00015" // thanh toan that bai
    // case "10016":
    //   return "00015" // thanh toan that bai
    case "00006":
      return "00006" // giao dich dang xu ly, kh thuc hien thoan toán lại
    case "10008":
      return "10008" // sai otp
    case "20022":
      return "20022" // vuot muc
    case "600002":
      return "600002" // Số tiền giao dịch %s vượt quá hạn mức cho mỗi lần giao dịch. Hạn mức cho mỗi lần giao dịch là %s.
    case "600003":
      return "600003" // Số tiền vượt quá hạn mức giao dịch trong ngày. Hạn mức còn lại của tài khoản là: %s.
    case "600004":
      return "600004" // Số tiền giao dịch %s vượt quá hạn mức giao dịch trong ngày của dịch vụ. Hạn mức giao dịch còn lại trong ngày của dịch vụ là %s.
    case "600008":
      return "600008" // Số tiền giao dịch %s vượt quá hạn mức được thực hiện cho mỗi lần giao dịch của Quý khách. Hạn mức tối đa cho mỗi lần giao dịch là %s.
    case "600009":
      return "600009" // Số tiền giao dịch %s vượt quá hạn mức giao dịch được thực hiện trong ngày %s của Quý khách. Hạn mức còn lại trong ngày của Quý khách là: %s.
    case "117031":
      return "117031" // Quý khách chưa đăng ký phương thức xác thực hoặc đã bị khóa. Quý khách vui lòng liên hệ tổng đài 19006060 để được hỗ trợ
    case "117032":
      return "117032" //Hiện tại quý khách không có
    //phương thức xác thực nào có thể xác thực được giao dịch vừa thực hiện. Quý khách vui lòng đến quầy giao dịch của HDBank để đăng ký phương thức xác thực mới cao hơn.
    case "117003":
      return "117003" // Tài khoản không hợp lệ
    case "117055":
      return "117055" // Số tiền giao dịch %s vượt quá hạn mức giao dịch được thực hiện trong tháng. Hạn mức còn lại của Quý khách khách là %s
    default:
      return "99" // lỗi hệ thống
  }
}
