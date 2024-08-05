import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import React from "react";
import Header from "@/components/header";
import Subheader from "@/components/subheader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mobilni medved kočevje",
  description:
    "Aplikacija za agregiranje in izboljševanje mobilnosti v Kočevju",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
