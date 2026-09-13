"use client";
import { useEffect, useMemo, useState } from "react";
import { useApp } from "@/components/app-provider";
import { matchPartsForMotor, computePriceIndex } from "@/lib/fitment";
import type { Part } from "@/lib/types";
import partsData from "@/data/parts.json";
import motorsData from "@/data/motors.json";
import type { Motor } from "@/lib/types";
import { Search, Filter, TrendingUp, TrendingDown, Award } from "lucide-react";

const parts = partsData as Part[];
const motors = motorsData as Motor[];

export default function PartsPage() {
  const { t, mounted } = useApp();
  const [motorId, setMotorId] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [customPrice, setCustomPrice] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!mounted) return;
    try {
      const stored = localStorage.getItem("mp_custom_prices");
      if (stored) setCustomPrice(JSON.parse(stored));
    } catch {}
  }, [mounted]);

  const updatePrice = (sku: string, val: number) => {
    const next = { ...customPrice, [sku]: val };
    setCustomPrice(next);
    try {
      localStorage.setItem("mp_custom_prices", JSON.stringify(next));
    } catch {}
  };

  const categories = useMemo(() => Array.from(new Set(parts.map((p) => p.category))).sort(), []);

  const filtered = useMemo(() => {
    let list = parts;
    if (motorId !== "all") list = list.filter((p) => p.fitments.includes(motorId));
    if (category !== "all") list = list.filter((p) => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q));
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [motorId, category, search]);

  if (!mounted) {
    return <div className="card text-center py-8">{t.common.loading}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t.parts.title}</h1>

      <div className="card grid sm:grid-cols-3 gap-3">
        <div>
          <label className="label">{t.parts.filterMotor}</label>
          <select className="select" value={motorId} onChange={(e) => setMotorId(e.target.value)}>
            <option value="all">All Motorcycles</option>
            {motors.map((m) => (
              <option key={m.id} value={m.id}>{m.brand} {m.model}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">{t.parts.filterCategory}</label>
          <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">{t.parts.search}</label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted)" }} />
            <input className="input pl-9" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="NGK, Beat, oli..." />
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="card text-center py-8" style={{ color: "var(--muted)" }}>
          {t.parts.empty}
        </div>
      ) : (
        <div className="grid-cards">
          {filtered.map((p) => {
            const yourPrice = customPrice[p.sku] ?? p.price_idr;
            const idx = computePriceIndex(yourPrice, p.market_median_idr);
            return (
              <div key={p.sku} className="card">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-mono text-xs" style={{ color: "var(--muted)" }}>{p.sku}</div>
                  <span className={p.oem ? "badge badge-info" : "badge badge-warning"}>
                    {p.oem ? t.parts.oem : t.parts.aftermarket}
                  </span>
                </div>
                <h3 className="font-semibold mb-1">{p.name}</h3>
                <div className="text-xs mb-3" style={{ color: "var(--muted)" }}>
                  {p.category} · {p.subcategory} · {p.fitments.length} motors
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: "var(--muted)" }}>{t.parts.price}</span>
                    <span className="font-bold">Rp {p.price_idr.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: "var(--muted)" }}>{t.parts.marketMedian}</span>
                    <span>Rp {p.market_median_idr.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span style={{ color: "var(--muted)" }}>{t.parts.stock}</span>
                    <span className="font-semibold">{p.stock}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                  <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>{t.parts.yourPrice}</div>
                  <input
                    type="number"
                    className="input text-sm"
                    value={yourPrice}
                    onChange={(e) => updatePrice(p.sku, parseInt(e.target.value) || 0)}
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs" style={{ color: "var(--muted)" }}>{t.parts.priceIndex}</span>
                    <span
                      className={"badge " + (idx.color === "red" ? "badge-danger" : idx.color === "yellow" ? "badge-warning" : "badge-success")}
                    >
                      {idx.index} · {idx.label}
                    </span>
                  </div>
                  <div className="mt-1 h-2 rounded overflow-hidden" style={{ background: "var(--border)" }}>
                    <div
                      className="h-full transition-all"
                      style={{
                        width: idx.index + "%",
                        background: idx.color === "red" ? "#dc2626" : idx.color === "yellow" ? "#f59e0b" : "#10b981",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="card text-xs flex items-center gap-2" style={{ color: "var(--muted)" }}>
        <Award className="w-4 h-4" style={{ color: "var(--accent)" }} />
        Showing {filtered.length} of {parts.length} parts. Fitment auto-filtered when motorcycle is selected.
      </div>
    </div>
  );
}
