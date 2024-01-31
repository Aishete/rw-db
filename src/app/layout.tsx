import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "../app/context/AuthContext";
const inter = Inter({ subsets: ["latin"] });

import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "RW Database",
  description: "RW Database",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
