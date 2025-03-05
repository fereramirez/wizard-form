import {cn} from "@/helpers/cn";

interface QuestionProps {
  className?: string;
  children?: React.ReactNode;
}

export function Question({children, className}: QuestionProps) {
  return (
    <legend
      className={cn(
        "w-full text-left text-base font-semibold text-balance supports-moz-none:font-medium sm:text-xl",
        className,
      )}
    >
      {children}
    </legend>
  );
}
