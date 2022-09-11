import { BannerSwiperProps } from "@core/types";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { SliderCaret } from "../SliderCaret";

export const BannerSwiper = ({ slides }: BannerSwiperProps) => {
  return (
    <div className="relative w-full flex">
      <SliderCaret variant="left" />

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
        className="w-full h-[350px] overflow-visible"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {({ isActive }) => (
              <Link href={`/${slide.type}/${slide.slug}`}>
                <a
                  className={`${
                    !isActive && "brightness-50"
                  } relative block h-full hover:ring-2 hover:ring-white rounded-md shadow-2xl transition-all duration-1000`}
                >
                  <Image
                    src={slide.imageUrl}
                    alt={`${slide.title} banner`}
                    layout="fill"
                    className="object-cover object-top rounded-md"
                  />

                  <div
                    className={`absolute top-1/2 left-12 -translate-y-1/2 w-1/3 aspect-video ${
                      isActive
                        ? "translate-x-0 opacity-100"
                        : "translate-x-10 opacity-0"
                    } transition-all duration-700 delay-200`}
                  >
                    <Image
                      src={slide.logo}
                      alt={`${slide.title} logo`}
                      layout="fill"
                    />
                  </div>
                </a>
              </Link>
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      <SliderCaret variant="right" />
    </div>
  );
};
