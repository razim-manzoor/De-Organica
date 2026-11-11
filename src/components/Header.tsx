"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { MessageSquare, Menu, X, PhoneCall } from "lucide-react";

export function Header() {
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHy = locale === "hy";

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-stone-50/90 backdrop-blur-md border-b border-brand-stone-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-brand-ink-muted"
        >
          {deorganicaConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-brand-forest transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-brand-olive hover:after:w-full after:transition-all"
            >
              {isHy ? item.label_hy : item.label_en}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center gap-3.5">
          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => openTravelDrawer()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-forest text-white text-xs font-semibold tracking-wide hover:bg-brand-forest-deep transition-all shadow-xs hover:shadow-md active:scale-98"
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
            className="p-2 rounded-lg text-brand-forest hover:bg-brand-stone-200 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-brand-stone-50 border-b border-brand-stone-200 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-brand-ink">
            {deorganicaConfig.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 border-b border-brand-stone-200/60 hover:text-brand-forest transition-colors"
              >
                {isHy ? item.label_hy : item.label_en}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openTravelDrawer();
              }}
              className="w-full py-3 rounded-xl bg-brand-forest text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-brand-olive-light" />
              <span>{isHy ? "Կապվել գրասենյակի հետ" : "Direct Desk Inquiry"}</span>
            </button>

            <a
              href={`https://wa.me/${deorganicaConfig.company.whatsappNumberDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl border border-brand-stone-300 bg-white text-brand-ink-muted text-xs font-medium flex items-center justify-center gap-2"
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
