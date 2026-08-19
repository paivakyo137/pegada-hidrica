import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatLiters(value: number, digits = 1): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) {
    return `${(value / 1_000_000).toLocaleString("pt-BR", { maximumFractionDigits: digits })} mi L`;
  }
  if (abs >= 1_000) {
    return `${(value / 1_000).toLocaleString("pt-BR", { maximumFractionDigits: digits })} mil L`;
  }
  return `${value.toLocaleString("pt-BR", { maximumFractionDigits: abs < 1 ? 2 : digits })} L`;
}

export function formatNumber(value: number, digits = 0): string {
  return value.toLocaleString("pt-BR", { maximumFractionDigits: digits });
}

export function isBrowser() {
  return typeof window !== "undefined";
}
