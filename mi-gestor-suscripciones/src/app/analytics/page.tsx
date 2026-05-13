"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, BarChart3 } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

type Subscription = {
  id: string;
  name: string;
  price: number;
  category: string;
  start_date: string;
};

const COLORS = ["#0f172a", "#2563eb", "#059669", "#7c3aed", "#db2777", "#ea580c"];

export default function AnalyticsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSubscriptions();
  }, []);

  async function loadSubscriptions() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data: subs } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("active", true)
        .order("price", { ascending: false });
      if (subs) setSubscriptions(subs as Subscription[]);
    } catch (error) {
      console.error("Error cargando suscripciones:", error);
    } finally {
      setLoading(false);
    }
  }

  const totalMonthly = subscriptions.reduce((acc, s) => acc + s.price, 0);
  const totalAnnual = totalMonthly * 12;

  const byCategory = subscriptions.reduce((acc: { name: string; value: number }[], curr) => {
    const existing = acc.find((i) => i.name === curr.category);
    if (existing) existing.value += curr.price;
    else acc.push({ name: curr.category, value: curr.price });
    return acc;
  }, []).sort((a, b) => b.value - a.value);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-slate-400 text-sm">
      Cargando...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans pb-10">

      <div className="max-w-5xl mx-auto px-4 pt-6 md:pt-10 mb-6">
        <Link href="/dashboard" className="inline-flex items-center text-slate-500 hover:text-slate-900 transition-colors mb-4 text-sm font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" /> Dashboard
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Analíticas</h1>
        <p className="text-sm md:text-base text-slate-500 mt-1">
          {subscriptions.length > 0
            ? `${subscriptions.length} suscripciones activas`
            : "Sin suscripciones activas"}
        </p>
      </div>

      {subscriptions.length === 0 ? (
        <div className="max-w-md mx-auto text-center py-20 px-4">
          <div className="bg-slate-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Sin datos todavía</h3>
          <p className="text-sm text-slate-500 mb-6">Añade suscripciones para ver tus analíticas.</p>
          <Link href="/dashboard">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm">
              Ir al Dashboard
            </button>
          </Link>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto px-4 space-y-4 md:space-y-6">

          {/* KPIs principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden md:col-span-1">
              <div className="absolute top-0 right-0 p-24 rounded-full bg-blue-500/20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <p className="text-slate-400 text-sm font-medium mb-1">Gasto mensual</p>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight font-mono">
                  {totalMonthly.toFixed(2)}€
                </h2>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-500 text-sm font-medium mb-1">Coste anual proyectado</p>
              <h2 className="text-3xl font-black text-slate-900 font-mono">{totalAnnual.toFixed(0)}€</h2>
              <p className="text-slate-400 text-xs mt-2">12 meses × {totalMonthly.toFixed(2)}€</p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <p className="text-slate-500 text-sm font-medium mb-1">Media por suscripción</p>
              <h2 className="text-3xl font-black text-slate-900 font-mono">
                {(totalMonthly / subscriptions.length).toFixed(2)}€
              </h2>
              <p className="text-slate-400 text-xs mt-2">{subscriptions.length} suscripciones activas</p>
            </div>
          </div>

          {/* Gráfico por categoría */}
          {byCategory.length > 0 && (
            <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-base md:text-lg text-slate-800 flex items-center gap-2 mb-4">
                <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-slate-400" />
                Gasto por categoría
              </h3>
              <div className="h-[200px] md:h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={byCategory} layout="vertical" margin={{ top: 0, right: 20, left: 80, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 11 }}
                      tickFormatter={(v) => `${v}€`}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#64748b", fontSize: 11 }}
                      width={76}
                    />
                    <Tooltip
                      formatter={(value: number) => [`${value.toFixed(2)}€`, "Gasto"]}
                      contentStyle={{ backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", fontSize: "12px" }}
                      cursor={{ fill: "#f8fafc" }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {byCategory.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Lista completa ordenada por precio */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-5 md:p-6 border-b border-slate-50">
              <h3 className="font-bold text-base md:text-lg text-slate-800">
                Todas las suscripciones
              </h3>
            </div>

            {/* Mobile */}
            <div className="md:hidden">
              {subscriptions.map((sub) => (
                <div key={sub.id} className="p-4 border-b border-slate-50 last:border-0 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">{sub.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{sub.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900 font-mono">{sub.price.toFixed(2)}€/mes</p>
                    <p className="text-xs text-slate-400">{(sub.price * 12).toFixed(0)}€/año</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-400 uppercase bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-4">Nombre</th>
                    <th className="px-6 py-4">Categoría</th>
                    <th className="px-6 py-4 text-right">Mensual</th>
                    <th className="px-6 py-4 text-right">Anual</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{sub.name}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full bg-slate-100 text-xs text-slate-600">
                          {sub.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900 font-mono">
                        {sub.price.toFixed(2)}€
                      </td>
                      <td className="px-6 py-4 text-right text-slate-500 font-mono">
                        {(sub.price * 12).toFixed(0)}€
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-slate-200 bg-slate-50/50">
                    <td className="px-6 py-4 font-bold text-slate-900" colSpan={2}>Total</td>
                    <td className="px-6 py-4 text-right font-black text-slate-900 font-mono">{totalMonthly.toFixed(2)}€</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-700 font-mono">{totalAnnual.toFixed(0)}€</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
