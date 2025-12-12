"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, Settings, LogOut, CreditCard } from "lucide-react";

export function UserNav() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [name, setName] = useState("");
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    useEffect(() => {
        // Cargar usuario actual
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                // Intentamos coger el nombre de los metadatos o del perfil
                const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
                setName(profile?.full_name || user.email?.split('@')[0]);
            }
        };
        getUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    const handleUpdateProfile = async () => {
        if (!user) return;
        const { error } = await supabase.from('profiles').update({ full_name: name }).eq('id', user.id);

        if (error) toast.error("Error al actualizar");
        else {
            toast.success("Perfil actualizado");
            setIsProfileOpen(false);
        }
    };

    if (!user) return null;

    return (
        <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10 border border-slate-200">
                            {/* Usamos un servicio de avatares aleatorios bonitos */}
                            <AvatarImage src={`https://api.dicebear.com/9.x/notionists/svg?seed=${user.email}`} alt="Avatar" />
                            <AvatarFallback>yo</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{name}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        {/* Truco: Usamos DialogTrigger dentro del menú para abrir el modal */}
                        <DialogTrigger asChild>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Editar Perfil</span>
                            </DropdownMenuItem>
                        </DialogTrigger>
                        <DropdownMenuItem disabled>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Facturación (Pro)</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem disabled>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Ajustes</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* --- MODAL DE EDITAR PERFIL --- */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Perfil</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <Button onClick={handleUpdateProfile} className="bg-slate-900 text-white">
                        Guardar cambios
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}