import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Webflow Expert & Next.js Developer - Eve Kayser",
  description:
    "Agency-level web development services at freelancer rates. High-performance Next.js apps, Webflow development, UI design, AEO optimization, and WCAG accessibility.",
  keywords: [
    "Eve Kayser",
    "Webflow Expert",
    "Next.js Developer",
    "React Developer",
    "UI UX Design",
    "AEO Optimization",
    "Freelance Developer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakartaSans.variable} scroll-smooth`}>
      <body className="antialiased bg-[#08090B] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
