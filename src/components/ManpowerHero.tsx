"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import type { ManpowerPageContent } from "@/types/content";
import { defaultManpowerPageContent } from "@/data/cms-fallbacks";
import {
  Briefcase,
  Building2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

interface ManpowerHeroProps {
  content?: ManpowerPageContent["hero"];
}

export function ManpowerHero({ content = defaultManpowerPageContent.hero }: ManpowerHeroProps) {
  const { locale } = useLanguage();
  const { openCandidateDrawer, openEmployerDrawer } = useDrawer();
  const [activeSpecTab, setActiveSpecTab] = useState<"candidate" | "employer">(
    "candidate"
  );
  const isHy = locale === "hy";
  const candidateStages = content.candidateStages;
  const employerStages = content.employerStages;

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-brand-stone-50 overflow-hidden border-b border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Institutional Legal Mobility Narrative */}
          <div className="lg:col-span-7">
            {/* Regulatory Compliance Accents */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-4">
              <ShieldCheck className="w-4 h-4 text-brand-olive-text shrink-0" />
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
                onClick={() => openCandidateDrawer()}
                className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-forest text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-forest-deep transition-all active:scale-95 shadow-sm cursor-pointer group"
              >
                <Briefcase className="w-4 h-4 text-brand-olive-onDark shrink-0" />
                <span>{isHy ? "Թեկնածուներին · Ուղարկել CV" : "Job Seekers · Submit CV"}</span>
                <ArrowRight className="w-4 h-4 text-brand-olive-onDark transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => openEmployerDrawer()}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-brand-stone-300 bg-white text-brand-forest text-xs font-semibold hover:bg-brand-stone-100 transition-all active:scale-95 shadow-sm cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-brand-olive-text shrink-0" />
                <span>{isHy ? "Գործատուներին · Պատվիրել աշխատուժ" : "Employers · Hire Manpower"}</span>
              </button>
            </div>

            {/* Direct Zero-Form Consultation Micro-Link */}
            <div className="flex items-center gap-2 text-xs text-brand-ink-muted mb-8 font-sans">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] shrink-0" />
              <span>
                {isHy
                  ? "Նախընտրում եք ուղիղ կա՞պ:"
                  : "Prefer direct consultation?"}{" "}
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

            {/* Key Dimensional Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-brand-stone-200">
              {content.metrics.map((metric, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-white border border-brand-stone-200/90 shadow-sm">
                  <div className="font-serif text-lg sm:text-xl font-bold text-brand-forest tabular-nums">
                    {metric.figure}
                  </div>
                  <div className="text-xs text-brand-ink-muted uppercase tracking-wider mt-0.5 font-semibold">
                    {isHy ? metric.label_hy : metric.label_en}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Candidate & Employer Assurance Panel */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white border border-brand-stone-200/90 p-6 shadow-xl relative font-sans">
              {/* Trust Header Block */}
              <div className="border-b border-brand-stone-200 pb-3 mb-4">
                <div className="flex items-center justify-between text-xs font-semibold text-brand-olive-text">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-olive-text" />
                    <span>{isHy ? "ՀՀ Պաշտոնական Գրանցում" : "Official RA Accreditation"}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-stone-100 text-brand-forest border border-brand-stone-200 text-xs font-bold">
                    {isHy ? "100% Օրինական" : "100% Verified"}
                  </span>
                </div>
                <div className="mt-2">
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-brand-forest">
                    {activeSpecTab === "candidate"
                      ? isHy
                        ? "Թեկնածուների Պաշտպանություն և Երաշխիքներ"
                        : "Candidate Guarantees & Protections"
                      : isHy
                      ? "Կորպորատիվ Հավաքագրման Ծառայություններ"
                      : "Enterprise Recruitment & Staffing"}
                  </h2>
                </div>
              </div>

              {/* Segmented Mode Switcher */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-brand-stone-100 rounded-xl mb-4 text-xs font-semibold">
                <button
                  type="button"
                  aria-pressed={activeSpecTab === "candidate"}
                  onClick={() => setActiveSpecTab("candidate")}
                  className={`min-h-[40px] py-2 rounded-lg transition-colors cursor-pointer text-center ${
                    activeSpecTab === "candidate"
                      ? "bg-white text-brand-forest shadow-sm font-bold"
                      : "text-brand-ink-muted hover:text-brand-forest"
                  }`}
                >
                  {isHy ? "Թեկնածուի Երաշխիք" : "Job Seeker View"}
                </button>
                <button
                  type="button"
                  aria-pressed={activeSpecTab === "employer"}
                  onClick={() => setActiveSpecTab("employer")}
                  className={`min-h-[40px] py-2 rounded-lg transition-colors cursor-pointer text-center ${
                    activeSpecTab === "employer"
                      ? "bg-white text-brand-forest shadow-sm font-bold"
                      : "text-brand-ink-muted hover:text-brand-forest"
                  }`}
                >
                  {isHy ? "Գործատուի Կանոններ" : "Enterprise Employer"}
                </button>
              </div>

              {/* Step-by-Step Flow */}
              <div className="space-y-2.5 text-xs mb-5">
                {(activeSpecTab === "candidate" ? candidateStages : employerStages).map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      item.isHighlight
                        ? "bg-brand-olive-subtle/75 border-brand-olive/40"
                        : "bg-brand-stone-50 border-brand-stone-200/80"
                    }`}
                  >
                    <div className="text-xs font-bold text-brand-forest">
                      <span>{isHy ? item.stage_hy : item.stage_en}</span>
                    </div>
                    <p className="text-xs text-brand-ink-muted font-sans mt-1 leading-snug">
                      {isHy ? item.desc_hy : item.desc_en}
                    </p>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              {activeSpecTab === "candidate" ? (
                <button
                  type="button"
                  onClick={() => openCandidateDrawer()}
                  className="min-h-[44px] w-full py-3 px-4 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm cursor-pointer group/cta"
                >
                  <Briefcase className="w-3.5 h-3.5 text-brand-olive-onDark" />
                  <span>{isHy ? "Ներկայացնել Ռեզյումե (CV)" : "Submit Your Profile / CV"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openEmployerDrawer()}
                  className="min-h-[44px] w-full py-3 px-4 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-bold uppercase tracking-wider transition-all active:scale-95 flex items-center justify-center gap-2 shadow-sm cursor-pointer group/cta"
                >
                  <Building2 className="w-3.5 h-3.5 text-brand-olive-onDark" />
                  <span>{isHy ? "Պատվիրել Աշխատուժ" : "Request Manpower / Hire Staff"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
