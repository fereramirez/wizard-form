import {type ReactNode, type ButtonHTMLAttributes} from "react";
import Link from "next/link";

import {cn} from "@/helpers/cn";
import Spinner from "@/assets/spinner.svg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  href?: string;
  className?: string;
  children?: ReactNode;
};

//! VOLVER A VER agregar variants para pasar ghost/primary/asLink

export function Button({
  type = "submit",
  isLoading = false,
  href,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  if (href) {
    return (
      <Link
        className={cn(
          "hover:bg-color-primary flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xs border-none bg-white py-2 text-base font-bold text-black transition-all duration-200 ease-linear outline-none hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white motion-reduce:transition-none sm:min-h-14 sm:text-2xl",
          className,
          disabled ? "pointer-events-none opacity-50" : "",
        )}
        href={href}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...rest}
      aria-disabled={disabled}
      className={cn(
        "hover:bg-color-primary flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xs border-none bg-white py-2 text-base font-bold text-black transition-all duration-200 ease-linear outline-none hover:bg-black hover:text-white focus-visible:bg-black focus-visible:text-white motion-reduce:transition-none sm:min-h-14 sm:text-2xl",
        className,
        disabled ? "pointer-events-none opacity-50" : "",
      )}
      disabled={disabled}
      type={type}
    >
      {isLoading ? (
        <Spinner className="h-8 w-auto animate-spin" data-testid="spinner" fill="currentColor" />
      ) : (
        children
      )}
    </button>
  );
}
