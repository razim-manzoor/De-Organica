"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import {
  Compass,
  Users,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Sparkles,
  Plane,
  Building,
  CheckCircle2,
  Mountain,
  Scale,
  Car,
  Briefcase,
} from "lucide-react";

export function HeroDualGateway() {
  const { locale } = useLanguage();
  const { openTravelDrawer, openCandidateDrawer } = useDrawer();
  const isHy = locale === "hy";

  return (
    <section id="about" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-brand-stone-50">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-architectural-grid" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Top Headline Block */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-stone-300 text-brand-forest text-xs font-semibold tracking-wide shadow-2xs mb-5">
            <span className="w-2 h-2 rounded-full bg-brand-olive" />
            <MapPin className="w-3.5 h-3.5 text-brand-olive" />
            <span className="font-sans uppercase tracking-[0.16em] text-[11px]">
              {isHy ? deorganicaConfig.hero.eyebrow_hy : deorganicaConfig.hero.eyebrow_en}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-forest leading-[1.12] mb-6">
            {isHy ? deorganicaConfig.hero.headline_hy : deorganicaConfig.hero.headline_en}
          </h1>

          <p className="text-base sm:text-lg text-brand-ink-muted leading-relaxed max-w-2xl">
            {isHy ? deorganicaConfig.hero.subtext_hy : deorganicaConfig.hero.subtext_en}
          </p>
        </div>

        {/* 2-Pillar Split Gateway Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pillar I: Travel & Tours (The Natural Heritage & Hospitality Archetype) */}
          <div className="relative group rounded-3xl bg-gradient-to-br from-amber-50/40 via-white to-stone-50 border-2 border-amber-200/60 p-8 sm:p-10 shadow-sm hover:shadow-2xl hover:border-amber-600/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-115" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-100/70 border border-amber-200 flex items-center justify-center text-amber-900 group-hover:bg-brand-forest group-hover:text-white transition-colors duration-300 shadow-2xs">
                  <Compass className="w-7 h-7 transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-mono uppercase tracking-wider font-bold">
                  <Mountain className="w-3 h-3 text-amber-700" />
                  <span>Division I · Travel & Tours</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest mb-3">
                {isHy ? "Դե Օրգանիկա Տուրեր և Ճանապարհորդություն" : "De Organica Travel & Tours"}
              </h2>

              <p className="text-sm text-brand-ink-muted leading-relaxed mb-6">
                {isHy
                  ? "Հեղինակային էքսկուրսիաներ Հայաստանում (Գառնի, Սևան, Տաթև), միջազգային հանգստի փաթեթներ, վիզաների աջակցություն, օդանավակայանի VIP տրանսֆեր և B2B DMC գործընկերություն արտասահմանյան տուրօպերատորների համար:"
                  : "Authentic Armenian monastic journeys, international outbound holidays, full visa assistance, 24/7 EVN airport transfers, and white-label DMC ground handling for global agency partners."}
              </p>

              {/* Service Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "UNESCO Monasteries",
                  "Lake Sevan & Dilijan",
                  "Consular Visa Support",
                  "Mercedes Chauffeurs",
                  "B2B DMC Group Rates",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-lg bg-white text-brand-forest border border-amber-200/80 transition-colors shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-amber-200/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/travel"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep active:scale-95 transition-all shadow-xs group/btn cursor-pointer"
              >
                <span>{isHy ? deorganicaConfig.hero.ctaTravel_hy : deorganicaConfig.hero.ctaTravel_en}</span>
                <ArrowUpRight className="w-4 h-4 text-brand-olive-light transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>

              <button
                type="button"
                onClick={() => openTravelDrawer("Bespoke Private Itinerary")}
                className="inline-flex items-center justify-center px-4 py-3.5 rounded-xl border border-brand-stone-300 bg-white text-brand-forest hover:bg-brand-stone-100 active:scale-95 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                {isHy ? "Պատվիրել անհատական տուր" : "Inquire Custom Trip"}
              </button>
            </div>
          </div>

          {/* Pillar II: Manpower & Recruitment (The High-Trust Legal Mobility Archetype) */}
          <div className="relative group rounded-3xl bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 border-2 border-slate-300 p-8 sm:p-10 shadow-sm hover:shadow-2xl hover:border-emerald-600/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-950/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-115" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-900 group-hover:bg-brand-forest group-hover:text-white transition-colors duration-300 shadow-2xs">
                  <Users className="w-7 h-7 transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-[10px] font-mono uppercase tracking-wider font-bold">
                  <Scale className="w-3 h-3 text-emerald-700" />
                  <span>Division II · Manpower Mobility</span>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest mb-3">
                {isHy ? "Դե Օրգանիկա Միջազգային Աշխատուժ" : "De Organica Manpower & Careers"}
              </h2>

              <p className="text-sm text-brand-ink-muted leading-relaxed mb-6">
                {isHy
                  ? "Էթիկական միջազգային հավաքագրում և աշխատուժի մատակարարում: Զրո նախնական վճար թեկնածուների համար, վճարում միայն աշխատանքի տեղավորումից հետո, լիարժեք օրինական աշխատանքային թույլտվություններ և B2B գործընկերություն:"
                  : "Ethical international workforce supply and talent placement. Zero upfront fees for job-seeking candidates, pay-after-job guarantee, legal Armenian work permits, and turnkey B2B staffing for enterprises."}
              </p>

              {/* Contingency Trust Badge Box */}
              <div className="rounded-xl bg-emerald-50/70 border border-emerald-200/80 p-4 mb-6 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-950 mb-0.5">
                    {isHy ? "Զրո Կանխավճար · Վճարում Միայն Աշխատանքից Հետո" : "Zero Upfront Fees · Contingency Placement"}
                  </h4>
                  <p className="text-[11px] text-emerald-800 leading-normal">
                    {isHy
                      ? "Գրանցման կամ հարցազրույցի վճարներ չկան: Պայմանագրային վճարները գանձվում են միայն հաստատված պայմանագրից և աշխատանքային թույլտվությունից հետո:"
                      : "Strictly zero registration or interview fees for candidates. Terms apply exclusively upon verified employment contract and work permit issuance."}
                  </p>
                </div>
              </div>

              {/* Sector Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "Hospitality & Hotels",
                  "Skilled Trades & Logistics",
                  "Legal Work Permits",
                  "B2B Enterprise Staffing",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-lg bg-white text-brand-forest border border-slate-200/80 transition-colors shadow-2xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/manpower"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep active:scale-95 transition-all shadow-xs group/btn cursor-pointer"
              >
                <span>{isHy ? deorganicaConfig.hero.ctaManpower_hy : deorganicaConfig.hero.ctaManpower_en}</span>
                <ArrowUpRight className="w-4 h-4 text-brand-olive-light transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>

              <button
                type="button"
                onClick={() => openCandidateDrawer()}
                className="inline-flex items-center justify-center px-4 py-3.5 rounded-xl border border-slate-300 bg-white text-brand-forest hover:bg-slate-100 active:scale-95 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                {isHy ? "Ուղարկել ինքնակենսագրական (CV)" : "Submit Candidate CV"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
