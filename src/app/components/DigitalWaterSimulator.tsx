"use client";

import { ShareButton } from "@/app/components/ShareButton";
import { Card } from "@/app/components/ui/Card";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { calculateAiWater } from "@/lib/calculations";
import { WATER_CONSUMPTION } from "@/lib/constants";
import { formatLiters, formatNumber } from "@/lib/utils";
import { Cpu } from "lucide-react";
import { useMemo, useState } from "react";

export function DigitalWaterSimulator() {
  const [commands, setCommands] = useState(40);
  const [days, setDays] = useState(1);

  const result = useMemo(() => calculateAiWater(commands, days), [commands, days]);
  const fill = Math.min(100, (result.totalWater / 5) * 100);

  return (
    <ScrollReveal>
      <section id="ia" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">Simulador</p>
        <h2 className="font-display mt-2 text-4xl">Água digital: cada comando conta</h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Data centers evaporam água para resfriar servidores. Usamos a faixa educativa de{" "}
          {WATER_CONSUMPTION.ai.chatgpt_command.min}–{WATER_CONSUMPTION.ai.chatgpt_command.max} L por
          comando — cerca de 0,5 L a cada 20–50 prompts.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <label className="flex items-center justify-between text-sm font-semibold">
              Comandos de IA hoje
              <span className="font-mono text-water">{commands}</span>
            </label>
            <input
              type="range"
              min={0}
              max={500}
              value={commands}
              onChange={(e) => setCommands(Number(e.target.value))}
              className="mt-4 w-full accent-sky-500"
            />
            <label className="mt-8 flex items-center justify-between text-sm font-semibold">
              Dias
              <span className="font-mono text-leaf">{days}</span>
            </label>
            <input
              type="range"
              min={1}
              max={30}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="mt-4 w-full accent-emerald-500"
            />
            <p className="mt-6 text-xs text-[var(--muted)]">
              {formatNumber(commands * days)} comandos no período · média{" "}
              {((WATER_CONSUMPTION.ai.chatgpt_command.min + WATER_CONSUMPTION.ai.chatgpt_command.max) / 2).toFixed(3)} L
              cada
            </p>
          </Card>

          <Card className="relative overflow-hidden">
            <div
              className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-water/30 to-water-light/10 transition-all duration-500"
              style={{ height: `${fill}%` }}
            />
            <div className="relative">
              <p className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <Cpu className="size-4" /> Você usou só em buscas
              </p>
              <p className="font-display mt-2 text-5xl">{formatLiters(result.totalWater)}</p>
              <p className="mt-2 text-sm">
                Faixa: {formatLiters(result.minWater)} – {formatLiters(result.maxWater)}
              </p>
              <p className="mt-4 text-sm text-[var(--muted)]">{result.comparison}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <ShareButton
                  title="Água de IA"
                  liters={result.totalWater}
                  extra={`Achei que consumia ${formatLiters(result.totalWater)} de água em IA (${commands} comandos × ${days} dia(s)).`}
                />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </ScrollReveal>
  );
}
