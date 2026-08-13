"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    id: "stage",
    title: "Stage Production",
    body: "Custom stage design and fabrication — from boardroom setups to 5,000-capacity arena stages. Structure, fascia, flooring, steps and show-ready finishing.",
  },
  {
    id: "av",
    title: "Audio Visuals",
    body: "LED walls, projection, professional sound, mixing consoles and monitors — engineered for the front row and the back of the hall.",
  },
  {
    id: "truss",
    title: "Truss & Lights",
    body: "Box truss, triangle truss, moving heads, LED pars and intelligent rigs that transform any venue into a premium atmosphere.",
  },
  {
    id: "furniture",
    title: "Furniture & Ambience",
    body: "Lounge seating, cocktail tables, banquet chairs, draping and themed décor — dressed to match the brand story.",
  },
  {
    id: "power",
    title: "Power Support",
    body: "Generator-backed distribution, cable management and dedicated lines for AV, lighting and kitchen loads.",
  },
  {
    id: "structures",
    title: "Structures & Pagodas",
    body: "Temporary structures, pagoda tents, tensile canopies, entry arches and space frames for outdoor activations.",
  },
  {
    id: "print",
    title: "Printing & Branding",
    body: "Large-format flex, vinyl wraps, backdrops, standees and full-venue signage — identity unmissable from arrival to exit.",
  },
];

export function ServicesConstellation() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active) ?? services[0];
  const index = services.findIndex((s) => s.id === active) + 1;

  return (
    <section id="services" className="bp-section relative overflow-hidden py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="bp-eyebrow">Capabilities</p>
          <h2 className="font-display mt-4 text-3xl font-bold text-charcoal sm:text-4xl md:text-[2.75rem]">
            Full-spectrum production services
          </h2>
          <p className="mt-4 text-muted">
            One vendor. Everything in. Select a service to see how we deliver.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <div className="flex flex-col border-t border-line">
            {services.map((service) => {
              const isActive = active === service.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setActive(service.id)}
                  onMouseEnter={() => setActive(service.id)}
                  className={`flex items-center justify-between border-b border-line px-1 py-4 text-left transition ${
                    isActive ? "bg-mint-wash/50" : "hover:bg-mint-wash/30"
                  }`}
                >
                  <span
                    className={`font-display text-base font-semibold sm:text-lg ${
                      isActive ? "text-charcoal" : "text-ink/70"
                    }`}
                  >
                    {service.title}
                  </span>
                  <span className={`text-xs tracking-widest ${isActive ? "text-mint-deep" : "text-muted/50"}`}>
                    {isActive ? "View" : ""}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-between rounded-3xl border border-line bg-charcoal p-8 text-white md:p-10"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mint-bright">
                  Service {String(index).padStart(2, "0")}
                </p>
                <h3 className="font-display mt-4 text-2xl font-bold md:text-3xl">{current.title}</h3>
                <p className="mt-5 max-w-md text-base leading-relaxed text-white/70">{current.body}</p>
              </div>
              <a href="#brief" className="bp-btn bp-btn-mint mt-10 self-start">
                Include in brief
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
