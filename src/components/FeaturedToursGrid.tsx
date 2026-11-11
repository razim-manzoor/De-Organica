"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { buildWhatsAppUrl, buildTravelWhatsAppMessage } from "@/lib/whatsapp";
import {
  Clock,
  MapPin,
  Check,
  MessageCircle,
  Calendar,
  CreditCard,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export function FeaturedToursGrid() {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const isHy = locale === "hy";

  const handleWhatsAppBooking = (tourTitle: string) => {
    const msg = buildTravelWhatsAppMessage({
      serviceOrTour: tourTitle,
      notes: isHy
        ? "Բարև Ձեզ, ցանկանում եմ իմանալ այս տուրի հասանելիությունը և ստանալ գնառաջարկ:"
        : "Hello De Organica team, I would like to check availability and receive a tailored quote for this expedition.",
    });
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="tours-matrix" className="py-20 lg:py-28 bg-brand-stone-100/70 border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-olive" />
              <span>{isHy ? "Հեղինակային Երթուղիներ և Գինու Ճանապարհ" : "Signature Expeditions · Terroir & Heritage"}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
              {isHy ? "Հայաստանի Բացառիկ Երթուղիներ և Տուրիստական Ծրագրեր" : "Curated Expeditions & High-Altitude Terroir Journeys"}
            </h2>
            <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
              {isHy
                ? "Յուրաքանչյուր ծրագիր հարմարեցվում է Ձեր նախընտրած բյուջեին և ոճին՝ մատչելի 3-աստղանի հյուրանոցներից ու ճկուն երթուղիներից մինչև բուտիկ գինեգործարաններ և VIP executive տրանսպորտ:"
                : "Every journey is customized to your preferred travel style and budget — from cost-conscious 3-star central stays and self-paced routes to boutique wine resorts and VIP executive chauffeurs."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openTravelDrawer("Bespoke Private Itinerary")}
            className="self-start md:self-auto px-5 py-2.5 rounded-full border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white active:scale-95 transition-all text-xs font-semibold cursor-pointer shadow-2xs"
          >
            {isHy ? "Կազմել անհատական երթուղի" : "Request Custom Route"}
          </button>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {deorganicaConfig.starterTours.map((tour) => (
            <div
              key={tour.id}
              className="group rounded-3xl bg-white border border-brand-stone-200/90 overflow-hidden shadow-xs hover:shadow-2xl hover:border-brand-olive/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Header Overlay */}
              <div className="relative h-64 w-full overflow-hidden bg-brand-stone-200">
                <img
                  src={tour.image}
                  alt={isHy ? tour.title_hy : tour.title_en}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/30 to-transparent" />

                {/* Duration & Location Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 bg-brand-forest/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                    <Clock className="w-3.5 h-3.5 text-brand-olive-light" />
                    <span>{isHy ? tour.duration_hy : tour.duration_en}</span>
                  </div>
                </div>

                {tour.isFeatured && (
                  <div className="absolute top-4 right-4 bg-brand-gold text-brand-forest text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                    {isHy ? "Հանրաճանաչ" : "Most Popular"}
                  </div>
                )}

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-brand-olive-light font-medium mb-1">
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
                  <p className="text-xs font-medium text-brand-olive-dark mb-3">
                    {isHy ? tour.tagline_hy : tour.tagline_en}
                  </p>

                  <p className="text-xs text-brand-ink-muted leading-relaxed mb-6">
                    {isHy ? tour.description_hy : tour.description_en}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-forest block">
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
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-forest block mb-2">
                      {isHy ? "Փաթեթը ներառում է" : "Package Inclusions"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(isHy ? tour.inclusions_hy : tour.inclusions_en).map((inc, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-md bg-brand-stone-100 text-brand-forest border border-brand-stone-200"
                        >
                          <Check className="w-3 h-3 text-brand-olive" />
                          <span>{inc}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing & Multi-Channel Action Row */}
                <div className="pt-6 border-t border-brand-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-[0.14em] text-brand-olive block">
                      {isHy ? "Սակագին և Ամրագրում" : "Bespoke Tariff · Availability"}
                    </span>
                    {tour.showPrice && tour.price ? (
                      <div className="font-serif text-xl font-bold text-brand-forest">
                        {tour.price}{" "}
                        <span className="text-xs font-sans text-brand-ink-muted font-normal">/ person</span>
                      </div>
                    ) : (
                      <div className="text-xs sm:text-sm font-semibold text-brand-forest mt-0.5">
                        {isHy ? "Անհատական գնառաջարկ" : "Tailored Tariff on Request"}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Conditional Online Booking Link if config provides it */}
                    {tour.externalBookingUrl && (
                      <a
                        href={tour.externalBookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3.5 rounded-xl bg-brand-forest text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-brand-forest-deep active:scale-95 transition-all shadow-2xs"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{isHy ? "Ամրագրել առցանց" : "Book Online"}</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    )}

                    {/* Inquiry via Drawer */}
                    <button
                      type="button"
                      onClick={() => openTravelDrawer(isHy ? tour.title_hy : tour.title_en)}
                      className="py-2.5 px-4 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep active:scale-95 transition-all cursor-pointer shadow-2xs"
                    >
                      {isHy ? "Հարցում Desk-ին" : "Inquire Desk"}
                    </button>

                    {/* Direct WhatsApp Quote */}
                    <button
                      type="button"
                      onClick={() => handleWhatsAppBooking(tour.title_en)}
                      className="py-2.5 px-3.5 rounded-xl border border-brand-stone-300 bg-white text-brand-ink hover:text-emerald-700 hover:border-emerald-500 active:scale-95 text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      title="Check availability on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
