import type { Metadata } from "next";
import { Spectral, Atkinson_Hyperlegible, Geist } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spectral",
  display: "swap",
});

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-atkinson",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Claude Code: A Field Guide, Penn State CS",
  description:
    "A curated resource guide for Penn State freshman CS students building real projects with Claude Code.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spectral.variable} ${atkinson.variable} ${geist.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
