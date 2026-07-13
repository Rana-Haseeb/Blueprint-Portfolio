import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ViewportFrame from "./components/ViewportFrame";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rana Haseeb · Blueprint",
  description:
    "Portfolio of Rana Muhammad Haseeb Khan — full-stack (MERN · Next.js) software engineer & AI/ML enthusiast, rendered as a CAD schematic interface.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="relative min-h-full bg-blueprint-dark bg-blueprint-grid font-mono text-blueprint-light">
        {/* Global CAD viewport chrome */}
        <ViewportFrame />

        {/* Route content sits above the grid, inside the frame margins */}
        <main className="relative z-10 flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
