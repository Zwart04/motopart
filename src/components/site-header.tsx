"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "./app-provider";
import { Wrench, LayoutDashboard, Bike, Boxes, Stethoscope, CalendarClock, Calculator, BarChart3, LogIn, LogOut, Globe, Share2 } from "lucide-react";

export function SiteHeader() {
  const { t, lang, setLang, isLoggedIn, setLoggedIn } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  const onLogout = () => {
    try {
      localStorage.removeItem("mp_user");
    } catch {}
    setLoggedIn(false);
    router.push("/");
  };

  const links = [
    { href: "/dashboard", label: t.nav.dashboard, icon: LayoutDashboard, auth: true },
    { href: "/garage", label: t.nav.garage, icon: Bike, auth: true },
    { href: "/parts", label: t.nav.parts, icon: Boxes, auth: false },
    { href: "/diagnostic", label: t.nav.diagnostic, icon: Stethoscope, auth: false },
    { href: "/service", label: t.nav.service, icon: CalendarClock, auth: true },
    { href: "/estimator", label: t.nav.estimator, icon: Calculator, auth: true },
    { href: "/analytics", label: t.nav.analytics, icon: BarChart3, auth: true },
  ];

  return (
    <header className="sticky top-0 z-40 border-b" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg" style={{ color: "var(--fg)" }}>
          <Wrench className="w-5 h-5" style={{ color: "var(--accent)" }} />
          {t.appName}
        </Link>
        <nav className="flex items-center gap-1 flex-wrap ml-2">
          {links.map((l) => {
            if (l.auth && !isLoggedIn) return null;
            const Active = pathname === l.href || pathname?.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={"px-2.5 py-1.5 rounded-md text-sm flex items-center gap-1.5 " + (Active ? "font-semibold" : "")}
                style={{
                  background: Active ? "var(--accent)" : "transparent",
                  color: Active ? "white" : "var(--fg)",
                }}
              >
                <l.icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{l.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "id" : "en")}
            className="btn-ghost text-xs font-semibold flex items-center gap-1 px-2 py-1.5 rounded-md"
            style={{ border: "1px solid var(--border)" }}
            title="Switch language"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "ID" : "EN"}
          </button>
          {isLoggedIn ? (
            <button onClick={onLogout} className="btn-secondary text-xs flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" />
              {t.nav.logout}
            </button>
          ) : (
            <Link href="/login" className="btn text-xs flex items-center gap-1">
              <LogIn className="w-3.5 h-3.5" />
              {t.nav.login}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
