"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { IndicePunto } from "@/lib/types";
import { dateLabel, formatNumber, formatPct } from "@/lib/format";

interface RiskChartProps {
  ultimo: IndicePunto | null;
  serie: IndicePunto[];
}

/** Tooltip custom, tipado a mano */
function RiskTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: IndicePunto }>;
}) {
  const point = payload?.[0]?.payload;
  if (!active || !point) return null;
  return (
    <div className="rounded-lg border border-slate-500/20 bg-[#081226]/95 px-3 py-2 shadow-xl">
      <p className="text-[11px] text-slate-400">{dateLabel(point.fecha)}</p>
      <p className="text-sm font-bold text-sky-300 tabular">
        {formatNumber(point.valor)} pb
      </p>
    </div>
  );
}

export default function RiskChart({ ultimo, serie }: RiskChartProps) {
  // Variación contra el punto anterior de la serie
  const previo = serie.length >= 2 ? serie[serie.length - 2] : null;
  const variacion =
    ultimo && previo && previo.valor !== 0
      ? ((ultimo.valor - previo.valor) / previo.valor) * 100
      : null;
  const baja = variacion !== null && variacion < 0; // baja de riesgo país = buena noticia

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400/80">
            Riesgo país
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
            Índice EMBI Argentina
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl">
            Sobretasa que pagan los bonos argentinos sobre los del Tesoro de
            EE.UU., en puntos básicos. Últimos ~180 registros.
          </p>
        </div>

        {/* Valor actual grande */}
        <div className="card px-5 py-4">
          <p className="text-[11px] text-slate-500 uppercase tracking-wider">
            Valor actual
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-4xl font-bold text-slate-50 tabular">
              {ultimo ? formatNumber(ultimo.valor) : "—"}
            </p>
            <span className="text-sm text-slate-500">pb</span>
          </div>
          {variacion !== null && (
            <p
              className={`text-xs font-semibold tabular mt-1 ${
                baja ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {formatPct(variacion)} vs registro anterior
            </p>
          )}
          {ultimo && (
            <p className="text-[11px] text-slate-500 mt-1">
              {dateLabel(ultimo.fecha)}
            </p>
          )}
        </div>
      </div>

      <div className="card p-4 sm:p-6">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={serie} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="riesgoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.08)" vertical={false} />
              <XAxis
                dataKey="fecha"
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(f: string) => dateLabel(f).slice(0, 6)}
                minTickGap={48}
              />
              <YAxis
                tick={{ fill: "#64748b", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                domain={["auto", "auto"]}
                width={56}
                tickFormatter={(v: number) => formatNumber(v)}
              />
              <Tooltip content={<RiskTooltip />} />
              <Area
                type="monotone"
                dataKey="valor"
                stroke="#38bdf8"
                strokeWidth={2}
                fill="url(#riesgoGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#38bdf8", stroke: "#050B18" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
