"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useLanguage } from "@/context/LanguageContext";
import {
  CF_ANALYTICS_TOKEN,
  CONSENT_STORAGE_KEY,
  GA_MEASUREMENT_ID,
  getWindowGtag,
} from "@/lib/analytics";
import { ShieldCheck } from "lucide-react";

type ConsentState = "pending" | "granted" | "denied";

export function AnalyticsProvider() {
  const { locale } = useLanguage();
  const isHy = locale === "hy";
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    try {
      const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (saved === "granted" || saved === "denied") {
        setConsent(saved);
        if (saved === "granted") {
          getWindowGtag()?.("consent", "update", { analytics_storage: "granted" });
        }
      } else {
        setConsent("pending");
      }
    } catch {
      setConsent("pending");
    }
  }, []);

  const handleConsentChoice = (choice: "granted" | "denied") => {
    setConsent(choice);
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // Ignore storage errors in restricted browsing contexts
    }
    getWindowGtag()?.("consent", "update", {
      analytics_storage: choice,
    });
  };

  if (!GA_MEASUREMENT_ID && !CF_ANALYTICS_TOKEN) {
    return null;
  }

  return (
    <>
      {CF_ANALYTICS_TOKEN && (
        <Script
          id="cloudflare-web-analytics"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          strategy="afterInteractive"
          data-cf-beacon={JSON.stringify({ token: CF_ANALYTICS_TOKEN })}
        />
      )}

      {GA_MEASUREMENT_ID && (
        <>
          <Script id="ga4-consent-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
            `}
          </Script>
          <Script
            id="ga4-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
            onLoad={() => {
              if (consent === "granted") {
                getWindowGtag()?.("consent", "update", { analytics_storage: "granted" });
              }
            }}
          />

          {consent === "pending" && (
            <aside
              aria-label={isHy ? "Վերլուծական թխուկների համաձայնություն" : "Analytics Cookie Notice"}
              className="print:hidden fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 max-w-sm rounded-2xl bg-brand-forest text-white p-4 shadow-2xl border border-white/15"
            >
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C5E096] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-2.5 text-xs leading-relaxed">
                  <p className="text-brand-stone-100">
                    {isHy
                      ? "Մենք օգտագործում ենք անանուն վերլուծություն՝ կայքի աշխատանքը բարելավելու համար (առանց գովազդային թիրախավորման):"
                      : "We use privacy-conscious analytics (no ad tracking) to measure traffic and improve our Travel & Manpower portals."}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleConsentChoice("granted")}
                      className="px-3.5 py-2 min-h-[36px] rounded-lg bg-[#668B2E] text-white font-semibold hover:bg-[#577726] transition-colors cursor-pointer"
                    >
                      {isHy ? "Թույլատրել" : "Accept Analytics"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleConsentChoice("denied")}
                      className="px-3 py-2 min-h-[36px] rounded-lg bg-white/10 text-brand-stone-100 font-medium hover:bg-white/20 transition-colors cursor-pointer"
                    >
                      {isHy ? "Մերժել" : "Essential Only"}
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </>
      )}
    </>
  );
}
