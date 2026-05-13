"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Plus, Pencil, LogOut, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";

// --- TIPOS ---
type Subscription = {
  id: string;
  name: string;
  price: number;
  start_date: string;
  category: string;
  active: boolean;
};

const COLORS = ["#0f172a", "#2563eb", "#059669", "#7c3aed", "#db2777", "#ea580c"];

const getNextRenewalDate = (startDateStr: string): Date => {
  const renewalDay = new Date(startDateStr).getDate();
  const today = new Date();
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), renewalDay);
  if (thisMonth >= today) return thisMonth;
  return new Date(today.getFullYear(), today.getMonth() + 1, renewalDay);
};

const formatRenewalDate = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long" }).format(date);
};

const daysUntil = (date: Date): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = date.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // Modales
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [subForm, setSubForm] = useState({ name: "", price: "", date: "", category: "Entretenimiento" });

  // Confirmación de borrado
  const [subToDelete, setSubToDelete] = useState<string | null>(null);

  // 1. Auth — corre una sola vez
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        router.push("/login");
        return;
      }
      setUser(user);
    };
    checkUser();
  }, [router]);

  // 2. Fetch de datos — depende del usuario
  useEffect(() => {
    if (!user) return;
    fetchSubscriptions(user.id);
  }, [user]);

  const fetchSubscriptions = async (userId: string) => {
    setLoading(true);
    try {
      const { data: subs } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", userId)
        .eq("active", true)
        .order("price", { ascending: false });
      if (subs) setSubscriptions(subs as Subscription[]);
    } catch (error) {
      console.error("Error cargando suscripciones", error);
    } finally {
      setLoading(false);
    }
  };

  const openSubModal = (sub?: Subscription) => {
    if (sub) {
      setEditingId(sub.id);
      setSubForm({ name: sub.name, price: sub.price.toString(), date: sub.start_date, category: sub.category });
    } else {
      setEditingId(null);
      setSubForm({ name: "", price: "", date: "", category: "Entretenimiento" });
    }
    setIsSubModalOpen(true);
  };

  const handleSaveSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const payload = {
      user_id: user.id,
      name: subForm.name,
      price: parseFloat(subForm.price),
      start_date: subForm.date,
      category: subForm.category,
      currency: "EUR",
      frequency: "monthly",
      active: true,
    };
    try {
      if (editingId) {
        await supabase.from("subscriptions").update(payload).eq("id", editingId);
        toast.success("Suscripción actualizada");
      } else {
        await supabase.from("subscriptions").insert([payload]);
        toast.success("Suscripción añadida");
      }
      fetchSubscriptions(user.id);
      setIsSubModalOpen(false);
    } catch (error: any) {
      toast.error("Error al guardar", { description: error.message });
    }
  };

  const handleDeleteSub = async () => {
    if (!subToDelete) return;
    try {
      await supabase.from("subscriptions").update({ active: false }).eq("id", subToDelete);
      toast.success("Suscripción eliminada");
      fetchSubscriptions(user.id);
    } catch (error: any) {
      toast.error("Error al eliminar", { description: error.message });
    } finally {
      setSubToDelete(null);
      setIsSubModalOpen(false);
    }
  };

  // --- CÁLCULOS ---
  const totalMonthly = subscriptions.reduce((acc, sub) => acc + sub.price, 0);

  const chartData = subscriptions.reduce((acc: any[], curr) => {
    const existing = acc.find((i) => i.name === curr.category);
    if (existing) existing.value += curr.price;
    else acc.push({ name: curr.category, value: curr.price });
    return acc;
  }, []);

  const nextRenewal = subscriptions.reduce<{ sub: Subscription; date: Date } | null>((closest, sub) => {
    const date = getNextRenewalDate(sub.start_date);
    if (!closest || date < closest.date) return { sub, date };
    return closest;
  }, null);

  if (loading) return (
    <div className="flex h-screen items-center justify-center text-slate-400">Cargando Recur...</div>
  );

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 max-w-7xl">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
            <Image src="/icon-192.png" alt="Recur" width={32} height={32} className="h-8 w-8 rounded-lg" />
            <span>Recur</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden sm:inline-block">{user?.email}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => supabase.auth.signOut().then(() => router.push("/"))}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" /> Salir
            </Button>
          </div>
        </div>
      </nav>

      {/* CONTENIDO */}
      <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-6 md:space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Mis Suscripciones</h1>
            <p className="text-slate-500">Gestiona todos tus gastos recurrentes</p>
          </div>
          <Button onClick={() => openSubModal()} className="bg-slate-900 text-white shadow-md shadow-slate-900/20">
            <Plus className="mr-2 h-4 w-4" /> Suscripción
          </Button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Total mensual */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 rounded-full bg-blue-500 mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <p className="text-slate-400 text-sm font-medium mb-2">Total mensual</p>
              <h3 className="text-4xl font-black tracking-tight tabular-nums font-mono">
                {totalMonthly.toFixed(2)}€
              </h3>
              <p className="text-slate-400 text-xs mt-2">{(totalMonthly * 12).toFixed(0)}€ al año</p>
            </div>
          </div>

          {/* Próxima renovación */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-amber-100 p-2 rounded-lg text-amber-600">
                <Bell className="h-4 w-4" />
              </div>
              <p className="text-slate-500 text-sm font-medium">Próxima renovación</p>
            </div>
            {nextRenewal ? (
              <>
                <h3 className="text-xl font-bold text-slate-900">{nextRenewal.sub.name}</h3>
                <p className="text-slate-500 text-sm mt-1">{formatRenewalDate(nextRenewal.date)}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
                    en {daysUntil(nextRenewal.date)} días
                  </span>
                  <span className="font-bold text-slate-900 font-mono">{nextRenewal.sub.price.toFixed(2)}€</span>
                </div>
              </>
            ) : (
              <p className="text-slate-400 text-sm">Sin suscripciones activas</p>
            )}
          </div>

          {/* Suscripciones activas */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-slate-500 text-sm font-medium mb-2">Suscripciones activas</p>
            <h3 className="text-4xl font-black text-slate-900">{subscriptions.length}</h3>
            {subscriptions.length > 0 && (
              <p className="text-slate-400 text-xs mt-2">
                Media: {(totalMonthly / subscriptions.length).toFixed(2)}€/suscripción
              </p>
            )}
          </div>
        </div>

        {/* GRÁFICO + LISTA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Desglose por categoría */}
          <div className="md:col-span-1 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
            <h4 className="font-bold text-slate-800 w-full mb-4">Desglose por categoría</h4>
            {subscriptions.length > 0 ? (
              <div className="h-64 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      formatter={(value: number) => `${value.toFixed(2)}€`}
                      contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                  <span className="text-2xl font-bold text-slate-900 font-mono">{totalMonthly.toFixed(0)}€</span>
                </div>
              </div>
            ) : (
              <p className="text-slate-400">Sin suscripciones</p>
            )}
          </div>

          {/* Lista de suscripciones */}
          <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-slate-800">Suscripciones activas</h4>
              <span className="text-xs text-slate-400">Toca para editar</span>
            </div>

            {subscriptions.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-10 gap-4">
                <p className="text-slate-400">Todavía no tienes suscripciones</p>
                <Button onClick={() => openSubModal()} size="sm" className="bg-slate-900 text-white">
                  <Plus className="mr-2 h-4 w-4" /> Añadir primera suscripción
                </Button>
              </div>
            ) : (
              <div className="space-y-3 flex-1 overflow-auto max-h-[360px]">
                {subscriptions.map((sub) => {
                  const renewalDate = getNextRenewalDate(sub.start_date);
                  const days = daysUntil(renewalDate);
                  return (
                    <div
                      key={sub.id}
                      onClick={() => openSubModal(sub)}
                      className="cursor-pointer flex items-center justify-between p-4 bg-slate-50 hover:bg-white border border-transparent hover:border-blue-200 hover:shadow-md rounded-2xl transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold">
                          {sub.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{sub.name}</p>
                          <p className="text-xs text-slate-500">
                            {sub.category} · renueva en {days} días
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold text-slate-900 font-mono">-{sub.price.toFixed(2)}€</p>
                        <Pencil className="h-4 w-4 text-slate-300 group-hover:text-blue-500" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL: SUSCRIPCIÓN */}
      {isSubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-lg">{editingId ? "Editar Suscripción" : "Nueva Suscripción"}</h3>
              <button onClick={() => setIsSubModalOpen(false)}>
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSaveSubscription} className="space-y-4">
              <input
                required
                placeholder="Nombre (ej: Netflix)"
                value={subForm.name}
                onChange={(e) => setSubForm({ ...subForm, name: e.target.value })}
                className="w-full p-2 border rounded-lg"
              />
              <div className="flex gap-4">
                <input
                  required
                  type="number"
                  step="0.01"
                  placeholder="Precio"
                  value={subForm.price}
                  onChange={(e) => setSubForm({ ...subForm, price: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
                <input
                  required
                  type="date"
                  value={subForm.date}
                  onChange={(e) => setSubForm({ ...subForm, date: e.target.value })}
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              <select
                value={subForm.category}
                onChange={(e) => setSubForm({ ...subForm, category: e.target.value })}
                className="w-full p-2 border rounded-lg bg-white"
              >
                {["Entretenimiento", "Música", "Software", "Hogar", "Seguros", "Otros"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <div className="flex gap-2 pt-2">
                {editingId && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => setSubToDelete(editingId)}
                    className="flex-1"
                  >
                    Borrar
                  </Button>
                )}
                <Button type="submit" className="flex-[2] bg-slate-900 text-white">
                  Guardar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DIALOG: CONFIRMAR BORRADO */}
      {subToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl">
            <h3 className="font-bold text-lg mb-1">¿Borrar suscripción?</h3>
            <p className="text-slate-500 text-sm mb-6">Esta acción no se puede deshacer.</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setSubToDelete(null)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteSub}
                className="flex-1"
              >
                Borrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
