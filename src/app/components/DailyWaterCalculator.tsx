"use client";

import { ShareButton } from "@/app/components/ShareButton";
import { Badge } from "@/app/components/ui/Badge";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { calculateFoodFootprint } from "@/lib/calculations";
import { FOOD_CATALOG, PERSON_DAILY_LITERS } from "@/lib/constants";
import { formatLiters, formatNumber } from "@/lib/utils";
import { Minus, Plus, Printer } from "lucide-react";
import { useMemo, useState } from "react";

const DEFAULTS = [
  { slug: "arroz", quantity: 0.15, label: "Arroz (porção 150 g)" },
  { slug: "carne-bovina", quantity: 0, label: "Carne bovina (porção 150 g)" },
  { slug: "cafe", quantity: 1, label: "Café (xícaras)" },
  { slug: "leite", quantity: 0.2, label: "Leite (copo 200 ml)" },
  { slug: "tomate", quantity: 1, label: "Tomate (unidades)" },
  { slug: "pao", quantity: 0.1, label: "Pão (100 g)" },
];

const STEP: Record<string, number> = {
  arroz: 0.15,
  "carne-bovina": 0.15,
  cafe: 1,
  leite: 0.2,
  tomate: 1,
  pao: 0.1,
};

export function DailyWaterCalculator() {
  const [qty, setQty] = useState<Record<string, number>>(
    Object.fromEntries(DEFAULTS.map((item) => [item.slug, item.quantity])),
  );

  const result = useMemo(() => {
    return calculateFoodFootprint(
      DEFAULTS.map((item) => ({
        slug: item.slug,
        name: item.slug,
        quantity: qty[item.slug] ?? 0,
      })),
    );
  }, [qty]);

  function bump(slug: string, dir: 1 | -1) {
    const step = STEP[slug] ?? 1;
    setQty((prev) => ({
      ...prev,
      [slug]: Math.max(0, Number(((prev[slug] ?? 0) + dir * step).toFixed(2))),
    }));
  }

  return (
    <ScrollReveal>
      <section id="calculadora" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">Calculadora</p>
        <h2 className="font-display mt-2 text-4xl">Sua pegada hídrica cotidiana</h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Ajuste o que você comeu hoje. O total atualiza na hora e compara sua água virtual com o
          consumo doméstico de {PERSON_DAILY_LITERS} litros por pessoa.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="space-y-4">
            {DEFAULTS.map((item) => {
              const food = FOOD_CATALOG.find((entry) => entry.slug === item.slug);
              const water = (food?.waterUsed ?? 0) * (qty[item.slug] ?? 0);
              return (
                <div
                  key={item.slug}
                  className="flex flex-col gap-3 border-b border-sky-100 py-3 last:border-0 sm:flex-row sm:items-center sm:justify-between dark:border-sky-900/60"
                >
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-xs text-[var(--muted)]">
                      {formatLiters(food?.waterUsed ?? 0)} por {food?.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="grid size-9 place-items-center rounded-full bg-sky-500/10"
                      onClick={() => bump(item.slug, -1)}
                      aria-label={`Diminuir ${item.label}`}
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-16 text-center font-mono text-sm">
                      {qty[item.slug] ?? 0}
                    </span>
                    <button
                      type="button"
                      className="grid size-9 place-items-center rounded-full bg-sky-500/10"
                      onClick={() => bump(item.slug, 1)}
                      aria-label={`Aumentar ${item.label}`}
                    >
                      <Plus className="size-4" />
                    </button>
                    <Badge>{formatLiters(water)}</Badge>
                  </div>
                </div>
              );
            })}
          </Card>

          <Card className="flex flex-col">
            <p className="text-sm text-[var(--muted)]">Total de hoje</p>
            <p className="font-display mt-2 text-5xl text-water">{formatLiters(result.totalWater)}</p>
            <p className="mt-2 text-sm">{result.comparison}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-sky-500/10 p-4">
                <p className="text-xs text-[var(--muted)]">No mês</p>
                <p className="font-display text-2xl">{formatLiters(result.monthlyWater, 0)}</p>
              </div>
              <div className="rounded-2xl bg-leaf/10 p-4">
                <p className="text-xs text-[var(--muted)]">No ano</p>
                <p className="font-display text-2xl">{formatLiters(result.annualWater, 0)}</p>
              </div>
            </div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-sky-100 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-water to-leaf"
                style={{ width: `${Math.min(100, (result.peopleEquivalent / 40) * 100)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-[var(--muted)]">
              {formatNumber(result.peopleEquivalent, 1)} pessoas · barra relativa a 40 pessoas
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <ShareButton
                title="Minha pegada hídrica cotidiana"
                liters={result.totalWater}
                extra={`Hoje: ${formatLiters(result.totalWater)} · Mês: ${formatLiters(result.monthlyWater, 0)} · ${result.comparison}`}
              />
              <Button type="button" variant="ghost" onClick={() => window.print()}>
                <Printer className="size-4" />
                Exportar
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </ScrollReveal>
  );
}
