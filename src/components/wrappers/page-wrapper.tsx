import {cn} from "@/helpers/cn";

type PageWrapperProps = {
  className?: string;
  children: React.ReactNode;
};

export function PageWrapper({className, children}: PageWrapperProps) {
  return (
    <section
      className={cn(
        "fade-in relative m-auto flex w-full grow flex-col items-center justify-center gap-4",
        className,
      )}
    >
      {children}
    </section>
  );
}
