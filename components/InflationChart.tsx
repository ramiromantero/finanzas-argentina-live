"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { IndicePunto } from "@/lib/types";
import { formatPct, interanualAcumulada, monthLabel } from "@/lib/format";

interface InflationChartProps {
  data: IndicePunto[];
}

interface ChartPoint {
  fecha: string;
  valor: number;
  label: string;
}

/** Tooltip custom, tipado a mano (sin depender de los genéricos de Recharts) */
function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: ChartPoint }>;
}) {
  const point = payload?.[0]?.payload;
  if (!active || !point) return null;
  return (
    <div className="rounded-lg border border-slate-500/20 bg-[#081226]/95 px-3 py-2 shadow-xl">
      <p className="text-[11px] text-slate-400 capitalize">{point.label}</p>
      <p className="text-sm font-bold text-emerald-300 tabular">
        {formatPct(point.valor, false)} mensual
      </p>
    </div>
  );
}

export default function InflationChart({ data }: InflationChartProps) {
  // Últimos 24 meses publicados
  const ultimos24: ChartPoint[] = data.slice(-24).map((p) => ({
    ...p,
    label: monthLabel(p.fecha),
  }));

  const interanual = interanualAcumulada(data.map((p) => p.valor));
  const ultimo = ultimos24[ultimos24.length - 1];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400/80">
            Inflación
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
            Variación mensual del IPC
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Últimos 24 meses publicados por INDEC, vía ArgentinaDatos.
          </p>
        </div>

        {/* KPI interanual acumulada */}
        <div className="card px-5 py-4">
          <p className="text-[11px] text-slate-500 uppercase tracking-wider">
            Interanual acumulada
          </p>
          <p className="text-3xl font-bold text-emerald-300 tabular mt-1">
            {formatPct(interanual, false)}
          </p>
          {ultimo && (
            <p className="text-[11px] text-slate-500 mt-1 capitalize">
              último dato: {ultimo.label} ({formatPct(ultimo.valor, false)})
            </p>
          )}
        </div>
      </div>

      <div className="card p-4 sm:p-6">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ultimos24} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="inflacionGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={0.95} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.35} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.08)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
                minTickGap={24}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `${v}%`}
                width={48}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(148,163,184,0.06)" }}
              />
              <Bar
                dataKey="valor"
                fill="url(#inflacionGrad)"
                radius={[6, 6, 0, 0]}
                maxBarSize={26}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
