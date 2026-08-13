"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";

const HeroScene = dynamic(
  () => import("@/components/hero/HeroScene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(52,211,153,0.32),transparent_55%)]" />
    ),
  }
);

export function Hero() {
  const [mode, setMode] = useState<"off" | "compact" | "full">("off");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setMode("off");
      return;
    }
    const narrow = window.matchMedia("(max-width: 640px)").matches;
    setMode(narrow ? "compact" : "full");

    const onResize = () => {
      const n = window.matchMedia("(max-width: 640px)").matches;
      setMode(n ? "compact" : "full");
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden bg-charcoal text-white">
      <div className="absolute inset-0">
        {mode !== "off" ? (
          <HeroScene compact={mode === "compact"} />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(ellipse_at_60%_40%,rgba(52,211,153,0.32),transparent_55%)]" />
        )}
      </div>
      {/* Lighter overlay so richer 3D background stays visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/45 to-transparent md:from-charcoal/82 md:via-charcoal/28" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-charcoal/30" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-end px-4 pb-14 pt-24 sm:px-6 sm:pb-16 md:px-8 md:pb-20 md:pt-28">
        <div className="mb-6 flex max-w-full flex-wrap items-center gap-2 sm:mb-8 sm:gap-3">
          <Logo size="lg" className="h-12 w-auto max-w-[220px] sm:h-14 sm:max-w-[280px] md:h-16 md:max-w-[320px]" priority />
          <span className="rounded-sm bg-mint px-2 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-charcoal sm:text-[10px]">
            Next-gen build
          </span>
        </div>

        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-mint-bright sm:text-sm sm:tracking-[0.28em]">
          Brand Professor · Production Lab
        </p>

        <h1 className="font-display mt-3 max-w-4xl text-[2rem] font-bold leading-[1.05] sm:mt-4 sm:text-5xl md:text-6xl lg:text-[4.6rem]">
          The operating system
          <span className="block text-mint-bright">for brand moments.</span>
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:mt-6 sm:text-base md:text-lg">
          A futuristic interface for India&apos;s events & exhibitions production house — one system
          for stage worlds, expo floors, crews and show-day precision.
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
          <a href="#lab" className="bp-btn bp-btn-primary !rounded-md !px-4 !py-3 text-sm">
            Enter the Lab
          </a>
          <a
            href="#planner"
            className="bp-btn !rounded-md !px-4 !py-3 border border-white/25 bg-white/5 text-sm text-white hover:bg-white/10"
          >
            Plan a mission
          </a>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/15 pt-5 sm:mt-12 sm:grid-cols-4 sm:gap-6 sm:pt-6">
          {[
            ["14+", "Years in production"],
            ["500+", "Shows delivered"],
            ["50+", "City network"],
            ["1", "Crew. One invoice."],
          ].map(([k, v]) => (
            <div key={v}>
              <div className="font-display text-xl font-bold text-white sm:text-3xl">{k}</div>
              <div className="mt-1 text-[11px] text-white/50 sm:text-xs">{v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
