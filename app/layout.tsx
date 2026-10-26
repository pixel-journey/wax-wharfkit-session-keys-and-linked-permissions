import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Session keys & linked permissions · Pixel Journey",
  description:
    "Educational limited-permission planner for WAX dApps with WharfKit",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
