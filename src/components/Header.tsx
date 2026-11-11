"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { MessageSquare, Menu, X, PhoneCall, ArrowRight, ShieldCheck } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const { openTravelDrawer } = useDrawer();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHy = locale === "hy";

  const navLinks = [
    { href: "/", label_en: "Overview", label_hy: "Գլխավոր" },
    { href: "/travel", label_en: "Travel & Tours", label_hy: "Զբոսաշրջություն" },
    { href: "/manpower", label_en: "Manpower & Careers", label_hy: "Աշխատուժ և Կարիերա" },
    { href: "/contact", label_en: "Contact Desk", label_hy: "Կապ" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/travel") return pathname === "/travel";
    if (href === "/manpower") return pathname === "/manpower";
    if (href === "/contact") return pathname === "/contact";
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between gap-4">
        {/* Authentic Brand Logo */}
        <div className="shrink-0 flex items-center">
          <Logo />
        </div>

        {/* Desktop Navigation Links — Editorial Typographic Hierarchy */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 lg:gap-10 text-[13.5px] font-medium text-stone-600"
        >
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-2 transition-colors duration-200 tracking-wide ${
                  active
                    ? "text-brand-forest font-bold"
                    : "hover:text-brand-forest text-stone-600"
                }`}
              >
                <span>{isHy ? item.label_hy : item.label_en}</span>
                {active && (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] rounded-full bg-brand-forest" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden sm:flex items-center gap-3 lg:gap-4 shrink-0">
          {/* Calm Institutional Location Tag */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100/70 border border-stone-200/60 text-xs text-stone-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
            <span>{isHy ? "Երևան, Հայաստան" : "Yerevan, Armenia"}</span>
          </div>

          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => openTravelDrawer()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-forest text-white text-xs font-semibold tracking-wide hover:bg-brand-forest-deep active:scale-95 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer group"
          >
            <MessageSquare className="w-3.5 h-3.5 text-brand-olive-light transition-transform duration-200 group-hover:scale-110" />
            <span>{isHy ? "Հարցում գրասենյակին" : "Direct Inquiry"}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher className="sm:hidden" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="p-2 rounded-xl text-brand-forest hover:bg-stone-100 active:scale-95 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-stone-800">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-xl transition-all ${
                    active
                      ? "bg-brand-stone-100 text-brand-forest font-bold border-l-4 border-brand-forest"
                      : "hover:bg-stone-50 hover:text-brand-forest text-stone-700"
                  }`}
                >
                  {isHy ? item.label_hy : item.label_en}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 flex flex-col gap-3 border-t border-stone-100">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openTravelDrawer();
              }}
              className="w-full py-3 rounded-xl bg-brand-forest text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-transform cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-brand-olive-light" />
              <span>{isHy ? "Հարցում գրասենյակին" : "Direct Desk Inquiry"}</span>
            </button>

            <a
              href={`https://wa.me/${deorganicaConfig.company.whatsappNumberDigits}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-700 text-xs font-medium flex items-center justify-center gap-2 hover:bg-stone-100 active:scale-98 transition-transform"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>{deorganicaConfig.company.phoneYerevanDesk} (Yerevan Desk)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
