import { cn } from "@/lib/utils";
import { Droplets } from "lucide-react";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-sky-200",
        className,
      )}
    >
      <Droplets className="size-3.5" />
      {children}
    </span>
  );
}
