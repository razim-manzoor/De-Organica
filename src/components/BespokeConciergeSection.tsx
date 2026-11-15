"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { useSiteData } from "@/context/SiteDataContext";
import { buildWhatsAppUrl, buildTravelWhatsAppMessage } from "@/lib/whatsapp";
import {
  Compass,
  Calendar,
  Car,
  Wine,
  Plane,
  ArrowRight,
  MessageCircle,
  Phone,
  Clock,
  ShieldCheck,
} from "lucide-react";

export function BespokeConciergeSection() {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const { siteSettings } = useSiteData();
  const isHy = locale === "hy";

  const handleWhatsAppBespoke = () => {
    const msg = buildTravelWhatsAppMessage({
      name: "Traveler / Partner",
      serviceOrTour: "Bespoke Armenia Journey Consultation",
      notes: isHy
        ? "Բարև Ձեզ, ցանկանում եմ կազմել անհատական երթուղի Հայաստանում և քննարկել մանրամասները:"
        : "Hello De Organica team, I would like to design a bespoke private itinerary in Armenia and discuss custom dates and pacing.",
    });
    window.open(
      buildWhatsAppUrl(msg, siteSettings.company.whatsappNumberDigits),
      "_blank",
      "noopener,noreferrer"
    );
  };

  const pillars = [
    {
      icon: Calendar,
      title_en: "Flexible Duration & Pacing",
      title_hy: "Ճկուն Տևողություն և Ժամանակացույց",
      tagline_en: "3 to 14 Days · Self-Paced Routing",
      tagline_hy: "3-ից 14 Օր · Անհատական Գրաֆիկ",
      desc_en:
        "Every journey is mapped to your specific calendar. Whether an intimate 3-day anniversary getaway or a 10-day overland expedition, we tailor the rhythm to your travel style.",
      desc_hy:
        "Երթուղիները կազմվում են ըստ Ձեր օրացույցի: 3-օրյա հանգստից մինչև 10-օրյա համապարփակ շրջագայություններ՝ առանց շտապողականության, Ձեր նախընտրած տեմպով:",
    },
    {
      icon: Car,
      title_en: "Executive Chauffeur Fleet",
      title_hy: "Սեփական Տրանսպորտային Պարկ",
      tagline_en: "Sedans, VIP Minivans & Mountain 4x4s",
      tagline_hy: "Սեդաններ, VIP Միկրոավտոբուսներ և Ամենագնացներ",
      desc_en:
        "Travel in immaculate comfort with our private fleet: modern Mercedes sedans, spacious 16-seat VIP Mercedes Sprinters, and rugged 4x4 SUVs with seasoned, English-speaking chauffeurs.",
      desc_hy:
        "Անվտանգ և հարմարավետ տեղաշարժ մեր ավտոպարկով՝ Mercedes սեդաններ, VIP միկրոավտոբուսներ և ամենագնացներ՝ փորձառու բազմալեզու վարորդներով:",
    },
    {
      icon: Wine,
      title_en: "Privileged Terroir & Monastic Access",
      title_hy: "Բացառիկ Գինու և Մշակութային Մուտք",
      tagline_en: "Areni-1 Caves · Sommelier Tastings",
      tagline_hy: "Արենի-1 Քարանձավ · Սոմելիեի Համտեսներ",
      desc_en:
        "Gain privileged entry to historic Areni-1 cave cellars, private barrel rooms, and cliffside monasteries with licensed national guides, paired with authentic village tonir baking.",
      desc_hy:
        "Արտոնյալ այցելություններ Արենի-1 պատմական քարանձավ, բուտիկ գինեգործարանների տակառային սրահներ և վանքեր՝ արտոնագրված էքսկուրսավարների ուղեկցությամբ:",
    },
    {
      icon: Plane,
      title_en: "24/7 Zvartnots (EVN) Coordination",
      title_hy: "24/7 Զվարթնոց (EVN) Դիմավորում",
      tagline_en: "Flight Tracking · Curbside Meet & Greet",
      tagline_hy: "Թռիչքների Հետևում · Անհատական Դիմավորում",
      desc_en:
        "Direct airport reception at Zvartnots arrivals with personalized agency or guest signage, free waiting for flight delays, luggage handling, and direct transfers to your hotel.",
      desc_hy:
        "Օդանավակայանի դիմավորում Ձեր ընկերության կամ հյուրի անվամբ, անվճար սպասում չվերթի ուշացման դեպքում և անհատական տեղափոխում հյուրանոց:",
    },
  ];

  return (
    <section
      id="bespoke-concierge"
      className="scroll-mt-20 py-20 lg:py-28 bg-brand-stone-50 border-t border-brand-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-3">
              <span>
                {isHy
                  ? "Անհատական Երթուղիներ · Երևանի Գլխավոր Դեսկ"
                  : "Bespoke Travel Planning · Yerevan Desk"}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
              {isHy
                ? "Ձեր Անհատական Ճանապարհորդությունը Հայաստանում"
                : "Handcrafted Private Journeys Across Armenia"}
            </h2>

            <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
              {isHy
                ? "Չգտա՞ք Ձեր նախընտրած երթուղին մեր պատրաստի փաթեթներում: 3-օրյա գինու հանգստից մինչև 10-օրյա համապարփակ մշակութային շրջագայություններ՝ մեր Երևանի թիմը կազմում է անհատական երթուղիներ՝ հարմարեցված Ձեր ժամկետներին, խմբի կազմին և նախասիրություններին:"
                : "Don't see your ideal route in our catalog? From 3-day weekend wine escapes to 10-day comprehensive cultural expeditions, our Yerevan team crafts bespoke day-by-day itineraries tailored precisely to your dates, party size, and pacing."}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-full bg-brand-stone-100 border border-brand-stone-200 text-brand-forest text-xs font-semibold shrink-0">
            <Clock className="w-3.5 h-3.5 text-brand-olive-text shrink-0" />
            <span>
              {isHy
                ? "Արձագանք՝ 4 աշխատանքային ժամում"
                : "Desk Response Within 4 Hours"}
            </span>
          </div>
        </div>

        {/* 4 Pillars of Bespoke Craft Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group rounded-3xl bg-white border border-brand-stone-200/90 p-7 flex flex-col justify-between hover-lift hover:border-brand-olive/50 transition-[border-color,box-shadow,transform] duration-300 shadow-sm"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-brand-stone-100 border border-brand-stone-200 flex items-center justify-center text-brand-forest mb-5 group-hover:bg-brand-olive-subtle transition-colors">
                    <Icon className="w-6 h-6 text-brand-olive-text" />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-brand-olive-text block mb-1">
                    {isHy ? pillar.tagline_hy : pillar.tagline_en}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-brand-forest mb-3 group-hover:text-brand-forest-deep transition-colors">
                    {isHy ? pillar.title_hy : pillar.title_en}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-brand-ink-muted leading-relaxed font-normal">
                    {isHy ? pillar.desc_hy : pillar.desc_en}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-brand-stone-100 flex items-center gap-1.5 text-xs font-semibold text-brand-forest group-hover:text-brand-olive-text transition-colors">
                  <ShieldCheck className="w-4 h-4 text-brand-olive-text shrink-0" />
                  <span>
                    {isHy ? "100% Անհատական Մոտեցում" : "100% Tailored to You"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action & Direct Consultation Banner */}
        <div className="rounded-3xl bg-brand-forest text-white p-8 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-olive-onDark block mb-2">
              {isHy ? "Անհատական Երթուղու Կազմում" : "Private Itinerary Design"}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              {isHy
                ? "Սկսեք Ձեր Երթուղու Ծրագրումը Մեր Դիզայների Հետ"
                : "Plan Your Private Armenian Itinerary"}
            </h3>
            <p className="text-brand-stone-200 text-xs sm:text-sm leading-relaxed">
              {isHy
                ? "Նշեք Ձեր այցելության նախընտրելի օրերը, հյուրերի քանակը և նախասիրությունները: Մենք կտրամադրենք ամբողջական օրացուցային ծրագիր՝ հարմարեցված Ձեր ցանկություններին:"
                : "Share your travel dates, party size, and interests. Our Yerevan travel designers deliver a complete day-by-day routing with accommodation options and private chauffeur within 4 business hours."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
            <button
              type="button"
              onClick={() => openTravelDrawer("Bespoke Private Itinerary")}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3.5 rounded-xl bg-white text-brand-forest text-xs font-bold uppercase tracking-wider hover:bg-brand-stone-100 transition-all active:scale-95 shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-brand-olive-text" />
              <span>{isHy ? "Պատվիրել Անհատական Երթուղի" : "Request Custom Route"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleWhatsAppBespoke}
              className="w-full sm:w-auto min-h-[44px] px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-all active:scale-95 shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>{isHy ? "WhatsApp Խորհրդատվություն" : "Chat on WhatsApp"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
