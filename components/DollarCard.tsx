"use client";

import { useEffect, useRef, useState } from "react";
import type { Dolar } from "@/lib/types";
import { brechaVsOficial, formatARS, formatPct } from "@/lib/format";

/**
 * Contador animado: interpola del valor anterior al nuevo con
 * requestAnimationFrame y devuelve además la dirección del cambio
 * (para el flash verde/rojo).
 */
function useAnimatedNumber(target: number, duration = 700) {
  const [display, setDisplay] = useState(target);
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const prevRef = useRef(target);
  const rafRef = useRef(0);

  useEffect(() => {
    const from = prevRef.current;
    if (from === target) return;
    setDirection(target > from ? "up" : "down");
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cúbico
      setDisplay(from + (target - from) * eased);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prevRef.current = target;
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return { display, direction };
}

interface DollarCardProps {
  dolar: Dolar;
  oficialVenta: number | null;
  index: number;
}

export default function DollarCard({ dolar, oficialVenta, index }: DollarCardProps) {
  const venta = dolar.venta ?? 0;
  const compra = dolar.compra ?? 0;
  const { display, direction } = useAnimatedNumber(venta);

  const esOficial = dolar.casa === "oficial";
  const brecha =
    !esOficial && oficialVenta ? brechaVsOficial(venta, oficialVenta) : null;

  const flashClass =
    direction === "up" ? "flash-up" : direction === "down" ? "flash-down" : "";

  return (
    <article
      className="card p-5 fade-up relative overflow-hidden"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Glow decorativo */}
      <div
        className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold text-slate-200">
            Dólar {dolar.nombre}
          </h3>
          <p className="text-[11px] text-slate-500 uppercase tracking-wider mt-0.5">
            {dolar.casa}
          </p>
        </div>
        {esOficial ? (
          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-sky-400/10 text-sky-300 border border-sky-400/20 whitespace-nowrap">
            referencia
          </span>
        ) : brecha !== null ? (
          <span
            className={`text-[10px] font-semibold px-2 py-1 rounded-full border whitespace-nowrap tabular ${
              brecha >= 0
                ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/20"
                : "bg-red-400/10 text-red-300 border-red-400/20"
            }`}
            title="Brecha contra el dólar oficial"
          >
            {formatPct(brecha)} vs oficial
          </span>
        ) : null}
      </div>

      {/* Precio de venta, grande y animado */}
      <p className={`mt-4 text-3xl font-bold text-slate-50 tabular ${flashClass}`}>
        {formatARS(display)}
      </p>
      <p className="text-[11px] text-slate-500 mt-1">venta</p>

      <div className="mt-4 pt-3 border-t border-slate-500/10 flex items-center justify-between text-xs">
        <span className="text-slate-500">Compra</span>
        <span className="text-slate-300 font-medium tabular">{formatARS(compra)}</span>
      </div>
    </article>
  );
}
