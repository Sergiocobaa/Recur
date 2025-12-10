import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, CreditCard, ShieldCheck, Zap } from "lucide-react"
import { Navbar } from "@/components/navbar" // Reusamos tu navbar (o hacemos una simplificada)

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white selection:bg-blue-100 font-sans">

            {/* Fondo Premium (El mismo que el dashboard) */}
            <div className="fixed inset-0 -z-10 h-full w-full bg-grid-pattern"></div>
            <div className="fixed inset-0 z-[-1] bg-blue-glow"></div>

            {/* --- NAVBAR SIMPLIFICADA PARA LANDING --- */}
            <nav className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
                <div className="container mx-auto flex h-16 items-center justify-between px-6 max-w-6xl">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
                        <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">R.</div>
                        Recur
                    </div>
                    <div className="flex gap-4">
                        <Link href="/dashboard">
                            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">Iniciar Sesión</Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6">
                                Empezar Gratis
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="flex flex-col items-center">

                {/* --- HERO SECTION --- */}
                <section className="w-full pt-24 pb-32 text-center px-6 max-w-4xl mx-auto space-y-8">
                    <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
                        <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                        v1.0 ya disponible
                    </div>

                    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                        Deja de tirar dinero en <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">suscripciones fantasma.</span>
                    </h1>

                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Recur te ayuda a identificar, controlar y cancelar los pagos recurrentes que olvidaste que tenías. Ahorra una media de 200€ al año.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/dashboard">
                            <Button size="lg" className="h-12 px-8 text-lg bg-slate-900 hover:bg-slate-800 rounded-full shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 transition-all hover:-translate-y-1">
                                Crear cuenta gratis
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Sin tarjeta de crédito
                        </div>
                    </div>
                </section>

                {/* --- VISUAL DEMO (Un "tilt" inclinado queda muy pro) --- */}
                <section className="w-full max-w-6xl px-6 mb-32 relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                    <div className="relative rounded-2xl border border-slate-200 bg-slate-50/50 p-2 shadow-2xl backdrop-blur-sm">
                        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden aspect-[16/9] flex items-center justify-center relative">
                            {/* Aquí iría una captura de tu dashboard real */}
                            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
                                <p className="text-slate-400 font-medium">📸 Aquí pondremos una captura de tu Dashboard</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- FEATURES (Estilo Bento Grid) --- */}
                <section className="w-full max-w-6xl px-6 py-24">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Todo lo que necesitas para controlar tu dinero
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all">
                            <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Alertas Inteligentes</h3>
                            <p className="text-slate-500">Recibe un correo 3 días antes de que Netflix te cobre. No más sorpresas en el banco.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all">
                            <div className="h-12 w-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
                                <CreditCard className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Cálculo de Gastos</h3>
                            <p className="text-slate-500">Sabemos exactamente cuánto gastas al año. Convertimos pagos anuales a mensuales automáticamente.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 rounded-3xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 hover:shadow-xl transition-all">
                            <div className="h-12 w-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Privacidad Total</h3>
                            <p className="text-slate-500">Tus datos son tuyos. No vendemos tu información a bancos ni a terceros.</p>
                        </div>
                    </div>
                </section>

                {/* --- FOOTER SIMPLE --- */}
                <footer className="w-full py-12 border-t border-slate-100 mt-12 bg-white">
                    <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
                        <p>© 2025 Recur Inc. Hecho con ❤️ para ahorrar dinero.</p>
                    </div>
                </footer>

            </main>
        </div>
    )
}