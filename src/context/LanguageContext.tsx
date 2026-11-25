"use client";

import React, { createContext, useContext, useState, useEffect, useTransition } from "react";
import type { Locale } from "@/types/content";

interface LanguageContextType {
  locale: Locale;
  pendingLocale: Locale | null;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  isArmenian: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    try {
      const savedStorage = localStorage.getItem("deorganica_locale");
      const cookieMatch = document.cookie.match(/(?:^|;\s*)deorganica_locale=(en|hy)(?:;|$)/);
      const saved = (savedStorage === "en" || savedStorage === "hy"
        ? savedStorage
        : cookieMatch?.[1]) as Locale | undefined;
      if (saved === "en" || saved === "hy") {
        setLocaleState(saved);
        document.documentElement.lang = saved;
        document.cookie = `deorganica_locale=${saved}; path=/; max-age=31536000; SameSite=Lax`;
      }
    } catch {
      // localStorage may fail in private mode
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;
    setPendingLocale(newLocale);
    document.documentElement.lang = newLocale;
    try {
      localStorage.setItem("deorganica_locale", newLocale);
      document.cookie = `deorganica_locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore
    }
    startTransition(() => {
      setLocaleState(newLocale);
      setPendingLocale(null);
    });
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "hy" : "en");
  };

  return (
    <LanguageContext.Provider
      value={{
        locale,
        pendingLocale,
        setLocale,
        toggleLocale,
        isArmenian: locale === "hy",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
