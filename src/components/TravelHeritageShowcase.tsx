"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { Sparkles, Utensils, Wine, Compass, ArrowRight } from "lucide-react";

interface HeritagePillar {
  id: string;
  title_en: string;
  title_hy: string;
  tagline_en: string;
  tagline_hy: string;
  desc_en: string;
  desc_hy: string;
  badge_en: string;
  badge_hy: string;
  image: string;
  icon: any;
}

const HERITAGE_PILLARS: HeritagePillar[] = [
  {
    id: "unesco-lavash",
    title_en: "UNESCO Lavash Bread Baking Masterclass",
    title_hy: "ՅՈՒՆԵՍԿՕ-ի Լավաշի Թխման Վարպետաց Դաս",
    tagline_en: "Underground clay tonir oven tradition in Garni village",
    tagline_hy: "Գառնի գյուղի ավանդական թոնրում լավաշի պատրաստում",
    desc_en:
      "Participate in Armenia's intangible cultural heritage. Roll unleavened dough with village matriarchs and slap it onto the red-hot clay walls of an ancient tonir oven, paired with fresh goat cheese and mountain herbs.",
    desc_hy:
      "Մասնակցեք ՅՈՒՆԵՍԿՕ-ի ոչ նյութական մշակութային ժառանգության մաս կազմող լավաշի թխման արարողությանը՝ թարմ պանրով և լեռնային կանաչիներով:",
    badge_en: "UNESCO Heritage",
    badge_hy: "ՅՈՒՆԵՍԿՕ Ժառանգություն",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    icon: Utensils,
  },
  {
    id: "areni-viticulture",
    title_en: "Areni-1 6,100-Year Cave Winemaking",
    title_hy: "Արենի-1 Քարանձավ և 6,100-ամյա Գինեգործություն",
    tagline_en: "The cradle of world viticulture in Vayots Dzor",
    tagline_hy: "Համաշխարհային գինեգործության օրրանը Վայոց Ձորում",
    desc_en:
      "Walk through the archaeological cave where the world's oldest wine press and fermentation vats dating to 4100 BC were unearthed. Follow with sommelier barrel tastings of indigenous Areni Noir and Voskehat varietals.",
    desc_hy:
      "Այցելեք աշխարհի հնագույն գինեգործարանը (Ք.ա. 4100 թ.), վայելեք տեղական Արենի Նուար և Ոսկեհատ հազվագյուտ խաղողի տեսակներից պատրաստված բացառիկ գինիները:",
    badge_en: "Ancient Terroir",
    badge_hy: "Հնագույն Տերուար",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    icon: Wine,
  },
  {
    id: "sevan-gastronomy",
    title_en: "Alpine Lake Sevan Ishkhan Gastronomy",
    title_hy: "Սևանի Իշխան և Լեռնային Խոհանոց",
    tagline_en: "Turquoise alpine shores and open-fire barbecue",
    tagline_hy: "Սևանա լճի թարմ իշխան և ավանդական խորոված",
    desc_en:
      "Perched at 1,900 meters above sea level, Lake Sevan offers fresh Ishkhan trout baked on vine embers, crayfish kebab, and panoramic dining overlooking the 9th-century black tuff chapels of Sevanavank.",
    desc_hy:
      "1,900 մետր բարձրության վրա՝ Սևանի ափին, համտեսեք թարմ իշխանի և խեցգետնի քյաբաբը՝ վայելելով Սևանավանքի վանական համալիրի տեսարանը:",
    badge_en: "Alpine Gourmet",
    badge_hy: "Լեռնային Խոհանոց",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    icon: Compass,
  },
  {
    id: "basalt-symphony",
    title_en: "Symphony of Stones Basalt Canyon",
    title_hy: "Քարերի Սիմֆոնիա և Գառնու Կիրճ",
    tagline_en: "Colossal polygonal hexagonal basalt columns",
    tagline_hy: "Հսկայական բազալտե բնական սյուներ Ազատի կիրճում",
    desc_en:
      "Marvel at towering 50-meter natural hexagonal basalt organ pipes carved into the vertical gorge walls of the Azat River, formed by slow cooling of prehistoric volcanic basalt flows.",
    desc_hy:
      "Հիացեք Ազատ գետի կիրճում գտնվող բնության հրաշքով՝ 50 մետր բարձրությամբ բազալտե երգեհոնանման սյուներով, որոնք ձևավորվել են հրաբխային լավայից:",
    badge_en: "Natural Wonder",
    badge_hy: "Բնության Հրաշք",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    icon: Sparkles,
  },
];

export function TravelHeritageShowcase() {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const isHy = locale === "hy";

  return (
    <section className="py-20 lg:py-28 bg-white border-t border-brand-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive mb-3">
              <span className="w-2 h-2 rounded-full bg-brand-olive" />
              <span>{isHy ? "Հայաստանի Ոչ Նյութական Ժառանգություն և Տերուար" : "Armenian Living Heritage & Terroir"}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
              {isHy ? "Հնագույն Գաստրոնոմիա և Բնական Հրաշքներ" : "Living Antiquity, Terroir & Culinary Soul"}
            </h2>
            <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
              {isHy
                ? "Բացահայտեք ավելին, քան պարզապես տեսարժան վայրեր: Մասնակցեք ավանդական արարողություններին, համտեսեք հազվագյուտ տերուարային գինիները և զգացեք Հայաստանի բնության շունչը:"
                : "Every De Organica expedition is enriched with hands-on immersion: taste indigenous vintages where viticulture was born, dine on high-altitude alpine lake trout, and bake UNESCO bread with local master bakers."}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openTravelDrawer("Armenian Gastronomy & Heritage Route")}
            className="self-start md:self-auto px-5 py-3 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-xs cursor-pointer group"
          >
            <span>{isHy ? "Պատվիրել Հատուկ Երթուղի" : "Curate Heritage Route"}</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-olive-light transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4-Pillar Visual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HERITAGE_PILLARS.map((pillar) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="group rounded-3xl bg-brand-stone-50 border border-brand-stone-200/90 overflow-hidden hover:border-brand-olive/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-48 w-full overflow-hidden bg-brand-stone-200">
                    <Image
                      src={pillar.image}
                      alt={pillar.title_en}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-brand-forest shadow-2xs">
                      {isHy ? pillar.badge_hy : pillar.badge_en}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-brand-olive mb-2">
                      <IconComponent className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {isHy ? pillar.tagline_hy : pillar.tagline_en}
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-bold text-brand-forest leading-snug mb-2 group-hover:text-brand-olive transition-colors">
                      {isHy ? pillar.title_hy : pillar.title_en}
                    </h3>

                    <p className="text-xs text-brand-ink-muted leading-relaxed line-clamp-3">
                      {isHy ? pillar.desc_hy : pillar.desc_en}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => openTravelDrawer(isHy ? pillar.title_hy : pillar.title_en)}
                    className="w-full py-2 px-3 rounded-xl bg-white border border-brand-stone-200 text-brand-forest text-xs font-semibold hover:bg-brand-forest hover:text-white hover:border-transparent active:scale-95 transition-all text-center cursor-pointer shadow-2xs"
                  >
                    {isHy ? "Ներառել ծրագրում" : "Add to Itinerary"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
