"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { ShieldCheck, Workflow, Globe2, Clock4, Building2, CheckCircle2 } from "lucide-react";

const ICON_COMPONENTS: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-brand-forest group-hover:text-white transition-colors" />,
  Workflow: <Workflow className="w-5 h-5 text-brand-forest group-hover:text-white transition-colors" />,
  Globe2: <Globe2 className="w-5 h-5 text-brand-forest group-hover:text-white transition-colors" />,
  Clock4: <Clock4 className="w-5 h-5 text-brand-forest group-hover:text-white transition-colors" />,
};

const ACCREDITATIONS_EN = [
  "RA Ministry of Justice · Sovereign LLC",
  "Integrated Travel & Human Capital Pipeline",
  "Multilingual Diplomatic & Commercial Desk",
  "GMT+4 Active Ground Coordination",
];

const ACCREDITATIONS_HY = [
  "ՀՀ Արդարադատության Նախարարություն · ՍՊԸ",
  "Զբոսաշրջության և աշխատուժի միասնական լոգիստիկա",
  "Բազմալեզու դիվանագիտական և առևտրային գրասենյակ",
  "Երևանի ժամանակով (GMT+4) օպերատիվ սպասարկում",
];

export function CorporateFoundation() {
  const { locale } = useLanguage();
  const isHy = locale === "hy";

  return (
    <section className="py-20 lg:py-28 bg-brand-stone-50 border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14 lg:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-olive" />
            <span>{isHy ? "Ինստիտուցիոնալ Հիմք · Երևան" : "Institutional Foundation · Yerevan"}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4 leading-[1.15]">
            {isHy ? deorganicaConfig.corporateFoundation.title_hy : deorganicaConfig.corporateFoundation.title_en}
          </h2>

          <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed font-sans">
            {isHy ? deorganicaConfig.corporateFoundation.subtitle_hy : deorganicaConfig.corporateFoundation.subtitle_en}
          </p>
        </div>

        {/* 4 Trust Signals Architectural Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {deorganicaConfig.corporateFoundation.signals.map((signal, i) => (
            <div
              key={i}
              className="group p-7 sm:p-8 rounded-3xl bg-white border border-stone-200/90 hover:border-brand-forest/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                {/* Top Row: Icon + Large Serif Number Index */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center shadow-2xs group-hover:bg-brand-forest transition-colors duration-300">
                    {ICON_COMPONENTS[signal.icon] || <ShieldCheck className="w-5 h-5 text-brand-forest group-hover:text-white" />}
                  </div>
                  <span className="font-serif text-2xl font-bold text-stone-300 group-hover:text-brand-olive transition-colors duration-300 select-none">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-brand-forest mb-2.5 leading-snug">
                  {isHy ? signal.title_hy : signal.title_en}
                </h3>

                <p className="text-xs text-brand-ink-muted leading-relaxed font-sans">
                  {isHy ? signal.desc_hy : signal.desc_en}
                </p>
              </div>

              {/* Bottom Accreditation Tag */}
              <div className="pt-5 mt-6 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-medium text-stone-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-olive shrink-0" />
                <span className="truncate">
                  {isHy ? ACCREDITATIONS_HY[i] : ACCREDITATIONS_EN[i]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
