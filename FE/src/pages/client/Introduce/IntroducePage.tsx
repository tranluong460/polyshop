import { Breadcrumb, Container, IntroduceCard } from "../../../components";

const IntroducePage = () => {
  const items = [
    {
      title: "Lịch sử của chúng tôi",
      label: "Bộ sưu tập xu hướng thời trang mới và sáng tạo",
      text: "Caroline Stevenson, người đứng đầu văn hóa và ... “Phân tích xu hướng của bất kỳ thời đại nào sẽ tiết lộ các giá trị và khát vọng của xã hội.” ... Sự thôi thúc thể hiện sáng tạo chạy sâu",
      description: [
        {
          label: "12",
          letter: "Năm kinh nghiệm",
        },
        {
          label: "20K",
          letter: "Khách hàng",
        },
        {
          label: "100%",
          letter: "Sự hài lòng của khách hàng",
        },
      ],
      order: false,
    },
    {
      title: "Tầm nhìn của chúng tôi",
      label:
        "Tầm nhìn của chúng tôi là đơn giản - chúng tôi tồn tại để tăng tốc tiến độ của khách hàng",
      text: "Chúng tôi thiết kế và mang đến sự chuyển đổi kỹ thuật số cho khách hàng bằng cách kết hợp tầm nhìn của họ với kiến thức ngành và chuyên môn sâu về công nghệ của chúng tôi. chúng tôi thiết kế và cung cấp chuyển đổi kỹ thuật số cho khách hàng của chúng tôi",
      description: [
        {
          label: "1",
          letter: "Chúng tôi xây dựng mối quan hệ mạnh mẽ",
        },
        {
          label: "2",
          letter: "Chúng tôi khuyến khích sáng kiến và cung cấp cơ hội",
        },
        {
          label: "2",
          letter: "Chúng tôi đón nhận sự thay đổi và sáng tạo",
        },
        {
          label: "4",
          letter: "Chúng tôi ủng hộ một môi trường trung thực",
        },
      ],
      order: true,
    },
  ];

  return (
    <>
      <Container>
        <div className="mt-2 mb-5">
          <Breadcrumb text="Giới thiệu" />
        </div>

        <div className="flex flex-col bg-white p-10 rounded-xl gap-10">
          {items.map((item) => (
            <div key={item.title}>
              <IntroduceCard item={item} order={item.order} />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default IntroducePage;
