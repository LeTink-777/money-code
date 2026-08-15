import type { Metadata } from "next";
import { ResultView } from "@/components/ResultView";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Денежный код — ваш результат",
  description:
    "Ваш денежный код по дате рождения и краткая трактовка — бесплатно. Полная расшифровка, финансовые блоки, стратегии дохода и прогноз 2026-2027 — в полном доступе.",
  alternates: { canonical: "/result" },
};

export default function ResultPage() {
  return (
    <>
      <ResultView />
      <SiteFooter />
    </>
  );
}
