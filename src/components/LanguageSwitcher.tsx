"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-xl border border-brand-stone-200/90 bg-brand-stone-100/80 p-0.5",
        className
      )}
      role="group"
      aria-label="Language toggle"
    >
      <Globe className="w-3.5 h-3.5 text-brand-olive-text ml-2 mr-1 hidden sm:block shrink-0" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "min-h-[30px] min-w-[34px] px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all duration-200 cursor-pointer",
          locale === "en"
            ? "bg-white text-brand-forest shadow-xs font-bold"
            : "text-brand-ink-muted hover:text-brand-forest"
        )}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("hy")}
        aria-pressed={locale === "hy"}
        className={cn(
          "min-h-[30px] min-w-[38px] px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all duration-200 cursor-pointer",
          locale === "hy"
            ? "bg-white text-brand-forest shadow-xs font-bold"
            : "text-brand-ink-muted hover:text-brand-forest"
        )}
      >
        ՀԱՅ
      </button>
    </div>
  );
}
