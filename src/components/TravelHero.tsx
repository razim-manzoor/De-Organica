"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import {
  Compass,
  MapPin,
  ArrowRight,
  Sparkles,
  Mountain,
  Sun,
  ShieldCheck,
  Navigation,
  Car,
  Clock,
  ExternalLink,
} from "lucide-react";

interface HighlightDestination {
  id: string;
  name_en: string;
  name_hy: string;
  subtitle_en: string;
  subtitle_hy: string;
  distKm: number;
  altitudeM: number;
  season_en: string;
  season_hy: string;
  image: string;
  tag_en: string;
  tag_hy: string;
}

const DESTINATIONS: HighlightDestination[] = [
  {
    id: "garni",
    name_en: "Garni & Geghard",
    name_hy: "Գառնի և Գեղարդ",
    subtitle_en: "1st-century Hellenistic colonnade & UNESCO rock-hewn monastery",
    subtitle_hy: "1-ին դարի հեթանոսական տաճար և ժայռափոր Գեղարդավանք (ՅՈՒՆԵՍԿՕ)",
    distKm: 28,
    altitudeM: 1400,
    season_en: "Year-round",
    season_hy: "Ողջ տարին",
    image:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    tag_en: "UNESCO Heritage",
    tag_hy: "ՅՈՒՆԵՍԿՕ Ժառանգություն",
  },
  {
    id: "sevan",
    name_en: "Lake Sevan & Dilijan",
    name_hy: "Սևանա լիճ և Դիլիջան",
    subtitle_en: "High-altitude turquoise alpine jewel & lush forested biosphere",
    subtitle_hy: "Բարձրադիր լեռնային լիճ և Դիլիջանի անտառային արգելոց",
    distKm: 65,
    altitudeM: 1900,
    season_en: "May – October",
    season_hy: "Մայիս – Հոկտեմբեր",
    image:
      "https://images.unsplash.com/photo-1627881923055-6677f24ea110?auto=format&fit=crop&w=1200&q=80",
    tag_en: "Alpine Jewel",
    tag_hy: "Ալպիական Գոհար",
  },
  {
    id: "khorvirap",
    name_en: "Khor Virap & Areni",
    name_hy: "Խոր Վիրապ և Արենի",
    subtitle_en: "Sacred monastery under Mount Ararat & 6,100-year cave terroir",
    subtitle_hy: "Մասիսի վեհաշուք համայնապատկեր և հնագույն Արենիի քարանձավ",
    distKm: 45,
    altitudeM: 1000,
    season_en: "March – November",
    season_hy: "Մարտ – Նոյեմբեր",
    image:
      "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1200&q=80",
    tag_en: "Biblical Ararat Panorama",
    tag_hy: "Արարատի Համայնապատկեր",
  },
  {
    id: "tatev",
    name_en: "Wings of Tatev & Goris",
    name_hy: "Տաթևեր և Գորիս",
    subtitle_en: "World's longest reversible aerial tramway over Vorotan gorge",
    subtitle_hy: "Աշխարհի ամենաերկար ճոպանուղին Որոտանի կիրճի վրայով",
    distKm: 250,
    altitudeM: 1537,
    season_en: "April – November",
    season_hy: "Ապրիլ – Նոյեմբեր",
    image:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=80",
    tag_en: "Engineering Marvel",
    tag_hy: "Ինժեներական Հրաշք",
  },
];

export function TravelHero() {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const [activeDestIdx, setActiveDestIdx] = useState(0);
  const isHy = locale === "hy";

  const activeDest = DESTINATIONS[activeDestIdx];

  return (
    <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-stone-50 via-brand-stone-50 to-stone-100 overflow-hidden border-b border-brand-stone-200">
      {/* Warm Volcanic Tufa & Alpine Atmosphere Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-olive/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-architectural-grid" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Travel Narrative */}
          <div className="lg:col-span-7">
            {/* Geographic & Curated Travel Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-brand-stone-300 text-stone-700 text-xs font-medium shadow-2xs mb-4">
              <Compass className="w-3.5 h-3.5 text-brand-olive shrink-0" />
              <span>{isHy ? "Հայաստանի Բացառիկ Տուրեր և B2B DMC" : "Armenia Inbound DMC and Curated Journeys"}</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-500 font-medium">Yerevan, Armenia</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-forest leading-[1.12] mb-6">
              {isHy
                ? "Հայաստանի Վեհաշուք Լեռները և Բացառիկ Հյուրընկալությունը"
                : "Curated Armenian Highlands & Global Horizons"}
            </h1>

            <p className="text-base sm:text-lg text-brand-ink-muted leading-relaxed mb-8 max-w-2xl">
              {isHy
                ? "Երևանի սրտից մինչև բարձրադիր Սևանա լիճ, Գառնու հեթանոսական տաճար, ժայռափոր Գեղարդ և Տաթևի խորհրդավոր կիրճեր: Շքեղ Mercedes տրանսպորտ, փորձառու էքսկուրսավարներ, վիզաների աջակցություն և B2B DMC տեղական սպասարկում:"
                : "From ancient monastic cliff sanctuaries and azure alpine waters to international escapes, consular visa guidance, and white-label DMC ground operations in Yerevan with private Mercedes chauffeur transport."}
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <button
                type="button"
                onClick={() =>
                  openTravelDrawer(`Custom Tour: ${activeDest.name_en}`)
                }
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-forest text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-forest-deep active:scale-95 transition-all shadow-xs group cursor-pointer"
              >
                <Compass className="w-4 h-4 text-brand-olive-light" />
                <span>
                  {isHy ? "Պատվիրել անհատական երթուղի" : "Inquire Custom Tour"}
                </span>
                <ArrowRight className="w-4 h-4 text-brand-olive-light transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              <a
                href="#tours-matrix"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-brand-stone-300 bg-white text-brand-forest text-xs font-semibold hover:bg-brand-stone-100 active:scale-95 transition-all shadow-2xs"
              >
                <span>{isHy ? "Դիտել բոլոր տուրերը" : "Explore Tour Packages"}</span>
              </a>
            </div>

            {/* Travel Specific Pillar Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-brand-stone-200">
              {[
                { label: "Mercedes Fleet Chauffeurs", icon: Car },
                { label: "24/7 EVN Airport Meet", icon: Clock },
                { label: "UNESCO Certified Routes", icon: ShieldCheck },
                { label: "B2B DMC Wholesale Tariffs", icon: Sparkles },
              ].map(({ label, icon: Icon }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full bg-white text-brand-forest border border-brand-stone-200 shadow-2xs"
                >
                  <Icon className="w-3 h-3 text-brand-olive" />
                  <span>{label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Destination Panorama Capsule */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white border border-brand-stone-200/90 p-5 shadow-xl relative overflow-hidden group">
              {/* Image Preview with Atmospheric Gradient */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-brand-stone-200 mb-4">
                <img
                  src={activeDest.image}
                  alt={isHy ? activeDest.name_hy : activeDest.name_en}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-brand-forest/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-brand-forest/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                    {isHy ? activeDest.tag_hy : activeDest.tag_en}
                  </span>
                </div>

                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-brand-forest text-xs font-semibold flex items-center gap-1 shadow-2xs">
                  <Mountain className="w-3 h-3 text-brand-olive" />
                  <span>{activeDest.altitudeM}m ASL</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-2 text-xs text-brand-olive-light mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeDest.distKm} km from Yerevan</span>
                    <span>·</span>
                    <span>{isHy ? activeDest.season_hy : activeDest.season_en}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                    {isHy ? activeDest.name_hy : activeDest.name_en}
                  </h3>
                  <p className="text-xs text-stone-200 mt-1 line-clamp-1">
                    {isHy ? activeDest.subtitle_hy : activeDest.subtitle_en}
                  </p>
                </div>
              </div>

              {/* Destination Selector Tabs */}
              <div className="space-y-1.5 mb-4">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-brand-ink-muted px-1">
                  <span>{isHy ? "Ընտրեք ուղղությունը" : "Featured Destinations"}</span>
                  <span className="font-mono text-brand-olive">
                    {activeDestIdx + 1} / {DESTINATIONS.length}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {DESTINATIONS.map((dest, idx) => (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => setActiveDestIdx(idx)}
                      className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                        activeDestIdx === idx
                          ? "bg-brand-forest text-white border-brand-forest shadow-xs"
                          : "bg-brand-stone-50 text-brand-forest hover:bg-brand-stone-100 border-brand-stone-200"
                      }`}
                    >
                      <div className="truncate">
                        {isHy ? dest.name_hy : dest.name_en}
                      </div>
                      <div
                        className={`text-[10px] truncate mt-0.5 ${
                          activeDestIdx === idx
                            ? "text-brand-olive-light"
                            : "text-brand-ink-muted"
                        }`}
                      >
                        {dest.distKm} km · {dest.altitudeM}m
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fast Booking Dispatch */}
              <button
                type="button"
                onClick={() =>
                  openTravelDrawer(`Route Inquiry: ${activeDest.name_en}`)
                }
                className="w-full py-2.5 px-4 rounded-xl bg-brand-stone-100 hover:bg-brand-forest hover:text-white text-brand-forest text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-brand-stone-300 shadow-2xs cursor-pointer group/cta"
              >
                <span>
                  {isHy
                    ? `Պատվիրել ${activeDest.name_hy}`
                    : `Inquire ${activeDest.name_en} Expedition`}
                </span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
