import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/provider";
import HeaderPage from "@/components/header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Discussion",
  description: "Created By: Gaurav Rajput",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-r from-purple-500 to-indigo-600 text-white min-h-screen flex flex-col`}
    >
      <Providers>
        <HeaderPage />
        <main className="flex-grow">{children}</main>
        <Footer />
      </Providers>
    </body>
  </html>
);

}
