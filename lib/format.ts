/** Helpers de formateo — siempre con locale es-AR */

const arsFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("es-AR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const pctFormatter = new Intl.NumberFormat("es-AR", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

/** $ 1.400 */
export function formatARS(value: number): string {
  return arsFormatter.format(value);
}

/** 1.400 (sin símbolo) */
export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

/** +8,3% / -1,2% */
export function formatPct(value: number, withSign = true): string {
  const sign = withSign && value > 0 ? "+" : "";
  return `${sign}${pctFormatter.format(value)}%`;
}

/** "14:32:05" en hora local */
export function formatTime(date: Date): string {
  return date.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/** "2026-07-21" → "jul 26" (etiqueta corta para ejes de charts) */
export function monthLabel(fecha: string): string {
  const [year, month] = fecha.split("-");
  const meses = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic",
  ];
  const idx = Number(month) - 1;
  return `${meses[idx] ?? month} ${year.slice(2)}`;
}

/** "2026-07-21" → "21 jul 2026" */
export function dateLabel(fecha: string): string {
  const [year, month, day] = fecha.split("-");
  const meses = [
    "ene", "feb", "mar", "abr", "may", "jun",
    "jul", "ago", "sep", "oct", "nov", "dic",
  ];
  const idx = Number(month) - 1;
  return `${Number(day)} ${meses[idx] ?? month} ${year}`;
}

/**
 * Inflación interanual acumulada: producto de (1 + v/100) de los
 * últimos 12 valores mensuales, expresado como porcentaje.
 */
export function interanualAcumulada(valoresMensuales: number[]): number {
  const ultimos12 = valoresMensuales.slice(-12);
  const factor = ultimos12.reduce((acc, v) => acc * (1 + v / 100), 1);
  return (factor - 1) * 100;
}

/** Brecha porcentual de una cotización contra el dólar oficial */
export function brechaVsOficial(venta: number, oficialVenta: number): number {
  if (oficialVenta <= 0) return 0;
  return ((venta - oficialVenta) / oficialVenta) * 100;
}
