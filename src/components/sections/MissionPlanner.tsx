"use client";

import { useMemo, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  composeMissionDispatch,
  headcounts,
  leadTimes,
  modulesFor,
  openSideOptions,
  planMission,
  plannerCities,
  stallSizes,
  venues,
  type MissionMode,
} from "@/lib/missionPlanner";

export function MissionPlanner() {
  const [mode, setMode] = useState<MissionMode>("events");
  const [city, setCity] = useState("Bangalore");
  const [leadTime, setLeadTime] = useState("3–6 weeks");
  const [headcount, setHeadcount] = useState("100–300");
  const [venue, setVenue] = useState("Hotel ballroom");
  const [stallSqm, setStallSqm] = useState("18–36 sqm");
  const [openSides, setOpenSides] = useState("2 sides");
  const [modules, setModules] = useState<string[]>([]);
  const [ran, setRan] = useState(false);

  const available = modulesFor(mode);

  const plan = useMemo(() => {
    if (!ran) return null;
    return planMission({
      mode,
      city,
      leadTime,
      headcount,
      venue,
      stallSqm,
      openSides,
      modules,
    });
  }, [ran, mode, city, leadTime, headcount, venue, stallSqm, openSides, modules]);

  const toggleModule = (m: string) => {
    setModules((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]));
    setRan(false);
  };

  const run = () => setRan(true);

  const sendDispatch = () => {
    if (!plan) return;
    const payload = composeMissionDispatch(plan, {
      mode,
      city,
      leadTime,
      headcount,
      venue,
      stallSqm,
      openSides,
      modules,
    });
    sessionStorage.setItem("bp-brief", payload);
    window.location.hash = "dispatch";
    window.dispatchEvent(new CustomEvent("bp-brief-ready", { detail: payload }));
  };

  const whatsapp = () => {
    if (!plan) return;
    const text = encodeURIComponent(
      composeMissionDispatch(plan, {
        mode,
        city,
        leadTime,
        headcount,
        venue,
        stallSqm,
        openSides,
        modules,
      })
    );
    window.open(`https://wa.me/919901119191?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="planner" className="bp-section relative border-t border-line bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-mint-deep">
            Live Mission Planner
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-charcoal sm:text-5xl">
            Can we run your show?
          </h2>
          <p className="mt-4 text-muted">
            Scope the stack, calendar and budget band before WhatsApp — feasibility first, brochure
            later.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <div className="space-y-6">
            <div className="inline-flex w-full rounded-md border border-line bg-sand p-1 sm:w-auto">
              {(["events", "exhibitions"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMode(m);
                    setModules([]);
                    setRan(false);
                  }}
                  className={`flex-1 rounded px-4 py-2.5 text-sm font-semibold capitalize transition sm:flex-none ${
                    mode === m ? "bg-charcoal text-white" : "text-muted hover:text-charcoal"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <Field label="City">
              <ChipRow
                options={[...plannerCities]}
                value={city}
                onSelect={(v) => {
                  setCity(v);
                  setRan(false);
                }}
              />
            </Field>

            <Field label="Lead time">
              <ChipRow
                options={[...leadTimes]}
                value={leadTime}
                onSelect={(v) => {
                  setLeadTime(v);
                  setRan(false);
                }}
              />
            </Field>

            {mode === "events" ? (
              <>
                <Field label="Headcount">
                  <ChipRow
                    options={[...headcounts]}
                    value={headcount}
                    onSelect={(v) => {
                      setHeadcount(v);
                      setRan(false);
                    }}
                  />
                </Field>
                <Field label="Venue type">
                  <ChipRow
                    options={[...venues]}
                    value={venue}
                    onSelect={(v) => {
                      setVenue(v);
                      setRan(false);
                    }}
                  />
                </Field>
              </>
            ) : (
              <>
                <Field label="Stall size">
                  <ChipRow
                    options={[...stallSizes]}
                    value={stallSqm}
                    onSelect={(v) => {
                      setStallSqm(v);
                      setRan(false);
                    }}
                  />
                </Field>
                <Field label="Open sides">
                  <ChipRow
                    options={[...openSideOptions]}
                    value={openSides}
                    onSelect={(v) => {
                      setOpenSides(v);
                      setRan(false);
                    }}
                  />
                </Field>
              </>
            )}

            <Field label="Must-have modules">
              <div className="flex flex-wrap gap-2">
                {available.map((m) => {
                  const on = modules.includes(m);
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggleModule(m)}
                      className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                        on
                          ? "bg-mint text-charcoal"
                          : "bg-mint-wash text-ink hover:bg-mint/30"
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-muted">Leave empty to use a recommended default stack.</p>
            </Field>

            <button type="button" onClick={run} className="bp-btn bp-btn-primary !rounded-md">
              Run mission plan
            </button>
          </div>

          <div className="min-h-[320px] rounded-2xl border border-line bg-sand p-6 md:p-8">
            <AnimatePresence mode="wait">
              {!plan ? (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[280px] flex-col justify-center"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint-deep">
                    awaiting input
                  </p>
                  <p className="font-display mt-3 text-2xl font-bold text-charcoal">
                    Your production read-out appears here.
                  </p>
                  <p className="mt-3 max-w-md text-sm text-muted">
                    Stack, load-in timeline, indicative budget band, and risk flags — tuned for India
                    city logistics.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mint-deep">
                        Readiness
                      </p>
                      <p className="font-display mt-1 text-3xl font-bold text-charcoal">
                        {plan.readiness}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                        Budget band
                      </p>
                      <p className="font-display mt-1 text-2xl font-bold text-charcoal">
                        {plan.budget.label}
                      </p>
                      <p className="text-xs text-muted">Indicative · not a final quote</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      Recommended stack
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {plan.stack.map((s) => (
                        <li
                          key={s}
                          className="rounded-md border border-line bg-white px-3 py-1.5 text-sm font-medium text-charcoal"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      Timeline
                    </p>
                    <ol className="mt-3 space-y-0 border-t border-line">
                      {plan.timeline.map((t, i) => (
                        <li
                          key={t.phase}
                          className="flex items-center justify-between gap-4 border-b border-line py-3"
                        >
                          <span className="flex items-center gap-3 text-sm font-semibold text-charcoal">
                            <span className="font-display text-mint-deep">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {t.phase}
                          </span>
                          <span className="text-sm text-muted">{t.window}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
                      Risk flags
                    </p>
                    <ul className="mt-3 space-y-2">
                      {plan.risks.map((r) => (
                        <li key={r} className="flex gap-2 text-sm text-ink">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={sendDispatch}
                      className="bp-btn bp-btn-dark !rounded-md !px-4 !py-2.5 text-sm"
                    >
                      Send to Dispatch
                    </button>
                    <button
                      type="button"
                      onClick={whatsapp}
                      className="bp-btn bp-btn-ghost !rounded-md !px-4 !py-2.5 text-sm"
                    >
                      WhatsApp this plan
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-charcoal">{label}</p>
      {children}
    </div>
  );
}

function ChipRow({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onSelect(opt)}
          className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
            value === opt ? "bg-mint text-charcoal" : "bg-mint-wash text-ink hover:bg-mint/30"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
