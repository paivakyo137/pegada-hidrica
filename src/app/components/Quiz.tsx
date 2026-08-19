"use client";

import { ShareButton } from "@/app/components/ShareButton";
import { Button } from "@/app/components/ui/Button";
import { Card } from "@/app/components/ui/Card";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { quizLitersSaved } from "@/lib/calculations";
import { QUIZ_QUESTIONS } from "@/lib/constants";
import { formatLiters } from "@/lib/utils";
import { useState } from "react";

export function Quiz() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  const question = QUIZ_QUESTIONS[index];
  const progress = ((done ? QUIZ_QUESTIONS.length : index) / QUIZ_QUESTIONS.length) * 100;
  const saved = quizLitersSaved(correct, QUIZ_QUESTIONS.length);

  function choose(option: number) {
    if (picked !== null) return;
    setPicked(option);
    if (option === question.answer) setCorrect((value) => value + 1);
  }

  function next() {
    if (index + 1 >= QUIZ_QUESTIONS.length) {
      setDone(true);
      return;
    }
    setIndex((value) => value + 1);
    setPicked(null);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setCorrect(0);
    setDone(false);
  }

  return (
    <ScrollReveal>
      <section id="quiz" className="scroll-mt-24 mx-auto max-w-3xl px-4 py-16">
        <p className="text-sm font-semibold tracking-widest text-sky-600 uppercase">Quiz educativo</p>
        <h2 className="font-display mt-2 text-4xl">Teste o que a água esconde</h2>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-sky-100 dark:bg-slate-800">
          <div className="h-full bg-gradient-to-r from-water to-leaf transition-all" style={{ width: `${progress}%` }} />
        </div>

        <Card className="mt-6">
          {done ? (
            <div>
              <p className="font-display text-4xl">
                {correct}/{QUIZ_QUESTIONS.length} acertos
              </p>
              <p className="mt-3 text-[var(--muted)]">
                Com esse olhar, você já tem mapa para economizar cerca de {formatLiters(saved)} ao
                ajustar um jeans, um café ou uma porção de carne nesta semana.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button type="button" onClick={restart}>
                  Refazer
                </Button>
                <ShareButton
                  title="Quiz da pegada hídrica"
                  liters={saved}
                  extra={`Acertei ${correct} de ${QUIZ_QUESTIONS.length} no quiz da Água Invisível. Potencial de ${formatLiters(saved)} economizados.`}
                />
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-[var(--muted)]">
                Pergunta {index + 1} de {QUIZ_QUESTIONS.length}
              </p>
              <h3 className="font-display mt-2 text-2xl">{question.question}</h3>
              <div className="mt-5 grid gap-2">
                {question.options.map((option, optionIndex) => {
                  const isAnswer = optionIndex === question.answer;
                  const isPicked = picked === optionIndex;
                  const reveal = picked !== null;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => choose(optionIndex)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                        reveal && isAnswer
                          ? "border-leaf bg-leaf/15"
                          : reveal && isPicked
                            ? "border-rose-400 bg-rose-400/10"
                            : "border-sky-200/80 hover:border-water dark:border-sky-900"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              {picked !== null ? (
                <div className="mt-5">
                  <p className="text-sm">{question.insight}</p>
                  <Button type="button" className="mt-4" onClick={next}>
                    {index + 1 === QUIZ_QUESTIONS.length ? "Ver resultado" : "Próxima"}
                  </Button>
                </div>
              ) : null}
            </div>
          )}
        </Card>
      </section>
    </ScrollReveal>
  );
}
