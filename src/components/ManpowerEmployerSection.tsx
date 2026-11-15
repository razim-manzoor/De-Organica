"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { useSiteData } from "@/context/SiteDataContext";
import type { ManpowerPageContent } from "@/types/content";
import { defaultManpowerPageContent } from "@/data/cms-fallbacks";
import { buildWhatsAppUrl, buildEmployerWhatsAppMessage } from "@/lib/whatsapp";
import {
  Users2,
  ShieldCheck,
  FileCheck2,
  MessageCircle,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

interface ManpowerEmployerSectionProps {
  content?: ManpowerPageContent["employerSection"];
}

export function ManpowerEmployerSection({
  content = defaultManpowerPageContent.employerSection,
}: ManpowerEmployerSectionProps) {
  const { locale } = useLanguage();
  const { openEmployerDrawer } = useDrawer();
  const { siteSettings } = useSiteData();
  const isHy = locale === "hy";

  const handleWhatsAppEmployer = () => {
    const msg = buildEmployerWhatsAppMessage({
      industry: "Corporate Staffing & Quotas",
      notes: isHy
        ? "Բարև Ձեզ, ցանկանում ենք քննարկել մեր ընկերության աշխատուժի և քվոտաների պահանջարկը:"
        : "Hello De Organica corporate team, we would like to discuss our enterprise manpower and staffing requirements in Armenia.",
    });
    window.open(buildWhatsAppUrl(msg, siteSettings.company.whatsappNumberDigits), "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="manpower-employers"
      className="py-20 lg:py-28 bg-brand-stone-100/70 border-t border-brand-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-3">
            <span>{isHy ? content.eyebrow_hy : content.eyebrow_en}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
            {isHy ? content.headline_hy : content.headline_en}
          </h2>

          <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
            {isHy ? content.subtext_hy : content.subtext_en}
          </p>
        </div>

        {/* 3-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {content.steps.map((step) => (
            <div
              key={step.step}
              className="rounded-3xl bg-white border border-brand-stone-200/90 p-8 shadow-sm hover-lift hover:shadow-xl hover:border-brand-olive/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl font-bold text-brand-olive-text">
                    {step.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-brand-stone-100 flex items-center justify-center text-brand-forest">
                    {step.step === "01" && <Users2 className="w-5 h-5 text-brand-olive-text" />}
                    {step.step === "02" && (
                      <FileCheck2 className="w-5 h-5 text-brand-olive-text" />
                    )}
                    {step.step === "03" && (
                      <ShieldCheck className="w-5 h-5 text-brand-olive-text" />
                    )}
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-brand-forest mb-3">
                  {isHy ? step.title_hy : step.title_en}
                </h3>

                <p className="text-sm text-brand-ink-muted leading-relaxed mb-6">
                  {isHy ? step.description_hy : step.description_en}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-brand-stone-100">
                  {(isHy ? step.bullets_hy : step.bullets_en).map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-brand-ink">
                      <CheckCircle className="w-4 h-4 text-brand-olive-text shrink-0 mt-0.5" />
                      <span className="leading-snug">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Employer Action Banner */}
        <div className="rounded-2xl bg-brand-forest text-white p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-lg">
          <div className="max-w-2xl">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3 text-white">
              {isHy
                ? "Պահանջվու՞մ են աշխատակիցներ Ձեր նախագծի համար"
                : "Ready to Discuss Your Enterprise Staffing Requisition?"}
            </h3>
            <p className="text-sm text-brand-stone-200 leading-relaxed">
              {isHy
                ? "Կապվեք մեր կորպորատիվ գրասենյակի հետ: Մենք կտրամադրենք թեկնածուների նախնական ցանկ, ծախսերի հաշվարկ և աշխատանքի թույլտվության ժամանակացույց:"
                : "Connect directly with our Yerevan corporate desk. We will analyze your headcount requirements, timeline, and deliver a tailored manpower deployment proposal."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={openEmployerDrawer}
              className="min-h-[44px] px-6 py-3.5 rounded-xl bg-brand-olive-onDark text-brand-forest-deep text-xs font-bold uppercase tracking-wider hover:bg-white transition-all active:scale-95 duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>{isHy ? "Հայտնել Պահանջարկը" : "Request Manpower Quote"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleWhatsAppEmployer}
              className="min-h-[44px] px-5 py-3.5 rounded-xl border border-white/30 bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all active:scale-95 duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Desk</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
