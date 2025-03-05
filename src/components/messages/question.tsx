import {cn} from "@/helpers/cn";

interface QuestionProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  asLabel?: boolean;
  htmlFor?: string;
}

export function Question({children, className, id, asLabel = false, htmlFor}: QuestionProps) {
  if (asLabel) {
    return (
      <label
        className={cn(
          "w-full text-left text-base font-semibold text-balance supports-moz-none:font-medium sm:text-xl",
          className,
        )}
        htmlFor={htmlFor}
        id={id}
      >
        {children}
      </label>
    );
  }

  return (
    <legend
      className={cn(
        "w-full text-left text-base font-semibold text-balance supports-moz-none:font-medium sm:text-xl",
        className,
      )}
      id={id}
    >
      {children}
    </legend>
  );
}
