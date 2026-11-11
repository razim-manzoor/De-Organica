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
} from "lucide-react";

const COUNTRY_DIAL_CODES = [
  { label: "🇦🇲 Armenia (+374)", code: "+374" },
  { label: "🇮🇳 India (+91)", code: "+91" },
  { label: "🇦🇪 UAE (+971)", code: "+971" },
  { label: "🇵🇭 Philippines (+63)", code: "+63" },
  { label: "🇬🇪 Georgia (+995)", code: "+995" },
  { label: "🇷🇺 Russia (+7)", code: "+7" },
  { label: "🌐 Other Country", code: "+" },
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
  const [nationality, setNationality] = useState("");
  const [currentCountry, setCurrentCountry] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [industrySector, setIndustrySector] = useState("");
  const [headcountRequired, setHeadcountRequired] = useState("");
  const [notes, setNotes] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);

  // Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  // Sync activeTab with drawer state mode
  useEffect(() => {
    if (state.isOpen) {
      setActiveTab(state.mode);
      if (state.presetServiceOrTour) {
        setSelectedService(state.presetServiceOrTour);
      }
      if (state.presetJobTitle) {
        setTargetRole(state.presetJobTitle);
      }
      setSubmitSuccess(false);
      setErrorMessage("");
      // Focus close button on open
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
        if (!fullName.trim()) throw new Error(isHy ? "Խնդրում ենք լրացնել անունը" : "Please enter your name");
        if (!phoneNumber.trim() && !email.trim()) {
          throw new Error(isHy ? "Խնդրում ենք նշել հեռախոսահամար կամ էլ. փոստ" : "Please provide either a phone number or email");
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
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", fullPhone);
      formData.append("notes", notes);
      formData.append("locale", locale);

      if (activeTab === "travel") {
        formData.append("serviceOrTour", selectedService || "General Travel Inquiry");
        formData.append("travelDates", travelDates);
        formData.append("guestsCount", guestsCount);
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

      // Trigger WhatsApp handoff if requested
      if (openWhatsAppChat) {
        let msg = "";
        if (activeTab === "travel") {
          msg = buildTravelWhatsAppMessage({
            name: fullName,
            email,
            phone: fullPhone,
            serviceOrTour: selectedService || "Custom Armenia Travel Itinerary",
            dates: travelDates,
            guests: guestsCount,
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
        className="fixed inset-0 bg-brand-stone-900/60 backdrop-blur-xs transition-opacity"
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
            <div className="w-2.5 h-2.5 rounded-full bg-brand-olive animate-pulse" />
            <div>
              <h2 className="font-serif text-lg font-bold text-brand-forest">
                {isHy ? "Ուղիղ կապ Երևանի գրասենյակի հետ" : "Direct Yerevan Desk Inquiry"}
              </h2>
              <p className="text-xs text-brand-ink-muted">
                {deorganicaConfig.company.workingHours_en}
              </p>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeDrawer}
            aria-label="Close drawer"
            className="p-2 rounded-full text-brand-ink-subtle hover:text-brand-forest hover:bg-brand-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-3 p-2 bg-brand-stone-100 border-b border-brand-stone-200 gap-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setActiveTab("travel");
              setSubmitSuccess(false);
            }}
            className={`py-2 px-1 rounded-md transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
              activeTab === "travel"
                ? "bg-white text-brand-forest shadow-xs font-semibold"
                : "text-brand-ink-muted hover:text-brand-forest"
            }`}
          >
            <Compass className="w-4 h-4 text-brand-olive" />
            <span>{isHy ? "Տուրիզմ" : "Travel & Tours"}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab("candidate");
              setSubmitSuccess(false);
            }}
            className={`py-2 px-1 rounded-md transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
              activeTab === "candidate"
                ? "bg-white text-brand-forest shadow-xs font-semibold"
                : "text-brand-ink-muted hover:text-brand-forest"
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
            }}
            className={`py-2 px-1 rounded-md transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
              activeTab === "employer"
                ? "bg-white text-brand-forest shadow-xs font-semibold"
                : "text-brand-ink-muted hover:text-brand-forest"
            }`}
          >
            <Building className="w-4 h-4 text-brand-olive" />
            <span>{isHy ? "Գործատու" : "Hire Staff"}</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {submitSuccess ? (
            <div className="p-6 rounded-xl bg-brand-olive-subtle/50 border border-brand-olive/30 text-center space-y-4 my-auto">
              <CheckCircle2 className="w-12 h-12 text-brand-olive mx-auto" />
              <h3 className="font-serif text-xl font-bold text-brand-forest">
                {isHy ? "Ձեր հարցումը հաջողությամբ ուղարկված է" : "Inquiry Dispatched Successfully"}
              </h3>
              <p className="text-sm text-brand-ink-muted max-w-md mx-auto">
                {isHy
                  ? "Մեր մասնագետը կկապվի Ձեզ հետ նշված հեռախոսահամարով կամ էլ. փոստով: Կարող եք նաև անմիջապես գրել WhatsApp-ով:"
                  : "The Yerevan desk has received your details. A representative will review and respond promptly. You may also connect directly via WhatsApp."}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => handleSubmit(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 text-white font-medium hover:bg-emerald-800 transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  {isHy ? "Բացել WhatsApp չատը" : "Open WhatsApp Chat"}
                </button>
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-brand-stone-300 bg-white text-brand-ink-muted hover:text-brand-forest text-sm font-medium"
                >
                  {isHy ? "Փակել" : "Close Window"}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Trust/Policy Notice banner based on tab */}
              {activeTab === "candidate" && (
                <div className="p-3.5 rounded-lg bg-brand-olive-subtle/40 border border-brand-olive/30 flex items-start gap-3 text-xs text-brand-forest">
                  <ShieldCheck className="w-5 h-5 text-brand-olive flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-brand-forest">
                      {isHy ? "Զրոյական նախնական վճարի երաշխիք" : "Zero Upfront Fee · Pay-After-Job Guarantee"}
                    </span>
                    <span className="text-brand-ink-muted">
                      {isHy
                        ? "Դիմումների գրանցումը և հարցազրույցներն անվճար են: Ծառայության վճարումը կատարվում է միայն աշխատանքի պաշտոնական հաստատումից հետո:"
                        : "Registration and interviews are 100% free. Placement terms apply strictly upon verified job offer and legal work permit approval."}
                    </span>
                  </div>
                </div>
              )}

              {activeTab === "employer" && (
                <div className="p-3.5 rounded-lg bg-brand-stone-100 border border-brand-stone-200 flex items-start gap-3 text-xs text-brand-ink-muted">
                  <Building className="w-5 h-5 text-brand-forest flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-brand-forest">
                      {isHy ? "Կորպորատիվ հավաքագրում և աշխատանքային վիզաներ" : "B2B Staffing & Work Permit Administration"}
                    </span>
                    <span>
                      {isHy
                        ? "Լրացրեք պահանջվող մասնագետների թիվը և ոլորտը: Մեր թիմը կպատրաստի թեկնածուների նախնական ցանկ:"
                        : "Tell us your industry and required headcount. Our Yerevan HR desk will source, vet, and present shortlisted candidate profiles."}
                    </span>
                  </div>
                </div>
              )}

              {/* Error banner if any */}
              {errorMessage && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form Inputs */}
              <div className="space-y-4 text-sm">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-brand-forest mb-1">
                    {activeTab === "employer"
                      ? isHy ? "Կոնտակտային անձի անունը *" : "Contact Person Name *"
                      : isHy ? "Լրիվ Անուն Ազգանուն *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={activeTab === "employer" ? contactPerson : fullName}
                    onChange={(e) =>
                      activeTab === "employer"
                        ? setContactPerson(e.target.value)
                        : setFullName(e.target.value)
                    }
                    placeholder={isHy ? "օրինակ՝ Արամ Սարգսյան" : "e.g. Rahul Sharma / David Smith"}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-brand-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-olive focus:border-transparent text-brand-ink"
                  />
                </div>

                {/* Company Name if Employer */}
                {activeTab === "employer" && (
                  <div>
                    <label className="block text-xs font-semibold text-brand-forest mb-1">
                      {isHy ? "Ընկերության անվանումը *" : "Company / Enterprise Name *"}
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder={isHy ? "օրինակ՝ Արմենիա Հյուրանոցային Խումբ" : "e.g. Yerevan Construction Group LLC"}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-brand-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-olive focus:border-transparent text-brand-ink"
                    />
                  </div>
                )}

                {/* International Phone with Country Preset */}
                <div>
                  <label className="block text-xs font-semibold text-brand-forest mb-1">
                    {isHy ? "Հեռախոսահամար / WhatsApp *" : "WhatsApp / Mobile Number *"}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <select
                      value={dialCode}
                      onChange={(e) => setDialCode(e.target.value)}
                      className="px-3 py-2.5 rounded-lg border border-brand-stone-300 bg-white text-xs font-medium text-brand-ink focus:outline-hidden focus:ring-2 focus:ring-brand-olive"
                    >
                      {COUNTRY_DIAL_CODES.map((c) => (
                        <option key={c.label} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="99 000000"
                      className="sm:col-span-2 px-3.5 py-2.5 rounded-lg border border-brand-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-olive focus:border-transparent text-brand-ink"
                    />
                  </div>
                  <p className="text-[11px] text-brand-ink-subtle mt-1">
                    {isHy
                      ? "Մենք կուղարկենք հաստատումը WhatsApp-ով կամ SMS-ով:"
                      : "We route inquiries directly to our WhatsApp dispatch desk."}
                  </p>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-brand-forest mb-1">
                    {isHy ? "Էլ. Փոստի հասցե" : "Email Address"}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-brand-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-olive focus:border-transparent text-brand-ink"
                  />
                </div>

                {/* Mode-Specific Fields: Travel */}
                {activeTab === "travel" && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-brand-forest mb-1">
                        {isHy ? "Հետաքրքրող ծառայությունը կամ տուրը" : "Selected Tour or Travel Service"}
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg border border-brand-stone-300 bg-white text-xs font-medium text-brand-ink focus:outline-hidden focus:ring-2 focus:ring-brand-olive"
                      >
                        <option value="">{isHy ? "Ընտրեք ցանկից կամ նշեք ստորև" : "Select from list or describe below"}</option>
                        {deorganicaConfig.travelServices.map((s) => (
                          <option key={s.id} value={s.title_en}>
                            {isHy ? s.title_hy : s.title_en}
                          </option>
                        ))}
                        {deorganicaConfig.starterTours.map((t) => (
                          <option key={t.id} value={t.title_en}>
                            Tour: {isHy ? t.title_hy : t.title_en}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-brand-forest mb-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-brand-olive" />
                          {isHy ? "Նախատեսվող ամսաթիվ" : "Estimated Travel Dates"}
                        </label>
                        <input
                          type="text"
                          value={travelDates}
                          onChange={(e) => setTravelDates(e.target.value)}
                          placeholder={isHy ? "օրինակ՝ Հունիս 2026" : "e.g. Next month / Oct 15-22"}
                          className="w-full px-3 py-2 rounded-lg border border-brand-stone-300 bg-white text-xs text-brand-ink"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-brand-forest mb-1 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-brand-olive" />
                          {isHy ? "Անձանց թիվը" : "Number of Guests"}
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={guestsCount}
                          onChange={(e) => setGuestsCount(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-brand-stone-300 bg-white text-xs text-brand-ink"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Mode-Specific Fields: Candidate */}
                {activeTab === "candidate" && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-brand-forest mb-1">
                          {isHy ? "Քաղաքացիություն" : "Nationality"}
                        </label>
                        <input
                          type="text"
                          value={nationality}
                          onChange={(e) => setNationality(e.target.value)}
                          placeholder="e.g. Indian, Filipino, Georgian"
                          className="w-full px-3 py-2 rounded-lg border border-brand-stone-300 bg-white text-xs text-brand-ink"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-brand-forest mb-1">
                          {isHy ? "Ներկայիս երկիրը" : "Current Country of Residence"}
                        </label>
                        <input
                          type="text"
                          value={currentCountry}
                          onChange={(e) => setCurrentCountry(e.target.value)}
                          placeholder="e.g. UAE / India / Armenia"
                          className="w-full px-3 py-2 rounded-lg border border-brand-stone-300 bg-white text-xs text-brand-ink"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-brand-forest mb-1">
                        {isHy ? "Ցանկալի պաշտոնը կամ ոլորտը *" : "Target Role / Industry Sector *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        placeholder="e.g. Chef / Line Cook / Crane Operator / Driver"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-brand-stone-300 bg-white text-sm text-brand-ink"
                      />
                    </div>

                    {/* CV File Upload */}
                    <div>
                      <label className="block text-xs font-semibold text-brand-forest mb-1 flex items-center justify-between">
                        <span>{isHy ? "Կցել Ռեզյումե (CV / Resume)" : "Attach CV / Resume (PDF / DOCX)"}</span>
                        <span className="text-[10px] text-brand-ink-subtle">Max 5MB</span>
                      </label>
                      <div className="relative border-2 border-dashed border-brand-stone-300 hover:border-brand-olive rounded-lg p-3 text-center transition-colors bg-brand-stone-100/50">
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
                            <>
                              <FileText className="w-4 h-4 text-brand-olive" />
                              <span className="font-semibold text-brand-forest truncate max-w-xs">
                                {cvFile.name}
                              </span>
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 text-brand-stone-500" />
                              <span>{isHy ? "Սեղմեք ֆայլ ընտրելու համար" : "Click or drag resume file here"}</span>
                            </>
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
                      <label className="block text-xs font-semibold text-brand-forest mb-1">
                        {isHy ? "Արդյունաբերության ոլորտը" : "Industry Sector"}
                      </label>
                      <input
                        type="text"
                        value={industrySector}
                        onChange={(e) => setIndustrySector(e.target.value)}
                        placeholder="e.g. Construction / Hospitality / Fleet"
                        className="w-full px-3 py-2 rounded-lg border border-brand-stone-300 bg-white text-xs text-brand-ink"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-brand-forest mb-1">
                        {isHy ? "Պահանջվող աշխատակիցների թիվը" : "Headcount Needed"}
                      </label>
                      <input
                        type="text"
                        value={headcountRequired}
                        onChange={(e) => setHeadcountRequired(e.target.value)}
                        placeholder="e.g. 5–10 workers"
                        className="w-full px-3 py-2 rounded-lg border border-brand-stone-300 bg-white text-xs text-brand-ink"
                      />
                    </div>
                  </div>
                )}

                {/* Additional Notes / Requirements */}
                <div>
                  <label className="block text-xs font-semibold text-brand-forest mb-1">
                    {isHy ? "Լրացուցիչ նշումներ կամ պահանջներ" : "Additional Notes or Specific Requests"}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      activeTab === "candidate"
                        ? isHy ? "Նշեք Ձեր աշխատանքային փորձը..." : "Highlight your years of experience, current location..."
                        : activeTab === "employer"
                        ? isHy ? "Նշեք աշխատանքի սկզբի ժամկետները..." : "Specify contract duration, shift requirements..."
                        : isHy ? "Հատուկ ցանկություններ, երեխաներ, հյուրանոց..." : "Special preferences, hotel tier, dietary requests..."
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-brand-stone-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-brand-olive focus:border-transparent text-xs text-brand-ink resize-none"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {!submitSuccess && (
          <div className="p-5 border-t border-brand-stone-200 bg-white space-y-2.5">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit(true)}
              className="w-full py-3 px-4 rounded-xl bg-brand-forest text-white font-medium hover:bg-brand-forest-deep transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
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
              className="w-full py-2.5 px-4 rounded-xl border border-brand-stone-300 bg-brand-stone-50 text-brand-ink-muted hover:text-brand-forest hover:bg-white transition-all flex items-center justify-center gap-2 text-xs font-medium disabled:opacity-50"
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
