"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [brief, setBrief] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("bp-brief");
    if (stored) setBrief(stored);

    const onBrief = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) setBrief(detail);
    };
    window.addEventListener("bp-brief-ready", onBrief);
    return () => window.removeEventListener("bp-brief-ready", onBrief);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sent");
  };

  return (
    <section id="dispatch" className="bp-section relative border-t border-line py-20 md:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-mint-deep">
            Dispatch desk
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold text-charcoal sm:text-5xl">
            Send the mission. We respond same day.
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Bangalore HQ production desk — concept path, itemised quote rhythm, and crews that stay
            through curtain call.
          </p>

          <dl className="mt-8 space-y-5 border-t border-line pt-8 text-sm">
            <div className="grid grid-cols-[5rem_1fr] gap-2">
              <dt className="font-medium text-muted">HQ</dt>
              <dd className="text-charcoal">Bangalore, Karnataka, India</dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-2">
              <dt className="font-medium text-muted">Phone</dt>
              <dd>
                <a href="tel:+919901119191" className="font-medium text-mint-deep hover:text-mint">
                  +91 99011 19191
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[5rem_1fr] gap-2">
              <dt className="font-medium text-muted">Hours</dt>
              <dd className="text-charcoal">Mon – Sat · 9 AM – 8 PM IST</dd>
            </div>
          </dl>

          <a
            href="https://wa.me/919901119191"
            target="_blank"
            rel="noopener noreferrer"
            className="bp-btn bp-btn-secondary mt-8"
          >
            Message on WhatsApp
          </a>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={onSubmit}
          className="rounded-2xl border border-line bg-white p-6 shadow-[0_20px_50px_rgba(20,25,22,0.05)] md:p-8"
        >
          {status === "sent" ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <Logo size="sm" className="mb-4 h-9" />
              <h3 className="font-display text-2xl font-bold text-charcoal">Brief received</h3>
              <p className="mt-2 max-w-sm text-sm text-muted">
                Thank you. In a live deployment this routes to Brand Professor. For this demo, your
                enquiry is captured in-session.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-semibold text-mint-deep"
              >
                Send another
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" name="name" required />
              <Field label="Company" name="company" />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" required />
              <label className="sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-charcoal">Event brief</span>
                <textarea
                  name="message"
                  rows={5}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="Describe the event, city, date and services needed…"
                  className="w-full rounded-xl border border-line bg-mint-wash/30 px-4 py-3 text-sm outline-none transition focus:border-mint focus:bg-mint-wash"
                />
              </label>
              <button type="submit" className="bp-btn bp-btn-primary sm:col-span-2 mt-1 !rounded-md">
                Dispatch enquiry
              </button>
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label>
      <span className="mb-1.5 block text-sm font-medium text-charcoal">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-line bg-mint-wash/30 px-4 py-3 text-sm outline-none transition focus:border-mint focus:bg-mint-wash"
      />
    </label>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line bg-charcoal text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <Logo size="sm" className="h-9" />
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.26em] text-mint-bright">
            Experience · Excellence · Exhibition
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
            Events & Exhibitions production house — Bangalore to pan-India since 2012.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Navigate</p>
          <div className="mt-4 flex flex-col gap-2 text-sm text-white/70">
            <a href="#lab" className="hover:text-white">Lab</a>
            <a href="#systems" className="hover:text-white">Systems</a>
            <a href="#missions" className="hover:text-white">Missions</a>
            <a href="#planner" className="hover:text-white">Planner</a>
            <a href="#dispatch" className="hover:text-white">Dispatch</a>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Contact</p>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            <a href="tel:+919901119191" className="block hover:text-white">+91 99011 19191</a>
            <p>Bangalore, India</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4 text-xs text-white/40 md:flex-row md:justify-between md:px-8">
          <p>© {new Date().getFullYear()} Brand Professor</p>
          <p>Assignment concept site — Events & Exhibitions experience</p>
        </div>
      </div>
    </footer>
  );
}
