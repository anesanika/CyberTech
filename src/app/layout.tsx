import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NavbarWrapper from "./components/navbar/NavbarWrapper";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import { Breadcrumbs } from "./components/breadcruds/Breadcrumbs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cyber Tech",
  description: "Online tech store with lots of techs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <NavbarWrapper />
        </AuthProvider>
        <Breadcrumbs />
        <div className="max-[768]:mt-10">{children}</div>
      </body>
    </html>
  );
}
