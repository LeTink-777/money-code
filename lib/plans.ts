export type PlanId = "basic" | "full" | "premium";

export interface Plan {
  id: PlanId;
  /** Shown on the pricing card. */
  name: string;
  price: number;
  oldPrice: number;
  /** Goes into the YooKassa payment description. */
  yooDescription: string;
  /** Delivery window promised for this plan. */
  delivery: string;
  features: string[];
  /** Renders the offer countdown on this plan. */
  timer?: boolean;
  /** Renders the remaining-slots counter on this plan. */
  spots?: boolean;
  /** Highlighted as the recommended plan. */
  popular?: boolean;
  /** Position of the plan on the depth slider, in percent. */
  depth?: number;
  /** Number of months the calendar plan covers. */
  months?: number;
}

export const PLANS: Record<PlanId, Plan> = {
  basic: {
    id: "basic",
    name: "БАЗОВЫЙ",
    price: 290,
    oldPrice: 990,
    yooDescription: "Денежный код базовый",
    delivery: "24 часа",
    features: [
      "Расшифровка денежного кода",
      "Финансовые сильные стороны",
      "PDF 6 страниц",
      "Email за 24 часа",
    ],
  },
  full: {
    id: "full",
    name: "ПОЛНЫЙ",
    price: 590,
    oldPrice: 2490,
    yooDescription: "Денежный код полный",
    delivery: "12 часов",
    features: [
      "Полная расшифровка кода",
      "Финансовые блоки и как их убрать",
      "Лучшие стратегии дохода",
      "Прогноз на 2026-2027",
      "PDF 20 страниц",
      "Email за 12 часов",
    ],
    timer: true,
    popular: true,
  },
  premium: {
    id: "premium",
    name: "МАКСИМУМ",
    price: 1290,
    oldPrice: 4900,
    yooDescription: "Денежный код максимум",
    delivery: "6 часов",
    features: [
      "Всё из полного доступа",
      "Аудиоразбор 12 минут",
      "Email за 6 часов",
    ],
    spots: true,
  },
};

export const PLAN_IDS: PlanId[] = ["basic", "full", "premium"];

export const PLAN_LIST: Plan[] = PLAN_IDS.map((id) => PLANS[id]);

export function isPlanId(value: string): value is PlanId {
  return (PLAN_IDS as string[]).includes(value);
}
