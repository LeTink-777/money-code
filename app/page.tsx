import { MatrixRain } from "@/components/MatrixRain";
import { TerminalForm } from "@/components/TerminalForm";
import { Faq } from "@/components/Faq";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/lib/site";
import { LOCKED_SECTIONS, PROFILES } from "@/lib/numerology";

const CODES = Object.values(PROFILES);

export default function HomePage() {
  return (
    <>
      <MatrixRain />

      <main className="relative z-10 flex-1">
        <section className="mx-auto grid w-full max-w-6xl gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1fr_1fr] lg:items-start lg:pt-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-lg border border-line bg-card px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent2">
              numerology · v2.0
            </p>

            <p className="mt-7 text-lg leading-relaxed text-muted">
              {"> "}Денежный код — это одна цифра, которая получается из суммы
              всех цифр вашей даты рождения. В нумерологии она описывает не размер
              дохода, а способ, которым деньги приходят именно к вам.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-muted">
              {"> "}Расчёт бесплатный: вы сразу увидите свой код и краткую
              трактовку. Полная расшифровка раскрывает блоки, стратегии и прогноз.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-2 sm:grid-cols-5">
              {CODES.map((profile) => (
                <div
                  key={profile.code}
                  className="rounded-lg border border-line bg-card px-3 py-4 text-center"
                >
                  <p className="tnum font-display text-2xl text-accent">{profile.code}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-muted">
                    {profile.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <TerminalForm />
          </div>
        </section>

        <section className="border-t border-line bg-card/60">
          <div className="mx-auto w-full max-w-6xl px-5 py-20">
            <h2 className="max-w-2xl font-display text-2xl leading-tight text-ink sm:text-3xl">
              {"> "}ЧТО ВХОДИТ В ПОЛНУЮ РАСШИФРОВКУ
            </h2>

            <div className="mt-10 space-y-3">
              {LOCKED_SECTIONS.map((section, index) => (
                <div
                  key={section.id}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-lg border border-line bg-card px-5 py-4"
                >
                  <span className="tnum text-sm text-accent">{`[${index + 1}]`}</span>
                  <span className="text-ink">{section.title}</span>
                  <span className="w-full text-sm text-muted sm:w-auto">— {section.hint}</span>
                </div>
              ))}
            </div>

            <p className="mt-14 text-center text-xs text-muted">
              {SITE.owner.fullName}. ИНН {SITE.owner.inn}. {SITE.owner.status}.
            </p>
          </div>
        </section>
        <Faq />
      </main>
      <SiteFooter />
    </>
  );
}
