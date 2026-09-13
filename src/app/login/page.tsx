"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/components/app-provider";
import { login, isValidEmail } from "@/lib/auth";
import { toast } from "@/components/toast";
import { LogIn, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const { t, setLoggedIn } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!email || !password) {
      setErr(t.auth.errMissing);
      return;
    }
    if (!isValidEmail(email)) {
      setErr(t.auth.errInvalid);
      return;
    }
    const r = login(email, password);
    if (!r.ok) {
      setErr(t.auth.errInvalid);
      return;
    }
    setLoggedIn(true);
    toast("Welcome back, " + (r.user?.name || "user"), "success");
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--accent)" }}>
            <LogIn className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">{t.auth.loginTitle}</h1>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">{t.auth.email}</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted)" }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input pl-9"
                placeholder="[email protected]"
                autoComplete="email"
                suppressHydrationWarning
              />
            </div>
          </div>
          <div>
            <label className="label">{t.auth.password}</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted)" }} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input pl-9"
                placeholder="********"
                autoComplete="current-password"
                suppressHydrationWarning
              />
            </div>
          </div>
          {err && <div className="text-sm" style={{ color: "#dc2626" }}>{err}</div>}
          <button type="submit" className="btn w-full">
            {t.auth.submitLogin}
          </button>
        </form>
        <p className="text-sm text-center mt-4" style={{ color: "var(--muted)" }}>
          {t.auth.noAccount}{" "}
          <Link href="/register" style={{ color: "var(--accent)" }}>
            {t.auth.switchToRegister}
          </Link>
        </p>
        {mounted && (
          <p className="text-xs text-center mt-3" style={{ color: "var(--muted)" }}>
            Demo: <span className="font-mono">[email protected]</span> / any password
          </p>
        )}
      </div>
    </div>
  );
}
