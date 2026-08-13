"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";

const BoothScene = dynamic(
  () => import("@/components/exhibitions/BoothScene").then((m) => m.BoothScene),
  { ssr: false, loading: () => <div className="flex h-[320px] items-center justify-center text-sm text-muted sm:h-[420px]">Loading 3D…</div> }
);

const EventScene = dynamic(
  () => import("@/components/hero/EventScene").then((m) => m.EventScene),
  { ssr: false, loading: () => <div className="flex h-[320px] items-center justify-center text-sm text-muted sm:h-[420px]">Loading 3D…</div> }
);

type Mode = "events" | "exhibitions";

const content: Record<
  Mode,
  {
    kicker: string;
    title: string;
    body: string;
    points: string[];
    cta: string;
  }
> = {
  events: {
    kicker: "Events Lab",
    title: "Rooms that perform under pressure",
    body: "Product launches, leadership conferences, awards nights and brand activations — engineered as complete production systems, not assembled vendor stacks.",
    points: [
      "Stage + LED + audio as one rig",
      "Truss, lights and power coordinated to the hour",
      "Furniture & ambience matched to brand narrative",
      "On-ground crew from load-in to wrap",
    ],
    cta: "Build an event brief",
  },
  exhibitions: {
    kicker: "Exhibition Lab",
    title: "Booths that stop aisle traffic",
    body: "Custom stalls, mezzanines, octonorm upgrades and branded show-floor architecture — designed for presence, flow and commercial conversion.",
    points: [
      "Concept to fabrication in disciplined timelines",
      "Fascia, vinyl, fabric and hospitality detailing",
      "AV integrated into stall architecture",
      "Consistent brand standard across multi-city shows",
    ],
    cta: "Build a stall brief",
  },
};

export function DualLab() {
  const [mode, setMode] = useState<Mode>("events");
  const active = content[mode];

  return (
    <section id="lab" className="bp-section bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-mint-deep">
              Dual production labs
            </p>
            <h2 className="font-display mt-3 text-2xl font-bold text-charcoal sm:text-4xl md:text-5xl">
              One brand. Two immersive build modes.
            </h2>
          </div>

          <div className="inline-flex w-full rounded-md border border-line bg-sand p-1 sm:w-auto">
            {(["events", "exhibitions"] as Mode[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`flex-1 rounded px-3 py-2.5 text-sm font-semibold capitalize transition sm:flex-none sm:px-4 ${
                  mode === m ? "bg-charcoal text-white" : "text-muted hover:text-charcoal"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <AnimatePresence mode="wait">
            <motion.div
              key={mode + "-copy"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="rounded-2xl border border-line bg-sand p-7 md:p-10"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-mint-deep">
                {active.kicker}
              </p>
              <h3 className="font-display mt-3 text-2xl font-bold text-charcoal md:text-4xl">
                {active.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{active.body}</p>
              <ul className="mt-8 space-y-3">
                {active.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-ink">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                    {p}
                  </li>
                ))}
              </ul>
              <a href="#brief" className="bp-btn bp-btn-primary mt-8 !rounded-md">
                {active.cta}
              </a>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={mode + "-viz"}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden rounded-2xl border border-line bg-charcoal"
            >
              {mode === "exhibitions" ? <BoothScene /> : <EventScene />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
