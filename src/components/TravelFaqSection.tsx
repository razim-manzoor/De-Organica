"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { useSiteData } from "@/context/SiteDataContext";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import type { FaqItem, SectionHeaderCopy } from "@/types/content";
import {
  defaultTravelFaqs,
  defaultTravelPageContent,
} from "@/data/cms-fallbacks";
import { buildWhatsAppUrl, buildTravelWhatsAppMessage } from "@/lib/whatsapp";

interface TravelFaqSectionProps {
  faqs?: FaqItem[];
  header?: SectionHeaderCopy;
}

export function TravelFaqSection({
  faqs,
  header = defaultTravelPageContent.faqHeader,
}: TravelFaqSectionProps) {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const { siteSettings } = useSiteData();
  const isHy = locale === "hy";
  const items = faqs && faqs.length > 0 ? faqs : defaultTravelFaqs;

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
    window.open(buildWhatsAppUrl(msg, siteSettings.company.whatsappNumberDigits), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 lg:py-28 bg-brand-stone-50 border-t border-brand-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-3">
            <HelpCircle className="w-4 h-4 text-brand-olive-text" />
            <span>{isHy ? header.eyebrow_hy : header.eyebrow_en}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest tracking-tight mb-3">
            {isHy ? header.title_hy : header.title_en}
          </h2>
          <p className="text-sm text-brand-ink-muted max-w-2xl mx-auto leading-relaxed">
            {isHy ? header.subtitle_hy : header.subtitle_en}
          </p>
        </div>

        {/* Semantic Accordion */}
        <div className="space-y-3">
          {items.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `travel-faq-btn-${idx}`;
            const panelId = `travel-faq-panel-${idx}`;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-brand-stone-200/90 overflow-hidden shadow-sm transition-colors duration-200"
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(idx)}
                    className="w-full min-h-[56px] p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-brand-stone-50/80 transition-colors duration-200"
                  >
                    <span className="font-serif text-lg sm:text-xl font-bold text-brand-forest leading-snug">
                      {isHy ? faq.q_hy : faq.q_en}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-200 ${
                        isOpen
                          ? "bg-brand-forest text-white border-brand-forest"
                          : "bg-brand-stone-100 text-brand-forest border-brand-stone-200"
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  data-open={isOpen}
                  inert={!isOpen ? true : undefined}
                  className="accordion-panel"
                >
                  <div>
                    <div className="px-5 pb-6 sm:px-6 pt-3 text-sm text-brand-ink-muted leading-relaxed border-t border-brand-stone-100 font-sans">
                      {isHy ? faq.a_hy : faq.a_en}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Action Prompt */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-brand-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <span className="text-sm font-bold text-brand-forest block">
              {isHy ? "Չգտա՞ք Ձեր հարցի պատասխանը:" : "Need tailored advice or custom routing?"}
            </span>
            <span className="text-xs sm:text-sm text-brand-ink-muted">
              {isHy
                ? "Կապվեք մեր մասնագետի հետ WhatsApp-ով (պատասխան՝ 4 աշխատանքային ժամում):"
                : "Our Yerevan concierge desk responds within 4 business hours."}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleFaqWhatsApp}
              className="min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white hover:bg-brand-stone-50 hover:border-[#25D366] text-brand-forest text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 duration-200 shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={() => openTravelDrawer("General Travel Inquiry")}
              className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-semibold transition-all active:scale-95 duration-200 cursor-pointer"
            >
              {isHy ? "Գրել մեզ" : "Ask Concierge"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
