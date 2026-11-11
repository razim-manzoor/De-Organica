"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import {
  Compass,
  Users,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Car,
  Scale,
  Sparkles,
  Building,
} from "lucide-react";

export function HeroDualGateway() {
  const { locale } = useLanguage();
  const { openTravelDrawer, openCandidateDrawer } = useDrawer();
  const isHy = locale === "hy";

  return (
    <section id="about" className="relative pt-12 pb-20 lg:pt-16 lg:pb-28 overflow-hidden bg-brand-stone-50">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-architectural-grid" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Top Headline Block */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-olive" />
            <span>{isHy ? deorganicaConfig.hero.eyebrow_hy : deorganicaConfig.hero.eyebrow_en}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-forest leading-[1.12] mb-5">
            {isHy ? deorganicaConfig.hero.headline_hy : deorganicaConfig.hero.headline_en}
          </h1>

          <p className="text-base sm:text-lg text-brand-ink-muted leading-relaxed max-w-2xl font-sans">
            {isHy ? deorganicaConfig.hero.subtext_hy : deorganicaConfig.hero.subtext_en}
          </p>
        </div>

        {/* 2-Pillar Split Gateway Bento Cards with Rich Visual Media */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Pillar I: Travel & Tours */}
          <div className="relative group rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-xs hover:shadow-2xl hover:border-brand-forest/50 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Media Preview Frame */}
              <div className="relative h-52 sm:h-60 w-full rounded-2xl overflow-hidden mb-6 bg-stone-100 shadow-2xs">
                <Image
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
                  alt="Armenian Alpine Highlands and Rivers"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-brand-forest text-xs font-semibold shadow-2xs">
                  <Compass className="w-3.5 h-3.5 text-brand-olive" />
                  <span>{isHy ? "Ուղղություն I · Զբոսաշրջություն" : "Division I · Travel & Tours"}</span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <p className="text-xs font-medium text-amber-200/90 uppercase tracking-wider">
                    {isHy ? "Հայաստանի Բացառիկ Երթուղիներ" : "Inbound Armenia DMC & World Holidays"}
                  </p>
                  <p className="font-serif text-lg font-bold">
                    {isHy ? "Հայաստանի Լեռնաշխարհ և B2B DMC" : "Highlands, Monasteries & VIP Ground Handling"}
                  </p>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest mb-2.5">
                {isHy ? "Զբոսաշրջություն և Տուրեր" : "Travel & Tours"}
              </h2>

              <p className="text-sm text-brand-ink-muted leading-relaxed mb-6 font-sans">
                {isHy
                  ? "Հեղինակային էքսկուրսիաներ Հայաստանում (Գառնի, Սևան, Տաթև), Mercedes VIP տրանսֆեր, վիզաների աջակցություն և B2B DMC տեղական սպասարկում արտասահմանյան գործընկերների համար:"
                  : "Curated Armenian monastic journeys, private Mercedes chauffeur transport, consular visa advisory, and white-label DMC ground handling in Yerevan for global agency partners."}
              </p>

              {/* 3 Core Value Signals */}
              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2.5 text-xs text-stone-700 font-medium">
                  <Car className="w-4 h-4 text-brand-olive shrink-0" />
                  <span>{isHy ? "Mercedes պարկ և 24/7 Զվարթնոց օդանավակայանի դիմավորում" : "Private Mercedes Fleet & 24/7 Zvartnots EVN Meet"}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-stone-700 font-medium">
                  <Compass className="w-4 h-4 text-brand-olive shrink-0" />
                  <span>{isHy ? "ՅՈՒՆԵՍԿՕ-ի ժառանգության վայրեր և գինու վարպետության դասեր" : "UNESCO Monastic Sanctuaries & Areni Wine Terroirs"}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-stone-700 font-medium">
                  <Sparkles className="w-4 h-4 text-brand-olive shrink-0" />
                  <span>{isHy ? "Մեծածախ B2B Net սակագներ արտերկրի տուրօպերատորներին" : "Wholesale B2B Net Tariffs for International Agencies"}</span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-stone-200/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 active:scale-95 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                {isHy ? "Պատվիրել անհատական տուր" : "Inquire Custom Trip"}
              </button>
            </div>
          </div>

          {/* Pillar II: Manpower & Recruitment */}
          <div className="relative group rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 shadow-xs hover:shadow-2xl hover:border-brand-forest/50 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            <div>
              {/* Media Preview Frame */}
              <div className="relative h-52 sm:h-60 w-full rounded-2xl overflow-hidden mb-6 bg-stone-100 shadow-2xs">
                <Image
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80"
                  alt="Verified Hospitality and Enterprise Talent"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-emerald-900 text-xs font-semibold shadow-2xs">
                  <Users className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{isHy ? "Ուղղություն II · Միջազգային Աշխատուժ" : "Division II · International Manpower"}</span>
                </div>

                <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                  <p className="text-xs font-medium text-emerald-300 uppercase tracking-wider">
                    {isHy ? "Էթիկական Հավաքագրում և Կացություն" : "Ethical Mobility & Turnkey Placement"}
                  </p>
                  <p className="font-serif text-lg font-bold">
                    {isHy ? "Զրո Կանխավճար և Օրինական Թույլտվություններ" : "Zero Candidate Fee · 100% Legal Work Permits"}
                  </p>
                </div>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest mb-2.5">
                {isHy ? "Միջազգային Աշխատուժ և Կարիերա" : "Manpower & Careers"}
              </h2>

              <p className="text-sm text-brand-ink-muted leading-relaxed mb-6 font-sans">
                {isHy
                  ? "Էթիկական միջազգային հավաքագրում և աշխատուժի մատակարարում: Զրո նախնական վճար թեկնածուներից, լիարժեք օրինական աշխատանքային թույլտվություններ և B2B գործընկերություն:"
                  : "Ethical international talent placement and verified workforce supply for enterprise employers across Armenia. Operating on an uncompromising candidate-first charter."}
              </p>

              {/* 3 Core Value Signals */}
              <div className="space-y-2.5 mb-8">
                <div className="flex items-center gap-2.5 text-xs text-stone-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{isHy ? "0.00 AMD նախնական գրանցման վճար թեկնածուներից" : "Strict 0.00 AMD Upfront Fee Guarantee for Candidates"}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-stone-700 font-medium">
                  <Scale className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{isHy ? "ՀՀ միգրացիոն ծառայության 100% օրինական աշխատանքի թույլտվություն" : "100% Legal Ministry of Labor & Migration Work Permits"}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-stone-700 font-medium">
                  <Building className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{isHy ? "14-21 օր առաջնային տեղավորման ժամանակացույց գործատուներին" : "14–21 Day Enterprise Deployment SLA with Replacement Guarantee"}</span>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-stone-200/80 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
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
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 active:scale-95 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
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
