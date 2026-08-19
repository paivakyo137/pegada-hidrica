import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "ghost" | "outline" | "dark";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variants: Record<Variant, string> = {
  primary:
    "btn-gradient shadow-lg shadow-sky-500/25 hover:brightness-105 hover:-translate-y-0.5",
  ghost: "bg-transparent text-foreground hover:bg-sky-500/10",
  outline:
    "border border-sky-400/40 bg-white/40 text-ink dark:bg-white/5 dark:text-white hover:border-sky-400",
  dark: "bg-ink text-white dark:bg-white dark:text-ink hover:opacity-90",
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition duration-200 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
