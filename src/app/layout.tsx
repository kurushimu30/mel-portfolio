import type { Metadata } from "next";
import { Inter, Bebas_Neue, Nothing_You_Could_Do } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const bebas = Bebas_Neue({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-bebas" 
});

const nothingYouCouldDo = Nothing_You_Could_Do({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-handwriting"
});

export const metadata = {
  title: "Mel Carl Chacon — Founder & Systems Builder",
  description:
    "Portfolio of Mel Carl Chacon — Founder of ARK, Systems Builder, and Game Producer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${bebas.variable} ${nothingYouCouldDo.variable} font-sans antialiased bg-[#090A0F] text-zinc-100 selection:bg-[#4A2C87] selection:text-white`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}