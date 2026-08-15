const FALLBACK_URL = "https://money-code.vercel.app";

/**
 * Canonical origin for metadata, sitemap.xml and robots.txt.
 * NEXT_PUBLIC_SITE_URL wins when set (local development, custom domain),
 * otherwise Vercel's own production URL is used so the deployed site is
 * correct even if the assigned subdomain differs from the placeholder.
 */
function resolveUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return FALLBACK_URL;
}

export const SITE = {
  domain: "money-code.vercel.app",
  url: resolveUrl(),
  productName: "Расшифровка денежного кода по дате рождения",
  productKind: "цифровой информационный продукт (PDF-расшифровка нумерологического кода)",
  title: "Денежный код по дате рождения — расшифровка онлайн",
  description: "Узнайте свой денежный код по дате рождения. Финансовые сильные стороны, блоки и лучшие стратегии дохода. Бесплатный расчёт.",
  keywords: [
      "денежный код по дате рождения",
      "денежный код нумерология",
      "финансовый код дата рождения",
      "денежный потенциал нумерология",
      "число денег по дате рождения",
      "финансовый потенциал нумерология",
      "денежная программа дата рождения",
      "код богатства нумерология"
  ] as string[],
  accentColor: "#00FF41",
  faq: [
      {
          "q": "Как рассчитывается денежный код?",
          "a": "Складываются все цифры даты рождения и сумма сводится к одному числу от 1 до 9. Расчёт выполняется прямо в браузере."
      },
      {
          "q": "Что показывает денежный код?",
          "a": "Не размер дохода, а способ, которым деньги приходят именно к вам: через инициативу, партнёрство, слово, систему или экспертизу."
      },
      {
          "q": "Что входит в платную расшифровку?",
          "a": "Полная трактовка кода, финансовые блоки и способы их убрать, четыре стратегии дохода и прогноз на 2026-2027 годы."
      }
  ] as { q: string; a: string }[],
  legalUpdated: "15 августа 2026",
  legalUpdatedISO: "2026-08-15",
  owner: {
    fullName: "Евдокимов Даниил Владимирович",
    inn: "381928138362",
    status: "Самозанятый (плательщик НПД)",
    email: "danyavdkmvv3@gmail.com",
    telegram: "@dvdkmv",
    telegramUrl: "https://t.me/dvdkmv",
  },
} as const;
