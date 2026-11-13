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
        "inline-flex items-center rounded-full border border-brand-stone-300 bg-white/95 p-0.5 shadow-sm",
        className
      )}
      role="group"
      aria-label="Language toggle"
    >
      <Globe className="w-3.5 h-3.5 text-brand-olive-text ml-2.5 mr-1 hidden sm:block shrink-0" aria-hidden="true" />
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "min-h-[36px] min-w-[40px] px-3 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 cursor-pointer",
          locale === "en"
            ? "bg-brand-forest text-white shadow-sm"
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
          "min-h-[36px] min-w-[44px] px-3 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 cursor-pointer",
          locale === "hy"
            ? "bg-brand-forest text-white shadow-sm"
            : "text-brand-ink-muted hover:text-brand-forest"
        )}
      >
        ՀԱՅ
      </button>
    </div>
  );
}
