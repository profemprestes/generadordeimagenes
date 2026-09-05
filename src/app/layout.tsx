import type { Metadata } from "next";
import { Outfit, Anton, Bebas_Neue, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import "./globals.css";

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fontDisplay = Anton({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  display: "swap",
});

const fontSubheading = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-subheading",
  weight: ["400"],
  display: "swap",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Estudio de Generación de Imágenes IA | Envíos DosRuedas",
  description: "Suite de creación visual, prompts y optimización de imágenes con Inteligencia Artificial para Envíos DosRuedas.",
  keywords: "generador de imagenes, ia, prompts, envios dosruedas, mar del plata, logistics visual design, studio",
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#0950F6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontSubheading.variable} ${fontMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased min-h-screen bg-background text-foreground flex flex-col selection:bg-brand-yellow selection:text-brand-blue-deep">
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
