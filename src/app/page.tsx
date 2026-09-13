"use client";
import Link from "next/link";
import { useApp } from "@/components/app-provider";
import { Boxes, Stethoscope, Wrench, CalendarClock, Calculator, TrendingUp, Camera, Share2, ArrowRight, Bike } from "lucide-react";

export default function HomePage() {
  const { t, isLoggedIn } = useApp();

  const features = [
    { icon: Bike, key: "f1" as const, color: "#f97316" },
    { icon: Boxes, key: "f2" as const, color: "#06b6d4" },
    { icon: Stethoscope, key: "f3" as const, color: "#10b981" },
    { icon: CalendarClock, key: "f4" as const, color: "#8b5cf6" },
    { icon: Calculator, key: "f5" as const, color: "#f59e0b" },
    { icon: TrendingUp, key: "f6" as const, color: "#ec4899" },
    { icon: Camera, key: "f7" as const, color: "#3b82f6" },
    { icon: Share2, key: "f8" as const, color: "#84cc16" },
  ];

  return (
    <div>
      <section className="card text-center py-12 px-4" style={{ background: "linear-gradient(135deg, var(--card) 0%, var(--bg) 100%)" }}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4" style={{ background: "var(--accent)" }}>
          <Wrench className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--fg)" }}>
          {t.landing.heroTitle}
        </h1>
        <p className="max-w-2xl mx-auto mb-6" style={{ color: "var(--muted)" }}>
          {t.landing.heroSub}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href={isLoggedIn ? "/garage" : "/register"} className="btn text-base px-5 py-2.5">
            {t.landing.ctaPrimary} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/parts" className="btn btn-secondary text-base px-5 py-2.5">
            {t.landing.ctaSecondary}
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <div className="grid-cards">
          {features.map((f) => (
            <div key={f.key} className="card hover:shadow-md transition-shadow">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
                style={{ background: f.color + "20", color: f.color }}
              >
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-1.5">{t.features[f.key]}</h3>
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                {t.features[(f.key + "d") as keyof typeof t.features]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 card">
        <h2 className="text-lg font-semibold mb-3">Why MotoPart?</h2>
        <ul className="grid sm:grid-cols-2 gap-3 text-sm">
          <li className="flex gap-2">
            <span className="badge badge-orange shrink-0 mt-0.5">Local-first</span>
            <span style={{ color: "var(--muted)" }}>All data stays in your browser. No backend, no accounts to lose.</span>
          </li>
          <li className="flex gap-2">
            <span className="badge badge-info shrink-0 mt-0.5">12 Motors</span>
            <span style={{ color: "var(--muted)" }}>Beat, Vario, NMAX, Aerox, PCX, ADV, CBR, Ninja, Satria, Supra, Mio, Scoopy.</span>
          </li>
          <li className="flex gap-2">
            <span className="badge badge-success shrink-0 mt-0.5">80+ Parts</span>
            <span style={{ color: "var(--muted)" }}>Engine, brake, drivetrain, electrical, body, suspension, tire, CVT.</span>
          </li>
          <li className="flex gap-2">
            <span className="badge badge-warning shrink-0 mt-0.5">No Tracking</span>
            <span style={{ color: "var(--muted)" }}>Zero pixels, zero analytics scripts. UTM via URL param, kept locally.</span>
          </li>
        </ul>
      </section>
    </div>
  );
}
