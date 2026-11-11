"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { Building2, ShieldCheck, Bus, Clock, Handshake, Users2, ArrowRight } from "lucide-react";

export function DmcPartnerSection() {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const isHy = locale === "hy";

  const dmcPillars = [
    {
      icon: <Building2 className="w-5 h-5 text-brand-olive" />,
      title_en: "Net Wholesale DMC Tariffs",
      title_hy: "Զուտ մեծածախ սակագներ",
      desc_en: "Exclusive B2B group pricing for travel agents in India, UAE, CIS, Europe, and Asia sending leisure groups to Armenia.",
      desc_hy: "Հատուկ գներ արտասահմանյան տուրիստական գործակալությունների համար՝ խմբային տուրերի կազմակերպման նպատակով:",
    },
    {
      icon: <Bus className="w-5 h-5 text-brand-olive" />,
      title_en: "Dedicated Fleet & Chauffeurs",
      title_hy: "Սեփական տրանսպորտային պարկ",
      desc_en: "Modern Mercedes-Benz sedans, VIP Sprinters (16-19 seats), and luxury coaches with experienced English-speaking drivers.",
      desc_hy: "Ժամանակակից Mercedes մարդատար մեքենաներ, Sprinter միկրոավտոբուսներ և տուրիստական ավտոբուսներ:",
    },
    {
      icon: <Handshake className="w-5 h-5 text-brand-olive" />,
      title_en: "White-Label Airport Reception",
      title_hy: "Դիմավորում գործընկերոջ բրենդով",
      desc_en: "Your clients are welcomed at Zvartnots EVN Airport under your agency's name and brand identity with uncompromised hospitality.",
      desc_hy: "Ձեր հյուրերը Զվարթնոց օդանավակայանում դիմավորվում են Ձեր ընկերության անվամբ և բրենդավորմամբ:",
    },
    {
      icon: <Clock className="w-5 h-5 text-brand-olive" />,
      title_en: "4-Hour Quotation Guarantee",
      title_hy: "Արագ գնառաջարկ 4 ժամում",
      desc_en: "Direct communication with our Yerevan inbound team. Itineraries, hotel allotments, and net invoices generated within 4 hours.",
      desc_hy: "Օպերատիվ կապ մեր Երևանի գրասենյակի հետ: Ծրագրի և հաշիվ-ապրանքագրի տրամադրում 4 ժամվա ընթացքում:",
    },
  ];

  return (
    <section id="dmc" className="py-20 lg:py-28 bg-brand-forest text-white relative overflow-hidden border-t border-brand-forest-deep">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-light mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-olive-light" />
            <span>{isHy ? "B2B Տեղական Գործընկեր · Երևան Դեսկ" : "B2B Destination Management · Institutional Ground Handling"}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {isHy ? "Հայաստանի Վստահելի DMC Գործընկեր" : "Armenia's Institutional Ground Handling Partner"}
          </h2>

          <p className="text-brand-stone-300 text-sm sm:text-base leading-relaxed">
            {isHy
              ? "Մենք ապահովում ենք ամբողջական տեղական սպասարկում արտասահմանյան տուրիստական ընկերությունների, MICE կազմակերպիչների և կորպորատիվ հաճախորդների համար:"
              : "We serve as the on-the-ground extension for international travel management companies, handling every element of ground hospitality in the Republic of Armenia."}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {dmcPillars.map((pillar, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xs hover:bg-white/10 transition-colors space-y-3"
            >
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="font-serif text-base font-bold text-white">
                {isHy ? pillar.title_hy : pillar.title_en}
              </h3>
              <p className="text-xs text-brand-stone-300 leading-relaxed">
                {isHy ? pillar.desc_hy : pillar.desc_en}
              </p>
            </div>
          ))}
        </div>

        {/* Action Callout Box */}
        <div className="rounded-2xl bg-white/10 border border-white/15 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-xs">
          <div>
            <h3 className="font-serif text-xl font-bold mb-2">
              {isHy ? "Ցանկանու՞մ եք համագործակցել որպես B2B Գործընկեր" : "Are you an International Travel Agency or Tour Operator?"}
            </h3>
            <p className="text-xs sm:text-sm text-brand-stone-300 max-w-xl">
              {isHy
                ? "Գրանցվեք որպես գործընկեր՝ ստանալու մեր մեծածախ սակագները, հյուրանոցային հատուկ պայմանները և տրանսպորտային լոգիստիկան:"
                : "Register with our Yerevan DMC desk to receive contract net tariffs, seasonal hotel allotments, and dedicated account management for Armenia inbound."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openTravelDrawer("B2B Travel Partner DMC Agreement")}
            className="self-start md:self-auto px-6 py-3 rounded-xl bg-brand-olive text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-olive-light transition-all flex items-center gap-2 shadow-md hover:scale-102 flex-shrink-0"
          >
            <span>{isHy ? "Գրանցվել որպես Գործընկեր" : "Register as B2B Partner"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
