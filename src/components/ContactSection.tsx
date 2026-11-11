"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  MessageCircle,
  ShieldCheck,
  Send,
  Building,
} from "lucide-react";

export function ContactSection() {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const isHy = locale === "hy";

  return (
    <section id="contact" className="py-20 lg:py-28 bg-brand-stone-100/80 border-t border-brand-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Corporate Information & Live Desk */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
                {isHy ? "Ինչպե՞ս կապվել «Դե Օրգանիկա»-ի հետ" : "Direct Access to our Yerevan Executive Desk"}
              </h2>
              <p className="text-sm text-brand-ink-muted leading-relaxed">
                {isHy
                  ? "Մեր մասնագետները պատրաստ են պատասխանել տուրիստական երթուղիների, վիզաների և միջազգային աշխատուժի վերաբերյալ Ձեր բոլոր հարցերին:"
                  : "Whether planning an Armenian expedition, arranging B2B DMC group ground handling, or initiating a cross-border manpower requisition, our Yerevan desk responds promptly."}
              </p>
            </div>

            {/* Live Desk Status Card */}
            <div className="p-6 rounded-2xl bg-white border border-brand-stone-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-brand-stone-100">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-brand-forest uppercase tracking-wider">
                    {isHy ? "Գրասենյակը բաց է" : "Yerevan Desk Active"}
                  </span>
                </div>
                <span className="text-xs text-brand-ink-muted font-medium">
                  AMT (GMT+4)
                </span>
              </div>

              <div className="space-y-3.5 text-xs text-brand-ink">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-brand-olive flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-forest block">
                      {deorganicaConfig.company.legalName}
                    </span>
                    <span className="text-brand-ink-muted">
                      {isHy ? deorganicaConfig.company.address_hy : deorganicaConfig.company.address_en}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-brand-olive flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-forest block">
                      {isHy ? "Պաշտոնական էլ. փոստ" : "Primary Email Desk"}
                    </span>
                    <a
                      href={`mailto:${deorganicaConfig.company.email}`}
                      className="text-brand-forest hover:text-brand-olive transition-colors underline underline-offset-2"
                    >
                      {deorganicaConfig.company.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-olive flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-forest block">
                      {isHy ? "Աշխատանքային ժամեր" : "Desk Operating Hours"}
                    </span>
                    <span className="text-brand-ink-muted">
                      {isHy ? deorganicaConfig.company.workingHours_hy : deorganicaConfig.company.workingHours_en}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-4 h-4 text-brand-olive flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-brand-forest block">
                      {isHy ? "Իրավաբանական կարգավիճակ" : "Registration Status"}
                    </span>
                    <span className="text-brand-ink-muted">
                      {isHy ? deorganicaConfig.company.registrationStatus_hy : deorganicaConfig.company.registrationStatus_en}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Channels Card */}
          <div className="rounded-2xl bg-white border border-brand-stone-200 p-8 sm:p-10 shadow-sm space-y-6">
            <h3 className="font-serif text-2xl font-bold text-brand-forest">
              {isHy ? "Ընտրեք Ձեզ հարմար կապի միջոցը" : "Start a Conversation with our Desk"}
            </h3>

            <p className="text-xs sm:text-sm text-brand-ink-muted leading-relaxed">
              {isHy
                ? "Սեղմեք ստորև նշված տարբերակներից մեկը՝ անմիջապես կապվելու մեր թիմի հետ WhatsApp-ով կամ ուղարկելու հարցում:"
                : "Select an option below to initiate an immediate WhatsApp chat with our Yerevan coordinator or launch the detailed inquiry form."}
            </p>

            <div className="space-y-3 pt-2">
              {/* WhatsApp Primary Button */}
              <a
                href={`https://wa.me/${deorganicaConfig.company.whatsappNumberDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-emerald-700 text-white font-medium hover:bg-emerald-800 transition-all flex items-center justify-between shadow-xs hover:shadow-md group"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-emerald-300" />
                  <div className="text-left">
                    <span className="text-xs uppercase tracking-wider block text-emerald-200 font-semibold">
                      Instant WhatsApp
                    </span>
                    <span className="text-sm font-bold">Chat with Yerevan Coordinator</span>
                  </div>
                </div>
                <Send className="w-4 h-4 text-emerald-300 transition-transform group-hover:translate-x-1" />
              </a>

              {/* Drawer Inquiry Trigger Button */}
              <button
                type="button"
                onClick={() => openTravelDrawer()}
                className="w-full py-4 px-6 rounded-xl bg-brand-forest text-white font-medium hover:bg-brand-forest-deep transition-all flex items-center justify-between shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-brand-olive-light" />
                  <div className="text-left">
                    <span className="text-xs uppercase tracking-wider block text-brand-olive-light font-semibold">
                      Full Web Form
                    </span>
                    <span className="text-sm font-bold">Open Detailed Inquiry Drawer</span>
                  </div>
                </div>
                <Send className="w-4 h-4 text-brand-olive-light transition-transform group-hover:translate-x-1" />
              </button>

              {/* Direct Email Link */}
              <a
                href={`mailto:${deorganicaConfig.company.email}`}
                className="w-full py-3.5 px-6 rounded-xl border border-brand-stone-300 bg-brand-stone-50 text-brand-forest hover:bg-white transition-all flex items-center justify-center gap-2 text-xs font-semibold"
              >
                <Mail className="w-4 h-4 text-brand-olive" />
                <span>Email: {deorganicaConfig.company.email}</span>
              </a>
            </div>

            <div className="p-4 rounded-xl bg-brand-stone-100 text-[11px] text-brand-ink-muted leading-relaxed">
              <span className="font-semibold text-brand-forest block mb-1">
                {isHy ? "Գաղտնիության և պաշտպանության երաշխիք" : "Privacy & Confidentiality Guarantee"}
              </span>
              {isHy
                ? "Ձեր անձնական տվյալները և կցված ռեզյումեն պաշտպանված են և երբեք չեն փոխանցվում երրորդ կողմերին առանց Ձեր համաձայնության:"
                : "All submitted candidate resumes, corporate recruitment requests, and travel traveler credentials are held in strict commercial confidence under applicable Republic of Armenia data standards."}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
