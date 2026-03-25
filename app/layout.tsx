import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vinhomes Real Estate | Căn Hộ Cao Cấp",
    template: "%s | Vinhomes Pro"
  },
  description: "Trang thông tin bất động sản Vinhomes cao cấp. Cập nhật quỹ căn liên tục từ chủ đầu tư.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="vi">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-[#E9C46A] selection:text-white bg-[#FFFFFF] text-[#2F2F2F] min-h-screen flex flex-col`}
        >
          {children}
        </body>
      </html>
      <Analytics />
    </>
  );
}
