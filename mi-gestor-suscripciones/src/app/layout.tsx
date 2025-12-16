import type { Metadata, Viewport } from "next"; // Importamos Viewport
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Tus fuentes (No tocamos nada)
const kaio = localFont({
  src: [
    { path: './fonts/KaioTRIAL-Regular-BF65f24de206d9d.otf', weight: '400', style: 'normal' },
    { path: './fonts/KaioTRIAL-Medium-BF65f24de1b8279.otf', weight: '500', style: 'normal' },
    { path: './fonts/KaioTRIAL-Bold-BF65f24de19552f.otf', weight: '700', style: 'normal' },
  ],
  variable: '--font-kaio',
});

// 1. METADATOS: Aquí vinculamos el manifest
export const metadata: Metadata = {
    title: {
      default: "Recur | Gestor de Suscripciones y Gastos Fijos",
      template: "%s | Recur"
    },
    description: "Deja de perder dinero en suscripciones olvidadas. Controla tus gastos fijos, detecta cobros ocultos y optimiza tu ahorro mensual con Recur.",
    keywords: ["gestor de suscripciones", "control de gastos", "finanzas personales", "ahorro mensual", "rastreador de gastos", "app finanzas"],
    authors: [{ name: "Sergio Coba" }], // Opcional
    creator: "Recur App",
    openGraph: {
      title: "Recur - Tu dinero, bajo control",
      description: "La forma más simple de gestionar tus suscripciones a Netflix, Spotify y gastos fijos.",
      url: "https://recur.es",
      siteName: "Recur",
      images: [
        {
          url: "/og-image.png", // Tendrás que crear esta imagen y ponerla en /public
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
      description: "Deja de tirar dinero. Gestiona todos tus gastos fijos en un solo lugar.",
      // images: ["/og-image.png"],
    },
    metadataBase: new URL("https://recur.es"), // IMPORTANTE: Cambia esto por tu dominio real (o localhost para probar)
  };
// 2. VIEWPORT: Para que parezca una app (sin zoom)
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
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WV9923SX');</script>
        {/* End Google Tag Manager */}
      </head>
      <body className={`${kaio.variable} font-sans antialiased overscroll-none`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WV9923SX"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}