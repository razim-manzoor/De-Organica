"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import type { HomePageContent } from "@/types/content";
import { defaultHomePageContent } from "@/data/cms-fallbacks";
import { getCmsIcon } from "@/components/icons";
import { Landmark } from "lucide-react";

interface YerevanCrossroadsBannerProps {
  content?: HomePageContent["crossroadsBanner"];
}

export function YerevanCrossroadsBanner({
  content = defaultHomePageContent.crossroadsBanner,
}: YerevanCrossroadsBannerProps) {
  const { locale } = useLanguage();
  const isHy = locale === "hy";

  return (
    <section className="bg-brand-forest text-white py-16 lg:py-24 relative overflow-hidden border-y border-brand-forest-deep">
      {/* Architectural SVG Grid Texture */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-architectural-grid bg-[length:36px_36px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-onDark">
              <span>{isHy ? content.eyebrow_hy : content.eyebrow_en}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
              {isHy ? content.headline_hy : content.headline_en}
            </h2>

            <p className="text-sm sm:text-base text-brand-stone-200 leading-relaxed max-w-xl">
              {isHy ? content.subtext_hy : content.subtext_en}
            </p>
          </div>

          {/* Right 3 Architectural Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 gap-4">
            {content.cards.map((card, idx) => {
              const Icon = getCmsIcon(card.icon, Landmark);
              return (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-sm flex items-start gap-4 hover:bg-white/10 transition-colors duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-olive-onDark/15 border border-brand-olive-onDark/30 flex items-center justify-center text-brand-olive-onDark shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">
                      {isHy ? card.title_hy : card.title_en}
                    </h3>
                    <p className="text-xs sm:text-sm text-brand-stone-200 mt-1 leading-relaxed">
                      {isHy ? card.desc_hy : card.desc_en}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
