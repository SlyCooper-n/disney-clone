import { CaretLeft, CaretRight } from "phosphor-react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";

export const BannerSwiper = () => {
  return (
    <div className="relative w-full flex">
      <div className="banner-swiper-prev absolute top-0 left-0 w-16 h-16 flex justify-center items-center hover:bg-black hover:bg-opacity-40 z-10">
        <CaretLeft />
      </div>

      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        rewind
        autoplay={{ delay: 5000 }}
        navigation={{
          prevEl: ".banner-swiper-prev",
          nextEl: ".banner-swiper-next",
        }}
        pagination={{ clickable: true }}
        spaceBetween={50}
        className="w-full h-16 overflow-visible"
      >
        <SwiperSlide className="bg-white w-4/5">Slide 1</SwiperSlide>
        <SwiperSlide className="">
          {({ isActive }) => (
            <div
              className={`${
                isActive ? "" : "brightness-50"
              } bg-blue-500 h-full`}
            >
              Current slide is {isActive ? "active" : "not active"}
            </div>
          )}
        </SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>

      <div className="banner-swiper-next absolute top-0 right-0 w-16 h-16 flex justify-center items-center hover:bg-black hover:bg-opacity-40 z-10">
        <CaretRight />
      </div>
    </div>
  );
};
