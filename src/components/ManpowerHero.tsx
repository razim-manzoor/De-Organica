"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { Users2, ShieldCheck, Briefcase, Building2, ArrowRight } from "lucide-react";

export function ManpowerHero() {
  const { locale } = useLanguage();
  const { openCandidateDrawer, openEmployerDrawer } = useDrawer();
  const isHy = locale === "hy";

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-brand-stone-50 overflow-hidden border-b border-brand-stone-200">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#233D20 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-stone-100 border border-brand-stone-300 text-brand-forest text-xs font-semibold uppercase tracking-wider mb-5">
            <Users2 className="w-3.5 h-3.5 text-brand-olive" />
            <span>{isHy ? "Դե Օրգանիկա Միջազգային Աշխատուժ" : "Division II · International Manpower"}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-forest leading-[1.12] mb-6">
            {isHy
              ? "Որակավորված Միջազգային Աշխատուժ և Էթիկական Հավաքագրում"
              : "Ethical Workforce Mobility & Verified International Recruitment"}
          </h1>

          <p className="text-base sm:text-lg text-brand-ink-muted leading-relaxed mb-8 max-w-2xl">
            {isHy
              ? "Մենք կապում ենք որակավորված միջազգային մասնագետներին Հայաստանի առաջատար գործատուների հետ: Թեկնածուների համար գործում է զրոյական նախնական վճարի երաշխիք, իսկ գործատուների համար՝ աշխատանքի թույլտվությունների լիարժեք իրավական ապահովում:"
              : "Bridging global skilled trades, hospitality talent, and logistics professionals with enterprise employers in Armenia. Operating on a transparent Pay-After-Job model with official Ministry of Labor work permits."}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => openCandidateDrawer()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-forest text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-forest-deep transition-all shadow-sm"
            >
              <Briefcase className="w-4 h-4 text-brand-olive-light" />
              <span>{isHy ? "Թեկնածուներին · Ուղարկել CV" : "Job Seekers · Submit CV"}</span>
            </button>

            <button
              type="button"
              onClick={() => openEmployerDrawer()}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-brand-stone-300 bg-white text-brand-forest text-xs font-semibold hover:bg-brand-stone-100 transition-colors"
            >
              <Building2 className="w-4 h-4 text-brand-olive" />
              <span>{isHy ? "Գործատուներին · Պատվիրել աշխատուժ" : "Employers · Hire Manpower"}</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center gap-2 pt-8 mt-8 border-t border-brand-stone-200">
            {["Zero Upfront Application Fees", "Pay-After-Placement Guarantee", "Legal Work Permits & Visas", "EVN Airport Reception & Housing"].map((badge) => (
              <span
                key={badge}
                className="text-[11px] font-medium px-3 py-1 rounded-full bg-brand-olive-subtle/70 text-brand-forest border border-brand-olive/30 shadow-2xs flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-brand-olive" />
                <span>{badge}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
