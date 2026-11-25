"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import type { ManpowerPageContent } from "@/types/content";
import { defaultManpowerPageContent } from "@/data/cms-fallbacks";
import { ShieldCheck, ArrowRight } from "lucide-react";

interface ManpowerComplianceBannerProps {
  content?: ManpowerPageContent["complianceBanner"];
}

export function ManpowerComplianceBanner({
  content = defaultManpowerPageContent.complianceBanner,
}: ManpowerComplianceBannerProps) {
  const { locale } = useLanguage();
  const { openCandidateDrawer, openEmployerDrawer } = useDrawer();
  const isHy = locale === "hy";
  const trustMetrics = content.trustMetrics;

  return (
    <section className="py-16 lg:py-20 bg-brand-forest text-white relative overflow-hidden border-y border-brand-forest-deep">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-architectural-grid bg-[length:36px_36px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-onDark mb-3">
              <ShieldCheck className="w-4 h-4 text-brand-olive-onDark shrink-0" />
              <span>{isHy ? content.eyebrow_hy : content.eyebrow_en}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight text-white">
              {isHy ? content.headline_hy : content.headline_en}
            </h2>

            <p className="text-brand-stone-200 text-sm leading-relaxed max-w-2xl mb-6">
              {isHy ? content.subtext_hy : content.subtext_en}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openCandidateDrawer()}
                className="min-h-[44px] px-5 py-3 rounded-xl bg-brand-olive-onDark text-brand-forest-deep text-xs font-bold uppercase tracking-wider hover:bg-white transition-all active:scale-95 duration-200 shadow-md cursor-pointer flex items-center gap-2"
              >
                <span>{isHy ? "Գրանցվել որպես Թեկնածու" : "Register as Candidate"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => openEmployerDrawer()}
                className="min-h-[44px] px-5 py-3 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all active:scale-95 duration-200 cursor-pointer"
              >
                <span>{isHy ? "Գործատուի Հայտ" : "Hire Manpower"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3 Architectural Telemetry Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
            {trustMetrics.map((m, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-sm hover:bg-white/10 transition-colors duration-200"
              >
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-brand-olive-onDark tabular-nums">
                    {m.figure}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-stone-200">
                    {isHy ? m.label_hy : m.label_en}
                  </span>
                </div>
                <p className="text-xs text-brand-stone-200 leading-relaxed">
                  {isHy ? m.detail_hy : m.detail_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
