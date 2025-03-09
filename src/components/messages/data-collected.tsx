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
  keyName?: string;
  value?: string;
};

export function DataCollected({children, className, keyName, value}: DataCollectedProps) {
  return (
    <section
      className={cn(
        fragmentMono.className,
        "grow overflow-x-hidden overflow-y-auto rounded-xs bg-white text-black [&_p]:px-2",
        className,
      )}
    >
      {keyName && value ? (
        <div className="border-primary-3 sticky top-0 grid auto-rows-fr grid-cols-2 gap-2 border-b bg-black py-1 text-white">
          <p>{keyName}</p>
          <p>{value}</p>
        </div>
      ) : null}

      {children}
    </section>
  );
}

/*

<table
  className={cn(
    fragmentMono.className,
    "grow overflow-x-hidden overflow-y-auto rounded-xs bg-white text-black [&_td]:px-2 [&_th]:px-2",
    className,
  )}
>
  {keyName && value ? (
    <thead>
      <tr className="border-primary-3 sticky top-0 grid auto-rows-fr grid-cols-2 gap-2 border-b bg-black py-1 text-left text-white">
        <th>{keyName}</th>
        <th>{value}</th>
      </tr>
    </thead>
  ) : null}

  <tbody>{children}</tbody>
</table>

*/
