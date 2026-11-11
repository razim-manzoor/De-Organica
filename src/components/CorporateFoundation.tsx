"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { ShieldCheck, Workflow, Globe2, Clock4, Building, MapPin } from "lucide-react";

const ICON_COMPONENTS: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-brand-olive" />,
  Workflow: <Workflow className="w-6 h-6 text-brand-olive" />,
  Globe2: <Globe2 className="w-6 h-6 text-brand-olive" />,
  Clock4: <Clock4 className="w-6 h-6 text-brand-olive" />,
};

export function CorporateFoundation() {
  const { locale } = useLanguage();
  const isHy = locale === "hy";

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-stone-100 text-brand-forest text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-stone-300">
            <MapPin className="w-3.5 h-3.5 text-brand-olive" />
            <span>{isHy ? "Երևան, Հայաստան" : "Institutional Provenance"}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
            {isHy ? deorganicaConfig.corporateFoundation.title_hy : deorganicaConfig.corporateFoundation.title_en}
          </h2>

          <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
            {isHy ? deorganicaConfig.corporateFoundation.subtitle_hy : deorganicaConfig.corporateFoundation.subtitle_en}
          </p>
        </div>

        {/* 4 Trust Signals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {deorganicaConfig.corporateFoundation.signals.map((signal, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-brand-stone-50 border border-brand-stone-200 hover:border-brand-olive/50 hover:shadow-md transition-all space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-brand-stone-200 flex items-center justify-center shadow-2xs">
                {ICON_COMPONENTS[signal.icon] || <ShieldCheck className="w-6 h-6 text-brand-olive" />}
              </div>

              <h3 className="font-serif text-lg font-bold text-brand-forest">
                {isHy ? signal.title_hy : signal.title_en}
              </h3>

              <p className="text-xs text-brand-ink-muted leading-relaxed">
                {isHy ? signal.desc_hy : signal.desc_en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
