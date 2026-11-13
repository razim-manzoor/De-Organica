"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import type { TravelPageContent } from "@/types/content";
import { defaultTravelPageContent } from "@/data/cms-fallbacks";
import { getCmsIcon } from "@/components/icons";
import { Compass, ArrowRight } from "lucide-react";

interface TravelHeritageShowcaseProps {
  content?: TravelPageContent["heritageShowcase"];
}

export function TravelHeritageShowcase({
  content = defaultTravelPageContent.heritageShowcase,
}: TravelHeritageShowcaseProps) {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const isHy = locale === "hy";

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-brand-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-olive" />
              <span>{isHy ? content.eyebrow_hy : content.eyebrow_en}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
              {isHy ? content.headline_hy : content.headline_en}
            </h2>
            <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
              {isHy ? content.subtext_hy : content.subtext_en}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openTravelDrawer("Armenian Gastronomy & Heritage Route")}
            className="min-h-[44px] self-start md:self-auto px-5 py-3 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-bold uppercase tracking-wider transition-colors duration-200 flex items-center gap-2 shadow-sm cursor-pointer group"
          >
            <span>{isHy ? content.cta_hy : content.cta_en}</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-olive-onDark transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4-Pillar Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.pillars.map((pillar) => {
            const IconComponent = getCmsIcon(pillar.icon, Compass);
            return (
              <div
                key={pillar.id}
                className="group rounded-3xl bg-brand-stone-50 border border-brand-stone-200/90 overflow-hidden hover:border-brand-olive/50 hover-lift transition-[border-color,box-shadow,transform] duration-300 flex flex-col justify-between shadow-sm"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-48 w-full overflow-hidden bg-brand-stone-200">
                    <Image
                      src={pillar.image}
                      alt={isHy ? pillar.title_hy : pillar.title_en}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover hover-img-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-brand-forest shadow-sm">
                      {isHy ? pillar.badge_hy : pillar.badge_en}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-brand-olive-text mb-2">
                      <IconComponent className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {isHy ? pillar.tagline_hy : pillar.tagline_en}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-brand-forest leading-snug mb-2 group-hover:text-brand-olive-text transition-colors">
                      {isHy ? pillar.title_hy : pillar.title_en}
                    </h3>

                    <p className="text-xs text-brand-ink-muted leading-relaxed line-clamp-3">
                      {isHy ? pillar.desc_hy : pillar.desc_en}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => openTravelDrawer(isHy ? pillar.title_hy : pillar.title_en)}
                    className="w-full min-h-[40px] py-2 px-3 rounded-xl bg-white border border-brand-stone-200 text-brand-forest text-xs font-semibold hover:bg-brand-forest hover:text-white hover:border-transparent transition-colors duration-200 text-center cursor-pointer shadow-sm"
                  >
                    {isHy ? "Ներառել ծրագրում" : "Add to Itinerary"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
