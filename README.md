# Dự án xưởng: poly-shop

- FE: React
- BE: NodeJs

<!-- --------------------BE-------------------- -->

- Auth

  - getAll: Lấy tất cả người dùng ( admin )
  - getOne: Lấy mọt người dùng ( admin )

  - register: Đăng ký tài khoản
  - verify: Kích hoạt email

  - logIn: Đăng nhập tài khoản
  - getUserByToken: Lấy thông tin người dùng khi đăng nhập ( login )

- Change Password
    <!-- Quên mật khẩu -->

  - getSecurityCode: Lấy mã bảo mật
  - resetPassword: Đổi mật khẩu

    <!-- Đổi mật khẩu -->

  - getCode: Lấy code ( login )
  - checkCode: Kiểm tra code ( login )
  - changePassword: đổi mật khẩu ( login )

- Category

  - getAll: Lấy tất cả danh mục
  - getOne: Lấy một danh mục
  - Create: Thêm mới danh mục ( admin )
  - Edit: Chỉnh sửa danh mục ( admin )
  - Delete: Xóa danh mục ( admin )

- Contact

  - create: Gửi phản hồi

- Voucher

  - getAll: Lấy tất cả voucher
  - getOne: Lấy một voucher
  - create: Thêm mới voucher ( admin )
  - checkVoucher: Kiểm tra đã sử dụng voucher chưa

- Product

  - getAll: Lấy tất cả sản phẩm
  - getOne: Lấy một sản phẩm
  - create: Thêm mới sản phẩm ( admin )
  - remove: Xóa sản phẩm ( admin )
  - update: Cập nhật sản phẩm ( admin )

- Comment

  - getAll: Lấy tất cả bình luận
  - getOne: Lấy một bình luận
  - create: Thêm mới bình luận ( login )
  - update: Cập nhật bình luận ( login )
  - del: Xóa bình luận ( login )

- Feedback

  - getAll: Lấy tất cả phản hồi
  - getOne: Lấy một phản hồi
  - create: Thêm mới phản hồi ( login )
  - remove: Xóa phản hồi ( login )
  - update: Cập nhật phản hồi ( login )

- Favorite

  - favorite: Yêu thích sản phẩm ( login )

- Card

  - getAll: lấy tất cả thẻ ngân hàng
  - getOne: lấy một thẻ ngân hàng
  - create: thêm mới thẻ ngân hàng ( login )
  - remove: xóa thẻ ngân hàng ( login )
  - update: cập nhật thẻ ngân hàng ( login )

  <!-- --------------------BE Success-------------------- -->

- Order
- Payment
