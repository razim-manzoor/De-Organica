"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { useSiteData } from "@/context/SiteDataContext";
import type { SectionHeaderCopy, TourPackage } from "@/types/content";
import {
  defaultTours,
  defaultTravelPageContent,
} from "@/data/cms-fallbacks";
import { buildWhatsAppUrl, buildTravelWhatsAppMessage } from "@/lib/whatsapp";
import {
  Clock,
  MapPin,
  Check,
  MessageCircle,
  CreditCard,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from "lucide-react";

interface FeaturedToursGridProps {
  tours?: TourPackage[];
  header?: SectionHeaderCopy;
}

export function FeaturedToursGrid({
  tours,
  header = defaultTravelPageContent.toursHeader,
}: FeaturedToursGridProps) {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const { siteSettings, tours: ctxTours } = useSiteData();
  const isHy = locale === "hy";
  const allTours = tours && tours.length > 0 ? tours : ctxTours.length > 0 ? ctxTours : defaultTours;

  const handleWhatsAppBooking = (tourTitle: string) => {
    const msg = buildTravelWhatsAppMessage({
      serviceOrTour: tourTitle,
      notes: isHy
        ? "Բարև Ձեզ, ցանկանում եմ իմանալ այս տուրի հասանելիությունը և ստանալ գնառաջարկ:"
        : "Hello De Organica team, I would like to check availability and receive a tailored quote for this expedition.",
    });
    window.open(buildWhatsAppUrl(msg, siteSettings.company.whatsappNumberDigits), "_blank", "noopener,noreferrer");
  };

  const flagshipTour = allTours[0];
  const standardTours = allTours.slice(1);

  return (
    <section id="tours-matrix" className="py-20 lg:py-28 bg-brand-stone-100/70 border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-olive" />
              <span>{isHy ? header.eyebrow_hy : header.eyebrow_en}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
              {isHy ? header.title_hy : header.title_en}
            </h2>
            <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
              {isHy ? header.subtitle_hy : header.subtitle_en}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openTravelDrawer("Bespoke Private Itinerary")}
            className="self-start md:self-auto min-h-[44px] px-5 py-2.5 rounded-full border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white transition-colors text-xs font-semibold cursor-pointer shadow-sm"
          >
            {isHy ? "Կազմել անհատական երթուղի" : "Request Custom Route"}
          </button>
        </div>

        {/* Tours Layout */}
        <div className="space-y-8">
          {/* Flagship Panoramic Card (Tour #1) */}
          {flagshipTour && (
            <div className="group rounded-3xl bg-white border border-brand-stone-200/90 overflow-hidden shadow-sm hover-lift hover:border-brand-olive/50 transition-[border-color,box-shadow,transform] duration-300 grid grid-cols-1 lg:grid-cols-12">
              {/* Media Half */}
              <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[360px] lg:min-h-[440px] overflow-hidden bg-brand-stone-200">
                <img
                  src={flagshipTour.image}
                  alt={isHy ? flagshipTour.title_hy : flagshipTour.title_en}
                  className="w-full h-full object-cover hover-img-zoom"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/25 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 bg-brand-gold text-brand-forest-deep text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isHy ? "Գլխավոր Հեղինակային Երթուղի" : "Flagship Signature Terroir"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-brand-forest/95 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                    <Clock className="w-3.5 h-3.5 text-brand-olive-onDark" />
                    <span>{isHy ? flagshipTour.duration_hy : flagshipTour.duration_en}</span>
                  </div>
                </div>

                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-brand-olive-onDark font-medium mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{isHy ? flagshipTour.location_hy : flagshipTour.location_en}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                    {isHy ? flagshipTour.title_hy : flagshipTour.title_en}
                  </h3>
                </div>
              </div>

              {/* Editorial & Action Half */}
              <div className="lg:col-span-6 p-7 sm:p-9 flex flex-col justify-between space-y-6">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-brand-ink-muted mb-6 leading-relaxed">
                    {isHy ? flagshipTour.description_hy : flagshipTour.description_en}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2.5 mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-forest block">
                      {isHy ? "Գլխավոր տեսարժան վայրերը" : "Route Highlights"}
                    </span>
                    {(isHy ? flagshipTour.highlights_hy : flagshipTour.highlights_en).map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-brand-ink">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-olive mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Inclusions */}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-forest block mb-2">
                      {isHy ? "Փաթեթը ներառում է" : "Package Inclusions"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(isHy ? flagshipTour.inclusions_hy : flagshipTour.inclusions_en).map((inc, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-brand-stone-100 text-brand-forest border border-brand-stone-200"
                        >
                          <Check className="w-3 h-3 text-brand-olive-text" />
                          <span>{inc}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-6 border-t border-brand-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-[0.12em] text-brand-olive-text block">
                      {isHy ? "Սակագին և Ամրագրում" : "Bespoke Tariff · Availability"}
                    </span>
                    {flagshipTour.showPrice && flagshipTour.price ? (
                      <div className="font-serif text-xl font-bold text-brand-forest">
                        {flagshipTour.price}{" "}
                        <span className="text-xs font-sans text-brand-ink-muted font-normal">
                          {isHy ? "/ անձի համար" : "/ person"}
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs sm:text-sm font-semibold text-brand-forest mt-0.5">
                        {isHy ? "Անհատական գնառաջարկ" : "Tailored Tariff on Request"}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/travel/${flagshipTour.slug}`}
                      className="min-h-[44px] py-2.5 px-4 rounded-xl border border-brand-stone-300 bg-white text-brand-forest hover:bg-brand-stone-100 text-xs font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <span>{isHy ? "Դիտել ծրագիրը" : "Inspect Route"}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => openTravelDrawer(isHy ? flagshipTour.title_hy : flagshipTour.title_en)}
                      className="min-h-[44px] py-2.5 px-5 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
                    >
                      <span>{isHy ? "Հարցում Desk-ին" : "Inquire Route"}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-olive-onDark" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWhatsAppBooking(flagshipTour.title_en)}
                      className="min-h-[44px] py-2.5 px-3.5 rounded-xl border border-brand-stone-300 bg-white text-brand-ink hover:text-brand-forest hover:border-brand-olive text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                      aria-label={isHy ? `${flagshipTour.title_hy} — WhatsApp հարցում` : `Check availability for ${flagshipTour.title_en} on WhatsApp`}
                    >
                      <MessageCircle className="w-4 h-4 text-brand-olive-text" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Standard Thematic Tours (2x2 Balanced Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {standardTours.map((tour) => (
              <div
                key={tour.id}
                className="group rounded-3xl bg-white border border-brand-stone-200/90 overflow-hidden shadow-sm hover-lift hover:border-brand-olive/50 transition-[border-color,box-shadow,transform] duration-300 flex flex-col justify-between"
              >
                {/* Image & Header Overlay */}
                <div className="relative h-64 w-full overflow-hidden bg-brand-stone-200">
                  <img
                    src={tour.image}
                    alt={isHy ? tour.title_hy : tour.title_en}
                    className="w-full h-full object-cover hover-img-zoom"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/30 to-transparent" />

                  {/* Duration & Location Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 bg-brand-forest/95 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                      <Clock className="w-3.5 h-3.5 text-brand-olive-onDark" />
                      <span>{isHy ? tour.duration_hy : tour.duration_en}</span>
                    </div>
                  </div>

                  {tour.isFeatured && (
                    <div className="absolute top-4 right-4 bg-brand-gold text-brand-forest-deep text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                      {isHy ? "Հանրաճանաչ" : "Most Popular"}
                    </div>
                  )}

                  <div className="absolute bottom-4 left-5 right-5 text-white">
                    <div className="flex items-center gap-1.5 text-xs text-brand-olive-onDark font-medium mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{isHy ? tour.location_hy : tour.location_en}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                      {isHy ? tour.title_hy : tour.title_en}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <p className="text-xs sm:text-[13px] font-medium text-brand-ink-muted mb-5 leading-relaxed">
                      {isHy ? tour.tagline_hy : tour.tagline_en}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-2 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-forest block">
                        {isHy ? "Գլխավոր տեսարժան վայրերը" : "Route Highlights"}
                      </span>
                      {(isHy ? tour.highlights_hy : tour.highlights_en).map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-brand-ink">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-olive mt-1.5 shrink-0" />
                          <span className="leading-snug">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Inclusions Chips */}
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-forest block mb-2">
                        {isHy ? "Փաթեթը ներառում է" : "Package Inclusions"}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {(isHy ? tour.inclusions_hy : tour.inclusions_en).map((inc, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-brand-stone-100 text-brand-forest border border-brand-stone-200"
                          >
                            <Check className="w-3 h-3 text-brand-olive-text" />
                            <span>{inc}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Multi-Channel Action Row */}
                  <div className="pt-6 border-t border-brand-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-xs uppercase font-bold tracking-[0.12em] text-brand-olive-text block">
                        {isHy ? "Սակագին և Ամրագրում" : "Bespoke Tariff · Availability"}
                      </span>
                      {tour.showPrice && tour.price ? (
                        <div className="font-serif text-xl font-bold text-brand-forest">
                          {tour.price}{" "}
                          <span className="text-xs font-sans text-brand-ink-muted font-normal">
                            {isHy ? "/ անձի համար" : "/ person"}
                          </span>
                        </div>
                      ) : (
                        <div className="text-xs sm:text-sm font-semibold text-brand-forest mt-0.5">
                          {isHy ? "Անհատական գնառաջարկ" : "Tailored Tariff on Request"}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        href={`/travel/${tour.slug}`}
                        className="min-h-[44px] py-2.5 px-3.5 rounded-xl border border-brand-stone-300 bg-white text-brand-forest hover:bg-brand-stone-100 text-xs font-semibold transition-colors flex items-center"
                      >
                        {isHy ? "Մանրամասներ" : "Details"}
                      </Link>
                      {tour.externalBookingUrl && (
                        <a
                          href={tour.externalBookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[44px] py-2.5 px-3.5 rounded-xl bg-brand-forest text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-brand-forest-deep transition-colors shadow-sm"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>{isHy ? "Ամրագրել առցանց" : "Book Online"}</span>
                          <ExternalLink className="w-3 h-3 opacity-80" />
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => openTravelDrawer(isHy ? tour.title_hy : tour.title_en)}
                        className="min-h-[44px] py-2.5 px-4 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-colors cursor-pointer shadow-sm"
                      >
                        {isHy ? "Հարցում Desk-ին" : "Inquire Desk"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleWhatsAppBooking(tour.title_en)}
                        className="min-h-[44px] py-2.5 px-3.5 rounded-xl border border-brand-stone-300 bg-white text-brand-ink hover:text-brand-forest hover:border-brand-olive text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                        aria-label={isHy ? `${tour.title_hy} — WhatsApp հարցում` : `Check availability for ${tour.title_en} on WhatsApp`}
                      >
                        <MessageCircle className="w-4 h-4 text-brand-olive-text" />
                        <span className="hidden sm:inline">WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
