// giở hàng, không lưu vào db

// products: mảng các sản phẩm muốn mua [
//     {
//       product: {
//         _id: id sản phẩm trong mongoose
//         inventory: số lượng còn lại trong kho
//         price: giá sản phẩm, lưu giá bán chứ không lưu giá gốc
//         name: tên sản phẩm
//         image: hình ảnh của sản phẩm, chỉ lưu một ảnh
//       },
//       quantity: số lượng sản phẩm muốn mua
//     },
//   ],
//   totalPrice: tổng giá trị các sản phẩm trong đơn hàng

export const carts = {
  products: [
    {
      product: {
        _id: "product18",
        inventory: 500,
        price: 26290000,
        name: "Laptop MSI Katana 15 B13VEK-252VN",
        image:
          "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/t/e/text_ng_n_20_.png",
      },
      quantity: 2,
    },
    {
      product: {
        _id: "product19",
        inventory: 5000,
        price: 18490000,
        name: "Apple Watch Ultra 49mm Viền Titan - Dây cao su",
        image:
          "https://cdn2.cellphones.com.vn/358x358,webp,q100/media/catalog/product/x/i/xiaomi_1__1.png",
      },
      quantity: 1,
    },
  ],
  totalPrice: 44780000,
};
