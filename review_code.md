# Review code:

- Loading page khi click nút tìm kiếm, nút tiếp tục và bất cứ thao tác gọi api nào 
- màu phải chuẩn theo figma 
- font chuẩn theo mobile app 
- thêm ô nội dung thanh toán 
- bỏ tên tk vì cùng user tên giống nhau
    > OK 
- Số tiền chuyển khoản -> Số tiền thanh toán
    > OK 
- giao diện otp sửa lại như mobile banking 
- màn hình xác nhận -> dùng màn hình native 
- session expire time -> đưa ra file config 
- requestTime -> tạo mới 
    > OK 
- thêm util writelog -> function writeLog(time,path,username,content)
- đưa api url ra config file 
    > OK 
- resultCode -> câu thông báo map trong utils 
- trang 500 -> Hệ thống gián đoạn 
- Figma vs MB app real -> chọn MB 


# bổ sung 
- lưu biến ngôn ngữ vào session 
- bắt buộc chọn 1 kỳ mới cho phép tiếp tục 
- màu checkbox màu đỏ như app mb 
- Sau khi nhập OTP ô cuối cùng thì focus nút Xác nhận, ko cần focus ô OTP đầu lại 
- Sửa tên folder until -> utils 
- đưa secret key của jwt ra config 
