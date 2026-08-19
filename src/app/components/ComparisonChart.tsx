"use client";

import { Card } from "@/app/components/ui/Card";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { WATER_CONSUMPTION } from "@/lib/constants";
import { formatNumber } from "@/lib/utils";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART = [
  { name: "1 jeans", litros: WATER_CONSUMPTION.clothing.jeans, detalhe: "Algodão, tingimento e lavagens industriais" },
  { name: "1 camiseta", litros: WATER_CONSUMPTION.clothing.tshirt, detalhe: "Cerca de 2.700 litros de algodão irrigado" },
  { name: "1 kg carne", litros: WATER_CONSUMPTION.food.beef_1kg, detalhe: "Ração, pasto e dessedentação do rebanho" },
  { name: "1 kg arroz", litros: WATER_CONSUMPTION.food.rice_1kg, detalhe: "Irrigação de várzea ao longo do ciclo" },
  { name: "1 kg batata", litros: 290, detalhe: "Referência de baixo impacto entre os básicos" },
];

export function ComparisonChart() {
  return (
    <ScrollReveal>
      <section id="comparar" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">Comparador visual</p>
        <h2 className="font-display mt-2 text-4xl">Jeans, pessoas e desperdício</h2>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Passe o mouse nas barras para o detalhe. Uma calça jeans “esconde” a água diária de{" "}
          {WATER_CONSUMPTION.comparisons.jeans_daily_water_for_people} pessoas.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Card className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,144,255,0.15)" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [`${formatNumber(Number(value))} L`, "Água virtual"]}
                  labelFormatter={(label, payload) =>
                    `${label} — ${payload?.[0]?.payload?.detalhe ?? ""}`
                  }
                />
                <Bar dataKey="litros" fill="#1E90FF" radius={[12, 12, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <div className="grid gap-4">
            <Card>
              <p className="font-display text-4xl text-water">
                1 jeans = {WATER_CONSUMPTION.comparisons.jeans_daily_water_for_people} pessoas
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {formatNumber(WATER_CONSUMPTION.clothing.jeans)} litros ÷ 110 L/dia por pessoa.
              </p>
            </Card>
            <Card>
              <p className="font-display text-4xl text-leaf">
                {WATER_CONSUMPTION.comparisons.loss_percentage_brazil}% = 32 milhões
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Perda na distribuição brasileira — água já tratada que não chega à torneira. Enquanto isso,{" "}
                {formatNumber(WATER_CONSUMPTION.comparisons.people_without_water_br)} pessoas seguem sem acesso adequado.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
