"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useDrawer } from "@/context/DrawerContext";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/SiteDataContext";
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
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building,
  Building2,
  Briefcase,
  Compass,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { PhoneCountryInput } from "@/components/PhoneCountryInput";
import {
  MAX_CV_BYTES,
  ALLOWED_CV_EXTENSIONS,
  type InvalidFieldKey,
} from "./drawer/drawer-constants";
import { TravelInquiryFields } from "./drawer/TravelInquiryFields";
import { CandidateInquiryFields } from "./drawer/CandidateInquiryFields";
import { EmployerInquiryFields } from "./drawer/EmployerInquiryFields";

export function ConciergeDrawer() {
  const { state, closeDrawer } = useDrawer();
  const { locale } = useLanguage();
  const { siteSettings, tours, travelServices } = useSiteData();
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
  const [isChangingRole, setIsChangingRole] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState("3–5 Years");
  const [primaryLanguage, setPrimaryLanguage] = useState("English Conversational");
  const [candidateStatus, setCandidateStatus] = useState("In Home Country (Ready for Visa)");
  const [candidateConsent, setCandidateConsent] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [employerJurisdiction, setEmployerJurisdiction] = useState("Armenia (ՀՎՀՀ / TIN)");
  const [industrySector, setIndustrySector] = useState("Hospitality & Restaurants");
  const [headcountRequired, setHeadcountRequired] = useState("1–5");
  const [employerUrgency, setEmployerUrgency] = useState("Immediate (< 15 Days)");
  const [employerHousing, setEmployerHousing] = useState("Employer Housing Included");
  const [notes, setNotes] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [companyWebsiteHp, setCompanyWebsiteHp] = useState("");

  // Status & Validation Refs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{ waUrl: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [invalidField, setInvalidField] = useState<InvalidFieldKey>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isClosingRef = useRef(false);

  // Field Refs for validation focus management
  const agencyNameRef = useRef<HTMLInputElement>(null);
  const companyNameRef = useRef<HTMLInputElement>(null);
  const personNameRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const targetRoleRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const closeTopLayer = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open || isClosingRef.current) {
      if (state.isOpen) closeDrawer();
      return;
    }

    isClosingRef.current = true;
    const canTransitionDisplay =
      typeof CSS !== "undefined" && CSS.supports?.("transition-behavior: allow-discrete");
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (canTransitionDisplay || prefersReduced) {
      dialog.close();
      isClosingRef.current = false;
      if (state.isOpen) closeDrawer();
      return;
    }

    dialog.setAttribute("data-closing", "");
    const finish = () => {
      dialog.removeEventListener("transitionend", onEnd);
      window.clearTimeout(fallbackTimer);
      dialog.removeAttribute("data-closing");
      if (dialog.open) dialog.close();
      isClosingRef.current = false;
      if (state.isOpen) closeDrawer();
    };
    const onEnd = (e: TransitionEvent) => {
      if (e.target === dialog && e.propertyName === "transform") finish();
    };
    const fallbackTimer = window.setTimeout(finish, 320);
    dialog.addEventListener("transitionend", onEnd);
  }, [closeDrawer, state.isOpen]);

  // Sync dialog top-layer open/close + drawer state presets
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (state.isOpen) {
      setActiveTab(state.mode);
      if (state.presetServiceOrTour) {
        setSelectedService(state.presetServiceOrTour);
        const lower = state.presetServiceOrTour.toLowerCase();
        if (
          lower.includes("dmc") ||
          lower.includes("b2b") ||
          lower.includes("partner") ||
          lower.includes("agreement")
        ) {
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
        setIsChangingRole(false);
      } else {
        setIsChangingRole(false);
      }

      setSubmittedSnapshot(null);
      setErrorMessage("");
      setInvalidField(null);
      setCandidateConsent(false);
      isClosingRef.current = false;

      if (!dialog.open) {
        dialog.showModal();
        requestAnimationFrame(() => {
          closeBtnRef.current?.focus();
        });
      }
    } else if (dialog.open) {
      closeTopLayer();
    }
  }, [state, closeTopLayer]);

  const handleCvFileChange = (file: File | null) => {
    setErrorMessage("");
    setInvalidField(null);
    if (!file) {
      setCvFile(null);
      return;
    }

    const lowerName = file.name.toLowerCase();
    const hasValidExt = ALLOWED_CV_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
    if (!hasValidExt) {
      setInvalidField("cvFile");
      setErrorMessage(
        isHy
          ? "Թույլատրվում են միայն PDF, DOC կամ DOCX ֆայլեր:"
          : "Only PDF, DOC, or DOCX resume files are accepted."
      );
      return;
    }

    if (file.size > MAX_CV_BYTES) {
      setInvalidField("cvFile");
      setErrorMessage(
        isHy
          ? "Ֆայլի չափը գերազանցում է առավելագույն 4 ՄԲ սահմանը:"
          : "Resume file exceeds the maximum 4 MB limit."
      );
      return;
    }

    setCvFile(file);
  };

  const buildCurrentWhatsAppUrl = (
    fullPhoneStr: string,
    attachedFileName?: string
  ): string => {
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
        phone: fullPhoneStr,
        email,
        notes,
      });
    } else if (activeTab === "candidate") {
      msg = buildCandidateWhatsAppMessage({
        name: fullName,
        nationality,
        currentLocation: currentCountry,
        role: targetRole,
        experience: experienceLevel,
        languages: primaryLanguage,
        status: candidateStatus,
        phone: fullPhoneStr,
        email,
        notes: notes + (attachedFileName ? ` (CV Attached: ${attachedFileName})` : ""),
      });
    } else {
      msg = buildEmployerWhatsAppMessage({
        companyName,
        contactPerson,
        jurisdiction: employerJurisdiction,
        email,
        phone: fullPhoneStr,
        industry: industrySector,
        headcount: headcountRequired,
        urgency: employerUrgency,
        housing: employerHousing,
        notes,
      });
    }
    return buildWhatsAppUrl(msg, siteSettings.company.whatsappNumberDigits);
  };

  const raiseValidationError = (
    message: string,
    fieldKey: InvalidFieldKey,
    targetRef?: React.RefObject<HTMLInputElement | null>
  ) => {
    setInvalidField(fieldKey);
    setErrorMessage(message);
    requestAnimationFrame(() => {
      if (targetRef?.current) {
        targetRef.current.focus();
      } else {
        errorSummaryRef.current?.focus();
      }
    });
  };

  const fullPhone = phoneNumber ? `${dialCode} ${phoneNumber.trim()}` : "";

  const handleSubmit = async (openWhatsAppChat: boolean = true) => {
    setErrorMessage("");
    setInvalidField(null);

    if (activeTab === "travel") {
      if (travelerType === "b2b") {
        if (!agencyName.trim()) {
          raiseValidationError(
            isHy
              ? "Խնդրում ենք նշել գործակալության կամ ընկերության անվանումը"
              : "Please provide your travel agency or DMC company name",
            "agencyName",
            agencyNameRef
          );
          return;
        }
        if (!fullName.trim()) {
          raiseValidationError(
            isHy
              ? "Խնդրում ենք նշել կոնտակտային անձի կամ գործակալի անունը"
              : "Please provide the contact person / agent name",
            "fullName",
            personNameRef
          );
          return;
        }
      } else if (!fullName.trim()) {
        raiseValidationError(
          isHy ? "Խնդրում ենք լրացնել Ձեր անունը" : "Please enter your name",
          "fullName",
          personNameRef
        );
        return;
      }

      if (!phoneNumber.trim() && !email.trim()) {
        raiseValidationError(
          isHy
            ? "Խնդրում ենք նշել WhatsApp/հեռախոսահամար կամ էլ. փոստ"
            : "Please provide either a WhatsApp / phone number or email address",
          "phoneNumber",
          phoneInputRef
        );
        return;
      }
    } else if (activeTab === "candidate") {
      if (!fullName.trim()) {
        raiseValidationError(
          isHy ? "Խնդրում ենք լրացնել անունը" : "Please enter your name",
          "fullName",
          personNameRef
        );
        return;
      }
      if (!phoneNumber.trim()) {
        raiseValidationError(
          isHy
            ? "Խնդրում ենք նշել WhatsApp հեռախոսահամար"
            : "Please provide your WhatsApp number",
          "phoneNumber",
          phoneInputRef
        );
        return;
      }
      if (!targetRole.trim()) {
        raiseValidationError(
          isHy
            ? "Խնդրում ենք նշել աշխատանքի ոլորտը"
            : "Please specify target role or sector",
          "targetRole",
          targetRoleRef
        );
        return;
      }
      if (!candidateConsent) {
        raiseValidationError(
          isHy
            ? "Խնդրում ենք հաստատել համաձայնությունը աշխատանքի տեղավորման պայմաններին"
            : "Please confirm acknowledgment of our placement and work permit policy.",
          "consent",
          consentRef
        );
        return;
      }
    } else if (activeTab === "employer") {
      if (!companyName.trim()) {
        raiseValidationError(
          isHy ? "Խնդրում ենք նշել ընկերության անվանումը" : "Please enter company name",
          "companyName",
          companyNameRef
        );
        return;
      }
      if (!contactPerson.trim()) {
        raiseValidationError(
          isHy ? "Խնդրում ենք նշել կոնտակտային անձին" : "Please enter contact person name",
          "fullName",
          personNameRef
        );
        return;
      }
      if (!email.trim() && !phoneNumber.trim()) {
        raiseValidationError(
          isHy
            ? "Խնդրում ենք նշել կորպորատիվ էլ. փոստ կամ հեռախոս"
            : "Please provide corporate email or phone",
          "phoneNumber",
          phoneInputRef
        );
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("inquiryType", activeTab);
      formData.append("fullName", activeTab === "employer" ? contactPerson : fullName);
      formData.append("email", email);
      formData.append("phone", fullPhone);
      formData.append("notes", notes);
      formData.append("locale", locale);
      if (companyWebsiteHp) {
        formData.append("companyWebsiteHp", companyWebsiteHp);
      }

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
        formData.append("experienceLevel", experienceLevel);
        formData.append("primaryLanguage", primaryLanguage);
        formData.append("candidateStatus", candidateStatus);
        if (cvFile) {
          formData.append("cvFile", cvFile);
        }
      } else if (activeTab === "employer") {
        formData.append("companyName", companyName);
        formData.append("contactPerson", contactPerson);
        formData.append("employerJurisdiction", employerJurisdiction);
        formData.append("industrySector", industrySector);
        formData.append("headcountRequired", headcountRequired);
        formData.append("employerUrgency", employerUrgency);
        formData.append("employerHousing", employerHousing);
      }

      const response = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error ||
            (isHy
              ? "Սխալ է տեղի ունեցել: Փորձեք կրկին:"
              : "Submission failed. Please try again.")
        );
      }

      const waUrl = buildCurrentWhatsAppUrl(fullPhone, cvFile?.name);
      setSubmittedSnapshot({ waUrl });
      setNotes("");
      setCvFile(null);

      if (openWhatsAppChat) {
        window.open(waUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setErrorMessage(msg);
      requestAnimationFrame(() => {
        errorSummaryRef.current?.focus();
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="concierge-drawer-title"
      onCancel={(e) => {
        e.preventDefault();
        closeTopLayer();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) {
          closeTopLayer();
        }
      }}
      onClose={() => {
        if (state.isOpen) closeDrawer();
      }}
      className="concierge-dialog border-l border-brand-stone-300 shadow-2xl"
      {...({ closedby: "any" } as Record<string, string>)}
    >
      <div className="w-full h-full bg-brand-stone-50 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-5 border-b border-brand-stone-200 bg-white shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-olive shrink-0" />
            <div>
              <h2
                id="concierge-drawer-title"
                className="font-serif text-base sm:text-xl font-bold text-brand-forest"
              >
                {activeTab === "travel"
                  ? isHy
                    ? "Երևանի Տուրիստական և B2B Դեսկ"
                    : "Yerevan Travel Concierge & B2B Desk"
                  : isHy
                  ? "Ուղիղ կապ Երևանի գրասենյակի հետ"
                  : "Direct Yerevan Operations Desk"}
              </h2>
              <p className="text-[11px] sm:text-xs text-brand-ink-muted">
                {isHy
                  ? siteSettings.company.workingHours_hy
                  : siteSettings.company.workingHours_en}
              </p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeTopLayer}
            aria-label={isHy ? "Փակել պատուհանը" : "Close inquiry drawer"}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-brand-ink-muted hover:text-brand-forest hover:bg-brand-stone-100 transition-colors duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div
          role="tablist"
          aria-label={isHy ? "Հարցման բաժիններ" : "Inquiry desk channels"}
          className="grid grid-cols-3 p-1.5 sm:p-2 bg-brand-stone-100 border-b border-brand-stone-200 gap-1 text-xs font-medium shrink-0"
        >
          <button
            id="tab-travel"
            type="button"
            role="tab"
            aria-selected={activeTab === "travel"}
            aria-controls="concierge-tabpanel"
            tabIndex={activeTab === "travel" ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                setActiveTab("candidate");
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                setActiveTab("employer");
              }
            }}
            onClick={() => {
              setActiveTab("travel");
              setSubmittedSnapshot(null);
              setErrorMessage("");
              setInvalidField(null);
            }}
            className={`min-h-[42px] sm:min-h-[44px] py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-xl transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-center cursor-pointer ${
              activeTab === "travel"
                ? "bg-white text-brand-forest shadow-sm font-semibold"
                : "text-brand-ink-muted hover:text-brand-forest hover:bg-white/60"
            }`}
          >
            <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-olive-text shrink-0" />
            <span className="truncate max-w-full text-[11px] sm:text-xs">
              {isHy ? "Տուրիզմ" : "Travel & Tours"}
            </span>
          </button>

          <button
            id="tab-candidate"
            type="button"
            role="tab"
            aria-selected={activeTab === "candidate"}
            aria-controls="concierge-tabpanel"
            tabIndex={activeTab === "candidate" ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                setActiveTab("employer");
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                setActiveTab("travel");
              }
            }}
            onClick={() => {
              setActiveTab("candidate");
              setSubmittedSnapshot(null);
              setErrorMessage("");
              setInvalidField(null);
            }}
            className={`min-h-[42px] sm:min-h-[44px] py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-xl transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-center cursor-pointer ${
              activeTab === "candidate"
                ? "bg-white text-brand-forest shadow-sm font-semibold"
                : "text-brand-ink-muted hover:text-brand-forest hover:bg-white/60"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-olive-text shrink-0" />
            <span className="truncate max-w-full text-[11px] sm:text-xs">
              {isHy ? "Թեկնածու" : "Candidate (CV)"}
            </span>
          </button>

          <button
            id="tab-employer"
            type="button"
            role="tab"
            aria-selected={activeTab === "employer"}
            aria-controls="concierge-tabpanel"
            tabIndex={activeTab === "employer" ? 0 : -1}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                setActiveTab("travel");
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                setActiveTab("candidate");
              }
            }}
            onClick={() => {
              setActiveTab("employer");
              setSubmittedSnapshot(null);
              setErrorMessage("");
              setInvalidField(null);
            }}
            className={`min-h-[42px] sm:min-h-[44px] py-1.5 sm:py-2 px-1.5 sm:px-2 rounded-xl transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-1.5 text-center cursor-pointer ${
              activeTab === "employer"
                ? "bg-white text-brand-forest shadow-sm font-semibold"
                : "text-brand-ink-muted hover:text-brand-forest hover:bg-white/60"
            }`}
          >
            <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-olive-text shrink-0" />
            <span className="truncate max-w-full text-[11px] sm:text-xs">
              {isHy ? "Գործատու" : "Hire Staff"}
            </span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div
          id="concierge-tabpanel"
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-5"
        >
          {/* Zero-Form Direct WhatsApp Fallback Banner */}
          {!submittedSnapshot && (
            <div className="p-3 sm:p-3.5 rounded-2xl bg-white border border-brand-stone-200/90 shadow-2xs flex items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#25D366]/15 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25D366]" />
                </span>
                <p className="text-xs text-brand-ink leading-tight truncate">
                  <span className="font-semibold block text-brand-forest">
                    {isHy ? "Չե՞ք ցանկանում լրացնել ձևաթուղթը" : "Prefer not to fill this form?"}
                  </span>
                  <span className="text-brand-ink-muted text-xs">
                    {isHy ? "Գրեք մեզ անմիջապես WhatsApp-ով" : "Message our Yerevan desk directly"}
                  </span>
                </p>
              </div>

              <a
                href={buildCurrentWhatsAppUrl(fullPhone)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeTopLayer}
                className="shrink-0 min-h-[38px] px-3.5 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-all active:scale-95 duration-200 flex items-center gap-1.5 shadow-2xs"
              >
                <span>WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {submittedSnapshot ? (
            <div className="p-8 rounded-2xl bg-brand-olive-subtle/60 border border-brand-olive/40 text-center space-y-4 my-auto shadow-sm">
              <CheckCircle2 className="w-14 h-14 text-brand-olive-text mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-brand-forest">
                {isHy ? "Ձեր հարցումը հաջողությամբ ուղարկված է" : "Inquiry Dispatched Successfully"}
              </h3>
              <p className="text-sm text-brand-ink-muted max-w-md mx-auto leading-relaxed">
                {isHy
                  ? "Մեր մասնագետը կկապվի Ձեզ հետ նշված հեռախոսահամարով կամ էլ. փոստով: Կարող եք նաև անմիջապես գրել WhatsApp-ով:"
                  : "The Yerevan desk has received your details. A representative will review and respond promptly. You may also connect directly via WhatsApp."}
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={submittedSnapshot.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-forest text-white font-semibold hover:bg-brand-forest-deep transition-all active:scale-95 duration-200 text-sm shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>{isHy ? "Բացել WhatsApp չատը" : "Open WhatsApp Chat"}</span>
                </a>
                <button
                  type="button"
                  onClick={closeTopLayer}
                  className="min-h-[44px] inline-flex items-center justify-center px-5 py-3 rounded-xl border border-brand-stone-300 bg-white text-brand-forest hover:bg-brand-stone-100 transition-all active:scale-95 duration-200 text-sm font-medium cursor-pointer shadow-sm"
                >
                  <span>{isHy ? "Փակել" : "Close Window"}</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Trust/Policy Notice banner based on tab */}
              {activeTab === "candidate" && (
                <div className="p-4 rounded-xl bg-brand-olive-subtle border border-brand-olive/40 flex items-start gap-3 text-xs text-brand-forest shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-brand-olive-text shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-brand-forest mb-0.5">
                      {isHy
                        ? "Օրինական Աշխատանքի Թույլտվություն և Պայմանագիր"
                        : "Legal Work Permits & Verified Contracts"}
                    </span>
                    <span className="text-brand-ink-muted leading-normal">
                      {isHy
                        ? "Դիմումների ընդունումը և նախնական հարցազրույցներն անցկացվում են անմիջապես Երևանի մեր գրասենյակի կողմից՝ ՀՀ աշխատանքային օրենսդրությանը համապատասխան:"
                        : "Candidate intake and vetting are conducted directly by our Yerevan desk in full compliance with Republic of Armenia labor migration standards."}
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "employer" && (
                <div className="p-4 rounded-xl bg-brand-stone-100 border border-brand-stone-200 flex items-start gap-3 text-xs text-brand-ink-muted shadow-sm">
                  <Building className="w-5 h-5 text-brand-forest shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-brand-forest mb-0.5">
                      {isHy
                        ? "Կորպորատիվ հավաքագրում և աշխատանքային վիզաներ"
                        : "B2B Staffing & Work Permit Administration"}
                    </span>
                    <span className="leading-normal">
                      {isHy
                        ? "Լրացրեք պահանջվող մասնագետների թիվը և ոլորտը: Մեր թիմը կպատրաստի թեկնածուների նախնական ցանկ:"
                        : "Tell us your industry and required headcount. Our Yerevan HR desk will source, vet, and present shortlisted candidate profiles."}
                    </span>
                  </div>
                </div>
              )}

              {/* Form Inputs Container */}
              <div className="space-y-4 text-sm">
                {/* Mode-Specific Header Fields: Travel Context Card & Persona Switcher */}
                {activeTab === "travel" && (
                  <TravelInquiryFields
                    section="top"
                    isHy={isHy}
                    travelerType={travelerType}
                    setTravelerType={setTravelerType}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    isChangingService={isChangingService}
                    setIsChangingService={setIsChangingService}
                    agencyName={agencyName}
                    setAgencyName={setAgencyName}
                    agencyCountry={agencyCountry}
                    setAgencyCountry={setAgencyCountry}
                    agencyNameRef={agencyNameRef}
                    invalidField={invalidField}
                    b2bScope={b2bScope}
                    setB2bScope={setB2bScope}
                    travelDates={travelDates}
                    setTravelDates={setTravelDates}
                    budgetTier={budgetTier}
                    setBudgetTier={setBudgetTier}
                    guestsCount={guestsCount}
                    setGuestsCount={setGuestsCount}
                    accommodationTier={accommodationTier}
                    setAccommodationTier={setAccommodationTier}
                    fleetTier={fleetTier}
                    setFleetTier={setFleetTier}
                    tours={tours}
                    travelServices={travelServices}
                  />
                )}

                {/* Company Name if Employer */}
                {activeTab === "employer" && (
                  <EmployerInquiryFields
                    section="top"
                    isHy={isHy}
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    companyNameRef={companyNameRef}
                    invalidField={invalidField}
                    industrySector={industrySector}
                    setIndustrySector={setIndustrySector}
                    headcountRequired={headcountRequired}
                    setHeadcountRequired={setHeadcountRequired}
                    employerJurisdiction={employerJurisdiction}
                    setEmployerJurisdiction={setEmployerJurisdiction}
                    employerUrgency={employerUrgency}
                    setEmployerUrgency={setEmployerUrgency}
                    employerHousing={employerHousing}
                    setEmployerHousing={setEmployerHousing}
                  />
                )}

                {/* Contact Person / Full Name */}
                <div>
                  <label
                    htmlFor="personNameInput"
                    className="block text-xs font-semibold text-brand-forest mb-1.5"
                  >
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
                    ref={personNameRef}
                    id="personNameInput"
                    type="text"
                    autoComplete="name"
                    maxLength={200}
                    required
                    aria-invalid={invalidField === "fullName"}
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
                    className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-brand-olive focus:border-transparent text-base sm:text-sm text-brand-ink shadow-sm transition-colors duration-200 ${
                      invalidField === "fullName" ? "border-[#B43C30]" : "border-brand-stone-300"
                    }`}
                  />
                </div>

                {/* International Phone with Accessible SVG Flag Picker */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="contactPhoneInput"
                      className="text-xs font-semibold text-brand-forest"
                    >
                      {isHy ? "Հեռախոսահամար / WhatsApp *" : "WhatsApp / Mobile Number *"}
                    </label>
                    <span className="text-xs text-brand-ink-subtle">
                      {isHy ? "Արագ կապի համար" : "Preferred for instant desk reply"}
                    </span>
                  </div>
                  <PhoneCountryInput
                    inputId="contactPhoneInput"
                    inputRef={phoneInputRef}
                    ariaDescribedBy="contactPhoneHint"
                    ariaInvalid={invalidField === "phoneNumber"}
                    dialCode={dialCode}
                    onDialCodeChange={setDialCode}
                    phoneNumber={phoneNumber}
                    onPhoneNumberChange={setPhoneNumber}
                    isHy={isHy}
                  />
                  <p id="contactPhoneHint" className="text-xs text-brand-ink-subtle mt-1.5">
                    {isHy
                      ? "Մենք կուղարկենք հաստատումը WhatsApp-ով կամ SMS-ով:"
                      : "Direct desk routing for prompt confirmation via WhatsApp or phone."}
                  </p>
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="contactEmailInput"
                    className="block text-xs font-semibold text-brand-forest mb-1.5"
                  >
                    {isHy ? "Էլ. Փոստի հասցե" : "Email Address"}
                  </label>
                  <input
                    id="contactEmailInput"
                    type="email"
                    autoComplete="email"
                    maxLength={200}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-olive focus:border-transparent text-base sm:text-sm text-brand-ink shadow-sm"
                  />
                </div>

                {/* Mode-Specific Detail Blocks: Travel B2B & Individual Options */}
                {activeTab === "travel" && (
                  <TravelInquiryFields
                    section="details"
                    isHy={isHy}
                    travelerType={travelerType}
                    setTravelerType={setTravelerType}
                    selectedService={selectedService}
                    setSelectedService={setSelectedService}
                    isChangingService={isChangingService}
                    setIsChangingService={setIsChangingService}
                    agencyName={agencyName}
                    setAgencyName={setAgencyName}
                    agencyCountry={agencyCountry}
                    setAgencyCountry={setAgencyCountry}
                    agencyNameRef={agencyNameRef}
                    invalidField={invalidField}
                    b2bScope={b2bScope}
                    setB2bScope={setB2bScope}
                    travelDates={travelDates}
                    setTravelDates={setTravelDates}
                    budgetTier={budgetTier}
                    setBudgetTier={setBudgetTier}
                    guestsCount={guestsCount}
                    setGuestsCount={setGuestsCount}
                    accommodationTier={accommodationTier}
                    setAccommodationTier={setAccommodationTier}
                    fleetTier={fleetTier}
                    setFleetTier={setFleetTier}
                    tours={tours}
                    travelServices={travelServices}
                  />
                )}

                {/* Mode-Specific Fields: Candidate */}
                {activeTab === "candidate" && (
                  <CandidateInquiryFields
                    isHy={isHy}
                    nationality={nationality}
                    setNationality={setNationality}
                    currentCountry={currentCountry}
                    setCurrentCountry={setCurrentCountry}
                    targetRole={targetRole}
                    setTargetRole={setTargetRole}
                    isChangingRole={isChangingRole}
                    setIsChangingRole={setIsChangingRole}
                    targetRoleRef={targetRoleRef}
                    invalidField={invalidField}
                    cvFile={cvFile}
                    setCvFile={setCvFile}
                    handleCvFileChange={handleCvFileChange}
                    experienceLevel={experienceLevel}
                    setExperienceLevel={setExperienceLevel}
                    primaryLanguage={primaryLanguage}
                    setPrimaryLanguage={setPrimaryLanguage}
                    candidateStatus={candidateStatus}
                    setCandidateStatus={setCandidateStatus}
                    candidateConsent={candidateConsent}
                    setCandidateConsent={setCandidateConsent}
                    consentRef={consentRef}
                  />
                )}

                {/* Mode-Specific Fields: Employer */}
                {activeTab === "employer" && (
                  <EmployerInquiryFields
                    section="details"
                    isHy={isHy}
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    companyNameRef={companyNameRef}
                    invalidField={invalidField}
                    industrySector={industrySector}
                    setIndustrySector={setIndustrySector}
                    headcountRequired={headcountRequired}
                    setHeadcountRequired={setHeadcountRequired}
                    employerJurisdiction={employerJurisdiction}
                    setEmployerJurisdiction={setEmployerJurisdiction}
                    employerUrgency={employerUrgency}
                    setEmployerUrgency={setEmployerUrgency}
                    employerHousing={employerHousing}
                    setEmployerHousing={setEmployerHousing}
                  />
                )}

                {/* Additional Notes / Requirements */}
                <div>
                  <label
                    htmlFor="additionalNotesInput"
                    className="block text-xs font-semibold text-brand-forest mb-1.5"
                  >
                    {isHy ? "Լրացուցիչ նշումներ կամ պահանջներ" : "Additional Notes or Specific Requests"}
                  </label>
                  <textarea
                    id="additionalNotesInput"
                    rows={3}
                    maxLength={3000}
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
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-olive focus:border-transparent text-base sm:text-sm text-brand-ink resize-none shadow-sm"
                  />
                </div>

                {/* Invisible spam-trap honeypot (non-tabbable & inert to assistive tech) */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden opacity-0 pointer-events-none"
                >
                  <label htmlFor="concierge-hp-fax-url">Leave empty</label>
                  <input
                    id="concierge-hp-fax-url"
                    name="companyWebsiteHp"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={companyWebsiteHp}
                    onChange={(e) => setCompanyWebsiteHp(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions + Single Live Validation Region */}
        {!submittedSnapshot && (
          <div className="p-4 sm:p-5 border-t border-brand-stone-200 bg-white space-y-2.5 shrink-0">
            <div
              ref={errorSummaryRef}
              role="alert"
              aria-live="polite"
              tabIndex={errorMessage ? -1 : undefined}
              className={
                errorMessage
                  ? "p-3 rounded-xl bg-[#FDF2F0] border border-[#D98278] text-[#7D241C] text-xs flex items-start gap-2"
                  : "sr-only"
              }
            >
              {errorMessage && (
                <>
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="font-medium leading-snug">{errorMessage}</span>
                </>
              )}
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit(true)}
              className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-brand-forest text-white font-semibold hover:bg-brand-forest-deep transition-all active:scale-98 duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer text-sm"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
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
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl border border-brand-stone-300 bg-brand-stone-50 text-brand-forest hover:bg-white hover:border-brand-olive-dark transition-all active:scale-98 duration-200 flex items-center justify-center gap-2 text-xs font-semibold disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isHy ? "Ուղարկել միայն էլ. փոստով" : "Send Official Inquiry by Email Only"}</span>
            </button>

            <p className="text-center text-[11px] text-brand-ink-subtle pt-0.5">
              {isHy ? (
                <>
                  Ուղարկելով՝ Դուք համաձայնում եք մեր{" "}
                  <Link
                    href="/privacy"
                    onClick={closeTopLayer}
                    className="underline hover:text-brand-forest transition-colors"
                  >
                    Գաղտնիության քաղաքականությանը
                  </Link>
                  :
                </>
              ) : (
                <>
                  By submitting, you agree to our{" "}
                  <Link
                    href="/privacy"
                    onClick={closeTopLayer}
                    className="underline hover:text-brand-forest transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  .
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </dialog>
  );
}

export default ConciergeDrawer;
