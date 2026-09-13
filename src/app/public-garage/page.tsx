"use client";
import { useEffect, useState } from "react";
import { useApp } from "@/components/app-provider";
import { readStore } from "@/lib/store";
import { listFinance } from "@/lib/finance";
import { getSource } from "@/lib/attribution";
import type { GarageEntry, ServiceLog } from "@/lib/types";
import motorsData from "@/data/motors.json";
import type { Motor } from "@/lib/types";
import { Bike, Wrench, Share2, Copy, Mail, TrendingUp } from "lucide-react";
import { toast } from "@/components/toast";

const motors = motorsData as Motor[];

export default function PublicGaragePage() {
  const { t, mounted } = useApp();
  const [slug, setSlug] = useState("motopart");
  const [garage, setGarage] = useState<GarageEntry[]>([]);
  const [logs, setLogs] = useState<ServiceLog[]>([]);
  const [spend, setSpend] = useState<number>(0);
  const [source, setSource] = useState<string>("direct");

  useEffect(() => {
    if (!mounted) return;
    setGarage(readStore<GarageEntry[]>("mp_garage", []));
    setLogs(readStore<ServiceLog[]>("mp_service_logs", []));
    const fin = listFinance();
    setSpend(fin.reduce((a, b) => a + b.amount, 0));
    const s = getSource();
    if (s) setSource(s.source);
  }, [mounted]);

  if (!mounted) {
    return <div className="card text-center py-8">{t.common.loading}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="card text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-3" style={{ background: "var(--accent)" }}>
          <Bike className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl font-bold">Public Garage: {slug}</h1>
        <p style={{ color: "var(--muted)" }} className="text-sm mt-1">
          Public shareable view powered by MotoPart. UTM: <span className="font-mono">{source}</span>
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="card text-center">
          <Bike className="w-6 h-6 mx-auto mb-2" style={{ color: "#f97316" }} />
          <div className="text-2xl font-bold">{garage.length}</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>Motorcycles</div>
        </div>
        <div className="card text-center">
          <Wrench className="w-6 h-6 mx-auto mb-2" style={{ color: "#10b981" }} />
          <div className="text-2xl font-bold">{logs.length}</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>Services Logged</div>
        </div>
        <div className="card text-center">
          <TrendingUp className="w-6 h-6 mx-auto mb-2" style={{ color: "#8b5cf6" }} />
          <div className="text-2xl font-bold">Rp {spend.toLocaleString("id-ID")}</div>
          <div className="text-xs" style={{ color: "var(--muted)" }}>Total Spend</div>
        </div>
      </div>

      {garage.length > 0 && (
        <div className="card">
          <h2 className="font-semibold mb-3">Motorcycles</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {garage.map((g) => {
              const m = motors.find((x) => x.id === g.motorId);
              return (
                <div key={g.id} className="card" style={{ background: "var(--bg)" }}>
                  <div className="font-bold text-lg mb-1">{g.nickname || (m ? `${m.brand} ${m.model}` : g.motorId)}</div>
                  <div style={{ color: "var(--muted)" }} className="text-sm">
                    {m ? `${m.brand} ${m.model}` : g.motorId} · {g.year}
                  </div>
                  <div className="text-sm mt-1">{g.currentKm.toLocaleString("id-ID")} KM</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="card">
        <h2 className="font-semibold mb-3 flex items-center gap-2">
          <Share2 className="w-4 h-4" style={{ color: "var(--accent)" }} />
          Share this garage
        </h2>
        <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
          Help other mechanics find MotoPart. Share via WhatsApp (manual deep-link, no API) or email.
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `Check out my MotoPart workshop garage (${garage.length} motorcycles, ${logs.length} services, ${motors.length} models supported). https://motopart.zwart.qzz.io`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" /> Share to WhatsApp
          </a>
          <a
            href={`mailto:?subject=MotoPart%20Workshop&body=${encodeURIComponent(
              `Check out my MotoPart workshop garage (${garage.length} motorcycles, ${logs.length} services, ${motors.length} models supported). https://motopart.zwart.qzz.io`
            )}`}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Mail className="w-4 h-4" /> Share via Email
          </a>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(`https://motopart.zwart.qzz.io/public-garage`);
              toast("Copied to clipboard", "success");
            }}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Copy className="w-4 h-4" /> Copy Link
          </button>
        </div>
        <div className="text-xs mt-3" style={{ color: "var(--muted)" }}>
          Source tracking: UTM captured on first visit and stored in localStorage. No third-party scripts. No pixels.
        </div>
      </div>
    </div>
  );
}