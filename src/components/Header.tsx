"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { useSiteData } from "@/context/SiteDataContext";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";

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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-brand-stone-200/90 shadow-sm transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Crest */}
          <Link
            href="/"
            className="shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-forest"
          >
            <Logo variant="horizontal" />
            <span className="sr-only">{isHy ? " — Գլխավոր էջ" : " — Home"}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label={isHy ? "Հիմնական նավիգացիա" : "Primary navigation"}
            className="hidden md:flex items-center gap-1 lg:gap-2"
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
                  className={`min-h-[40px] px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold transition-colors duration-200 flex items-center ${
                    isActive
                      ? "bg-brand-olive-subtle text-brand-forest"
                      : "text-brand-ink-muted hover:text-brand-forest hover:bg-brand-stone-100"
                  }`}
                >
                  {isHy ? item.label_hy : item.label_en}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={handleContextInquiry}
              className="min-h-[42px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-forest text-white text-xs font-semibold tracking-wide hover:bg-brand-forest-deep transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-olive-onDark shrink-0" />
              <span>
                {isManpowerRoute
                  ? isHy
                    ? "Ուղարկել Ռեզյումե"
                    : "Submit Candidate CV"
                  : isHy
                  ? "Ուղիղ Հարցում"
                  : "Direct Inquiry"}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-85" />
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? (isHy ? "Փակել մենյուն" : "Close navigation menu") : (isHy ? "Բացել մենյուն" : "Open navigation menu")}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-brand-stone-200 bg-white text-brand-forest hover:bg-brand-stone-100 transition-colors duration-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-t border-brand-stone-200 bg-brand-stone-50 shadow-xl"
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

            <div className="pt-2">
              <button
                type="button"
                onClick={handleContextInquiry}
                className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-brand-forest text-white text-sm font-semibold hover:bg-brand-forest-deep transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-brand-olive-onDark" />
                <span>
                  {isManpowerRoute
                    ? isHy
                      ? "Ուղարկել Ռեզյումե (CV)"
                      : "Submit Candidate CV / Resume"
                    : isHy
                    ? "Ուղիղ Հարցում Երևանի Դեսկին"
                    : "Direct Inquiry · Yerevan Desk"}
                </span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
