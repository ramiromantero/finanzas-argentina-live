import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AR Finanzas Live — dashboard de la economía argentina",
  description:
    "Cotizaciones del dólar, inflación, riesgo país y brecha cambiaria de Argentina en tiempo real. Datos de DolarAPI y ArgentinaDatos.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
