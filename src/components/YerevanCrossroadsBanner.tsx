"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Car, FileCheck2, Globe, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export function YerevanCrossroadsBanner() {
  const { locale } = useLanguage();
  const isHy = locale === "hy";

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-brand-forest text-white overflow-hidden border-y border-stone-800">
      {/* Background Architectural Watermark */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-architectural-grid" />
      <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-brand-olive/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-olive-light">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-olive-light" />
              <span>
                {isHy
                  ? "Տեղական Գործառնություններ · Հայաստանի Հանրապետություն"
                  : "Sovereign Ground Execution · Republic of Armenia"}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-[1.18] text-white tracking-tight">
              {isHy
                ? "Արևելքի և Արևմուտքի խաչմերուկում Երևանը մեր հենասյունն է:"
                : "At the historic crossroads of the Caucasus, Yerevan is our anchor."}
            </h2>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans max-w-xl">
              {isHy
                ? "«Դե Օրգանիկա» ՍՊԸ-ն գործում է անմիջապես Երևանից՝ միավորելով հայկական բացառիկ պատմական ժառանգությունը, B2B DMC տեղական սպասարկումը և միջազգային կարգապահ աշխատուժի շարժունակությունը:"
                : "De Organica LLC operates directly from Yerevan, bridging ancient Silk Road culture, bespoke B2B DMC ground handling, and disciplined international human capital mobility."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <Link
                href="/travel"
                className="inline-flex items-center gap-1.5 text-brand-olive-light font-semibold hover:text-white transition-colors cursor-pointer"
              >
                <span>{isHy ? "Տեսնել տուրերը" : "Explore Travel Division"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-stone-600">·</span>
              <Link
                href="/manpower"
                className="inline-flex items-center gap-1.5 text-brand-olive-light font-semibold hover:text-white transition-colors cursor-pointer"
              >
                <span>{isHy ? "Տեսնել աշխատատեղերը" : "Explore Manpower Division"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Institutional Telemetry Chips */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-start gap-4 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-olive/20 border border-brand-olive/30 flex items-center justify-center shrink-0 text-brand-olive-light mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-white mb-1">
                  {isHy ? "100% Սեփական Տեղական Գործառնություններ" : "100% In-House Direct Ground Operations"}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {isHy
                    ? "Զրո միջնորդ: Տրանսպորտի, էքսկուրսավարների և պայմանագրերի անմիջական վերահսկողություն Երևանի թիմի կողմից:"
                    : "Zero outsourced middlemen. Complete operational control over private fleet, guide licensing, and legal contracts."}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-start gap-4 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-olive/20 border border-brand-olive/30 flex items-center justify-center shrink-0 text-brand-olive-light mt-0.5">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-white mb-1">
                  {isHy ? "Զվարթնոց (EVN) 24/7 Դիվանագիտական Դիսպետչեր" : "Zvartnots EVN 24/7 Chauffeur Dispatch"}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {isHy
                    ? "Մասնավոր Executive ավտոպարկի դիմավորում օդանավակայանում ժամանման ցանկացած ժամի:"
                    : "Dedicated airport meet-and-greet, live flight tracking, and executive VIP transfers across Armenia."}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex items-start gap-4 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-olive/20 border border-brand-olive/30 flex items-center justify-center shrink-0 text-brand-olive-light mt-0.5">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-white mb-1">
                  {isHy ? "ՀՀ Աշխատանքի Նախարարության Քվոտաներ" : "Official RA Ministry Work Quota Compliance"}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {isHy
                    ? "workpermit.am պաշտոնական հարթակի և Միգրացիոն ծառայության լիարժեք օրինական համապատասխանություն:"
                    : "Unified workpermit.am filings and integrated temporary residence clearances for corporate employers."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
