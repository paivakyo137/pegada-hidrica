"use client";

import dynamic from "next/dynamic";

const ComparisonChart = dynamic(
  () => import("@/app/components/ComparisonChart").then((mod) => mod.ComparisonChart),
  { ssr: false, loading: () => <div className="mx-auto h-[420px] max-w-6xl px-4" /> },
);

export function ChartsSection() {
  return <ComparisonChart />;
}
