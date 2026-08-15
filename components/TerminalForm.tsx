"use client";

import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { moneyCode } from "@/lib/numerology";
import { saveLead } from "@/lib/lead";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HEADLINE = "> Calculating your money code...";

export function TerminalForm() {
  const router = useRouter();
  const uid = useId();
  const [typed, setTyped] = useState(0);
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (typed >= HEADLINE.length) return;
    const id = window.setTimeout(() => setTyped((count) => count + 1), 55);
    return () => window.clearTimeout(id);
  }, [typed]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const code = moneyCode(birthday);
    if (!code) {
      setError("> ERROR: укажите корректную дату рождения");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("> ERROR: проверьте адрес электронной почты");
      return;
    }

    setError(null);
    setPending(true);
    saveLead({ birthday, email: email.trim().toLowerCase(), code: String(code) });
    router.push("/result");
  }

  return (
    <div className="rounded-xl border border-line bg-card p-6 sm:p-8">
      {/* Typing headline */}
      <p className="text-sm text-muted" aria-label={HEADLINE}>
        <span aria-hidden="true">{HEADLINE.slice(0, typed)}</span>
        <span className="caret" aria-hidden="true">
          &nbsp;
        </span>
      </p>

      <h1 className="mt-5 font-display text-2xl leading-tight text-ink sm:text-3xl">
        ДЕНЕЖНЫЙ КОД ПО ДАТЕ РОЖДЕНИЯ
      </h1>

      <form onSubmit={handleSubmit} noValidate className="mt-8">
        <div className="space-y-5">
          <div>
            <label htmlFor={`${uid}-birthday`} className="mb-2 block text-sm text-muted">
              {"> "}Дата рождения
            </label>
            <input
              id={`${uid}-birthday`}
              type="date"
              value={birthday}
              min="1920-01-01"
              max="2020-12-31"
              onChange={(event) => setBirthday(event.target.value)}
              className="w-full rounded-lg border border-line bg-bg px-4 py-3 text-ink transition-colors focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor={`${uid}-email`} className="mb-2 block text-sm text-muted">
              {"> "}Email
            </label>
            <input
              id={`${uid}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        {error ? (
          <p role="alert" className="mt-4 text-sm text-accent2">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg border-2 px-6 py-4 font-semibold transition-colors disabled:opacity-70"
          style={{
            borderColor: "var(--accent-matrix)",
            background: "rgba(0,255,65,0.1)",
            color: "var(--accent-matrix)",
          }}
        >
          {pending ? <Loader2 className="size-5 animate-spin" aria-hidden="true" /> : null}
          {"> Запустить расчёт"}
        </button>

        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
          <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          Расчёт выполняется в браузере. Почта нужна только для доставки
          расшифровки.
        </p>
      </form>
    </div>
  );
}
