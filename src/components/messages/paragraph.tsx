import {cn} from "@/helpers/cn";

interface ParagraphProps {
  type?: "question" | "error" | "hidden-error";
  text: string;
  className?: string;
}

export function Paragraph({type, text, className}: ParagraphProps) {
  if (type === "question")
    return (
      <legend
        className={cn(
          "w-full text-left text-base font-semibold text-balance supports-moz-none:font-medium sm:text-xl",
          className,
        )}
      >
        {text}
      </legend>
    );

  if (type === "error")
    return (
      <p
        aria-label={text}
        className={cn(
          "text-color-red text-center text-xs font-medium supports-moz-none:font-normal sm:text-sm",
          className,
        )}
        role="alert"
      >
        {text}
      </p>
    );

  if (type === "hidden-error")
    return (
      <p
        className={cn(
          "invisible text-xs font-medium supports-moz-none:font-normal sm:text-sm",
          className,
        )}
        data-testid="hidden-error"
      >
        {text}
      </p>
    );

  return (
    <p
      className={cn(
        "w-full text-sm font-semibold supports-moz-none:font-medium sm:text-base",
        className,
      )}
    >
      {text}
    </p>
  );
}
