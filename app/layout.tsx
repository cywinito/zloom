import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zloom",
  description: "Video Conferencing App",
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
