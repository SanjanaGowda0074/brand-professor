"use client";

import { motion } from "framer-motion";

const cases = [
  {
    title: "Multi-City Product Launch",
    headline: "3 cities. 1 brief. Identical stages — same night.",
    body: "A major automotive brand needed matching 90m² stage builds, LED walls and lighting rigs across Mumbai, Delhi and Bangalore. Three independent crews. Pre-fabricated elements. Technical rehearsals from a single brief in 36 hours.",
    metrics: [
      { k: "3", v: "Cities" },
      { k: "36 hrs", v: "Brief to stage" },
      { k: "1,200+", v: "Attendees" },
    ],
  },
  {
    title: "Annual Leadership Conference",
    headline: "800 delegates. 3 days. 40ft stage. Zero failures.",
    body: "Flagship conference with LED fascia, AV for 800, branded ambience across 6 breakout spaces, generator-backed power, and on-ground production for three days — without a single technical interruption.",
    metrics: [
      { k: "800", v: "Delegates" },
      { k: "3 days", v: "On-ground" },
      { k: "0", v: "Failures" },
    ],
  },
];

const brands = [
  "Tata Group",
  "Reliance",
  "Infosys",
  "HDFC Bank",
  "Mahindra",
  "Wipro",
  "Asian Paints",
  "HCL Tech",
  "Godrej",
  "ITC Limited",
  "L&T",
  "Hero MotoCorp",
];

const reasons = [
  {
    title: "One vendor. Everything in.",
    body: "Stage, AV, truss, lights, power, furniture, structures, branding — one team, one invoice, zero coordination gaps.",
  },
  {
    title: "14 years. 0 show failures.",
    body: "Since 2012, 500+ events without a show-stopping failure — engineering, planning and on-ground discipline.",
  },
  {
    title: "50+ cities. Same standard.",
    body: "The same production quality in Lucknow, Jaipur or Kochi as Bangalore. Same crew discipline everywhere.",
  },
  {
    title: "Brief to quote in 48 hours.",
    body: "Detailed, itemised production quote with concept by next morning. No chasing. No vague estimates.",
  },
];

export function WorkSection() {
  return (
    <section id="work" className="bp-section relative border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="bp-eyebrow">Selected work</p>
          <h2 className="font-display mt-4 text-3xl font-bold text-charcoal sm:text-4xl">
            Production stories that speak
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {cases.map((c, i) => (
            <motion.article
              key={c.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-white"
            >
              <div className="border-b border-line px-7 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mint-deep">
                  {c.title}
                </p>
                <h3 className="font-display mt-2 text-xl font-bold text-charcoal md:text-2xl">
                  {c.headline}
                </h3>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <p className="text-sm leading-relaxed text-muted md:text-[0.95rem]">{c.body}</p>
                <div className="mt-auto grid grid-cols-3 gap-3 border-t border-line pt-6 mt-8">
                  {c.metrics.map((m) => (
                    <div key={m.v}>
                      <div className="font-display text-lg font-bold text-charcoal md:text-xl">{m.k}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-wide text-muted">{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 border-y border-line py-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-muted">
            Trusted by leading brands
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {brands.map((b) => (
              <span key={b} className="font-display text-sm font-semibold tracking-wide text-ink/35">
                {b}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-line p-6"
            >
              <h3 className="font-display text-base font-bold text-charcoal">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
