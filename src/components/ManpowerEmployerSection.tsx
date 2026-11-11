"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { buildWhatsAppUrl, buildEmployerWhatsAppMessage } from "@/lib/whatsapp";
import {
  Building2,
  Users2,
  ShieldCheck,
  FileCheck2,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  Briefcase,
  CheckCircle,
} from "lucide-react";

export function ManpowerEmployerSection() {
  const { locale } = useLanguage();
  const { openEmployerDrawer } = useDrawer();
  const isHy = locale === "hy";

  const handleWhatsAppEmployer = () => {
    const msg = buildEmployerWhatsAppMessage({
      companyName: "Prospective Employer",
      contactPerson: "Hiring Manager",
      industry: "Corporate Staffing",
      notes: "Hello De Organica team, we would like to discuss our company's manpower and staffing requirements.",
    });
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="manpower-employers" className="py-20 lg:py-28 bg-brand-stone-100/60 border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-stone-200 text-brand-forest text-xs font-semibold uppercase tracking-wider mb-4 border border-brand-stone-300">
            <Building2 className="w-3.5 h-3.5 text-brand-olive" />
            <span>{isHy ? "B2B Կորպորատիվ Համալրում" : "For Corporate Employers & Enterprises"}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
            {isHy ? "Վստահելի Միջազգային Աշխատուժ Ձեր Ընկերության Համար" : "End-to-End International Manpower & Staffing"}
          </h2>

          <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
            {isHy
              ? "Մենք ապահովում ենք որակավորված և աշխատասեր կադրերի մատակարարում Հայաստանի և տարածաշրջանի ձեռնարկություններին՝ հոգալով օրինական աշխատանքի թույլտվության, վիզայի և տեղավորման բոլոր հարցերը:"
              : "We supply verified international talent for enterprise operations in Armenia and regional corridors, managing end-to-end legal quotas, Ministry of Labor permits, and on-site deployment."}
          </p>
        </div>

        {/* 3-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {deorganicaConfig.manpower.employerSteps.map((step) => (
            <div
              key={step.step}
              className="rounded-2xl bg-white border border-brand-stone-200 p-8 shadow-xs hover:shadow-xl hover:border-brand-olive/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-serif text-3xl font-bold text-brand-olive">
                    {step.step}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-brand-stone-100 flex items-center justify-center text-brand-forest">
                    {step.step === "01" && <Users2 className="w-4 h-4 text-brand-olive" />}
                    {step.step === "02" && <FileCheck2 className="w-4 h-4 text-brand-olive" />}
                    {step.step === "03" && <ShieldCheck className="w-4 h-4 text-brand-olive" />}
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-brand-forest mb-3">
                  {isHy ? step.title_hy : step.title_en}
                </h3>

                <p className="text-xs text-brand-ink-muted leading-relaxed mb-6">
                  {isHy ? step.description_hy : step.description_en}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-brand-stone-100">
                  {(isHy ? step.bullets_hy : step.bullets_en).map((bullet, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-brand-ink">
                      <CheckCircle className="w-3.5 h-3.5 text-brand-olive flex-shrink-0 mt-0.5" />
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
            <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-3">
              {isHy ? "Պահանջվու՞մ են աշխատակիցներ Ձեր նախագծի համար" : "Ready to Discuss Your Enterprise Staffing Requisition?"}
            </h3>
            <p className="text-xs sm:text-sm text-brand-stone-300 leading-relaxed">
              {isHy
                ? "Կապվեք մեր կորպորատիվ գրասենյակի հետ: Մենք կտրամադրենք թեկնածուների նախնական ցանկ, ծախսերի հաշվարկ և աշխատանքի թույլտվության ժամանակացույց:"
                : "Connect directly with our Yerevan corporate desk. We will analyze your headcount requirements, timeline, and deliver a tailored manpower deployment proposal."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={openEmployerDrawer}
              className="px-6 py-3.5 rounded-xl bg-brand-olive text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-olive-light transition-all flex items-center justify-center gap-2 shadow-md hover:scale-102"
            >
              <span>{isHy ? "Հայտնել Պահանջարկը" : "Request Manpower Quote"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleWhatsAppEmployer}
              className="px-5 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-brand-olive-light" />
              <span>WhatsApp Desk</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
