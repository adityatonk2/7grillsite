import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import { CartProvider } from "@/components/Cart";
import { Header, TabBar, Footer } from "@/components/Shell";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", weight: ["600", "900"], style: ["normal", "italic"] });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
export const metadata: Metadata = { title: "7 GRILL | Pure veg burgers, sandwiches & coffee, Dehradun", description: "Scan, browse the menu, order on WhatsApp. Big cravings, little prices.", icons: { icon: "/img/logo.png" } };
export const viewport: Viewport = { themeColor: "#0B0B0B", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable}`}>
      <body suppressHydrationWarning><CartProvider><Header /><main>{children}</main><Footer /><TabBar /></CartProvider></body>
    </html>
  );
}
