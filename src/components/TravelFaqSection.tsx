"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { deorganicaConfig } from "@/data/deorganica-content";
import { buildWhatsAppUrl, buildTravelWhatsAppMessage } from "@/lib/whatsapp";

interface FaqItem {
  q_en: string;
  q_hy: string;
  a_en: string;
  a_hy: string;
}

const TRAVEL_FAQS: FaqItem[] = [
  {
    q_en: "Do international visitors need an entry visa for the Republic of Armenia?",
    q_hy: "Արդյո՞ք արտերկրի զբոսաշրջիկներին անհրաժեշտ է վիզա Հայաստան մուտք գործելու համար:",
    a_en:
      "Citizens of the European Union, United States, UAE, Qatar, Georgia, and Russia enjoy 180-day visa-free entry. For Indian, Philippine, and other nationalities requiring an entry visa, De Organica provides certified eVisa invitation file processing and consular assistance with rapid 3–5 day issuance.",
    a_hy:
      "Եվրոպական Միության, ԱՄՆ-ի, ԱՄԷ-ի, Ռուսաստանի և Վրաստանի քաղաքացիների համար գործում է 180-օրյա առանց վիզայի ռեժիմ: Մյուս երկրների քաղաքացիների համար մեր թիմն ապահովում է ՀՀ էլեկտրոնային վիզայի (eVisa) պաշտոնական հրավերներ և աջակցություն:",
  },
  {
    q_en: "When is the best season to explore Armenia?",
    q_hy: "Ո՞րն է Հայաստան այցելելու լավագույն ժամանակահատվածը:",
    a_en:
      "Armenia is a four-season destination. Spring (April–June) features mild climate and wildflower meadows. Autumn (September–November) is the signature harvest season for Areni grape harvesting and golden foliage. Winter (December–March) transforms Mount Teghenis in Tsaghkadzor into an alpine ski haven.",
    a_hy:
      "Հայաստանը հիասքանչ է բոլոր եղանակներին: Գարունը (ապրիլ-հունիս) բարեխառն է և կանաչապատ: Աշունը (սեպտեմբեր-նոյեմբեր) խաղողաքաղի և ոսկեզօծ բնության սեզոնն է: Իսկ ձմռանը (դեկտեմբեր-մարտ) Ծաղկաձորը դառնում է լեռնադահուկային գլխավոր կենտրոն:",
  },
  {
    q_en: "Is Armenia safe for families, solo female travelers, and corporate delegations?",
    q_hy: "Որքանո՞վ է Հայաստանն անվտանգ ընտանեկան և անհատական այցելուների համար:",
    a_en:
      "Armenia is consistently ranked among the top 10 safest countries worldwide by Numbeo and global travel indices. Yerevan is lively and safe to walk at any hour of the night. Local hospitality is legendary, and emergency services are prompt and multilingual.",
    a_hy:
      "Հայաստանը պաշտոնապես ճանաչված է աշխարհի ամենաանվտանգ երկրներից մեկը: Երևանում հնարավոր է լիարժեք անվտանգ քայլել օրվա ցանկացած ժամի: Տեղացիների հյուրընկալությունն ու բարեհամբույր վերաբերմունքը երաշխավորում են հանգիստ միջավայր:",
  },
  {
    q_en: "Can tour packages be tailored for budget constraints or specific hotel preferences?",
    q_hy: "Հնարավո՞ր է արդյոք հարմարեցնել տուրերը բյուջեին կամ ընտրել այլ հյուրանոցներ:",
    a_en:
      "Absolutely. We operate on a fully bespoke model. You can choose between Value Economy (clean central 3★ lodging and economy sedan), Classic Comfort (4★ boutique city stays), or Ultra-Luxury (regional wine resort villas and executive chauffeur fleet). If you have already booked your hotel, we offer tour-and-chauffeur-only packages.",
    a_hy:
      "Միանշանակ: Մեր բոլոր ծրագրերը 100% ճկուն են: Կարող եք ընտրել մատչելի 3★ հյուրանոցներ և էկոնոմ մեքենա, 4★ կոմֆորտ կամ բուտիկ գինու ռեզորթներ: Եթե արդեն ունեք ամրագրված հյուրանոց, կարող եք պատվիրել միայն տրանսպորտն ու էքսկուրսավարին:",
  },
  {
    q_en: "What are the cooperation terms for international travel agents and B2B DMCs?",
    q_hy: "Որո՞նք են գործակալությունների և B2B գործընկերների հետ համագործակցության պայմանները:",
    a_en:
      "We provide white-label ground management for outbound agencies in the UAE, India, Europe, and Asia. Our B2B tariffs feature competitive net wholesale rates, dedicated Yerevan dispatch managers, branded airport reception, and credit terms for contracted partners.",
    a_hy:
      "Մենք տրամադրում ենք տեղական սպասարկում արտերկրի գործակալությունների համար՝ մրցունակ զուտ (net) մեծածախ գներով, գործընկերոջ բրենդով դիմավորմամբ և 24/7 օպերատիվ աջակցությամբ:",
  },
];

export function TravelFaqSection() {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const isHy = locale === "hy";

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleFaqWhatsApp = () => {
    const msg = buildTravelWhatsAppMessage({
      name: "Traveler",
      serviceOrTour: "Travel FAQ Inquiry",
      notes: "Hello De Organica team, I have a few specific questions regarding visas, itineraries, or private chauffeur options.",
    });
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 lg:py-28 bg-brand-stone-50 border-t border-brand-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive mb-3">
            <HelpCircle className="w-4 h-4 text-brand-olive" />
            <span>{isHy ? "Հաճախ Տրվող Հարցեր · Հայաստանի Ուղեցույց" : "Armenia Travel Advisory & FAQ"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest tracking-tight mb-4">
            {isHy ? "Ամեն ինչ Ձեր Հայաստանի Ճամփորդության Մասին" : "Everything You Need to Know for Your Journey"}
          </h2>
          <p className="text-sm text-brand-ink-muted max-w-2xl mx-auto leading-relaxed">
            {isHy
              ? "Վիզաների կարգավիճակ, եղանակային խորհուրդներ, անվտանգություն և B2B գործընկերություն: Եթե ունեք այլ հարցեր, կապվեք մեր Երևանի գրասենյակի հետ:"
              : "Clear, factual guidance on consular visas, travel seasons, safety, and custom pricing. Have a question not listed here? Talk to our Yerevan team directly."}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {TRAVEL_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-brand-stone-200/90 overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-brand-stone-50/70 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-brand-forest leading-snug">
                    {isHy ? faq.q_hy : faq.q_en}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                      isOpen
                        ? "bg-brand-forest text-white border-brand-forest rotate-180"
                        : "bg-brand-stone-100 text-brand-forest border-brand-stone-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm text-brand-ink-muted leading-relaxed border-t border-brand-stone-100 font-sans">
                    {isHy ? faq.a_hy : faq.a_en}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Action Prompt */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-brand-stone-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="text-left">
            <span className="text-xs font-bold text-brand-forest block">
              {isHy ? "Չգտա՞ք Ձեր հարցի պատասխանը:" : "Need tailored advice or custom routing?"}
            </span>
            <span className="text-xs text-brand-ink-muted">
              {isHy ? "Կապվեք մեր մասնագետի հետ WhatsApp-ով կամ լրացրեք հայտը:" : "Our Yerevan concierge desk responds within 4 business hours."}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleFaqWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={() => openTravelDrawer("General Travel Inquiry")}
              className="px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {isHy ? "Հարցնել Desk-ին" : "Ask Desk"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
