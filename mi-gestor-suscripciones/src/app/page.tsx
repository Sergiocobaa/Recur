import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Bell, Search, Lock } from "lucide-react"
import { LandingDashboard } from "@/components/landing-dashboard";
import { LandingNavbarActions } from "@/components/landing-navbar-actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recur | Gestor de Suscripciones",
  description: "Para de perder dinero en suscripciones olvidadas. Centraliza, controla y recibe avisos antes de cada renovación.",
  keywords: ["gestor de suscripciones", "control de suscripciones", "Netflix", "Spotify", "suscripciones olvidadas", "rastreador de suscripciones"],
  openGraph: {
    title: "Recur — La app de tus suscripciones",
    description: "Para de pagar por servicios que no usas. Controla todas tus suscripciones en un solo lugar.",
    url: "https://recur.es",
    siteName: "Recur",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function LandingPage() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Recur",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    description: "Gestor de suscripciones personales. Controla Netflix, Spotify y cualquier gasto recurrente.",
    featureList: "Control de suscripciones, Avisos de renovación, Privacidad total",
  };

  return (
    <div className="min-h-screen bg-white font-sans relative overflow-hidden selection:bg-blue-100">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Fondos */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="fixed left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 hover:opacity-80 transition-opacity" aria-label="Recur Inicio">
            <Image src="/icon-192.png" alt="Recur" width={32} height={32} className="h-8 w-8 rounded-lg" />
            <span className="hidden sm:inline-block">Recur</span>
          </Link>
          <LandingNavbarActions />
        </div>
      </nav>

      <main className="flex flex-col items-center">

        {/* HERO */}
        <section className="w-full pt-20 pb-16 md:pt-32 md:pb-24 text-center px-4 sm:px-6 max-w-5xl mx-auto space-y-6 md:space-y-8 relative z-10">

          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs sm:text-sm font-medium text-blue-700 mb-2 md:mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            Avisos automáticos antes de cada renovación
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] sm:leading-[1.1]">
            Todas tus suscripciones,{" "}
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 block sm:inline mt-2 sm:mt-0">
              bajo control.
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed px-2">
            Recur es la app que centraliza tus suscripciones, te avisa antes de cada renovación y te ayuda a descubrir las que llevas meses pagando sin usar.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 sm:h-14 px-8 text-base sm:text-lg bg-slate-900 hover:bg-slate-800 rounded-full shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30 transition-all hover:-translate-y-1">
                Empezar Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mt-2 sm:mt-0">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Sin tarjeta requerida
            </div>
          </div>
        </section>

        {/* MOCKUP */}
        <section className="w-full max-w-7xl px-2 sm:px-6 mb-24 md:mb-32">
          <div className="relative mx-auto transform-gpu transition-all duration-500 hover:scale-[1.01]">
            <LandingDashboard />
          </div>
        </section>

        {/* LOGOS */}
        <section className="w-full py-20 border-y border-slate-100 bg-slate-50/50">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm font-bold text-slate-400 mb-12 uppercase tracking-widest">
              Gestiona cualquier suscripción recurrente
            </p>
            {/*
              LOGOS: descarga estos 4 archivos y colócalos en /public/logos/
              - netflix.png      → https://images.icon-icons.com/2699/PNG/512/netflix_logo_icon_170919.png
              - amazon-prime.png → https://img.icons8.com/color/600/amazon-prime.png
              - chatgpt.png      → https://cdn.iconscout.com/icon/free/png-256/free-chatgpt-icon-svg-download-png-7576880.png
              - adobe.png        → https://cdn-icons-png.flaticon.com/512/732/732171.png
            */}
            <div className="flex flex-wrap items-center justify-center gap-12 md:gap-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <Image src="/logos/netflix.png" alt="Netflix" width={64} height={64} className="h-12 md:h-16 w-auto object-contain hover:scale-110 transition-transform duration-300" />
              <Image src="/logos/amazon-prime.png" alt="Amazon Prime" width={64} height={64} className="h-12 md:h-16 w-auto object-contain hover:scale-110 transition-transform duration-300" />
              <Image src="/logos/chatgpt.png" alt="ChatGPT" width={64} height={64} className="h-12 md:h-16 w-auto object-contain hover:scale-110 transition-transform duration-300" />
              <Image src="/logos/adobe.png" alt="Adobe" width={64} height={64} className="h-12 md:h-16 w-auto object-contain hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="w-full max-w-6xl px-4 sm:px-6 py-24">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Simple. Claro. Sin ruido.
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Recur hace una cosa bien: tus suscripciones, controladas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-blue-200 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">Descubre las olvidadas</h3>
              <p className="text-slate-500">¿Cuánto llevas pagando ese servicio que ya no usas? Recur te lo pone delante.</p>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-amber-200 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
                <Bell className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">Avisos antes de renovar</h3>
              <p className="text-slate-500">Recibe un email 3 días antes de cada cobro. Tiempo suficiente para cancelar si quieres.</p>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-emerald-200 hover:shadow-lg">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-slate-900">100% Privado</h3>
              <p className="text-slate-500">Sin conexión bancaria. Tú decides qué añades. Tus datos no salen de tu cuenta.</p>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="w-full px-4 sm:px-6 py-20 bg-slate-900 text-white text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              ¿Sabes cuánto gastas en suscripciones este mes?
            </h2>
            <p className="text-slate-400 text-lg">
              La mayoría de personas no lo sabe. Recur te lo dice en 2 minutos.
            </p>
            <Link href="/login" className="inline-block">
              <Button size="lg" className="h-14 px-8 text-lg bg-white text-slate-900 hover:bg-slate-100 rounded-full">
                Crear cuenta gratis
              </Button>
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="w-full bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
              <div className="col-span-2 md:col-span-1">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
                  <Image src="/icon-192.png" alt="Recur" width={32} height={32} className="h-8 w-8 rounded-lg" />
                  Recur
                </Link>
                <p className="text-sm leading-relaxed mb-6">
                  La app de tus suscripciones. Punto.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Producto</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors">Características</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Precios</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Legal</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="#" className="hover:text-white transition-colors">Privacidad</Link></li>
                  <li><Link href="#" className="hover:text-white transition-colors">Términos</Link></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
              <p>© 2025 Recur. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}
