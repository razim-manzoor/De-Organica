"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { MessageSquare, Menu, X, PhoneCall, Sparkles } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHy = locale === "hy";

  const navLinks = [
    { href: "/", label_en: "Overview", label_hy: "Գլխավոր" },
    { href: "/travel", label_en: "Travel & Tours", label_hy: "Զբոսաշրջություն" },
    { href: "/travel#dmc", label_en: "B2B DMC", label_hy: "B2B DMC" },
    { href: "/manpower", label_en: "Manpower & Careers", label_hy: "Աշխատուժ և Կարիերա" },
    { href: "/manpower#employers", label_en: "For Employers", label_hy: "Գործատուներին" },
    { href: "/contact", label_en: "Contact Desk", label_hy: "Կապ" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/travel")) return pathname.startsWith("/travel");
    if (href.startsWith("/manpower")) return pathname.startsWith("/manpower");
    if (href.startsWith("/contact")) return pathname.startsWith("/contact");
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-stone-50/95 backdrop-blur-md border-b border-brand-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with Tactile Micro-Hover */}
        <Logo />

        {/* Desktop Navigation Links with Distinctive Pill Highlight */}
        <nav
          aria-label="Main Navigation"
          className="hidden xl:flex items-center gap-1.5 p-1.5 rounded-full bg-brand-stone-100/80 border border-brand-stone-200/80 text-[13px] font-medium text-brand-ink-muted shadow-2xs"
        >
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-200 text-center ${
                  active
                    ? "bg-white text-brand-forest font-semibold shadow-xs"
                    : "hover:text-brand-forest hover:bg-white/60 active:scale-95"
                }`}
              >
                {isHy ? item.label_hy : item.label_en}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center gap-3.5">
          {/* Live Yerevan Desk Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-brand-stone-200 text-[11px] text-brand-ink-muted">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-olive opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-olive"></span>
            </span>
            <span className="font-medium text-brand-forest">EVN Desk Live</span>
          </div>

          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => openTravelDrawer()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-forest text-white text-xs font-semibold tracking-wide hover:bg-brand-forest-deep transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-brand-olive-light" />
            <span>{isHy ? "Կապվել գրասենյակի հետ" : "Direct Desk Inquiry"}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex xl:hidden items-center gap-2.5">
          <LanguageSwitcher className="sm:hidden" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-2 rounded-xl text-brand-forest hover:bg-brand-stone-200 active:scale-95 transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-brand-stone-50 border-b border-brand-stone-200 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-brand-ink">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    active ? "bg-white text-brand-forest font-bold shadow-2xs border-l-3 border-brand-olive" : "hover:text-brand-forest hover:bg-brand-stone-100"
                  }`}
                >
                  {isHy ? item.label_hy : item.label_en}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openTravelDrawer();
              }}
              className="w-full py-3 rounded-xl bg-brand-forest text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-transform"
            >
              <MessageSquare className="w-4 h-4 text-brand-olive-light" />
              <span>{isHy ? "Կապվել գրասենյակի հետ" : "Direct Desk Inquiry"}</span>
            </button>

            <a
              href={`https://wa.me/${deorganicaConfig.company.whatsappNumberDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl border border-brand-stone-300 bg-white text-brand-ink-muted text-xs font-medium flex items-center justify-center gap-2 hover:bg-brand-stone-50 active:scale-98 transition-transform"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>{deorganicaConfig.company.phoneYerevanDesk} (Yerevan HQ)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
