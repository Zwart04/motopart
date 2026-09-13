"use client";
import { useEffect, useState } from "react";
import { useApp } from "@/components/app-provider";
import { readStore } from "@/lib/store";
import { listFinance, monthlySpend } from "@/lib/finance";
import { listDemoSources, getSource, getVisitCount } from "@/lib/attribution";
import type { GarageEntry, ServiceLog, FinanceEntry, DiagnosticResult } from "@/lib/types";
import serviceIntervals from "@/data/service-intervals.json";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { TrendingUp, Globe, Wrench, Wallet } from "lucide-react";

const COLORS = ["#f97316", "#06b6d4", "#10b981", "#8b5cf6", "#f59e0b", "#ec4899", "#3b82f6", "#84cc16"];

export default function AnalyticsPage() {
  const { t, mounted, isLoggedIn } = useApp();
  const [finance, setFinance] = useState<FinanceEntry[]>([]);
  const [logs, setLogs] = useState<ServiceLog[]>([]);
  const [garage, setGarage] = useState<GarageEntry[]>([]);
  const [diagnostics, setDiagnostics] = useState<DiagnosticResult[]>([]);
  const [source, setSource] = useState<{ source: string; medium: string; campaign: string; visits: number } | null>(null);

  useEffect(() => {
    if (!mounted) return;
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    setFinance(listFinance());
    setLogs(readStore<ServiceLog[]>("mp_service_logs", []));
    setGarage(readStore<GarageEntry[]>("mp_garage", []));
    setDiagnostics(readStore<DiagnosticResult[]>("mp_diagnostics", []));
    setSource(getSource());
  }, [mounted, isLoggedIn]);

  if (!mounted || !isLoggedIn) {
    return <div className="card text-center py-8">{t.common.loading}</div>;
  }

  const spend = monthlySpend();
  const sources = listDemoSources();
  const visits = getVisitCount();

  // service frequency by type
  const freq: Record<string, number> = {};
  for (const l of logs) {
    const name = (serviceIntervals.find((i) => i.id === l.type) || { name: l.type }).name;
    freq[name] = (freq[name] || 0) + 1;
  }
  const freqData = Object.entries(freq).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

  // category breakdown
  const catBreak: Record<string, number> = {};
  for (const f of finance) {
    catBreak[f.category] = (catBreak[f.category] || 0) + f.amount;
  }
  const pieData = Object.entries(catBreak).map(([name, value]) => ({ name, value }));

  // top parts used
  const partCount: Record<string, { sku: string; count: number; revenue: number }> = {};
  for (const l of logs) {
    for (const p of l.partsUsed) {
      if (!partCount[p.sku]) partCount[p.sku] = { sku: p.sku, count: 0, revenue: 0 };
      partCount[p.sku].count += p.qty;
      partCount[p.sku].revenue += p.price * p.qty;
    }
  }
  const topParts = Object.values(partCount).sort((a, b) => b.count - a.count).slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <TrendingUp className="w-6 h-6" style={{ color: "var(--accent)" }} />
        {t.analytics.title}
      </h1>

      <div className="grid-cards">
        <div className="card text-center">
          <Wallet className="w-6 h-6 mx-auto mb-2" style={{ color: "#f97316" }} />
          <div className="text-2xl font-bold">Rp {finance.reduce((a, b) => a + b.amount, 0).toLocaleString("id-ID")}</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>Total Spend</div>
        </div>
        <div className="card text-center">
          <Wrench className="w-6 h-6 mx-auto mb-2" style={{ color: "#10b981" }} />
          <div className="text-2xl font-bold">{logs.length}</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>Services Logged</div>
        </div>
        <div className="card text-center">
          <TrendingUp className="w-6 h-6 mx-auto mb-2" style={{ color: "#8b5cf6" }} />
          <div className="text-2xl font-bold">{diagnostics.length}</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>Diagnoses Saved</div>
        </div>
        <div className="card text-center">
          <Globe className="w-6 h-6 mx-auto mb-2" style={{ color: "#3b82f6" }} />
          <div className="text-2xl font-bold">{visits}</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>Page Visits (local)</div>
        </div>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-3">{t.analytics.spend}</h2>
        {spend.length > 0 ? (
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={spend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted)" fontSize={11} />
                <YAxis stroke="var(--muted)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} formatter={(v: number) => "Rp " + v.toLocaleString("id-ID")} />
                <Bar dataKey="total" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-8 text-sm" style={{ color: "var(--muted)" }}>
            No finance entries yet. Log a service or run an estimator to populate.
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold mb-3">{t.analytics.visits}</h2>
          {source && (
            <div className="text-xs mb-3" style={{ color: "var(--muted)" }}>
              You came from: <span className="font-mono">{source.source}</span> via <span className="font-mono">{source.medium}</span> ·{" "}
              campaign <span className="font-mono">{source.campaign}</span>
            </div>
          )}
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <BarChart data={sources}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="source" stroke="var(--muted)" fontSize={10} angle={-15} textAnchor="end" height={50} />
                <YAxis stroke="var(--muted)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} />
                <Bar dataKey="visits" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs mt-2" style={{ color: "var(--muted)" }}>
            Source tracking via UTM URL params + localStorage. Zero third-party trackers.
          </div>
        </div>

        <div className="card">
          <h2 className="font-semibold mb-3">Spend by Category</h2>
          {pieData.length > 0 ? (
            <div style={{ width: "100%", height: 220 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={(e: any) => e.name}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => "Rp " + v.toLocaleString("id-ID")} contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-8 text-sm" style={{ color: "var(--muted)" }}>
              No data yet.
            </div>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold mb-3">{t.analytics.serviceFreq}</h2>
          {freqData.length > 0 ? (
            <ul className="space-y-2">
              {freqData.map((f) => (
                <li key={f.name} className="flex items-center justify-between">
                  <span className="text-sm">{f.name}</span>
                  <span className="badge badge-orange">{f.count}x</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-sm" style={{ color: "var(--muted)" }}>No service data.</div>
          )}
        </div>

        <div className="card">
          <h2 className="font-semibold mb-3">{t.analytics.topParts}</h2>
          {topParts.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>SKU</th>
                  <th>Qty</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topParts.map((p) => (
                  <tr key={p.sku}>
                    <td className="font-mono text-xs">{p.sku}</td>
                    <td>{p.count}</td>
                    <td>Rp {p.revenue.toLocaleString("id-ID")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-sm" style={{ color: "var(--muted)" }}>No parts sold yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
