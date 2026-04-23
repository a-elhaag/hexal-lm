import "~/styles/globals.css";

import { type Metadata } from "next";
import { Quicksand, JetBrains_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Hexal LM — Multi-model council platform",
  description: "Run your query across multiple AI models in parallel. They debate, review each other, and you get the synthesis.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${quicksand.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
