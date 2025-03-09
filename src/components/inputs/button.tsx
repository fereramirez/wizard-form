import {cva, type VariantProps} from "class-variance-authority";
import React, {type ReactNode} from "react";

import Spinner from "@/assets/spinner.svg";
import {cn} from "@/helpers/cn";

export const buttonVariants = cva(
  "flex min-h-12 w-full cursor-pointer items-center justify-center gap-4 rounded-xs border-2 p-2 text-xl font-bold whitespace-nowrap transition-colors duration-200 outline-none disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none sm:min-h-14 sm:text-2xl",
  {
    variants: {
      variant: {
        default:
          "bg-black text-white border-black hover:bg-primary-3 hover:border-primary-3 focus-visible:border-white",
        outline: "text-white border-primary-3 hover:bg-primary-3 focus-visible:border-white",
        secondary:
          "bg-primary-3 text-white border-primary-3 hover:bg-black hover:border-black focus-visible:border-white",
        ghost:
          "text-white border-transparent hover:bg-primary-3 hover:border-primary-3 focus-visible:border-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    isLoading?: boolean;
    children?: ReactNode;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, type = "submit", isLoading, children, ...props}, ref) => {
    return (
      <button ref={ref} className={cn(buttonVariants({variant, className}))} type={type} {...props}>
        {isLoading ? (
          <Spinner className="h-8 w-auto animate-spin" data-testid="spinner" fill="currentColor" />
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
