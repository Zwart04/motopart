// Auth store — localStorage based, Boss 2026 policy: never wipe on logout
export type User = { id: string; email: string; name: string; workshop?: string; createdAt: string };

const USER_KEY = "mp_user";
const USERS_KEY = "mp_users";

const DEFAULT_USER: User = {
  id: "u_demo",
  email: "[email protected]",
  name: "Demo User",
  workshop: "Demo Workshop",
  createdAt: "2026-09-01T00:00:00.000Z",
};

export function getStoredUsers(): User[] {
  if (typeof window === "undefined") return [DEFAULT_USER];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify([DEFAULT_USER]));
      return [DEFAULT_USER];
    }
    return JSON.parse(raw);
  } catch {
    return [DEFAULT_USER];
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
      // never wipe; only set if missing
      localStorage.setItem(USER_KEY, JSON.stringify(DEFAULT_USER));
      return DEFAULT_USER;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USER;
  }
}

export function login(email: string, password: string): { ok: boolean; user?: User; error?: string } {
  if (!email || !password) return { ok: false, error: "missing" };
  const users = getStoredUsers();
  const u = users.find((x) => x.email.toLowerCase() === email.toLowerCase());
  if (!u) return { ok: false, error: "invalid" };
  // mock: any password matches after register; for new login we just verify email
  localStorage.setItem(USER_KEY, JSON.stringify(u));
  return { ok: true, user: u };
}

export function register(email: string, password: string, name: string, workshop?: string): { ok: boolean; user?: User; error?: string } {
  if (!email || !password) return { ok: false, error: "missing" };
  if (password.length < 6) return { ok: false, error: "short" };
  const users = getStoredUsers();
  if (users.find((x) => x.email.toLowerCase() === email.toLowerCase())) return { ok: false, error: "exists" };
  const u: User = {
    id: "u_" + Date.now().toString(36),
    email,
    name,
    workshop: workshop || name,
    createdAt: new Date().toISOString(),
  };
  users.push(u);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(USER_KEY, JSON.stringify(u));
  return { ok: true, user: u };
}

export function logout(): void {
  if (typeof window === "undefined") return;
  // NEVER wipe users; only clear current
  localStorage.removeItem(USER_KEY);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
