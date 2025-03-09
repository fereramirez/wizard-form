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
        <header className="sticky top-0 z-10 bg-white px-4 text-xl leading-[3rem] font-bold sm:px-8 sm:leading-[4rem]">
          <Link
            className="hover:text-primary-1 text-primary-3 text-2xl font-bold tracking-tighter transition-colors duration-200"
            href="/"
          >
            Wizard Form
          </Link>
        </header>

        {children}

        {/* <footer className="shrink-0 bg-black text-center leading-[3rem] text-white">
          wizard-form
        </footer> */}
      </body>
    </html>
  );
}
