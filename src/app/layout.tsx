import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { Footer } from "@/app/components/Footer";
import { Navbar } from "@/app/components/Navbar";
import { Providers } from "@/app/components/Providers";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE_NAME} — Pegada hídrica digital e cotidiana`,
  description:
    "Descubra quanta água invisível há no seu prato, no seu guarda-roupa e nos comandos de IA. Calculadora, simulador, comparador e quiz educativo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${fraunces.variable} h-full`} suppressHydrationWarning>
      <body className="bg-grid flex min-h-full flex-col antialiased">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
