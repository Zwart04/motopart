"use client";
import { useEffect, useMemo, useState } from "react";
import { useApp } from "@/components/app-provider";
import { Calculator, Plus, Trash2, FileText, Download } from "lucide-react";
import { toast } from "@/components/toast";
import { logFinance } from "@/lib/finance";
import parts from "@/data/parts.json";
import type { Part } from "@/lib/types";

const partsList = parts as Part[];

type Line = { sku: string; qty: number; price: number; name: string };

export default function EstimatorPage() {
  const { t, mounted, isLoggedIn } = useApp();
  const [lines, setLines] = useState<Line[]>([]);
  const [laborHours, setLaborHours] = useState("1");
  const [laborRate, setLaborRate] = useState("50000");
  const [tax, setTax] = useState("10");
  const [discount, setDiscount] = useState("0");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!mounted) return;
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
  }, [mounted, isLoggedIn]);

  if (!mounted || !isLoggedIn) {
    return <div className="card text-center py-8">{t.common.loading}</div>;
  }

  const addPart = (sku: string) => {
    const p = partsList.find((x) => x.sku === sku);
    if (!p) return;
    setLines([...lines, { sku, qty: 1, price: p.price_idr, name: p.name }]);
  };

  const removeLine = (i: number) => {
    setLines(lines.filter((_, idx) => idx !== i));
  };

  const partsTotal = lines.reduce((acc, l) => acc + l.price * l.qty, 0);
  const laborTotal = (parseFloat(laborHours) || 0) * (parseFloat(laborRate) || 0);
  const subtotal = partsTotal + laborTotal;
  const discountAmt = subtotal * ((parseFloat(discount) || 0) / 100);
  const afterDiscount = subtotal - discountAmt;
  const taxAmt = afterDiscount * ((parseFloat(tax) || 0) / 100);
  const total = afterDiscount + taxAmt;

  const exportPDF = async () => {
    if (lines.length === 0 && laborTotal === 0) {
      toast("Add at least one part or labor hours", "warning");
      return;
    }
    try {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("MotoPart Invoice", 14, 18);
      doc.setFontSize(10);
      doc.text(`Date: ${new Date().toISOString().slice(0, 10)}`, 14, 26);
      doc.text(`Workshop: Workshop Estimate`, 14, 32);
      
      autoTable(doc, {
        startY: 40,
        head: [["SKU", "Part", "Qty", "Unit", "Total"]],
        body: lines.map((l) => [l.sku, l.name, String(l.qty), "Rp " + l.price.toLocaleString("id-ID"), "Rp " + (l.price * l.qty).toLocaleString("id-ID")]),
      });
      const finalY = (doc as any).lastAutoTable.finalY + 10;
      doc.setFontSize(11);
      doc.text(`Parts Total: Rp ${partsTotal.toLocaleString("id-ID")}`, 14, finalY);
      doc.text(`Labor (${laborHours}h @ Rp ${parseFloat(laborRate).toLocaleString("id-ID")}/h): Rp ${laborTotal.toLocaleString("id-ID")}`, 14, finalY + 6);
      doc.text(`Subtotal: Rp ${subtotal.toLocaleString("id-ID")}`, 14, finalY + 12);
      doc.text(`Discount (${discount}%): -Rp ${discountAmt.toLocaleString("id-ID")}`, 14, finalY + 18);
      doc.text(`Tax (${tax}%): +Rp ${taxAmt.toLocaleString("id-ID")}`, 14, finalY + 24);
      doc.setFontSize(13);
      doc.setFont(undefined as any, "bold");
      doc.text(`TOTAL: Rp ${Math.round(total).toLocaleString("id-ID")}`, 14, finalY + 32);
      
      doc.save(`motopart-invoice-${Date.now()}.pdf`);
      // log finance auto-bill
      logFinance({
        type: "auto-bill",
        category: "service invoice",
        description: `Invoice: ${lines.length} parts, ${laborHours}h labor`,
        amount: Math.round(total),
        source: "motopart:estimator",
      });
      toast("PDF exported + finance journal updated", "success");
    } catch (e) {
      toast("PDF export failed: " + String(e), "error");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <Calculator className="w-6 h-6" style={{ color: "var(--accent)" }} />
        {t.estimator.title}
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="card">
            <h2 className="font-semibold mb-3">{t.estimator.addPart}</h2>
            <select className="select" onChange={(e) => { if (e.target.value) { addPart(e.target.value); e.target.value = ""; } }} defaultValue="">
              <option value="">Select a part to add...</option>
              {partsList.map((p) => (
                <option key={p.sku} value={p.sku}>
                  {p.sku} - {p.name} (Rp {p.price_idr.toLocaleString("id-ID")})
                </option>
              ))}
            </select>

            {lines.length > 0 && (
              <table className="mt-4">
                <thead>
                  <tr>
                    <th>Part</th>
                    <th>{t.estimator.qty}</th>
                    <th>Unit</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l, i) => (
                    <tr key={i}>
                      <td>
                        <div className="font-mono text-xs" style={{ color: "var(--muted)" }}>{l.sku}</div>
                        <div>{l.name}</div>
                      </td>
                      <td>
                        <input type="number" className="input w-20" value={l.qty} onChange={(e) => {
                          const v = parseInt(e.target.value) || 1;
                          setLines(lines.map((x, idx) => idx === i ? { ...x, qty: v } : x));
                        }} min="1" />
                      </td>
                      <td>Rp {l.price.toLocaleString("id-ID")}</td>
                      <td className="font-semibold">Rp {(l.price * l.qty).toLocaleString("id-ID")}</td>
                      <td>
                        <button onClick={() => removeLine(i)} className="btn-ghost p-1 text-rose-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="card">
            <h2 className="font-semibold mb-3">Labor</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="label">{t.estimator.labor} (hours)</label>
                <input type="number" step="0.1" className="input" value={laborHours} onChange={(e) => setLaborHours(e.target.value)} />
              </div>
              <div>
                <label className="label">{t.estimator.hourlyRate}</label>
                <input type="number" className="input" value={laborRate} onChange={(e) => setLaborRate(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="font-semibold mb-3">Tax & Discount</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="label">{t.estimator.tax}</label>
                <input type="number" className="input" value={tax} onChange={(e) => setTax(e.target.value)} />
              </div>
              <div>
                <label className="label">{t.estimator.discount}</label>
                <input type="number" className="input" value={discount} onChange={(e) => setDiscount(e.target.value)} />
              </div>
            </div>
            <div className="mt-3">
              <label className="label">Notes (printed on invoice)</label>
              <textarea className="input" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card sticky top-20">
            <h2 className="font-semibold mb-3">Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: "var(--muted)" }}>{t.estimator.partsTotal}</span>
                <span>Rp {partsTotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: "var(--muted)" }}>{t.estimator.laborTotal}</span>
                <span>Rp {laborTotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between border-t pt-2" style={{ borderColor: "var(--border)" }}>
                <span style={{ color: "var(--muted)" }}>{t.estimator.subtotal}</span>
                <span>Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              {discountAmt > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount</span>
                  <span>-Rp {discountAmt.toLocaleString("id-ID")}</span>
                </div>
              )}
              {taxAmt > 0 && (
                <div className="flex justify-between">
                  <span style={{ color: "var(--muted)" }}>Tax</span>
                  <span>+Rp {taxAmt.toLocaleString("id-ID")}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold border-t pt-2 mt-2" style={{ borderColor: "var(--border)" }}>
                <span>{t.estimator.total}</span>
                <span>Rp {Math.round(total).toLocaleString("id-ID")}</span>
              </div>
            </div>
            <button onClick={exportPDF} className="btn w-full mt-4">
              <Download className="w-4 h-4" /> {t.estimator.exportPdf}
            </button>
            <button onClick={() => { setLines([]); setLaborHours("1"); setTax("10"); setDiscount("0"); setNotes(""); }} className="btn btn-secondary w-full mt-2">
              {t.estimator.reset}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
