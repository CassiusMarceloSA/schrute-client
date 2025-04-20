import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ManagemateAI",
  description:
    "AI-powered task management application with real-time notifications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} antialiased bg-neutral-900 grid place-items-center`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
