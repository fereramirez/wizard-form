import {type ButtonHTMLAttributes} from "react";

import {cn} from "@/helpers/cn";
import Spinner from "@/assets/spinner.svg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  className?: string;
};

export function Button({
  text,
  type = "submit",
  isLoading = false,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      aria-disabled={disabled}
      className={cn(
        "hover:bg-color-primary flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xs border-none bg-white py-2 text-base font-bold text-black transition-all duration-200 ease-linear outline-none hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white motion-reduce:transition-none sm:min-h-14 sm:text-2xl",
        className,
        disabled ? "pointer-events-none opacity-50" : "",
      )}
      disabled={disabled}
      type={type}
    >
      {isLoading ? (
        <Spinner className="h-8 w-auto animate-spin" data-testid="spinner" fill="currentColor" />
      ) : (
        text
      )}
    </button>
  );
}
