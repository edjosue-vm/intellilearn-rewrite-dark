import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IntelliLearn - Adaptive Learning System",
  description: "Interactive visual explanations that adapt to your learning style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
