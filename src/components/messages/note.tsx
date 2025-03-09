import {cn} from "@/helpers/cn";

type NoteProps = {
  children: React.ReactNode;
  className?: string;
};

export function Note({children, className}: NoteProps) {
  return <p className={cn("text-base sm:text-lg", className)}>{children}</p>;
}
