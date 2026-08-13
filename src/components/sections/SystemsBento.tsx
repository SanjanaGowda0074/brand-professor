"use client";

import { motion } from "framer-motion";

const systems = [
  {
    id: "01",
    title: "Stage architecture",
    body: "From intimate boardrooms to arena-scale builds — structure, fascia, flooring and show-ready finish as one unit.",
    span: "lg:col-span-2",
  },
  {
    id: "02",
    title: "AV intelligence",
    body: "LED walls, projection, consoles and monitors tuned for clarity from front row to last seat.",
    span: "",
  },
  {
    id: "03",
    title: "Light & truss",
    body: "Rigging systems and intelligent fixtures that transform venue atmosphere in hours, not days.",
    span: "",
  },
  {
    id: "04",
    title: "Power spine",
    body: "Generator-backed distribution so AV, kitchen and lighting never compete for current.",
    span: "",
  },
  {
    id: "05",
    title: "Expo fabrication",
    body: "Custom, mezzanine, high-rise and octonorm environments with visitor-flow thinking baked in.",
    span: "lg:col-span-2",
  },
  {
    id: "06",
    title: "Brand surfaces",
    body: "Flex, vinyl, fabric, wayfinding and full-venue identity — consistent from arrival to exit.",
    span: "",
  },
];

const flow = [
  { t: "Intake", d: "Same-day brief review" },
  { t: "Design", d: "Concept in 48 hours" },
  { t: "Build", d: "Fabricate & install" },
  { t: "Live", d: "Show-day command" },
];

export function SystemsBento() {
  return (
    <section id="systems" className="bp-section border-t border-line bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-mint-deep">
              Production systems
            </p>
            <h2 className="font-display mt-3 text-3xl font-bold text-charcoal sm:text-5xl">
              Capabilities as a stacked machine
            </h2>
            <p className="mt-4 text-muted">
              Not a catalogue of rentals — a coordinated production layer. Pick modules; we run the
              whole show.
            </p>

            <div className="mt-10 space-y-0 border-t border-line">
              {flow.map((f, i) => (
                <div key={f.t} className="flex items-center gap-4 border-b border-line py-4">
                  <span className="font-display text-sm font-bold text-mint-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div className="font-display font-semibold text-charcoal">{f.t}</div>
                    <div className="text-sm text-muted">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {systems.map((s, i) => (
              <motion.article
                key={s.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`group rounded-2xl border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-mint/40 ${s.span}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold tracking-[0.2em] text-muted">{s.id}</span>
                  <span className="h-2 w-2 rounded-full bg-mint opacity-0 transition group-hover:opacity-100" />
                </div>
                <h3 className="font-display mt-4 text-xl font-bold text-charcoal">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
