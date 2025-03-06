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
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "hover:bg-color-primary disabled:bg-color-primary-darker flex min-h-10 w-full cursor-pointer items-center justify-center rounded-xs border-none bg-white text-base font-bold text-black transition-all duration-200 ease-linear outline-none hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white disabled:cursor-auto motion-reduce:transition-none sm:min-h-14 sm:text-2xl",
        className,
      )}
      type={type}
    >
      {isLoading ? <Spinner className="h-10 w-auto text-white" data-testid="spinner" /> : text}
    </button>
  );
}
