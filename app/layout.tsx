// src/app/layout.tsx
import { Metadata } from "next";
import localFont from "next/font/local";
import { Plus_Jakarta_Sans } from "next/font/google"; // Contoh font body text bawaan kamu
import "./globals.css";

const calSans = localFont({
  src: "../node_modules/cal-sans/fonts/webfonts/CalSans-SemiBold.woff2",
  variable: "--font-cal-sans",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "My Porto",
  description: "Simple not bad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${calSans.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased bg-white text-black">
        {children}
      </body>
    </html>
  );
}