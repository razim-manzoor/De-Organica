"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={cn(
        "inline-flex items-center rounded-full p-0.5 border border-brand-stone-300 bg-brand-stone-100/80 backdrop-blur-sm text-xs font-medium transition-all shadow-sm",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all",
          locale === "en"
            ? "bg-brand-forest text-white shadow-xs"
            : "text-brand-ink-muted hover:text-brand-forest"
        )}
      >
        EN
      </button>
      <span className="text-brand-stone-400 select-none px-0.5">/</span>
      <button
        type="button"
        onClick={() => setLocale("hy")}
        aria-pressed={locale === "hy"}
        className={cn(
          "px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition-all",
          locale === "hy"
            ? "bg-brand-forest text-white shadow-xs"
            : "text-brand-ink-muted hover:text-brand-forest font-serif"
        )}
      >
        ՀԱՅ
      </button>
    </div>
  );
}
