"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { ShieldCheck, Scale, Award, ArrowRight, CheckCircle2, Lock, FileCheck2 } from "lucide-react";

export function ManpowerComplianceBanner() {
  const { locale } = useLanguage();
  const { openCandidateDrawer, openEmployerDrawer } = useDrawer();
  const isHy = locale === "hy";

  const trustMetrics = [
    {
      figure: "0.00 AMD",
      label_en: "Upfront Candidate Fee",
      label_hy: "0 Դրամ Կանխավճար",
      detail_en: "Zero fees for CV submission, testing, or employer interviews.",
      detail_hy: "Ռեզյումեի ընդունումը և հարցազրույցներն անվճար են:",
    },
    {
      figure: "100% Legal",
      label_en: "RA Ministry Compliance",
      label_hy: "ՀՀ Պետական Գրանցում",
      detail_en: "Official electronic work permits & unified migration residence cards.",
      detail_hy: "Պաշտոնական աշխատանքային թույլտվություն և կացության քարտ:",
    },
    {
      figure: "30-Day SLA",
      label_en: "Replacement Warranty",
      label_hy: "Փոխարինման Երաշխիք",
      detail_en: "Guaranteed talent replacement warranty for corporate enterprises.",
      detail_hy: "Կորպորատիվ գործատուների համար երաշխիքային սպասարկում:",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-brand-forest text-white relative overflow-hidden border-y border-brand-forest-deep">
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-architectural-grid" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive-light mb-3">
              <ShieldCheck className="w-4 h-4 text-brand-olive-light shrink-0" />
              <span>
                {isHy
                  ? "Պաշտոնական Իրավական Չափորոշիչներ · Երևան Դեսկ"
                  : "State Regulatory Integrity · Yerevan HR Desk"}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight">
              {isHy
                ? "Էթիկական Աշխատուժ: ՀՀ Օրենսդրության Լիարժեք Համապատասխանություն:"
                : "Ethical Human Capital. Absolute Ministry of Labor Integrity."}
            </h2>

            <p className="text-brand-stone-300 text-xs sm:text-sm leading-relaxed max-w-2xl mb-6">
              {isHy
                ? "«Դե Օրգանիկա»-ն գործում է ՀՀ օրենսդրության շրջանակներում: Մենք բացառում ենք թեկնածուներից որևէ նախնական վճարների գանձումը՝ ապահովելով պետական գրանցում, թափանցիկ աշխատավարձեր և կայուն համագործակցություն:"
                : "De Organica LLC operates as a certified commercial entity in Yerevan. We eradicate exploitative recruitment practices: candidates pay zero upfront fees, while employers receive vetted, legally compliant talent under binding bilateral labor contracts."}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openCandidateDrawer()}
                className="px-5 py-3 rounded-xl bg-brand-olive text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-olive-light transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
              >
                <span>{isHy ? "Գրանցվել որպես Թեկնածու" : "Register as Candidate"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => openEmployerDrawer()}
                className="px-5 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all shadow-2xs active:scale-95 cursor-pointer"
              >
                <span>{isHy ? "Կորպորատիվ Հայտ (Գործատու)" : "Corporate Employer Desk"}</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3 Architectural Telemetry Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
            {trustMetrics.map((m, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:bg-white/10 transition-colors"
              >
                <div className="flex items-baseline justify-between mb-1">
                  <span className="font-mono text-xl sm:text-2xl font-bold text-brand-olive-light">
                    {m.figure}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-stone-300">
                    {isHy ? m.label_hy : m.label_en}
                  </span>
                </div>
                <p className="text-xs text-brand-stone-300 leading-snug">
                  {isHy ? m.detail_hy : m.detail_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
