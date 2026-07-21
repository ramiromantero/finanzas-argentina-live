import type { Dolar, FetchResult, IndicePunto } from "./types";
import {
  FALLBACK_DOLARES,
  FALLBACK_INFLACION,
  FALLBACK_RIESGO_SERIE,
  FALLBACK_RIESGO_ULTIMO,
} from "./fallback";

/**
 * Fetchers de las APIs públicas. Todos con try/catch: si la API falla,
 * devuelven el fallback embebido con demo: true (nunca rompen la UI).
 */

const DOLARES_URL = "https://dolarapi.com/v1/dolares";
const INFLACION_URL = "https://api.argentinadatos.com/v1/finanzas/indices/inflacion/";
const RIESGO_ULTIMO_URL = "https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/ultimo";
const RIESGO_SERIE_URL = "https://api.argentinadatos.com/v1/finanzas/indices/riesgo-pais/";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status} en ${url}`);
  return (await res.json()) as T;
}

export async function fetchDolares(): Promise<FetchResult<Dolar[]>> {
  try {
    const data = await getJson<Dolar[]>(DOLARES_URL);
    if (!Array.isArray(data) || data.length === 0) throw new Error("respuesta vacía");
    return { data, demo: false };
  } catch {
    return { data: FALLBACK_DOLARES, demo: true };
  }
}

export async function fetchInflacion(): Promise<FetchResult<IndicePunto[]>> {
  try {
    const data = await getJson<IndicePunto[]>(INFLACION_URL);
    if (!Array.isArray(data) || data.length === 0) throw new Error("respuesta vacía");
    return { data, demo: false };
  } catch {
    return { data: FALLBACK_INFLACION, demo: true };
  }
}

export async function fetchRiesgoUltimo(): Promise<FetchResult<IndicePunto>> {
  try {
    const data = await getJson<IndicePunto>(RIESGO_ULTIMO_URL);
    if (typeof data?.valor !== "number") throw new Error("respuesta inválida");
    return { data, demo: false };
  } catch {
    return { data: FALLBACK_RIESGO_ULTIMO, demo: true };
  }
}

/** Serie completa de riesgo país, limitada en cliente a los últimos `limit` puntos */
export async function fetchRiesgoSerie(limit = 180): Promise<FetchResult<IndicePunto[]>> {
  try {
    const data = await getJson<IndicePunto[]>(RIESGO_SERIE_URL);
    if (!Array.isArray(data) || data.length === 0) throw new Error("respuesta vacía");
    return { data: data.slice(-limit), demo: false };
  } catch {
    return { data: FALLBACK_RIESGO_SERIE.slice(-limit), demo: true };
  }
}
