// Generic typed localStorage store with SSR safety
export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // quota or serialization error
  }
}

export function pushStoreItem<T>(key: string, item: T): void {
  const arr = readStore<T[]>(key, []);
  arr.push(item);
  writeStore(key, arr);
}

export function removeStoreItem<T extends { id: string }>(key: string, id: string): void {
  const arr = readStore<T[]>(key, []);
  writeStore(key, arr.filter((x) => x.id !== id));
}

export function updateStoreItem<T extends { id: string }>(key: string, id: string, patch: Partial<T>): void {
  const arr = readStore<T[]>(key, []);
  const idx = arr.findIndex((x) => x.id === id);
  if (idx >= 0) {
    arr[idx] = { ...arr[idx], ...patch };
    writeStore(key, arr);
  }
}
