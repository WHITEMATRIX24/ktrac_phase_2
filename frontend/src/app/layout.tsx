import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-header",
});

const raleway = Montserrat({
  subsets: ["latin"],
  weight: ["100", "400", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "KTRAC - Your Gateway Towards Gods Own Country",
  description: "Enroute kerala",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${raleway.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
