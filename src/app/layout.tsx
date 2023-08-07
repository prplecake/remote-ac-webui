import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.scss";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import ThemeProvider from "@/app/ThemeContext";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "remote-ac-controller",
  description: "Remotely control AC with a Raspberry Pi.",
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <html lang="en">
      <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
