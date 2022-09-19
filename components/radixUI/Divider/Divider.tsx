import { DividerProps } from "@core/types";
import * as Separator from "@radix-ui/react-separator";

export const Divider = ({
  orientation = "horizontal",
  decorative = false,
  className,
}: DividerProps) => {
  return (
    <Separator.Root
      orientation={orientation}
      decorative={decorative}
      className={`divider ${
        orientation === "horizontal" ? "divider-horizontal" : "divider-vertical"
      } ${className}`}
    />
  );
};
