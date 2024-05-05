// danh sách bình luận, lưu vào db

//     _id: lưu _id này trong comments của người dùng để populate
//     stars: số sao người dùng đánh giá
//     comment: bình luận của người dùng
//     prefer: lượt like của comment
//     feed_back: [
//       {
//         _id: "user2",
//         user: {
//           _id: lưu id người phản hồi vào đây để populate lấy thông tin
//           },
//         },
//         comment: phản hồi
//         prefer: số lượt like cho phải hồi
//       },
//     ],
//     user: {
//       _id: lưu id người bình luận vào đây để populate lấy thông tin
//       },
//     },

export const comments = [
  {
    _id: "comment1",
    stars: 1,
    comment: "đây là ví dụ về cách comment",
    prefer: 10,
    feed_back: [
      {
        _id: "feed_back1",
        user: {
          _id: "user2",
          name: "UserManager",
          image: {
            status: "done",
            name: "user1",
            uid: "https://res.cloudinary.com/project-alone/image/upload/v1688804352/Shop/fgsmprpaxtjoxrkuvgfv.jpg",
            url: "https://res.cloudinary.com/project-alone/image/upload/v1688804352/Shop/fgsmprpaxtjoxrkuvgfv.jpg",
          },
        },
        comment: "feed_back user 2",
        prefer: 0,
      },
    ],
    user: {
      _id: "user1",
      name: "Administrator",
      image: {
        status: "done",
        name: "user1",
        uid: "https://res.cloudinary.com/project-alone/image/upload/v1688804352/Shop/fgsmprpaxtjoxrkuvgfv.jpg",
        url: "https://res.cloudinary.com/project-alone/image/upload/v1688804352/Shop/fgsmprpaxtjoxrkuvgfv.jpg",
      },
    },
  },
  {
    _id: "comment2",
    stars: 4,
    comment: "đây là bình luận của user2",
    prefer: 0,
    feed_back: [],
    user: {
      _id: "user2",
      name: "UserManager",
      image:
        "https://res.cloudinary.com/project-alone/image/upload/v1688804352/Shop/fgsmprpaxtjoxrkuvgfv.jpg",
    },
  },
];
