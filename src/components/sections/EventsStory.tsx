"use client";

import { motion } from "framer-motion";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

const stats = [
  { value: "14+", label: "Years of excellence" },
  { value: "500+", label: "Events produced" },
  { value: "200+", label: "Brand partners" },
  { value: "50+", label: "Cities pan-India" },
];

const steps = [
  {
    n: "01",
    title: "Share your brief",
    body: "Event type, scale, city, date and services — reviewed the same day. No waiting, no auto-replies.",
  },
  {
    n: "02",
    title: "Concept & quote",
    body: "Within 48 hours: mood board, floor plan, stage layout and a clear itemised production quote.",
  },
  {
    n: "03",
    title: "Build & install",
    body: "Fabrication, transport and on-site install — stage, AV, truss, lights, power — coordinated to the hour.",
  },
  {
    n: "04",
    title: "Show time",
    body: "On-ground from rehearsal to breakdown. You focus on guests. We handle everything behind the curtain.",
  },
];

export function EventsStory() {
  return (
    <section id="events" className="bp-section relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <motion.div {...fade}>
            <p className="bp-eyebrow">Our story</p>
            <h2 className="font-display mt-4 text-3xl font-bold text-charcoal sm:text-4xl md:text-[2.75rem]">
              Events that define brands
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              Brand Professor sits at the intersection of production precision and creative ambition.
              Every brief becomes a carefully engineered brand narrative — planned, built and
              delivered end-to-end across India.
            </p>
          </motion.div>
          <motion.p
            {...fade}
            className="max-w-md text-sm leading-relaxed text-muted lg:justify-self-end lg:text-right"
          >
            From the first briefing to the final curtain call, one production partner for stage, AV,
            lighting, power, structures and full venue branding.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="bg-white px-6 py-8"
            >
              <div className="font-display text-3xl font-bold text-charcoal md:text-4xl">{s.value}</div>
              <div className="mt-2 text-sm text-muted">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EventsProcess() {
  return (
    <section id="process" className="bp-section relative border-y border-line bg-mint-wash/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fade} className="max-w-2xl">
          <p className="bp-eyebrow">The process</p>
          <h2 className="font-display mt-4 text-3xl font-bold text-charcoal sm:text-4xl">
            How we work with you
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, i) => (
            <motion.article
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="relative rounded-2xl border border-line bg-white p-6"
            >
              <span className="font-display text-sm font-semibold tracking-[0.2em] text-mint-deep">
                {step.n}
              </span>
              <h3 className="font-display mt-4 text-xl font-bold text-charcoal">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
