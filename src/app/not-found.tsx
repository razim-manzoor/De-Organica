"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft, Compass, Briefcase, PhoneCall } from "lucide-react";

export default function NotFound() {
  const { locale } = useLanguage();
  const isHy = locale === "hy";

  return (
    <div className="flex flex-col min-h-screen bg-brand-stone-50">
      <Header />
      <main
        id="main-content"
        className="flex-grow flex items-center justify-center px-6 py-24 sm:py-32"
      >
        <div className="max-w-2xl w-full text-center space-y-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-olive-text font-semibold">
            404 · {isHy ? "Էջը չի գտնվել" : "Page Not Found"}
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest tracking-tight leading-tight">
            {isHy
              ? "Հարցված էջը կամ ուղղությունը հասանելի չէ"
              : "The requested page or itinerary could not be located"}
          </h1>

          <p className="text-base sm:text-lg text-brand-ink-muted max-w-xl mx-auto leading-relaxed">
            {isHy
              ? "Հնարավոր է հղումը փոխվել է կամ արխիվացվել է։ Օգտվեք ստորև ներկայացված ուղիղ հղումներից՝ De Organica LLC ծառայություններին անցնելու համար։"
              : "The link may have moved or been archived. Use the direct routes below to reach our Yerevan travel desk or manpower portal."}
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-forest text-white text-sm font-semibold hover:bg-brand-forest-deep transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>{isHy ? "Գլխավոր էջ" : "Return Home"}</span>
            </Link>

            <Link
              href="/travel"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-brand-stone-300 bg-white text-brand-forest text-sm font-semibold hover:border-brand-olive-dark transition-colors shadow-sm"
            >
              <Compass className="w-4 h-4 text-brand-olive-text" aria-hidden="true" />
              <span>{isHy ? "Տուրիզմ և Ուղևորություններ" : "Travel & Tours"}</span>
            </Link>

            <Link
              href="/manpower"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-brand-stone-300 bg-white text-brand-forest text-sm font-semibold hover:border-brand-olive-dark transition-colors shadow-sm"
            >
              <Briefcase className="w-4 h-4 text-brand-olive-text" aria-hidden="true" />
              <span>{isHy ? "Աշխատանքի Տեղավորում" : "Manpower Portal"}</span>
            </Link>

            <Link
              href="/contact"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-brand-stone-300 bg-white text-brand-forest text-sm font-semibold hover:border-brand-olive-dark transition-colors shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-brand-olive-text" aria-hidden="true" />
              <span>{isHy ? "Կապ" : "Contact Desk"}</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
