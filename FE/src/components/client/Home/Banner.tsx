import { Carousel } from "antd";

const Banner = () => {
  return (
    <>
      <div className="bg-white rounded-xl my-10">
        <div className="flex flex-row justify-between items-center">
          <div className="w-full md:w-3/4 md:pl-5 p-5">
            <Carousel autoplay draggable>
              <img src="/images/banner/banner-1.webp" className="rounded-xl" />

              <img src="/images/banner/banner-2.webp" className="rounded-xl" />

              <img src="/images/banner/banner-3.webp" className="rounded-xl" />

              <img src="/images/banner/banner-4.webp" className="rounded-xl" />

              <img src="/images/banner/banner-5.webp" className="rounded-xl" />
            </Carousel>
          </div>

          <div className="w-full flex flex-col gap-3 px-4 py-10">
            <img
              src="/images/banner/banner-right-1.webp"
              className="rounded-xl hidden md:block hover:scale-105"
            />
            <img
              src="/images/banner/banner-right-2.webp"
              className="rounded-xl hidden md:block hover:scale-105"
            />
            <img
              src="/images/banner/banner-right-3.webp"
              className="rounded-xl hidden md:block hover:scale-105"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
