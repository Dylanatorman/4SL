import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "4StudentLives - VC Brief | Investor Presentation",
  description: "Transforming School Safety Through Intelligent Assessment & Response",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
