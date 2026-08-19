"use client";

import { Badge } from "@/app/components/ui/Badge";
import { Card } from "@/app/components/ui/Card";
import { Input } from "@/app/components/ui/Input";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { CATEGORY_LABELS, FOOD_CATALOG } from "@/lib/constants";
import { formatLiters } from "@/lib/utils";
import { useMemo, useState } from "react";

const FILTERS = ["todos", "legumes", "carnes", "bebidas", "frutas", "graos", "laticinios", "outros"];

export function FoodTable() {
  const [category, setCategory] = useState("todos");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    return FOOD_CATALOG.filter((item) => {
      const byCat = category === "todos" || item.category === category;
      const byName = item.name.toLowerCase().includes(query.toLowerCase());
      return byCat && byName;
    });
  }, [category, query]);

  return (
    <ScrollReveal>
      <section id="alimentos" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">Tabela viva</p>
        <h2 className="font-display mt-2 text-4xl">Alimentos e seus litros</h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Filtro por categoria e busca por nome. Os litros vêm do catálogo local em{" "}
          <code>src/lib/constants.ts</code>.
        </p>

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setCategory(filter)}
                className={`rounded-full px-4 py-1.5 text-sm whitespace-nowrap ${
                  category === filter
                    ? "btn-gradient"
                    : "bg-white/70 dark:bg-slate-900"
                }`}
              >
                {filter === "todos" ? "Todos" : CATEGORY_LABELS[filter]}
              </button>
            ))}
          </div>
          <div className="w-full md:max-w-xs">
            <Input
              placeholder="Buscar alimento…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((item) => (
            <Card key={item.id ?? item.slug} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="relative size-12 overflow-hidden rounded-2xl bg-sky-500/10">
                  <img src={item.icon} alt="" className="size-full object-contain p-1" />
                </div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {CATEGORY_LABELS[item.category] ?? item.category}
                  </p>
                </div>
              </div>
              <Badge>
                {formatLiters(item.waterUsed)} / {item.quantity} {item.unit}
              </Badge>
              <p className="text-sm text-[var(--muted)]">{item.description}</p>
            </Card>
          ))}
        </div>
        {visible.length === 0 ? (
          <p className="mt-8 text-center text-sm text-[var(--muted)]">Nenhum alimento encontrado.</p>
        ) : null}
      </section>
    </ScrollReveal>
  );
}
