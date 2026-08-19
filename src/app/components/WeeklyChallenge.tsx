"use client";

import { Card } from "@/app/components/ui/Card";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { WEEKLY_CHALLENGES } from "@/lib/constants";
import { formatLiters } from "@/lib/utils";
import { useEffect, useState } from "react";

const STORAGE_KEY = "agua-invisivel-desafio";

export function WeeklyChallenge() {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setDone(JSON.parse(raw) as string[]);
  }, []);

  function toggle(id: string) {
    setDone((current) => {
      const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  const saved = WEEKLY_CHALLENGES.filter((item) => done.includes(item.id)).reduce(
    (sum, item) => sum + item.litersSaved,
    0,
  );

  return (
    <ScrollReveal>
      <section id="desafio" className="mx-auto max-w-6xl px-4 py-16">
        <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">Desafio semanal</p>
        <h2 className="font-display mt-2 text-4xl">Reduza litros em 7 dias</h2>
        <p className="mt-3 text-[var(--muted)]">
          Marque o que já fez. O progresso fica neste navegador.
        </p>
        <p className="mt-2 text-sm font-semibold text-leaf">Economia marcada: {formatLiters(saved)}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {WEEKLY_CHALLENGES.map((challenge) => {
            const active = done.includes(challenge.id);
            return (
              <button key={challenge.id} type="button" onClick={() => toggle(challenge.id)} className="text-left">
                <Card className={active ? "ring-2 ring-leaf" : ""}>
                  <p className="font-semibold">{challenge.title}</p>
                  <p className="mt-1 text-sm text-[var(--muted)]">{challenge.description}</p>
                  <p className="mt-3 text-sm text-water">{formatLiters(challenge.litersSaved)} em jogo</p>
                </Card>
              </button>
            );
          })}
        </div>
      </section>
    </ScrollReveal>
  );
}
