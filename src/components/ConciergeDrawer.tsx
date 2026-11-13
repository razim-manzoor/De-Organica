"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
  Trash2,
  Car,
  Wine,
  Building2,
  Sparkles,
} from "lucide-react";
import { PhoneCountryInput } from "@/components/PhoneCountryInput";

const MAX_CV_BYTES = 4 * 1024 * 1024;
const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

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

type InvalidFieldKey =
  | "agencyName"
  | "companyName"
  | "fullName"
  | "phoneNumber"
  | "targetRole"
  | "cvFile"
  | "consent"
  | null;

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
  const [candidateZeroFeeConsent, setCandidateZeroFeeConsent] = useState(true);

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
      if (!candidateZeroFeeConsent) {
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
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-stone-200 bg-white shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-olive shrink-0" />
            <div>
              <h2
                id="concierge-drawer-title"
                className="font-serif text-lg sm:text-xl font-bold text-brand-forest"
              >
                {activeTab === "travel"
                  ? isHy
                    ? "Երևանի Տուրիստական և B2B Դեսկ"
                    : "Yerevan Travel Concierge & B2B Desk"
                  : isHy
                  ? "Ուղիղ կապ Երևանի գրասենյակի հետ"
                  : "Direct Yerevan Operations Desk"}
              </h2>
              <p className="text-xs text-brand-ink-muted">
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
          className="grid grid-cols-3 p-2 bg-brand-stone-100 border-b border-brand-stone-200 gap-1.5 text-xs font-medium shrink-0"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "travel"}
            onClick={() => {
              setActiveTab("travel");
              setSubmittedSnapshot(null);
              setErrorMessage("");
              setInvalidField(null);
            }}
            className={`min-h-[44px] py-2 px-2 rounded-xl transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center cursor-pointer ${
              activeTab === "travel"
                ? "bg-white text-brand-forest shadow-sm font-semibold"
                : "text-brand-ink-muted hover:text-brand-forest hover:bg-white/60"
            }`}
          >
            <Compass className="w-4 h-4 text-brand-olive-text shrink-0" />
            <span>{isHy ? "Տուրիզմ և DMC" : "Travel & Tours"}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "candidate"}
            onClick={() => {
              setActiveTab("candidate");
              setSubmittedSnapshot(null);
              setErrorMessage("");
              setInvalidField(null);
            }}
            className={`min-h-[44px] py-2 px-2 rounded-xl transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center cursor-pointer ${
              activeTab === "candidate"
                ? "bg-white text-brand-forest shadow-sm font-semibold"
                : "text-brand-ink-muted hover:text-brand-forest hover:bg-white/60"
            }`}
          >
            <Briefcase className="w-4 h-4 text-brand-olive-text shrink-0" />
            <span>{isHy ? "Թեկնածու (CV)" : "Candidate (CV)"}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "employer"}
            onClick={() => {
              setActiveTab("employer");
              setSubmittedSnapshot(null);
              setErrorMessage("");
              setInvalidField(null);
            }}
            className={`min-h-[44px] py-2 px-2 rounded-xl transition-colors duration-200 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center cursor-pointer ${
              activeTab === "employer"
                ? "bg-white text-brand-forest shadow-sm font-semibold"
                : "text-brand-ink-muted hover:text-brand-forest hover:bg-white/60"
            }`}
          >
            <Building className="w-4 h-4 text-brand-olive-text shrink-0" />
            <span>{isHy ? "Գործատու" : "Hire Staff"}</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
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
                  className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-forest text-white font-semibold hover:bg-brand-forest-deep transition-colors duration-200 text-sm shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-brand-olive-onDark" />
                  <span>{isHy ? "Բացել WhatsApp չատը" : "Open WhatsApp Chat"}</span>
                </a>
                <button
                  type="button"
                  onClick={closeTopLayer}
                  className="min-h-[44px] inline-flex items-center justify-center px-5 py-3 rounded-xl border border-brand-stone-300 bg-white text-brand-forest hover:bg-brand-stone-100 text-sm font-medium transition-colors duration-200 cursor-pointer shadow-sm"
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
                {/* Mode-Specific Header Fields: Travel Context Card */}
                {activeTab === "travel" && (
                  <>
                    {selectedService && !isChangingService ? (
                      <div className="p-3.5 rounded-2xl bg-brand-stone-100 border border-brand-stone-200/90 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-brand-forest text-brand-olive-onDark flex items-center justify-center shrink-0 shadow-sm">
                            <Compass className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-olive-text block">
                              {isHy ? "Ընտրված Ուղղություն / Ծրագիր" : "Selected Expedition Context"}
                            </span>
                            <span className="text-sm font-serif font-bold text-brand-forest block leading-snug">
                              {selectedService}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsChangingService(true)}
                          className="text-xs font-semibold text-brand-olive-text hover:text-brand-forest transition-colors underline cursor-pointer shrink-0 ml-2 px-2 py-1"
                        >
                          {isHy ? "Փոխել" : "Change"}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label
                            htmlFor="travelServiceSelect"
                            className="text-xs font-semibold text-brand-forest"
                          >
                            {isHy
                              ? "Ընտրեք տուրը կամ ծառայությունը"
                              : "Choose Itinerary or Ground Service"}
                          </label>
                          {selectedService && (
                            <button
                              type="button"
                              onClick={() => setIsChangingService(false)}
                              className="text-xs text-brand-olive-text font-semibold underline cursor-pointer"
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
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs sm:text-sm font-medium text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-olive shadow-sm"
                        >
                          <option value="">
                            {isHy ? "Ընտրեք ցանկից կամ նշեք ստորև" : "Select from list or describe below"}
                          </option>
                          <optgroup label={isHy ? "Հեղինակային Երթուղիներ" : "Signature Tour Packages"}>
                            {tours.map((t) => (
                              <option key={t.id} value={t.title_en}>
                                {isHy ? t.title_hy : t.title_en} ({t.duration_en})
                              </option>
                            ))}
                          </optgroup>
                          <optgroup
                            label={
                              isHy ? "Տեղական Լոգիստիկա և Սպասարկում" : "Ground Operations & Fleet"
                            }
                          >
                            {travelServices.map((s) => (
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
                        aria-pressed={travelerType === "individual"}
                        onClick={() => setTravelerType("individual")}
                        className={`flex-1 min-h-[40px] py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                          travelerType === "individual"
                            ? "bg-white text-brand-forest shadow-sm font-bold"
                            : "text-brand-ink-muted hover:text-brand-forest"
                        }`}
                      >
                        <Users className="w-3.5 h-3.5 text-brand-olive-text" />
                        <span>{isHy ? "Մասնավոր / Ընտանեկան" : "Private Traveler / Family"}</span>
                      </button>
                      <button
                        type="button"
                        aria-pressed={travelerType === "b2b"}
                        onClick={() => setTravelerType("b2b")}
                        className={`flex-1 min-h-[40px] py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                          travelerType === "b2b"
                            ? "bg-white text-brand-forest shadow-sm font-bold"
                            : "text-brand-ink-muted hover:text-brand-forest"
                        }`}
                      >
                        <Building2 className="w-3.5 h-3.5 text-brand-olive-text" />
                        <span>{isHy ? "B2B Տուրօպերատոր / DMC" : "B2B Travel Agent / DMC"}</span>
                      </button>
                    </div>
                  </>
                )}

                {/* Agency fields if B2B Travel */}
                {activeTab === "travel" && travelerType === "b2b" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label
                        htmlFor="agencyNameInput"
                        className="block text-xs font-semibold text-brand-forest mb-1.5"
                      >
                        {isHy ? "Գործակալության / Ընկերության անվանումը *" : "Travel Agency / Company *"}
                      </label>
                      <input
                        ref={agencyNameRef}
                        id="agencyNameInput"
                        type="text"
                        required
                        aria-invalid={invalidField === "agencyName"}
                        value={agencyName}
                        onChange={(e) => setAgencyName(e.target.value)}
                        placeholder={isHy ? "օրինակ՝ Dubai Travel LLC" : "e.g. Odyssey Holidays / GCC DMC"}
                        className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border bg-white text-xs sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none ${
                          invalidField === "agencyName" ? "border-[#B43C30]" : "border-brand-stone-300"
                        }`}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="agencyCountryInput"
                        className="block text-xs font-semibold text-brand-forest mb-1.5"
                      >
                        {isHy ? "Գործունեության երկիրը" : "Agency Country of Origin"}
                      </label>
                      <input
                        id="agencyCountryInput"
                        type="text"
                        value={agencyCountry}
                        onChange={(e) => setAgencyCountry(e.target.value)}
                        placeholder={isHy ? "օրինակ՝ ԱՄԷ, Հնդկաստան, ՌԴ" : "e.g. UAE / India / Germany / USA"}
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Company Name if Employer */}
                {activeTab === "employer" && (
                  <div>
                    <label
                      htmlFor="employerCompanyNameInput"
                      className="block text-xs font-semibold text-brand-forest mb-1.5"
                    >
                      {isHy ? "Ընկերության անվանումը *" : "Company / Enterprise Name *"}
                    </label>
                    <input
                      ref={companyNameRef}
                      id="employerCompanyNameInput"
                      type="text"
                      required
                      aria-invalid={invalidField === "companyName"}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={
                        isHy ? "օրինակ՝ Արմենիա Հյուրանոցային Խումբ" : "e.g. Yerevan Construction Group LLC"
                      }
                      className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-brand-olive focus:border-transparent text-brand-ink shadow-sm transition-colors duration-200 ${
                        invalidField === "companyName" ? "border-[#B43C30]" : "border-brand-stone-300"
                      }`}
                    />
                  </div>
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
                    className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-brand-olive focus:border-transparent text-brand-ink shadow-sm transition-colors duration-200 ${
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
                      {isHy ? "կամ էլ. փոստ ստորև" : "or email below"}
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
                      : "We route inquiries directly to our Yerevan WhatsApp dispatch desk."}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-olive focus:border-transparent text-brand-ink shadow-sm"
                  />
                </div>

                {/* Mode-Specific Detail Blocks: Travel B2B */}
                {activeTab === "travel" && travelerType === "b2b" && (
                  <div className="space-y-3.5 pt-1">
                    <div>
                      <span className="block text-xs font-semibold text-brand-forest mb-1.5">
                        {isHy ? "Նախատեսվող ներգնա ծավալը" : "Expected Inbound Group Scope"}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        {B2B_SCOPES.map((scope) => (
                          <button
                            key={scope.id}
                            type="button"
                            aria-pressed={b2bScope === scope.id}
                            onClick={() => setB2bScope(scope.id)}
                            className={`p-2.5 rounded-xl border text-left transition-colors duration-200 cursor-pointer ${
                              b2bScope === scope.id
                                ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-sm"
                                : "bg-white border-brand-stone-200 text-brand-ink-muted hover:border-brand-olive/50"
                            }`}
                          >
                            <span className="block font-bold leading-tight">
                              {isHy ? scope.label_hy : scope.label_en}
                            </span>
                            <span
                              className={`text-xs block leading-tight mt-0.5 ${
                                b2bScope === scope.id
                                  ? "text-brand-olive-onDark"
                                  : "text-brand-ink-subtle"
                              }`}
                            >
                              {isHy ? scope.desc_hy : scope.desc_en}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="b2bTravelDatesInput"
                        className="text-xs font-semibold text-brand-forest mb-1.5 flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-brand-olive-text" />
                        <span>
                          {isHy ? "Նախատեսվող սեզոն կամ ամսաթիվ" : "Estimated Travel Window or Series Season"}
                        </span>
                      </label>
                      <input
                        id="b2bTravelDatesInput"
                        type="text"
                        value={travelDates}
                        onChange={(e) => setTravelDates(e.target.value)}
                        placeholder={
                          isHy
                            ? "օրինակ՝ Գարուն 2026 / Սեպտեմբեր-Հոկտեմբեր"
                            : "e.g. Spring 2026 Series / Autumn Harvest / Monthly Departures"
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs sm:text-sm text-brand-ink shadow-sm"
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
                        <span className="text-xs font-semibold text-brand-forest flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-brand-olive-text" />
                          <span>{isHy ? "Ճամփորդության ոճը և բյուջեն" : "Travel Style & Budget Category"}</span>
                        </span>
                        <span className="text-xs font-mono text-brand-olive-text font-bold">
                          {budgetTier}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs">
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
                            sub_hy: "4★, շոֆեր",
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
                            aria-pressed={budgetTier === b.id}
                            onClick={() => {
                              setBudgetTier(b.id);
                              setAccommodationTier(b.lodging);
                              setFleetTier(b.fleet);
                            }}
                            className={`p-2.5 rounded-xl border text-left transition-colors duration-200 cursor-pointer ${
                              budgetTier === b.id
                                ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-sm"
                                : "bg-white border-brand-stone-200 text-brand-ink-muted hover:border-brand-olive/50"
                            }`}
                          >
                            <span className="block font-bold leading-tight">
                              {isHy ? b.label_hy : b.label_en}
                            </span>
                            <span
                              className={`text-xs block mt-0.5 ${
                                budgetTier === b.id
                                  ? "text-brand-olive-onDark"
                                  : "text-brand-ink-subtle"
                              }`}
                            >
                              {isHy ? b.sub_hy : b.sub_en}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Group Size with Quick Chips + Direct Numeric Entry */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="guestsCountInput"
                          className="text-xs font-semibold text-brand-forest flex items-center gap-1.5"
                        >
                          <Users className="w-3.5 h-3.5 text-brand-olive-text" />
                          <span>{isHy ? "Հյուրերի թիվը" : "Group Size / Guests"}</span>
                        </label>
                        <div className="flex items-center gap-1.5">
                          <input
                            id="guestsCountInput"
                            type="number"
                            min="1"
                            max="150"
                            value={guestsCount}
                            onChange={(e) => setGuestsCount(e.target.value)}
                            className="w-16 px-2 py-1 rounded-lg border border-brand-stone-300 bg-white text-xs font-bold font-mono text-center text-brand-forest focus:ring-1 focus:ring-brand-olive"
                          />
                          <span className="text-xs font-mono text-brand-olive-text font-bold">
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
                            aria-pressed={guestsCount === g.val}
                            onClick={() => setGuestsCount(g.val)}
                            className={`py-2 px-2 rounded-lg border text-center transition-colors duration-200 cursor-pointer ${
                              guestsCount === g.val
                                ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-sm"
                                : "bg-white border-brand-stone-200 text-brand-forest hover:bg-brand-stone-50"
                            }`}
                          >
                            <span className="block text-xs font-bold leading-tight">{g.label}</span>
                            <span
                              className={`text-xs block leading-none mt-0.5 ${
                                guestsCount === g.val
                                  ? "text-brand-olive-onDark"
                                  : "text-brand-ink-subtle"
                              }`}
                            >
                              {g.sub}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Travel Dates */}
                    <div>
                      <label
                        htmlFor="individualTravelDatesInput"
                        className="text-xs font-semibold text-brand-forest mb-1.5 flex items-center gap-1.5"
                      >
                        <Calendar className="w-3.5 h-3.5 text-brand-olive-text" />
                        <span>
                          {isHy ? "Նախատեսվող ամսաթիվ կամ սեզոն" : "Estimated Travel Dates or Season"}
                        </span>
                      </label>
                      <input
                        id="individualTravelDatesInput"
                        type="text"
                        value={travelDates}
                        onChange={(e) => setTravelDates(e.target.value)}
                        placeholder={
                          isHy
                            ? "օրինակ՝ Հոկտեմբեր 15-22 / Աշուն 2026"
                            : "e.g. Oct 15–22 / Autumn Wine Season / Next Month"
                        }
                        className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs sm:text-sm text-brand-ink shadow-sm"
                      />
                    </div>

                    {/* Accommodation Style Preference */}
                    <div>
                      <span className="text-xs font-semibold text-brand-forest mb-1.5 flex items-center gap-1.5">
                        <Wine className="w-3.5 h-3.5 text-brand-olive-text" />
                        <span>{isHy ? "Հյուրանոցի / Տեղավորման նախասիրություն" : "Lodging & Experience Preference"}</span>
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {LODGING_TIERS.map((tier) => (
                          <button
                            key={tier.id}
                            type="button"
                            aria-pressed={accommodationTier === tier.id}
                            onClick={() => setAccommodationTier(tier.id)}
                            className={`p-2.5 rounded-xl border text-left transition-colors duration-200 cursor-pointer ${
                              accommodationTier === tier.id
                                ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-sm"
                                : "bg-white border-brand-stone-200 text-brand-ink-muted hover:border-brand-olive/50"
                            }`}
                          >
                            <span className="block font-bold leading-tight">
                              {isHy ? tier.label_hy : tier.label_en}
                            </span>
                            <span
                              className={`text-xs block mt-0.5 ${
                                accommodationTier === tier.id
                                  ? "text-brand-olive-onDark"
                                  : "text-brand-ink-subtle"
                              }`}
                            >
                              {isHy ? tier.sub_hy : tier.sub_en}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Chauffeur Fleet Tier */}
                    <div>
                      <span className="text-xs font-semibold text-brand-forest mb-1.5 flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-brand-olive-text" />
                        <span>{isHy ? "Տրանսպորտային դաս" : "Chauffeur Fleet Preference"}</span>
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                        {FLEET_TIERS.map((f) => (
                          <button
                            key={f.id}
                            type="button"
                            aria-pressed={fleetTier === f.id}
                            onClick={() => setFleetTier(f.id)}
                            className={`p-2 rounded-xl border text-center transition-colors duration-200 cursor-pointer ${
                              fleetTier === f.id
                                ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-sm"
                                : "bg-white border-brand-stone-200 text-brand-ink-muted hover:border-brand-olive/50"
                            }`}
                          >
                            <span className="block font-semibold leading-tight text-xs">
                              {isHy ? f.label_hy : f.label_en}
                            </span>
                            <span
                              className={`text-xs block mt-0.5 ${
                                fleetTier === f.id
                                  ? "text-brand-olive-onDark"
                                  : "text-brand-ink-subtle"
                              }`}
                            >
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
                        <label
                          htmlFor="candidateNationalityInput"
                          className="block text-xs font-semibold text-brand-forest mb-1.5"
                        >
                          {isHy ? "Քաղաքացիություն" : "Nationality"}
                        </label>
                        <input
                          id="candidateNationalityInput"
                          type="text"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          placeholder="e.g. Indian, Filipino, Georgian"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs sm:text-sm text-brand-ink shadow-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="candidateCountryInput"
                          className="block text-xs font-semibold text-brand-forest mb-1.5"
                        >
                          {isHy ? "Ներկայիս երկիրը" : "Current Country of Residence"}
                        </label>
                        <input
                          id="candidateCountryInput"
                          type="text"
                          value={currentCountry}
                          onChange={(e) => setCurrentCountry(e.target.value)}
                          placeholder="e.g. UAE / India / Armenia"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs sm:text-sm text-brand-ink shadow-sm"
                        />
                      </div>
                    </div>

                    {targetRole && !isChangingRole ? (
                      <div className="p-3.5 rounded-2xl bg-brand-stone-100 border border-brand-stone-200/90 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-brand-forest text-brand-olive-onDark flex items-center justify-center shrink-0 shadow-sm">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-brand-olive-text block">
                              {isHy ? "Ընտրված Թափուր Հաստիք" : "Target Position Context"}
                            </span>
                            <span className="text-sm font-serif font-bold text-brand-forest block leading-snug">
                              {targetRole}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsChangingRole(true)}
                          className="text-xs font-semibold text-brand-olive-text hover:text-brand-forest transition-colors underline cursor-pointer shrink-0 ml-2 px-2 py-1"
                        >
                          {isHy ? "Փոխել" : "Change"}
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label
                            htmlFor="candidateTargetRoleInput"
                            className="text-xs font-semibold text-brand-forest"
                          >
                            {isHy ? "Ցանկալի պաշտոնը կամ ոլորտը *" : "Target Role / Industry Sector *"}
                          </label>
                          {targetRole && (
                            <button
                              type="button"
                              onClick={() => setIsChangingRole(false)}
                              className="text-xs text-brand-olive-text font-semibold underline cursor-pointer"
                            >
                              {isHy ? "Պահպանել" : "Keep Current"}
                            </button>
                          )}
                        </div>
                        <input
                          ref={targetRoleRef}
                          id="candidateTargetRoleInput"
                          type="text"
                          required
                          aria-invalid={invalidField === "targetRole"}
                          value={targetRole}
                          onChange={(e) => setTargetRole(e.target.value)}
                          placeholder="e.g. Specialty Line Cook / Heavy Machinery Operator / Driver"
                          className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border bg-white text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none ${
                            invalidField === "targetRole" ? "border-[#B43C30]" : "border-brand-stone-300"
                          }`}
                        />
                      </div>
                    )}

                    {/* CV File Upload */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="cvUploadInput"
                          className="text-xs font-semibold text-brand-forest"
                        >
                          {isHy ? "Կցել Ռեզյումե (CV / Resume)" : "Attach CV / Resume (PDF / DOCX)"}
                        </label>
                        <span className="text-xs text-brand-ink-subtle">Max 4 MB</span>
                      </div>
                      <div className="relative border-2 border-dashed border-brand-stone-300 hover:border-brand-olive-dark rounded-xl p-4 text-center transition-colors bg-brand-stone-100/60 shadow-sm">
                        <input
                          id="cvUploadInput"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          aria-invalid={invalidField === "cvFile"}
                          onChange={(e) => {
                            const selected = e.target.files?.[0] ?? null;
                            handleCvFileChange(selected);
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="flex items-center justify-center gap-2 text-xs text-brand-ink-muted">
                          {cvFile ? (
                            <div className="flex items-center gap-3 relative z-10">
                              <FileText className="w-5 h-5 text-brand-olive-text shrink-0" />
                              <span className="font-semibold text-brand-forest truncate max-w-[200px]">
                                {cvFile.name}
                              </span>
                              <button
                                type="button"
                                aria-label={isHy ? "Հեռացնել կցված ֆայլը" : "Remove attached resume"}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCvFile(null);
                                }}
                                className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full text-brand-ink-subtle hover:text-[#B43C30] transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-1.5 py-1">
                              <Upload className="w-5 h-5 text-brand-stone-600" />
                              <span className="font-medium text-brand-forest">
                                {isHy ? "Սեղմեք ֆայլ ընտրելու համար" : "Click or drag resume file here"}
                              </span>
                              <span className="text-xs text-brand-ink-subtle">
                                Supports PDF, DOC, DOCX
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Professional Experience Level */}
                    <div>
                      <span className="block text-xs font-semibold text-brand-forest mb-1.5">
                        {isHy ? "Աշխատանքային փորձի տևողությունը" : "Years of Professional Experience"}
                      </span>
                      <div className="grid grid-cols-4 gap-1.5 text-xs">
                        {[
                          { id: "1–2 Years", label_en: "1–2 Yrs", label_hy: "1–2 Տարի" },
                          { id: "3–5 Years", label_en: "3–5 Yrs", label_hy: "3–5 Տարի" },
                          { id: "5+ Years", label_en: "5+ Yrs", label_hy: "5+ Տարի" },
                          { id: "Entry Level", label_en: "Entry", label_hy: "Սկսնակ" },
                        ].map((exp) => (
                          <button
                            key={exp.id}
                            type="button"
                            aria-pressed={experienceLevel === exp.id}
                            onClick={() => setExperienceLevel(exp.id)}
                            className={`min-h-[40px] py-2 px-1 rounded-xl border text-center transition-colors duration-200 cursor-pointer ${
                              experienceLevel === exp.id
                                ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-sm"
                                : "bg-white border-brand-stone-200 text-brand-ink-muted hover:border-brand-olive/50"
                            }`}
                          >
                            <span className="block font-bold leading-tight text-xs">
                              {isHy ? exp.label_hy : exp.label_en}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Primary Working Language & Mobility Status */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="candidateLangSelect"
                          className="block text-xs font-semibold text-brand-forest mb-1.5"
                        >
                          {isHy ? "Հիմնական աշխատանքային լեզուն" : "Primary Working Language"}
                        </label>
                        <select
                          id="candidateLangSelect"
                          value={primaryLanguage}
                          onChange={(e) => setPrimaryLanguage(e.target.value)}
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
                        >
                          <option value="English Conversational">
                            English (Conversational / Fluent)
                          </option>
                          <option value="Russian Fluent">Russian (Ռուսերեն - Fluent)</option>
                          <option value="Basic Armenian">Armenian (Հայերեն - Basic/Learning)</option>
                          <option value="Arabic">Arabic (العربية)</option>
                          <option value="Hindi / Urdu">Hindi / Urdu</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="candidateMobilitySelect"
                          className="block text-xs font-semibold text-brand-forest mb-1.5"
                        >
                          {isHy ? "Տեղափոխման կարգավիճակ" : "Mobility / Relocation Readiness"}
                        </label>
                        <select
                          id="candidateMobilitySelect"
                          value={candidateStatus}
                          onChange={(e) => setCandidateStatus(e.target.value)}
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
                        >
                          <option value="In Home Country (Ready for Visa)">
                            In Home Country (Ready for Visa Filing)
                          </option>
                          <option value="Currently in Armenia">Currently in Armenia (Active Stay)</option>
                          <option value="Working in UAE / Gulf">
                            Working in UAE / GCC (Ready to Relocate)
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* Candidate Legal Placement Consent Checkbox */}
                    <div
                      className={`p-3.5 rounded-2xl border shadow-sm ${
                        invalidField === "consent"
                          ? "bg-[#FDF2F0] border-[#B43C30]"
                          : "bg-brand-olive-subtle/80 border-brand-olive/35"
                      }`}
                    >
                      <label htmlFor="candidateZeroFeeCheckbox" className="flex items-start gap-3 cursor-pointer">
                        <input
                          ref={consentRef}
                          id="candidateZeroFeeCheckbox"
                          type="checkbox"
                          aria-invalid={invalidField === "consent"}
                          checked={candidateZeroFeeConsent}
                          onChange={(e) => setCandidateZeroFeeConsent(e.target.checked)}
                          className="mt-0.5 w-4 h-4 rounded border-brand-stone-400 text-brand-forest focus:ring-brand-olive cursor-pointer"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-brand-forest block">
                            {isHy
                              ? "Օրինական Աշխատանքի Տեղավորման և Վիզայի Պայմանների Համաձայնություն"
                              : "Verified Placement & Work Permit Terms Consent"}
                          </span>
                          <span className="text-brand-ink-muted leading-relaxed block mt-0.5">
                            {isHy
                              ? "Հաստատում եմ ներկայացված տվյալների և փաստաթղթերի իսկությունը: Հասկանում եմ, որ աշխատանքի տեղավորումը և ՀՀ օրինական աշխատանքի թույլտվության ձևակերպումն իրականացվում են պաշտոնական աշխատանքի հրավերի հիման վրա:"
                              : "I confirm that all submitted details and documents are authentic. I understand that candidate placement and legal Republic of Armenia work permit processing proceed strictly upon verified employer job offer."}
                          </span>
                        </div>
                      </label>
                    </div>
                  </>
                )}

                {/* Mode-Specific Fields: Employer */}
                {activeTab === "employer" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="employerIndustryInput"
                          className="block text-xs font-semibold text-brand-forest mb-1.5"
                        >
                          {isHy ? "Արդյունաբերության ոլորտը" : "Industry Sector"}
                        </label>
                        <input
                          id="employerIndustryInput"
                          type="text"
                          value={industrySector}
                          onChange={(e) => setIndustrySector(e.target.value)}
                          placeholder="e.g. Construction / Hospitality / Fleet"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs sm:text-sm text-brand-ink shadow-sm"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="employerHeadcountInput"
                          className="block text-xs font-semibold text-brand-forest mb-1.5"
                        >
                          {isHy ? "Պահանջվող աշխատակիցների թիվը" : "Headcount Needed"}
                        </label>
                        <input
                          id="employerHeadcountInput"
                          type="text"
                          value={headcountRequired}
                          onChange={(e) => setHeadcountRequired(e.target.value)}
                          placeholder="e.g. 5–10 workers"
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs sm:text-sm text-brand-ink shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Corporate Jurisdiction & Target Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="employerJurisdictionSelect"
                          className="block text-xs font-semibold text-brand-forest mb-1.5"
                        >
                          {isHy ? "Իրավական Իրավասություն" : "Company Legal Jurisdiction"}
                        </label>
                        <select
                          id="employerJurisdictionSelect"
                          value={employerJurisdiction}
                          onChange={(e) => setEmployerJurisdiction(e.target.value)}
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
                        >
                          <option value="Armenia (ՀՎՀՀ / TIN)">Armenia (ՀՎՀՀ Registered Enterprise)</option>
                          <option value="UAE & GCC Enterprise">UAE & GCC Corporation</option>
                          <option value="Europe / International">Europe / International Business</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="employerUrgencySelect"
                          className="block text-xs font-semibold text-brand-forest mb-1.5"
                        >
                          {isHy ? "Տեղակայման Ժամանակացույց" : "Deployment Timeline Urgency"}
                        </label>
                        <select
                          id="employerUrgencySelect"
                          value={employerUrgency}
                          onChange={(e) => setEmployerUrgency(e.target.value)}
                          className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-xs sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
                        >
                          <option value="Immediate (< 15 Days)">
                            Immediate Requisition (&lt; 15 Days)
                          </option>
                          <option value="Standard (30 Days)">Standard Batch (30 Days)</option>
                          <option value="Project Base (60+ Days)">Project Expansion (60+ Days)</option>
                        </select>
                      </div>
                    </div>

                    {/* Accommodation & Housing Policy */}
                    <div>
                      <span className="block text-xs font-semibold text-brand-forest mb-1.5">
                        {isHy
                          ? "Կացարանի և Տեղավորման Քաղաքականություն"
                          : "Accommodation & Housing Policy"}
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        {[
                          {
                            id: "Employer Housing Included",
                            label_en: "Housing Provided",
                            label_hy: "Կացարանը ներառված է",
                          },
                          {
                            id: "Worker Self-Arranged",
                            label_en: "Worker Arranges",
                            label_hy: "Աշխատակիցն է հոգում",
                          },
                          {
                            id: "De Organica Assistance Required",
                            label_en: "De Organica Assist",
                            label_hy: "Անհրաժեշտ է օգնություն",
                          },
                        ].map((h) => (
                          <button
                            key={h.id}
                            type="button"
                            aria-pressed={employerHousing === h.id}
                            onClick={() => setEmployerHousing(h.id)}
                            className={`min-h-[40px] p-2.5 rounded-xl border text-center transition-colors duration-200 cursor-pointer ${
                              employerHousing === h.id
                                ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-sm"
                                : "bg-white border-brand-stone-200 text-brand-ink-muted hover:border-brand-olive/50"
                            }`}
                          >
                            <span className="block font-bold leading-tight">
                              {isHy ? h.label_hy : h.label_en}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
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
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-olive focus:border-transparent text-xs sm:text-sm text-brand-ink resize-none shadow-sm"
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
          <div className="p-5 border-t border-brand-stone-200 bg-white space-y-2.5 shrink-0">
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
              className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-brand-forest text-white font-semibold hover:bg-brand-forest-deep transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer text-sm"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <MessageCircle className="w-4 h-4 text-brand-olive-onDark" />
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
              className="w-full min-h-[44px] py-2.5 px-4 rounded-xl border border-brand-stone-300 bg-brand-stone-50 text-brand-forest hover:bg-white hover:border-brand-olive-dark transition-colors duration-200 flex items-center justify-center gap-2 text-xs font-semibold disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isHy ? "Ուղարկել միայն էլ. փոստով" : "Send Official Inquiry by Email Only"}</span>
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
