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
      name: "Prospective Traveler / Partner",
      serviceOrTour: serviceTitle,
      notes: "Hello De Organica team, I would like to inquire about this travel service.",
    });
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="travel" className="py-20 lg:py-28 bg-white border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-olive block mb-3">
            {isHy ? "Բաժին I · Զբոսաշրջություն և Հյուրընկալություն" : "Division I · Travel & Tours Matrix"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
            {isHy ? "Ամբողջական Տուրիստական Ծառայություններ" : "Comprehensive Travel & Destination Services"}
          </h2>
          <p className="text-base text-brand-ink-muted leading-relaxed">
            {isHy
              ? "Հայաստանի մշակութային ժառանգության բացահայտումից մինչև միջազգային հանգիստ, վիզաների աջակցություն և օդանավակայանի 24/7 տրանսֆեր:"
              : "From curated Armenian monastic routes to international holiday departures, consular visa filings, and seamless Zvartnots EVN ground logistics."}
          </p>
        </div>

        {/* 6-Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deorganicaConfig.travelServices.map((service) => (
            <div
              key={service.id}
              className="group rounded-2xl bg-brand-stone-50 border border-brand-stone-200 overflow-hidden flex flex-col justify-between hover:border-brand-olive/50 hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container with Badge */}
              <div className="relative h-52 w-full overflow-hidden bg-brand-stone-200">
                <img
                  src={service.image}
                  alt={isHy ? service.title_hy : service.title_en}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/60 via-transparent to-transparent" />

                {service.badge_en && (
                  <div className="absolute top-3.5 right-3.5 bg-brand-forest/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/20">
                    {isHy ? service.badge_hy : service.badge_en}
                  </div>
                )}

                <div className="absolute bottom-3.5 left-3.5 flex items-center gap-2 text-white">
                  <div className="w-8 h-8 rounded-lg bg-brand-forest/80 backdrop-blur-xs flex items-center justify-center text-brand-olive-light">
                    {ICON_MAP[service.icon] || <Compass className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-forest mb-2 group-hover:text-brand-forest-deep">
                    {isHy ? service.title_hy : service.title_en}
                  </h3>

                  <p className="text-xs font-medium text-brand-olive-dark mb-4">
                    {isHy ? service.tagline_hy : service.tagline_en}
                  </p>

                  <p className="text-xs text-brand-ink-muted leading-relaxed mb-6">
                    {isHy ? service.description_hy : service.description_en}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 mb-6 border-t border-brand-stone-200 pt-4">
                    {(isHy ? service.features_hy : service.features_en).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-brand-ink">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-olive flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-brand-stone-200 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => openTravelDrawer(isHy ? service.title_hy : service.title_en)}
                    className="w-full py-2.5 px-3 rounded-lg bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-colors text-center"
                  >
                    {isHy ? "Պատվիրել" : "Inquire Desk"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppClick(service.title_en)}
                    className="w-full py-2.5 px-3 rounded-lg border border-brand-stone-300 bg-white text-brand-ink hover:text-emerald-700 hover:border-emerald-500 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
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
