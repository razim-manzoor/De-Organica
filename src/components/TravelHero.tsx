"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { Compass, Sparkles, MapPin, ArrowRight, ShieldCheck, Check } from "lucide-react";

export function TravelHero() {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const isHy = locale === "hy";

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-brand-stone-50 overflow-hidden border-b border-brand-stone-200">
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-architectural-grid" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-stone-300 text-brand-forest text-xs font-semibold shadow-2xs mb-5">
            <Compass className="w-3.5 h-3.5 text-brand-olive" />
            <span className="font-sans uppercase tracking-[0.18em] text-[11px]">
              {isHy ? "Դե Օրգանիկա Զբոսաշրջություն" : "Division I · Travel & Tours"}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-forest leading-[1.12] mb-6">
            {isHy
              ? "Հայաստանի Բացառիկ Տուրեր և Միջազգային Ճանապարհորդություն"
              : "Signature Armenia Hospitality & Global Holiday Escapes"}
          </h1>

          <p className="text-base sm:text-lg text-brand-ink-muted leading-relaxed mb-8 max-w-2xl">
            {isHy
              ? "Երևանից մինչև Սևանա լիճ, Գառնի, Գեղարդ և Տաթևի ճոպանուղի: Անհատական երթուղիներ, արտագնա հանգիստ, վիզաների աջակցություն և B2B DMC տեղական սպասարկում արտասահմանյան գործակալությունների համար:"
              : "From ancient monastic cliff sanctuaries to azure alpine lakes, bespoke outbound holidays, consular visa support, and premier B2B ground handling for international travel agencies."}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => openTravelDrawer("Bespoke Private Itinerary")}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-forest text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-forest-deep active:scale-95 transition-all shadow-xs group cursor-pointer"
            >
              <span>{isHy ? "Պատվիրել անհատական տուր" : "Inquire Custom Itinerary"}</span>
              <ArrowRight className="w-4 h-4 text-brand-olive-light transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <a
              href="#tours-matrix"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-brand-stone-300 bg-white text-brand-forest text-xs font-semibold hover:bg-brand-stone-100 active:scale-95 transition-all shadow-2xs"
            >
              <span>{isHy ? "Դիտել բոլոր տուրերը" : "Explore Tour Packages"}</span>
            </a>
          </div>

          {/* Quick Pillar Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-8 mt-8 border-t border-brand-stone-200">
            {[
              "UNESCO Heritage Sites",
              "Private Mercedes Chauffeurs",
              "EVN Airport 24/7",
              "Consular Visa Support",
              "B2B DMC Net Tariffs",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full bg-white text-brand-forest border border-brand-stone-200 shadow-2xs"
              >
                <Check className="w-3 h-3 text-brand-olive" />
                <span>{badge}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
