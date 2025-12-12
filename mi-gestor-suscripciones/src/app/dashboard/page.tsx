"use client";

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { SubscriptionCard } from "@/components/subscription-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Loader2, Save } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Subscription {
  id: string
  name: string
  price: number
  category: string
  start_date: string
}

export default function Dashboard() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  // Estado para saber si estamos editando (si tiene valor es que editamos, si es null creamos)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    date: "",
    category: "Entretenimiento"
  })

  // --- CARGAR DATOS ---
  useEffect(() => {
    fetchSubscriptions()
  }, [])

  async function fetchSubscriptions() {
    try {
      const { data, error } = await supabase.from('subscriptions').select('*').order('created_at', { ascending: false })
      if (error) throw error
      setSubscriptions(data || [])
    } catch (error) {
      console.error(error)
      toast.error("Error cargando datos")
    } finally {
      setLoading(false)
    }
  }

  // --- ABRIR MODAL PARA CREAR ---
  const openCreateModal = () => {
    setEditingId(null); // Limpiamos ID
    setFormData({ name: "", price: "", date: "", category: "Entretenimiento" }); // Limpiamos form
    setIsOpen(true);
  }

  // --- ABRIR MODAL PARA EDITAR ---
  const openEditModal = (sub: Subscription) => {
    setEditingId(sub.id); // Guardamos qué ID editamos
    setFormData({
      name: sub.name,
      price: sub.price.toString(),
      date: sub.start_date,
      category: sub.category
    });
    setIsOpen(true);
  }

  // --- GUARDAR (CREAR O EDITAR) ---
  async function handleSave() {
    if (!formData.name || !formData.price || !formData.date) {
      toast.warning("Rellena todos los campos")
      return
    }

    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("No logueado")

      const payload = {
        name: formData.name,
        price: parseFloat(formData.price),
        start_date: formData.date,
        category: formData.category,
        user_id: user.id
      }

      let error;

      if (editingId) {
        // MODO EDICIÓN: ACTUALIZAMOS
        const response = await supabase.from('subscriptions').update(payload).eq('id', editingId);
        error = response.error;
      } else {
        // MODO CREACIÓN: INSERTAMOS
        const response = await supabase.from('subscriptions').insert([payload]);
        error = response.error;
      }

      if (error) throw error

      toast.success(editingId ? "¡Suscripción actualizada!" : "¡Suscripción añadida!")
      setIsOpen(false)
      fetchSubscriptions()
    } catch (error) {
      console.error(error)
      toast.error("Error al guardar")
    } finally {
      setSaving(false)
    }
  }

  // --- BORRAR ---
  async function handleDelete(id: string) {
    // Un pequeño confirm nativo (se puede hacer más bonito con otro Dialog, pero esto es rápido)
    if (!confirm("¿Seguro que quieres borrar esta suscripción?")) return;

    const { error } = await supabase.from('subscriptions').delete().eq('id', id);

    if (error) {
      toast.error("Error al borrar");
    } else {
      toast.success("Eliminada correctamente");
      // Optimizamos: borramos del estado local sin recargar todo
      setSubscriptions(prev => prev.filter(sub => sub.id !== id));
    }
  }

  const totalMonthly = subscriptions.reduce((acc, sub) => acc + sub.price, 0)

  return (
    <div className="min-h-screen w-full bg-grid-pattern relative selection:bg-blue-100">
      <div className="fixed inset-0 bg-blue-glow z-0"></div>

      <div className="relative z-10">
        <Navbar />

        <main className="container mx-auto px-4 py-12 max-w-5xl">

          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Tus Gastos
              </h1>
              <p className="text-lg text-slate-500">
                Gestiona y controla tus pagos recurrentes.
              </p>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Mensual</span>
              <div className="text-6xl font-black text-slate-900 tracking-tighter">
                {totalMonthly.toFixed(2)}€
              </div>
              <div className="text-sm font-medium text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full mt-2">
                {subscriptions.length} activas
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8 pb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              Mis Suscripciones
            </h2>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button onClick={openCreateModal} className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg">
                  <Plus className="mr-2 h-4 w-4" /> Nueva Suscripción
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>{editingId ? "Editar suscripción" : "Añadir servicio"}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      placeholder="Ej: Netflix"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Precio (€)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="0.00"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="date">Día de cobro</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Categoría</Label>
                    <Select
                      onValueChange={(val) => setFormData({ ...formData, category: val })}
                      value={formData.category} // IMPORTANTE: Usar value aquí para que se pre-seleccione al editar
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entretenimiento">Entretenimiento</SelectItem>
                        <SelectItem value="Música">Música</SelectItem>
                        <SelectItem value="Software">Software / IA</SelectItem>
                        <SelectItem value="Hogar">Hogar / Compras</SelectItem>
                        <SelectItem value="Otros">Otros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={saving} className="bg-slate-900 text-white">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    {editingId ? "Actualizar" : "Guardar"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="text-center py-20 text-slate-400">Cargando...</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subscriptions.map((sub) => (
                <SubscriptionCard
                  key={sub.id}
                  id={sub.id} // Pasamos el ID
                  name={sub.name}
                  price={sub.price}
                  date={new Date(sub.start_date).toLocaleDateString()}
                  category={sub.category}
                  onEdit={() => openEditModal(sub)} // Pasamos la función de editar
                  onDelete={() => handleDelete(sub.id)} // Pasamos la función de borrar
                />
              ))}

              <div
                onClick={openCreateModal}
                className="flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-xl p-6 h-full min-h-[180px] text-slate-400 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50/30 transition-all duration-200 group cursor-pointer bg-white/50"
              >
                <div className="h-12 w-12 rounded-full bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center mb-3 transition-colors">
                  <Plus className="h-6 w-6 text-slate-400 group-hover:text-blue-600" />
                </div>
                <span className="font-medium text-sm">Añadir servicio</span>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}