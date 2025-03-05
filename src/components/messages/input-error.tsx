import {Inter} from "next/font/google";

import {Paragraph} from "./paragraph";

import Warn from "@/assets/warn.svg";
import {cn} from "@/helpers/cn";

const inter = Inter({
  subsets: ["latin"],
  weight: ["500"], // weight 500 para el font-medium
});

type InputErrorProps = {
  error: unknown; //!type: string | undefined
  className?: string;
};

export function InputError({error, className}: InputErrorProps) {
  return (
    <>
      {error ? (
        <div
          className={cn(
            "flex w-fit items-center gap-2 rounded-xs px-2 py-1 text-sm",
            "bg-destructive text-white/80",
            /* "text-destructive bg-white/70", */
            inter.className,
            className,
          )}
        >
          <Warn className="size-6" fill="currentColor" />

          <span>{error as string}</span>
        </div>
      ) : (
        <Paragraph className="h-8" text="hidden placeholder" type="hidden-error" />
      )}
    </>
  );
}
