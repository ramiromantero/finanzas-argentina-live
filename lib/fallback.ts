import type { Dolar, IndicePunto } from "./types";

/**
 * Datos de fallback embebidos (valores de referencia, julio 2026).
 * Se usan solo si las APIs públicas fallan o no hay red, para que el
 * dashboard se vea completo igual. La UI muestra un badge "modo demo".
 */

const FECHA_REF = "2026-07-21T13:00:00.000Z";

export const FALLBACK_DOLARES: Dolar[] = [
  { moneda: "USD", casa: "oficial", nombre: "Oficial", compra: 1275, venta: 1315, fechaActualizacion: FECHA_REF },
  { moneda: "USD", casa: "blue", nombre: "Blue", compra: 1385, venta: 1405, fechaActualizacion: FECHA_REF },
  { moneda: "USD", casa: "bolsa", nombre: "Bolsa", compra: 1362, venta: 1368, fechaActualizacion: FECHA_REF },
  { moneda: "USD", casa: "contadoconliqui", nombre: "Contado con liquidación", compra: 1381, venta: 1390, fechaActualizacion: FECHA_REF },
  { moneda: "USD", casa: "cripto", nombre: "Cripto", compra: 1392, venta: 1412, fechaActualizacion: FECHA_REF },
  { moneda: "USD", casa: "tarjeta", nombre: "Tarjeta", compra: 1657, venta: 1709, fechaActualizacion: FECHA_REF },
  { moneda: "USD", casa: "mayorista", nombre: "Mayorista", compra: 1290, venta: 1298, fechaActualizacion: FECHA_REF },
];

/** Inflación mensual (%) — últimos 24 meses hasta jun 2026 */
export const FALLBACK_INFLACION: IndicePunto[] = [
  { fecha: "2024-07-31", valor: 4.0 },
  { fecha: "2024-08-31", valor: 4.2 },
  { fecha: "2024-09-30", valor: 3.5 },
  { fecha: "2024-10-31", valor: 2.7 },
  { fecha: "2024-11-30", valor: 2.4 },
  { fecha: "2024-12-31", valor: 2.7 },
  { fecha: "2025-01-31", valor: 2.2 },
  { fecha: "2025-02-28", valor: 2.4 },
  { fecha: "2025-03-31", valor: 3.7 },
  { fecha: "2025-04-30", valor: 2.8 },
  { fecha: "2025-05-31", valor: 1.5 },
  { fecha: "2025-06-30", valor: 1.6 },
  { fecha: "2025-07-31", valor: 1.9 },
  { fecha: "2025-08-31", valor: 1.9 },
  { fecha: "2025-09-30", valor: 2.1 },
  { fecha: "2025-10-31", valor: 2.3 },
  { fecha: "2025-11-30", valor: 2.4 },
  { fecha: "2025-12-31", valor: 2.8 },
  { fecha: "2026-01-31", valor: 2.5 },
  { fecha: "2026-02-28", valor: 2.2 },
  { fecha: "2026-03-31", valor: 2.0 },
  { fecha: "2026-04-30", valor: 1.9 },
  { fecha: "2026-05-31", valor: 1.7 },
  { fecha: "2026-06-30", valor: 1.6 },
];

export const FALLBACK_RIESGO_ULTIMO: IndicePunto = {
  fecha: "2026-07-20",
  valor: 598,
};

/**
 * Serie histórica de riesgo país (~180 días hábiles hasta jul 2026),
 * generada de forma determinística: tendencia descendente 780 → ~600
 * con oscilación suave, para que el AreaChart se vea realista.
 */
function generarSerieRiesgo(): IndicePunto[] {
  const puntos: IndicePunto[] = [];
  const fin = new Date(Date.UTC(2026, 6, 20)); // 20 jul 2026
  const dias = 180;
  for (let i = 0; i < dias; i++) {
    const fecha = new Date(fin);
    fecha.setUTCDate(fin.getUTCDate() - (dias - 1 - i));
    const t = i / (dias - 1);
    // tendencia + dos ondas + ruido determinístico
    const tendencia = 780 - 182 * t;
    const onda = 26 * Math.sin(i / 11) + 14 * Math.sin(i / 4.3);
    const ruido = 9 * Math.sin(i * 12.9898) * Math.cos(i * 0.7);
    const valor = Math.round(tendencia + onda + ruido);
    puntos.push({ fecha: fecha.toISOString().slice(0, 10), valor });
  }
  // el último punto coincide con el "último" de referencia
  puntos[puntos.length - 1] = { ...FALLBACK_RIESGO_ULTIMO };
  return puntos;
}

export const FALLBACK_RIESGO_SERIE: IndicePunto[] = generarSerieRiesgo();
