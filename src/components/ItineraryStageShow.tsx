"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
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

interface DayStop {
  day: number;
  title_en: string;
  title_hy: string;
  places_en: string;
  places_hy: string;
  description_en: string;
  description_hy: string;
  image: string;
}

const ITINERARY_DAYS: DayStop[] = [
  {
    day: 1,
    title_en: "Yerevan Heritage, Garni & Geghard",
    title_hy: "Երևան, Գառնու հեթանոսական տաճար և Գեղարդ",
    places_en: "Republic Square · Cascade Monument · Garni Sun Temple · Geghard Monastic Cave",
    places_hy: "Հանրապետության Հրապարակ · Կասկադ · Գառնու Տաճար · Գեղարդավանք",
    description_en:
      "Journey from the pink tuff architecture of Yerevan into the dramatic basalt organ canyon of Garni and the rock-cut medieval UNESCO sanctuary of Geghard.",
    description_hy:
      "Ճանապարհորդություն Երևանի վարդագույն տուֆե ճարտարապետությունից դեպի Գառնու բազալտե կիրճ և Գեղարդի ժայռափոր վանական համալիր:",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
  },
  {
    day: 2,
    title_en: "Azure Lake Sevan & Dilijan Forest",
    title_hy: "Սևանա լիճ և Դիլիջանի անտառներ",
    places_en: "Sevanavank Peninsula · Lake Sevan Fresh Fish Lunch · Parz Lake · Haghartsin Monastery",
    places_hy: "Սևանավանք թերակղզի · Սևանի իշխան · Պարզ լիճ · Հաղարծին վանք",
    description_en:
      "Ascend to Armenia's high-altitude turquoise jewel at Lake Sevan, followed by the lush misty beech and oak forests of Dilijan National Park.",
    description_hy:
      "Այցելություն բարձրադիր Սևանա լիճ, որին հաջորդում է հանգիստը Դիլիջանի կուսական անտառներում և Հաղարծնի պատմական վանքում:",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    day: 3,
    title_en: "Khor Virap, Areni Wine & Noravank",
    title_hy: "Խոր Վիրապ, Արենի գինեգործություն և Նորավանք",
    places_en: "Khor Virap (Biblical Mount Ararat views) · Areni Wine Tasting · Noravank Red Canyon",
    places_hy: "Խոր Վիրապ (Արարատ լեռան տեսարան) · Արենի գինու համտես · Նորավանքի կարմիր կիրճ",
    description_en:
      "Gaze at snow-capped Mount Ararat from the historic underground dungeon of Khor Virap, continuing through the crimson limestone gorge of Noravank.",
    description_hy:
      "Հիասքանչ տեսարան դեպի բիբլիական Արարատ լեռը Խոր Վիրապից, ավանդական գինու համտես Արենիում և Նորավանքի կարմիր ժայռերը:",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
  },
  {
    day: 4,
    title_en: "Wings of Tatev & Goris Rock Forest",
    title_hy: "Տաթևի ճոպանուղի և Գորիսի ժայռեր",
    places_en: "Wings of Tatev (World's Longest Cableway) · Tatev Monastery · Vorotan Gorge · Khndzoresk Cave Village",
    places_hy: "«Տաթևեր» ճոպանուղի · Տաթևի վանք · Որոտանի կիրճ · Խնձորեսկի ճոճվող կամուրջ",
    description_en:
      "Soar above the 320-meter deep Vorotan canyon on the world's longest reversible aerial tramway to the cliffside fortress monastery of Tatev.",
    description_hy:
      "Թռիչք աշխարհի ամենաերկար հետադարձելի ճոպանուղով Որոտանի կիրճի վրայով դեպի 9-րդ դարի հզորագույն Տաթևի վանական համալիր:",
    image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1200&q=80",
  },
];

export function ItineraryStageShow() {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const isHy = locale === "hy";

  const [activeDay, setActiveDay] = useState<number>(1);
  const [vehicle, setVehicle] = useState<"economy" | "sedan" | "sprinter">("sedan");
  const [includeGuide, setIncludeGuide] = useState<boolean>(true);
  const [includeWineMasterclass, setIncludeWineMasterclass] = useState<boolean>(true);
  const [includeEvnFastTrack, setIncludeEvnFastTrack] = useState<boolean>(true);

  const selectedDayData = ITINERARY_DAYS.find((d) => d.day === activeDay) || ITINERARY_DAYS[0];

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

    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 lg:py-28 bg-brand-stone-50 border-t border-brand-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* StageShow Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-olive" />
              <span>{isHy ? "Ինտերակտիվ Երթուղու Մոդելավորում" : "Interactive Expedition Simulator · Day By Day"}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
              {isHy ? "Ձևավորեք Ձեր Հայաստանի Երթուղին և Տրանսպորտը" : "Curate Your Armenian Itinerary & Private Fleet"}
            </h2>

            <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
              {isHy
                ? "Ընտրեք ցանկալի օրը, տրանսպորտի դասը (Economy, Executive Sedan կամ VIP Minivan) և հատուկ ներառումները՝ Երևանի գրասենյակից անհատական սակագին ստանալու համար:"
                : "Select your expedition day leg, choose your private chauffeur fleet tier, and toggle bespoke inclusions to generate an immediate custom tariff from our Yerevan desk."}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto px-3.5 py-1.5 rounded-full bg-brand-stone-100 border border-brand-stone-200 text-brand-forest text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>{isHy ? "Երևանի դիսպետչերական ծառայություն" : "Live Yerevan Ground Dispatch"}</span>
          </div>
        </div>

        {/* The StageShow Canvas Bento Frame */}
        <div className="rounded-3xl bg-white border border-brand-stone-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Interactive Controls & Day Tabs (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-brand-stone-200 flex flex-col justify-between bg-brand-stone-50/50">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive block mb-3">
                {isHy ? "01 · Ընտրեք երթուղու օրը" : "01 · Select Route Leg"}
              </span>

              {/* Day Selector Buttons */}
              <div className="space-y-2 mb-8">
                {ITINERARY_DAYS.map((item) => {
                  const isSelected = item.day === activeDay;
                  return (
                    <button
                      key={item.day}
                      type="button"
                      onClick={() => setActiveDay(item.day)}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-brand-forest text-white shadow-md"
                          : "bg-white text-brand-forest border border-brand-stone-200/80 hover:bg-white hover:border-brand-olive/40 active:scale-98"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-serif font-bold ${
                            isSelected ? "bg-brand-olive text-white" : "bg-brand-stone-100 text-brand-forest"
                          }`}
                        >
                          D{item.day}
                        </span>
                        <div>
                          <h4 className="text-xs font-bold leading-snug">
                            {isHy ? item.title_hy : item.title_en}
                          </h4>
                        </div>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? "text-brand-olive-light translate-x-0.5" : "text-brand-stone-400 opacity-60"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Vehicle Fleet Selector */}
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive block mb-2.5">
                  {isHy ? "02 · Տրանսպորտային դաս" : "02 · Chauffeur Fleet Tier"}
                </span>

                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setVehicle("economy")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-start gap-1 transition-all cursor-pointer ${
                      vehicle === "economy"
                        ? "bg-white border-brand-forest text-brand-forest shadow-xs ring-1 ring-brand-forest/20"
                        : "bg-brand-stone-100/70 border-brand-stone-200 text-brand-ink-muted hover:bg-white"
                    }`}
                  >
                    <Car className="w-4 h-4 text-brand-olive shrink-0" />
                    <div className="text-left">
                      <span className="block leading-none text-[11px] font-bold">{isHy ? "Էկոնոմ" : "Economy"}</span>
                      <span className="text-[9px] font-normal text-brand-ink-muted">{isHy ? "Մատչելի · 1–3" : "Value · 1–3"}</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVehicle("sedan")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-start gap-1 transition-all cursor-pointer ${
                      vehicle === "sedan"
                        ? "bg-white border-brand-forest text-brand-forest shadow-xs ring-1 ring-brand-forest/20"
                        : "bg-brand-stone-100/70 border-brand-stone-200 text-brand-ink-muted hover:bg-white"
                    }`}
                  >
                    <Car className="w-4 h-4 text-brand-olive shrink-0" />
                    <div className="text-left">
                      <span className="block leading-none text-[11px] font-bold">{isHy ? "Executive" : "Executive"}</span>
                      <span className="text-[9px] font-normal text-brand-ink-muted">{isHy ? "Բիզնես · 1–3" : "Exec · 1–3"}</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVehicle("sprinter")}
                    className={`p-2.5 rounded-xl border text-xs font-semibold flex flex-col items-start gap-1 transition-all cursor-pointer ${
                      vehicle === "sprinter"
                        ? "bg-white border-brand-forest text-brand-forest shadow-xs ring-1 ring-brand-forest/20"
                        : "bg-brand-stone-100/70 border-brand-stone-200 text-brand-ink-muted hover:bg-white"
                    }`}
                  >
                    <Users className="w-4 h-4 text-brand-olive shrink-0" />
                    <div className="text-left">
                      <span className="block leading-none text-[11px] font-bold">{isHy ? "Միկրոավտոբուս" : "Sprinter"}</span>
                      <span className="text-[9px] font-normal text-brand-ink-muted">{isHy ? "Խումբ · 4–16" : "Group · 4–16"}</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Luxury Inclusions Toggles */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive block mb-2.5">
                  {isHy ? "03 · Լրացուցիչ ծառայություններ" : "03 · Curated Inclusions"}
                </span>

                <div className="space-y-2 text-xs">
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-brand-stone-200/80 cursor-pointer hover:border-brand-olive/30 transition-colors">
                    <span className="text-brand-forest font-medium">
                      {isHy ? "Արտոնագրված բազմալեզու էքսկուրսավար" : "Licensed Multilingual Guide"}
                    </span>
                    <input
                      type="checkbox"
                      checked={includeGuide}
                      onChange={(e) => setIncludeGuide(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-olive focus:ring-brand-olive"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-brand-stone-200/80 cursor-pointer hover:border-brand-olive/30 transition-colors">
                    <span className="text-brand-forest font-medium">
                      {isHy ? "Արենիի գինու համտես և լավաշի թխում" : "Areni Wine Tasting & Lavash Class"}
                    </span>
                    <input
                      type="checkbox"
                      checked={includeWineMasterclass}
                      onChange={(e) => setIncludeWineMasterclass(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-olive focus:ring-brand-olive"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-brand-stone-200/80 cursor-pointer hover:border-brand-olive/30 transition-colors">
                    <span className="text-brand-forest font-medium">
                      {isHy ? "Զվարթնոց (EVN) օդանավակայանի դիմավորում" : "EVN Airport Meet & Greet Transfer"}
                    </span>
                    <input
                      type="checkbox"
                      checked={includeEvnFastTrack}
                      onChange={(e) => setIncludeEvnFastTrack(e.target.checked)}
                      className="w-4 h-4 rounded text-brand-olive focus:ring-brand-olive"
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
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 active:scale-95 transition-all text-center cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <span>{isHy ? "Ստանալ գնառաջարկ WhatsApp-ով" : "Request Quote on WhatsApp"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  openTravelDrawer(
                    `Custom Tour Itinerary: Day ${activeDay} (${selectedDayData.title_en})`
                  )
                }
                className="py-3 px-4 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep active:scale-95 transition-all text-center cursor-pointer shadow-xs"
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
                className="w-full h-full object-cover opacity-85 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest via-brand-forest/40 to-transparent" />

              {/* Status & Altitude Satellite Badge */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <div className="px-3 py-1 rounded-full bg-brand-forest/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                  <Clock className="w-3.5 h-3.5 text-brand-olive-light" />
                  <span>Day {selectedDayData.day} Exploration</span>
                </div>

                <div className="px-3 py-1 rounded-full bg-brand-olive/90 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Safe Armenian Ground Route</span>
                </div>
              </div>
            </div>

            {/* Spec Sheet & Narrative Detail Body */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-brand-olive-light text-xs font-medium mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isHy ? selectedDayData.places_hy : selectedDayData.places_en}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  {isHy ? selectedDayData.title_hy : selectedDayData.title_en}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-brand-stone-300 leading-relaxed">
                {isHy ? selectedDayData.description_hy : selectedDayData.description_en}
              </p>

              {/* Dynamic Live Configuration Pill Strip */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="px-3 py-1 rounded-full bg-white/10 text-brand-stone-200 border border-white/10">
                  Fleet: {vehicle === "economy" ? "Comfort Economy Sedan" : vehicle === "sedan" ? "Executive Sedan" : "VIP Passenger Van"}
                </span>
                {includeGuide && (
                  <span className="px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-200 border border-emerald-500/30">
                    ✓ Guide Included
                  </span>
                )}
                {includeWineMasterclass && (
                  <span className="px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-200 border border-emerald-500/30">
                    ✓ Wine & Lavash Included
                  </span>
                )}
                {includeEvnFastTrack && (
                  <span className="px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-200 border border-emerald-500/30">
                    ✓ EVN Meet & Greet
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
