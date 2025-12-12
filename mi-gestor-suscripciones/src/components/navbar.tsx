import Link from "next/link"
import { UserNav } from "@/components/user-nav" // Importamos el menú nuevo

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/60 backdrop-blur-xl">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-5xl">

                {/* PARTE IZQUIERDA: LOGO */}
                <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    {/* Si no tienes el componente Logo, usa esto: */}
                    <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold">R.</div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">Recur</span>
                </Link>

                {/* PARTE DERECHA: MENÚ DE USUARIO */}
                <div className="flex items-center gap-4">
                    <UserNav />
                </div>

            </div>
        </nav>
    )
}