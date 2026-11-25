"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { useSiteData } from "@/context/SiteDataContext";
import { Menu, X, ArrowUpRight, Phone, MessageCircle } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const { openTravelDrawer, openCandidateDrawer } = useDrawer();
  const { siteSettings } = useSiteData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHy = locale === "hy";
  const isManpowerRoute = pathname?.startsWith("/manpower") ?? false;

  const navItems = siteSettings.nav;

  const handleContextInquiry = () => {
    setMobileMenuOpen(false);
    if (isManpowerRoute) {
      openCandidateDrawer();
    } else {
      openTravelDrawer();
    }
  };

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-brand-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px] gap-3">
          {/* Brand Crest + Crisp Web Wordmark */}
          <Link
            href="/"
            className="group shrink-0 inline-flex items-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-forest"
          >
            <Logo variant="horizontal" priority />
            <span className="sr-only">{isHy ? " — Գլխավոր էջ" : " — Home"}</span>
          </Link>

          {/* Desktop Navigation (1024px+ to eliminate tablet overflow) */}
          <nav
            aria-label={isHy ? "Հիմնական նավիգացիա" : "Primary navigation"}
            className="hidden lg:flex items-center gap-0.5 xl:gap-1"
          >
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative whitespace-nowrap min-h-[38px] px-2.5 xl:px-3.5 py-2 text-[13px] xl:text-sm tracking-[0.01em] transition-colors duration-150 flex items-center rounded-lg ${
                    isActive
                      ? "text-brand-forest font-bold bg-brand-stone-100"
                      : "text-brand-ink-muted hover:text-brand-forest hover:bg-brand-stone-100/60 font-medium"
                  }`}
                >
                  <span>{isHy ? item.label_hy : item.label_en}</span>
                  {isActive && (
                    <span className="absolute bottom-1 left-2.5 right-2.5 h-[2px] bg-brand-olive rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-2.5 shrink-0">
            {/* Direct Telephone Touchpoint (compact icon at lg, full number at xl+) */}
            <a
              href={`tel:${siteSettings.company.phoneYerevanDesk.replace(/\s+/g, "")}`}
              aria-label={
                isHy
                  ? `Զանգահարել Երևանի դեսկ (${siteSettings.company.phoneYerevanDesk})`
                  : `Call Yerevan Desk (${siteSettings.company.phoneYerevanDesk})`
              }
              className="whitespace-nowrap min-h-[38px] min-w-[38px] px-2.5 xl:px-3 py-1.5 rounded-xl border border-brand-stone-200 bg-white hover:bg-brand-stone-50 hover:border-brand-stone-300 text-xs xl:text-[13px] text-brand-forest transition-colors duration-150 flex items-center justify-center gap-2 group"
              title={
                isHy
                  ? `Զանգահարել Երևանի դեսկ · ${siteSettings.company.phoneYerevanDesk}`
                  : `Call Yerevan Desk · ${siteSettings.company.phoneYerevanDesk}`
              }
            >
              <Phone className="w-3.5 h-3.5 text-brand-olive-text shrink-0" />
              <span className="font-sans font-medium tabular-nums hidden xl:inline">
                {siteSettings.company.phoneYerevanDesk}
              </span>
            </a>

            <LanguageSwitcher />

            <button
              type="button"
              onClick={handleContextInquiry}
              className="whitespace-nowrap min-h-[38px] inline-flex items-center gap-1.5 px-3 xl:px-4 py-2 rounded-xl bg-brand-forest border border-brand-forest text-white text-xs xl:text-sm font-semibold tracking-wide hover:bg-brand-forest-deep transition-colors duration-150 shadow-sm cursor-pointer"
            >
              <span>
                {isManpowerRoute
                  ? isHy
                    ? "Ուղարկել CV"
                    : "Submit CV"
                  : isHy
                  ? "Ուղիղ Հարցում"
                  : "Direct Inquiry"}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold-onDark opacity-95 shrink-0" />
            </button>
          </div>

          {/* Mobile & Tablet Controls (< 1024px) */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? (isHy ? "Փակել մենյուն" : "Close navigation menu") : (isHy ? "Բացել մենյուն" : "Open navigation menu")}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-brand-stone-200 bg-white text-brand-forest hover:bg-brand-stone-100 transition-colors duration-150 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Navigation Drawer (< 1024px) */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden border-t border-brand-stone-200 bg-brand-stone-50 shadow-xl"
        >
          <nav
            aria-label={isHy ? "Բջջային նավիգացիա" : "Mobile navigation"}
            className="max-w-7xl mx-auto px-4 py-4 space-y-1.5"
          >
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`min-h-[44px] px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors duration-200 ${
                    isActive
                      ? "bg-brand-forest text-white"
                      : "bg-white text-brand-forest border border-brand-stone-200 hover:bg-brand-stone-100"
                  }`}
                >
                  <span>{isHy ? item.label_hy : item.label_en}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </Link>
              );
            })}

            {/* Mobile Direct 1-Tap No-Form Action Strip */}
            <div className="grid grid-cols-2 gap-2 pt-2 pb-1">
              <a
                href={`tel:${siteSettings.company.phoneYerevanDesk.replace(/\s+/g, "")}`}
                className="min-h-[44px] px-3 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-brand-forest hover:bg-brand-stone-100 text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Phone className="w-4 h-4 text-brand-olive-text shrink-0" />
                <span>{isHy ? "Զանգահարել" : "Call Desk"}</span>
              </a>

              <a
                href={`https://wa.me/${siteSettings.company.whatsappNumberDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] px-3 py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={handleContextInquiry}
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-brand-forest text-white text-sm font-semibold hover:bg-brand-forest-deep transition-all active:scale-98 duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>
                  {isManpowerRoute
                    ? isHy
                      ? "Ուղարկել Ռեզյումե (CV)"
                      : "Submit Candidate CV / Resume"
                    : isHy
                    ? "Ուղիղ Հարցում"
                    : "Contact Concierge"}
                </span>
                <ArrowUpRight className="w-4 h-4 text-brand-olive-onDark opacity-90" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
