"use client";
import { useApp } from "./app-provider";
import { Wrench } from "lucide-react";

export function SiteFooter() {
  const { t } = useApp();
  return (
    <footer className="mt-12 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm" style={{ color: "var(--muted)" }}>
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4" style={{ color: "var(--accent)" }} />
          <span className="font-semibold" style={{ color: "var(--fg)" }}>{t.appName}</span>
          <span>· {t.tagline}</span>
        </div>
        <div>Local-first workshop OS · No tracking · No cloud lock-in</div>
      </div>
    </footer>
  );
}
