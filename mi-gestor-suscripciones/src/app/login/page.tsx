"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { GoogleIcon } from "@/components/icons"; // Importamos el icono

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // --- NUEVA FUNCIÓN PARA GOOGLE ---
    const handleGoogleLogin = async () => {
        setLoading(true);
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                // Redirige al dashboard después de loguearse
                redirectTo: `${window.location.origin}/dashboard`,
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        }
        // No ponemos setLoading(false) si va bien porque la página se recargará al ir a Google
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setMessage(null);

        // ... (Tu código de email/password sigue igual aquí) ...
        // COPIA TU LÓGICA DE LOGIN/REGISTRO ANTERIOR AQUÍ
        if (isSignUp) {
            const { error } = await supabase.auth.signUp({
                email, password, options: { data: { full_name: email.split('@')[0] } }
            });
            if (error) setError(error.message);
            else setMessage("Cuenta creada. Revisa tu email.");
        } else {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) setError(error.message);
            else { router.push("/dashboard"); router.refresh(); }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-grid-pattern relative">
            <div className="fixed inset-0 z-[-1] bg-blue-glow opacity-60"></div>

            <div className="w-full max-w-md p-8 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 backdrop-blur-sm">

                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-slate-900 text-white font-bold text-xl mb-4">R.</div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        {isSignUp ? "Crea tu cuenta" : "Bienvenido de nuevo"}
                    </h1>
                </div>

                {/* --- BOTÓN DE GOOGLE --- */}
                <div className="grid gap-4 mb-6">
                    <Button variant="outline" onClick={handleGoogleLogin} disabled={loading} className="w-full bg-white hover:bg-slate-50 text-slate-700 border-slate-200">
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                        Continuar con Google
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-500">O con email</span>
                        </div>
                    </div>
                </div>

                {/* --- FORMULARIO EMAIL --- */}
                <form onSubmit={handleAuth} className="space-y-4">
                    {/* ... Tus inputs de Email y Password siguen igual ... */}
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="hola@ejemplo.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
                    {message && <div className="p-3 text-sm text-emerald-500 bg-emerald-50 rounded-md">{message}</div>}

                    <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800" disabled={loading}>
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {isSignUp ? "Registrarse" : "Entrar"}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <button onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-slate-900 hover:underline">
                        {isSignUp ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
                    </button>
                </div>
            </div>
        </div>
    );
}