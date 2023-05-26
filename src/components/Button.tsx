import clsx from "clsx";
import { ReactNode } from "react";

type Size = "small" | "large";

type ButtonProps = {
  children?: ReactNode | ReactNode[];
  size?: Size;
} & JSX.IntrinsicElements["button"];

const sizes: Record<Size, string> = {
  large:
    "px-20 py-5  rounded-[18px] bg-violet-blue hover:bg-periwinkle hover:text-raisin-black duration-300 transition-all  text-white uppercase text-base font-semibold text-raisin-black",
  small:
    "px-[18px] py-5 rounded-[18px] bg-violet-blue hover:bg-periwinkle hover:text-raisin-black duration-300 transition-all text-white text-base uppercase font-semibold text-raisin-black",
};

const Button = ({
  children,
  size = "small",
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        sizes[size],
        {
          "bg-silver hover:bg-silver hover:text-white cursor-not-allowed": disabled,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

