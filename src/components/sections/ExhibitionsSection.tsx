"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BoothScene = dynamic(
  () => import("@/components/exhibitions/BoothScene").then((m) => m.BoothScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[340px] items-center justify-center rounded-2xl bg-white/5 sm:h-[400px]">
        <span className="text-sm text-white/50">Loading booth preview…</span>
      </div>
    ),
  }
);

const formats = [
  {
    title: "Custom Stalls",
    body: "Bespoke environments built around brand story, visitor flow and premium show-floor presence.",
  },
  {
    title: "Mezzanine / High-Rise",
    body: "Double-level presence for status, zoning and visual gravity on crowded expo aisles.",
  },
  {
    title: "Octonorm Solutions",
    body: "Modular shell schemes elevated with sharper branding, finish and client-ready presentation.",
  },
  {
    title: "Low-Rise Formats",
    body: "Clean, efficient builds for practical budgets with strong identity and easy engagement.",
  },
];

const industries = [
  "Technology & SaaS",
  "Pharma & Healthcare",
  "Automotive & Engineering",
  "Construction & Materials",
  "Education & Institutions",
  "Consumer & Lifestyle",
];

const expoCases = [
  {
    title: "360sqm Flagship Stall",
    body: "Double-level custom stall in Delhi — concept, 3D design, fabrication, LED wall and mezzanine hospitality in 18 days.",
  },
  {
    title: "9sqm Octonorm Transformed",
    body: "Shell scheme reworked with vinyl graphics, branded counters and lighting — same budget, completely different impact.",
  },
  {
    title: "6-Show Annual Contract",
    body: "Consistent brand standard across six trade shows and cities — different footprints, one production partner.",
  },
];

export function ExhibitionsSection() {
  const [show3d, setShow3d] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShow3d(!reduce);
  }, []);

  return (
    <section id="exhibitions" className="bp-section relative overflow-hidden bg-[#121714] py-20 text-white md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(34,168,90,0.15),transparent_50%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-mint-bright">
              <span className="inline-block h-px w-6 bg-mint-bright" />
              Exhibitions
            </p>
            <h2 className="font-display mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem]">
              Where your brand becomes a world
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">
              Premium stall design and fabrication, AV, branding, octonorm transformation and
              mezzanine execution — spaces that make brands impossible to walk past.
            </p>
            <a href="#brief" className="bp-btn bp-btn-mint mt-8">
              Request a 3D concept
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            {show3d ? (
              <div className="overflow-hidden rounded-2xl border border-white/10">
                <BoothScene />
              </div>
            ) : (
              <div className="flex h-[340px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 sm:h-[400px]">
                <p className="max-w-xs text-center text-sm text-white/50">
                  Interactive 3D booth preview available when motion is enabled.
                </p>
              </div>
            )}
            <p className="mt-3 text-center text-xs text-white/40">Drag to orbit · auto-rotating preview</p>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {formats.map((f, i) => (
            <motion.article
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="font-display text-base font-bold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{f.body}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">Industries</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {industries.map((ind) => (
              <span
                key={ind}
                className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/70"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {expoCases.map((c) => (
            <article key={c.title} className="rounded-2xl bg-white p-6 text-charcoal">
              <h3 className="font-display text-lg font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
