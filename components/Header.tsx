"use client";

import { formatTime } from "@/lib/format";

interface HeaderProps {
  lastUpdate: Date | null;
  loading: boolean;
  demo: boolean;
  onRefresh: () => void;
}

export default function Header({ lastUpdate, loading, demo, onRefresh }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-500/10 bg-[#050B18]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 17l5-6 4 3 7-9"
                stroke="#050B18"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-slate-100 leading-tight truncate">
              AR Finanzas <span className="text-emerald-400">Live</span>
            </h1>
            <p className="text-[11px] text-slate-500 leading-tight hidden sm:block">
              Economía argentina en tiempo real
            </p>
          </div>
        </div>

        {/* Estado + refresh */}
        <div className="flex items-center gap-3 sm:gap-4">
          {demo && (
            <span className="text-[10px] sm:text-[11px] font-medium px-2 py-1 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 whitespace-nowrap">
              modo demo — datos de referencia
            </span>
          )}

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 live-dot" aria-hidden="true" />
            <span className="text-xs font-medium text-emerald-300 hidden sm:inline">
              En vivo
            </span>
          </div>

          <span className="text-xs text-slate-400 tabular hidden md:inline">
            {lastUpdate ? `Actualizado ${formatTime(lastUpdate)}` : "Cargando…"}
          </span>

          <button
            onClick={onRefresh}
            disabled={loading}
            aria-label="Actualizar datos"
            className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-500/20 bg-slate-500/10 text-slate-200 hover:border-emerald-400/40 hover:text-emerald-300 transition-colors disabled:opacity-50"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className={loading ? "spinning" : ""}
              aria-hidden="true"
            >
              <path
                d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="hidden sm:inline">Actualizar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
