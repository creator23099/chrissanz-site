// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";  // use @ alias if tsconfig is set
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* make sure footer sticks to bottom */}
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}