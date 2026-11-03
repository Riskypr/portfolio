// src/app/layout.tsx
import { Metadata } from "next";
import "./globals.css";
import ContactPanel from "@/src/components/layout/ContactPanel";
import BackToTopButton from "@/src/components/layout/BackToTopButton";

export const metadata: Metadata = {
  title: "Risky Prasetyo | Portfolio",
  description: "Portfolio of Risky Prasetyo, a frontend developer focused on modern web experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans+Flex:opsz,wght@6..144,100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-white text-black">
        {children}
        <ContactPanel />
        <BackToTopButton />
      </body>
    </html>
  );
}
