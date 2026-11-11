"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { ShieldCheck, Workflow, Globe2, Clock4, Building, MapPin, Sparkles } from "lucide-react";

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
    <section className="py-20 lg:py-28 bg-brand-stone-100/60 border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-olive" />
            <span>{isHy ? "Կորպորատիվ Հիմնասյուներ" : "Corporate Trust & Foundation"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
            {isHy ? deorganicaConfig.corporateFoundation.title_hy : deorganicaConfig.corporateFoundation.title_en}
          </h2>

          <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
            {isHy ? deorganicaConfig.corporateFoundation.subtitle_hy : deorganicaConfig.corporateFoundation.subtitle_en}
          </p>
        </div>

        {/* 4 Trust Signals Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {deorganicaConfig.corporateFoundation.signals.map((signal, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-white border border-brand-stone-200/90 hover:border-brand-olive/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-stone-100 border border-brand-stone-200 flex items-center justify-center shadow-2xs group-hover:bg-brand-forest group-hover:text-white transition-colors duration-300 mb-6">
                  {ICON_COMPONENTS[signal.icon] || <ShieldCheck className="w-6 h-6 text-brand-olive" />}
                </div>

                <h3 className="font-serif text-lg font-bold text-brand-forest mb-2 group-hover:text-brand-forest-deep transition-colors">
                  {isHy ? signal.title_hy : signal.title_en}
                </h3>

                <p className="text-xs text-brand-ink-muted leading-relaxed">
                  {isHy ? signal.desc_hy : signal.desc_en}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-brand-olive">
                <span>0{i + 1}</span>
                <span className="w-4 h-px bg-brand-olive/40" />
                <span className="uppercase tracking-wider">Institutional Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
