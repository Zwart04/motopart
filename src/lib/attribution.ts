// UTM/URL-param capture → localStorage.source (NO Pixel, NO GA)
import { readStore, writeStore } from "./store";

const KEY = "mp_source";
const VISIT_KEY = "mp_visit_count";

export type Source = {
  source: string;
  medium: string;
  campaign: string;
  firstVisit: string;
  visits: number;
};

export function captureSourceFromUrl(): Source | null {
  if (typeof window === "undefined") return null;
  const existing = readStore<Source | null>(KEY, null as Source | null);
  if (existing) {
    // increment visit count
    const visits = readStore<number>(VISIT_KEY, 0) + 1;
    writeStore(VISIT_KEY, visits);
    existing.visits = visits;
    writeStore(KEY, existing);
    return existing;
  }
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source") || params.get("source") || "direct";
  const medium = params.get("utm_medium") || params.get("medium") || "none";
  const campaign = params.get("utm_campaign") || params.get("campaign") || "none";
  const s: Source = {
    source,
    medium,
    campaign,
    firstVisit: new Date().toISOString(),
    visits: 1,
  };
  writeStore(KEY, s);
  writeStore(VISIT_KEY, 1);
  return s;
}

export function getSource(): Source | null {
  if (typeof window === "undefined") return null;
  return readStore<Source | null>(KEY, null as Source | null);
}

export function getVisitCount(): number {
  if (typeof window === "undefined") return 0;
  return readStore<number>(VISIT_KEY, 0);
}

export function listDemoSources(): { source: string; visits: number }[] {
  // If we have a stored source, return that + demo data
  const s = getSource();
  const base = [
    { source: "direct", visits: 42 },
    { source: "facebook", visits: 18 },
    { source: "instagram", visits: 12 },
    { source: "twitter", visits: 7 },
    { source: "search", visits: 31 },
    { source: "referral", visits: 9 },
  ];
  if (s && !base.find((b) => b.source === s.source)) {
    base.push({ source: s.source, visits: s.visits });
  } else if (s) {
    const idx = base.findIndex((b) => b.source === s.source);
    if (idx >= 0) base[idx].visits += s.visits;
  }
  return base;
}
