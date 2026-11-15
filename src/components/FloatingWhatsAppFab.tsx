"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/SiteDataContext";
import { useDrawer } from "@/context/DrawerContext";
import { buildWhatsAppUrl, buildTravelWhatsAppMessage } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsAppFab() {
  const { locale } = useLanguage();
  const { siteSettings } = useSiteData();
  const { state: drawerState } = useDrawer();
  const [isVisible, setIsVisible] = useState(false);
  const isHy = locale === "hy";

  // Show FAB smoothly after small scroll or brief mount delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Hide FAB when the slide-over drawer is open so it doesn't obstruct form controls
  if (drawerState.isOpen) {
    return null;
  }

  const handleFabClick = () => {
    const msg = buildTravelWhatsAppMessage({
      name: "Traveler / Partner",
      serviceOrTour: "Direct Yerevan Desk Inquiry",
      notes: isHy
        ? "Բարև Ձեզ, գրում եմ deorganica.am կայքից: Ցանկանում եմ ստանալ խորհրդատվություն:"
        : "Hello De Organica team, I am reaching out from your website and would like direct consultation.",
    });
    window.open(
      buildWhatsAppUrl(msg, siteSettings.company.whatsappNumberDigits),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <aside
      aria-label={isHy ? "Արագ կապ WhatsApp-ով" : "Quick contact via WhatsApp"}
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 transition-all duration-300 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={handleFabClick}
        aria-label={
          isHy
            ? "Կապ հաստատել Երևանի դեսկի հետ WhatsApp-ով (+374 93 723321)"
            : "Chat with Yerevan Desk on WhatsApp (+374 93 723321)"
        }
        className="group relative flex items-center gap-2.5 p-3.5 sm:px-4 sm:py-3 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-2xl hover:bg-[#20bd5a] transition-all active:scale-95 duration-200 cursor-pointer border border-white/25"
      >
        {/* Pulsing Live Operational Indicator */}
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>

        {/* WhatsApp Icon */}
        <MessageCircle className="w-5 h-5 text-white shrink-0 drop-shadow-xs" />

        {/* Desktop Text Label (Expands on subtle hover or static on large screens) */}
        <span className="hidden sm:inline font-sans text-xs font-bold tracking-wide text-white drop-shadow-xs">
          {isHy ? "WhatsApp Դեսկ" : "Chat on WhatsApp"}
        </span>
      </button>
    </aside>
  );
}
