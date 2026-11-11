"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { Compass, Users, ArrowUpRight, ShieldCheck, MapPin, Sparkles } from "lucide-react";

export function HeroDualGateway() {
  const { locale } = useLanguage();
  const { openTravelDrawer, openCandidateDrawer } = useDrawer();
  const isHy = locale === "hy";

  return (
    <section id="about" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-brand-stone-50">
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#233D20 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Top Headline Block */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-stone-100 border border-brand-stone-300 text-brand-forest text-xs font-semibold uppercase tracking-wider mb-5">
            <span className="w-2 h-2 rounded-full bg-brand-olive" />
            <MapPin className="w-3.5 h-3.5 text-brand-olive" />
            <span>{isHy ? deorganicaConfig.hero.eyebrow_hy : deorganicaConfig.hero.eyebrow_en}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-forest leading-[1.12] mb-6">
            {isHy ? deorganicaConfig.hero.headline_hy : deorganicaConfig.hero.headline_en}
          </h1>

          <p className="text-base sm:text-lg text-brand-ink-muted leading-relaxed max-w-2xl">
            {isHy ? deorganicaConfig.hero.subtext_hy : deorganicaConfig.hero.subtext_en}
          </p>
        </div>

        {/* 2-Pillar Split Gateway Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Pillar I: Travel & Tours */}
          <div className="relative group rounded-2xl bg-white border border-brand-stone-200 p-8 sm:p-10 shadow-xs hover:shadow-xl hover:border-brand-olive/50 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-brand-olive/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-brand-stone-100 border border-brand-stone-200 flex items-center justify-center text-brand-forest group-hover:bg-brand-forest group-hover:text-white transition-colors duration-300">
                  <Compass className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-brand-olive bg-brand-olive-subtle px-3 py-1 rounded-full">
                  Pillar I · Inbound & Outbound
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest mb-3">
                {isHy ? "Դե Օրգանիկա Տուրեր և Ճանապարհորդություն" : "De Organica Travel & Tours"}
              </h2>

              <p className="text-sm text-brand-ink-muted leading-relaxed mb-6">
                {isHy
                  ? "Հեղինակային էքսկուրսիաներ Հայաստանում, միջազգային հանգստի փաթեթներ (Վրաստան, Դուբայ, Եվրոպա), վիզաների աջակցություն, օդանավակայանի VIP տրանսֆեր և B2B DMC գործընկերություն արտասահմանյան տուրօպերատորների համար:"
                  : "Authentic Armenian cultural journeys, international outbound holidays (Georgia, UAE, Europe), full visa assistance, 24/7 EVN airport transfers, and white-label DMC ground handling for global agency partners."}
              </p>

              {/* Service Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Cultural Tours", "Lake Sevan & Tatev", "Visa Consultation", "EVN Transfers", "B2B DMC Net Rates"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-brand-stone-100 text-brand-forest border border-brand-stone-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-brand-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/travel"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-all shadow-xs"
              >
                <span>{isHy ? deorganicaConfig.hero.ctaTravel_hy : deorganicaConfig.hero.ctaTravel_en}</span>
                <ArrowUpRight className="w-4 h-4 text-brand-olive-light" />
              </Link>

              <button
                type="button"
                onClick={() => openTravelDrawer()}
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-brand-stone-300 text-brand-ink-muted hover:text-brand-forest hover:bg-brand-stone-100 text-xs font-medium transition-colors"
              >
                {isHy ? "Պատվիրել անհատական տուր" : "Inquire Custom Trip"}
              </button>
            </div>
          </div>

          {/* Pillar II: Manpower & Staffing */}
          <div className="relative group rounded-2xl bg-white border border-brand-stone-200 p-8 sm:p-10 shadow-xs hover:shadow-xl hover:border-brand-olive/50 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-brand-forest/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-xl bg-brand-stone-100 border border-brand-stone-200 flex items-center justify-center text-brand-forest group-hover:bg-brand-forest group-hover:text-white transition-colors duration-300">
                  <Users className="w-7 h-7" />
                </div>
                <span className="text-[11px] font-sans font-bold uppercase tracking-[0.2em] text-brand-forest bg-brand-stone-200 px-3 py-1 rounded-full">
                  Pillar II · Global Mobility
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest mb-3">
                {isHy ? "Դե Օրգանիկա Միջազգային Աշխատուժ" : "De Organica Manpower"}
              </h2>

              <p className="text-sm text-brand-ink-muted leading-relaxed mb-6">
                {isHy
                  ? "Որակավորված մասնագետների հավաքագրում հյուրընկալության, շինարարության և լոգիստիկայի ոլորտներում: Զրոյական նախնական վճար թեկնածուներին, պաշտոնական աշխատանքի թույլտվություն և B2B կորպորատիվ համալրում:"
                  : "Verified international recruitment serving candidates and hiring corporations. Operating on an ethical Zero Upfront Fee model with official Republic of Armenia work permit processing and seamless arrival onboarding."}
              </p>

              {/* Manpower Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["Zero Upfront Fees", "Pay-After-Job", "Hospitality Staff", "Skilled Trades", "B2B Staffing"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-brand-stone-100 text-brand-forest border border-brand-stone-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-brand-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/manpower"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-all shadow-xs"
              >
                <span>{isHy ? deorganicaConfig.hero.ctaManpower_hy : deorganicaConfig.hero.ctaManpower_en}</span>
                <ArrowUpRight className="w-4 h-4 text-brand-olive-light" />
              </Link>

              <button
                type="button"
                onClick={() => openCandidateDrawer()}
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl border border-brand-stone-300 text-brand-ink-muted hover:text-brand-forest hover:bg-brand-stone-100 text-xs font-medium transition-colors"
              >
                {isHy ? "Ուղարկել CV / Ռեզյումե" : "Submit Candidate CV"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
