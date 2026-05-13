import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: {
      default: "Recur | Gestor de Suscripciones",
      template: "%s | Recur"
    },
    description: "Deja de perder dinero en suscripciones olvidadas. Controla todos tus gastos recurrentes, detecta cobros ocultos y recibe avisos antes de cada renovación.",
    keywords: ["gestor de suscripciones", "control de suscripciones", "finanzas personales", "rastreador de suscripciones", "app suscripciones"],
    authors: [{ name: "Sergio Coba" }],
    creator: "Recur App",
    openGraph: {
      title: "Recur - Tus suscripciones, bajo control",
      description: "La forma más simple de gestionar tus suscripciones a Netflix, Spotify y cualquier servicio recurrente.",
      url: "https://recur.es",
      siteName: "Recur",
      images: [
        {
          url: "/icon-192.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Recur | Control total de tus suscripciones",
      description: "Deja de tirar dinero. Gestiona todos tus gastos recurrentes en un solo lugar.",
    },
    metadataBase: new URL("https://recur.es"),
  };

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WV9923SX');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased overscroll-none`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WV9923SX"
        height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
