"use client";
import { useEffect, useState } from "react";
import { useApp } from "@/components/app-provider";
import { readStore, writeStore, pushStoreItem, removeStoreItem, updateStoreItem } from "@/lib/store";
import type { GarageEntry } from "@/lib/types";
import serviceIntervals from "@/data/service-intervals.json";
import { CalendarClock, Plus, X, Trash2, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "@/components/toast";

type Schedule = {
  id: string;
  garageId: string;
  motorId: string;
  intervalId: string;
  lastDoneKm: number;
  lastDoneDate: string;
  enabled: boolean;
};

export default function ServicePage() {
  const { t, mounted, isLoggedIn } = useApp();
  const [garage, setGarage] = useState<GarageEntry[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    setGarage(readStore<GarageEntry[]>("mp_garage", []));
    setSchedules(readStore<Schedule[]>("mp_service_schedules", []));
  }, [mounted, isLoggedIn]);

  if (!mounted || !isLoggedIn) {
    return <div className="card text-center py-8">{t.common.loading}</div>;
  }

  const all = schedules.map((s) => {
    const g = garage.find((x) => x.id === s.garageId);
    const interval = serviceIntervals.find((i) => i.id === s.intervalId);
    if (!g || !interval) return null;
    const nextKm = s.lastDoneKm + interval.interval_km;
    const nextDate = new Date(s.lastDoneDate);
    nextDate.setDate(nextDate.getDate() + interval.interval_days);
    const dueByKm = g.currentKm >= nextKm;
    const dueByDate = nextDate <= new Date();
    const status: "overdue" | "upcoming" | "ok" = dueByKm || dueByDate ? "overdue" : g.currentKm >= nextKm * 0.9 || nextDate.getTime() - Date.now() < 14 * 86400000 ? "upcoming" : "ok";
    return { schedule: s, garage: g, interval, nextKm, nextDate, status };
  }).filter(Boolean) as { schedule: Schedule; garage: GarageEntry; interval: any; nextKm: number; nextDate: Date; status: "overdue" | "upcoming" | "ok" }[];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarClock className="w-6 h-6" style={{ color: "var(--accent)" }} />
          {t.service.title}
        </h1>
        <button onClick={() => setShowAdd(true)} disabled={garage.length === 0} className="btn flex items-center gap-2">
          <Plus className="w-4 h-4" /> {t.service.schedule}
        </button>
      </div>

      {garage.length === 0 && (
        <div className="card text-center py-6" style={{ color: "var(--muted)" }}>
          Add a motorcycle to your garage first.
        </div>
      )}

      {all.length === 0 && garage.length > 0 && (
        <div className="card text-center py-6" style={{ color: "var(--muted)" }}>
          {t.service.noScheduled}
        </div>
      )}

      {all.filter((x) => x.status === "overdue").length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold flex items-center gap-2" style={{ color: "#dc2626" }}>
            <AlertCircle className="w-4 h-4" /> {t.service.overdue} ({all.filter((x) => x.status === "overdue").length})
          </h2>
          {all.filter((x) => x.status === "overdue").map((x) => <ScheduleCard key={x.schedule.id} {...x} onUpdate={() => setSchedules(readStore<Schedule[]>("mp_service_schedules", []))} />)}
        </div>
      )}

      {all.filter((x) => x.status === "upcoming").length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold flex items-center gap-2" style={{ color: "#f59e0b" }}>
            <CalendarClock className="w-4 h-4" /> {t.service.upcoming} ({all.filter((x) => x.status === "upcoming").length})
          </h2>
          {all.filter((x) => x.status === "upcoming").map((x) => <ScheduleCard key={x.schedule.id} {...x} onUpdate={() => setSchedules(readStore<Schedule[]>("mp_service_schedules", []))} />)}
        </div>
      )}

      {all.filter((x) => x.status === "ok").length > 0 && (
        <div className="space-y-2">
          <h2 className="font-semibold flex items-center gap-2" style={{ color: "#10b981" }}>
            <CheckCircle2 className="w-4 h-4" /> {t.service.completed} / OK ({all.filter((x) => x.status === "ok").length})
          </h2>
          {all.filter((x) => x.status === "ok").map((x) => <ScheduleCard key={x.schedule.id} {...x} onUpdate={() => setSchedules(readStore<Schedule[]>("mp_service_schedules", []))} />)}
        </div>
      )}

      {showAdd && (
        <AddScheduleModal
          garage={garage}
          existing={schedules}
          onClose={() => setShowAdd(false)}
          onAdd={(s) => {
            pushStoreItem("mp_service_schedules", s);
            setSchedules(readStore<Schedule[]>("mp_service_schedules", []));
            setShowAdd(false);
            toast("Scheduled", "success");
          }}
        />
      )}
    </div>
  );
}

function ScheduleCard({ schedule, garage, interval, nextKm, nextDate, status, onUpdate }: { schedule: Schedule; garage: GarageEntry; interval: any; nextKm: number; nextDate: Date; status: string; onUpdate: () => void }) {
  const { t } = useApp();
  return (
    <div className="card flex items-center justify-between flex-wrap gap-2">
      <div>
        <div className="font-semibold">{interval.name}</div>
        <div className="text-xs" style={{ color: "var(--muted)" }}>
          {garage.nickname || garage.motorId} · every {interval.interval_km.toLocaleString("id-ID")} KM / {interval.interval_days} days
        </div>
        <div className="text-xs mt-1">
          Next: {nextKm.toLocaleString("id-ID")} KM · {nextDate.toISOString().slice(0, 10)}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className={"badge " + (status === "overdue" ? "badge-danger" : status === "upcoming" ? "badge-warning" : "badge-success")}>
          {status === "overdue" ? "Overdue" : status === "upcoming" ? "Soon" : "OK"}
        </span>
        <button
          onClick={() => {
            if (confirm(t.deleteConfirm)) {
              removeStoreItem<Schedule>("mp_service_schedules", schedule.id);
              onUpdate();
              toast("Removed", "info");
            }
          }}
          className="btn-ghost p-1 text-rose-600"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function AddScheduleModal({ garage, existing, onClose, onAdd }: { garage: GarageEntry[]; existing: Schedule[]; onClose: () => void; onAdd: (s: Schedule) => void }) {
  const { t } = useApp();
  const [garageId, setGarageId] = useState(garage[0]?.id || "");
  const [intervalId, setIntervalId] = useState(serviceIntervals[0].id);
  const [lastDoneKm, setLastDoneKm] = useState("0");
  const [lastDoneDate, setLastDoneDate] = useState(new Date().toISOString().slice(0, 10));

  const g = garage.find((x) => x.id === garageId);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!g) return;
    const s: Schedule = {
      id: "sch_" + Date.now().toString(36),
      garageId,
      motorId: g.motorId,
      intervalId,
      lastDoneKm: parseInt(lastDoneKm) || 0,
      lastDoneDate,
      enabled: true,
    };
    onAdd(s);
  };

  const used = existing.filter((x) => x.garageId === garageId).map((x) => x.intervalId);
  const available = serviceIntervals.filter((i) => !used.includes(i.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="card max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">{t.service.schedule}</h2>
          <button onClick={onClose} className="btn-ghost p-1"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="label">Motorcycle</label>
            <select className="select" value={garageId} onChange={(e) => setGarageId(e.target.value)}>
              {garage.map((g) => <option key={g.id} value={g.id}>{g.nickname || g.motorId}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Service Type</label>
            <select className="select" value={intervalId} onChange={(e) => setIntervalId(e.target.value)}>
              {available.map((i) => <option key={i.id} value={i.id}>{i.name} (every {i.interval_km.toLocaleString("id-ID")} KM)</option>)}
            </select>
          </div>
          <div>
            <label className="label">Last Done KM</label>
            <input type="number" className="input" value={lastDoneKm} onChange={(e) => setLastDoneKm(e.target.value)} />
          </div>
          <div>
            <label className="label">Last Done Date</label>
            <input type="date" className="input" value={lastDoneDate} onChange={(e) => setLastDoneDate(e.target.value)} />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn btn-secondary flex-1">{t.common.cancel}</button>
            <button type="submit" className="btn flex-1" disabled={available.length === 0}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
