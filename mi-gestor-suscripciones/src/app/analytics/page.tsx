"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  ArrowLeft, TrendingUp, TrendingDown, Wallet, Calendar, PieChart 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from "recharts";

// Tipos de datos para el gráfico
type MonthlyData = {
  dateSort: string;  // "2025-10" (Para ordenar)
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

      // 1. Cargar TODOS los presupuestos históricos
      const { data: budgets } = await supabase
        .from('monthly_budgets')
        .select('*')
        .eq('user_id', user.id);

      // 2. Cargar TODOS los gastos históricos
      const { data: allExpenses } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id);

      // 3. Cargar perfil actual (fallback para ingresos si no hay histórico específico)
      const { data: profile } = await supabase
        .from('profiles')
        .select('income')
        .eq('id', user.id)
        .single();
      
      const defaultIncome = profile?.income || 0;

      // 4. LÓGICA DE AGRUPACIÓN INTELIGENTE
      // Usamos un Map para unificar meses por su clave "YYYY-MM"
      const monthsMap = new Map<string, MonthlyData>();

      // Función auxiliar para inicializar un mes si no existe
      const initMonth = (dateStr: string) => {
        // dateStr viene como "2025-10-01" o similar
        const dateObj = new Date(dateStr);
        const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`; // "2025-10"
        
        if (!monthsMap.has(key)) {
            const monthShort = new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(dateObj);
            const monthLong = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(dateObj);
            
            monthsMap.set(key, {
                dateSort: key,
                name: monthShort.charAt(0).toUpperCase() + monthShort.slice(1),
                fullName: monthLong.charAt(0).toUpperCase() + monthLong.slice(1),
                income: 0, // Se rellenará luego
                expenses: 0,
                savings: 0
            });
        }
        return key;
      };

      // A. Procesar Presupuestos (Ingresos)
      budgets?.forEach(b => {
          const key = initMonth(b.date);
          const entry = monthsMap.get(key)!;
          entry.income = b.income; // Ingreso específico de ese mes
      });

      // B. Procesar Gastos
      allExpenses?.forEach(exp => {
          const key = initMonth(exp.date);
          const entry = monthsMap.get(key)!;
          entry.expenses += exp.amount;
      });

      // 5. Convertir a Array y Ordenar Cronológicamente
      let historyData = Array.from(monthsMap.values()).sort((a, b) => 
        a.dateSort.localeCompare(b.dateSort)
      );

      // 6. Rellenar huecos de ingresos (Fallback) y calcular Ahorro
      // Si un mes tiene gastos pero no tenía presupuesto guardado, asumimos el sueldo actual
      let calculatedTotalSaved = 0;
      
      historyData = historyData.map(item => {
          // Si el ingreso es 0 (no había registro en monthly_budgets), usamos el actual
          // Esto evita que salga "Ahorro negativo" gigante solo porque no guardaste el sueldo de hace 3 meses
          const finalIncome = item.income > 0 ? item.income : defaultIncome;
          const savings = finalIncome - item.expenses;
          
          calculatedTotalSaved += savings;

          return {
              ...item,
              income: finalIncome,
              savings: savings
          };
      });

      setData(historyData);
      setTotalSaved(calculatedTotalSaved);

    } catch (error) {
      console.error("Error cargando historial:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">Analizando tus datos...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans p-4 md:p-10">
      
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-8">
        <Link href="/dashboard" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver al Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-slate-900">Evolución Financiera</h1>
        <p className="text-slate-500">
           {data.length > 0 
             ? `Análisis basado en tus ${data.length} meses registrados` 
             : "Empieza a registrar gastos para ver tu evolución"}
        </p>
      </div>

      {data.length === 0 ? (
        // --- ESTADO VACÍO (Si eres nuevo) ---
        <div className="max-w-md mx-auto text-center py-20">
            <div className="bg-slate-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Aún no hay suficientes datos</h3>
            <p className="text-slate-500 mb-6">Usa la app este mes, añade gastos y vuelve aquí para ver cómo evolucionas.</p>
            <Link href="/dashboard">
                <button className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm">Ir al Dashboard</button>
            </Link>
        </div>
      ) : (
        // --- CONTENIDO CON DATOS ---
        <div className="max-w-5xl mx-auto space-y-6">
            
            {/* KPI PRINCIPAL */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 rounded-full bg-blue-500/20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                    <p className="text-slate-400 font-medium mb-1">Ahorro Neto Total (Histórico)</p>
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

            {/* GRÁFICO 1: BARRAS */}
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

            {/* GRÁFICO 2: TENDENCIA */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="mb-6">
                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-slate-400" />
                        Evolución de tu Ahorro
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

            {/* TABLA HISTÓRICA */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50">
                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-slate-400" />
                        Detalle Mes a Mes
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
                                <th className="px-6 py-4 text-center">Balance</th>
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
                                                Superávit
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
      )}
    </div>
  );
}