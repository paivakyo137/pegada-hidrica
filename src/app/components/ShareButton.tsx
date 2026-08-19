"use client";

import { Button } from "@/app/components/ui/Button";
import { SITE_NAME } from "@/lib/constants";
import { formatLiters } from "@/lib/utils";
import { Check, Share2 } from "lucide-react";
import { useState } from "react";

export function ShareButton({
  title,
  liters,
  extra,
}: {
  title: string;
  liters: number;
  extra?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const text = extra
      ? `${title}\n${extra}\n— ${SITE_NAME}`
      : `Achei que consumia ${formatLiters(liters)} de água invisível. Descubra a sua pegada em ${SITE_NAME}.`;
    const url = typeof window !== "undefined" ? window.location.href : "";

    if (navigator.share) {
      try {
        await navigator.share({ title: SITE_NAME, text, url });
        return;
      } catch {
        // fall through to clipboard
      }
    }

    await navigator.clipboard.writeText(`${text}\n${url}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button type="button" variant="outline" onClick={share} className="no-print">
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {copied ? "Copiado" : "Compartilhar"}
    </Button>
  );
}
