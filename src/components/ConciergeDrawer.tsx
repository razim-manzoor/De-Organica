"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDrawer } from "@/context/DrawerContext";
import { useLanguage } from "@/context/LanguageContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import {
  buildTravelWhatsAppMessage,
  buildCandidateWhatsAppMessage,
  buildEmployerWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";
import {
  X,
  Send,
  MessageCircle,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Calendar,
  Users,
  Building,
  Briefcase,
  Compass,
  FileText,
  ShieldCheck,
  Check,
  Trash2,
  Car,
  Wine,
  Building2,
  Globe,
  Sparkles,
} from "lucide-react";
import { PhoneCountryInput } from "@/components/PhoneCountryInput";

const LODGING_TIERS = [
  {
    id: "Economy & Clean 3★ Stays",
    label_en: "Economy & Clean 3★ Stays",
    label_hy: "Էկոնոմ և մաքուր 3★ հյուրանոցներ",
    sub_en: "Cost-effective, central lodging",
    sub_hy: "Մատչելի, կենտրոնական տեղավորում",
  },
  {
    id: "Boutique Wine & Heritage Resorts",
    label_en: "Boutique Wine & Heritage Resorts",
    label_hy: "Բուտիկ գինու և ժառանգության ռեզորթներ",
    sub_en: "Areni vineyard estates, historic tuff stays",
    sub_hy: "Արենիի խաղողուտներ, պատմական ռեզորթներ",
  },
  {
    id: "4-Star City Comfort",
    label_en: "4-Star City Comfort",
    label_hy: "4★ Քաղաքային հյուրանոցներ",
    sub_en: "Premium central hotels with breakfast",
    sub_hy: "Պրեմիում քաղաքային հարմարավետություն",
  },
  {
    id: "5-Star Luxury Hotels",
    label_en: "5-Star Luxury Hotels",
    label_hy: "5★ Լյուքս հյուրանոցներ",
    sub_en: "The Alexander, Grand Hotel, luxury suites",
    sub_hy: "The Alexander, Grand Hotel, լյուքս համարներ",
  },
  {
    id: "Tours & Chauffeur Only",
    label_en: "Tours & Chauffeur Only",
    label_hy: "Միայն տուրեր և շոֆեր",
    sub_en: "Self-booked lodging, ground dispatch only",
    sub_hy: "Սեփական հյուրանոց, միայն տրանսպորտ",
  },
];

const FLEET_TIERS = [
  {
    id: "Economy Sedan",
    label_en: "Economy Sedan",
    label_hy: "Էկոնոմ Սեդան",
    sub_en: "Value · 1–3 guests",
    sub_hy: "Մատչելի · 1–3 հյուր",
  },
  {
    id: "Executive Sedan",
    label_en: "Executive Sedan",
    label_hy: "Executive Sedan",
    sub_en: "Business · 1–3 guests",
    sub_hy: "Բիզնես · 1–3 հյուր",
  },
  {
    id: "VIP Minivan / Van",
    label_en: "VIP Minivan / Van",
    label_hy: "VIP Միկրոավտոբուս",
    sub_en: "Group · 4–16 guests",
    sub_hy: "Խումբ · 4–16 հյուր",
  },
  {
    id: "Tour Coach",
    label_en: "Tour Coach",
    label_hy: "Տուրիստական Ավտոբուս",
    sub_en: "Large group · 17+ guests",
    sub_hy: "Մեծ խումբ · 17+ հյուր",
  },
];

const B2B_SCOPES = [
  {
    id: "FITs & Private VIPs",
    label_en: "FITs & Private VIPs",
    label_hy: "FITs և VIP Անհատական",
    desc_en: "1–6 pax bespoke itineraries",
    desc_hy: "1–6 անձ անհատական ծրագրեր",
  },
  {
    id: "Leisure Groups (15–40)",
    label_en: "Leisure Groups (15–40)",
    label_hy: "Տուրիստական Խմբեր (15–40)",
    desc_en: "Fixed series or seasonal leisure groups",
    desc_hy: "Սերիական կամ սեզոնային տուրեր",
  },
  {
    id: "MICE & Corporate Delegations",
    label_en: "MICE Delegations",
    label_hy: "MICE և Կորպորատիվ",
    desc_en: "Conferences, galas, executive incentives",
    desc_hy: "Կոնֆերանսներ, միջոցառումներ, բիզնես",
  },
];

export function ConciergeDrawer() {
  const { state, closeDrawer } = useDrawer();
  const { locale } = useLanguage();
  const isHy = locale === "hy";

  const [activeTab, setActiveTab] = useState<"travel" | "candidate" | "employer">("travel");

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dialCode, setDialCode] = useState("+374");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [travelDates, setTravelDates] = useState("");
  const [guestsCount, setGuestsCount] = useState("2");

  // Advanced Travel Fields
  const [travelerType, setTravelerType] = useState<"individual" | "b2b">("individual");
  const [budgetTier, setBudgetTier] = useState<string>("Boutique & Luxury");
  const [agencyName, setAgencyName] = useState("");
  const [agencyCountry, setAgencyCountry] = useState("");
  const [b2bScope, setB2bScope] = useState("FITs & Private VIPs");
  const [accommodationTier, setAccommodationTier] = useState("Boutique Wine & Heritage Resorts");
  const [fleetTier, setFleetTier] = useState("Executive Sedan");
  const [isChangingService, setIsChangingService] = useState(false);

  // Candidate & Employer Fields
  const [nationality, setNationality] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [industrySector, setIndustrySector] = useState("");
  const [headcountRequired, setHeadcountRequired] = useState("");
  const [notes, setNotes] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  // Status & Refs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync activeTab with drawer state mode
  useEffect(() => {
    if (state.isOpen) {
      setActiveTab(state.mode);
      if (state.presetServiceOrTour) {
        setSelectedService(state.presetServiceOrTour);
        const lower = state.presetServiceOrTour.toLowerCase();
        if (lower.includes("dmc") || lower.includes("b2b") || lower.includes("partner") || lower.includes("agreement")) {
          setTravelerType("b2b");
        } else {
          setTravelerType("individual");
        }
        setIsChangingService(false);
      } else {
        setIsChangingService(false);
      }
      if (state.presetJobTitle) {
        setTargetRole(state.presetJobTitle);
      }
      setSubmitSuccess(false);
      setErrorMessage("");
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    }
  }, [state]);

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state.isOpen) {
        closeDrawer();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.isOpen, closeDrawer]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isOpen]);

  if (!state.isOpen) return null;

  const fullPhone = phoneNumber ? `${dialCode} ${phoneNumber.trim()}` : "";

  const handleSubmit = async (openWhatsAppChat: boolean = true) => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      // Validate mandatory fields
      if (activeTab === "travel") {
        if (travelerType === "b2b") {
          if (!agencyName.trim()) {
            throw new Error(
              isHy
                ? "Խնդրում ենք նշել գործակալության կամ ընկերության անվանումը"
                : "Please provide your travel agency or DMC company name"
            );
          }
          if (!fullName.trim()) {
            throw new Error(
              isHy
                ? "Խնդրում ենք նշել կոնտակտային անձի կամ գործակալի անունը"
                : "Please provide the contact person / agent name"
            );
          }
        } else {
          if (!fullName.trim()) {
            throw new Error(isHy ? "Խնդրում ենք լրացնել Ձեր անունը" : "Please enter your name");
          }
        }

        if (!phoneNumber.trim() && !email.trim()) {
          throw new Error(
            isHy
              ? "Խնդրում ենք նշել WhatsApp/հեռախոսահամար կամ էլ. փոստ"
              : "Please provide either a WhatsApp / phone number or email address"
          );
        }
      } else if (activeTab === "candidate") {
        if (!fullName.trim()) throw new Error(isHy ? "Խնդրում ենք լրացնել անունը" : "Please enter your name");
        if (!phoneNumber.trim()) throw new Error(isHy ? "Խնդրում ենք նշել WhatsApp հեռախոսահամար" : "Please provide your WhatsApp number");
        if (!targetRole.trim()) throw new Error(isHy ? "Խնդրում ենք նշել աշխատանքի ոլորտը" : "Please specify target role or sector");
      } else if (activeTab === "employer") {
        if (!companyName.trim()) throw new Error(isHy ? "Խնդրում ենք նշել ընկերության անվանումը" : "Please enter company name");
        if (!contactPerson.trim()) throw new Error(isHy ? "Խնդրում ենք նշել կոնտակտային անձին" : "Please enter contact person name");
        if (!email.trim() && !phoneNumber.trim()) {
          throw new Error(isHy ? "Խնդրում ենք նշել կորպորատիվ էլ. փոստ կամ հեռախոս" : "Please provide corporate email or phone");
        }
      }

      // Prepare FormData for /api/inquiry
      const formData = new FormData();
      formData.append("inquiryType", activeTab);
      formData.append("fullName", activeTab === "employer" ? contactPerson : fullName);
      formData.append("email", email);
      formData.append("phone", fullPhone);
      formData.append("notes", notes);
      formData.append("locale", locale);

      if (activeTab === "travel") {
        formData.append("serviceOrTour", selectedService || "General Travel Inquiry");
        formData.append("travelerType", travelerType);
        formData.append("travelDates", travelDates);
        if (travelerType === "b2b") {
          formData.append("agencyName", agencyName);
          formData.append("agencyCountry", agencyCountry);
          formData.append("b2bScope", b2bScope);
        } else {
          formData.append("budgetTier", budgetTier);
          formData.append("guestsCount", guestsCount);
          formData.append("accommodationTier", accommodationTier);
          formData.append("fleetTier", fleetTier);
        }
      } else if (activeTab === "candidate") {
        formData.append("nationality", nationality);
        formData.append("currentCountry", currentCountry);
        formData.append("targetRole", targetRole);
        if (cvFile) {
          formData.append("cvFile", cvFile);
        }
      } else if (activeTab === "employer") {
        formData.append("companyName", companyName);
        formData.append("contactPerson", contactPerson);
        formData.append("industrySector", industrySector);
        formData.append("headcountRequired", headcountRequired);
      }

      // Send to Next.js API route
      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || (isHy ? "Սխալ է տեղի ունեցել: Փորձեք կրկին:" : "Submission failed. Please try again."));
      }

      setSubmitSuccess(true);
      setNotes("");
      setCvFile(null);

      // Optionally launch WhatsApp if requested
      if (openWhatsAppChat) {
        let msg = "";
        if (activeTab === "travel") {
          msg = buildTravelWhatsAppMessage({
            name: fullName,
            travelerType,
            agencyName: travelerType === "b2b" ? agencyName : undefined,
            agencyCountry: travelerType === "b2b" ? agencyCountry : undefined,
            b2bScope: travelerType === "b2b" ? b2bScope : undefined,
            serviceOrTour: selectedService || "Travel & Tours Inquiry",
            budgetTier: travelerType === "individual" ? budgetTier : undefined,
            dates: travelDates,
            guests: travelerType === "individual" ? guestsCount : undefined,
            accommodation: travelerType === "individual" ? accommodationTier : undefined,
            fleet: travelerType === "individual" ? fleetTier : undefined,
            phone: fullPhone,
            email,
            notes,
          });
        } else if (activeTab === "candidate") {
          msg = buildCandidateWhatsAppMessage({
            name: fullName,
            nationality,
            currentLocation: currentCountry,
            role: targetRole,
            phone: fullPhone,
            email,
            notes: notes + (cvFile ? ` (CV Attached: ${cvFile.name})` : ""),
          });
        } else {
          msg = buildEmployerWhatsAppMessage({
            companyName,
            contactPerson,
            email,
            phone: fullPhone,
            industry: industrySector,
            headcount: headcountRequired,
            notes,
          });
        }

        const waUrl = buildWhatsAppUrl(msg);
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An unexpected error occurred.");
      scrollContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Direct Desk Inquiry"
      className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200"
    >
      {/* Light-Dismiss Backdrop */}
      <div
        className="fixed inset-0 bg-brand-stone-900/60 backdrop-blur-xs transition-opacity cursor-pointer"
        onClick={closeDrawer}
        aria-hidden="true"
      />

      {/* Slide-in Sheet */}
      <div
        ref={dialogRef}
        className="relative z-10 w-full max-w-xl h-full bg-brand-stone-50 border-l border-brand-stone-300 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-stone-200 bg-white">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0 animate-pulse" />
            <div>
              <h2 className="font-serif text-lg font-bold text-brand-forest">
                {activeTab === "travel"
                  ? isHy
                    ? "Երևանի Տուրիստական և B2B Դեսկ"
                    : "Yerevan Travel Concierge & B2B Desk"
                  : isHy
                  ? "Ուղիղ կապ Երևանի գրասենյակի հետ"
                  : "Direct Yerevan Operations Desk"}
              </h2>
              <p className="text-xs text-brand-ink-muted">
                {isHy ? deorganicaConfig.company.workingHours_hy : deorganicaConfig.company.workingHours_en}
              </p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeDrawer}
            aria-label="Close drawer"
            className="p-2 rounded-full text-brand-ink-subtle hover:text-brand-forest hover:bg-brand-stone-100 active:scale-95 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-3 p-2 bg-brand-stone-100 border-b border-brand-stone-200 gap-1.5 text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setActiveTab("travel");
              setSubmitSuccess(false);
              setErrorMessage("");
            }}
            className={`py-2.5 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center cursor-pointer ${
              activeTab === "travel"
                ? "bg-white text-brand-forest shadow-xs font-semibold"
                : "text-brand-ink-muted hover:text-brand-forest hover:bg-white/50 active:scale-95"
            }`}
          >
            <Compass className="w-4 h-4 text-brand-olive" />
            <span>{isHy ? "Տուրիզմ և DMC" : "Travel & Tours"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("candidate");
              setSubmitSuccess(false);
              setErrorMessage("");
            }}
            className={`py-2.5 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center cursor-pointer ${
              activeTab === "candidate"
                ? "bg-white text-brand-forest shadow-xs font-semibold"
                : "text-brand-ink-muted hover:text-brand-forest hover:bg-white/50 active:scale-95"
            }`}
          >
            <Briefcase className="w-4 h-4 text-brand-olive" />
            <span>{isHy ? "Թեկնածու (CV)" : "Candidate (CV)"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("employer");
              setSubmitSuccess(false);
              setErrorMessage("");
            }}
            className={`py-2.5 px-2 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center cursor-pointer ${
              activeTab === "employer"
                ? "bg-white text-brand-forest shadow-xs font-semibold"
                : "text-brand-ink-muted hover:text-brand-forest hover:bg-white/50 active:scale-95"
            }`}
          >
            <Building className="w-4 h-4 text-brand-olive" />
            <span>{isHy ? "Գործատու" : "Hire Staff"}</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {submitSuccess ? (
            <div className="p-8 rounded-2xl bg-brand-olive-subtle/50 border border-brand-olive/30 text-center space-y-4 my-auto shadow-xs">
              <CheckCircle2 className="w-14 h-14 text-brand-olive mx-auto" />
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-forest">
                {isHy ? "Ձեր հարցումը հաջողությամբ ուղարկված է" : "Inquiry Dispatched Successfully"}
              </h3>
              <p className="text-sm text-brand-ink-muted max-w-md mx-auto leading-relaxed">
                {isHy
                  ? "Մեր մասնագետը կկապվի Ձեզ հետ նշված հեռախոսահամարով կամ էլ. փոստով: Կարող եք նաև անմիջապես գրել WhatsApp-ով:"
                  : "The Yerevan desk has received your details. A representative will review and respond promptly. You may also connect directly via WhatsApp."}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => handleSubmit(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 text-white font-medium hover:bg-emerald-800 active:scale-95 transition-all text-sm cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{isHy ? "Բացել WhatsApp չատը" : "Open WhatsApp Chat"}</span>
                </button>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-brand-stone-300 bg-white text-brand-ink-muted hover:text-brand-forest active:scale-95 text-sm font-medium transition-all cursor-pointer shadow-2xs"
                >
                  <span>{isHy ? "Փակել" : "Close Window"}</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Trust/Policy Notice banner based on tab */}
              {activeTab === "candidate" && (
                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3 text-xs text-brand-forest shadow-2xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-emerald-950 mb-0.5">
                      {isHy ? "Զրոյական նախնական վճարի երաշխիք" : "Zero Upfront Fee · Pay-After-Job Guarantee"}
                    </span>
                    <span className="text-emerald-800 leading-normal">
                      {isHy
                        ? "Դիմումների գրանցումը և հարցազրույցներն անվճար են: Ծառայության վճարումը կատարվում է միայն աշխատանքի պաշտոնական հաստատումից հետո:"
                        : "Registration and interviews are 100% free. Placement terms apply strictly upon verified job offer and legal work permit approval."}
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "employer" && (
                <div className="p-4 rounded-xl bg-brand-stone-100 border border-brand-stone-200 flex items-start gap-3 text-xs text-brand-ink-muted shadow-2xs">
                  <Building className="w-5 h-5 text-brand-forest shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-brand-forest mb-0.5">
                      {isHy ? "Կորպորատիվ հավաքագրում և աշխատանքային վիզաներ" : "B2B Staffing & Work Permit Administration"}
                    </span>
                    <span className="leading-normal">
                      {isHy
                        ? "Լրացրեք պահանջվող մասնագետների թիվը և ոլորտը: Մեր թիմը կպատրաստի թեկնածուների նախնական ցանկ:"
                        : "Tell us your industry and required headcount. Our Yerevan HR desk will source, vet, and present shortlisted candidate profiles."}
                    </span>
                  </div>
                </div>
              )}

              {/* Error banner if any */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2 text-xs shadow-2xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="font-medium">{errorMessage}</span>
                </div>
              )}

              {/* Form Inputs Container */}
              <div className="space-y-4 text-sm">
                {/* Mode-Specific Header Fields: Travel Context Card */}
                {activeTab === "travel" && (
                  <>
                    {selectedService && !isChangingService ? (
                      <div className="p-3.5 rounded-2xl bg-brand-stone-100 border border-brand-stone-200/90 flex items-center justify-between shadow-2xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-brand-forest text-brand-olive-light flex items-center justify-center shrink-0 shadow-2xs">
                            <Compass className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-olive block">
                              {isHy ? "Ընտրված Ուղղություն / Ծրագիր" : "Selected Expedition Context"}
                            </span>
                            <span className="text-xs sm:text-sm font-serif font-bold text-brand-forest block leading-snug">
                              {selectedService}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsChangingService(true)}
                          className="text-[11px] font-semibold text-brand-olive hover:text-brand-forest transition-colors underline cursor-pointer shrink-0 ml-2"
                        >
                          {isHy ? "Փոխել" : "Change"}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label htmlFor="travelServiceSelect" className="text-xs font-semibold text-brand-forest">
                            {isHy ? "Ընտրեք տուրը կամ ծառայությունը" : "Choose Itinerary or Ground Service"}
                          </label>
                          {selectedService && (
                            <button
                              type="button"
                              onClick={() => setIsChangingService(false)}
                              className="text-[11px] text-brand-olive font-semibold underline cursor-pointer"
                            >
                              {isHy ? "Պահպանել" : "Keep Current"}
                            </button>
                          )}
                        </div>
                        <select
                          id="travelServiceSelect"
                          value={selectedService}
                          onChange={(e) => {
                            setSelectedService(e.target.value);
                            setIsChangingService(false);
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs font-medium text-brand-ink focus:outline-hidden focus:ring-2 focus:ring-brand-olive shadow-2xs"
                        >
                          <option value="">{isHy ? "Ընտրեք ցանկից կամ նշեք ստորև" : "Select from list or describe below"}</option>
                          <optgroup label={isHy ? "Հեղինակային Երթուղիներ" : "Signature Tour Packages"}>
                            {deorganicaConfig.starterTours.map((t) => (
                              <option key={t.id} value={t.title_en}>
                                {isHy ? t.title_hy : t.title_en} ({t.duration_en})
                              </option>
                            ))}
                          </optgroup>
                          <optgroup label={isHy ? "Տեղական Լոգիստիկա և Սպասարկում" : "Ground Operations & Fleet"}>
                            {deorganicaConfig.travelServices.map((s) => (
                              <option key={s.id} value={s.title_en}>
                                {isHy ? s.title_hy : s.title_en}
                              </option>
                            ))}
                          </optgroup>
                        </select>
                      </div>
                    )}

                    {/* Inquiry Persona Toggle: Private Traveler vs B2B DMC Partner */}
                    <div className="flex p-1 rounded-xl bg-brand-stone-100 border border-brand-stone-200 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => setTravelerType("individual")}
                        className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          travelerType === "individual"
                            ? "bg-white text-brand-forest shadow-2xs font-bold"
                            : "text-brand-ink-muted hover:text-brand-forest"
                        }`}
                      >
                        <Users className="w-3.5 h-3.5 text-brand-olive" />
                        <span>{isHy ? "Մասնավոր / Ընտանեկան" : "Private Traveler / Family"}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTravelerType("b2b")}
                        className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          travelerType === "b2b"
                            ? "bg-white text-brand-forest shadow-2xs font-bold"
                            : "text-brand-ink-muted hover:text-brand-forest"
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5 text-brand-olive" />
                        <span>{isHy ? "B2B Տուրօպերատոր / DMC" : "B2B Travel Agent / DMC"}</span>
                      </button>
                    </div>
                  </>
                )}

                {/* Company & Agency fields if B2B Travel or Employer */}
                {activeTab === "travel" && travelerType === "b2b" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label htmlFor="agencyNameInput" className="block text-xs font-semibold text-brand-forest mb-1.5">
                        {isHy ? "Գործակալության / Ընկերության անվանումը *" : "Travel Agency / Company *"}
                      </label>
                      <input
                        id="agencyNameInput"
                        type="text"
                        required
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                        placeholder={isHy ? "օրինակ՝ Dubai Travel LLC" : "e.g. Odyssey Holidays / GCC DMC"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs text-brand-ink shadow-2xs focus:ring-2 focus:ring-brand-olive focus:border-transparent outline-hidden"
                      />
                    </div>
                    <div>
                      <label htmlFor="agencyCountryInput" className="block text-xs font-semibold text-brand-forest mb-1.5">
                        {isHy ? "Գործունեության երկիրը" : "Agency Country of Origin"}
                      </label>
                      <input
                        id="agencyCountryInput"
                        type="text"
                        value={agencyCountry}
                        onChange={(e) => setAgencyCountry(e.target.value)}
                        placeholder={isHy ? "օրինակ՝ ԱՄԷ, Հնդկաստան, ՌԴ" : "e.g. UAE / India / Germany / USA"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs text-brand-ink shadow-2xs focus:ring-2 focus:ring-brand-olive focus:border-transparent outline-hidden"
                      />
                    </div>
                  </div>
                )}

                {/* Company Name if Employer */}
                {activeTab === "employer" && (
                  <div>
                    <label htmlFor="employerCompanyNameInput" className="block text-xs font-semibold text-brand-forest mb-1.5">
                      {isHy ? "Ընկերության անվանումը *" : "Company / Enterprise Name *"}
                    </label>
                    <input
                      id="employerCompanyNameInput"
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={isHy ? "օրինակ՝ Արմենիա Հյուրանոցային Խումբ" : "e.g. Yerevan Construction Group LLC"}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-olive focus:border-transparent text-brand-ink shadow-2xs transition-all"
                    />
                  </div>
                )}

                {/* Contact Person / Full Name */}
                <div>
                  <label htmlFor="personNameInput" className="block text-xs font-semibold text-brand-forest mb-1.5">
                    {activeTab === "employer"
                      ? isHy
                        ? "Կոնտակտային անձի անունը *"
                        : "Contact Person / HR Manager *"
                      : activeTab === "travel" && travelerType === "b2b"
                      ? isHy
                        ? "Կոնտակտային անձ / Գործակալի անուն *"
                        : "Contact Person / Agent Name *"
                      : isHy
                      ? "Լրիվ Անուն Ազգանուն *"
                      : "Full Name *"}
                  </label>
                  <input
                    id="personNameInput"
                    type="text"
                    required
                    value={activeTab === "employer" ? contactPerson : fullName}
                    onChange={(e) =>
                      activeTab === "employer"
                        ? setContactPerson(e.target.value)
                        : setFullName(e.target.value)
                    }
                    placeholder={
                      travelerType === "b2b"
                        ? "e.g. Rahul Sharma / Elena Popova"
                        : isHy
                        ? "օրինակ՝ Արամ Սարգսյան"
                        : "e.g. Rahul Sharma / David Smith"
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-olive focus:border-transparent text-brand-ink shadow-2xs transition-all"
                  />
                </div>

                {/* International Phone with Accessible SVG Flag Picker */}
                <div>
                  <label htmlFor="contactPhoneInput" className="block text-xs font-semibold text-brand-forest mb-1.5 flex items-center justify-between">
                    <span>{isHy ? "Հեռախոսահամար / WhatsApp *" : "WhatsApp / Mobile Number *"}</span>
                    <span className="text-[11px] font-normal text-brand-ink-subtle">
                      {isHy ? "կամ էլ. փոստ ստորև" : "or email below"}
                    </span>
                  </label>
                  <PhoneCountryInput
                    dialCode={dialCode}
                    onDialCodeChange={setDialCode}
                    phoneNumber={phoneNumber}
                    onPhoneNumberChange={setPhoneNumber}
                    isHy={isHy}
                  />
                  <p className="text-[11px] text-stone-500 mt-1.5">
                    {isHy
                      ? "Մենք կուղարկենք հաստատումը WhatsApp-ով կամ SMS-ով:"
                      : "We route inquiries directly to our Yerevan WhatsApp dispatch desk."}
                  </p>
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="contactEmailInput" className="block text-xs font-semibold text-brand-forest mb-1.5">
                    {isHy ? "Էլ. Փոստի հասցե" : "Email Address"}
                  </label>
                  <input
                    id="contactEmailInput"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-olive focus:border-transparent text-brand-ink shadow-2xs"
                  />
                </div>

                {/* Mode-Specific Detail Blocks: Travel B2B */}
                {activeTab === "travel" && travelerType === "b2b" && (
                  <div className="space-y-3.5 pt-1">
                    <div>
                      <label className="block text-xs font-semibold text-brand-forest mb-1.5">
                        {isHy ? "Նախատեսվող ներգնա ծավալը" : "Expected Inbound Group Scope"}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                        {B2B_SCOPES.map((scope) => (
                          <button
                            key={scope.id}
                            type="button"
                            onClick={() => setB2bScope(scope.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              b2bScope === scope.id
                                ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-2xs"
                                : "bg-white border-brand-stone-200 text-brand-ink-muted hover:border-brand-olive/50"
                            }`}
                          >
                            <span className="block font-bold leading-tight">
                              {isHy ? scope.label_hy : scope.label_en}
                            </span>
                            <span className={`text-[9px] block leading-tight mt-0.5 ${b2bScope === scope.id ? "text-brand-olive-light" : "text-brand-ink-subtle"}`}>
                              {isHy ? scope.desc_hy : scope.desc_en}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="b2bTravelDatesInput" className="block text-xs font-semibold text-brand-forest mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-olive" />
                        <span>{isHy ? "Նախատեսվող սեզոն կամ ամսաթիվ" : "Estimated Travel Window or Series Season"}</span>
                      </label>
                      <input
                        id="b2bTravelDatesInput"
                        type="text"
                        value={travelDates}
                        onChange={(e) => setTravelDates(e.target.value)}
                        placeholder={isHy ? "օրինակ՝ Գարուն 2026 / Սեպտեմբեր-Հոկտեմբեր" : "e.g. Spring 2026 Series / Autumn Harvest / Monthly Departures"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs text-brand-ink shadow-2xs"
                      />
                    </div>
                  </div>
                )}

                {/* Mode-Specific Detail Blocks: Travel Individual / Family */}
                {activeTab === "travel" && travelerType === "individual" && (
                  <div className="space-y-3.5 pt-1">
                    {/* Travel Style & Budget Category Selector */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-brand-forest flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-brand-olive" />
                          <span>{isHy ? "Ճամփորդության ոճը և բյուջեն" : "Travel Style & Budget Category"}</span>
                        </label>
                        <span className="text-[10px] font-mono text-brand-olive font-bold">
                          {budgetTier}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 text-[11px]">
                        {[
                          {
                            id: "Economy / Value",
                            label_en: "Economy / Value",
                            label_hy: "Էկոնոմ / Մատչելի",
                            sub_en: "Clean 3★, Value Fleet",
                            sub_hy: "3★, մատչելի պարկ",
                            lodging: "Economy & Clean 3★ Stays",
                            fleet: "Economy Sedan",
                          },
                          {
                            id: "Classic Comfort",
                            label_en: "Classic Comfort",
                            label_hy: "Կոմֆորտ (4★)",
                            sub_en: "4★ Hotels, Chauffeur",
                            sub_hy: "4★, chauffeur",
                            lodging: "4-Star City Comfort",
                            fleet: "Executive Sedan",
                          },
                          {
                            id: "Boutique & Luxury",
                            label_en: "Boutique & Luxury",
                            label_hy: "Բուտիկ և VIP",
                            sub_en: "Wine Resorts, 5★",
                            sub_hy: "5★, բուտիկ",
                            lodging: "Boutique Wine & Heritage Resorts",
                            fleet: "Executive Sedan",
                          },
                        ].map((b) => (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => {
                              setBudgetTier(b.id);
                              setAccommodationTier(b.lodging);
                              setFleetTier(b.fleet);
                            }}
                            className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                              budgetTier === b.id
                                ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-2xs"
                                : "bg-white border-brand-stone-200 text-brand-ink-muted hover:border-brand-olive/50"
                            }`}
                          >
                            <span className="block font-bold leading-tight">{isHy ? b.label_hy : b.label_en}</span>
                            <span className={`text-[9px] block ${budgetTier === b.id ? "text-brand-olive-light" : "text-brand-ink-subtle"}`}>
                              {isHy ? b.sub_hy : b.sub_en}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Group Size with Quick Chips + Direct Numeric Entry */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-brand-forest flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-brand-olive" />
                          <span>{isHy ? "Հյուրերի թիվը" : "Group Size / Guests"}</span>
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number"
                            min="1"
                            max="150"
                            value={guestsCount}
                            onChange={(e) => setGuestsCount(e.target.value)}
                            className="w-16 px-2 py-0.5 rounded-lg border border-brand-stone-300 bg-white text-xs font-bold font-mono text-center text-brand-forest focus:ring-1 focus:ring-brand-olive"
                          />
                          <span className="text-[11px] font-mono text-brand-olive font-bold">
                            {parseInt(guestsCount, 10) === 1
                              ? isHy
                                ? "հյուր"
                                : "Guest"
                              : isHy
                              ? "հյուր"
                              : "Guests"}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { label: "1–2", val: "2", sub: isHy ? "Սեդան" : "Sedan" },
                          { label: "3–5", val: "4", sub: isHy ? "Ընտանիք" : "Family" },
                          { label: "6–10", val: "8", sub: isHy ? "Սպրինտեր" : "Sprinter" },
                          { label: "10+", val: "16", sub: isHy ? "Ավտոբուս" : "Coach" },
                        ].map((g) => (
                          <button
                            key={g.label}
                            type="button"
                            onClick={() => setGuestsCount(g.val)}
                            className={`py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                              guestsCount === g.val
                                ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-2xs"
                                : "bg-white border-brand-stone-200 text-brand-forest hover:bg-brand-stone-50"
                            }`}
                          >
                            <span className="block text-xs font-bold leading-tight">{g.label}</span>
                            <span className={`text-[9px] block leading-none ${guestsCount === g.val ? "text-brand-olive-light" : "text-brand-ink-subtle"}`}>{g.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Travel Dates */}
                    <div>
                      <label htmlFor="individualTravelDatesInput" className="block text-xs font-semibold text-brand-forest mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-brand-olive" />
                        <span>{isHy ? "Նախատեսվող ամսաթիվ կամ սեզոն" : "Estimated Travel Dates or Season"}</span>
                      </label>
                      <input
                        id="individualTravelDatesInput"
                        type="text"
                        value={travelDates}
                        onChange={(e) => setTravelDates(e.target.value)}
                        placeholder={isHy ? "օրինակ՝ Հոկտեմբեր 15-22 / Աշուն 2026" : "e.g. Oct 15–22 / Autumn Wine Season / Next Month"}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs text-brand-ink shadow-2xs"
                      />
                    </div>

                    {/* Accommodation Style Preference (Bilingual) */}
                    <div>
                      <label className="block text-xs font-semibold text-brand-forest mb-1.5 flex items-center gap-1.5">
                        <Wine className="w-3.5 h-3.5 text-brand-olive" />
                        <span>{isHy ? "Հյուրանոցի / Տեղավորման նախասիրություն" : "Lodging & Experience Preference"}</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        {LODGING_TIERS.map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setAccommodationTier(tier.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              accommodationTier === tier.id
                                ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-2xs"
                                : "bg-white border-brand-stone-200 text-brand-ink-muted hover:border-brand-olive/50"
                            }`}
                          >
                            <span className="block font-bold leading-tight">
                              {isHy ? tier.label_hy : tier.label_en}
                            </span>
                            <span className={`text-[9px] block mt-0.5 ${accommodationTier === tier.id ? "text-brand-olive-light" : "text-brand-ink-subtle"}`}>
                              {isHy ? tier.sub_hy : tier.sub_en}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chauffeur Fleet Tier (Bilingual) */}
                    <div>
                      <label className="block text-xs font-semibold text-brand-forest mb-1.5 flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-brand-olive" />
                        <span>{isHy ? "Տրանսպորտային դաս" : "Chauffeur Fleet Preference"}</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[11px]">
                        {FLEET_TIERS.map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            onClick={() => setFleetTier(f.id)}
                            className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                              fleetTier === f.id
                                ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-2xs"
                                : "bg-white border-brand-stone-200 text-brand-ink-muted hover:border-brand-olive/50"
                            }`}
                          >
                            <span className="block font-semibold leading-tight text-xs">
                              {isHy ? f.label_hy : f.label_en}
                            </span>
                            <span className={`text-[9px] block ${fleetTier === f.id ? "text-brand-olive-light" : "text-brand-ink-subtle"}`}>
                              {isHy ? f.sub_hy : f.sub_en}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Mode-Specific Fields: Candidate */}
                {activeTab === "candidate" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="candidateNationalityInput" className="block text-xs font-semibold text-brand-forest mb-1.5">
                          {isHy ? "Քաղաքացիություն" : "Nationality"}
                        </label>
                        <input
                          id="candidateNationalityInput"
                          type="text"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          placeholder="e.g. Indian, Filipino, Georgian"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs text-brand-ink shadow-2xs"
                        />
                      </div>
                      <div>
                        <label htmlFor="candidateCountryInput" className="block text-xs font-semibold text-brand-forest mb-1.5">
                          {isHy ? "Ներկայիս երկիրը" : "Current Country of Residence"}
                        </label>
                        <input
                          id="candidateCountryInput"
                          type="text"
                          value={currentCountry}
                          onChange={(e) => setCurrentCountry(e.target.value)}
                          placeholder="e.g. UAE / India / Armenia"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs text-brand-ink shadow-2xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="candidateTargetRoleInput" className="block text-xs font-semibold text-brand-forest mb-1.5">
                        {isHy ? "Ցանկալի պաշտոնը կամ ոլորտը *" : "Target Role / Industry Sector *"}
                      </label>
                      <input
                        id="candidateTargetRoleInput"
                        type="text"
                        required
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        placeholder="e.g. Chef / Line Cook / Crane Operator / Driver"
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-sm text-brand-ink shadow-2xs"
                      />
                    </div>

                    {/* CV File Upload */}
                    <div>
                      <label className="block text-xs font-semibold text-brand-forest mb-1.5 flex items-center justify-between">
                        <span>{isHy ? "Կցել Ռեզյումե (CV / Resume)" : "Attach CV / Resume (PDF / DOCX)"}</span>
                        <span className="text-[10px] text-brand-ink-subtle">Max 5MB</span>
                      </label>
                      <div className="relative border-2 border-dashed border-brand-stone-300 hover:border-brand-olive rounded-xl p-4 text-center transition-colors bg-brand-stone-100/60 shadow-2xs">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setCvFile(e.target.files[0]);
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex items-center justify-center gap-2 text-xs text-brand-ink-muted">
                          {cvFile ? (
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-brand-olive shrink-0" />
                              <span className="font-semibold text-brand-forest truncate max-w-xs">
                                {cvFile.name}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCvFile(null);
                                }}
                                className="p-1 rounded-full text-brand-ink-subtle hover:text-rose-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-1.5 py-1">
                              <Upload className="w-5 h-5 text-brand-stone-500" />
                              <span className="font-medium text-brand-forest">
                                {isHy ? "Սեղմեք ֆայլ ընտրելու համար" : "Click or drag resume file here"}
                              </span>
                              <span className="text-[10px] text-brand-ink-subtle">Supports PDF, DOC, DOCX</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Mode-Specific Fields: Employer */}
                {activeTab === "employer" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="employerIndustryInput" className="block text-xs font-semibold text-brand-forest mb-1.5">
                        {isHy ? "Արդյունաբերության ոլորտը" : "Industry Sector"}
                      </label>
                      <input
                        id="employerIndustryInput"
                        type="text"
                        value={industrySector}
                        onChange={(e) => setIndustrySector(e.target.value)}
                        placeholder="e.g. Construction / Hospitality / Fleet"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs text-brand-ink shadow-2xs"
                      />
                    </div>
                    <div>
                      <label htmlFor="employerHeadcountInput" className="block text-xs font-semibold text-brand-forest mb-1.5">
                        {isHy ? "Պահանջվող աշխատակիցների թիվը" : "Headcount Needed"}
                      </label>
                      <input
                        id="employerHeadcountInput"
                        type="text"
                        value={headcountRequired}
                        onChange={(e) => setHeadcountRequired(e.target.value)}
                        placeholder="e.g. 5–10 workers"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs text-brand-ink shadow-2xs"
                      />
                    </div>
                  </div>
                )}

                {/* Additional Notes / Requirements */}
                <div>
                  <label htmlFor="additionalNotesInput" className="block text-xs font-semibold text-brand-forest mb-1.5">
                    {isHy ? "Լրացուցիչ նշումներ կամ պահանջներ" : "Additional Notes or Specific Requests"}
                  </label>
                  <textarea
                    id="additionalNotesInput"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      activeTab === "candidate"
                        ? isHy
                          ? "Նշեք Ձեր աշխատանքային փորձը, ներկայիս կարգավիճակը..."
                          : "Highlight your years of experience, current location..."
                        : activeTab === "employer"
                        ? isHy
                          ? "Նշեք աշխատանքի սկզբի ժամկետները, հերթափոխերը..."
                          : "Specify contract duration, shift requirements..."
                        : travelerType === "b2b"
                        ? isHy
                          ? "Նշեք խմբի սեզոնային պահանջները, սնունդը, լեզուն..."
                          : "Target hotel stars, meal plans, language guide requirements, series allotment..."
                        : isHy
                        ? "Հատուկ ցանկություններ, երեխաներ, հյուրանոց..."
                        : "Special preferences, dietary requests, celebrations..."
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-olive focus:border-transparent text-xs text-brand-ink resize-none shadow-2xs"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!submitSuccess && (
          <div className="p-5 border-t border-brand-stone-200 bg-white space-y-2.5">
            {errorMessage && (
              <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{errorMessage}</span>
              </div>
            )}

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit(true)}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-forest text-white font-semibold hover:bg-brand-forest-deep active:scale-98 transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MessageCircle className="w-4 h-4 text-brand-olive-light" />
              )}
              <span>
                {isHy
                  ? "Ուղարկել և Բացել WhatsApp չատը"
                  : "Submit & Chat via WhatsApp Desk"}
              </span>
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit(false)}
              className="w-full py-2.5 px-4 rounded-xl border border-brand-stone-300 bg-brand-stone-50 text-brand-ink-muted hover:text-brand-forest hover:bg-white active:scale-98 transition-all flex items-center justify-center gap-2 text-xs font-medium disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isHy ? "Ուղարկել միայն էլ. փոստով" : "Send Official Inquiry by Email Only"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
