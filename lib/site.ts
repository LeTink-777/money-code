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
  productName: "Денежный код по дате рождения",
  productKind: "цифровой информационный продукт (PDF-расшифровка нумерологического кода)",
  title: "Денежный код по дате рождения — расшифровка онлайн",
  description: "Узнайте свой денежный код по дате рождения. Финансовые сильные стороны, блоки и лучшие стратегии дохода. Бесплатный расчёт.",
  keywords: [
      "денежный код по дате рождения",
      "денежный код нумерология",
      "финансовый код дата рождения",
      "денежный потенциал нумерология",
      "число денег по дате рождения"
  ] as string[],
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
