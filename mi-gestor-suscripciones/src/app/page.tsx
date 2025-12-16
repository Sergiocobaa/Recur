import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LandingDashboard } from "@/components/landing-dashboard";
import { LandingNavbarActions } from "@/components/landing-navbar-actions";
import { HeroSection } from "@/components/landing/hero";
import { BrandSlider } from "@/components/landing/brands";
import { BentoGrid } from "@/components/landing/bento-grid";
import { Metadata } from "next";

// 1. METADATOS SEO
export const metadata: Metadata = {
  title: "Recur | Control de Suscripciones y Gastos Fijos",
  description: "La mejor app para gestionar suscripciones (Netflix, Spotify) y gastos recurrentes. Calcula tu dinero libre real y ahorra cada mes.",
  keywords: ["gestor de suscripciones", "control de gastos", "finanzas personales", "ahorro app", "rastreador de gastos", "software finanzas"],
  openGraph: {
    title: "Recur - Deja de perder dinero en suscripciones",
    description: "Controla tus gastos fijos y descubre cuánto dinero libre tienes realmente.",
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
    
    // 2. DATOS ESTRUCTURADOS (JSON-LD)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Recur',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
        },
        description: 'Gestor de suscripciones y control de gastos personales.',
        featureList: 'Control de suscripciones, Cálculo de dinero libre, Privacidad total',
    };

    return (
        <div className="min-h-screen bg-white font-sans relative overflow-x-hidden selection:bg-blue-100">
            
            {/* Inyección del JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Fondos Globales */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

            {/* --- NAVBAR --- */}
            <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900 hover:opacity-80 transition-opacity" aria-label="Recur Inicio">
                        <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">R.</div>
                        <span className="hidden sm:inline-block">Recur</span>
                    </Link>

                    <LandingNavbarActions />
                </div>
            </nav>

            <main className="flex flex-col items-center w-full">

                {/* --- HERO SECTION --- */}
                <HeroSection />

                {/* --- MOCKUP VISUAL --- */}
                <section className="w-full max-w-7xl px-2 sm:px-6 mb-24 md:mb-32 relative z-10">
                    <div className="relative mx-auto transform-gpu transition-all duration-500 hover:scale-[1.01] shadow-2xl rounded-xl border border-slate-200/50 bg-white/50 backdrop-blur-xl">
                        <LandingDashboard />
                         {/* Glow effect behind dashboard */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-20 -z-10 animate-pulse"></div>
                    </div>
                </section>

                {/* --- BRANDS --- */}
                <BrandSlider />

                {/* --- BENTO GRID FEATURES --- */}
                <div id="features">
                    <BentoGrid />
                </div>

                {/* --- CTA FINAL --- */}
                <section className="w-full px-4 sm:px-6 py-32 bg-slate-950 text-white text-center relative overflow-hidden">
                    {/* Background effects for CTA */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
                    
                    <div className="max-w-4xl mx-auto space-y-8 relative z-10">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                            Deja de tirar dinero.<br/>
                            <span className="text-blue-400">Empieza a ahorrar hoy.</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                            Únete a los usuarios que ya han tomado el control de sus finanzas y descubren suscripciones que ni sabían que tenían.
                        </p>
                        <div className="pt-4">
                            <Link href="/login" className="inline-block">
                                <Button size="lg" className="h-14 px-10 text-lg font-bold bg-white text-slate-950 hover:bg-slate-200 rounded-full shadow-xl shadow-white/10 transition-transform hover:-translate-y-1">
                                    Crear cuenta gratis
                                </Button>
                            </Link>
                        </div>
                        <p className="text-sm text-slate-500 pt-4">No requiere tarjeta de crédito • Cancelación flexible</p>
                    </div>
                </section>

                {/* --- FOOTER --- */}
                <footer className="w-full bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
                            <div className="col-span-2 md:col-span-1">
                                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-4">
                                    <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center text-slate-900">R.</div>
                                    Recur
                                </Link>
                                <p className="text-sm leading-relaxed mb-6 text-slate-500">
                                    Tu dinero libre, calculado al céntimo.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-4">Producto</h4>
                                <ul className="space-y-3 text-sm">
                                    <li><Link href="#" className="hover:text-blue-400 transition-colors">Características</Link></li>
                                    <li><Link href="#" className="hover:text-blue-400 transition-colors">Precios</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-4">Legal</h4>
                                <ul className="space-y-3 text-sm">
                                    <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacidad</Link></li>
                                    <li><Link href="#" className="hover:text-blue-400 transition-colors">Términos</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="pt-8 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                            <p>© 2025 Recur Inc.</p>
                        </div>
                    </div>
                </footer>

            </main>
        </div>
    )  
}