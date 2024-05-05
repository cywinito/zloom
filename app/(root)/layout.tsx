import { Metadata } from "next";
import StreamClientProvider from "@/providers/StreamClientProvider";

export const metadata: Metadata = {
  title: "Zloom",
  description: "Video Conferencing App",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <StreamClientProvider>{children}</StreamClientProvider>
    </main>
  );
};

export default RootLayout;
