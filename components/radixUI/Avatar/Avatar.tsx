import { AvatarProps } from "@core/types";
import * as Rx from "@radix-ui/react-avatar";

export const Avatar = ({ src, placeholder, className }: AvatarProps) => {
  return (
    <Rx.Root>
      <Rx.Image
        src={src}
        alt="user avatar"
        className={`rounded-full ${className}`}
      />

      <Rx.Fallback className="avatar placeholder">
        <div
          className={`bg-neutral-focus text-neutral-content rounded-full ${className}`}
        >
          <span className="sm:text-xl">{placeholder}</span>
        </div>
      </Rx.Fallback>
    </Rx.Root>
  );
};
