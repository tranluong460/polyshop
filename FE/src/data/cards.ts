// danh sách thẻ ngân hàng của người dùng, lưu vào db

// _id: lưu id này trong cards của user để populate
// card_holder_name: tên chủ thẻ
// card_number: số thẻ
// start_date: ngày tạo
// end_date: ngày hết hạn
// cvv: mã cvv
// main: có được đặt là thẻ chính không

export const cards = [
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
];
