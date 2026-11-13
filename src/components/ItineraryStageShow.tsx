"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { useSiteData } from "@/context/SiteDataContext";
import type { TravelPageContent } from "@/types/content";
import { defaultTravelPageContent } from "@/data/cms-fallbacks";
import { buildWhatsAppUrl, buildTravelWhatsAppMessage } from "@/lib/whatsapp";
import {
  Compass,
  MapPin,
  Calendar,
  Users,
  Car,
  Wine,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";

interface ItineraryStageShowProps {
  content?: TravelPageContent["itineraryStageShow"];
}

export function ItineraryStageShow({
  content = defaultTravelPageContent.itineraryStageShow,
}: ItineraryStageShowProps) {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const { siteSettings } = useSiteData();
  const isHy = locale === "hy";
  const days = content.days;

  const [activeDay, setActiveDay] = useState<number>(days[0]?.day || 1);
  const [vehicle, setVehicle] = useState<"economy" | "sedan" | "sprinter">("sedan");
  const [includeGuide, setIncludeGuide] = useState<boolean>(true);
  const [includeWineMasterclass, setIncludeWineMasterclass] = useState<boolean>(true);
  const [includeEvnFastTrack, setIncludeEvnFastTrack] = useState<boolean>(true);

  const selectedDayData = days.find((d) => d.day === activeDay) || days[0];

  const handleWhatsAppCustomInquiry = () => {
    const vehicleName =
      vehicle === "economy"
        ? "Comfort Economy Chauffeur (Value / Budget)"
        : vehicle === "sedan"
        ? "Executive Chauffeur Sedan"
        : "VIP Passenger Van (16 Seats)";

    const summary = `Custom Armenia Itinerary (Day ${activeDay}: ${selectedDayData.title_en}, Vehicle: ${vehicleName}, Guide: ${includeGuide ? "Yes" : "No"}, Wine Class: ${
      includeWineMasterclass ? "Yes" : "No"
    }, EVN Meet & Greet: ${includeEvnFastTrack ? "Yes" : "No"})`;

    const msg = buildTravelWhatsAppMessage({
      name: "Traveler / Partner",
      serviceOrTour: summary,
      notes: "Hello De Organica team, I configured this custom route on your website and would like a quote and availability.",
    });

    window.open(buildWhatsAppUrl(msg, siteSettings.company.whatsappNumberDigits), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 lg:py-28 bg-brand-stone-50 border-t border-brand-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* StageShow Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-olive" />
              <span>{isHy ? content.eyebrow_hy : content.eyebrow_en}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
              {isHy ? content.headline_hy : content.headline_en}
            </h2>

            <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
              {isHy ? content.subtext_hy : content.subtext_en}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-full bg-brand-stone-100 border border-brand-stone-200 text-brand-forest text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-brand-olive shrink-0" />
            <span>{isHy ? content.statusBadge_hy : content.statusBadge_en}</span>
          </div>
        </div>

        {/* The StageShow Canvas Bento Frame */}
        <div className="rounded-3xl bg-white border border-brand-stone-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Interactive Controls & Day Tabs (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-brand-stone-200 flex flex-col justify-between bg-brand-stone-50/50">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-olive-text block mb-3">
                {isHy ? "01 · Ընտրեք երթուղու օրը" : "01 · Select Route Leg"}
              </span>

              {/* Day Selector Buttons */}
              <div className="space-y-2 mb-8">
                {days.map((item) => {
                  const isSelected = item.day === activeDay;
                  return (
                    <button
                      key={item.day}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setActiveDay(item.day)}
                      className={`w-full min-h-[44px] text-left p-3.5 rounded-2xl transition-colors duration-200 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-brand-forest text-white shadow-md"
                          : "bg-white text-brand-forest border border-brand-stone-200/80 hover:bg-brand-stone-50 hover:border-brand-olive/40"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-serif font-bold shrink-0 ${
                            isSelected ? "bg-brand-olive-onDark text-brand-forest-deep" : "bg-brand-stone-100 text-brand-forest"
                          }`}
                        >
                          D{item.day}
                        </span>
                        <span className="text-xs font-bold leading-snug">
                          {isHy ? item.title_hy : item.title_en}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? "text-brand-olive-onDark translate-x-0.5" : "text-brand-stone-500 opacity-80"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Vehicle Fleet Selector */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-olive-text block mb-2.5">
                  {isHy ? "02 · Տրանսպորտային դաս" : "02 · Chauffeur Fleet Tier"}
                </span>

                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    aria-pressed={vehicle === "economy"}
                    onClick={() => setVehicle("economy")}
                    className={`min-h-[44px] p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-start gap-1 transition-colors cursor-pointer ${
                      vehicle === "economy"
                        ? "bg-white border-brand-forest text-brand-forest shadow-sm ring-1 ring-brand-forest/20"
                        : "bg-brand-stone-100/70 border-brand-stone-200 text-brand-ink-muted hover:bg-white"
                    }`}
                  >
                    <Car className="w-4 h-4 text-brand-olive-text shrink-0" />
                    <div className="text-left">
                      <span className="block leading-tight text-xs font-bold">{isHy ? "Էկոնոմ" : "Economy"}</span>
                      <span className="text-[11px] font-normal text-brand-ink-muted">{isHy ? "Մատչելի · 1–3" : "Value · 1–3"}</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    aria-pressed={vehicle === "sedan"}
                    onClick={() => setVehicle("sedan")}
                    className={`min-h-[44px] p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-start gap-1 transition-colors cursor-pointer ${
                      vehicle === "sedan"
                        ? "bg-white border-brand-forest text-brand-forest shadow-sm ring-1 ring-brand-forest/20"
                        : "bg-brand-stone-100/70 border-brand-stone-200 text-brand-ink-muted hover:bg-white"
                    }`}
                  >
                    <Car className="w-4 h-4 text-brand-olive-text shrink-0" />
                    <div className="text-left">
                      <span className="block leading-tight text-xs font-bold">Executive</span>
                      <span className="text-[11px] font-normal text-brand-ink-muted">{isHy ? "Բիզնես · 1–3" : "Exec · 1–3"}</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    aria-pressed={vehicle === "sprinter"}
                    onClick={() => setVehicle("sprinter")}
                    className={`min-h-[44px] p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-start gap-1 transition-colors cursor-pointer ${
                      vehicle === "sprinter"
                        ? "bg-white border-brand-forest text-brand-forest shadow-sm ring-1 ring-brand-forest/20"
                        : "bg-brand-stone-100/70 border-brand-stone-200 text-brand-ink-muted hover:bg-white"
                    }`}
                  >
                    <Users className="w-4 h-4 text-brand-olive-text shrink-0" />
                    <div className="text-left">
                      <span className="block leading-tight text-xs font-bold">{isHy ? "Միկրոավտոբուս" : "Sprinter"}</span>
                      <span className="text-[11px] font-normal text-brand-ink-muted">{isHy ? "Խումբ · 4–16" : "Group · 4–16"}</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Curated Inclusions Toggles */}
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-olive-text block mb-2.5">
                  {isHy ? "03 · Լրացուցիչ ծառայություններ" : "03 · Curated Inclusions"}
                </span>

                <div className="space-y-2 text-xs">
                  <label
                    htmlFor="itinerary-inc-guide"
                    className="flex items-center justify-between min-h-[44px] p-2.5 rounded-xl bg-white border border-brand-stone-200/80 cursor-pointer hover:border-brand-olive/40 transition-colors"
                  >
                    <span className="text-brand-forest font-medium">
                      {isHy ? "Արտոնագրված բազմալեզու էքսկուրսավար" : "Licensed Multilingual Guide"}
                    </span>
                    <input
                      id="itinerary-inc-guide"
                      type="checkbox"
                      checked={includeGuide}
                      onChange={(e) => setIncludeGuide(e.target.checked)}
                      className="w-4 h-4 rounded accent-brand-forest"
                    />
                  </label>

                  <label
                    htmlFor="itinerary-inc-wine"
                    className="flex items-center justify-between min-h-[44px] p-2.5 rounded-xl bg-white border border-brand-stone-200/80 cursor-pointer hover:border-brand-olive/40 transition-colors"
                  >
                    <span className="text-brand-forest font-medium">
                      {isHy ? "Արենիի գինու համտես և լավաշի թխում" : "Areni Wine Tasting & Lavash Class"}
                    </span>
                    <input
                      id="itinerary-inc-wine"
                      type="checkbox"
                      checked={includeWineMasterclass}
                      onChange={(e) => setIncludeWineMasterclass(e.target.checked)}
                      className="w-4 h-4 rounded accent-brand-forest"
                    />
                  </label>

                  <label
                    htmlFor="itinerary-inc-evn"
                    className="flex items-center justify-between min-h-[44px] p-2.5 rounded-xl bg-white border border-brand-stone-200/80 cursor-pointer hover:border-brand-olive/40 transition-colors"
                  >
                    <span className="text-brand-forest font-medium">
                      {isHy ? "Զվարթնոց (EVN) օդանավակայանի դիմավորում" : "EVN Airport Meet & Greet Transfer"}
                    </span>
                    <input
                      id="itinerary-inc-evn"
                      type="checkbox"
                      checked={includeEvnFastTrack}
                      onChange={(e) => setIncludeEvnFastTrack(e.target.checked)}
                      className="w-4 h-4 rounded accent-brand-forest"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Quick Dispatch Triggers */}
            <div className="pt-6 border-t border-brand-stone-200 mt-6 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleWhatsAppCustomInquiry}
                className="flex-1 min-h-[44px] py-3 px-4 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-colors text-center cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <span>{isHy ? "Ստանալ գնառաջարկ WhatsApp-ով" : "Request Quote on WhatsApp"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-olive-onDark" />
              </button>

              <button
                type="button"
                onClick={() =>
                  openTravelDrawer(
                    `Custom Tour Itinerary: Day ${activeDay} (${selectedDayData.title_en})`
                  )
                }
                className="min-h-[44px] py-3 px-4 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-colors duration-200 text-center cursor-pointer shadow-sm"
              >
                {isHy ? "Հարցում Desk-ին" : "Inquire Desk"}
              </button>
            </div>
          </div>

          {/* Right Column: Visual Stage Showcase Screen (7 Cols) */}
          <div className="lg:col-span-7 relative flex flex-col justify-between overflow-hidden bg-brand-forest text-white">
            {/* Visual Image Background with Atmospheric Vignette */}
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              <img
                src={selectedDayData.image}
                alt={isHy ? selectedDayData.title_hy : selectedDayData.title_en}
                className="w-full h-full object-cover opacity-90 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/40 to-transparent" />

              {/* Status & Altitude Satellite Badge */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <div className="px-3 py-1 rounded-full bg-brand-forest/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-brand-olive-onDark" />
                  <span>
                    {isHy ? `Օր ${selectedDayData.day} · Երթուղի` : `Day ${selectedDayData.day} Exploration`}
                  </span>
                </div>

                <div className="px-3 py-1 rounded-full bg-brand-forest-deep/90 border border-white/20 text-brand-olive-onDark text-xs font-semibold flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>
                    {isHy ? "Ստուգված Անվտանգ Երթուղի" : "Verified Armenian Ground Route"}
                  </span>
                </div>
              </div>
            </div>

            {/* Spec Sheet & Narrative Detail Body */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-brand-olive-onDark text-xs font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isHy ? selectedDayData.places_hy : selectedDayData.places_en}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {isHy ? selectedDayData.title_hy : selectedDayData.title_en}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-brand-stone-200 leading-relaxed">
                {isHy ? selectedDayData.description_hy : selectedDayData.description_en}
              </p>

              {/* Dynamic Live Configuration Pill Strip */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-white/10 text-brand-stone-100 border border-white/15">
                  {isHy ? "Մեքենա՝ " : "Fleet: "}
                  {vehicle === "economy"
                    ? isHy
                      ? "Էկոնոմ Սեդան"
                      : "Comfort Economy Sedan"
                    : vehicle === "sedan"
                    ? isHy
                      ? "Executive Սեդան"
                      : "Executive Sedan"
                    : isHy
                    ? "VIP Միկրոավտոբուս"
                    : "VIP Passenger Van"}
                </span>
                {includeGuide && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-brand-olive-onDark border border-white/20 font-medium">
                    ✓ {isHy ? "Էքսկուրսավար" : "Guide Included"}
                  </span>
                )}
                {includeWineMasterclass && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-brand-olive-onDark border border-white/20 font-medium">
                    ✓ {isHy ? "Գինու և Լավաշի համտես" : "Wine & Lavash Included"}
                  </span>
                )}
                {includeEvnFastTrack && (
                  <span className="px-3 py-1 rounded-full bg-white/10 text-brand-olive-onDark border border-white/20 font-medium">
                    ✓ {isHy ? "Դիմավորում EVN օդանավակայանում" : "EVN Meet & Greet"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
