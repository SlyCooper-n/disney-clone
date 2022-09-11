import { SliderCaretProps } from "@core/types";
import { CaretLeft, CaretRight } from "phosphor-react";

export const SliderCaret = ({ variant, className }: SliderCaretProps) => {
  return (
    <div
      className={`hidden absolute top-0 ${
        variant === "right" ? "right-0 rounded-r-md" : "left-0 rounded-l-md"
      } bottom-0 w-16 h-full sm:flex justify-center items-center text-white hover:bg-black hover:bg-opacity-20 z-10 cursor-pointer transition-all duration-300 ${className}`}
    >
      {variant === "right" ? (
        <CaretRight size={32} weight="bold" />
      ) : (
        <CaretLeft size={32} weight="bold" />
      )}
    </div>
  );
};
