import { ButtonProps } from "@core/types";

export const Button = ({ className, children, ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`btn focus:ring-2 ring-offset-4 ring-offset-base-100 ${className}`}
    >
      {children}
    </button>
  );
};
