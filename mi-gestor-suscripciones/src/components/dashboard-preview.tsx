"use client";

import Image from "next/image";

export function DashboardPreview() {
    return (
        <div className="relative group">

            {/* 1. EL BRILLO DE FONDO (Glow Effect) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

            {/* 2. EL MARCO DEL NAVEGADOR */}
            <div className="relative rounded-xl border border-slate-200 bg-slate-50 shadow-2xl overflow-hidden">

                {/* Barra superior (Estilo Mac) */}
                <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md p-4 flex items-center justify-between">
                    {/* Semáforo (Botones) */}
                    <div className="flex space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-400 border border-red-500/50"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400 border border-yellow-500/50"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400 border border-green-500/50"></div>
                    </div>
                    {/* Barra de dirección falsa */}
                    <div className="flex-1 max-w-lg mx-auto bg-slate-100 rounded-md py-1.5 px-3 text-center text-xs font-medium text-slate-400 flex items-center justify-center gap-2">
                        <span className="text-slate-400">🔒</span> recur.app/dashboard
                    </div>
                    {/* Espacio vacío para equilibrar */}
                    <div className="w-10"></div>
                </div>

                {/* 3. LA IMAGEN REAL */}
                <div className="relative aspect-[16/10] bg-white w-full overflow-hidden">
                    {/* IMPORTANTE: Asegúrate de tener la imagen en /public/dashboard-preview.png 
               Si no tienes la imagen aún, este div gris simulará la carga.
            */}
                    <Image
                        src="/dashboard-preview.png" // <--- TU IMAGEN AQUÍ
                        alt="Dashboard de Recur"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                </div>
            </div>

            {/* Reflejo sutil encima */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5 pointer-events-none"></div>
        </div>
    );
}