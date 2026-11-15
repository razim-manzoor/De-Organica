"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { useSiteData } from "@/context/SiteDataContext";
import { buildTravelWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { TourPackage } from "@/types/content";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  CreditCard,
  ExternalLink,
  MapPin,
  MessageCircle,
} from "lucide-react";

interface TourDetailViewProps {
  tour: TourPackage;
  otherTours: TourPackage[];
}

export default function TourDetailView({ tour, otherTours }: TourDetailViewProps) {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const { siteSettings } = useSiteData();

  const title = locale === "en" ? tour.title_en : tour.title_hy;
  const tagline = locale === "en" ? tour.tagline_en : tour.tagline_hy;
  const duration = locale === "en" ? tour.duration_en : tour.duration_hy;
  const location = locale === "en" ? tour.location_en : tour.location_hy;
  const description = locale === "en" ? tour.description_en : tour.description_hy;
  const highlights = locale === "en" ? tour.highlights_en : tour.highlights_hy;
  const inclusions = locale === "en" ? tour.inclusions_en : tour.inclusions_hy;

  const handleWhatsApp = () => {
    const message = buildTravelWhatsAppMessage({
      serviceOrTour: tour.title_en,
      notes: `Tour Detail Page Inquiry (${tour.duration_en})`,
    });
    const url = buildWhatsAppUrl(message, siteSettings.company.whatsappNumberDigits);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <article className="bg-brand-stone-50 pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/travel#tours"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-olive-text hover:text-brand-forest transition-colors min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            {locale === "en" ? "Back to Travel Packages" : "Վերադառնալ տուր փաթեթներին"}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Hero Media + Editorial Copy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative h-72 sm:h-96 lg:h-[460px] rounded-2xl overflow-hidden bg-brand-forest shadow-xl">
              <Image
                src={tour.image || "/images/tours/garni-temple.jpg"}
                alt={title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-brand-forest text-xs font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-brand-olive-text" aria-hidden="true" />
                  {duration}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-forest/90 text-white text-xs font-medium border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-brand-olive-onDark" aria-hidden="true" />
                  {location}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-olive-text">
                {tagline}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-forest font-semibold leading-tight">
                {title}
              </h1>
              <p className="text-base md:text-lg text-brand-ink/80 leading-relaxed">
                {description}
              </p>
            </div>

            {highlights.length > 0 && (
              <div className="bg-brand-stone-100/80 border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-4">
                <h2 className="font-serif text-2xl text-brand-forest font-semibold">
                  {locale === "en" ? "Curated Highlights" : "Ծրագրի Հիմնական Կանգառները"}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-sm text-brand-ink/85 leading-snug"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-brand-olive-text shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(tour.itinerary) && tour.itinerary.length > 0 && (
              <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-5">
                <h2 className="font-serif text-2xl text-brand-forest font-semibold">
                  {locale === "en" ? "Day-by-Day Route Breakdown" : "Օրեցօր Երթուղու Ծրագիր"}
                </h2>
                <ol className="space-y-4">
                  {tour.itinerary.map((step, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-4 pb-4 border-b border-stone-100 last:border-b-0 last:pb-0"
                    >
                      <span className="w-9 h-9 rounded-xl bg-brand-olive-subtle border border-brand-olive/30 text-brand-forest font-serif text-xs font-bold flex items-center justify-center shrink-0">
                        D{step.day ?? idx + 1}
                      </span>
                      <div className="space-y-1">
                        <h3 className="font-serif text-base font-bold text-brand-forest">
                          {locale === "en" ? step.title_en : step.title_hy || step.title_en}
                        </h3>
                        <p className="text-sm text-brand-ink/75 leading-relaxed">
                          {locale === "en" ? step.description_en : step.description_hy || step.description_en}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {Array.isArray(tour.gallery) && tour.gallery.filter((g) => Boolean(g?.url)).length > 0 && (
              <div className="space-y-4">
                <h2 className="font-serif text-2xl text-brand-forest font-semibold">
                  {locale === "en" ? "Route Photography" : "Երթուղու Լուսանկարներ"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tour.gallery
                    .filter((g) => Boolean(g?.url))
                    .map((photo, idx) => (
                      <div
                        key={idx}
                        className="relative h-56 rounded-2xl overflow-hidden bg-brand-stone-100 border border-stone-200 shadow-sm"
                      >
                        <Image
                          src={photo.url}
                          alt={
                            (locale === "en" ? photo.alt_en : photo.alt_hy) ||
                            `${title} — ${idx + 1}`
                          }
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Booking Sidebar */}
          <aside className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-stone-200 pb-5 space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brand-olive-text">
                  {locale === "en" ? "Yerevan Inbound Desk" : "Երևանի Մուտքային Բաժին"}
                </span>
                <p className="font-serif text-2xl text-brand-forest font-semibold">
                  {locale === "en"
                    ? "Private & B2B Custom Itinerary"
                    : "Անհատական և B2B Հարցում"}
                </p>
                <p className="text-xs text-brand-ink/65">
                  {locale === "en"
                    ? "Tailored dates, group size, boutique hotel tier, and multilingual guide assignment."
                    : "Հարմարեցվող ժամկետներ, խմբի չափ, հյուրանոցի կարգ և բազմալեզու զբոսավար։"}
                </p>
              </div>

              {inclusions.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-brand-forest">
                    {locale === "en" ? "Standard Inclusions" : "Ստանդարտ Ներառումներ"}
                  </h2>
                  <ul className="space-y-2.5">
                    {inclusions.map((inc, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-brand-ink/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-olive shrink-0 mt-2" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => openTravelDrawer(tour.title_en)}
                  className="w-full min-h-[48px] px-5 py-3 rounded-lg bg-brand-forest hover:bg-brand-forest-deep text-white text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>
                    {locale === "en" ? "Request Custom Quote" : "Հարցնել Արժեքը"}
                  </span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="w-full min-h-[48px] px-5 py-3 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#0d5926] text-sm font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                  <span>
                    {locale === "en"
                      ? "Inquire via WhatsApp Desk"
                      : "Գրել WhatsApp-ով"}
                  </span>
                </button>

                {tour.externalBookingUrl && (
                  <a
                    href={tour.externalBookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[46px] px-5 py-2.5 rounded-lg border border-stone-300 text-brand-forest hover:bg-brand-stone-100 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <span>
                      {locale === "en"
                        ? "Book on External Portal"
                        : "Ամրագրել Արտաքին Հարթակում"}
                    </span>
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  </a>
                )}

                {tour.paymentLinkUrl && (
                  <a
                    href={tour.paymentLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[46px] px-5 py-2.5 rounded-lg border border-brand-olive/40 bg-brand-olive/10 text-brand-forest hover:bg-brand-olive/20 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" aria-hidden="true" />
                    <span>
                      {locale === "en"
                        ? "Direct Deposit Link"
                        : "Ուղիղ Վճարման Հղում"}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Tours */}
        {otherTours.length > 0 && (
          <section className="mt-20 pt-14 border-t border-stone-200 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-olive-text">
                  {locale === "en" ? "More Routes" : "Այլ Ուղղություններ"}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-brand-forest font-semibold mt-1">
                  {locale === "en"
                    ? "Explore Other Curated Expeditions"
                    : "Դիտել Այլ Շրջագայություններ"}
                </h2>
              </div>
              <Link
                href="/travel"
                className="text-sm font-semibold text-brand-olive-text hover:text-brand-forest inline-flex items-center gap-1.5"
              >
                {locale === "en" ? "View All Packages" : "Բոլոր Փաթեթները"}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherTours.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  href={`/travel/${item.slug}`}
                  className="group bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col"
                >
                  <div className="relative h-44 bg-brand-forest overflow-hidden">
                    <Image
                      src={item.image || "/images/tours/wings-of-tatev.jpg"}
                      alt={locale === "en" ? item.title_en : item.title_hy}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-brand-olive-text uppercase tracking-wider">
                        {locale === "en" ? item.duration_en : item.duration_hy}
                      </span>
                      <h3 className="font-serif text-lg text-brand-forest font-semibold mt-1 group-hover:text-brand-olive-text transition-colors">
                        {locale === "en" ? item.title_en : item.title_hy}
                      </h3>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-forest pt-2">
                      {locale === "en" ? "Inspect Route" : "Դիտել Մանրամասները"}
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
