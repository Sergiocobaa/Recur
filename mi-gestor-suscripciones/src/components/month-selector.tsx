"use client";

import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import { es } from "date-fns/locale"; // Para que salga en español

interface MonthSelectorProps {
  currentDate: Date;
  onMonthChange: (date: Date) => void;
}

export function MonthSelector({ currentDate, onMonthChange }: MonthSelectorProps) {
  
  const handlePrev = () => onMonthChange(subMonths(currentDate, 1));
  const handleNext = () => onMonthChange(addMonths(currentDate, 1));

  // Formato: "Octubre 2025" (Primera letra mayúscula)
  const monthLabel = format(currentDate, "MMMM yyyy", { locale: es });
  const capitalizedLabel = monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1);

  return (
    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-1 shadow-sm w-full max-w-xs mx-auto mb-6">
      <button 
        onClick={handlePrev}
        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2 font-bold text-slate-800 text-sm sm:text-base">
        <Calendar className="h-4 w-4 text-slate-400" />
        {capitalizedLabel}
      </div>

      <button 
        onClick={handleNext}
        className="p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}