"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { buildWhatsAppUrl, buildCandidateWhatsAppMessage } from "@/lib/whatsapp";
import type { JobSector } from "@/types/content";
import {
  Briefcase,
  Upload,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  MessageCircle,
  FileText,
  Building,
  Check,
} from "lucide-react";

export function ManpowerCandidateHub() {
  const { locale } = useLanguage();
  const { openCandidateDrawer } = useDrawer();
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const isHy = locale === "hy";

  const filteredVacancies = deorganicaConfig.manpower.vacancies.filter((v) => {
    if (selectedSector === "all") return true;
    return v.sector === selectedSector;
  });

  const handleWhatsAppApply = (jobTitle: string) => {
    const msg = buildCandidateWhatsAppMessage({
      name: "Job Applicant",
      role: jobTitle,
      notes: "Hello De Organica HR team, I am interested in applying for this position.",
    });
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="manpower-candidates" className="py-20 lg:py-28 bg-white border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-brand-olive block mb-3">
            {isHy ? "Բաժին II · Միջազգային Աշխատուժ և Կարիերա" : "Division II · International Careers & Talent Pool"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
            {isHy ? "Աշխատանք Հայաստանում և Արտերկրում" : "Opportunities in Armenia & Global Corridors"}
          </h2>
          <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
            {isHy ? deorganicaConfig.manpower.heroSubtext_hy : deorganicaConfig.manpower.heroSubtext_en}
          </p>
        </div>

        {/* Ethical Contingency Charter Box */}
        <div className="rounded-2xl bg-brand-stone-50 border border-brand-stone-200 p-6 sm:p-8 mb-16 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-brand-stone-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-olive-subtle flex items-center justify-center text-brand-olive flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-forest">
                  {isHy ? "Էթիկական Հավաքագրման և Զրոյական Նախնական Վճարի Քարտիա" : "Ethical Recruitment & Zero Upfront Fee Charter"}
                </h3>
                <p className="text-xs sm:text-sm text-brand-ink-muted mt-1 max-w-2xl">
                  {isHy
                    ? "«Դե Օրգանիկա»-ն առաջնորդվում է թեկնածուների պաշտպանության միջազգային սկզբունքներով: Գրանցման, ռեզյումեի ընդունման կամ հարցազրույցի համար որևէ վճար չի գանձվում:"
                    : "De Organica LLC operates on a strict candidate-first model. Candidates never pay upfront registration, application, or interview fees. Placement terms apply strictly upon verified job offer."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openCandidateDrawer()}
              className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-all flex items-center gap-2 flex-shrink-0"
            >
              <Upload className="w-3.5 h-3.5 text-brand-olive-light" />
              <span>{isHy ? "Ուղարկել ընդհանուր CV" : "Drop General CV"}</span>
            </button>
          </div>

          {/* 4 Trust Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {deorganicaConfig.manpower.trustPillars.map((p, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-forest">
                  <Check className="w-4 h-4 text-brand-olive flex-shrink-0" />
                  <span>{isHy ? p.title_hy : p.title_en}</span>
                </div>
                <p className="text-[11px] text-brand-ink-muted leading-relaxed pl-6">
                  {isHy ? p.desc_hy : p.desc_en}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Step Legal Pathway to Armenia */}
        <div className="mb-16">
          <div className="max-w-xl mb-8">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-olive block mb-1">
              {isHy ? "Թափանցիկ Գործընթաց" : "Transparent 4-Step Process"}
            </span>
            <h3 className="font-serif text-2xl font-bold text-brand-forest">
              {isHy ? "Ինչպե՞ս է կատարվում աշխատանքի տեղավորումը" : "How Your Legal Relocation to Armenia Works"}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deorganicaConfig.manpower.mobilitySteps.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-xl bg-white border border-brand-stone-200 relative group hover:border-brand-olive/50 transition-colors shadow-xs"
              >
                <div className="text-3xl font-serif font-bold text-brand-stone-300 group-hover:text-brand-olive transition-colors mb-4">
                  {step.step}
                </div>
                <h4 className="font-serif text-base font-bold text-brand-forest mb-2">
                  {isHy ? step.title_hy : step.title_en}
                </h4>
                <p className="text-xs text-brand-ink-muted leading-relaxed">
                  {isHy ? step.desc_hy : step.desc_en}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Filterable Vacancies Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-brand-forest">
                {isHy ? "Ակտիվ Թափուր Աշխատատեղեր" : "Featured Active Vacancies in Armenia"}
              </h3>
              <p className="text-xs text-brand-ink-muted mt-1">
                {isHy
                  ? "Եթե չեք գտնում Ձեր մասնագիտությունը, օգտագործեք «Ուղարկել ընդհանուր CV» կոճակը:"
                  : "If your specific role is not listed below, submit your profile into our general talent pool."}
              </p>
            </div>

            {/* General CV Quick Button */}
            <button
              type="button"
              onClick={() => openCandidateDrawer()}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-olive text-brand-forest text-xs font-semibold hover:bg-brand-olive hover:text-white transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isHy ? "Ընդհանուր Ռեզյումեի Բազա" : "Join General Talent Pool"}</span>
            </button>
          </div>

          {/* Sector Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {deorganicaConfig.manpower.sectors.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => setSelectedSector(sec.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSector === sec.id
                    ? "bg-brand-forest text-white shadow-xs"
                    : "bg-brand-stone-100 text-brand-ink-muted hover:text-brand-forest hover:bg-brand-stone-200"
                }`}
              >
                {isHy ? sec.label_hy : sec.label_en}
              </button>
            ))}
          </div>

          {/* Vacancies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVacancies.map((vacancy) => (
              <div
                key={vacancy.id}
                className="rounded-xl bg-brand-stone-50 border border-brand-stone-200 p-6 sm:p-7 flex flex-col justify-between hover:border-brand-olive/50 hover:shadow-md transition-all space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-stone-200 text-brand-forest">
                      {isHy ? vacancy.sector_hy : vacancy.sector_en}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-brand-ink-muted">
                      <Clock className="w-3 h-3 text-brand-olive" />
                      <span>{isHy ? vacancy.type_hy : vacancy.type_en}</span>
                    </div>
                  </div>

                  <h4 className="font-serif text-lg sm:text-xl font-bold text-brand-forest mb-2">
                    {isHy ? vacancy.title_hy : vacancy.title_en}
                  </h4>

                  <div className="flex items-center gap-1.5 text-xs text-brand-olive-dark font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{isHy ? vacancy.location_hy : vacancy.location_en}</span>
                  </div>

                  <p className="text-xs text-brand-ink-muted leading-relaxed mb-4">
                    {isHy ? vacancy.description_hy : vacancy.description_en}
                  </p>

                  {/* Requirements */}
                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] uppercase font-bold text-brand-forest tracking-wider block">
                      {isHy ? "Հիմնական պահանջներ" : "Key Requirements"}
                    </span>
                    {(isHy ? vacancy.requirements_hy : vacancy.requirements_en).map((req, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-brand-ink">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-olive mt-1.5 flex-shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-brand-stone-200">
                    {(isHy ? vacancy.benefits_hy : vacancy.benefits_en).map((b, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white text-brand-forest border border-brand-stone-200"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Apply Actions */}
                <div className="pt-4 border-t border-brand-stone-200 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openCandidateDrawer(isHy ? vacancy.title_hy : vacancy.title_en)}
                    className="flex-1 py-2.5 px-3 rounded-lg bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-colors text-center"
                  >
                    {isHy ? "Դիմել այս հաստիքին" : "Apply for Position"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppApply(vacancy.title_en)}
                    className="py-2.5 px-3 rounded-lg border border-brand-stone-300 bg-white text-brand-ink hover:text-emerald-700 hover:border-emerald-500 text-xs font-medium transition-colors flex items-center gap-1.5"
                    title="Inquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Talent Pool Catch-All Banner */}
          <div className="mt-8 p-6 rounded-2xl bg-brand-stone-100 border border-brand-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-forest shadow-xs flex-shrink-0 hidden sm:flex">
                <FileText className="w-6 h-6 text-brand-olive" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-brand-forest">
                  {isHy ? "Չգտա՞ք Ձեր մասնագիտությունը" : "Don't see your specific specialization?"}
                </h4>
                <p className="text-xs text-brand-ink-muted">
                  {isHy
                    ? "Ուղարկեք Ձեր ռեզյումեն ընդհանուր տվյալների բազա: Նոր թափուր աշխատատեղերի դեպքում մենք կկապվենք Ձեզ հետ:"
                    : "Submit your profile directly into our Yerevan talent repository. We match your skills as new corporate employer requisitions open."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => openCandidateDrawer()}
              className="px-6 py-2.5 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep transition-all shadow-xs flex-shrink-0"
            >
              {isHy ? "Ներկայացնել Ռեզյումե" : "Submit Your Profile"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
