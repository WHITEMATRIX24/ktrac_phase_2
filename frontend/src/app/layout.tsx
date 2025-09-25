import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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
<Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    style: {
      fontSize: "16px",   // bigger text
      padding: "16px 24px",
      minWidth: "300px",
      borderRadius: "8px",
      marginTop:"120px",
    },
    /* success: {
      style: {
        background: "#4caf50",
        color: "#fff",
      },
    },
    error: {
      style: {
        background: "#f44336",
        color: "#fff",
      },
    }, */
  }}
/>

      </body>
    </html>
  );
}
