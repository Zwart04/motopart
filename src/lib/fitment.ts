import type { Part, Motor } from "./types";

// Fitment matcher: rules-based engine
// returns top-N parts with confidence score 0-100
export function matchPartsForMotor(parts: Part[], motorId: string, category?: string): { part: Part; confidence: number; reason: string }[] {
  const list = parts.filter((p) => p.fitments.includes(motorId));
  const filtered = category ? list.filter((p) => p.category === category) : list;
  return filtered
    .map((p) => {
      // confidence: OEM=95, Aftermarket=80, but down-rank if not perfect motor match (always exact here since pre-filtered)
      const confidence = p.oem ? 95 : 80;
      const reason = p.oem
        ? `OEM exact match for ${motorId}`
        : `Aftermarket compatible with ${motorId}`;
      return { part: p, confidence, reason };
    })
    .sort((a, b) => b.confidence - a.confidence || a.part.name.localeCompare(b.part.name));
}

export function computePriceIndex(yourPrice: number, marketMedian: number): { index: number; color: "red" | "yellow" | "green"; label: string } {
  if (marketMedian <= 0) return { index: 50, color: "yellow", label: "No data" };
  // index = 100 - ((your - median) / median * 100) clamped 0-100
  // if your < median, you're cheap (good for customer but bad for margin) -> red
  // if your == median, index 100 (green)
  // if your > median by 20%, index 80 (yellow)
  // if your > median by 50%, index 50 (red)
  const ratio = (yourPrice - marketMedian) / marketMedian;
  const index = Math.max(0, Math.min(100, Math.round(100 - ratio * 100)));
  let color: "red" | "yellow" | "green" = "green";
  let label = "Competitive";
  if (index < 50) {
    color = "red";
    label = "Too expensive";
  } else if (index < 80) {
    color = "yellow";
    label = "Slightly above market";
  } else if (index < 100) {
    color = "green";
    label = "At market";
  } else {
    color = "green";
    label = "Below market";
  }
  return { index, color, label };
}

// Cosine similarity over motor specs (used in /analytics recommend)
export function motorSimilarity(a: Motor, b: Motor): number {
  if (a.id === b.id) return 1;
  // weight by: brand exact (0.4), category exact (0.3), engine diff (0.2), year diff (0.1)
  let score = 0;
  if (a.brand === b.brand) score += 0.4;
  if (a.category === b.category) score += 0.3;
  const aEng = parseInt(a.engine);
  const bEng = parseInt(b.engine);
  if (!isNaN(aEng) && !isNaN(bEng)) {
    const diff = Math.abs(aEng - bEng);
    score += 0.2 * Math.max(0, 1 - diff / 100);
  }
  const yearDiff = Math.abs(a.year - b.year);
  score += 0.1 * Math.max(0, 1 - yearDiff / 5);
  return Math.round(score * 100) / 100;
}
