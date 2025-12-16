"use client";

import { BarChart3, Lock, Wallet, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Dinero Libre Real",
    description: "Calculamos tus ingresos menos tus gastos fijos y objetivos de ahorro automáticamente.",
    icon: Wallet,
    className: "md:col-span-2",
    background: "bg-blue-50/50",
    iconColor: "text-blue-600",
  },
  {
    title: "Privacidad Total",
    description: "Sin conexión bancaria. Tus datos son tuyos.",
    icon: Lock,
    className: "md:col-span-1",
    background: "bg-emerald-50/50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Gastos Variables",
    description: "Añade gastos puntuales y ve cómo afectan a tu mes.",
    icon: Zap,
    className: "md:col-span-1",
    background: "bg-amber-50/50",
    iconColor: "text-amber-600",
  },
  {
    title: "Análisis Visual",
    description: "Gráficos simples para entender a dónde va tu dinero de un vistazo.",
    icon: BarChart3,
    className: "md:col-span-2",
    background: "bg-purple-50/50",
    iconColor: "text-purple-600",
  },
];

export function BentoGrid() {
  return (
    <section className="py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Todo lo que necesitas para <br/>
            <span className="text-blue-600">ahorrar de verdad.</span>
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
           Olvídate de los excels complejos. Recur es simple, rápido y bonito.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={cn(
              "group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:shadow-xl hover:-translate-y-1",
              feature.className
            )}
          >
            <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500", feature.background)} />
            
            <div className="relative z-10 h-full flex flex-col justify-between">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-slate-50 mb-4 group-hover:scale-110 transition-transform duration-300", feature.iconColor)}>
                    <feature.icon className="w-6 h-6" />
                </div>
                
                <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-500 group-hover:text-slate-600 transition-colors">
                        {feature.description}
                    </p>
                </div>
            </div>
            
            {/* Decorative blob */}
            <div className={cn("absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity", feature.iconColor.replace("text-", "bg-"))} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
