"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { useSiteData } from "@/context/SiteDataContext";
import type { SectionHeaderCopy, TravelService } from "@/types/content";
import {
  defaultTravelPageContent,
  defaultTravelServices,
} from "@/data/cms-fallbacks";
import { buildWhatsAppUrl, buildTravelWhatsAppMessage } from "@/lib/whatsapp";
import { getCmsIcon } from "@/components/icons";
import {
  Compass,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

interface TravelServicesMatrixProps {
  services?: TravelService[];
  header?: SectionHeaderCopy;
}

export function TravelServicesMatrix({
  services,
  header = defaultTravelPageContent.servicesHeader,
}: TravelServicesMatrixProps) {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const { siteSettings, travelServices: ctxServices } = useSiteData();
  const isHy = locale === "hy";
  const items = services && services.length > 0 ? services : ctxServices.length > 0 ? ctxServices : defaultTravelServices;

  // Exclude services covered by dedicated full-page sections (Tours Grid, Bespoke Concierge, DMC Partner)
  // so any newly added ground service in Sanity CMS automatically renders here.
  const dedicatedSectionIds = new Set([
    "cultural-nature-tours",
    "customized-private-trips",
    "b2b-dmc-services",
  ]);
  const dedicatedLogistics = items.filter((s) => !dedicatedSectionIds.has(s.id));
  const displayServices = dedicatedLogistics.length > 0 ? dedicatedLogistics : items.slice(0, 3);

  const handleWhatsAppClick = (serviceTitle: string) => {
    const msg = buildTravelWhatsAppMessage({
      serviceOrTour: serviceTitle,
      notes: isHy
        ? "Բարև Ձեզ, ցանկանում եմ ստանալ մանրամասն տեղեկատվություն այս տուրիստական ծառայության վերաբերյալ:"
        : "Hello De Organica team, I would like to inquire about this ground service and availability.",
    });
    window.open(buildWhatsAppUrl(msg, siteSettings.company.whatsappNumberDigits), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="travel-services" className="scroll-mt-20 py-20 lg:py-28 bg-white border-t border-brand-stone-200 relative">
      <span id="services" className="absolute -top-20" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-3">
            <span>{isHy ? header.eyebrow_hy : header.eyebrow_en}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
            {isHy ? header.title_hy : header.title_en}
          </h2>
          <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
            {isHy ? header.subtitle_hy : header.subtitle_en}
          </p>
        </div>

        {/* 3-Pillar Ground Logistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => {
            const Icon = getCmsIcon(service.icon, Compass);
            return (
            <div
              key={service.id}
              className="group rounded-3xl bg-white border border-brand-stone-200/90 overflow-hidden flex flex-col justify-between hover:border-brand-olive/50 hover-lift transition-[border-color,box-shadow,transform] duration-300 shadow-sm"
            >
              {/* Image Container with Badge */}
              <div className="relative h-52 w-full overflow-hidden bg-brand-stone-200">
                <Image
                  src={service.image}
                  alt={isHy ? service.title_hy : service.title_en}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover hover-img-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/75 via-brand-forest/20 to-transparent" />

                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <div className="w-10 h-10 rounded-xl bg-brand-forest/95 backdrop-blur-sm border border-white/20 flex items-center justify-center text-brand-olive-onDark shadow-sm">
                    <Icon className="w-5 h-5" />
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
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-olive-text shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons: Unified Primary + Square WhatsApp Icon */}
                <div className="pt-4 border-t border-brand-stone-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openTravelDrawer(isHy ? service.title_hy : service.title_en)}
                    className="flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>{isHy ? "Պատվիրել ծառայությունը" : "Request Service"}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-olive-onDark" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppClick(isHy ? service.title_hy : service.title_en)}
                    className="w-11 h-11 shrink-0 rounded-xl border border-brand-stone-300 bg-white text-brand-ink hover:text-brand-forest hover:border-[#25D366] hover:bg-green-50/40 text-xs font-medium transition-all active:scale-95 flex items-center justify-center cursor-pointer shadow-sm"
                    aria-label={isHy ? `${service.title_hy} — WhatsApp հարցում` : `Inquire about ${service.title_en} on WhatsApp`}
                    title="WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  </button>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
