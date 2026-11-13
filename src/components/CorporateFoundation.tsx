"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/SiteDataContext";
import { ShieldCheck } from "lucide-react";
import { getCmsIcon } from "@/components/icons";

export function CorporateFoundation() {
  const { locale } = useLanguage();
  const { siteSettings } = useSiteData();
  const isHy = locale === "hy";
  const foundation = siteSettings.corporateFoundation;

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-olive" />
            <span>
              {isHy ? foundation.eyebrow_hy : foundation.eyebrow_en}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
            {isHy ? foundation.title_hy : foundation.title_en}
          </h2>

          <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
            {isHy ? foundation.subtitle_hy : foundation.subtitle_en}
          </p>
        </div>

        {/* 4 Governance & Credibility Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foundation.signals.map((signal, idx) => {
            const Icon = getCmsIcon(signal.icon, ShieldCheck);
            const indexLabel = `0${idx + 1}`;
            return (
              <div
                key={signal.title_en}
                className="group rounded-3xl bg-brand-stone-50 border border-brand-stone-200 p-7 flex flex-col justify-between hover-lift hover:bg-white hover:shadow-xl hover:border-brand-olive/40 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-stone-100 border border-brand-stone-200 flex items-center justify-center shadow-sm group-hover:bg-brand-forest transition-colors duration-200">
                      <Icon className="w-5 h-5 text-brand-forest group-hover:text-white transition-colors duration-200" />
                    </div>
                    <span className="font-serif text-2xl font-bold text-brand-olive-text">
                      {indexLabel}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-forest mb-2.5 leading-snug">
                    {isHy ? signal.title_hy : signal.title_en}
                  </h3>

                  <p className="text-xs sm:text-sm text-brand-ink-muted leading-relaxed">
                    {isHy ? signal.desc_hy : signal.desc_en}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-brand-stone-200/80">
                  <span className="inline-block text-xs font-semibold text-brand-forest bg-brand-stone-100 border border-brand-stone-200 px-3 py-1 rounded-full leading-snug">
                    {isHy ? "ՍՊԸ Հավաստագրված · Երևան" : "Verified Operations · Yerevan"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
