import { LoadingProps } from "@core/types";
import { CircleNotch } from "phosphor-react";

export const Loading = ({ page, size }: LoadingProps) => {
  if (page) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <CircleNotch size={size ?? 32} className="animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <CircleNotch size={size ?? 32} className="animate-spin text-blue-500" />
  );
};
