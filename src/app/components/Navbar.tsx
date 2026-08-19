"use client";

import { ThemeToggle } from "@/app/components/ThemeToggle";
import { SITE_NAME } from "@/lib/constants";
import { Droplets, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "#calculadora", label: "Calculadora" },
  { href: "#ia", label: "Água digital" },
  { href: "#comparar", label: "Comparar" },
  { href: "#alimentos", label: "Alimentos" },
  { href: "#quiz", label: "Quiz" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-sky-200/40 bg-background/75 backdrop-blur-xl dark:border-sky-900/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-water to-leaf text-white shadow-lg shadow-sky-500/30">
            <Droplets className="size-5" />
          </span>
          <span className="font-display text-xl">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-[var(--muted)] hover:text-water">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Abrir menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="flex flex-col gap-3 px-4 pb-4 md:hidden">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}
