import {cn} from "@/helpers/cn";

interface ParagraphProps {
  type?: "question";
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
