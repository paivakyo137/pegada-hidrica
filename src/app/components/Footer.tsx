import { SITE_NAME } from "@/lib/constants";
import { Droplets } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-sky-200/50 bg-white/40 dark:border-sky-900 dark:bg-slate-950/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-2">
        <div>
          <p className="flex items-center gap-2 font-display text-2xl">
            <Droplets className="size-5 text-water" />
            {SITE_NAME}
          </p>
          <p className="mt-3 max-w-sm text-sm text-[var(--muted)]">
            Educação sobre pegada hídrica cotidiana e digital. Números são estimativas
            (Water Footprint Network, SNIS e literatura de data centers) — use como bússola, não como medição de laboratório.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Fontes</p>
          <ul className="mt-3 space-y-2 text-[var(--muted)]">
            <li>Mekonnen & Hoekstra — Water Footprint Network</li>
            <li>SNIS — perdas de 37% na distribuição</li>
            <li>Resfriamento de data centers — faixa 0,01–0,05 L/comando</li>
          </ul>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-[var(--muted)]">
        © {new Date().getFullYear()} {SITE_NAME}. Projeto educativo.
      </p>
      <section className="w-full bg-gradient-to-r from-blue-50 to-green-50 py-8 mt-12 border-t border-blue-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-blue-900 mb-2">Desenvolvido por</h3>
          <p className="text-gray-700 text-lg">
            Arthur B. Paiva; Lorenzo B. Mendes; Mariany V. Agostini; Isadora Cristofoli; Guilherme B. Syka
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Trabalho de Itinerário Formativo de Aprofundamento (IFA) - C. E. Wilson Joffre
          </p>
        </div>
      </section>
    </footer>
  );
}
