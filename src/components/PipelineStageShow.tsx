"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import type { ManpowerPageContent } from "@/types/content";
import { defaultManpowerPageContent } from "@/data/cms-fallbacks";
import { ShieldCheck, CheckCircle2, ArrowRight, Clock } from "lucide-react";

interface PipelineStageShowProps {
  content?: ManpowerPageContent["pipelineStageShow"];
}

export function PipelineStageShow({
  content = defaultManpowerPageContent.pipelineStageShow,
}: PipelineStageShowProps) {
  const { locale } = useLanguage();
  const { openCandidateDrawer, openEmployerDrawer } = useDrawer();
  const isHy = locale === "hy";
  const stages = content.stages;

  const [activeStageId, setActiveStageId] = useState<string>(stages[1]?.id || stages[0]?.id || "stage-2");
  const activeStage =
    stages.find((s) => s.id === activeStageId) || stages[1] || stages[0];

  return (
    <section className="py-20 lg:py-28 bg-brand-stone-50 border-t border-brand-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* StageShow Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-olive" />
              <span>{isHy ? content.eyebrow_hy : content.eyebrow_en}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
              {isHy ? content.headline_hy : content.headline_en}
            </h2>

            <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
              {isHy ? content.subtext_hy : content.subtext_en}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={() => openCandidateDrawer()}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-colors duration-200 shadow-sm cursor-pointer"
            >
              {isHy ? "Ուղարկել CV" : "Submit CV"}
            </button>
            <button
              type="button"
              onClick={() => openEmployerDrawer()}
              className="min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-brand-forest text-xs font-semibold hover:bg-brand-stone-100 transition-colors duration-200 shadow-sm cursor-pointer"
            >
              {isHy ? "Գործատուներին" : "Hire Staff"}
            </button>
          </div>
        </div>

        {/* StageShow Interactive Bento Framework */}
        <div className="rounded-3xl bg-white border border-brand-stone-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Step Selector Ribbon (4 Cols) */}
          <div
            role="tablist"
            aria-label={isHy ? "Հավաքագրման փուլեր" : "Recruitment pipeline stages"}
            className="lg:col-span-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-brand-stone-200 bg-brand-stone-50/50 space-y-3"
          >
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-olive-text block mb-2">
              {isHy ? "Ընտրեք աշխատանքային փուլը" : "Select Pipeline Stage"}
            </span>

            {stages.map((s) => {
              const isSelected = s.id === activeStageId;
              return (
                <button
                  key={s.id}
                  id={`pipeline-tab-${s.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`pipeline-panel-${s.id}`}
                  type="button"
                  onClick={() => setActiveStageId(s.id)}
                  className={`w-full min-h-[60px] text-left p-4 rounded-2xl transition-colors duration-200 cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? "bg-brand-forest text-white shadow-md ring-1 ring-brand-forest/30"
                      : "bg-white text-brand-forest border border-brand-stone-200/80 hover:border-brand-olive/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-serif text-xs font-bold shrink-0 ${
                        isSelected
                          ? "bg-brand-olive-onDark text-brand-forest-deep"
                          : "bg-brand-stone-100 text-brand-forest border border-brand-stone-200"
                      }`}
                    >
                      {s.step}
                    </span>
                    <div>
                      <span className="block text-sm font-bold leading-tight">
                        {isHy ? s.title_hy : s.title_en}
                      </span>
                      <span
                        className={`text-xs block mt-0.5 ${
                          isSelected ? "text-brand-olive-onDark" : "text-brand-ink-muted"
                        }`}
                      >
                        {isHy ? s.role_hy : s.role_en}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    aria-hidden="true"
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
                      isSelected ? "text-brand-olive-onDark translate-x-0.5" : "text-brand-stone-500 opacity-70"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Interactive Stage Detail Body (8 Cols) */}
          <div
            id={`pipeline-panel-${activeStage.id}`}
            role="tabpanel"
            aria-labelledby={`pipeline-tab-${activeStage.id}`}
            className="lg:col-span-8 p-8 sm:p-10 flex flex-col justify-between bg-white space-y-8"
          >
            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-brand-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-olive-subtle text-brand-forest border border-brand-olive/30">
                  {isHy ? `Փուլ ${activeStage.step}` : `Stage ${activeStage.step}`} ·{" "}
                  {isHy ? activeStage.badge_hy : activeStage.badge_en}
                </span>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-forest bg-brand-stone-100 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-brand-olive-text" />
                  <span>{isHy ? activeStage.metrics_hy : activeStage.metrics_en}</span>
                </div>
              </div>

              {/* Title & Narrative Description */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest mb-3">
                {isHy ? activeStage.title_hy : activeStage.title_en}
              </h3>

              <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed mb-8 max-w-2xl">
                {isHy ? activeStage.description_hy : activeStage.description_en}
              </p>

              {/* Safeguards Checklist */}
              <div className="space-y-3 p-6 rounded-2xl bg-brand-stone-50 border border-brand-stone-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-forest block mb-2">
                  {isHy ? "Իրավական Երաշխիքներ և Պաշտպանություն" : "Legal Standards & Candidate Protections"}
                </span>

                {(isHy ? activeStage.safeguards_hy : activeStage.safeguards_en).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-brand-ink">
                    <CheckCircle2 className="w-4 h-4 text-brand-olive-text shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Callout Banner */}
            <div className="pt-6 border-t border-brand-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-brand-ink-muted">
                <ShieldCheck className="w-4 h-4 text-brand-olive-text shrink-0" />
                <span>
                  {isHy
                    ? "100% Օրինական գործընթաց · ՀՀ պաշտոնական աշխատանքի թույլտվություններ"
                    : "100% Legal Compliance · Republic of Armenia Work Permits"}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => openCandidateDrawer()}
                  className="flex-1 sm:flex-none min-h-[44px] py-2.5 px-4 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-colors duration-200 cursor-pointer shadow-sm text-center"
                >
                  {isHy ? "Ուղարկել ռեզյումե (CV)" : "Submit Candidate CV"}
                </button>
                <button
                  type="button"
                  onClick={() => openEmployerDrawer()}
                  className="flex-1 sm:flex-none min-h-[44px] py-2.5 px-4 rounded-xl border border-brand-stone-300 bg-white text-brand-forest text-xs font-semibold hover:bg-brand-stone-100 transition-colors duration-200 cursor-pointer shadow-sm text-center"
                >
                  {isHy ? "Հայտ գործատուներին" : "Request Manpower"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
