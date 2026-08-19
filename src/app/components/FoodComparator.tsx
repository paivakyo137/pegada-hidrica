"use client";

import { Card } from "@/app/components/ui/Card";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { FOOD_CATALOG } from "@/lib/constants";
import { formatLiters } from "@/lib/utils";
import { useMemo, useState } from "react";

const PICKS = ["carne-bovina", "chocolate", "cafe", "arroz", "feijao", "frango", "leite", "tomate"];

export function FoodComparator() {
  const foods = useMemo(
    () => FOOD_CATALOG.filter((item) => PICKS.includes(item.slug)).sort((a, b) => b.waterUsed - a.waterUsed),
    [],
  );
  const max = foods[0]?.waterUsed ?? 1;
  const [left, setLeft] = useState("carne-bovina");
  const [right, setRight] = useState("tomate");

  const a = FOOD_CATALOG.find((item) => item.slug === left) ?? FOOD_CATALOG[0];
  const b = FOOD_CATALOG.find((item) => item.slug === right) ?? FOOD_CATALOG[1];
  const ratio = b.waterUsed === 0 ? 0 : a.waterUsed / b.waterUsed;

  return (
    <ScrollReveal>
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h3 className="font-display text-3xl">Compare dois alimentos</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <select
            className="rounded-2xl border border-sky-200 bg-white/70 px-4 py-3 dark:border-sky-900 dark:bg-slate-900"
            value={left}
            onChange={(e) => setLeft(e.target.value)}
          >
            {FOOD_CATALOG.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            className="rounded-2xl border border-sky-200 bg-white/70 px-4 py-3 dark:border-sky-900 dark:bg-slate-900"
            value={right}
            onChange={(e) => setRight(e.target.value)}
          >
            {FOOD_CATALOG.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <Card className="mt-4">
          <p className="font-display text-2xl">
            {a.name} usa {ratio.toFixed(1)}× a água de {b.name}
          </p>
          <p className="mt-1 text-sm text-[var(--muted)]">
            {formatLiters(a.waterUsed)} por {a.unit} versus {formatLiters(b.waterUsed)} por {b.unit}
          </p>
        </Card>
        <div className="mt-6 space-y-3">
          {foods.map((item) => (
            <div key={item.slug}>
              <div className="mb-1 flex justify-between text-sm">
                <span>{item.name}</span>
                <span className="font-mono">{formatLiters(item.waterUsed)}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-sky-100 dark:bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-water to-leaf"
                  style={{ width: `${(item.waterUsed / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
