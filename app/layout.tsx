import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bom Bàng Bang Shop",
  description: "Cute stationery store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}