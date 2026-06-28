import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUCID Hub | Europe’s trust-first super-app",
  description:
    "Private messaging, verified communities, local merchants, mini-apps, bookings, coupons, and future regulated partner payments for Europe."
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
