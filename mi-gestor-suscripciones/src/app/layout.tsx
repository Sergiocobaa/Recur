import type { Metadata } from "next";
// 1. Importamos la utilidad para fuentes locales
import localFont from "next/font/local";
import "./globals.css";

// 2. Configuramos la fuente Kaio
const kaio = localFont({
  src: [
    {
      path: './fonts/KaioTRIAL-Regular-BF65f24de206d9d.otf', // Asegúrate que la ruta coincide
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/KaioTRIAL-Medium-BF65f24de1b8279.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/KaioTRIAL-Bold-BF65f24de19552f.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-kaio', // Esto crea una variable CSS para usarla
});

export const metadata: Metadata = {
  title: "Recur - Gestor de Suscripciones",
  description: "Controla tus gastos recurrentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/* 3. Añadimos la variable font-kaio y la clase font-sans */}
      <body className={`${kaio.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}