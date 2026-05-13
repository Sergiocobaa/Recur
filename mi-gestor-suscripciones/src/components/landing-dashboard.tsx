"use client";

import { Bell, Plus, Lock, BarChart3 } from "lucide-react";

export function LandingDashboard() {
    return (
        <div className="relative group w-full max-w-6xl mx-auto font-sans">

            {/* Glow detrás */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

            {/* Marco navegador estilo Mac */}
            <div className="relative rounded-xl border border-slate-200 bg-slate-50 shadow-2xl overflow-hidden">

                {/* Barra superior */}
                <div className="border-b border-slate-200 bg-white/80 backdrop-blur-md p-3 sm:p-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex-1 max-w-lg mx-auto bg-slate-100 rounded-md py-1 px-3 text-center text-xs font-medium text-slate-500 flex items-center justify-center gap-1.5">
                        <Lock className="h-3 w-3 text-emerald-500" />
                        <span className="text-slate-600">recur.es/dashboard</span>
                    </div>
                    <div className="w-10"></div>
                </div>

                {/* Dashboard */}
                <div className="bg-slate-50/50 p-6 sm:p-8 w-full overflow-hidden relative">

                    {/* Header */}
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">Mis Suscripciones</h2>
                            <p className="text-slate-500 text-sm">Gestiona todos tus gastos recurrentes</p>
                        </div>
                        <div className="hidden sm:flex gap-2">
                            <div className="bg-white border border-slate-200 text-slate-600 px-3 py-2 rounded-md text-xs font-medium shadow-sm flex items-center gap-1.5">
                                <BarChart3 className="h-3 w-3" /> Analíticas
                            </div>
                            <div className="bg-slate-900 text-white px-3 py-2 rounded-md text-xs font-medium shadow-lg shadow-slate-900/20 flex items-center gap-2">
                                <Plus className="h-3 w-3" /> Suscripción
                            </div>
                        </div>
                    </div>

                    {/* KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                        {/* Total mensual */}
                        <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-24 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10">
                                <p className="text-slate-400 text-xs font-medium mb-2">Total mensual</p>
                                <h3 className="text-2xl font-black tracking-tight font-mono">54.98€</h3>
                                <p className="text-slate-500 text-[10px] mt-1">659€ al año</p>
                            </div>
                        </div>

                        {/* Próxima renovación */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="bg-amber-100 p-1.5 rounded-md text-amber-600">
                                    <Bell className="h-3.5 w-3.5" />
                                </div>
                                <p className="text-slate-500 text-xs font-medium">Próxima renovación</p>
                            </div>
                            <p className="font-bold text-slate-900 text-sm">Netflix Premium</p>
                            <p className="text-slate-500 text-xs mt-0.5">15 de mayo</p>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">en 2 días</span>
                                <span className="font-bold text-slate-900 text-sm font-mono">17.99€</span>
                            </div>
                        </div>

                        {/* Activas */}
                        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hidden md:block">
                            <p className="text-slate-500 text-xs font-medium mb-2">Suscripciones activas</p>
                            <h3 className="text-3xl font-black text-slate-900">3</h3>
                            <p className="text-slate-400 text-[10px] mt-1">Media: 18.33€/suscripción</p>
                        </div>
                    </div>

                    {/* Lista suscripciones */}
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-5">
                                <h4 className="font-bold text-slate-800">Suscripciones activas</h4>
                                <span className="text-xs text-slate-400">Toca para editar</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold text-xs">N</div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">Netflix Premium</p>
                                            <p className="text-xs text-slate-500">Entretenimiento · renueva en 2 días</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-slate-900 text-sm font-mono">-17.99€</p>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold text-xs">S</div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">Spotify Duo</p>
                                            <p className="text-xs text-slate-500">Música · renueva en 5 días</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-slate-900 text-sm font-mono">-14.99€</p>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold text-xs">C</div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">ChatGPT Plus</p>
                                            <p className="text-xs text-slate-500">Software · renueva en 12 días</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-slate-900 text-sm font-mono">-22.00€</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
