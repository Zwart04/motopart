"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { dict, type Lang, type Dict } from "@/lib/i18n";
import { captureSourceFromUrl } from "@/lib/attribution";

type AppContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  mounted: boolean;
  isLoggedIn: boolean;
  setLoggedIn: (v: boolean) => void;
};

const AppContext = createContext<AppContextType | null>(null);

const LANG_KEY = "mp_lang";

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setLoggedInState] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(LANG_KEY) as Lang | null;
      if (stored === "en" || stored === "id") setLangState(stored);
      const user = localStorage.getItem("mp_user");
      setLoggedInState(!!user);
      captureSourceFromUrl();
    } catch {
      // ignore
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      // ignore
    }
  };

  const t = dict[lang];

  return (
    <AppContext.Provider value={{ lang, setLang, t, mounted, isLoggedIn, setLoggedIn: setLoggedInState }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
