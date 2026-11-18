"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import type { HomePageContent } from "@/types/content";
import { defaultHomePageContent } from "@/data/cms-fallbacks";
import { getCmsIcon } from "@/components/icons";
import { ArrowRight, Globe, ShieldCheck } from "lucide-react";

interface HeroDualGatewayProps {
  content?: HomePageContent;
}

export function HeroDualGateway({ content = defaultHomePageContent }: HeroDualGatewayProps) {
  const { locale } = useLanguage();
  const { openTravelDrawer, openCandidateDrawer } = useDrawer();
  const isHy = locale === "hy";
  const { masthead, travelPillar, manpowerPillar } = content;

  return (
    <section className="relative bg-brand-stone-50 overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Masthead Intro Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-8 border-b border-brand-stone-200">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-3">
              <span>{isHy ? masthead.eyebrow_hy : masthead.eyebrow_en}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-brand-forest leading-[1.1] tracking-tight">
              {isHy ? masthead.headline_hy : masthead.headline_en}
            </h1>
          </div>

          <p className="text-sm sm:text-base text-brand-ink-muted max-w-md leading-relaxed">
            {isHy ? masthead.subtext_hy : masthead.subtext_en}
          </p>
        </div>

        {/* Dual-Pillar Split Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* PILLAR 1: Travel & Tours */}
          <article className="group rounded-3xl bg-white border border-brand-stone-200 overflow-hidden shadow-sm hover-lift hover:shadow-2xl hover:border-brand-olive/40 flex flex-col justify-between">
            <div>
              {/* Hero Photo */}
              <div className="relative h-48 sm:h-72 overflow-hidden bg-brand-stone-200">
                <Image
                  src={travelPillar.image || "/images/tours/garni-temple.jpg"}
                  alt={isHy ? travelPillar.imageAlt_hy : travelPillar.imageAlt_en}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover-img-zoom"
                />
              </div>

              <div className="p-7 sm:p-9 space-y-5">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest leading-tight">
                  {isHy ? travelPillar.title_hy : travelPillar.title_en}
                </h2>
                <p className="text-sm text-brand-ink-muted leading-relaxed">
                  {isHy ? travelPillar.description_hy : travelPillar.description_en}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-brand-stone-100 text-xs">
                  {travelPillar.features.map((feat, idx) => {
                    const Icon = getCmsIcon(feat.icon, Globe);
                    return (
                      <div key={idx} className="flex items-center gap-2 text-brand-forest font-semibold">
                        <Icon className="w-4 h-4 text-brand-olive-text shrink-0" />
                        <span>{isHy ? feat.label_hy : feat.label_en}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="px-7 pb-7 sm:px-9 sm:pb-9 pt-4 border-t border-brand-stone-100 flex flex-col sm:flex-row gap-3">
              <Link
                href="/travel"
                className="flex-1 min-h-[46px] px-5 py-3 rounded-xl bg-brand-forest text-white text-xs sm:text-sm font-semibold hover:bg-brand-forest-deep transition-all active:scale-95 duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{isHy ? travelPillar.ctaPrimary_hy : travelPillar.ctaPrimary_en}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => openTravelDrawer("Armenia Custom Itinerary")}
                className="min-h-[46px] px-5 py-3 rounded-xl border border-brand-stone-300 bg-white text-brand-forest hover:bg-brand-stone-100 text-xs sm:text-sm font-semibold transition-all active:scale-95 duration-200 cursor-pointer"
              >
                {isHy ? travelPillar.ctaSecondary_hy : travelPillar.ctaSecondary_en}
              </button>
            </div>
          </article>

          {/* PILLAR 2: Ethical International Manpower */}
          <article className="group rounded-3xl bg-brand-forest text-white border border-brand-forest-deep overflow-hidden shadow-lg hover-lift hover:shadow-2xl flex flex-col justify-between">
            <div>
              {/* Hero Photo */}
              <div className="relative h-48 sm:h-72 overflow-hidden bg-brand-forest-deep">
                <Image
                  src={manpowerPillar.image || "/images/manpower/international-workforce.jpg"}
                  alt={isHy ? manpowerPillar.imageAlt_hy : manpowerPillar.imageAlt_en}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover hover-img-zoom"
                />
              </div>

              <div className="p-7 sm:p-9 space-y-5">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {isHy ? manpowerPillar.title_hy : manpowerPillar.title_en}
                </h2>
                <p className="text-sm text-brand-stone-200 leading-relaxed">
                  {isHy ? manpowerPillar.description_hy : manpowerPillar.description_en}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/15 text-xs text-brand-stone-200">
                  {manpowerPillar.features.map((feat, idx) => {
                    const Icon = getCmsIcon(feat.icon, ShieldCheck);
                    return (
                      <div key={idx} className="flex items-center gap-2 font-semibold">
                        <Icon className="w-4 h-4 text-brand-olive-onDark shrink-0" />
                        <span>{isHy ? feat.label_hy : feat.label_en}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="px-7 pb-7 sm:px-9 sm:pb-9 pt-4 border-t border-white/15 flex flex-col sm:flex-row gap-3">
              <Link
                href="/manpower"
                className="flex-1 min-h-[46px] px-5 py-3 rounded-xl bg-brand-olive-onDark text-brand-forest-deep text-xs sm:text-sm font-bold hover:bg-white transition-all active:scale-95 duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{isHy ? manpowerPillar.ctaPrimary_hy : manpowerPillar.ctaPrimary_en}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => openCandidateDrawer()}
                className="min-h-[46px] px-5 py-3 rounded-xl border border-white/30 bg-white/10 text-white hover:bg-white/20 text-xs sm:text-sm font-semibold transition-all active:scale-95 duration-200 cursor-pointer"
              >
                {isHy ? manpowerPillar.ctaSecondary_hy : manpowerPillar.ctaSecondary_en}
              </button>
            </div>
          </article>
        </div>

        {/* Immediate Direct Consultation Bar */}
        <div className="mt-8 pt-6 border-t border-brand-stone-200/80 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-brand-ink-muted text-center">
          <span className="w-2 h-2 rounded-full bg-[#25D366] shrink-0" />
          <span>
            {isHy
              ? "Նախընտրում եք անմիջական կա՞պ՝ առանց ձևաթղթերի։"
              : "Prefer direct consultation without filling forms?"}{" "}
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
              {isHy ? "զանգահարեք (+374 55 569553)" : "call Yerevan desk (+374 55 569553)"}
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
