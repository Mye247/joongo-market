import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "중고나라~",
  description: "Generated by create next app",
};

export default function HTMLLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={` antialiased`}>{children}</body>
    </html>
  );
}
