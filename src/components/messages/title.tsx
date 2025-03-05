import {type ReactNode} from "react";

import {cn} from "@/helpers/cn";

type TitleProps = {
  className?: string;
  children?: ReactNode;
};

export function Title({className, children}: TitleProps) {
  return <h1 className={cn("text-xl font-black sm:text-4xl", className)}>{children}</h1>;
}
