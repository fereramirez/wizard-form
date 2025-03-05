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
        <header className="bg-white text-xl leading-[4rem] font-bold text-green-950">
          <Link className="text-2xl font-bold tracking-tighter" href="/">
            Wizard Form
          </Link>
        </header>

        {children}

        <footer className="text-center leading-[4rem] text-white opacity-70">wizard-form</footer>
      </body>
    </html>
  );
}
