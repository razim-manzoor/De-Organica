"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Search, Check, Globe } from "lucide-react";

export interface CountryInfo {
  code: string; // ISO 2-letter
  name_en: string;
  name_hy: string;
  dialCode: string;
  flagSvg: React.ReactNode;
}

// Crisp, vector SVG flags guaranteed to render on Windows, macOS, Linux, iOS & Android
export const COUNTRIES: CountryInfo[] = [
  {
    code: "AM",
    name_en: "Armenia",
    name_hy: "Հայաստան",
    dialCode: "+374",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="6.66" fill="#D90012" />
        <rect y="6.66" width="30" height="6.66" fill="#0033A0" />
        <rect y="13.33" width="30" height="6.66" fill="#F2A800" />
      </svg>
    ),
  },
  {
    code: "IN",
    name_en: "India",
    name_hy: "Հնդկաստան",
    dialCode: "+91",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="6.66" fill="#FF9933" />
        <rect y="6.66" width="30" height="6.66" fill="#FFFFFF" />
        <rect y="13.33" width="30" height="6.66" fill="#128807" />
        <circle cx="15" cy="10" r="2.2" fill="none" stroke="#000080" strokeWidth="0.6" />
      </svg>
    ),
  },
  {
    code: "AE",
    name_en: "United Arab Emirates",
    name_hy: "ԱՄԷ (Դուբայ)",
    dialCode: "+971",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="6.66" fill="#00732F" />
        <rect y="6.66" width="30" height="6.66" fill="#FFFFFF" />
        <rect y="13.33" width="30" height="6.66" fill="#000000" />
        <rect width="7.5" height="20" fill="#FF0000" />
      </svg>
    ),
  },
  {
    code: "PH",
    name_en: "Philippines",
    name_hy: "Ֆիլիպիններ",
    dialCode: "+63",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="10" fill="#0038A8" />
        <rect y="10" width="30" height="10" fill="#CE1126" />
        <polygon points="0,0 12,10 0,20" fill="#FFFFFF" />
        <circle cx="4" cy="10" r="1.8" fill="#FCD116" />
      </svg>
    ),
  },
  {
    code: "GE",
    name_en: "Georgia",
    name_hy: "Վրաստան",
    dialCode: "+995",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="20" fill="#FFFFFF" />
        <rect x="12.5" width="5" height="20" fill="#FF0000" />
        <rect y="7.5" width="30" height="5" fill="#FF0000" />
        <circle cx="6.5" cy="4" r="1.2" fill="#FF0000" />
        <circle cx="23.5" cy="4" r="1.2" fill="#FF0000" />
        <circle cx="6.5" cy="16" r="1.2" fill="#FF0000" />
        <circle cx="23.5" cy="16" r="1.2" fill="#FF0000" />
      </svg>
    ),
  },
  {
    code: "RU",
    name_en: "Russia",
    name_hy: "Ռուսաստան",
    dialCode: "+7",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="6.66" fill="#FFFFFF" />
        <rect y="6.66" width="30" height="6.66" fill="#0039A6" />
        <rect y="13.33" width="30" height="6.66" fill="#D52B1E" />
      </svg>
    ),
  },
  {
    code: "US",
    name_en: "United States",
    name_hy: "ԱՄՆ",
    dialCode: "+1",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="20" fill="#B22234" />
        <line x1="0" y1="3" x2="30" y2="3" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="0" y1="6" x2="30" y2="6" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="0" y1="9" x2="30" y2="9" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="0" y1="12" x2="30" y2="12" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="0" y1="15" x2="30" y2="15" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="0" y1="18" x2="30" y2="18" stroke="#FFFFFF" strokeWidth="1.5" />
        <rect width="12" height="11" fill="#3C3B6E" />
      </svg>
    ),
  },
  {
    code: "GB",
    name_en: "United Kingdom",
    name_hy: "Մեծ Բրիտանիա",
    dialCode: "+44",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="20" fill="#012169" />
        <path d="M 0 0 L 30 20 M 30 0 L 0 20" stroke="#FFFFFF" strokeWidth="3" />
        <path d="M 0 0 L 30 20 M 30 0 L 0 20" stroke="#C8102E" strokeWidth="1.5" />
        <rect x="12" width="6" height="20" fill="#FFFFFF" />
        <rect y="7" width="30" height="6" fill="#FFFFFF" />
        <rect x="13" width="4" height="20" fill="#C8102E" />
        <rect y="8" width="30" height="4" fill="#C8102E" />
      </svg>
    ),
  },
  {
    code: "DE",
    name_en: "Germany",
    name_hy: "Գերմանիա",
    dialCode: "+49",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="6.66" fill="#000000" />
        <rect y="6.66" width="30" height="6.66" fill="#DD0000" />
        <rect y="13.33" width="30" height="6.66" fill="#FFCC00" />
      </svg>
    ),
  },
  {
    code: "FR",
    name_en: "France",
    name_hy: "Ֆրանսիա",
    dialCode: "+33",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="10" height="20" fill="#0055A4" />
        <rect x="10" width="10" height="20" fill="#FFFFFF" />
        <rect x="20" width="10" height="20" fill="#EF4135" />
      </svg>
    ),
  },
  {
    code: "CA",
    name_en: "Canada",
    name_hy: "Կանադա",
    dialCode: "+1",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="8" height="20" fill="#FF0000" />
        <rect x="8" width="14" height="20" fill="#FFFFFF" />
        <rect x="22" width="8" height="20" fill="#FF0000" />
        <circle cx="15" cy="10" r="3" fill="#FF0000" />
      </svg>
    ),
  },
  {
    code: "IR",
    name_en: "Iran",
    name_hy: "Իրան",
    dialCode: "+98",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="6.66" fill="#239F40" />
        <rect y="6.66" width="30" height="6.66" fill="#FFFFFF" />
        <rect y="13.33" width="30" height="6.66" fill="#DA0000" />
        <circle cx="15" cy="10" r="1.5" fill="#DA0000" />
      </svg>
    ),
  },
  {
    code: "LB",
    name_en: "Lebanon",
    name_hy: "Լիբանան",
    dialCode: "+961",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="5" fill="#ED1C24" />
        <rect y="5" width="30" height="10" fill="#FFFFFF" />
        <rect y="15" width="30" height="5" fill="#ED1C24" />
        <polygon points="15,6 18,14 12,14" fill="#00A651" />
      </svg>
    ),
  },
  {
    code: "SA",
    name_en: "Saudi Arabia",
    name_hy: "Սաուդյան Արաբիա",
    dialCode: "+966",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="20" fill="#006C35" />
        <line x1="8" y1="13" x2="22" y2="13" stroke="#FFFFFF" strokeWidth="1" />
        <rect x="10" y="7" width="10" height="3" fill="#FFFFFF" opacity="0.8" />
      </svg>
    ),
  },
  {
    code: "QA",
    name_en: "Qatar",
    name_hy: "Կատար",
    dialCode: "+974",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="9" height="20" fill="#FFFFFF" />
        <rect x="9" width="21" height="20" fill="#8D1B3D" />
      </svg>
    ),
  },
  {
    code: "KW",
    name_en: "Kuwait",
    name_hy: "Քուվեյթ",
    dialCode: "+965",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="6.66" fill="#007A3D" />
        <rect y="6.66" width="30" height="6.66" fill="#FFFFFF" />
        <rect y="13.33" width="30" height="6.66" fill="#CE1126" />
        <polygon points="0,0 8,6.66 8,13.33 0,20" fill="#000000" />
      </svg>
    ),
  },
  {
    code: "OM",
    name_en: "Oman",
    name_hy: "Օման",
    dialCode: "+968",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="6.66" fill="#FFFFFF" />
        <rect y="6.66" width="30" height="6.66" fill="#DB161B" />
        <rect y="13.33" width="30" height="6.66" fill="#008000" />
        <rect width="7.5" height="20" fill="#DB161B" />
      </svg>
    ),
  },
  {
    code: "BH",
    name_en: "Bahrain",
    name_hy: "Բահրեյն",
    dialCode: "+973",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="8" height="20" fill="#FFFFFF" />
        <rect x="8" width="22" height="20" fill="#CE1126" />
      </svg>
    ),
  },
  {
    code: "JO",
    name_en: "Jordan",
    name_hy: "Հորդանան",
    dialCode: "+962",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="6.66" fill="#000000" />
        <rect y="6.66" width="30" height="6.66" fill="#FFFFFF" />
        <rect y="13.33" width="30" height="6.66" fill="#007A3D" />
        <polygon points="0,0 12,10 0,20" fill="#CE1126" />
      </svg>
    ),
  },
  {
    code: "EG",
    name_en: "Egypt",
    name_hy: "Եգիպտոս",
    dialCode: "+20",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="6.66" fill="#CE1126" />
        <rect y="6.66" width="30" height="6.66" fill="#FFFFFF" />
        <rect y="13.33" width="30" height="6.66" fill="#000000" />
        <circle cx="15" cy="10" r="1.5" fill="#C09300" />
      </svg>
    ),
  },
  {
    code: "NP",
    name_en: "Nepal",
    name_hy: "Նեպալ",
    dialCode: "+977",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="20" fill="#F4F3EE" />
        <polygon points="3,2 18,10 8,10 20,18 3,18" fill="#DC143C" stroke="#003893" strokeWidth="0.8" />
      </svg>
    ),
  },
  {
    code: "LK",
    name_en: "Sri Lanka",
    name_hy: "Շրի Լանկա",
    dialCode: "+94",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="20" fill="#FFBE29" />
        <rect x="3" y="2" width="4" height="16" fill="#00534E" />
        <rect x="8" y="2" width="4" height="16" fill="#EB7400" />
        <rect x="13" y="2" width="14" height="16" fill="#8D153A" />
      </svg>
    ),
  },
  {
    code: "BD",
    name_en: "Bangladesh",
    name_hy: "Բանգլադեշ",
    dialCode: "+880",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="20" fill="#006A4E" />
        <circle cx="13.5" cy="10" r="6" fill="#F42A41" />
      </svg>
    ),
  },
  {
    code: "KZ",
    name_en: "Kazakhstan",
    name_hy: "Ղազախստան",
    dialCode: "+7",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="20" fill="#00AFCA" />
        <circle cx="15" cy="10" r="3" fill="#FEC50C" />
      </svg>
    ),
  },
  {
    code: "UZ",
    name_en: "Uzbekistan",
    name_hy: "Ուզբեկստան",
    dialCode: "+998",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="6.66" fill="#0099B5" />
        <rect y="6.66" width="30" height="6.66" fill="#FFFFFF" />
        <rect y="13.33" width="30" height="6.66" fill="#1EB53A" />
      </svg>
    ),
  },
  {
    code: "BY",
    name_en: "Belarus",
    name_hy: "Բելառուս",
    dialCode: "+375",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="13.33" fill="#C8313E" />
        <rect y="13.33" width="30" height="6.66" fill="#439547" />
        <rect width="5" height="20" fill="#C8313E" />
      </svg>
    ),
  },
  {
    code: "UA",
    name_en: "Ukraine",
    name_hy: "Ուկրաինա",
    dialCode: "+380",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="10" fill="#005BBB" />
        <rect y="10" width="30" height="10" fill="#FFD500" />
      </svg>
    ),
  },
  {
    code: "IT",
    name_en: "Italy",
    name_hy: "Իտալիա",
    dialCode: "+39",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="10" height="20" fill="#009246" />
        <rect x="10" width="10" height="20" fill="#FFFFFF" />
        <rect x="20" width="10" height="20" fill="#CE2B37" />
      </svg>
    ),
  },
  {
    code: "ES",
    name_en: "Spain",
    name_hy: "Իսպանիա",
    dialCode: "+34",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="5" fill="#AA151B" />
        <rect y="5" width="30" height="10" fill="#F1BF00" />
        <rect y="15" width="30" height="5" fill="#AA151B" />
      </svg>
    ),
  },
  {
    code: "NL",
    name_en: "Netherlands",
    name_hy: "Նիդեռլանդներ",
    dialCode: "+31",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="6.66" fill="#AE1C28" />
        <rect y="6.66" width="30" height="6.66" fill="#FFFFFF" />
        <rect y="13.33" width="30" height="6.66" fill="#21468B" />
      </svg>
    ),
  },
  {
    code: "GR",
    name_en: "Greece",
    name_hy: "Հունաստան",
    dialCode: "+30",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="20" fill="#0D5EAF" />
        <line x1="0" y1="2.2" x2="30" y2="2.2" stroke="#FFFFFF" strokeWidth="2.2" />
        <line x1="0" y1="6.6" x2="30" y2="6.6" stroke="#FFFFFF" strokeWidth="2.2" />
        <line x1="0" y1="11" x2="30" y2="11" stroke="#FFFFFF" strokeWidth="2.2" />
        <line x1="0" y1="15.4" x2="30" y2="15.4" stroke="#FFFFFF" strokeWidth="2.2" />
        <rect width="10" height="10" fill="#0D5EAF" />
        <rect x="4" width="2" height="10" fill="#FFFFFF" />
        <rect y="4" width="10" height="2" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    code: "CY",
    name_en: "Cyprus",
    name_hy: "Կիպրոս",
    dialCode: "+357",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="20" fill="#FFFFFF" />
        <polygon points="10,6 20,8 18,13 11,11" fill="#D57800" />
        <line x1="10" y1="15" x2="20" y2="15" stroke="#4E7037" strokeWidth="1" />
      </svg>
    ),
  },
  {
    code: "PL",
    name_en: "Poland",
    name_hy: "Լեհաստան",
    dialCode: "+48",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="10" fill="#FFFFFF" />
        <rect y="10" width="30" height="10" fill="#DC143C" />
      </svg>
    ),
  },
  {
    code: "AU",
    name_en: "Australia",
    name_hy: "Ավստրալիա",
    dialCode: "+61",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="20" fill="#00008B" />
        <rect width="12" height="10" fill="#012169" />
        <path d="M 0 0 L 12 10 M 12 0 L 0 10" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M 0 0 L 12 10 M 12 0 L 0 10" stroke="#C8102E" strokeWidth="0.8" />
        <rect x="5" width="2" height="10" fill="#FFFFFF" />
        <rect y="4" width="12" height="2" fill="#FFFFFF" />
        <circle cx="6" cy="15" r="1.5" fill="#FFFFFF" />
        <circle cx="22" cy="5" r="0.8" fill="#FFFFFF" />
        <circle cx="20" cy="10" r="0.8" fill="#FFFFFF" />
        <circle cx="24" cy="11" r="0.8" fill="#FFFFFF" />
        <circle cx="22" cy="15" r="0.8" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    code: "CN",
    name_en: "China",
    name_hy: "Չինաստան",
    dialCode: "+86",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="20" fill="#DE2910" />
        <polygon points="5,3 6,6 3,4 7,4 4,6" fill="#FFDE00" />
      </svg>
    ),
  },
  {
    code: "SG",
    name_en: "Singapore",
    name_hy: "Սինգապուր",
    dialCode: "+65",
    flagSvg: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm shrink-0 shadow-sm">
        <rect width="30" height="10" fill="#ED2939" />
        <rect y="10" width="30" height="10" fill="#FFFFFF" />
        <circle cx="5" cy="5" r="2.5" fill="#FFFFFF" />
        <circle cx="5.8" cy="5" r="2.2" fill="#ED2939" />
      </svg>
    ),
  },
  {
    code: "GLOBAL",
    name_en: "Other / Custom",
    name_hy: "Այլ երկիր (Custom)",
    dialCode: "+",
    flagSvg: (
      <div className="w-5 h-3.5 rounded-sm bg-brand-stone-100 flex items-center justify-center shrink-0 border border-stone-300">
        <Globe className="w-3 h-3 text-stone-600" />
      </div>
    ),
  },
];

interface PhoneCountryInputProps {
  inputId?: string;
  ariaDescribedBy?: string;
  ariaInvalid?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  dialCode: string;
  onDialCodeChange: (code: string) => void;
  phoneNumber: string;
  onPhoneNumberChange: (num: string) => void;
  isHy?: boolean;
  required?: boolean;
  placeholder?: string;
}

export function PhoneCountryInput({
  inputId = "phoneCountryInput",
  ariaDescribedBy,
  ariaInvalid,
  inputRef,
  dialCode,
  onDialCodeChange,
  phoneNumber,
  onPhoneNumberChange,
  isHy = false,
  required = false,
  placeholder = "99 000000",
}: PhoneCountryInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Find currently selected country
  const selectedCountry = useMemo(() => {
    return (
      COUNTRIES.find((c) => c.dialCode === dialCode && c.code !== "GLOBAL") ||
      COUNTRIES[0]
    );
  }, [dialCode]);

  // Filter countries by search query
  const filteredCountries = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name_en.toLowerCase().includes(q) ||
        c.name_hy.toLowerCase().includes(q) ||
        c.dialCode.includes(q) ||
        c.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      const timer = setTimeout(() => searchInputRef.current?.focus(), 40);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelectCountry = (country: CountryInfo) => {
    onDialCodeChange(country.dialCode);
    setIsOpen(false);
    setSearchQuery("");
    triggerRef.current?.focus();
  };

  const handlePickerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <div className="relative" ref={dropdownRef} onKeyDown={handlePickerKeyDown}>
      <div
        className={`flex rounded-xl border bg-white shadow-sm focus-within:ring-2 focus-within:ring-brand-olive focus-within:border-transparent transition-colors duration-200 overflow-hidden ${
          ariaInvalid ? "border-[#B43C30]" : "border-brand-stone-300"
        }`}
      >
        {/* Country Flag & Dial Code Trigger Button */}
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={isHy ? `Երկրի կոդ (${selectedCountry.name_hy}, ${dialCode})` : `Country dial code (${selectedCountry.name_en}, ${dialCode})`}
          className="min-h-[44px] inline-flex items-center gap-2 px-3.5 py-2.5 bg-brand-stone-50 hover:bg-brand-stone-100 border-r border-brand-stone-200 text-xs font-semibold text-brand-ink transition-colors shrink-0 cursor-pointer select-none"
        >
          {selectedCountry.flagSvg}
          <span className="font-mono text-brand-ink">{dialCode}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-brand-ink-subtle transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Phone Number Text Input */}
        <input
          ref={inputRef}
          id={inputId}
          type="tel"
          required={required}
          aria-describedby={ariaDescribedBy}
          aria-invalid={ariaInvalid}
          value={phoneNumber}
          onChange={(e) => onPhoneNumberChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-w-0 min-h-[44px] px-3.5 py-2.5 bg-transparent text-base sm:text-sm text-brand-ink placeholder:text-brand-ink-subtle focus:outline-none"
        />
      </div>

      {/* Searchable Country Picker Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-[min(22rem,calc(100vw-3rem))] max-h-72 bg-white rounded-2xl border border-brand-stone-200 shadow-2xl z-50 flex flex-col overflow-hidden">
          {/* Search Header */}
          <div className="p-2.5 border-b border-brand-stone-100 bg-brand-stone-50 flex items-center gap-2">
            <Search className="w-4 h-4 text-brand-ink-subtle shrink-0 ml-1" />
            <input
              ref={searchInputRef}
              type="text"
              aria-label={isHy ? "Որոնել երկիր կամ կոդ" : "Search country or dial code"}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isHy
                  ? "Որոնել երկիր կամ կոդ (+91, +374)..."
                  : "Search country or code (+91, +374)..."
              }
              className="w-full min-h-[36px] bg-transparent text-base sm:text-xs text-brand-ink placeholder:text-brand-ink-subtle focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-brand-ink-muted hover:text-brand-forest px-2 py-1 rounded bg-brand-stone-200 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Scrollable Country List */}
          <div
            role="listbox"
            aria-label={isHy ? "Երկրների հեռախոսային կոդեր" : "Country dial codes"}
            className="flex-1 overflow-y-auto divide-y divide-brand-stone-100 text-xs"
          >
            {filteredCountries.length === 0 ? (
              <div className="p-4 text-center text-xs text-brand-ink-subtle">
                {isHy ? "Երկիրը չի գտնվել" : "No matching countries found"}
              </div>
            ) : (
              filteredCountries.map((c) => {
                const isSelected = c.dialCode === dialCode;
                return (
                  <button
                    key={`${c.code}-${c.dialCode}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectCountry(c)}
                    className={`w-full min-h-[40px] px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-brand-stone-50 transition-colors cursor-pointer ${
                      isSelected ? "bg-brand-olive-subtle/50 font-semibold" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {c.flagSvg}
                      <span className="truncate text-brand-ink">
                        {isHy ? c.name_hy : c.name_en}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="font-mono text-xs text-brand-ink-muted font-medium">
                        {c.dialCode}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-brand-forest shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
