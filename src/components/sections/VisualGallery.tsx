"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { assetPath } from "@/lib/assets";

const shots = [
  { src: assetPath("/images/stage-led.jpg"), label: "LED stage builds", tag: "Events" },
  { src: assetPath("/images/conference.jpg"), label: "Leadership conferences", tag: "Corporate" },
  { src: assetPath("/images/crowd-event.jpg"), label: "High-energy launches", tag: "Activations" },
  { src: assetPath("/images/expo-booth.jpg"), label: "Expo floor presence", tag: "Exhibitions" },
  { src: assetPath("/images/stall-build.jpg"), label: "Stall fabrication", tag: "Build" },
  { src: assetPath("/images/trade-show.jpg"), label: "Trade-show systems", tag: "Shows" },
  { src: assetPath("/images/product-launch.jpg"), label: "Reveal moments", tag: "Launch" },
  { src: assetPath("/images/lights-rig.jpg"), label: "Truss & lighting", tag: "Rigging" },
];

export function VisualGallery() {
  return (
    <section id="gallery" className="bp-section border-y border-line bg-sand py-16 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-mint-deep">
              Field visuals
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold text-charcoal sm:text-4xl">
              Real production atmosphere
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted">
            Stages, stalls, crowds and rigging — the visual language of Brand Professor execution.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {shots.map((shot, i) => (
            <motion.article
              key={shot.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`group relative overflow-hidden rounded-xl border border-line ${
                i === 0 || i === 5 ? "sm:col-span-2 sm:row-span-2 min-h-[280px]" : "min-h-[180px]"
              }`}
            >
              <Image
                src={shot.src}
                alt={shot.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1612] via-[#0c1612]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="rounded bg-mint px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-charcoal">
                  {shot.tag}
                </span>
                <p className="mt-2 font-display text-base font-semibold text-white">{shot.label}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
