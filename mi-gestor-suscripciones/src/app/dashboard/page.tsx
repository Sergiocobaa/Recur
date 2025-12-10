import { SubscriptionCard } from "@/components/subscription-card"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function Home() {
  return (
    // 1. AQUÍ EL CAMBIO: Usamos la clase 'bg-grid-pattern' que definiste en CSS
    <div className="min-h-screen w-full bg-grid-pattern relative selection:bg-blue-100">

      {/* 2. AQUÍ EL CAMBIO: Usamos la clase 'bg-blue-glow' */}
      <div className="fixed inset-0 bg-blue-glow z-0"></div>

      {/* El contenido va dentro de un div con z-10 para estar ENCIMA del fondo */}
      <div className="relative z-10">
        <Navbar />

        <main className="container mx-auto px-4 py-12 max-w-5xl">

          {/* SECCIÓN 1: EL RESUMEN */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Buenas tardes, Sergio
              </h1>
              <p className="text-lg text-slate-500">
                Aquí tienes el resumen de tus gastos recurrentes.
              </p>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Mensual</span>
              <div className="text-6xl font-black text-slate-900 tracking-tighter">
                54.98€
              </div>
              <div className="text-sm font-medium text-emerald-600 bg-emerald-50/50 border border-emerald-100 px-3 py-1 rounded-full mt-2">
                +2.5% vs mes pasado
              </div>
            </div>
          </div>

          {/* SECCIÓN 2: BARRA DE ACCIONES */}
          <div className="flex items-center justify-between mb-8 pb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              Tus Suscripciones
              <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">4</span>
            </h2>
            <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20 transition-all hover:scale-105 active:scale-95">
              <Plus className="mr-2 h-4 w-4" /> Nueva Suscripción
            </Button>
          </div>

          {/* SECCIÓN 3: EL GRID DE TARJETAS */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SubscriptionCard
              name="Netflix Premium"
              price="17.99"
              date="24 Dic"
              category="Entretenimiento"
            />
            <SubscriptionCard
              name="Spotify Duo"
              price="14.99"
              date="15 Dic"
              category="Música"
            />
            <SubscriptionCard
              name="ChatGPT Plus"
              price="22.00"
              date="02 Ene"
              category="IA"
            />
            <SubscriptionCard
              name="Amazon Prime"
              price="4.99"
              date="10 Ene"
              category="Compras"
            />

            {/* Tarjeta de añadir */}
            <button className="flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-xl p-6 h-full min-h-[180px] text-slate-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/30 transition-all duration-200 group cursor-pointer bg-white/50">
              <div className="h-12 w-12 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center mb-3 transition-colors">
                <Plus className="h-6 w-6 text-slate-400 group-hover:text-blue-600" />
              </div>
              <span className="font-medium text-sm">Añadir servicio</span>
            </button>
          </div>

        </main>
      </div>
    </div>
  )
}