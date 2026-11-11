"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { buildWhatsAppUrl, buildTravelWhatsAppMessage } from "@/lib/whatsapp";
import {
  Compass,
  Plane,
  FileCheck,
  Car,
  Sparkles,
  Building2,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Compass: <Compass className="w-5 h-5" />,
  Plane: <Plane className="w-5 h-5" />,
  FileCheck: <FileCheck className="w-5 h-5" />,
  Car: <Car className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Building2: <Building2 className="w-5 h-5" />,
};

export function TravelServicesMatrix() {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const isHy = locale === "hy";

  const handleWhatsAppClick = (serviceTitle: string) => {
    const msg = buildTravelWhatsAppMessage({
      serviceOrTour: serviceTitle,
      notes: isHy
        ? "Բարև Ձեզ, ցանկանում եմ ստանալ մանրամասն տեղեկատվություն այս տուրիստական ծառայության վերաբերյալ:"
        : "Hello De Organica team, I would like to inquire about this ground service tariff and availability.",
    });
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="travel-services" className="py-20 lg:py-28 bg-white border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-olive" />
            <span>{isHy ? "Տեղական Գետնային Սպասարկում" : "Local Ground Operations"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
            {isHy ? "Ամբողջական Տուրիստական Ծառայություններ Հայաստանում" : "Complete Travel & Ground Services in Armenia"}
          </h2>
          <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
            {isHy
              ? "Պատմամշակութային շրջագայություններից մինչև վիզաների աջակցություն, անհատական տրանսպորտ և Զվարթնոց (EVN) օդանավակայանի 24/7 դիմավորում:"
              : "From signature overland expeditions and consular visa support to private chauffeur transfers and 24/7 Zvartnots (EVN) airport dispatch."}
          </p>
        </div>

        {/* 6-Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deorganicaConfig.travelServices.map((service) => (
            <div
              key={service.id}
              className="group rounded-3xl bg-white border border-brand-stone-200/90 overflow-hidden flex flex-col justify-between hover:border-brand-olive/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-xs"
            >
              {/* Image Container with Badge */}
              <div className="relative h-52 w-full overflow-hidden bg-brand-stone-200">
                <img
                  src={service.image}
                  alt={isHy ? service.title_hy : service.title_en}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/70 via-brand-forest/20 to-transparent" />

                {service.badge_en && (
                  <div className="absolute top-4 right-4 bg-brand-forest/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20 shadow-xs">
                    {isHy ? service.badge_hy : service.badge_en}
                  </div>
                )}

                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-xl bg-brand-forest/90 backdrop-blur-xs border border-white/20 flex items-center justify-center text-brand-olive-light shadow-sm transition-transform duration-300 group-hover:scale-105">
                    {ICON_MAP[service.icon] || <Compass className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-forest mb-2 group-hover:text-brand-forest-deep transition-colors">
                    {isHy ? service.title_hy : service.title_en}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-brand-ink-muted leading-relaxed mb-5 font-normal">
                    {isHy ? service.tagline_hy : service.tagline_en}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 mb-6 border-t border-brand-stone-100 pt-4">
                    {(isHy ? service.features_hy : service.features_en).slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-brand-ink">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-olive shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-brand-stone-100 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => openTravelDrawer(isHy ? service.title_hy : service.title_en)}
                    className="w-full py-2.5 px-3 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep active:scale-95 transition-all text-center cursor-pointer shadow-2xs"
                  >
                    {isHy ? "Պատվիրել" : "Inquire Desk"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppClick(service.title_en)}
                    className="w-full py-2.5 px-3 rounded-xl border border-brand-stone-300 bg-white text-brand-ink hover:text-brand-forest hover:border-brand-olive active:scale-95 text-xs font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
