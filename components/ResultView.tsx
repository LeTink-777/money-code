"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Lock } from "lucide-react";
import { MatrixRain } from "@/components/MatrixRain";
import { TerminalPricing } from "@/components/TerminalPricing";
import { LOCKED_SECTIONS, PROFILES, moneyCode } from "@/lib/numerology";
import { readLead } from "@/lib/lead";

export function ResultView() {
  const [code, setCode] = useState<number | null>(null);
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const lead = readLead();
    if (lead) {
      const parsed = lead.birthday ? moneyCode(lead.birthday) : Number(lead.code) || null;
      setCode(parsed);
      setBirthday(lead.birthday ?? "");
      setEmail(lead.email ?? "");
    }
    setReady(true);
  }, []);

  const profile = code ? PROFILES[code] : null;

  return (
    <>
      <MatrixRain />

      <main className="relative z-10 flex-1">
        <div className="mx-auto w-full max-w-3xl px-5 py-14">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {"> На главную"}
          </Link>

          {ready && !profile ? (
            <div className="mt-10 rounded-lg border border-accent2/50 bg-card p-6">
              <p className="text-ink">{"> ERROR: дата рождения не найдена"}</p>
              <Link href="/" className="mt-4 inline-block text-sm text-accent underline">
                {"> Вернуться и запустить расчёт"}
              </Link>
            </div>
          ) : null}

          <p className="mt-9 text-sm text-muted">{"> CALCULATION COMPLETE"}</p>

          {/* Code */}
          <section className="mt-6 rounded-xl border border-line bg-card p-7 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted">Ваш денежный код</p>
                <motion.p
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="tnum mt-3 font-display text-[5.5rem] leading-none text-accent"
                  style={{ textShadow: "0 0 34px rgba(0,255,65,0.55)" }}
                >
                  {profile ? profile.code : "-"}
                </motion.p>
              </div>

              <div className="text-right">
                <p className="font-display text-2xl tracking-wide text-accent2">
                  {profile ? profile.name : "UNKNOWN"}
                </p>
                {birthday ? (
                  <p className="tnum mt-2 text-sm text-muted">
                    {birthday.split("-").reverse().join(".")}
                  </p>
                ) : null}
              </div>
            </div>

            {profile ? (
              <>
                <p className="mt-8 leading-relaxed text-ink">{profile.brief}</p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {profile.strengths.map((strength) => (
                    <span
                      key={strength}
                      className="rounded-lg border border-line px-3 py-1.5 text-xs text-muted"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </>
            ) : null}
          </section>

          {/* Locked */}
          <section className="mt-14">
            <h2 className="flex items-center gap-3 font-display text-xl text-ink sm:text-2xl">
              <Lock className="size-5 text-accent2" aria-hidden="true" />
              {"> ACCESS DENIED — 5 РАЗДЕЛОВ"}
            </h2>

            <div className="mt-6 space-y-3">
              {LOCKED_SECTIONS.map((section, index) => (
                <div key={section.id} className="rounded-lg border border-line bg-card px-5 py-4">
                  <p className="flex flex-wrap items-baseline gap-x-3">
                    <span className="tnum text-sm text-accent">{`[${index + 1}]`}</span>
                    <span className="text-ink">{section.title}</span>
                  </p>
                  <p className="mt-1 text-sm text-muted">— {section.hint}</p>
                  <p className="mt-2.5 select-none text-xs text-muted blur-[4px]" aria-hidden="true">
                    {`> данные раздела для кода ${profile ? profile.code : "N"} зашифрованы`}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section className="mt-16">
            <h2 className="font-display text-xl leading-tight text-ink sm:text-2xl">
              {"> SELECT ACCESS LEVEL"}
            </h2>

            <div className="mt-8">
              <TerminalPricing
                defaultEmail={email}
                context={`Денежный код ${profile ? profile.code : "?"}, дата ${birthday}`}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
