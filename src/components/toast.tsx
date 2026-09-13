// Toast notification — pure DOM/CSS, no library
"use client";
import { useEffect, useState, useCallback } from "react";

type Toast = { id: number; message: string; type: "info" | "success" | "warning" | "error" };

let push: ((t: Omit<Toast, "id">) => void) | null = null;
let counter = 0;

export function toast(message: string, type: Toast["type"] = "info") {
  if (push) push({ message, type });
}

export function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushFn = useCallback((t: Omit<Toast, "id">) => {
    const id = ++counter;
    setToasts((cur) => [...cur, { ...t, id }]);
    setTimeout(() => {
      setToasts((cur) => cur.filter((x) => x.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    push = pushFn;
    return () => {
      push = null;
    };
  }, [pushFn]);

  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={
            "pointer-events-auto px-4 py-3 rounded-lg shadow-lg text-sm font-medium animate-in slide-in-from-right " +
            (t.type === "success"
              ? "bg-emerald-600 text-white"
              : t.type === "error"
                ? "bg-rose-600 text-white"
                : t.type === "warning"
                  ? "bg-amber-500 text-white"
                  : "bg-slate-800 text-white")
          }
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
