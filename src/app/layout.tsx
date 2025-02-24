import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { Poppins } from "next/font/google";
import { CartProvider } from "./[slug]/menu/contexts/cart";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FSW Donalds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        <CartProvider>{children}</CartProvider>

        <Toaster duration={7000} richColors />
      </body>
    </html>
  );
}
