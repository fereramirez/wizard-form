import type {Metadata} from "next";

import {Unna} from "next/font/google";
import Link from "next/link";

import "../styles/globals.css";
import "../styles/globals.scss";

const unna = Unna({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "wizard-form",
  description: "Wizard Form",
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${unna.className} flex min-h-screen flex-col antialiased`}>
        <header className="absolute top-2 z-20 px-4 text-xl leading-[3rem] font-bold sm:px-8 sm:leading-[4rem]">
          <Link
            className="text-stroke text-2xl font-bold tracking-tighter text-white/80 outline-0 transition-all ease-linear hover:text-white"
            href="/"
          >
            Wizard Form
          </Link>
        </header>
        {/* <header className="sticky top-0 z-20 bg-white px-4 text-xl leading-[3rem] font-bold sm:px-8 sm:leading-[4rem]">
          <Link
            className="hover:text-primary-1 text-stroke text-primary-3 text-2xl font-bold tracking-tighter outline-0 transition-all ease-linear"
            href="/"
          >
            Wizard Form
          </Link>
        </header> */}

        <div className="noise" />
        {children}

        {/* <footer className="shrink-0 bg-black text-center leading-[3rem] text-white">
          wizard-form
        </footer> */}
      </body>
    </html>
  );
}
