export type MissionMode = "events" | "exhibitions";

export type MissionInput = {
  mode: MissionMode;
  city: string;
  leadTime: string;
  /** Events */
  headcount?: string;
  venue?: string;
  /** Exhibitions */
  stallSqm?: string;
  openSides?: string;
  modules: string[];
};

export type MissionPlan = {
  stack: string[];
  timeline: { phase: string; window: string }[];
  budget: { lowLakh: number; highLakh: number; label: string };
  risks: string[];
  readiness: "Go" | "Tight" | "Needs review";
  summary: string;
};

const EVENT_MODULES = [
  "Stage architecture",
  "LED / projection",
  "Audio visuals",
  "Light & truss",
  "Power spine",
  "Brand surfaces",
  "Furniture & ambience",
] as const;

const EXPO_MODULES = [
  "Stall fabrication",
  "LED fascia / wall",
  "Reception desk",
  "Product demo zone",
  "Hospitality corner",
  "Storage / pantry",
  "Brand surfaces",
  "Power & AV",
] as const;

export const plannerCities = [
  "Bangalore",
  "Mumbai",
  "Delhi NCR",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Multi-city",
] as const;

export const leadTimes = [
  "Under 10 days",
  "10–21 days",
  "3–6 weeks",
  "6+ weeks",
] as const;

export const headcounts = [
  "<100",
  "100–300",
  "300–800",
  "800–1500",
  "1500+",
] as const;

export const venues = [
  "Hotel ballroom",
  "Convention centre",
  "Outdoor / lawn",
  "Campus / auditorium",
  "Corporate HQ",
] as const;

export const stallSizes = ["9–18 sqm", "18–36 sqm", "36–72 sqm", "72+ sqm / custom"] as const;

export const openSideOptions = ["1 side", "2 sides", "3 sides", "Island (4)"] as const;

export function modulesFor(mode: MissionMode): readonly string[] {
  return mode === "events" ? EVENT_MODULES : EXPO_MODULES;
}

function cityMultiplier(city: string): number {
  if (city === "Mumbai" || city === "Delhi NCR") return 1.15;
  if (city === "Bangalore" || city === "Hyderabad") return 1.05;
  if (city === "Multi-city") return 1.35;
  return 1;
}

function eventScale(headcount?: string): number {
  switch (headcount) {
    case "<100":
      return 1;
    case "100–300":
      return 1.6;
    case "300–800":
      return 2.4;
    case "800–1500":
      return 3.4;
    case "1500+":
      return 5;
    default:
      return 1.8;
  }
}

function stallScale(stallSqm?: string): number {
  switch (stallSqm) {
    case "9–18 sqm":
      return 1;
    case "18–36 sqm":
      return 1.7;
    case "36–72 sqm":
      return 2.6;
    case "72+ sqm / custom":
      return 4;
    default:
      return 1.5;
  }
}

function defaultStack(mode: MissionMode, modules: string[]): string[] {
  if (modules.length > 0) return modules;
  return mode === "events"
    ? ["Stage architecture", "Audio visuals", "Light & truss", "Power spine", "Brand surfaces"]
    : ["Stall fabrication", "Reception desk", "Product demo zone", "Brand surfaces", "Power & AV"];
}

/** Client-side mission planner — works on static GitHub Pages. */
export function planMission(input: MissionInput): MissionPlan {
  const stack = defaultStack(input.mode, input.modules);
  const multi = cityMultiplier(input.city);
  const heavyLed =
    stack.some((m) => /LED|projection|Light & truss/i.test(m)) ||
    stack.includes("LED fascia / wall");
  const powerHeavy = stack.some((m) => /Power|AV|LED/i.test(m));

  let baseLow = 0;
  let baseHigh = 0;

  if (input.mode === "events") {
    const s = eventScale(input.headcount);
    baseLow = 2.5 * s * multi;
    baseHigh = 5.5 * s * multi;
    if (input.venue === "Outdoor / lawn") {
      baseLow *= 1.2;
      baseHigh *= 1.35;
    }
  } else {
    const s = stallScale(input.stallSqm);
    baseLow = 1.8 * s * multi;
    baseHigh = 4.2 * s * multi;
    if (input.openSides === "Island (4)" || input.openSides === "3 sides") {
      baseLow *= 1.15;
      baseHigh *= 1.25;
    }
  }

  // Module intensity
  const modFactor = 0.85 + stack.length * 0.08;
  baseLow *= modFactor;
  baseHigh *= modFactor;
  if (heavyLed) {
    baseLow *= 1.12;
    baseHigh *= 1.2;
  }

  const lowLakh = Math.max(1.2, Math.round(baseLow * 10) / 10);
  const highLakh = Math.max(lowLakh + 1.2, Math.round(baseHigh * 10) / 10);

  const risks: string[] = [];
  if (input.leadTime === "Under 10 days") {
    risks.push("Compressed lead time — fabrication + crew allocation need same-day lock.");
  }
  if (input.leadTime === "10–21 days" && (input.headcount === "1500+" || input.stallSqm === "72+ sqm / custom")) {
    risks.push("Scale vs calendar is tight — early concept freeze recommended.");
  }
  if (heavyLed && powerHeavy) {
    risks.push("LED / AV load is power-sensitive — confirm venue distribution early.");
  }
  if (input.venue === "Outdoor / lawn") {
    risks.push("Outdoor weather + generator contingency should be in the brief.");
  }
  if (input.openSides === "1 side") {
    risks.push("Single-side booth — facade + depth hierarchy matter more than floor spread.");
  }
  if (input.city === "Multi-city") {
    risks.push("Multi-city needs shared kit plan + local crew hubs per stop.");
  }
  if (risks.length === 0) {
    risks.push("No critical blockers from this brief — ready for human production review.");
  }

  let readiness: MissionPlan["readiness"] = "Go";
  if (input.leadTime === "Under 10 days") readiness = "Tight";
  if (
    input.leadTime === "Under 10 days" &&
    (input.headcount === "1500+" || input.stallSqm === "72+ sqm / custom" || input.city === "Multi-city")
  ) {
    readiness = "Needs review";
  }

  const timeline =
    input.mode === "events"
      ? eventTimeline(input.leadTime)
      : expoTimeline(input.leadTime);

  const summary = [
    `MODE: ${input.mode === "events" ? "Events production" : "Exhibition stall"}`,
    `CITY: ${input.city || "TBD"}`,
    `LEAD TIME: ${input.leadTime || "TBD"}`,
    input.mode === "events"
      ? `SCALE: ${input.headcount || "TBD"} · VENUE: ${input.venue || "TBD"}`
      : `STALL: ${input.stallSqm || "TBD"} · OPEN SIDES: ${input.openSides || "TBD"}`,
    `STACK: ${stack.join(" · ")}`,
    `BUDGET BAND: ₹${lowLakh}–${highLakh} Lakh (indicative)`,
    `READINESS: ${readiness}`,
    `RISKS: ${risks.join(" | ")}`,
    `TIMELINE: ${timeline.map((t) => `${t.phase} (${t.window})`).join(" → ")}`,
  ].join("\n");

  return {
    stack,
    timeline,
    budget: {
      lowLakh,
      highLakh,
      label: `₹${formatLakh(lowLakh)}–${formatLakh(highLakh)} Lakh`,
    },
    risks,
    readiness,
    summary,
  };
}

function formatLakh(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

function eventTimeline(lead: string): { phase: string; window: string }[] {
  if (lead === "Under 10 days") {
    return [
      { phase: "Intake + lock", window: "Day 0–1" },
      { phase: "Concept / tech plot", window: "Day 1–2" },
      { phase: "Fabricate & kit", window: "Day 2–5" },
      { phase: "Load-in → show → strike", window: "Day 6–9" },
    ];
  }
  if (lead === "10–21 days") {
    return [
      { phase: "Brief + survey", window: "Week 1" },
      { phase: "Design + quote", window: "Week 1–2" },
      { phase: "Build & logistics", window: "Week 2–3" },
      { phase: "Show command", window: "Show week" },
    ];
  }
  return [
    { phase: "Discovery", window: "Week 1" },
    { phase: "Creative + engineering", window: "Week 2–3" },
    { phase: "Fabrication", window: "Mid window" },
    { phase: "Install · live · wrap", window: "Show week" },
  ];
}

function expoTimeline(lead: string): { phase: string; window: string }[] {
  if (lead === "Under 10 days") {
    return [
      { phase: "Floor plan lock", window: "Day 0–1" },
      { phase: "3D + materials", window: "Day 1–3" },
      { phase: "Workshop build", window: "Day 3–7" },
      { phase: "Install + handover", window: "Day 8–10" },
    ];
  }
  if (lead === "10–21 days") {
    return [
      { phase: "Brief + footprint", window: "Week 1" },
      { phase: "3D concept", window: "Week 1–2" },
      { phase: "Fabrication", window: "Week 2–3" },
      { phase: "Expo install", window: "Move-in day" },
    ];
  }
  return [
    { phase: "Strategy + zoning", window: "Week 1–2" },
    { phase: "Design iterations", window: "Week 2–4" },
    { phase: "Build & graphics", window: "Pre-show" },
    { phase: "Install · live · dismantle", window: "Show window" },
  ];
}

export function composeMissionDispatch(plan: MissionPlan, input: MissionInput): string {
  return [
    "BRAND PROFESSOR — LIVE MISSION PLAN",
    "===================================",
    plan.summary,
    "",
    "Indicative only — final quote after venue constraints & brand assets.",
    "Ready for Dispatch / WhatsApp handoff.",
  ].join("\n");
}
