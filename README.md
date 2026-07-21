# AR Finanzas Live

Dashboard financiero en tiempo real de la economía argentina: cotizaciones del dólar en todos sus mercados, inflación mensual, riesgo país y brecha cambiaria — con auto-refresh, animaciones y fallback offline.

Hecho por [Ramiro Mantero](https://github.com/ramiromantero) como pieza de portfolio, con el mismo criterio de producto que usé construyendo MADIC (plataforma financiera en producción).

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** estricto
- **Tailwind CSS 3.4**
- **Recharts** para los gráficos de inflación y riesgo país
- 100% client-side: sin API routes, sin variables de entorno, sin backend propio

## Features

- **Cotizaciones del dólar en vivo** — oficial, blue, bolsa (MEP), contado con liqui, cripto, tarjeta y mayorista, con compra/venta y la **brecha contra el oficial calculada en vivo**. Contadores animados cuando cambia un precio (flash verde al subir, rojo al bajar) y **auto-refresh cada 60 segundos**.
- **Brecha cambiaria** — visualización propia (sin librería) con barras horizontales animadas ordenadas por brecha.
- **Inflación** — gráfico de barras con gradiente de los últimos 24 meses del IPC, tooltip custom e **interanual acumulada** calculada como el producto de `(1 + v/100)` de los últimos 12 valores mensuales.
- **Riesgo país** — valor actual grande con variación contra el registro anterior, y serie histórica (~180 puntos) en un AreaChart con gradiente.
- **Modo demo** — todos los fetch tienen `try/catch` con datos de fallback embebidos realistas: si una API falla o no hay red, el dashboard se ve completo igual y aparece el badge "modo demo — datos de referencia".
- Dark theme azul-noche, números tabulares (`tabular-nums`), animación de entrada escalonada de las cards, responsive de 375px a 1440px.

## Correr en local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Deploy en Vercel

1. Subir el repo a GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importar el repo.
3. **Deploy** — no requiere ninguna configuración ni variable de entorno.

## Fuentes de datos

- Cotizaciones del dólar: [DolarAPI](https://dolarapi.com) (`/v1/dolares`)
- Inflación y riesgo país: [ArgentinaDatos](https://argentinadatos.com) (`/v1/finanzas/indices/inflacion/`, `/v1/finanzas/indices/riesgo-pais/`)

> Solo informativo, no es asesoramiento financiero.
