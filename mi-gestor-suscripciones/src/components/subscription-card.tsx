import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MoreHorizontal } from "lucide-react"

// Definimos los tipos para que sea más profesional (TypeScript)
interface SubscriptionCardProps {
    name: string;
    price: string;
    date: string;
    category: string;
    iconUrl?: string; // Para el futuro logo de la app (ej. logo de Netflix)
}

export function SubscriptionCard({ name, price, date, category }: SubscriptionCardProps) {
    // Lógica para colores de badge según categoría (puedes añadir más)
    const getBadgeStyle = (cat: string) => {
        switch (cat.toLowerCase()) {
            case 'entretenimiento': return "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200";
            case 'ia': return "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200";
            default: return "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200";
        }
    }

    return (
        <Card className="group relative overflow-hidden border-slate-200/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
            {/* Header más limpio con menú de opciones sutil */}
            <CardHeader className="flex flex-row items-start justify-between space-y-0 p-6 pb-3">
                <div className="space-y-1">
                    <h3 className="font-semibold text-lg text-slate-900 leading-none tracking-tight">
                        {name}
                    </h3>
                    {/* Badge con estilo pastel */}
                    <Badge variant="outline" className={`mt-2 font-medium ${getBadgeStyle(category)}`}>
                        {category}
                    </Badge>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900 -mt-1 -mr-2">
                    <MoreHorizontal className="h-5 w-5" />
                </Button>
            </CardHeader>

            <CardContent className="p-6 pt-2">
                <div className="flex items-baseline justify-between mt-4">
                    {/* Precio gigante, estilo financiero */}
                    <div className="flex items-baseline">
                        <span className="text-4xl font-bold tracking-tight text-slate-900">
                            {price}
                            <span className="text-xl align-top text-slate-500 ml-1">€</span>
                        </span>
                        <span className="text-sm font-medium text-slate-500 ml-2">/mes</span>
                    </div>
                </div>

                {/* Footer de la tarjeta con la fecha */}
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full">
                        <CalendarIcon className="mr-2 h-4 w-4 text-slate-400" />
                        Próximo: <span className="text-slate-700 ml-1">{date}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}