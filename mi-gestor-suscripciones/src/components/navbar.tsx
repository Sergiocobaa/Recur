import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-5xl">
                <div className="flex items-center gap-2">
                    {/* Un logo simple con texto */}
                    <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold">
                        R.
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">Recur</span>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500 font-medium hidden sm:block">sergio@demo.com</span>
                    <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300"></div> {/* Avatar placeholder */}
                </div>
            </div>
        </nav>
    )
}