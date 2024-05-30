import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zloom",
  description: "Video Conferencing App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
