// danh sách đơn hàng, lưu vào db

//    _id: lưu _id này vào orders của người dùng để populate
//     userId: _id của người mua hàng, có thể dùng để populate
//     products: mảng các sản phẩm mà người dùng mua [
//       {
//         product: _id của sản phẩm, dùng để populate
//         name: tên sản phẩm tại thời điểm mua
//         price: giá sản phẩm tại thời điểm mua
//         quantity: số lượng mua
//       },
//     ],
//     totalPrice: tổng giá của đơn hàng
//     paymentMethod: phương thức thanh toán, gồm
//              "Thanh toán bằng thẻ" và "Thanh toán khi giao hàng"
//     payment: nếu chọn thanh toán bằng thẻ thì lưu _id của thanh toán
//     status: trạng thái đơn hàng, lúc mới mua thì
//          "Chờ thanh toán" nếu thanh toán bằng thẻ bị lỗi, tạo đơn thành công
//                nhưng chua thanh toán, vào giao diện đơn hàng để thanh toán lại
//          "Đang xử lý", nếu thanh toán khi nhận hàng

//         Admin cập nhật các trạng thái này
//          "Đang giao hàng",
//          "Đã giao hàng",
//          "Đã hủy",
//          "Đã hoàn tiền",
//          "Đã hoàn thành",

export const orders = [
  {
    _id: "order1",
    userId: "user1",
    products: [
      {
        product: "product1",
        name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
        price: 24690000,
        quantity: 1,
      },
      {
        product: "product2",
        name: "Samsung Galaxy S23 Ultra 256GB",
        price: 23990000,
        quantity: 1,
      },
    ],
    totalPrice: 48680000,
    paymentMethod: "Thanh toán bằng thẻ",
    payment: "payment1",
    status: "Đang giao hàng",
  },
  {
    _id: "order2",
    userId: "user1",
    products: [
      {
        product: "product1",
        name: "iPhone 14 Pro Max 128GB | Chính hãng VN/A",
        price: 24690000,
        quantity: 10,
      },
    ],
    totalPrice: 246900000,
    paymentMethod: "Thanh toán khi nhận hàng",
    status: "Đang xử lý",
  },
];
