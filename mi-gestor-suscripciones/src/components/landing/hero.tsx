"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
    return (
        <section className="relative w-full pt-20 pb-32 md:pt-32 md:pb-48 overflow-visible flex flex-col items-center justify-center text-center px-4 sm:px-6">
            
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-[100px]" />
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50/50 backdrop-blur-sm px-3 py-1 text-xs sm:text-sm font-medium text-blue-700 mb-6"
            >
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                Nuevo: Control total de Gastos Variables
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-slate-900 leading-[1] sm:leading-[1] max-w-5xl mx-auto mb-6"
            >
                Controla tus <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                    suscripciones.
                </span>
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10"
            >
                Deja de perder dinero en gastos que no usas. Recur te dice exactamente cuánto dinero libre te queda cada mes.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
            >
                 <Link href="/login" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-full shadow-2xl hover:shadow-blue-500/20 transition-all hover:-translate-y-1">
                        Empezar Gratis
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
                
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Sin tarjeta requerida
                </div>
            </motion.div>
        
        </section>
    );
}
