"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApp } from "@/components/app-provider";
import { register, isValidEmail } from "@/lib/auth";
import { toast } from "@/components/toast";
import { UserPlus, Mail, Lock, User } from "lucide-react";

export default function RegisterPage() {
  const { t, setLoggedIn } = useApp();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workshop, setWorkshop] = useState("");
  const [err, setErr] = useState("");
  useEffect(() => {}, []);

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
    if (password.length < 6) {
      setErr(t.auth.errShort);
      return;
    }
    const r = register(email, password, name || email.split("@")[0], workshop);
    if (!r.ok) {
      if (r.error === "exists") setErr(t.auth.errExists);
      else if (r.error === "short") setErr(t.auth.errShort);
      else setErr(t.auth.errInvalid);
      return;
    }
    setLoggedIn(true);
    toast("Account created. Welcome, " + (r.user?.name || "user"), "success");
    router.push("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "var(--accent)" }}>
            <UserPlus className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">{t.auth.registerTitle}</h1>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="label">{t.auth.name}</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--muted)" }} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input pl-9"
                placeholder="Pak Budi"
                suppressHydrationWarning
              />
            </div>
          </div>
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
                autoComplete="new-password"
                suppressHydrationWarning
              />
            </div>
          </div>
          <div>
            <label className="label">{t.auth.name} (Workshop)</label>
            <input
              value={workshop}
              onChange={(e) => setWorkshop(e.target.value)}
              className="input"
              placeholder="Bengkel Sumber Rezeki"
              suppressHydrationWarning
            />
          </div>
          {err && <div className="text-sm" style={{ color: "#dc2626" }}>{err}</div>}
          <button type="submit" className="btn w-full">
            {t.auth.submitRegister}
          </button>
        </form>
        <p className="text-sm text-center mt-4" style={{ color: "var(--muted)" }}>
          {t.auth.haveAccount}{" "}
          <Link href="/login" style={{ color: "var(--accent)" }}>
            {t.auth.switchToLogin}
          </Link>
        </p>
      </div>
    </div>
  );
}
