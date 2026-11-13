"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { useSiteData } from "@/context/SiteDataContext";
import type { JobVacancy, ManpowerPageContent } from "@/types/content";
import {
  defaultJobVacancies,
  defaultManpowerPageContent,
} from "@/data/cms-fallbacks";
import { buildWhatsAppUrl, buildCandidateWhatsAppMessage } from "@/lib/whatsapp";
import {
  Upload,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  MessageCircle,
  FileText,
  Check,
} from "lucide-react";

interface ManpowerCandidateHubProps {
  content?: ManpowerPageContent["candidateHub"];
  vacancies?: JobVacancy[];
}

export function ManpowerCandidateHub({
  content = defaultManpowerPageContent.candidateHub,
  vacancies = defaultJobVacancies,
}: ManpowerCandidateHubProps) {
  const { locale } = useLanguage();
  const { openCandidateDrawer } = useDrawer();
  const { siteSettings } = useSiteData();
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const isHy = locale === "hy";

  const publishedVacancies = vacancies.filter((v) => v.isPublished !== false);
  const filteredVacancies = publishedVacancies.filter((v) => {
    if (selectedSector === "all") return true;
    return v.sector === selectedSector;
  });

  const handleWhatsAppApply = (jobTitle: string) => {
    const msg = buildCandidateWhatsAppMessage({
      role: jobTitle,
      notes: isHy
        ? "Բարև Ձեզ, ցանկանում եմ դիմել այս հաստիքին և ճշտել մանրամասները:"
        : "Hello De Organica HR team, I am interested in applying for this position.",
    });
    window.open(buildWhatsAppUrl(msg, siteSettings.company.whatsappNumberDigits), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="manpower-candidates" className="py-20 lg:py-28 bg-white border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
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

        {/* Ethical Contingency Charter Box */}
        <div className="rounded-3xl bg-brand-olive-subtle/75 border border-brand-olive/35 p-7 sm:p-10 mb-16 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-brand-olive/20">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white border border-brand-olive/30 flex items-center justify-center text-brand-forest shrink-0 shadow-sm">
                <ShieldCheck className="w-7 h-7 text-brand-olive-text" />
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-forest">
                  {isHy ? content.charterTitle_hy : content.charterTitle_en}
                </h3>
                <p className="text-sm text-brand-ink-muted mt-1 max-w-2xl leading-relaxed">
                  {isHy ? content.charterDesc_hy : content.charterDesc_en}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openCandidateDrawer()}
              className="min-h-[44px] self-start md:self-auto px-5 py-3 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-colors duration-200 flex items-center gap-2 shrink-0 cursor-pointer shadow-sm"
            >
              <Upload className="w-4 h-4 text-brand-olive-onDark" />
              <span>{isHy ? "Ուղարկել ընդհանուր CV" : "Drop General CV"}</span>
            </button>
          </div>

          {/* 4 Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-b border-brand-olive/15">
            {content.trustPillars.map((p, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-forest">
                  <Check className="w-4 h-4 text-brand-olive-text shrink-0" />
                  <span>{isHy ? p.title_hy : p.title_en}</span>
                </div>
                <p className="text-xs text-brand-ink-muted leading-relaxed pl-6">
                  {isHy ? p.desc_hy : p.desc_en}
                </p>
              </div>
            ))}
          </div>

          {/* Compact 4-Step Relocation Milestone Ribbon */}
          <div className="pt-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-olive-text">
                {isHy ? "Թեկնածուի Թափանցիկ Ճանապարհը" : "Candidate Legal Relocation Flow"}
              </span>
              <span className="text-xs text-brand-ink-muted font-medium">
                {isHy ? "Պաշտոնական Պետական Գործընթաց" : "Official State-Approved Pipeline"}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {content.mobilitySteps.map((step) => (
                <div
                  key={step.step}
                  className="p-3.5 rounded-xl bg-white/90 border border-brand-olive/25 flex items-start gap-3 shadow-sm"
                >
                  <span className="font-serif font-bold text-base text-brand-olive-text shrink-0">
                    {step.step}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-brand-forest leading-tight">
                      {isHy ? step.title_hy : step.title_en}
                    </h4>
                    <p className="text-xs text-brand-ink-muted leading-snug mt-0.5">
                      {isHy ? step.desc_hy : step.desc_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filterable Vacancies Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest">
                {isHy ? "Ակտիվ Թափուր Աշխատատեղեր" : "Featured Active Vacancies in Armenia"}
              </h3>
              <p className="text-xs sm:text-sm text-brand-ink-muted mt-1">
                {isHy
                  ? "Եթե չեք գտնում Ձեր մասնագիտությունը, օգտագործեք «Ուղարկել ընդհանուր CV» կոճակը:"
                  : "If your specific role is not listed below, submit your profile into our general talent pool."}
              </p>
            </div>

            {/* General CV Quick Button */}
            <button
              type="button"
              onClick={() => openCandidateDrawer()}
              className="min-h-[44px] self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-olive-dark text-brand-forest text-xs font-semibold hover:bg-brand-forest hover:text-white transition-colors duration-200 cursor-pointer shadow-sm"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isHy ? "Ընդհանուր Ռեզյումեի Բազա" : "Join General Talent Pool"}</span>
            </button>
          </div>

          {/* Sector Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {content.sectors.map((sec) => {
              const isSelected = selectedSector === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedSector(sec.id)}
                  className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-brand-forest text-white shadow-sm"
                      : "bg-brand-stone-100 text-brand-ink-muted hover:text-brand-forest hover:bg-brand-stone-200"
                  }`}
                >
                  {isHy ? sec.label_hy : sec.label_en}
                </button>
              );
            })}
          </div>

          {/* Vacancies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="group rounded-3xl bg-white border border-brand-stone-200/90 p-7 sm:p-8 flex flex-col justify-between hover-lift hover:border-brand-olive/50 hover:shadow-xl space-y-5 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-stone-100 text-brand-forest border border-brand-stone-200">
                      {isHy ? vacancy.sector_hy : vacancy.sector_en}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-brand-ink-muted">
                      <Clock className="w-3.5 h-3.5 text-brand-olive-text" />
                      <span>{isHy ? vacancy.type_hy : vacancy.type_en}</span>
                    </div>
                  </div>

                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-brand-forest mb-1.5 group-hover:text-brand-forest-deep transition-colors">
                    {isHy ? vacancy.title_hy : vacancy.title_en}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-brand-olive-dark font-semibold mb-3">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{isHy ? vacancy.location_hy : vacancy.location_en}</span>
                  </div>

                  <p className="text-sm text-brand-ink-muted leading-relaxed mb-4">
                    {isHy ? vacancy.description_hy : vacancy.description_en}
                  </p>

                  {/* Requirements */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-xs uppercase font-bold text-brand-forest tracking-wider block">
                      {isHy ? "Հիմնական պահանջներ" : "Key Requirements"}
                    </span>
                    {(isHy ? vacancy.requirements_hy : vacancy.requirements_en).map((req, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-brand-ink">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-olive-text mt-1.5 shrink-0" />
                        <span className="leading-snug">{req}</span>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-brand-stone-100">
                    {(isHy ? vacancy.benefits_hy : vacancy.benefits_en).map((b, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-brand-stone-100 text-brand-forest border border-brand-stone-200"
                      >
                        <Check className="w-3.5 h-3.5 text-brand-olive-text" />
                        <span>{b}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Actions */}
                <div className="pt-4 border-t border-brand-stone-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openCandidateDrawer(isHy ? vacancy.title_hy : vacancy.title_en)}
                    className="flex-1 min-h-[44px] py-2.5 px-3 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-colors duration-200 text-center cursor-pointer shadow-sm"
                  >
                    {isHy ? "Դիմել այս հաստիքին" : "Apply for Position"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppApply(vacancy.title_en)}
                    className="min-h-[44px] py-2.5 px-3.5 rounded-xl border border-brand-stone-300 bg-white text-brand-forest hover:bg-brand-stone-50 hover:border-brand-olive-dark text-xs font-semibold transition-colors duration-200 flex items-center gap-1.5 cursor-pointer shadow-sm"
                    aria-label={isHy ? `WhatsApp՝ ${vacancy.title_hy}` : `Inquire on WhatsApp about ${vacancy.title_en}`}
                  >
                    <MessageCircle className="w-4 h-4 text-brand-olive-text" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Talent Pool Catch-All Banner */}
          <div className="mt-8 p-7 sm:p-8 rounded-3xl bg-brand-stone-100/90 border border-brand-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white border border-brand-stone-200 hidden sm:flex items-center justify-center text-brand-forest shadow-sm shrink-0">
                <FileText className="w-7 h-7 text-brand-olive-text" />
              </div>
              <div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-brand-forest">
                  {isHy ? "Չգտա՞ք Ձեր մասնագիտությունը" : "Don't see your specific specialization?"}
                </h4>
                <p className="text-xs sm:text-sm text-brand-ink-muted mt-1 leading-relaxed">
                  {isHy
                    ? "Ուղարկեք Ձեր ռեզյումեն ընդհանուր տվյալների բազա: Նոր թափուր աշխատատեղերի դեպքում մենք կկապվենք Ձեզ հետ:"
                    : "Submit your profile directly into our Yerevan talent repository. We match your skills as new corporate employer requisitions open."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openCandidateDrawer()}
              className="min-h-[44px] px-6 py-3.5 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-colors duration-200 shadow-sm shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>{isHy ? "Ներկայացնել Ռեզյումե" : "Submit Your Profile"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
