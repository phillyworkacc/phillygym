import "@/styles/global.css";
import "@/styles/site.css";
import type { Metadata } from "next";
import { ModalProvider } from "@/components/Modal/ModalContext";
import { ManropeFont } from "./fonts";
import { Toaster } from "sonner";
import SessionWrapper from "@/components/SessionWrapper/SessionWrapper";

export const metadata: Metadata = {
  title: "Philly Gym",
  description: "A community for guys and girls to jacked, share progress and understand muscle growth",
};

export default function RootLayout({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <ModalProvider>
        <html lang="en" className={ManropeFont.className}>
          <head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="theme-color" content="#ffffff" />
          </head>
          <body className={ManropeFont.className}>
            <Toaster richColors position="top-center" />
            {children}
          </body>
        </html>
      </ModalProvider>
    </SessionWrapper>
  );
}
