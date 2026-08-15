"use client";

import { useEffect, useId, useState } from "react";
import { Loader2 } from "lucide-react";
import { useCountdown } from "@/components/Countdown";
import { useSpots } from "@/components/Spots";
import { startCheckout } from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { PLAN_LIST, type PlanId } from "@/lib/plans";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Dot leaders keep the price column aligned in the monospace layout. */
function leader(name: string, width = 15): string {
  return ".".repeat(Math.max(2, width - name.length));
}

export function TerminalPricing({
  defaultEmail = "",
  context = "",
}: {
  defaultEmail?: string;
  context?: string;
}) {
  const uid = useId();
  const [selected, setSelected] = useState<PlanId>("full");
  const [command, setCommand] = useState("");
  const [email, setEmail] = useState(defaultEmail);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const countdown = useCountdown(24);
  const spots = useSpots(2, 4);

  useEffect(() => {
    if (defaultEmail) setEmail(defaultEmail);
  }, [defaultEmail]);

  const plan = PLAN_LIST.find((item) => item.id === selected) ?? PLAN_LIST[1];

  function handleCommand(value: string) {
    const cleaned = value.replace(/[^1-3]/g, "").slice(-1);
    setCommand(cleaned);
    if (cleaned) {
      const index = Number(cleaned) - 1;
      const target = PLAN_LIST[index];
      if (target) setSelected(target.id);
    }
  }

  async function handlePay() {
    if (!EMAIL_RE.test(email.trim())) {
      setError("> ERROR: укажите корректный email для доставки");
      return;
    }
    setError(null);
    setPending(true);
    try {
      await startCheckout({ plan: plan.id, email: email.trim().toLowerCase(), context });
    } catch (cause) {
      setError(`> ERROR: ${cause instanceof Error ? cause.message : "платёж не создан"}`);
      setPending(false);
    }
  }

  return (
    <div className="rounded-xl border border-line bg-card">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-line px-5 py-3">
        {["var(--accent-matrix)", "var(--accent-gold)", "var(--text-secondary)"].map((color) => (
          <span key={color} className="size-2.5 rounded-full" style={{ background: color }} />
        ))}
        <span className="ml-2 text-xs text-muted">money_code — access.sh</span>
      </div>

      <div className="px-5 py-6 text-sm sm:px-7">
        <p className="text-muted">{"> ANALYZING FINANCIAL MATRIX..."}</p>
        <p className="mt-1 text-muted">{"> SELECT ACCESS LEVEL:"}</p>
        <p className="mt-1 text-muted">{">"}</p>

        <div className="mt-4 space-y-5">
          {PLAN_LIST.map((item, index) => {
            const active = selected === item.id;
            const number = index + 1;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setSelected(item.id);
                  setCommand(String(number));
                }}
                aria-pressed={active}
                className="block w-full rounded-lg border px-4 py-3 text-left transition-colors"
                style={{
                  borderColor: active ? "var(--accent-matrix)" : "transparent",
                  background: active ? "rgba(0,255,65,0.07)" : "transparent",
                  color: active ? "var(--accent-matrix)" : "var(--text-secondary)",
                }}
              >
                <span className="block whitespace-pre-wrap break-words">
                  {`> [${number}] ${item.name}${leader(item.name)}${formatPrice(item.price)} ₽ `}
                  <span className="text-muted">{`(was ${formatPrice(item.oldPrice)} ₽)`}</span>
                  {item.popular ? (
                    <span style={{ color: "var(--accent-gold)" }}> {"<- RECOMMENDED"}</span>
                  ) : null}
                </span>

                <span className="mt-2 block space-y-0.5">
                  {item.features.map((feature) => (
                    <span key={feature} className="block text-muted">
                      {`>     - ${feature}`}
                    </span>
                  ))}

                  {item.timer ? (
                    <span className="block" style={{ color: "var(--accent-gold)" }}>
                      {">     - TIMER: "}
                      <span className="tnum" suppressHydrationWarning>
                        {countdown.text}
                      </span>
                    </span>
                  ) : null}

                  {item.spots ? (
                    <span className="block" style={{ color: "var(--accent-gold)" }}>
                      <span suppressHydrationWarning>{`>     - МЕСТ ОСТАЛОСЬ: ${spots ?? 4}`}</span>
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>

        {/* Command input */}
        <div className="mt-7 border-t border-line pt-6">
          <label htmlFor={`${uid}-cmd`} className="block text-muted">
            {"> Введите 1, 2 или 3 либо нажмите на строку выше"}
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-line bg-bg px-4 py-3">
            <span style={{ color: "var(--accent-matrix)" }}>{"$"}</span>
            <input
              id={`${uid}-cmd`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={command}
              onChange={(event) => handleCommand(event.target.value)}
              placeholder="_"
              className="w-full bg-transparent text-ink placeholder:text-muted focus:outline-none"
            />
          </div>

          <label htmlFor={`${uid}-email`} className="mt-6 block text-muted">
            {"> Куда отправить расшифровку"}
          </label>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-line bg-bg px-4 py-3">
            <span style={{ color: "var(--accent-matrix)" }}>{"$"}</span>
            <input
              id={`${uid}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent text-ink placeholder:text-muted focus:outline-none"
            />
          </div>

          {error ? (
            <p role="alert" className="mt-3 text-sm text-accent2">
              {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={handlePay}
            disabled={pending}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border-2 px-6 py-4 font-semibold transition-colors disabled:opacity-70"
            style={{
              borderColor: "var(--accent-matrix)",
              background: "rgba(0,255,65,0.12)",
              color: "var(--accent-matrix)",
            }}
          >
            {pending ? <Loader2 className="size-5 animate-spin" aria-hidden="true" /> : null}
            {`> EXECUTE — ${plan.name} · ${formatPrice(plan.price)} ₽`}
          </button>

          <p className="mt-4 text-xs leading-relaxed text-muted">
            {"> Оплата через ЮKassa. На странице оплаты доступны все подключённые способы."}
          </p>
        </div>
      </div>
    </div>
  );
}
