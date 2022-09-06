import { logo } from "@/images";
import Image from "next/image";
import { HTMLAttributes } from "react";

export const Logo = ({ ...rest }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...rest}>
      <Image src={logo} alt="Disney+ clone logo" layout="responsive" priority />
    </div>
  );
};
