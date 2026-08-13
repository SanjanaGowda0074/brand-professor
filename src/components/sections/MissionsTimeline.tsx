"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { assetPath } from "@/lib/assets";

const missions = [
  {
    code: "MX-01",
    title: "Triple-city launch night",
    meta: "Automotive · 36 hrs · 3 crews",
    body: "Identical 90m² stage + LED + lighting packs executed the same night in Mumbai, Delhi and Bangalore from one brief.",
    result: "1,200+ attendees · zero design drift",
    image: assetPath("/images/product-launch.jpg"),
  },
  {
    code: "MX-02",
    title: "800-delegate command centre",
    meta: "Conglomerate · 3 days · 40ft stage",
    body: "Main stage, six breakout zones, branded ambience and generator-backed power — uninterrupted through closing keynote.",
    result: "0 technical failures",
    image: assetPath("/images/conference.jpg"),
  },
  {
    code: "MX-03",
    title: "360sqm expo flagship",
    meta: "Industrial · Delhi · 18 days",
    body: "Double-level custom stall with LED wall, mezzanine hospitality and full fabrication under a compressed timeline.",
    result: "Show-floor landmark presence",
    image: assetPath("/images/expo-booth.jpg"),
  },
  {
    code: "MX-04",
    title: "9sqm shell rewritten",
    meta: "D2C · Bangalore lifestyle expo",
    body: "Standard octonorm upgraded with vinyl architecture, branded counters and lighting — same budget, different gravity.",
    result: "Footfall spike on aisle",
    image: assetPath("/images/stall-build.jpg"),
  },
];

const partners = [
  "Tata",
  "Reliance",
  "Infosys",
  "HDFC",
  "Mahindra",
  "Wipro",
  "Asian Paints",
  "HCL",
  "Godrej",
  "ITC",
  "L&T",
  "Hero",
];

export function MissionsTimeline() {
  return (
    <section id="missions" className="bp-section bg-charcoal py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-mint-bright">
            Mission log
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold sm:text-5xl">
            Proof from the field — not a brochure grid
          </h2>
        </div>

        <div className="mt-12 space-y-8">
          {missions.map((m, i) => (
            <motion.article
              key={m.code}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              className={`grid items-center gap-5 overflow-hidden rounded-2xl border border-line bg-sand md:grid-cols-2 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative min-h-[220px] md:min-h-[280px]">
                <Image src={m.image} alt={m.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-charcoal/60 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-mint-bright backdrop-blur">
                  {m.code}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-sm text-muted">{m.meta}</p>
                <h3 className="font-display mt-2 text-2xl font-bold text-charcoal">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/90">{m.body}</p>
                <p className="mt-4 text-sm font-semibold text-mint-deep">{m.result}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-center text-[11px] uppercase tracking-[0.28em] text-white/40">
            Brands that trust the machine
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {partners.map((p) => (
              <span key={p} className="font-display text-sm font-semibold text-white/35">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
