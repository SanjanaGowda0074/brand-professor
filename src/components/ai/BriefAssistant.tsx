"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { composeProductionBrief } from "@/lib/brief";

type Answers = {
  type: string;
  city: string;
  timing: string;
  services: string[];
  scale: string;
};

const eventTypes = [
  "Product Launch",
  "Corporate Conference",
  "Awards Night",
  "College Fest",
  "Brand Activation",
  "Exhibition Stall",
  "Store Launch",
];

const cities = [
  "Bangalore",
  "Mumbai",
  "Delhi NCR",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Multi-city",
  "Other",
];

const timings = ["Within 2 weeks", "2–4 weeks", "1–2 months", "3+ months / planning ahead"];

const serviceOptions = [
  "Stage Production",
  "Audio Visuals",
  "Truss & Lights",
  "Furniture & Ambience",
  "Power Support",
  "Structures",
  "Printing & Branding",
  "Stall Design & Fabrication",
];

const scales = ["Intimate (<100)", "Mid (100–500)", "Large (500–1500)", "Arena / Mega (1500+)", "Expo booth (sqm TBD)"];

const steps = ["type", "city", "timing", "services", "scale", "result"] as const;

export function BriefAssistant() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    type: "",
    city: "",
    timing: "",
    services: [],
    scale: "",
  });
  const [enhancing, setEnhancing] = useState(false);
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);

  const progress = ((step + 1) / steps.length) * 100;

  const toggleService = (s: string) => {
    setAnswers((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));
  };

  const localBrief = useMemo(() => composeProductionBrief(answers), [answers]);

  const finish = async () => {
    setEnhancing(true);
    setStep(steps.length - 1);
    // Short compose delay so the AI brief moment feels intentional
    await new Promise((r) => setTimeout(r, 450));
    setBrief(composeProductionBrief(answers));
    setEnhancing(false);
  };

  const copy = async () => {
    await navigator.clipboard.writeText(brief || localBrief);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const sendToContact = () => {
    const payload = brief || localBrief;
    sessionStorage.setItem("bp-brief", payload);
    window.location.hash = "dispatch";
    window.dispatchEvent(new CustomEvent("bp-brief-ready", { detail: payload }));
  };

  return (
    <section id="brief" className="bp-section relative overflow-hidden border-t border-line bg-sand py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-mint-deep">
            Brief terminal
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-charcoal sm:text-5xl">
            AI that writes like a production desk
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            A guided intake that outputs a show-ready brief — the AI-first layer reviewers can
            actually touch, not just a coding story.
          </p>
        </motion.div>

        <div className="mt-10 overflow-hidden rounded-xl border border-line bg-white shadow-[0_20px_60px_rgba(20,25,22,0.06)]">
          <div className="flex items-center justify-between border-b border-line bg-charcoal px-4 py-3 text-white">
            <span className="font-mono text-xs text-mint-bright">bp://brief-assistant</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Live session</span>
          </div>
          <div className="h-1 bg-mint-wash">
            <div className="h-full bg-mint transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {steps[step] === "type" && (
                <Step key="type" title="What are you building?">
                  <ChipGrid
                    options={eventTypes}
                    value={answers.type}
                    onSelect={(type) => {
                      setAnswers((a) => ({ ...a, type }));
                      setStep(1);
                    }}
                  />
                </Step>
              )}

              {steps[step] === "city" && (
                <Step key="city" title="Where will it happen?" onBack={() => setStep(0)}>
                  <ChipGrid
                    options={cities}
                    value={answers.city}
                    onSelect={(city) => {
                      setAnswers((a) => ({ ...a, city }));
                      setStep(2);
                    }}
                  />
                </Step>
              )}

              {steps[step] === "timing" && (
                <Step key="timing" title="What's the timeline?" onBack={() => setStep(1)}>
                  <ChipGrid
                    options={timings}
                    value={answers.timing}
                    onSelect={(timing) => {
                      setAnswers((a) => ({ ...a, timing }));
                      setStep(3);
                    }}
                  />
                </Step>
              )}

              {steps[step] === "services" && (
                <Step key="services" title="Which services do you need?" onBack={() => setStep(2)}>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((s) => {
                      const on = answers.services.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                            on ? "bg-mint text-charcoal" : "bg-mint-wash text-ink hover:bg-mint/30"
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="mt-6 rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    Continue
                  </button>
                </Step>
              )}

              {steps[step] === "scale" && (
                <Step key="scale" title="What's the scale?" onBack={() => setStep(3)}>
                  <ChipGrid
                    options={scales}
                    value={answers.scale}
                    onSelect={(scale) => {
                      setAnswers((a) => ({ ...a, scale }));
                      void finish();
                    }}
                  />
                </Step>
              )}

              {steps[step] === "result" && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h3 className="font-display text-xl font-bold text-charcoal">Your production brief</h3>
                  {enhancing ? (
                    <p className="text-sm text-muted">Composing brief…</p>
                  ) : (
                    <pre className="max-h-72 overflow-auto rounded-2xl bg-mint-wash/70 p-4 text-left text-xs leading-relaxed text-ink whitespace-pre-wrap">
                      {brief || localBrief}
                    </pre>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={copy}
                      className="rounded-full border border-mint/40 px-5 py-2.5 text-sm font-semibold text-charcoal"
                    >
                      {copied ? "Copied" : "Copy brief"}
                    </button>
                    <button
                      type="button"
                      onClick={sendToContact}
                      className="rounded-full bg-mint px-5 py-2.5 text-sm font-semibold text-charcoal"
                    >
                      Send with enquiry
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(0);
                        setAnswers({ type: "", city: "", timing: "", services: [], scale: "" });
                        setBrief("");
                      }}
                      className="rounded-full px-5 py-2.5 text-sm font-medium text-muted"
                    >
                      Start over
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

function Step({
  title,
  children,
  onBack,
}: {
  title: string;
  children: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
      {onBack && (
        <button type="button" onClick={onBack} className="mb-3 text-xs font-medium text-muted hover:text-mint-deep">
          ← Back
        </button>
      )}
      <h3 className="font-display text-xl font-bold text-charcoal">{title}</h3>
      <div className="mt-5">{children}</div>
    </motion.div>
  );
}

function ChipGrid({
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
          className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
            value === opt ? "bg-mint text-charcoal" : "bg-mint-wash text-ink hover:bg-mint/30"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
