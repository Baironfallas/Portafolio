import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
  title: "Bairon FB | Fullstack Developer | React & NestJS",
  description:
    "Fullstack Developer especializado en desarrollo web con React y NestJS. Creo aplicaciones escalables y mantenibles con arquitectura limpia.",
  keywords: [
    "Fullstack Developer",
    "Desarrollador Web",
    "React Developer",
    "NestJS",
    "JavaScript",
    "TypeScript",
    "Frontend",
    "Backend",
    "Arquitectura de Software",
    "Bairon Fallas",
  ],
  authors: [{ name: "Bairon Fallas Baltodano" }],
  creator: "Bairon Fallas Baltodano",
  publisher: "Bairon FB",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
  },
  category: "Technology",
  classification: "Portfolio",

  openGraph: {
    title: "Bairon FB | Fullstack Developer",
    description:
      "Fullstack Developer especializado en desarrollo web con React y NestJS. Creo aplicaciones escalables y mantenibles.",
    url: "https://portafolio-two-rho-64.vercel.app/",
    siteName: "Bairon FB Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bairon FB | Fullstack Developer",
        type: "image/png",
      },
    ],
    type: "website",
    locale: "es_ES",
  },

  twitter: {
    card: "summary_large_image",
    title: "Bairon FB | Fullstack Developer",
    description:
      "Fullstack Developer especializado en desarrollo web con React y NestJS.",
    images: ["/og-image.png"],
    creator: "@BaironFB",
  },

  alternates: {
    canonical: "https://portafolio-two-rho-64.vercel.app/",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bairon Fallas Baltodano",
    alternateName: "Bairon FB",
    url: "https://portafolio-two-rho-64.vercel.app/",
    email: "fallasbaltodanobairon@gmail.com",
    jobTitle: "Fullstack Developer",
    knowsAbout: [
      "React",
      "NestJS",
      "TypeScript",
      "JavaScript",
      "Frontend Development",
      "Backend Development",
      "Software Architecture",
    ],
    sameAs: [
      "https://github.com/Baironfallas",
      "https://www.linkedin.com/in/bairon-fallas-baltodano-b9b439347/",
    ],
    image: "https://portafolio-two-rho-64.vercel.app/og-image.png",
    description:
      "Fullstack Developer especializado en React y NestJS. Creo aplicaciones escalables con arquitectura limpia.",
  };

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Bairon FB" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
