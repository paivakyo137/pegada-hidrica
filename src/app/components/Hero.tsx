"use client";

import { WaterDropAnimation } from "@/app/components/WaterDropAnimation";
import { WATER_CONSUMPTION } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import { ArrowDown } from "lucide-react";

const STATS = [
  { value: formatNumber(WATER_CONSUMPTION.clothing.jeans), label: "litros em 1 jeans" },
  { value: formatNumber(WATER_CONSUMPTION.food.beef_1kg), label: "litros em 1 kg de carne" },
  { value: `${WATER_CONSUMPTION.comparisons.loss_percentage_brazil}%`, label: "perda na rede brasileira" },
  { value: "32 mi", label: "pessoas sem água adequada" },
];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-16 pb-24">
      <WaterDropAnimation />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold tracking-[0.2em] text-sky-600 uppercase">
            Pegada hídrica digital e cotidiana
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-5xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
            A água que você <span className="gradient-text">não vê</span> também conta.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">
            Cada xícara de café, cada calça jeans e cada prompt de IA carregam litros invisíveis.
            Meça, compare e reduza — em minutos.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#calculadora" className="btn-gradient rounded-full px-6 py-3 text-sm font-semibold shadow-lg shadow-sky-500/30">
              Calcular minha pegada
            </a>
            <a
              href="#ia"
              className="rounded-full border border-sky-300/70 px-6 py-3 text-sm font-semibold dark:border-sky-800"
            >
              Simular água de IA
            </a>
          </div>
        </div>

        <div className="glass floaty relative rounded-[2rem] p-6">
          <p className="text-sm text-[var(--muted)]">Números que cabem no bolso e no planeta</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-sky-500/5 p-4 dark:bg-sky-400/10">
                <p className="font-display text-3xl text-water">{stat.value}</p>
                <p className="mt-1 text-xs text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <a
        href="#calculadora"
        className="relative mx-auto mt-16 flex w-fit items-center gap-2 text-sm text-sky-700 dark:text-sky-300"
      >
        <ArrowDown className="size-4 animate-bounce" />
        Desça para calcular
      </a>
    </section>
  );
}
