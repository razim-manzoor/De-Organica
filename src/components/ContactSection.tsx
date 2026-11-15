"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { useSiteData } from "@/context/SiteDataContext";
import {
  buildWhatsAppUrl,
  buildTravelWhatsAppMessage,
  buildCandidateWhatsAppMessage,
  buildEmployerWhatsAppMessage,
} from "@/lib/whatsapp";
import type { ContactPageContent } from "@/types/content";
import { defaultContactPageContent } from "@/data/cms-fallbacks";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  MessageCircle,
  ShieldCheck,
  Briefcase,
  Building2,
  Compass,
  Car,
} from "lucide-react";

interface ContactSectionProps {
  variant?: "all" | "travel" | "manpower";
  headingLevel?: "h1" | "h2";
  content?: ContactPageContent;
}

export function ContactSection({
  variant = "all",
  headingLevel = "h2",
  content = defaultContactPageContent,
}: ContactSectionProps) {
  const { locale } = useLanguage();
  const { openTravelDrawer, openCandidateDrawer, openEmployerDrawer } = useDrawer();
  const { siteSettings } = useSiteData();
  const company = siteSettings.company;
  const isHy = locale === "hy";

  const PrimaryHeading = headingLevel === "h1" ? "h1" : "h2";
  const SecondaryHeading = headingLevel === "h1" ? "h2" : "h3";
  const CardHeading = headingLevel === "h1" ? "h3" : "h4";

  // Real-time Yerevan Local Clock (Asia/Yerevan, GMT+4)
  const [yerevanTime, setYerevanTime] = useState<string>("");
  const [isDeskOpen, setIsDeskOpen] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Yerevan",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setYerevanTime(timeStr);

        const hourFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Yerevan",
          hour: "numeric",
          hour12: false,
        });
        const currentHour = parseInt(hourFormatter.format(now), 10);
        setIsDeskOpen(currentHour >= 9 && currentHour < 19);
      } catch {
        setYerevanTime("GMT+4 (Armenia)");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTravelWhatsApp = () => {
    const msg = buildTravelWhatsAppMessage({
      name: "Traveler / Agency Partner",
      serviceOrTour: "Yerevan Desk Travel Inquiry",
      notes: "Hello De Organica team, I am reaching out to discuss an upcoming trip or DMC collaboration in Armenia.",
    });
    window.open(buildWhatsAppUrl(msg, company.whatsappNumberDigits), "_blank", "noopener,noreferrer");
  };

  const handleCandidateWhatsApp = () => {
    const msg = buildCandidateWhatsAppMessage({
      name: "Job Applicant",
      role: "International Placement",
      notes:
        "Hello De Organica HR, I would like to inquire about overseas job opportunities and official work permit placement.",
    });
    window.open(buildWhatsAppUrl(msg, company.whatsappNumberDigits), "_blank", "noopener,noreferrer");
  };

  const handleEmployerWhatsApp = () => {
    const msg = buildEmployerWhatsAppMessage({
      companyName: "Enterprise Client",
      contactPerson: "Hiring Manager",
      industry: "Skilled / Hospitality / Logistics Manpower",
      headcount: "1-10",
      notes:
        "Hello De Organica corporate team, we would like to initiate a talent requisition for our Armenian operations.",
    });
    window.open(buildWhatsAppUrl(msg, company.whatsappNumberDigits), "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-gradient-to-b from-brand-stone-100/60 to-white border-t border-brand-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Yerevan Diplomatic & Commercial Desk Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-text mb-4">
                <span>{isHy ? content.eyebrow_hy : content.eyebrow_en}</span>
              </div>
              <PrimaryHeading className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
                {isHy ? content.headline_hy : content.headline_en}
              </PrimaryHeading>
              <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
                {isHy ? content.subtext_hy : content.subtext_en}
              </p>
            </div>

            {/* Live Yerevan Desk Status Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-brand-stone-200/90 shadow-md space-y-5">
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-brand-stone-100">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      isDeskOpen ? "bg-brand-olive" : "bg-brand-gold"
                    }`}
                  />
                  <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
                    {isDeskOpen
                      ? isHy
                        ? content.deskOpenLabel_hy
                        : content.deskOpenLabel_en
                      : isHy
                      ? content.deskClosedLabel_hy
                      : content.deskClosedLabel_en}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-brand-forest block">
                    {yerevanTime || "12:00:00 PM"}
                  </span>
                  <span className="text-xs text-brand-ink-subtle font-mono uppercase">
                    YEREVAN (GMT+4)
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-brand-ink">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-olive-text shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-brand-forest block text-sm">
                      {company.legalName}
                    </span>
                    <span className="text-brand-ink-muted">
                      {isHy
                        ? company.address_hy
                        : company.address_en}
                    </span>
                    <span className="text-xs font-mono text-brand-olive-text block mt-0.5">
                      {content.coordinates}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-brand-olive-text shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-brand-forest block text-sm">
                      {isHy ? "Հեռախոս և WhatsApp Դեսկ" : "Direct Telephone & WhatsApp Desk"}
                    </span>
                    <a
                      href={`tel:${company.phoneYerevanDesk.replace(/\s+/g, "")}`}
                      className="text-brand-forest hover:text-brand-olive-text transition-colors underline underline-offset-2 font-mono text-xs sm:text-sm inline-block py-0.5"
                    >
                      {company.phoneYerevanDesk}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-olive-text shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-brand-forest block text-sm">
                      {isHy ? "Պաշտոնական էլ. փոստ" : "Primary Email Desk"}
                    </span>
                    <a
                      href={`mailto:${company.email}`}
                      className="text-brand-forest hover:text-brand-olive-text transition-colors underline underline-offset-2 font-mono text-xs sm:text-sm inline-block py-0.5"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-olive-text shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-brand-forest block text-sm">
                      {isHy ? "Աշխատանքային ժամեր" : "Desk Operating Hours"}
                    </span>
                    <span className="text-brand-ink-muted">
                      {isHy
                        ? company.workingHours_hy
                        : company.workingHours_en}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-brand-olive-text shrink-0 mt-1" />
                  <div>
                    <span className="font-semibold text-brand-forest block text-sm">
                      {isHy ? "Իրավաբանական Գրանցում" : "Corporate Legal Entity"}
                    </span>
                    <span className="text-brand-ink-muted">
                      {isHy
                        ? company.registrationStatus_hy
                        : company.registrationStatus_en}
                    </span>
                    <span className="text-xs text-brand-ink-subtle block mt-0.5">
                      {isHy ? "Հիմնադիր և Տնօրեն՝" : "Founder & CEO:"}{" "}
                      {company.ceo}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Intent-Segmented Direct Dispatch Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-2">
              <SecondaryHeading className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest">
                {isHy ? content.channelsTitle_hy : content.channelsTitle_en}
              </SecondaryHeading>
              <p className="text-xs sm:text-sm text-brand-ink-muted mt-1">
                {isHy ? content.channelsSubtitle_hy : content.channelsSubtitle_en}
              </p>
            </div>

            {/* Travel-Specific Channels */}
            {variant === "travel" && (
              <>
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm hover:border-brand-olive/50 hover:shadow-md transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-olive-subtle border border-brand-olive/30 flex items-center justify-center text-brand-forest shrink-0">
                      <Compass className="w-6 h-6 text-brand-olive-text" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-olive-text">
                        <span>{isHy ? "Մասնավոր Երթուղիներ" : "Bespoke Leisure & Private Expeditions"}</span>
                      </div>
                      <CardHeading className="font-serif text-lg sm:text-xl font-bold text-brand-forest">
                        {isHy ? "Անհատական Տուրեր և Գինու Ճանապարհ" : "Bespoke Cultural & Wine Expeditions"}
                      </CardHeading>
                      <p className="text-xs sm:text-sm text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "Հատուկ կազմված երթուղիներ, Արենիի գինու համտեսներ, ընտանեկան հանգիստ և անհատական էքսկուրսավարներ:"
                          : "Curated itineraries, Areni-1 wine tastings, luxury resort lodging, and private multi-day itineraries across Armenia."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openTravelDrawer("Bespoke Private Itinerary")}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep active:scale-95 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs"
                    >
                      {isHy ? "Հայտ" : "Inquire"}
                    </button>
                    <button
                      type="button"
                      onClick={handleTravelWhatsApp}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white hover:bg-brand-stone-50 hover:border-brand-olive-dark active:scale-95 text-brand-forest text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm hover:border-brand-olive/50 hover:shadow-md transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-forest/10 border border-brand-forest/20 flex items-center justify-center text-brand-forest shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-forest">
                        {isHy ? "B2B Գործընկերություն" : "B2B Destination Management (DMC)"}
                      </div>
                      <CardHeading className="font-serif text-lg sm:text-xl font-bold text-brand-forest">
                        {isHy ? "Մեծածախ DMC Սպասարկում Գործակալություններին" : "Wholesale Ground Handling & Allotments"}
                      </CardHeading>
                      <p className="text-xs sm:text-sm text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "Համագործակցության հատուկ պայմաններ արտերկրի տուրօպերատորների համար, սպիտակ բրենդավորմամբ դիմավորում և MICE միջոցառումներ:"
                          : "Exclusive partner arrangements for overseas tour operators, white-label EVN airport reception, and group allotments."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openTravelDrawer("B2B Travel Partner DMC Agreement")}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep active:scale-95 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs"
                    >
                      {isHy ? "Հայտ" : "Inquire"}
                    </button>
                    <button
                      type="button"
                      onClick={handleTravelWhatsApp}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white hover:bg-brand-stone-50 hover:border-brand-olive-dark active:scale-95 text-brand-forest text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm hover:border-brand-olive/50 hover:shadow-md transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-stone-100 border border-brand-stone-200 flex items-center justify-center text-brand-forest shrink-0">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-ink-muted">
                        {isHy ? "24/7 Օդանավակայանի Լոգիստիկա" : "Zvartnots (EVN) Airport & Fleet"}
                      </div>
                      <CardHeading className="font-serif text-lg sm:text-xl font-bold text-brand-forest">
                        {isHy ? "Chauffeur Ավտոպարկ և EVN Տրանսֆեր" : "Executive Chauffeur Fleet & Airport Transfers"}
                      </CardHeading>
                      <p className="text-xs sm:text-sm text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "Թռիչքների առցանց հետևում, էկոնոմից մինչև VIP մարդատար մեքենաներ և հուսալի միջքաղաքային երթեր:"
                          : "Real-time flight monitoring, economy to executive sedans and VIP passenger vans with professional chauffeur dispatch."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openTravelDrawer("Hotels & Airport Transfers")}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep active:scale-95 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs"
                    >
                      {isHy ? "Ամրագրել" : "Book Fleet"}
                    </button>
                    <button
                      type="button"
                      onClick={handleTravelWhatsApp}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white hover:bg-brand-stone-50 hover:border-brand-olive-dark active:scale-95 text-brand-forest text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Manpower-Specific Channels */}
            {variant === "manpower" && (
              <>
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm hover:border-brand-olive/50 hover:shadow-md transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-olive-subtle border border-brand-olive/30 flex items-center justify-center text-brand-forest shrink-0">
                      <Briefcase className="w-6 h-6 text-brand-olive-text" />
                    </div>
                    <div>
                      <div className="inline-flex flex-wrap items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-olive-text">
                        <span>{isHy ? "Աշխատանք Փնտրողների Բաժին" : "Division I · Job Seekers"}</span>
                        <span className="px-2 py-0.5 rounded bg-brand-olive-subtle text-brand-forest text-xs font-semibold">
                          {isHy ? "ՍՏՈՒԳՎԱԾ ՀԱՍՏԻՔՆԵՐ" : "VERIFIED JOBS"}
                        </span>
                      </div>
                      <CardHeading className="font-serif text-lg sm:text-xl font-bold text-brand-forest">
                        {isHy ? "Թեկնածուների Դիմումներ և Ռեզյումե (CV)" : "Candidate CV Submission & Job Advisory"}
                      </CardHeading>
                      <p className="text-xs sm:text-sm text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "Ռեզյումեների ընդունում, հաստատված կորպորատիվ պայմանագրեր և ՀՀ օրինական աշխատանքի թույլտվության ձևակերպում:"
                          : "Direct resume intake with verified corporate contracts, skill evaluation, and official Republic of Armenia work permit facilitation."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openCandidateDrawer()}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep active:scale-95 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs"
                    >
                      {isHy ? "Ուղարկել CV" : "Drop CV"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCandidateWhatsApp}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white hover:bg-brand-stone-50 hover:border-brand-olive-dark active:scale-95 text-brand-forest text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm hover:border-brand-olive/50 hover:shadow-md transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-stone-100 border border-brand-stone-200 flex items-center justify-center text-brand-forest shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-forest">
                        {isHy ? "Գործատուների Բաժին" : "Corporate Staffing & Recruitment"}
                      </div>
                      <CardHeading className="font-serif text-lg sm:text-xl font-bold text-brand-forest">
                        {isHy ? "Կորպորատիվ Գործատուների Պատվերներ" : "Corporate Employer Talent Requisitions"}
                      </CardHeading>
                      <p className="text-xs sm:text-sm text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "ՀՀ աշխատանքի քվոտաների ձևակերպում, թեկնածուների ստուգում (72 ժամում) և 30-օրյա երաշխիք:"
                          : "Ministry labor quota processing, vetted candidate shortlists within 72 hours, and 30-day replacement warranty."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEmployerDrawer()}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep active:scale-95 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs"
                    >
                      {isHy ? "Պատվիրել" : "Hire Staff"}
                    </button>
                    <button
                      type="button"
                      onClick={handleEmployerWhatsApp}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white hover:bg-brand-stone-50 hover:border-brand-olive-dark active:scale-95 text-brand-forest text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm hover:border-brand-olive/50 hover:shadow-md transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-gold-subtle border border-brand-gold/40 flex items-center justify-center text-brand-gold-text shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-forest">
                        {isHy ? "Իրավական Համապատասխանություն" : "Work Permits & Legal Accreditation"}
                      </div>
                      <CardHeading className="font-serif text-lg sm:text-xl font-bold text-brand-forest">
                        {isHy ? "Աշխատանքի Թույլտվություն և Ռելոկացիա" : "Work Permit Clearance & Relocation Care"}
                      </CardHeading>
                      <p className="text-xs sm:text-sm text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "ՀՀ միգրացիոն ծառայության գրանցում (15–25 աշխ. օր), հյուպատոսական վիզա և Զվարթնոցում դիմավորում:"
                          : "Full compliance with RA Migration Service (15–25 business days), consular visa files, and Zvartnots arrival reception."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openCandidateDrawer()}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep active:scale-95 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs"
                    >
                      {isHy ? "Խորհրդատվություն" : "Advisory"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCandidateWhatsApp}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white hover:bg-brand-stone-50 hover:border-brand-olive-dark active:scale-95 text-brand-forest text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Standard Multi-Division Channels (Overview / General Contact) */}
            {variant === "all" && (
              <>
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm hover:border-brand-olive/50 hover:shadow-md transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-olive-subtle border border-brand-olive/30 flex items-center justify-center text-brand-forest shrink-0">
                      <Compass className="w-6 h-6 text-brand-olive-text" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-forest">
                        {isHy ? "Տուրեր և Երթուղիներ" : "Travel & Inbound Desk"}
                      </div>
                      <CardHeading className="font-serif text-lg sm:text-xl font-bold text-brand-forest">
                        {isHy ? "Տուրեր, Երթուղիներ և VIP Տրանսֆեր" : "Armenia Itineraries & Chauffeur Fleet"}
                      </CardHeading>
                      <p className="text-xs sm:text-sm text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "Հեղինակային տուրիստական ծրագրեր, Գառնի, Սևան, Տաթև և B2B DMC տեղական սպասարկում:"
                          : "Custom holiday planning, Garni/Sevan/Tatev tours, or B2B DMC partnership inquiries."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openTravelDrawer("General Travel Inquiry")}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep active:scale-95 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs"
                    >
                      {isHy ? "Հայտ" : "Inquire"}
                    </button>
                    <button
                      type="button"
                      onClick={handleTravelWhatsApp}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white hover:bg-brand-stone-50 hover:border-brand-olive-dark active:scale-95 text-brand-forest text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm hover:border-brand-olive/50 hover:shadow-md transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-olive-subtle border border-brand-olive/30 flex items-center justify-center text-brand-forest shrink-0">
                      <Briefcase className="w-6 h-6 text-brand-olive-text" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-forest">
                        {isHy ? "Աշխատանք Փնտրողներ" : "Direct Job Opportunities"}
                      </div>
                      <CardHeading className="font-serif text-lg sm:text-xl font-bold text-brand-forest">
                        {isHy ? "Թեկնածուների Դիմումներ և Ռեզյումե" : "Candidate CV Submission & Job Advisory"}
                      </CardHeading>
                      <p className="text-xs sm:text-sm text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "Ռեզյումեների ընդունում, հաստատված պայմանագրեր և ՀՀ օրինական աշխատանքի թույլտվության աջակցություն:"
                          : "Direct candidate intake with verified contracts and official Republic of Armenia visa support."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openCandidateDrawer()}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep active:scale-95 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs"
                    >
                      {isHy ? "Ուղարկել CV" : "Drop CV"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCandidateWhatsApp}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white hover:bg-brand-stone-50 hover:border-brand-olive-dark active:scale-95 text-brand-forest text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-sm hover:border-brand-olive/50 hover:shadow-md transition-colors duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-stone-100 border border-brand-stone-200 flex items-center justify-center text-brand-forest shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-forest">
                        {isHy ? "Կորպորատիվ Հավաքագրում" : "Enterprise Talent Solutions"}
                      </div>
                      <CardHeading className="font-serif text-lg sm:text-xl font-bold text-brand-forest">
                        {isHy ? "Կորպորատիվ Գործատուների Պատվերներ" : "Corporate Employer Talent Requisitions"}
                      </CardHeading>
                      <p className="text-xs sm:text-sm text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "ՀՀ աշխատանքի քվոտաների ձևակերպում, թեկնածուների ընտրություն և ամբողջական իրավական աջակցություն:"
                          : "Ministry labor quota handling, candidate vetting, and complete relocation compliance."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => openEmployerDrawer()}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep active:scale-95 text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-xs"
                    >
                      {isHy ? "Պատվիրել" : "Hire Staff"}
                    </button>
                    <button
                      type="button"
                      onClick={handleEmployerWhatsApp}
                      className="min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white hover:bg-brand-stone-50 hover:border-brand-olive-dark active:scale-95 text-brand-forest text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* General Email & Legal Guarantee Note */}
            <div className="p-4 rounded-2xl bg-brand-stone-100/80 border border-brand-stone-200 text-xs text-brand-ink-muted flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-olive-text shrink-0" />
                <span>
                  {isHy ? "Պաշտոնական կորպորատիվ հարցումներ: " : "Official Corporate Inquiries: "}
                  <a
                    href={`mailto:${company.email}`}
                    className="font-mono text-brand-forest underline underline-offset-2"
                  >
                    {company.email}
                  </a>
                </span>
              </div>
              <span className="text-xs font-medium text-brand-forest">
                {isHy ? content.replySla_hy : content.replySla_en}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
