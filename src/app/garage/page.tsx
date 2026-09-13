"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useApp } from "@/components/app-provider";
import { readStore, writeStore, pushStoreItem, removeStoreItem } from "@/lib/store";
import type { GarageEntry } from "@/lib/types";
import motors from "@/data/motors.json";
import { Plus, X, Bike, ArrowRight } from "lucide-react";
import { toast } from "@/components/toast";

export default function GaragePage() {
  const { t, mounted, isLoggedIn } = useApp();
  const [garage, setGarage] = useState<GarageEntry[]>([]);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    setGarage(readStore<GarageEntry[]>("mp_garage", []));
  }, [mounted, isLoggedIn]);

  if (!mounted || !isLoggedIn) {
    return <div className="card text-center py-8">{t.common.loading}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold">{t.garage.title}</h1>
        <button onClick={() => setShowAdd(true)} className="btn flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {t.garage.add}
        </button>
      </div>

      {garage.length === 0 ? (
        <div className="card text-center py-12">
          <Bike className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--muted)" }} />
          <p style={{ color: "var(--muted)" }}>{t.garage.empty}</p>
        </div>
      ) : (
        <div className="grid-cards">
          {garage.map((g) => {
            const m = motors.find((x) => x.id === g.motorId);
            return (
              <div key={g.id} className="card relative">
                <button
                  onClick={() => {
                    if (confirm(t.deleteConfirm)) {
                      removeStoreItem<GarageEntry>("mp_garage", g.id);
                      setGarage(readStore<GarageEntry[]>("mp_garage", []));
                      toast("Removed", "info");
                    }
                  }}
                  className="absolute top-3 right-3 btn-ghost p-1 rounded"
                  style={{ color: "var(--muted)" }}
                  title="Delete"
                >
                  <X className="w-4 h-4" />
                </button>
                <Link href={`/garage/${g.id}`} className="block">
                  <div className="font-bold text-lg mb-1">{g.nickname || (m ? `${m.brand} ${m.model}` : g.motorId)}</div>
                  <div style={{ color: "var(--muted)" }} className="text-sm">
                    {m ? `${m.brand} ${m.model}` : g.motorId} · {g.year}
                  </div>
                  {g.plate && <div className="text-xs mt-1 font-mono">{g.plate}</div>}
                  <div className="mt-3 text-sm">
                    <span style={{ color: "var(--muted)" }}>Current KM:</span>{" "}
                    <span className="font-semibold">{g.currentKm.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="mt-3 text-xs flex items-center gap-1" style={{ color: "var(--accent)" }}>
                    View detail <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {showAdd && (
        <AddMotorModal
          onClose={() => setShowAdd(false)}
          onAdd={(entry) => {
            pushStoreItem("mp_garage", entry);
            setGarage(readStore<GarageEntry[]>("mp_garage", []));
            setShowAdd(false);
            toast(t.addSuccess, "success");
          }}
        />
      )}
    </div>
  );
}

function AddMotorModal({ onClose, onAdd }: { onClose: () => void; onAdd: (e: GarageEntry) => void }) {
  const { t } = useApp();
  const [motorId, setMotorId] = useState(motors[0].id);
  const [nickname, setNickname] = useState("");
  const [plate, setPlate] = useState("");
  const [currentKm, setCurrentKm] = useState("0");
  const m = motors.find((x) => x.id === motorId)!;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: GarageEntry = {
      id: "g_" + Date.now().toString(36),
      motorId,
      nickname,
      plate,
      year: m.year,
      currentKm: parseInt(currentKm) || 0,
      addedAt: new Date().toISOString(),
    };
    onAdd(entry);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="card max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">{t.garage.add}</h2>
          <button onClick={onClose} className="btn-ghost p-1"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="label">{t.garage.selectMotor}</label>
            <select className="select" value={motorId} onChange={(e) => setMotorId(e.target.value)}>
              {motors.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.brand} {m.model} ({m.year})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">{t.garage.nickname}</label>
            <input className="input" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="Beat harian" />
          </div>
          <div>
            <label className="label">{t.garage.plate}</label>
            <input className="input" value={plate} onChange={(e) => setPlate(e.target.value)} placeholder="B 1234 XYZ" />
          </div>
          <div>
            <label className="label">Current KM</label>
            <input className="input" type="number" value={currentKm} onChange={(e) => setCurrentKm(e.target.value)} />
          </div>
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="btn btn-secondary flex-1">{t.common.cancel}</button>
            <button type="submit" className="btn flex-1">{t.garage.addBtn}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
