"use client";

import type { Dolar } from "@/lib/types";
import { brechaVsOficial, formatARS, formatPct } from "@/lib/format";

interface GapBarsProps {
  dolares: Dolar[];
  oficial: Dolar | null;
}

/**
 * Visualización propia (sin librería de charts): barras horizontales
 * animadas con la brecha de cada dólar contra el oficial.
 */
export default function GapBars({ dolares, oficial }: GapBarsProps) {
  const oficialVenta = oficial?.venta ?? null;
  if (!oficialVenta || dolares.length === 0) {
    return (
      <div className="card p-6 text-sm text-slate-500">
        Sin datos de brecha por el momento.
      </div>
    );
  }

  const items = dolares
    .filter((d) => d.casa !== "oficial" && typeof d.venta === "number")
    .map((d) => ({
      dolar: d,
      brecha: brechaVsOficial(d.venta ?? 0, oficialVenta),
    }))
    .sort((a, b) => b.brecha - a.brecha);

  const maxBrecha = Math.max(...items.map((i) => Math.abs(i.brecha)), 1);

  return (
    <div className="card p-6">
      <div className="flex items-baseline justify-between mb-5 gap-3 flex-wrap">
        <p className="text-xs text-slate-500">
          Base: dólar oficial a{" "}
          <span className="text-slate-300 font-medium tabular">
            {formatARS(oficialVenta)}
          </span>
        </p>
        <p className="text-[11px] text-slate-600">
          brecha = (venta − oficial) / oficial
        </p>
      </div>

      <ul className="space-y-4">
        {items.map(({ dolar, brecha }, i) => {
          const width = Math.max((Math.abs(brecha) / maxBrecha) * 100, 2);
          const negativa = brecha < 0;
          return (
            <li key={dolar.casa}>
              <div className="flex items-center justify-between text-xs mb-1.5 gap-2">
                <span className="text-slate-300 font-medium">{dolar.nombre}</span>
                <span className="text-slate-400 tabular">
                  {formatARS(dolar.venta ?? 0)}
                  <span
                    className={`ml-2 font-semibold ${
                      negativa ? "text-red-400" : "text-emerald-400"
                    }`}
                  >
                    {formatPct(brecha)}
                  </span>
                </span>
              </div>
              <div className="h-3 rounded-full bg-slate-500/10 overflow-hidden">
                <div
                  className={`gap-bar h-full rounded-full ${
                    negativa
                      ? "bg-gradient-to-r from-red-500/70 to-red-400"
                      : "bg-gradient-to-r from-emerald-500/60 to-emerald-400"
                  }`}
                  style={{
                    width: `${width}%`,
                    animationDelay: `${i * 120}ms`,
                  }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
