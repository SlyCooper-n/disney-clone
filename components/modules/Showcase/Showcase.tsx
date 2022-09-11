import { Card, SliderCaret } from "@components/widgets";
import { ShowcaseProps } from "@core/types";
import { Navigation } from "swiper";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";

export const Showcase = ({ videosList }: ShowcaseProps) => {
  return (
    <>
      {videosList.map((item, i) => (
        <section key={item.id} className="my-12">
          <h2 className="text-2xl mb-4">{item.title}</h2>

          <div className="relative flex">
            <SliderCaret
              variant="left"
              className={`showcase-${i}-swiper-prev bg-black bg-opacity-40`}
            />

            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: `.showcase-${i}-swiper-prev`,
                nextEl: `.showcase-${i}-swiper-next`,
              }}
              spaceBetween={16}
              slidesPerView={4}
              slidesPerGroup={4}
              className="w-full overflow-visible"
            >
              {item.videos.map((video) => (
                <SwiperSlide key={video.id}>
                  {({ isPrev }) => (
                    <Card
                      videoData={video}
                      className={`${
                        isPrev &&
                        "brightness-50 pointer-events-none hover:scale-100 hover:ring-0 hover:cursor-auto"
                      }`}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            <SliderCaret
              variant="right"
              className={`showcase-${i}-swiper-next bg-black bg-opacity-50 hover:bg-opacity-70`}
            />
          </div>
        </section>
      ))}
    </>
  );
};
