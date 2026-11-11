"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { buildWhatsAppUrl, buildTravelWhatsAppMessage, buildCandidateWhatsAppMessage, buildEmployerWhatsAppMessage } from "@/lib/whatsapp";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  MessageCircle,
  ShieldCheck,
  Send,
  Building,
  Sparkles,
  ArrowRight,
  Compass,
  Briefcase,
  Building2,
  Navigation,
  Globe,
  Car,
} from "lucide-react";

interface ContactSectionProps {
  variant?: "all" | "travel" | "manpower";
}

export function ContactSection({ variant = "all" }: ContactSectionProps) {
  const { locale } = useLanguage();
  const { openTravelDrawer, openCandidateDrawer, openEmployerDrawer } = useDrawer();
  const isHy = locale === "hy";

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

        // Check if between 09:00 and 19:00 Yerevan time
        const hourFormatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Yerevan",
          hour: "numeric",
          hour12: false,
        });
        const currentHour = parseInt(hourFormatter.format(now), 10);
        setIsDeskOpen(currentHour >= 9 && currentHour < 19);
      } catch (e) {
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
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  const handleCandidateWhatsApp = () => {
    const msg = buildCandidateWhatsAppMessage({
      name: "Job Applicant",
      role: "International Placement",
      notes: "Hello De Organica HR, I would like to inquire about overseas job opportunities and the zero-fee placement process.",
    });
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  const handleEmployerWhatsApp = () => {
    const msg = buildEmployerWhatsAppMessage({
      companyName: "Enterprise Client",
      contactPerson: "Hiring Manager",
      industry: "Skilled / Hospitality / Logistics Manpower",
      headcount: "1-10",
      notes: "Hello De Organica corporate team, we would like to initiate a talent requisition for our Armenian operations.",
    });
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-gradient-to-b from-brand-stone-100/60 to-white border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Yerevan Diplomatic & Commercial Desk Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-olive" />
                <span>{isHy ? "Երևանի Կենտրոնական Գրասենյակ" : "Yerevan Commercial Headquarters"}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
                {isHy ? "Ուղիղ Կապ Երևանի Գրասենյակի Հետ" : "Direct Access to our Yerevan Executive Desk"}
              </h2>
              <p className="text-sm text-brand-ink-muted leading-relaxed">
                {isHy
                  ? "Գտնվելով Երևանի կենտրոնում՝ մեր թիմը համակարգում է ինչպես Հայաստանի բացառիկ տուրիստական երթուղիները, այնպես էլ միջազգային աշխատուժի օրինական ներգրավումը:"
                  : "Headquartered in Yerevan, Republic of Armenia, De Organica LLC provides direct advisory for destination travel, private chauffeur tours, consular visa filings, and certified overseas talent placement."}
              </p>
            </div>

            {/* Live Yerevan Desk Status Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-brand-stone-200/90 shadow-md space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-brand-stone-100">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isDeskOpen ? "bg-brand-olive" : "bg-amber-600"}`} />
                  <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
                    {isDeskOpen
                      ? isHy
                        ? "Գրասենյակը բաց է"
                        : "Yerevan Desk Open"
                      : isHy
                      ? "Հերթապահ ռեժիմ (WhatsApp ակտիվ)"
                      : "After-Hours WhatsApp Active"}
                  </span>
                </div>

                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-brand-forest block">
                    {yerevanTime || "12:00:00 PM"}
                  </span>
                  <span className="text-[10px] text-brand-ink-muted font-mono uppercase">
                    YEREVAN (GMT+4)
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs text-brand-ink">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-forest block text-sm">
                      {deorganicaConfig.company.legalName}
                    </span>
                    <span className="text-brand-ink-muted">
                      {isHy ? deorganicaConfig.company.address_hy : deorganicaConfig.company.address_en}
                    </span>
                    <span className="text-[11px] font-mono text-brand-olive block mt-0.5">
                      Coordinates: 40.1792° N, 44.4991° E
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-forest block text-sm">
                      {isHy ? "Պաշտոնական էլ. փոստ" : "Primary Email Desk"}
                    </span>
                    <a
                      href={`mailto:${deorganicaConfig.company.email}`}
                      className="text-brand-forest hover:text-brand-olive transition-colors underline underline-offset-2 font-mono text-xs"
                    >
                      {deorganicaConfig.company.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-forest block text-sm">
                      {isHy ? "Աշխատանքային ժամեր" : "Desk Operating Hours"}
                    </span>
                    <span className="text-brand-ink-muted">
                      {isHy ? deorganicaConfig.company.workingHours_hy : deorganicaConfig.company.workingHours_en}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-forest block text-sm">
                      {isHy ? "Իրավաբանական Գրանցում" : "Corporate Legal Entity"}
                    </span>
                    <span className="text-brand-ink-muted">
                      {isHy ? deorganicaConfig.company.registrationStatus_hy : deorganicaConfig.company.registrationStatus_en}
                    </span>
                    <span className="text-[11px] text-brand-ink-muted block mt-0.5">
                      CEO: Maneesha Muraleedharan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Intent-Segmented Direct Dispatch Cards */}
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-2">
              <h3 className="font-serif text-2xl font-bold text-brand-forest">
                {isHy ? "Ընտրեք Ձեր հարցման բնույթը" : "Select Your Direct Inquiry Channel"}
              </h3>
              <p className="text-xs sm:text-sm text-brand-ink-muted mt-1">
                {isHy
                  ? "Սեղմեք համապատասխան բաժինը՝ անմիջապես համակարգողի հետ WhatsApp-ով կապվելու կամ լիարժեք հայտ ներկայացնելու համար:"
                  : "Route directly to the appropriate specialist desk in Yerevan with pre-formatted inquiry parameters:"}
              </p>
            </div>

            {/* Travel-Specific Channels */}
            {variant === "travel" && (
              <>
                {/* Channel 1: Bespoke Leisure & Private Expeditions */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-xs hover:border-brand-olive/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-olive-subtle border border-brand-olive/30 flex items-center justify-center text-brand-forest shrink-0">
                      <Compass className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-olive">
                        <span>{isHy ? "Մասնավոր Երթուղիներ" : "Bespoke Leisure & Private Expeditions"}</span>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-brand-forest">
                        {isHy ? "Անհատական Տուրեր և Գինու Ճանապարհ" : "Bespoke Cultural & Wine Expeditions"}
                      </h4>
                      <p className="text-xs text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "Հատուկ կազմված երթուղիներ, Արենիի գինու համտեսներ, ընտանեկան հանգիստ և անհատական էքսկուրսավարներ:"
                          : "Curated itineraries, Areni-1 wine tastings, luxury resort lodging, and private multi-day itineraries across Armenia."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleTravelWhatsApp}
                      className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openTravelDrawer("Bespoke Private Itinerary")}
                      className="px-3.5 py-2.5 rounded-xl bg-brand-stone-100 hover:bg-brand-stone-200 text-brand-forest text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isHy ? "Հայտ" : "Inquire"}
                    </button>
                  </div>
                </div>

                {/* Channel 2: B2B Destination Management (DMC) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-xs hover:border-brand-olive/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-forest/10 border border-brand-forest/20 flex items-center justify-center text-brand-forest shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-forest">
                        <span>{isHy ? "B2B Գործընկերություն" : "B2B Destination Management (DMC)"}</span>
                        <span className="px-1.5 py-0.2 rounded bg-brand-forest/10 text-brand-forest text-[9px]">NET TARIFFS</span>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-brand-forest">
                        {isHy ? "Մեծածախ DMC Սպասարկում Գործակալություններին" : "Wholesale Ground Handling & Allotments"}
                      </h4>
                      <p className="text-xs text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "Հատուկ գներ արտերկրի տուրօպերատորների համար, սպիտակ բրենդավորմամբ դիմավորում և MICE միջոցառումներ:"
                          : "Exclusive contract rates for overseas tour operators, white-label EVN airport reception, and group allotments."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleTravelWhatsApp}
                      className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openTravelDrawer("B2B Travel Partner DMC Agreement")}
                      className="px-3.5 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isHy ? "Պայմանագիր" : "B2B Desk"}
                    </button>
                  </div>
                </div>

                {/* Channel 3: Zvartnots EVN Chauffeur Fleet */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-xs hover:border-brand-olive/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-stone-100 border border-brand-stone-200 flex items-center justify-center text-brand-forest shrink-0">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-ink-muted">
                        <span>{isHy ? "24/7 Օդանավակայանի Լոգիստիկա" : "Zvartnots (EVN) Airport & Fleet"}</span>
                        <span className="px-1.5 py-0.2 rounded bg-brand-stone-200 text-brand-forest text-[9px]">24/7 LIVE</span>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-brand-forest">
                        {isHy ? "Chauffeur Ավտոպարկ և EVN Տրանսֆեր" : "Executive Chauffeur Fleet & Airport Transfers"}
                      </h4>
                      <p className="text-xs text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "Թռիչքների առցանց հետևում, էկոնոմից մինչև VIP մարդատար մեքենաներ և հուսալի միջքաղաքային երթեր:"
                          : "Real-time flight monitoring, economy to executive sedans and VIP passenger vans with professional chauffeur dispatch."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleTravelWhatsApp}
                      className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openTravelDrawer("Hotels & Airport Transfers")}
                      className="px-3.5 py-2.5 rounded-xl bg-brand-stone-100 hover:bg-brand-stone-200 text-brand-forest text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isHy ? "Ամրագրել" : "Book Fleet"}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Manpower-Specific Channels */}
            {variant === "manpower" && (
              <>
                {/* Channel 1: Candidate CV Submission & Placement Desk */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-xs hover:border-brand-olive/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-olive-subtle border border-brand-olive/30 flex items-center justify-center text-brand-forest shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-olive">
                        <span>{isHy ? "Աշխատանք Փնտրողների Բաժին" : "Division I · Job Seekers"}</span>
                        <span className="px-1.5 py-0.2 rounded bg-brand-olive/15 text-brand-forest text-[9px]">ZERO FEE</span>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-brand-forest">
                        {isHy ? "Թեկնածուների Դիմումներ և Ռեզյումե (CV)" : "Candidate CV Submission & Job Advisory"}
                      </h4>
                      <p className="text-xs text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "100% անվճար ռեզյումեի գրանցում, վճարում միայն աշխատանքի ընդունվելիս և պաշտոնական աշխատանքային վիզա:"
                          : "100% free resume submission with pay-after-job guarantee, verified contracts, and official visa support."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleCandidateWhatsApp}
                      className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openCandidateDrawer()}
                      className="px-3.5 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isHy ? "Ուղարկել CV" : "Drop CV"}
                    </button>
                  </div>
                </div>

                {/* Channel 2: Corporate Staffing & B2B Quota Requisition */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-xs hover:border-brand-olive/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-stone-100 border border-brand-stone-200 flex items-center justify-center text-brand-forest shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-ink-muted">
                        <span>{isHy ? "Գործատուների Բաժին" : "Division II · B2B Staffing"}</span>
                        <span className="px-1.5 py-0.2 rounded bg-brand-stone-200 text-brand-forest text-[9px]">72H SLA</span>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-brand-forest">
                        {isHy ? "Կորպորատիվ Գործատուների Պատվերներ" : "Corporate Employer Talent Requisitions"}
                      </h4>
                      <p className="text-xs text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "ՀՀ աշխատանքի քվոտաների ձևակերպում, թեկնածուների ստուգում և արագ համալրում 30-օրյա երաշխիքով:"
                          : "Ministry labor quota processing, vetted candidate shortlists within 72 hours, and 30-day replacement warranty."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleEmployerWhatsApp}
                      className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openEmployerDrawer()}
                      className="px-3.5 py-2.5 rounded-xl bg-brand-stone-100 hover:bg-brand-stone-200 text-brand-forest text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isHy ? "Պատվիրել" : "Requisition"}
                    </button>
                  </div>
                </div>

                {/* Channel 3: Legal Work Permit & Relocation Advisory */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-xs hover:border-brand-olive/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-gold-subtle border border-brand-gold/30 flex items-center justify-center text-brand-gold shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                        <span>{isHy ? "Իրավական Համապատասխանություն" : "Division III · Legal Permits"}</span>
                        <span className="px-1.5 py-0.2 rounded bg-brand-gold/15 text-brand-gold text-[9px]">RA MINISTRY</span>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-brand-forest">
                        {isHy ? "Աշխատանքի Թույլտվություն և Ռելոկացիա" : "Work Permit Clearance & Relocation Care"}
                      </h4>
                      <p className="text-xs text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "ՀՀ միգրացիոն ծառայության գրանցում, հյուպատոսական վիզա, Զվարթնոցում դիմավորում և կացություն:"
                          : "Full compliance with RA Migration Service, consular visa files, Zvartnots arrival reception, and residential registration."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleCandidateWhatsApp}
                      className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openCandidateDrawer()}
                      className="px-3.5 py-2.5 rounded-xl bg-brand-stone-100 hover:bg-brand-stone-200 text-brand-forest text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isHy ? "Խորհրդատվություն" : "Advisory"}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Standard Multi-Division Channels (Overview / General Contact) */}
            {variant === "all" && (
              <>
                {/* Channel 1: Travel & Tour Desk */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-xs hover:border-brand-olive/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-olive-subtle border border-brand-olive/30 flex items-center justify-center text-brand-forest shrink-0">
                      <Compass className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-olive">
                        <span>{isHy ? "Բաժին I · Տուրեր և Երթուղիներ" : "Division I · Travel Desk"}</span>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-brand-forest">
                        {isHy ? "Տուրեր, Երթուղիներ և VIP Տրանսֆեր" : "Armenia Itineraries & Chauffeur Fleet"}
                      </h4>
                      <p className="text-xs text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "Հատուկ կազմված տուրիստական ծրագրեր, Գառնի, Սևան, Տաթև և B2B DMC մեծածախ սակագներ:"
                          : "Custom holiday planning, Garni/Sevan/Tatev tours, or B2B DMC group tariffs."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleTravelWhatsApp}
                      className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openTravelDrawer("General Travel Inquiry")}
                      className="px-3.5 py-2.5 rounded-xl bg-brand-stone-100 hover:bg-brand-stone-200 text-brand-forest text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isHy ? "Հայտ" : "Form"}
                    </button>
                  </div>
                </div>

                {/* Channel 2: Candidate CV Drop Desk */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-xs hover:border-brand-olive/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-olive-subtle border border-brand-olive/30 flex items-center justify-center text-brand-forest shrink-0">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-olive">
                        <span>{isHy ? "Բաժին II · Աշխատանք Փնտրողներ" : "Division II · Job Seekers"}</span>
                        <span className="px-1.5 py-0.2 rounded bg-brand-olive/15 text-brand-forest text-[9px]">ZERO FEE</span>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-brand-forest">
                        {isHy ? "Թեկնածուների Դիմումներ և Ռեզյումե" : "Candidate CV Submission & Job Advisory"}
                      </h4>
                      <p className="text-xs text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "100% անվճար ռեզյումեի ներկայացում, վճարում միայն աշխատանքի ընդունվելիս և վիզայի աջակցություն:"
                          : "100% free resume submission with pay-after-job guarantee and official visa support."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleCandidateWhatsApp}
                      className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openCandidateDrawer()}
                      className="px-3.5 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isHy ? "Ուղարկել CV" : "Drop CV"}
                    </button>
                  </div>
                </div>

                {/* Channel 3: Corporate Staffing & B2B Quota Requisition */}
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-xs hover:border-brand-olive/50 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-brand-stone-100 border border-brand-stone-200 flex items-center justify-center text-brand-forest shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-ink-muted">
                        <span>{isHy ? "Բաժին III · Կորպորատիվ Հավաքագրում" : "Enterprise · B2B Staffing"}</span>
                        <span className="px-1.5 py-0.2 rounded bg-brand-stone-200 text-brand-forest text-[9px]">72H SLA</span>
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-brand-forest">
                        {isHy ? "Կորպորատիվ Գործատուների Պատվերներ" : "Corporate Employer Talent Requisitions"}
                      </h4>
                      <p className="text-xs text-brand-ink-muted mt-0.5">
                        {isHy
                          ? "ՀՀ աշխատանքի քվոտաների ձևակերպում, թեկնածուների ընտրություն և ամբողջական իրավական աջակցություն:"
                          : "Ministry labor quota handling, candidate vetting, and complete relocation compliance."}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleEmployerWhatsApp}
                      className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => openEmployerDrawer()}
                      className="px-3.5 py-2.5 rounded-xl bg-brand-stone-100 hover:bg-brand-stone-200 text-brand-forest text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {isHy ? "Պատվիրել" : "Requisition"}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* General Email & Legal Guarantee Note */}
            <div className="p-4 rounded-2xl bg-brand-stone-100/80 border border-brand-stone-200 text-xs text-brand-ink-muted flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-olive shrink-0" />
                <span>
                  {isHy ? "Պաշտոնական կորպորատիվ հարցումներ: " : "Official Corporate Inquiries: "}
                  <a
                    href={`mailto:${deorganicaConfig.company.email}`}
                    className="font-mono text-brand-forest underline underline-offset-2"
                  >
                    {deorganicaConfig.company.email}
                  </a>
                </span>
              </div>
              <span className="text-[11px] font-medium text-brand-forest">
                {isHy ? "Պատասխանի ժամկետ՝ 4 աշխատանքային ժամվա ընթացքում" : "Response SLA: Within 4 Business Hours"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
