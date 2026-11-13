"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import type { TravelPageContent } from "@/types/content";
import { defaultTravelPageContent } from "@/data/cms-fallbacks";
import { getCmsIcon } from "@/components/icons";
import { Building2, ArrowRight } from "lucide-react";

interface DmcPartnerSectionProps {
  content?: TravelPageContent["dmcPartner"];
}

export function DmcPartnerSection({
  content = defaultTravelPageContent.dmcPartner,
}: DmcPartnerSectionProps) {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const isHy = locale === "hy";

  return (
    <section id="dmc" className="py-20 lg:py-28 bg-brand-forest text-white relative overflow-hidden border-t border-brand-forest-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-onDark mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-olive-onDark" />
            <span>{isHy ? content.eyebrow_hy : content.eyebrow_en}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {isHy ? content.headline_hy : content.headline_en}
          </h2>

          <p className="text-brand-stone-200 text-sm sm:text-base leading-relaxed">
            {isHy ? content.subtext_hy : content.subtext_en}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {content.pillars.map((pillar, i) => {
            const Icon = getCmsIcon(pillar.icon, Building2);
            return (
              <div
                key={i}
                className="p-6 rounded-xl bg-white/5 border border-white/15 backdrop-blur-sm hover:bg-white/10 transition-colors duration-200 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-olive-onDark" />
                </div>
                <h3 className="font-serif text-base font-bold text-white">
                  {isHy ? pillar.title_hy : pillar.title_en}
                </h3>
                <p className="text-xs text-brand-stone-300 leading-relaxed">
                  {isHy ? pillar.desc_hy : pillar.desc_en}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Callout Box */}
        <div className="rounded-2xl bg-white/10 border border-white/15 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-sm">
          <div>
            <h3 className="font-serif text-xl font-bold mb-2">
              {isHy ? content.ctaTitle_hy : content.ctaTitle_en}
            </h3>
            <p className="text-xs sm:text-sm text-brand-stone-300 max-w-xl">
              {isHy ? content.ctaDesc_hy : content.ctaDesc_en}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openTravelDrawer("B2B Travel Partner DMC Agreement")}
            className="min-h-[44px] self-start md:self-auto px-6 py-3 rounded-xl bg-brand-olive-onDark text-brand-forest-deep text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors duration-200 flex items-center gap-2 shadow-md flex-shrink-0 cursor-pointer"
          >
            <span>{isHy ? content.ctaButton_hy : content.ctaButton_en}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
