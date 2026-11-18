"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import type { TravelPageContent } from "@/types/content";
import { defaultTravelPageContent } from "@/data/cms-fallbacks";
import { getCmsIcon } from "@/components/icons";
import {
  Compass,
  MapPin,
  ArrowRight,
  Mountain,
  ShieldCheck,
} from "lucide-react";

interface TravelHeroProps {
  content?: TravelPageContent["hero"];
}

export function TravelHero({ content = defaultTravelPageContent.hero }: TravelHeroProps) {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const [activeDestIdx, setActiveDestIdx] = useState(0);
  const isHy = locale === "hy";
  const destinations = content.destinations;
  const activeDest = destinations[activeDestIdx] || destinations[0];

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-brand-stone-50 overflow-hidden border-b border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Travel Narrative */}
          <div className="lg:col-span-7">
            {/* Geographic & Curated Travel Tag */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-4">
              <span>{isHy ? content.eyebrow_hy : content.eyebrow_en}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-forest leading-[1.12] mb-5">
              {isHy ? content.headline_hy : content.headline_en}
            </h1>

            <p className="text-base sm:text-lg text-brand-ink-muted leading-relaxed mb-8 max-w-2xl font-sans">
              {isHy ? content.subtext_hy : content.subtext_en}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <button
                type="button"
                onClick={() =>
                  openTravelDrawer(`Custom Tour: ${activeDest.name_en}`)
                }
                className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-forest text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-forest-deep transition-all active:scale-95 duration-200 shadow-sm group cursor-pointer"
              >
                <Compass className="w-4 h-4 text-brand-olive-onDark" />
                <span>{isHy ? content.ctaPrimary_hy : content.ctaPrimary_en}</span>
                <ArrowRight className="w-4 h-4 text-brand-olive-onDark transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <a
                href="#tours"
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-brand-stone-100 text-brand-forest hover:bg-brand-stone-200 text-xs font-semibold transition-all active:scale-95 duration-200 shadow-sm cursor-pointer"
              >
                <span>{isHy ? content.ctaSecondary_hy : content.ctaSecondary_en}</span>
              </a>
            </div>

            {/* Direct Zero-Form Consultation Micro-Link */}
            <div className="flex items-center gap-2 text-xs text-brand-ink-muted mb-8 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] shrink-0" />
              <span>
                {isHy
                  ? "Նախընտրում եք ուղիղ կա՞պ:"
                  : "Prefer immediate consultation?"}{" "}
                <a
                  href="https://wa.me/37455569553"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-forest hover:text-brand-forest-deep font-semibold underline underline-offset-2"
                >
                  {isHy ? "Գրեք WhatsApp-ով" : "Message on WhatsApp"}
                </a>{" "}
                {isHy ? "կամ" : "or"}{" "}
                <a
                  href="tel:+37455569553"
                  className="text-brand-forest hover:text-brand-forest-deep font-semibold underline underline-offset-2"
                >
                  {isHy ? "զանգահարեք" : "call +374 55 569553"}
                </a>
              </span>
            </div>

            {/* Travel Specific Pillar Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-brand-stone-200">
              {content.badges.map((badge) => {
                const Icon = getCmsIcon(badge.icon, ShieldCheck);
                return (
                  <div
                    key={badge.label_en}
                    className="flex items-center gap-2 text-xs font-medium text-brand-ink"
                  >
                    <Icon className="w-3.5 h-3.5 text-brand-olive-text shrink-0" />
                    <span>{isHy ? badge.label_hy : badge.label_en}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Destination Panorama Capsule */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white border border-brand-stone-200/90 p-5 shadow-xl relative overflow-hidden group">
              {/* Image Preview with Atmospheric Gradient */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-brand-stone-200 mb-4">
                <Image
                  src={activeDest.image}
                  alt={isHy ? activeDest.name_hy : activeDest.name_en}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover hover-img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/20 to-transparent" />

                {/* Top Quiet Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-brand-forest/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider border border-white/20">
                    {isHy ? activeDest.tag_hy : activeDest.tag_en}
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-2 text-xs text-brand-olive-onDark mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeDest.distKm} {isHy ? "կմ Երևանից" : "km from Yerevan"}</span>
                    <span>·</span>
                    <span>{activeDest.altitudeM}m ASL</span>
                    <span>·</span>
                    <span>{isHy ? activeDest.season_hy : activeDest.season_en}</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                    {isHy ? activeDest.name_hy : activeDest.name_en}
                  </h2>
                  <p className="text-xs text-stone-200 mt-1 line-clamp-1">
                    {isHy ? activeDest.subtitle_hy : activeDest.subtitle_en}
                  </p>
                </div>
              </div>

              {/* Destination Selector Tabs */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-brand-ink-muted px-1">
                  <span>{isHy ? "Ընտրեք ուղղությունը" : "Featured Destinations"}</span>
                  <span className="font-mono text-brand-olive-text font-semibold">
                    {activeDestIdx + 1} / {destinations.length}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {destinations.map((dest, idx) => (
                    <button
                      key={dest.id}
                      type="button"
                      aria-pressed={activeDestIdx === idx}
                      onClick={() => setActiveDestIdx(idx)}
                      className={`text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors duration-200 cursor-pointer border ${
                        activeDestIdx === idx
                          ? "bg-brand-forest text-white border-brand-forest shadow-sm"
                          : "bg-brand-stone-50 text-brand-forest hover:bg-brand-stone-100 border-brand-stone-200"
                      }`}
                    >
                      <div className="truncate">
                        {isHy ? dest.name_hy : dest.name_en}
                      </div>
                      <div
                        className={`text-xs truncate mt-0.5 ${
                          activeDestIdx === idx
                            ? "text-brand-olive-onDark"
                            : "text-brand-ink-muted"
                        }`}
                      >
                        {dest.distKm} {isHy ? "կմ" : "km"} · {dest.altitudeM}{isHy ? "մ" : "m"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fast Booking Dispatch */}
              <button
                type="button"
                onClick={() =>
                  openTravelDrawer(`Route Inquiry: ${activeDest.name_en}`)
                }
                className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-brand-stone-100 hover:bg-brand-forest hover:text-white text-brand-forest text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 border border-brand-stone-300 shadow-sm cursor-pointer group/cta"
              >
                <span>
                  {isHy
                    ? `Պատվիրել ${activeDest.name_hy}`
                    : `Inquire ${activeDest.name_en} Expedition`}
                </span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
