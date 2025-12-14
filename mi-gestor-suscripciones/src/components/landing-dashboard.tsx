"use client";

// 1. AÑADIMOS "Lock" A LOS IMPORTS
import { Wallet, LayoutDashboard, Plus, MoreHorizontal, Lock } from "lucide-react";

export function LandingDashboard() {
    return (
        <div className="relative group w-full max-w-5xl mx-auto">

            {/* Efecto de Brillo (Glow) detrás */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

            {/* Marco del Navegador */}
            <div className="relative rounded-xl border border-slate-200 bg-slate-50 shadow-2xl overflow-hidden">

                {/* Barra Superior Mac */}
                <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md p-3 sm:p-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>

                    {/* --- AQUÍ ESTÁ EL CAMBIO --- */}
                    <div className="flex-1 max-w-lg mx-auto bg-slate-100 rounded-md py-1 px-3 text-center text-xs font-medium text-slate-500 flex items-center justify-center gap-1.5">
                        {/* Sustituimos el emoji por el icono vectorial profesional */}
                        <Lock className="h-3 w-3 text-slate-400" />
                        recur.app/dashboard
                    </div>
                    {/* --------------------------- */}

                    <div className="w-10"></div>
                </div>

                {/* EL DASHBOARD FALSO (HTML/CSS) - El resto sigue igual */}
                <div className="bg-white p-6 sm:p-10 w-full overflow-hidden relative">
                    {/* Fondo de rejilla sutil */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    <div className="relative z-10 max-w-4xl mx-auto space-y-8">

                        {/* Header Text */}
                        <div className="space-y-2">
                            <h2 className="text-3xl font-extrabold text-slate-900">Tus Gastos</h2>
                            <p className="text-slate-500">Gestiona y controla tus pagos recurrentes.</p>
                        </div>

                        {/* GRID SUPERIOR: Tarjeta Negra + Gráfico */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Tarjeta Negra (Total) */}
                            <div className="md:col-span-2 bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
                                <div className="relative z-10 flex justify-between items-start">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Mensual</span>
                                        <div className="text-5xl font-black tracking-tighter mt-2">48.98€</div>
                                    </div>
                                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                                        <Wallet className="h-6 w-6 text-emerald-400" />
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-2">
                                    <div className="text-xs font-medium text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full">
                                        3 suscripciones activas
                                    </div>
                                </div>
                            </div>

                            {/* Tarjeta Gráfico (FALSO PERO PERFECTO) */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center relative">
                                <h3 className="text-sm font-bold text-slate-800 absolute top-4 left-4">Gasto por Categoría</h3>

                                {/* EL DONUT CSS: Conic Gradient */}
                                <div className="relative w-32 h-32 mt-4">
                                    <div className="w-full h-full rounded-full" style={{ background: 'conic-gradient(#0f172a 0% 35%, #2563eb 35% 60%, #059669 60% 100%)' }}></div>
                                    <div className="absolute inset-0 m-auto w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <span className="text-xs font-bold text-slate-500">100%</span>
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-4 text-[10px] text-slate-500">
                                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-900"></span> Entr.</div>
                                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-600"></span> Soft.</div>
                                    <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600"></span> Hogar</div>
                                </div>
                            </div>
                        </div>

                        {/* GRID INFERIOR: Tarjetas de Suscripción Falsas */}
                        <div className="flex items-center justify-between pt-4">
                            <h3 className="text-lg font-bold text-slate-800">Mis Suscripciones</h3>
                            <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-md flex items-center gap-1">
                                <Plus className="h-3 w-3" /> Nueva
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-80 pointer-events-none select-none">
                            <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="font-bold text-slate-900">Netflix</div>
                                    <MoreHorizontal className="h-4 w-4 text-slate-300" />
                                </div>
                                <div className="text-2xl font-bold text-slate-900">17.99<span className="text-sm text-slate-500 font-normal">€/mes</span></div>
                                <div className="text-xs text-slate-400 mt-2 bg-slate-50 inline-block px-2 py-1 rounded">Renueva el 15/12</div>
                            </div>
                            <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="font-bold text-slate-900">Spotify</div>
                                    <MoreHorizontal className="h-4 w-4 text-slate-300" />
                                </div>
                                <div className="text-2xl font-bold text-slate-900">12.99<span className="text-sm text-slate-500 font-normal">€/mes</span></div>
                                <div className="text-xs text-slate-400 mt-2 bg-slate-50 inline-block px-2 py-1 rounded">Renueva el 20/12</div>
                            </div>
                            <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="font-bold text-slate-900">ChatGPT</div>
                                    <MoreHorizontal className="h-4 w-4 text-slate-300" />
                                </div>
                                <div className="text-2xl font-bold text-slate-900">23.00<span className="text-sm text-slate-500 font-normal">€/mes</span></div>
                                <div className="text-xs text-slate-400 mt-2 bg-slate-50 inline-block px-2 py-1 rounded">Renueva el 01/01</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}