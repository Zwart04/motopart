import { readStore, writeStore, pushStoreItem } from "./store";
import type { FinanceEntry } from "./types";

const KEY = "mp_finance";

export function listFinance(): FinanceEntry[] {
  return readStore<FinanceEntry[]>(KEY, []);
}

export function logFinance(entry: Omit<FinanceEntry, "id" | "ts">): void {
  const e: FinanceEntry = {
    ...entry,
    id: "f_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
    ts: new Date().toISOString(),
  };
  pushStoreItem(KEY, e);
}

export function monthlySpend(): { month: string; total: number }[] {
  const list = listFinance();
  const map: Record<string, number> = {};
  for (const e of list) {
    const d = new Date(e.ts);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    map[key] = (map[key] || 0) + e.amount;
  }
  return Object.entries(map)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, total]) => ({ month, total }));
}

export function clearAllFinance(): void {
  writeStore(KEY, []);
}
