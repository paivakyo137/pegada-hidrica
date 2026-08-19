import { cn } from "@/lib/utils";
import { Droplets } from "lucide-react";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="relative block">
      <Droplets className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-sky-500" />
      <input
        className={cn(
          "w-full rounded-2xl border border-sky-200/80 bg-white/70 py-2.5 pr-4 pl-10 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30 dark:border-sky-900 dark:bg-slate-900/60",
          className,
        )}
        {...props}
      />
    </label>
  );
}
