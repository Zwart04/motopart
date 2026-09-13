"use client";
import { useEffect, useState } from "react";
import { useApp } from "@/components/app-provider";
import { Stethoscope, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "@/components/toast";
import { readStore, writeStore, pushStoreItem } from "@/lib/store";
import { logFinance } from "@/lib/finance";
import diagnostics from "@/data/diagnostics.json";
import parts from "@/data/parts.json";
import type { DiagnosticResult } from "@/lib/types";
import type { Part } from "@/lib/types";

type TreeNode = {
  question: string;
  yes: { cause: string; parts_to_inspect: string[]; labor_hours: number; severity: "low" | "medium" | "high" } | TreeNode;
  no: { cause: string; parts_to_inspect: string[]; labor_hours: number; severity: "low" | "medium" | "high" } | TreeNode;
};

const partsList = parts as Part[];

export default function DiagnosticPage() {
  const { t, mounted } = useApp();
  const [symptomId, setSymptomId] = useState<string | null>(null);
  const [path, setPath] = useState<string[]>([]);
  const [history, setHistory] = useState<DiagnosticResult[]>([]);

  useEffect(() => {
    if (!mounted) return;
    setHistory(readStore<DiagnosticResult[]>("mp_diagnostics", []));
  }, [mounted]);

  if (!mounted) {
    return <div className="card text-center py-8">{t.common.loading}</div>;
  }

  if (!symptomId) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Stethoscope className="w-6 h-6" style={{ color: "var(--accent)" }} />
          {t.diagnostic.title}
        </h1>
        <p style={{ color: "var(--muted)" }}>{t.diagnostic.selectSymptom}</p>
        <div className="grid-cards">
          {diagnostics.map((d) => (
            <button
              key={d.id}
              onClick={() => { setSymptomId(d.id); setPath([]); }}
              className="card text-left hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs mb-1" style={{ color: "var(--muted)" }}>{d.category}</div>
                  <h3 className="font-semibold">{d.symptom}</h3>
                </div>
                <ArrowRight className="w-4 h-4" style={{ color: "var(--accent)" }} />
              </div>
            </button>
          ))}
        </div>
        {history.length > 0 && (
          <div className="card">
            <h2 className="font-semibold mb-3">Recent Diagnoses</h2>
            <ul className="space-y-2">
              {history.slice(0, 5).map((h) => (
                <li key={h.id} className="text-sm border-b pb-2" style={{ borderColor: "var(--border)" }}>
                  <div className="font-semibold">{h.symptomLabel}</div>
                  <div style={{ color: "var(--muted)" }} className="text-xs">
                    {h.cause} · {h.savedAt.slice(0, 10)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  const diag = diagnostics.find((d) => d.id === symptomId)!;
  let node: any = diag.root;
  for (const choice of path) {
    node = node[choice];
    if (!node.question) break;
  }

  const isLeaf = !node.question;

  const save = () => {
    if (!isLeaf) return;
    const r: DiagnosticResult = {
      id: "d_" + Date.now().toString(36),
      symptomId: diag.id,
      symptomLabel: diag.symptom,
      cause: node.cause,
      partsToInspect: node.parts_to_inspect,
      laborHours: node.labor_hours,
      severity: node.severity,
      savedAt: new Date().toISOString(),
    };
    pushStoreItem("mp_diagnostics", r);
    // log finance auto-task
    const partPrices = node.parts_to_inspect.map((sku: string) => partsList.find((p) => p.sku === sku)?.price_idr || 0);
    const partsTotal = partPrices.reduce((a: number, b: number) => a + b, 0);
    const laborRate = 50000;
    const est = partsTotal + node.labor_hours * laborRate;
    logFinance({
      type: "auto-task",
      category: "diagnostic",
      description: `Diagnosis: ${diag.symptom} - ${node.cause}`,
      amount: est,
      source: "motopart:diagnostic",
    });
    setHistory(readStore<DiagnosticResult[]>("mp_diagnostics", []));
    toast("Saved + finance journal updated", "success");
  };

  if (isLeaf) {
      // @ts-ignore
      const partPrices = node.parts_to_inspect.map((sku: string) => {
        const p = partsList.find((x) => x.sku === sku);
        return { sku, name: p?.name || sku, price: p?.price_idr || 0 };
      });
      const partsTotal = partPrices.reduce((a: number, b: { price: number }) => a + b.price, 0);
    const est = partsTotal + node.labor_hours * 50000;
    return (
      <div className="space-y-4">
        <button onClick={() => { setSymptomId(null); setPath([]); }} className="text-sm" style={{ color: "var(--accent)" }}>
          Back to symptoms
        </button>
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-6 h-6" style={{ color: "#10b981" }} />
            <h1 className="text-xl font-bold">{t.diagnostic.result}</h1>
          </div>
          <div className="mb-4">
            <div className="text-xs" style={{ color: "var(--muted)" }}>{t.diagnostic.probableCause}</div>
            <div className="text-lg font-semibold">{node.cause}</div>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            <div className="card text-center" style={{ background: "var(--bg)" }}>
              <div className="text-xs" style={{ color: "var(--muted)" }}>{t.diagnostic.severity}</div>
              <span className={"badge mt-1 " + (node.severity === "high" ? "badge-danger" : node.severity === "medium" ? "badge-warning" : "badge-success")}>
                {node.severity === "high" ? t.diagnostic.severityHigh : node.severity === "medium" ? t.diagnostic.severityMedium : t.diagnostic.severityLow}
              </span>
            </div>
            <div className="card text-center" style={{ background: "var(--bg)" }}>
              <div className="text-xs" style={{ color: "var(--muted)" }}>{t.diagnostic.laborHours}</div>
              <div className="font-bold text-lg">{node.labor_hours}h</div>
            </div>
            <div className="card text-center" style={{ background: "var(--bg)" }}>
              <div className="text-xs" style={{ color: "var(--muted)" }}>{t.diagnostic.estCost}</div>
              <div className="font-bold text-lg">Rp {Math.round(est).toLocaleString("id-ID")}</div>
            </div>
          </div>
          <h3 className="font-semibold mb-2">{t.diagnostic.partsToInspect}</h3>
          <ul className="space-y-1">
            {partPrices.map((p: { sku: string; price: number }) => (
                              <li key={p.sku} className="flex justify-between p-2 rounded" style={{ background: "var(--bg)" }}>
                                <div>
                                  <div className="font-mono text-xs" style={{ color: "var(--muted)" }}>{p.sku}</div>
                                  <div className="text-sm">{p.sku}</div>
                                </div>
                                <div className="text-sm font-semibold">Rp {p.price.toLocaleString("id-ID")}</div>
                              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-2">
            <button onClick={save} className="btn flex-1">{t.diagnostic.saveToHistory}</button>
            <button onClick={() => { setSymptomId(null); setPath([]); }} className="btn btn-secondary">Restart</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button onClick={() => { setSymptomId(null); setPath([]); }} className="text-sm" style={{ color: "var(--accent)" }}>
        Back to symptoms
      </button>
      <div className="card">
        <div className="text-xs mb-2" style={{ color: "var(--muted)" }}>
          {diag.symptom} · Question {path.length + 1}
        </div>
        <h1 className="text-xl font-bold mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5" style={{ color: "var(--accent)" }} />
          {node.question}
        </h1>
        <div className="grid sm:grid-cols-2 gap-3">
          <button onClick={() => setPath([...path, "yes"])} className="btn py-3 text-base">
            {t.diagnostic.yes}
          </button>
          <button onClick={() => setPath([...path, "no"])} className="btn btn-secondary py-3 text-base">
            {t.diagnostic.no}
          </button>
        </div>
        {path.length > 0 && (
          <button onClick={() => setPath(path.slice(0, -1))} className="mt-3 text-xs" style={{ color: "var(--muted)" }}>
            ← Previous question
          </button>
        )}
      </div>
    </div>
  );
}
