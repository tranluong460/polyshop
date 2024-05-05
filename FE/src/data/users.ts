// danh sách người dùng, lưu vào db

//   _id: "user1",
//   name: "Administrator",
//   email: "admin@gmail.com",
//   password: "hashPasswordAdmin",
//   phone: "0312345678",
//   address: "Hà nội",
//   image: { dùng <Upload/> của ant design nên lưu vậy
//     status: "done",
//     name: "user1",
//     uid: "https://res.cloudinary.com/kuvgfv.jpg",
//     url: "https://res.cloudinary.com/kuvgfv.jpg",
//   },
//   cards: mảng các thẻ ngân hàng của người dùng, lưu _id để populate [],
//   order: mảng các đơn hàng của người dùng, lưu _id để populate [],
//   favorite: [],
//   comments: mảng các bình luận của người dùng, lưu _id để populate[],
//   role: "Admin" và "User" khi đăng kí mặc định là User

export const users = [
  {
    _id: "user1",
    name: "Administrator",
    email: "admin@gmail.com",
    password: "hashPasswordAdmin",
    phone: "0312345678",
    address: "Hà nội",
    image: {
      status: "done",
      name: "user1",
      uid: "https://res.cloudinary.com/project-alone/image/upload/v1688804352/Shop/fgsmprpaxtjoxrkuvgfv.jpg",
      url: "https://res.cloudinary.com/project-alone/image/upload/v1688804352/Shop/fgsmprpaxtjoxrkuvgfv.jpg",
    },
    cards: [
      {
        _id: "card1",
        card_holder_name: "TRAN VAN LUONG",
        card_number: 1010109072003,
        start_date: "10/18",
        end_date: "10/22",
        cvv: 123,
        main: true,
      },
      {
        _id: "card2",
        card_holder_name: "TRAN VAN LUONG",
        card_number: 9704224234880446,
        start_date: "10/19",
        end_date: "10/23",
        cvv: 123,
        main: false,
      },
    ],
    order: [
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
    ],
    favorite: [
      {
        _id: "favorite1",
        userId: "user1",
        productId: "product1",
      },
      {
        _id: "favorite2",
        userId: "user1",
        productId: "product10",
      },
      {
        _id: "favorite3",
        userId: "user1",
        productId: "product2",
      },
    ],
    comments: [],
    role: "Admin",
  },
  {
    _id: "user2",
    name: "UserManager",
    email: "user@gmail.com",
    password: "hashPasswordUser",
    phone: "",
    address: "",
    image: {
      status: "done",
      name: "user2",
      uid: "https://res.cloudinary.com/project-alone/image/upload/v1688804352/Shop/fgsmprpaxtjoxrkuvgfv.jpg",
      url: "https://res.cloudinary.com/project-alone/image/upload/v1688804352/Shop/fgsmprpaxtjoxrkuvgfv.jpg",
    },
    cards: [],
    order: [],
    favorite: [],
    comments: [],
    role: "User",
  },
];
