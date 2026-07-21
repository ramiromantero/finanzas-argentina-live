"use client";

import type { Dolar } from "@/lib/types";
import DollarCard from "./DollarCard";

interface DollarGridProps {
  dolares: Dolar[];
  oficial: Dolar | null;
  loading: boolean;
}

export default function DollarGrid({ dolares, oficial, loading }: DollarGridProps) {
  if (loading && dolares.length === 0) {
    // Skeletons mientras carga la primera vez
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="card p-5 h-40 animate-pulse">
            <div className="h-3 w-24 bg-slate-500/20 rounded" />
            <div className="h-8 w-32 bg-slate-500/20 rounded mt-6" />
            <div className="h-3 w-full bg-slate-500/10 rounded mt-6" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {dolares.map((d, i) => (
        <DollarCard
          key={d.casa}
          dolar={d}
          oficialVenta={oficial?.venta ?? null}
          index={i}
        />
      ))}
    </div>
  );
}
