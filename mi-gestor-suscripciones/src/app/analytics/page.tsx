"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, TrendingUp, TrendingDown, Wallet, Calendar 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from "recharts";

// Tipos de datos para el gráfico
type MonthlyData = {
  name: string;      // "Oct"
  fullName: string;  // "Octubre 2025"
  income: number;
  expenses: number;
  savings: number;
};

export default function AnalyticsPage() {
  const [data, setData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalSaved, setTotalSaved] = useState(0);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Vamos a analizar los últimos 6 meses
      const today = new Date();
      const last6Months = [];
      
      // Generamos las fechas de los últimos 6 meses
      for (let i = 5; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        last6Months.push(d);
      }

      const historyData: MonthlyData[] = [];
      let calculatedTotalSaved = 0;

      // 2. Para cada mes, consultamos la BBDD
      // (Nota: Esto se podría optimizar con una sola query compleja, pero así es más fácil de entender)
      for (const date of last6Months) {
        const startStr = date.toISOString().split('T')[0]; // YYYY-MM-01
        // Último día del mes
        const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        const endStr = endDay.toISOString().split('T')[0];

        // A. Obtener Ingresos de ese mes (o perfil default)
        let monthlyIncome = 0;
        const { data: budget } = await supabase
          .from('monthly_budgets')
          .select('income')
          .eq('user_id', user.id)
          .eq('date', startStr)
          .single();
        
        if (budget) {
            monthlyIncome = budget.income;
        } else {
            // Si no hay presupuesto histórico, usamos el actual del perfil
            const { data: profile } = await supabase.from('profiles').select('income').eq('id', user.id).single();
            monthlyIncome = profile?.income || 0;
        }

        // B. Obtener Gastos de ese mes
        const { data: expenses } = await supabase
          .from('expenses')
          .select('amount')
          .eq('user_id', user.id)
          .gte('date', startStr)
          .lte('date', endStr);

        const totalExpenses = expenses?.reduce((acc, curr) => acc + curr.amount, 0) || 0;
        const savings = monthlyIncome - totalExpenses;
        
        calculatedTotalSaved += savings;

        // Formato nombre mes (ej: "Oct")
        const monthShort = new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(date);
        const monthLong = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(date);

        historyData.push({
            name: monthShort.charAt(0).toUpperCase() + monthShort.slice(1),
            fullName: monthLong.charAt(0).toUpperCase() + monthLong.slice(1),
            income: monthlyIncome,
            expenses: totalExpenses,
            savings: savings
        });
      }

      setData(historyData);
      setTotalSaved(calculatedTotalSaved);

    } catch (error) {
      console.error("Error cargando historial:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">Analizando tus finanzas...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans p-4 md:p-10">
      
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver al Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Evolución Financiera</h1>
        <p className="text-slate-500">Tus últimos 6 meses en perspectiva</p>
      </div>

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* KPI PRINCIPAL */}
        <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 rounded-full bg-blue-500/20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
                <p className="text-slate-400 font-medium mb-1">Ahorro Neto (Últimos 6 meses)</p>
                <div className="flex items-baseline gap-2">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight">{totalSaved.toFixed(2)}€</h2>
                    {totalSaved > 0 ? (
                        <span className="text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" /> Positivo
                        </span>
                    ) : (
                        <span className="text-red-400 bg-red-400/10 px-2 py-1 rounded-full text-xs font-bold flex items-center">
                            <TrendingDown className="h-3 w-3 mr-1" /> Negativo
                        </span>
                    )}
                </div>
            </div>
        </div>

        {/* GRÁFICO 1: BARRAS (INGRESOS vs GASTOS) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="mb-6">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-slate-400" />
                    Ingresos vs Gastos
                </h3>
            </div>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ fill: '#f8fafc' }}
                        />
                        <Bar dataKey="income" name="Ingresos" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={20} />
                        <Bar dataKey="expenses" name="Gastos" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* GRÁFICO 2: ÁREA (TENDENCIA DE AHORRO) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="mb-6">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-slate-400" />
                    Tendencia de Ahorro Mensual
                </h3>
            </div>
            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                        />
                        <Area type="monotone" dataKey="savings" name="Ahorro" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSavings)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* TABLA RESUMEN */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
             <div className="p-6 border-b border-slate-50">
                <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    Histórico Detallado
                </h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-400 uppercase bg-slate-50/50">
                        <tr>
                            <th className="px-6 py-4">Mes</th>
                            <th className="px-6 py-4 text-right">Ingresos</th>
                            <th className="px-6 py-4 text-right">Gastos</th>
                            <th className="px-6 py-4 text-right">Ahorro</th>
                            <th className="px-6 py-4 text-center">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((month, index) => (
                            <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-900">{month.fullName}</td>
                                <td className="px-6 py-4 text-right text-slate-600">{month.income}€</td>
                                <td className="px-6 py-4 text-right text-red-500 font-medium">-{month.expenses}€</td>
                                <td className={`px-6 py-4 text-right font-bold ${month.savings >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {month.savings > 0 ? '+' : ''}{month.savings.toFixed(2)}€
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {month.savings > 0 ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                            Ahorro
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            Déficit
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

      </div>
    </div>
  );
}