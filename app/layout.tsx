import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portafolio-two-rho-64.vercel.app/"),
  title: "Bairon FB | Fullstack Developer",
  description:
    "Fullstack Developer especializado en React y NestJS. Construyo aplicaciones escalables con arquitectura limpia y experiencia premium.",
  icons: {
    icon: "/icon.png",
  },

  openGraph: {
    title: "Bairon FB | Fullstack Developer",
    description:
      "Fullstack Developer especializado en React y NestJS. Construyo aplicaciones escalables con arquitectura limpia y experiencia premium.",
    url: "https://portafolio-two-rho-64.vercel.app/",
    siteName: "Bairon Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bairon FB | Fullstack Developer",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Bairon FB | Fullstack Developer",
    description:
      "Fullstack Developer especializado en React y NestJS. Construyo aplicaciones escalables con arquitectura limpia y experiencia premium.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
