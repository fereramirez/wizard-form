import {Fragment_Mono} from "next/font/google";

import {cn} from "@/helpers/cn";

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

type DataCollectedProps = {
  children: React.ReactNode;
  className?: string;
};

export function DataCollected({children, className}: DataCollectedProps) {
  return (
    <section
      className={cn(
        fragmentMono.className,
        "grow overflow-x-hidden overflow-y-auto p-2",
        className,
      )}
    >
      {children}
    </section>
  );
}
