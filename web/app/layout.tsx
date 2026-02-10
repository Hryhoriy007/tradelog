import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeToggle } from "@/app/components/ui/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TradeLog",
  description: "Journal your crypto trades",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Init theme BEFORE hydration (avoid flash + avoid mismatch via suppressHydrationWarning) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  try {
    var key = "tradelog_theme_v1";
    var t = (localStorage.getItem(key) || "").toLowerCase();
    document.documentElement.dataset.theme = (t === "light") ? "light" : "dark";
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
            `.trim(),
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}

        {/* Global floating theme toggle */}
        <ThemeToggle variant="floating" />
      </body>
    </html>
  );
}
