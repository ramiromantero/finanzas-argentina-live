/** Cotización de dólar según DolarAPI (https://dolarapi.com/v1/dolares) */
export interface Dolar {
  moneda: string;
  casa: string;
  nombre: string;
  compra: number | null;
  venta: number | null;
  fechaActualizacion: string;
}

/** Punto de una serie de índices de ArgentinaDatos ({fecha, valor}) */
export interface IndicePunto {
  fecha: string;
  valor: number;
}

/** Resultado de un fetcher: los datos + si se cayó al fallback embebido */
export interface FetchResult<T> {
  data: T;
  demo: boolean;
}
