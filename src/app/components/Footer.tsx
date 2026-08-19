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
    </footer>
  );
}
