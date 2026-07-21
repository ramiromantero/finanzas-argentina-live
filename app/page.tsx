"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import DollarGrid from "@/components/DollarGrid";
import InflationChart from "@/components/InflationChart";
import RiskChart from "@/components/RiskChart";
import GapBars from "@/components/GapBars";
import Footer from "@/components/Footer";
import {
  fetchDolares,
  fetchInflacion,
  fetchRiesgoSerie,
  fetchRiesgoUltimo,
} from "@/lib/api";
import type { Dolar, IndicePunto } from "@/lib/types";

const REFRESH_MS = 60_000; // auto-refresh de cotizaciones cada 60 s

export default function Home() {
  const [dolares, setDolares] = useState<Dolar[]>([]);
  const [inflacion, setInflacion] = useState<IndicePunto[]>([]);
  const [riesgoUltimo, setRiesgoUltimo] = useState<IndicePunto | null>(null);
  const [riesgoSerie, setRiesgoSerie] = useState<IndicePunto[]>([]);
  const [demo, setDemo] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  // evita setState sobre un componente desmontado si un fetch queda en vuelo
  const mounted = useRef(true);

  /** Carga solo cotizaciones (lo que cambia intradía) */
  const loadDolares = useCallback(async () => {
    const res = await fetchDolares();
    if (!mounted.current) return;
    setDolares(res.data);
    setLastUpdate(new Date());
    if (res.demo) setDemo(true);
  }, []);

  /** Carga completa: cotizaciones + índices */
  const loadAll = useCallback(async () => {
    setLoading(true);
    const [dRes, iRes, ruRes, rsRes] = await Promise.all([
      fetchDolares(),
      fetchInflacion(),
      fetchRiesgoUltimo(),
      fetchRiesgoSerie(180),
    ]);
    if (!mounted.current) return;
    setDolares(dRes.data);
    setInflacion(iRes.data);
    setRiesgoUltimo(ruRes.data);
    setRiesgoSerie(rsRes.data);
    setDemo(dRes.demo || iRes.demo || ruRes.demo || rsRes.demo);
    setLastUpdate(new Date());
    setLoading(false);
  }, []);

  useEffect(() => {
    mounted.current = true;
    loadAll();
    const interval = setInterval(loadDolares, REFRESH_MS);
    return () => {
      mounted.current = false;
      clearInterval(interval);
    };
  }, [loadAll, loadDolares]);

  const oficial = dolares.find((d) => d.casa === "oficial") ?? null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        lastUpdate={lastUpdate}
        loading={loading}
        demo={demo}
        onRefresh={loadAll}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        {/* Cotizaciones */}
        <section className="pt-8">
          <SectionTitle
            kicker="Cotizaciones"
            title="Dólar en Argentina"
            subtitle="Compra y venta de cada mercado, con la brecha contra el oficial calculada en vivo. Se actualiza solo cada 60 segundos."
          />
          <DollarGrid dolares={dolares} oficial={oficial} loading={loading} />
        </section>

        {/* Brecha cambiaria */}
        <section className="pt-14">
          <SectionTitle
            kicker="Brecha cambiaria"
            title="Distancia contra el oficial"
            subtitle="Cuánto más caro está cada dólar respecto del tipo de cambio oficial."
          />
          <GapBars dolares={dolares} oficial={oficial} />
        </section>

        {/* Inflación */}
        <section className="pt-14">
          <InflationChart data={inflacion} />
        </section>

        {/* Riesgo país */}
        <section className="pt-14">
          <RiskChart ultimo={riesgoUltimo} serie={riesgoSerie} />
        </section>
      </main>

      <Footer />
    </div>
  );
}

function SectionTitle({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold tracking-widest uppercase text-emerald-400/80">
        {kicker}
      </p>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
        {title}
      </h2>
      <p className="text-sm text-slate-400 mt-2 max-w-2xl">{subtitle}</p>
    </div>
  );
}
