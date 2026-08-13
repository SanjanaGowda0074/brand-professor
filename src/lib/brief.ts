export type BriefAnswers = {
  type?: string;
  city?: string;
  timing?: string;
  services?: string[];
  scale?: string;
};

/** Client-side AI brief composer (works on GitHub Pages — no server required). */
export function composeProductionBrief(a: BriefAnswers): string {
  const services =
    a.services && a.services.length > 0
      ? a.services.join(", ")
      : "Full production recommendation requested";

  return [
    "BRAND PROFESSOR — AI EVENT BRIEF",
    "================================",
    `Event / Format: ${a.type || "To be confirmed"}`,
    `City / Network: ${a.city || "To be confirmed"}`,
    `Timeline: ${a.timing || "To be confirmed"}`,
    `Scale: ${a.scale || "To be confirmed"}`,
    `Services requested: ${services}`,
    "",
    "Recommended production posture:",
    "- Single point of contact across stage, AV, lighting, power and branding",
    "- Concept mood + floor/stage thinking aligned to brand narrative",
    "- Itemised quote pathway within 48 hours of brief confirmation",
    "- On-ground crew through install, show and wrap",
    "",
    "Suggested next actions for Brand Professor:",
    "1. Confirm venue constraints, load-in windows and power availability",
    "2. Align creative direction with brand guidelines / launch narrative",
    "3. Lock crew allocation for city network and contingency plan",
    "",
    "Ready for human production review — share contact details to proceed.",
  ].join("\n");
}
