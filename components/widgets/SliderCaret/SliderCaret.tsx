import { SliderCaretProps } from "@core/types";
import { CaretLeft, CaretRight } from "phosphor-react";

export const SliderCaret = ({ variant }: SliderCaretProps) => {
  return (
    <div
      className={`absolute top-0 ${
        variant === "right"
          ? "right-0 banner-swiper-next rounded-r-md"
          : "left-0 banner-swiper-prev rounded-l-md"
      } bottom-0 w-16 h-full flex justify-center items-center text-white hover:bg-black hover:bg-opacity-20 z-10 cursor-pointer transition-all duration-300`}
    >
      {variant === "right" ? (
        <CaretRight size={32} weight="bold" />
      ) : (
        <CaretLeft size={32} weight="bold" />
      )}
    </div>
  );
};
