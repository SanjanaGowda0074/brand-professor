"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

const links = [
  { href: "#lab", label: "Lab" },
  { href: "#systems", label: "Systems" },
  { href: "#missions", label: "Missions" },
  { href: "#planner", label: "Planner" },
  { href: "#brief", label: "Brief AI" },
  { href: "#dispatch", label: "Dispatch" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Hero is dark blue; after scroll / menu open use white bar
  const onDark = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-white/95 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
        <a href="#top" className="relative z-20 min-w-0 shrink" aria-label="Brand Professor home">
          <Logo
            size="md"
            className="h-10 w-auto max-w-[200px] object-contain transition sm:h-11 sm:max-w-[240px] md:h-12 md:max-w-[280px]"
            priority
          />
        </a>

        <nav className="hidden items-center gap-7 xl:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap text-[15px] font-semibold tracking-wide transition ${
                onDark ? "text-white/90 hover:text-white" : "text-charcoal/80 hover:text-charcoal"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="relative z-20 flex shrink-0 items-center gap-2">
          <a
            href="#dispatch"
            className={`hidden rounded-md px-3.5 py-2 text-[13px] font-semibold transition lg:inline-flex ${
              onDark
                ? "bg-white text-charcoal hover:bg-mint-wash"
                : "bg-charcoal text-white hover:bg-mint-deep"
            }`}
          >
            Open Dispatch
          </a>

          <button
            type="button"
            className={`flex h-9 w-9 items-center justify-center rounded-md border transition xl:hidden ${
              onDark ? "border-white/30 bg-white/10" : "border-line bg-white"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <div className="flex w-3.5 flex-col gap-1">
              <span
                className={`h-0.5 w-full transition ${onDark ? "bg-white" : "bg-charcoal"} ${
                  open ? "translate-y-[6px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full transition ${onDark ? "bg-white" : "bg-charcoal"} ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-full transition ${onDark ? "bg-white" : "bg-charcoal"} ${
                  open ? "-translate-y-[6px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-line bg-white xl:hidden"
          >
            <div className="mx-auto flex max-w-[1400px] flex-col px-4 py-3 sm:px-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-[15px] font-semibold text-charcoal hover:bg-mint-wash"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#dispatch"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-md bg-charcoal px-3 py-3 text-center text-[15px] font-semibold text-white lg:hidden"
              >
                Open Dispatch
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
