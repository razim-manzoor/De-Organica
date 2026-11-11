"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import {
  Users2,
  ShieldCheck,
  Briefcase,
  Building2,
  ArrowRight,
  FileCheck2,
  Scale,
  Clock,
  Sparkles,
  PlaneTakeoff,
  Award,
  Check,
} from "lucide-react";

export function ManpowerHero() {
  const { locale } = useLanguage();
  const { openCandidateDrawer, openEmployerDrawer } = useDrawer();
  const [activeSpecTab, setActiveSpecTab] = useState<"candidate" | "employer">(
    "candidate"
  );
  const isHy = locale === "hy";

  const candidateStages = [
    {
      stage: isHy ? "ՓՈՒԼ 01 · ԳՐԱՆՑՈՒՄ" : "STAGE 01 · REGISTRATION",
      badge: isHy ? "ՎՃԱՐԸ = 0.00 AMD" : "FEE = 0.00 AMD",
      badgeColor: "text-brand-olive",
      desc_en: "Free CV drop. Zero application, resume review, or registration fees.",
      desc_hy: "Ռեզյումեի անվճար հանձնում: Զրո դրամ գրանցման կամ դիմումի համար:",
      isHighlight: false,
    },
    {
      stage: isHy ? "ՓՈՒԼ 02 · ՈՐԱԿԱՎՈՐՈՒՄ" : "STAGE 02 · SKILL VETTING",
      badge: isHy ? "ՕՆԼԱՅՆ / ՏԵՍԱԶԱՆԳ" : "REMOTE / HYBRID",
      badgeColor: "text-stone-500",
      desc_en: "Document verification, trade skill check, and employer interview.",
      desc_hy: "Փաստաթղթերի ստուգում, հմտությունների թեստավորում և հարցազրույց:",
      isHighlight: false,
    },
    {
      stage: isHy ? "ՓՈՒԼ 03 · ԹՈՒՅԼՏՎՈՒԹՅՈՒՆ" : "STAGE 03 · WORK PERMIT",
      badge: isHy ? "100% ՕՐԻՆԱԿԱՆ ԳՐԱՆՑՈՒՄ" : "100% MINISTRY LEGAL",
      badgeColor: "text-brand-olive",
      desc_en: "Official work permit & residence card via Unified Migration Service.",
      desc_hy: "ՀՀ աշխատանքի օրինական թույլտվություն և կացության քարտ:",
      isHighlight: true,
    },
    {
      stage: isHy ? "ՓՈՒԼ 04 · ԺԱՄԱՆՈՒՄ" : "STAGE 04 · ARRIVAL & PAY",
      badge: isHy ? "ՎՃԱՐՈՒՄԸ ՄԻԱՅՆ ԱՇԽԱՏԵԼԻՍ" : "PAY-AFTER-JOB",
      badgeColor: "text-brand-forest",
      desc_en: "Zvartnots airport reception, housing orientation, and contract start.",
      desc_hy: "Դիմավորում Զվարթնոցում, կացության ապահովում և աշխատանքի սկիզբ:",
      isHighlight: false,
    },
  ];

  const employerStages = [
    {
      stage: isHy ? "ՓՈՒԼ 01 · ՔՎՈՏԱՅԻ ՀԱՅՏ" : "STAGE 01 · QUOTA REQUISITION",
      badge: isHy ? "ԱՐՁԱԳԱՆՔ՝ 48 ԺԱՄ" : "SLA: 48 HOURS",
      badgeColor: "text-stone-500",
      desc_en: "Employer submits headcount requirements & ministry quota parameters.",
      desc_hy: "Գործատուն ներկայացնում է հաստիքների պահանջարկը և նախարարության քվոտաները:",
      isHighlight: false,
    },
    {
      stage: isHy ? "ՓՈՒԼ 02 · ԹԵԿՆԱԾՈՒՆԵՐԻ ՑԱՆԿ" : "STAGE 02 · CANDIDATE DOSSIERS",
      badge: isHy ? "ՆԱԽՆԱԿԱՆ ԶՏՎԱԾ" : "PRE-SCREENED",
      badgeColor: "text-brand-forest",
      desc_en: "Shortlist of pre-screened talent across construction, hospitality, and trades.",
      desc_hy: "Որակավորված թեկնածուների նախնական ցանկ շինարարության և սպասարկման ոլորտում:",
      isHighlight: false,
    },
    {
      stage: isHy ? "ՓՈՒԼ 03 · ՕՐԻՆԱԿԱՆ ՁԵՎԱԿԵՐՊՈՒՄ" : "STAGE 03 · PERMIT SPONSORSHIP",
      badge: isHy ? "ԼԻԱՐԺԵՔ ՀԱՄԱՊԱՏԱՍԽԱՆՈՒԹՅՈՒՆ" : "FULL COMPLIANCE",
      badgeColor: "text-emerald-700",
      desc_en: "De Organica handles work permit filing and state migration paperwork.",
      desc_hy: "«Դե Օրգանիկա»-ն ապահովում է աշխատանքի թույլտվության պետական գրանցումը:",
      isHighlight: true,
    },
    {
      stage: isHy ? "ՓՈՒԼ 04 · ԻՆՏԵԳՐՈՒՄ ԵՎ ԵՐԱՇԽԻՔ" : "STAGE 04 · ONBOARDING & SLA",
      badge: isHy ? "30 ՕՐՎԱ ԵՐԱՇԽԻՔ" : "30-DAY GUARANTEE",
      badgeColor: "text-brand-forest",
      desc_en: "Direct employee deployment with a 30-day candidate replacement warranty.",
      desc_hy: "Աշխատակցի տեղավորում՝ թեկնածուի փոխարինման 30-օրյա երաշխիքով:",
      isHighlight: false,
    },
  ];

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-brand-stone-50 overflow-hidden border-b border-brand-stone-200">
      {/* Precision Blueprint Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-architectural-grid" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Institutional Legal Mobility Narrative */}
          <div className="lg:col-span-7">
            {/* Regulatory Compliance Accents */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive mb-4">
              <ShieldCheck className="w-4 h-4 text-brand-olive shrink-0" />
              <span>
                {isHy
                  ? "Օրինական Աշխատանքային Շարժունություն · 0 ՀՀ դրամ կանխավճար"
                  : "Ethical Workforce Mobility · Zero Upfront Candidate Fees"}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-forest leading-[1.12] mb-6">
              {isHy
                ? "Էթիկական Հավաքագրում և Օրինական Աշխատանքային Շարժունություն"
                : "Ethical Workforce Mobility & Verified International Recruitment"}
            </h1>

            <p className="text-base sm:text-lg text-brand-ink-muted leading-relaxed mb-8 max-w-2xl font-sans">
              {isHy
                ? "Մենք կապում ենք որակավորված միջազգային մասնագետներին Հայաստանի առաջատար գործատուների հետ: Թեկնածուներից որևէ նախնական վճար չի գանձվում, իսկ գործատուների համար երաշխավորվում է աշխատանքի և կացության պաշտոնական թույլտվությունների 100% օրինականություն:"
                : "Bridging vetted international talent with enterprise employers in Armenia. Operating on an uncompromising candidate-first charter: absolute zero upfront fees, legitimate Ministry work permits, and legally binding employment contracts."}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                type="button"
                onClick={() => openCandidateDrawer()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-forest text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-forest-deep active:scale-95 transition-all shadow-xs cursor-pointer group"
              >
                <Briefcase className="w-4 h-4 text-brand-olive-light transition-transform duration-200 group-hover:scale-110" />
                <span>{isHy ? "Թեկնածուներին · Ուղարկել CV" : "Job Seekers · Submit CV"}</span>
                <ArrowRight className="w-4 h-4 text-brand-olive-light transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => openEmployerDrawer()}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-brand-stone-300 bg-white text-brand-forest text-xs font-semibold hover:bg-brand-stone-100 active:scale-95 transition-all shadow-2xs cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-brand-olive" />
                <span>{isHy ? "Գործատուներին · Պատվիրել աշխատուժ" : "Employers · Hire Manpower"}</span>
              </button>
            </div>

            {/* Key Dimensional Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-brand-stone-200">
              <div className="p-3.5 rounded-2xl bg-white border border-brand-stone-200/90 shadow-2xs">
                <div className="font-mono text-lg sm:text-xl font-bold text-emerald-800">
                  0.00 AMD
                </div>
                <div className="text-[10px] text-brand-ink-muted uppercase tracking-wider mt-0.5 font-semibold">
                  {isHy ? "0 Դրամ Կանխավճար" : "Upfront Candidate Fee"}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-brand-stone-200/90 shadow-2xs">
                <div className="font-mono text-lg sm:text-xl font-bold text-brand-forest">
                  15–25 Days
                </div>
                <div className="text-[10px] text-brand-ink-muted uppercase tracking-wider mt-0.5 font-semibold">
                  {isHy ? "ՀՀ Թույլտվության Ժամկետ" : "Ministry Permit SLA"}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-brand-stone-200/90 shadow-2xs">
                <div className="font-mono text-lg sm:text-xl font-bold text-brand-forest">
                  100% Legal
                </div>
                <div className="text-[10px] text-brand-ink-muted uppercase tracking-wider mt-0.5 font-semibold">
                  {isHy ? "Օրինական Կացության Քարտ" : "Residence Card Issuance"}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dimensional Drawing Specification Sheet */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white border border-brand-stone-300 p-6 shadow-xl relative font-sans">
              {/* Technical Spec Title Block */}
              <div className="border-b border-brand-stone-200 pb-3 mb-4">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-brand-ink-subtle">
                  <span>DWG NO: ARM-REC-2026</span>
                  <span>{isHy ? "ՏԱՐԲԵՐԱԿ՝ 2.4 · ՀԱՍՏԱՏՎԱԾ" : "REV: 2.4 · STABLE"}</span>
                </div>
                <div className="flex items-center justify-between mt-1.5">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-brand-forest">
                    {activeSpecTab === "candidate"
                      ? isHy
                        ? "Թեկնածուների Պաշտպանության Կանոնակարգ"
                        : "Candidate Protection Protocol"
                      : isHy
                      ? "Կորպորատիվ Հավաքագրման Կանոնակարգ"
                      : "Enterprise Placement Protocol"}
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-brand-stone-100 text-brand-forest border border-brand-stone-200">
                    {isHy ? "ՍՏՈՒԳՎԱԾ" : "AUDITED"}
                  </span>
                </div>
              </div>

              {/* Segmented Mode Switcher */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-brand-stone-100 rounded-xl mb-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveSpecTab("candidate")}
                  className={`py-2 rounded-lg transition-all cursor-pointer text-center ${
                    activeSpecTab === "candidate"
                      ? "bg-white text-brand-forest shadow-xs font-bold"
                      : "text-brand-ink-muted hover:text-brand-forest"
                  }`}
                >
                  {isHy ? "Թեկնածուի Երաշխիք" : "Job Seeker View"}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSpecTab("employer")}
                  className={`py-2 rounded-lg transition-all cursor-pointer text-center ${
                    activeSpecTab === "employer"
                      ? "bg-white text-brand-forest shadow-xs font-bold"
                      : "text-brand-ink-muted hover:text-brand-forest"
                  }`}
                >
                  {isHy ? "Գործատուի Կանոններ" : "Enterprise Employer"}
                </button>
              </div>

              {/* Dimensional Flow Steps */}
              <div className="space-y-2.5 text-xs mb-5">
                {(activeSpecTab === "candidate" ? candidateStages : employerStages).map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl transition-all ${
                      item.isHighlight
                        ? "bg-brand-olive-subtle border border-brand-olive/40 shadow-2xs"
                        : "bg-brand-stone-50 border border-brand-stone-200/80"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold text-brand-forest font-mono">
                      <span>{item.stage}</span>
                      <span className={item.badgeColor}>{item.badge}</span>
                    </div>
                    <p className="text-[11px] text-brand-ink-muted font-sans mt-1 leading-snug">
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
                  className="w-full py-3 px-4 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer group/cta"
                >
                  <Briefcase className="w-3.5 h-3.5 text-brand-olive-light" />
                  <span>{isHy ? "Ներկայացնել Ռեզյումե (Անվճար)" : "Drop CV for Placement (Zero Fee)"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openEmployerDrawer()}
                  className="w-full py-3 px-4 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer group/cta"
                >
                  <Building2 className="w-3.5 h-3.5 text-brand-olive-light" />
                  <span>{isHy ? "Պատվիրել Աշխատուժի Քվոտա" : "Initiate Staffing Requisition"}</span>
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
