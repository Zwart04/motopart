"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useApp } from "@/components/app-provider";
import { getCurrentUser } from "@/lib/auth";
import { readStore } from "@/lib/store";
import { monthlySpend, listFinance } from "@/lib/finance";
import { listDemoSources, getSource } from "@/lib/attribution";
import type { GarageEntry, ServiceLog, FinanceEntry } from "@/lib/types";
import { Bike, CalendarClock, Wallet, Boxes, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import partsData from "@/data/parts.json";
import serviceIntervals from "@/data/service-intervals.json";
import motors from "@/data/motors.json";
import type { Part } from "@/lib/types";

export default function DashboardPage() {
  const { t, mounted, isLoggedIn } = useApp();
  const [user, setUser] = useState<{ name: string; workshop?: string } | null>(null);
  const [garage, setGarage] = useState<GarageEntry[]>([]);
  const [logs, setLogs] = useState<ServiceLog[]>([]);
  const [schedules, setSchedules] = useState<{ id: string; garageId: string; intervalId: string; lastDoneKm: number; lastDoneDate: string; enabled: boolean }[]>([]);
  const [finance, setFinance] = useState<FinanceEntry[]>([]);
  const [source, setSource] = useState<string>("direct");

  useEffect(() => {
    if (!mounted) return;
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    setUser(getCurrentUser());
    setGarage(readStore<GarageEntry[]>("mp_garage", []));
    setLogs(readStore<ServiceLog[]>("mp_service_logs", []));
    setSchedules(readStore("mp_service_schedules", [] as { id: string; garageId: string; intervalId: string; lastDoneKm: number; lastDoneDate: string; enabled: boolean }[]));
    setFinance(listFinance());
    const s = getSource();
    if (s) setSource(s.source);
  }, [mounted, isLoggedIn]);

  if (!mounted || !isLoggedIn) {
    return <div className="card text-center py-8">{t.common.loading}</div>;
  }

  const partsList = partsData as Part[];
  const totalStock = partsList.reduce((acc, p) => acc + p.stock, 0);
  const spend = monthlySpend();
  const lastMonth = spend[spend.length - 1]?.total || 0;

  // compute due services
  const dueCount = schedules.filter((s) => {
    const g = garage.find((x) => x.id === s.garageId);
    if (!g) return false;
    const interval = serviceIntervals.find((i) => i.id === s.intervalId);
    if (!interval) return false;
    const nextKm = s.lastDoneKm + interval.interval_km;
    const nextDate = new Date(s.lastDoneDate);
    nextDate.setDate(nextDate.getDate() + interval.interval_days);
    return g.currentKm >= nextKm || nextDate <= new Date();
  }).length;

  const sources = listDemoSources();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{t.dashboard.welcome}, {user?.name || "User"}</h1>
        {user?.workshop && <p style={{ color: "var(--muted)" }} className="text-sm">{user.workshop}</p>}
      </div>

      <div className="grid-cards">
        <StatCard icon={Bike} label={t.dashboard.stats.motors} value={garage.length} color="#f97316" />
        <StatCard icon={CalendarClock} label={t.dashboard.stats.due} value={dueCount} color={dueCount > 0 ? "#dc2626" : "#10b981"} />
        <StatCard icon={Wallet} label={t.dashboard.stats.spend} value={"Rp " + lastMonth.toLocaleString("id-ID")} color="#8b5cf6" small />
        <StatCard icon={Boxes} label={t.dashboard.stats.parts} value={totalStock} color="#06b6d4" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4" style={{ color: "var(--accent)" }} />
              {t.analytics.spend}
            </h2>
            <Link href="/analytics" className="text-xs flex items-center gap-1" style={{ color: "var(--accent)" }}>
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div style={{ width: "100%", height: 200 }}>
            {spend.length > 0 ? (
              <ResponsiveContainer>
                <BarChart data={spend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted)" fontSize={11} />
                  <YAxis stroke="var(--muted)" fontSize={11} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)" }} formatter={(v: number) => "Rp " + v.toLocaleString("id-ID")} />
                  <Bar dataKey="total" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-sm" style={{ color: "var(--muted)" }}>
                No data yet
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" style={{ color: "var(--accent)" }} />
              {t.dashboard.quickActions}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/garage" className="btn btn-secondary justify-start">
              <Bike className="w-4 h-4" /> {t.garage.add}
            </Link>
            <Link href="/diagnostic" className="btn btn-secondary justify-start">
              <AlertCircle className="w-4 h-4" /> {dueCount === 0 ? "Diagnose" : "Service Now"}
            </Link>
            <Link href="/service" className="btn btn-secondary justify-start">
              <CalendarClock className="w-4 h-4" /> {t.nav.service}
            </Link>
            <Link href="/estimator" className="btn btn-secondary justify-start">
              <Wallet className="w-4 h-4" /> {t.nav.estimator}
            </Link>
          </div>
        </div>
      </div>

      {garage.length === 0 && (
        <div className="card text-center py-8">
          <Bike className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--muted)" }} />
          <p className="mb-3" style={{ color: "var(--muted)" }}>{t.dashboard.noMotors}</p>
          <Link href="/garage" className="btn">{t.garage.add}</Link>
        </div>
      )}

      {garage.length > 0 && (
        <div className="card">
          <h2 className="font-semibold mb-3">Your Garage</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {garage.slice(0, 6).map((g) => {
              const m = motors.find((x) => x.id === g.motorId);
              return (
                <Link key={g.id} href={`/garage/${g.id}`} className="card text-sm hover:shadow-md transition-shadow block">
                  <div className="font-semibold">{g.nickname || (m ? `${m.brand} ${m.model}` : g.motorId)}</div>
                  <div style={{ color: "var(--muted)" }} className="text-xs">
                    {m ? `${m.brand} ${m.model}` : g.motorId} · {g.year}
                  </div>
                  <div className="text-xs mt-1">{g.currentKm.toLocaleString("id-ID")} KM</div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="card text-xs flex items-center gap-2" style={{ color: "var(--muted)" }}>
        <span className="badge badge-orange">UTM</span>
        Current source: <span className="font-mono">{source}</span> · Analytics powered by localStorage (no third-party trackers)
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, small }: { icon: any; label: string; value: any; color: string; small?: boolean }) {
  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: color + "20", color }}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>{label}</div>
          <div className={"font-bold " + (small ? "text-base" : "text-2xl")}>{value}</div>
        </div>
      </div>
    </div>
  );
}
