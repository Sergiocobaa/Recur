"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Plus, Wallet, TrendingDown, PiggyBank, Target, ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

// Tipos
type Subscription = {
  id: string;
  name: string;
  price: number;
  date: string; // Fecha de renovación (ej: "2024-12-15")
  category: string;
};

// Colores para el gráfico (Estilo Notion/Moderno)
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [income, setIncome] = useState(2000); // Esto debería venir de la DB, por ahora hardcodeado simulando tu Excel
  const [savingsGoal, setSavingsGoal] = useState(300); // Objetivo de ahorro mensual

  // Carga de datos
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      fetchSubscriptions(user.id);
    };
    checkUser();
  }, [router]);

  const fetchSubscriptions = async (userId: string) => {
    // Aquí iría tu llamada real a Supabase
    // Simulamos datos para que veas el diseño YA:
    const mockData = [
      { id: "1", name: "Netflix", price: 17.99, date: "2024-12-15", category: "Entretenimiento" },
      { id: "2", name: "Spotify", price: 12.99, date: "2024-12-20", category: "Música" },
      { id: "3", name: "Gimnasio", price: 34.90, date: "2024-12-01", category: "Salud" },
      { id: "4", name: "Adobe", price: 60.49, date: "2024-12-28", category: "Software" },
      { id: "5", name: "Amazon Prime", price: 4.99, date: "2024-12-10", category: "Compras" },
    ];
    setSubscriptions(mockData);
    setLoading(false);
  };

  // --- CÁLCULOS TIPO EXCEL ---
  const totalExpenses = subscriptions.reduce((acc, sub) => acc + sub.price, 0);
  const remaining = income - totalExpenses - savingsGoal; // "Queda para gastar" del Excel
  const savingsProgress = (savingsGoal / income) * 100;
  
  // Datos para el gráfico circular (Por categoría)
  const categoryData = subscriptions.reduce((acc: any[], sub) => {
    const existing = acc.find(item => item.name === sub.category);
    if (existing) {
      existing.value += sub.price;
    } else {
      acc.push({ name: sub.category, value: sub.price });
    }
    return acc;
  }, []);

  if (loading) return <div className="flex h-screen items-center justify-center text-slate-400">Cargando tus finanzas...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Panel Principal</h1>
            <p className="text-slate-500">Resumen financiero de Octubre</p>
          </div>
          <div className="flex gap-3">
             <Button variant="outline" className="bg-white text-slate-700 border-slate-200">
                <Target className="mr-2 h-4 w-4" /> Ajustar Objetivos
             </Button>
             <Button className="bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20">
                <Plus className="mr-2 h-4 w-4" /> Nuevo Gasto
             </Button>
          </div>
        </div>

        {/* --- NIVEL 1: LAS MÉTRICAS CLAVE (KPIs) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Card 1: Ingresos (Input manual en el futuro) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                        <ArrowUpRight className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+2% vs mes pasado</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Ingresos Totales</p>
                <h3 className="text-2xl font-black text-slate-900">{income.toFixed(2)}€</h3>
            </div>

            {/* Card 2: Gastos Fijos (Suscripciones) */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-red-100 p-2 rounded-lg text-red-600">
                        <ArrowDownRight className="h-5 w-5" />
                    </div>
                </div>
                <p className="text-slate-500 text-sm font-medium">Gastos Fijos</p>
                <h3 className="text-2xl font-black text-slate-900">{totalExpenses.toFixed(2)}€</h3>
                <p className="text-xs text-slate-400 mt-1">{subscriptions.length} servicios activos</p>
            </div>

             {/* Card 3: Objetivo Ahorro (Simulando "Ahorros" del Excel) */}
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <PiggyBank className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{savingsProgress.toFixed(0)}% del ingreso</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">Objetivo Ahorro</p>
                <h3 className="text-2xl font-black text-slate-900">{savingsGoal.toFixed(2)}€</h3>
            </div>

            {/* Card 4: "QUEDA PARA GASTAR" (La joya del Excel) */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl shadow-slate-900/10 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 group-hover:opacity-40 transition-opacity"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="bg-white/10 p-2 rounded-lg text-white">
                        <Wallet className="h-5 w-5" />
                    </div>
                </div>
                <div className="relative z-10">
                    <p className="text-slate-400 text-sm font-medium">Disponible para caprichos</p>
                    <h3 className="text-3xl font-black tracking-tight mt-1">{remaining.toFixed(2)}€</h3>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full mt-4 overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Vas bien este mes 👍</p>
                </div>
            </div>
        </div>

        {/* --- NIVEL 2: VISUALIZACIÓN DE DATOS (GRÁFICOS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Gráfico 1: Desglose (Tu Pie Chart del Excel pero moderno) */}
            <div className="md:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-800 mb-6">¿Dónde se va el dinero?</h4>
                <div className="h-64 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={categoryData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {categoryData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* Texto central del Donut */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <span className="text-2xl font-bold text-slate-900">{totalExpenses.toFixed(0)}€</span>
                        <p className="text-xs text-slate-400">Total Fijo</p>
                    </div>
                </div>
                {/* Leyenda */}
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                    {categoryData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs text-slate-500">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                            {entry.name}
                        </div>
                    ))}
                </div>
            </div>

            {/* Gráfico 2: Próximos Pagos (Lista mejorada) */}
            <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold text-slate-800">Próximos Cobros</h4>
                    <Button variant="ghost" size="sm" className="text-slate-400">Ver todo</Button>
                </div>

                <div className="space-y-4 flex-1 overflow-auto">
                    {subscriptions.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors group border border-transparent hover:border-slate-100">
                            <div className="flex items-center gap-4">
                                {/* Icono o inicial */}
                                <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                                    {sub.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900">{sub.name}</p>
                                    <p className="text-xs text-slate-500">{sub.category} • Renueva el {sub.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-slate-900">-{sub.price}€</p>
                                <p className="text-xs text-slate-400">Mensual</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* --- NIVEL 3: DETALLE TIPO EXCEL (Para el futuro) --- */}
        {/* Aquí podríamos añadir las tablas de deudas o ingresos extra que tenías en el Excel */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 text-center">
            <p className="text-blue-800 font-medium mb-2">🚀 Próximamente: Conexión Bancaria</p>
            <p className="text-blue-600/80 text-sm max-w-lg mx-auto">
                Pronto podrás conectar tu banco para que "Gasolina", "Cenas" y "Regalos" se rellenen solos, igual que en tu Excel pero automático.
            </p>
        </div>

      </div>
    </div>
  );
}
