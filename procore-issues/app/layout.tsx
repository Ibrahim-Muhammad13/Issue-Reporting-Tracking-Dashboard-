import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Issue Reporting & Tracking Dashboard | Procore",
  description: "Monitor, prioritize and resolve construction issues across all active sites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
