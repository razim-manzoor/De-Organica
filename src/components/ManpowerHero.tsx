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
} from "lucide-react";

export function ManpowerHero() {
  const { locale } = useLanguage();
  const { openCandidateDrawer, openEmployerDrawer } = useDrawer();
  const [activeSpecTab, setActiveSpecTab] = useState<"candidate" | "employer">(
    "candidate"
  );
  const isHy = locale === "hy";

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-slate-50 via-brand-stone-50 to-slate-100/70 overflow-hidden border-b border-brand-stone-200">
      {/* Precision Blueprint Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-architectural-grid" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Institutional Legal Mobility Narrative */}
          <div className="lg:col-span-7">
            {/* Regulatory Compliance Eyebrow */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/90 text-emerald-900 text-[11px] font-mono tracking-wider shadow-2xs">
                <Scale className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span>REPUBLIC OF ARMENIA · MINISTRY OF LABOR FRAMEWORK</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-brand-stone-300 text-brand-forest text-[11px] font-semibold shadow-2xs">
                <ShieldCheck className="w-3 h-3 text-brand-olive shrink-0" />
                <span>PAY-AFTER-JOB GUARANTEE</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-forest leading-[1.12] mb-6">
              {isHy
                ? "Էթիկական Հավաքագրում և Օրինական Աշխատանքային Շարժունություն"
                : "Ethical Workforce Mobility & Verified International Recruitment"}
            </h1>

            <p className="text-base sm:text-lg text-brand-ink-muted leading-relaxed mb-8 max-w-2xl">
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
              <div className="p-3 rounded-xl bg-white border border-brand-stone-200 shadow-2xs">
                <div className="font-mono text-lg sm:text-xl font-bold text-emerald-800">
                  0.00 AMD
                </div>
                <div className="text-[10px] text-brand-ink-muted uppercase tracking-wider mt-0.5">
                  Upfront Candidate Fee
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-brand-stone-200 shadow-2xs">
                <div className="font-mono text-lg sm:text-xl font-bold text-brand-forest">
                  15–25 Days
                </div>
                <div className="text-[10px] text-brand-ink-muted uppercase tracking-wider mt-0.5">
                  Ministry Permit SLA
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-brand-stone-200 shadow-2xs">
                <div className="font-mono text-lg sm:text-xl font-bold text-brand-forest">
                  100% Legal
                </div>
                <div className="text-[10px] text-brand-ink-muted uppercase tracking-wider mt-0.5">
                  Residence Card Issuance
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dimensional Drawing Specification Sheet */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white border-2 border-slate-300 p-5 shadow-xl relative font-sans">
              {/* Technical Spec Title Block */}
              <div className="border-b border-slate-200 pb-3 mb-4">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  <span>DWG NO: ARM-REC-2026</span>
                  <span>REV: 2.4 · STABLE</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <h3 className="font-serif text-lg font-bold text-brand-forest">
                    {activeSpecTab === "candidate"
                      ? "Candidate Protection Protocol"
                      : "Enterprise Placement Protocol"}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    STATUS: AUDITED
                  </span>
                </div>
              </div>

              {/* Segmented Mode Switcher */}
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl mb-4 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setActiveSpecTab("candidate")}
                  className={`py-2 rounded-lg transition-all cursor-pointer text-center ${
                    activeSpecTab === "candidate"
                      ? "bg-white text-brand-forest shadow-xs font-bold"
                      : "text-slate-600 hover:text-brand-forest"
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
                      : "text-slate-600 hover:text-brand-forest"
                  }`}
                >
                  {isHy ? "Գործատուի Կանոններ" : "Enterprise Employer"}
                </button>
              </div>

              {/* Dimensional Flow Steps (Apple Spec Sheet Style) */}
              <div className="space-y-3 font-mono text-xs mb-5">
                {activeSpecTab === "candidate" ? (
                  <>
                    <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300">
                      <div className="flex items-center justify-between text-[11px] font-bold text-brand-forest">
                        <span>STAGE 01 · REGISTRATION</span>
                        <span className="text-emerald-700">FEE = 0.00 AMD</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-sans mt-1">
                        Free CV drop. Zero application, resume review, or registration fees.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300">
                      <div className="flex items-center justify-between text-[11px] font-bold text-brand-forest">
                        <span>STAGE 02 · SKILL VETTING</span>
                        <span className="text-slate-500">REMOTE / HYBRID</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-sans mt-1">
                        Document verification, trade skill check, and employer interview.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                      <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900">
                        <span>STAGE 03 · WORK PERMIT</span>
                        <span className="text-emerald-700">100% MINISTRY LEGAL</span>
                      </div>
                      <p className="text-[11px] text-emerald-800 font-sans mt-1">
                        Official work permit & residence card via Unified Migration Service.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300">
                      <div className="flex items-center justify-between text-[11px] font-bold text-brand-forest">
                        <span>STAGE 04 · ARRIVAL & PAY</span>
                        <span className="text-brand-forest">PAY-AFTER-JOB</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-sans mt-1">
                        Zvartnots airport reception, housing orientation, and contract start.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300">
                      <div className="flex items-center justify-between text-[11px] font-bold text-brand-forest">
                        <span>STAGE 01 · QUOTA REQUISITION</span>
                        <span className="text-slate-500">SLA: 48 HOURS</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-sans mt-1">
                        Employer submits headcount requirements & ministry quota parameters.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300">
                      <div className="flex items-center justify-between text-[11px] font-bold text-brand-forest">
                        <span>STAGE 02 · CANDIDATE DOSSIERS</span>
                        <span className="text-brand-forest">PRE-SCREENED</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-sans mt-1">
                        Shortlist of pre-screened talent across construction, hospitality, and trades.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                      <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900">
                        <span>STAGE 03 · PERMIT SPONSORSHIP</span>
                        <span className="text-emerald-700">FULL COMPLIANCE</span>
                      </div>
                      <p className="text-[11px] text-emerald-800 font-sans mt-1">
                        De Organica handles work permit filing and state migration paperwork.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-dashed border-slate-300">
                      <div className="flex items-center justify-between text-[11px] font-bold text-brand-forest">
                        <span>STAGE 04 · ONBOARDING & SLA</span>
                        <span className="text-brand-forest">30-DAY GUARANTEE</span>
                      </div>
                      <p className="text-[11px] text-slate-600 font-sans mt-1">
                        Direct employee deployment with a 30-day candidate replacement warranty.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Action Button */}
              {activeSpecTab === "candidate" ? (
                <button
                  type="button"
                  onClick={() => openCandidateDrawer()}
                  className="w-full py-2.5 px-4 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer group/cta"
                >
                  <Briefcase className="w-3.5 h-3.5 text-brand-olive-light" />
                  <span>{isHy ? "Ներկայացնել Ռեզյումե (Անվճար)" : "Drop CV for Placement (Zero Fee)"}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openEmployerDrawer()}
                  className="w-full py-2.5 px-4 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer group/cta"
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
