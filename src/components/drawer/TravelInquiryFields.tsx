import React, { useState } from "react";
import {
  Compass,
  Users,
  Building2,
  Calendar,
  Wine,
  Car,
  ChevronDown,
} from "lucide-react";
import type { TourPackage, TravelService } from "@/types/content";
import {
  B2B_SCOPES,
  LODGING_TIERS,
  FLEET_TIERS,
  type InvalidFieldKey,
} from "./drawer-constants";

interface TravelInquiryFieldsProps {
  section: "top" | "details";
  isHy: boolean;
  travelerType: "individual" | "b2b";
  setTravelerType: (type: "individual" | "b2b") => void;
  selectedService: string;
  setSelectedService: (svc: string) => void;
  isChangingService: boolean;
  setIsChangingService: (b: boolean) => void;
  agencyName: string;
  setAgencyName: (name: string) => void;
  agencyCountry: string;
  setAgencyCountry: (c: string) => void;
  agencyNameRef: React.RefObject<HTMLInputElement | null>;
  invalidField: InvalidFieldKey;
  b2bScope: string;
  setB2bScope: (s: string) => void;
  travelDates: string;
  setTravelDates: (d: string) => void;
  budgetTier: string;
  setBudgetTier: (b: string) => void;
  guestsCount: string;
  setGuestsCount: (g: string) => void;
  accommodationTier: string;
  setAccommodationTier: (a: string) => void;
  fleetTier: string;
  setFleetTier: (f: string) => void;
  tours: TourPackage[];
  travelServices: TravelService[];
}

export function TravelInquiryFields({
  section,
  isHy,
  travelerType,
  setTravelerType,
  selectedService,
  setSelectedService,
  isChangingService,
  setIsChangingService,
  agencyName,
  setAgencyName,
  agencyCountry,
  setAgencyCountry,
  agencyNameRef,
  invalidField,
  b2bScope,
  setB2bScope,
  travelDates,
  setTravelDates,
  budgetTier,
  setBudgetTier,
  guestsCount,
  setGuestsCount,
  accommodationTier,
  setAccommodationTier,
  fleetTier,
  setFleetTier,
  tours,
  travelServices,
}: TravelInquiryFieldsProps) {
  const [showCustomOverrides, setShowCustomOverrides] = useState(false);

  const PRESET_HY_LABELS: Record<string, string> = {
    "Armenia Custom Itinerary": "Հայաստանի Անհատական Երթուղի",
    "Bespoke Private Itinerary": "Անհատական Երթուղու Ծրագիր",
    "B2B Travel Partner DMC Agreement": "B2B DMC Գործընկերության Համաձայնագիր",
    "General Travel Inquiry": "Ընդհանուր Տուրիստական Հարցում",
    "Hotels & Airport Transfers": "Հյուրանոցներ և Զվարթնոց (EVN) Տրանսֆեր",
  };
  const matchedTour = tours.find((t) => t.title_en === selectedService || t.title_hy === selectedService);
  const matchedService = travelServices.find((s) => s.title_en === selectedService || s.title_hy === selectedService);
  const displayServiceTitle = isHy
    ? matchedTour?.title_hy ||
      matchedService?.title_hy ||
      PRESET_HY_LABELS[selectedService] ||
      selectedService
    : matchedTour?.title_en || matchedService?.title_en || selectedService;

  if (section === "top") {
    return (
      <>
        {selectedService && !isChangingService ? (
          <div className="p-3.5 rounded-2xl bg-brand-stone-100 border border-brand-stone-200/90 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-forest text-brand-olive-onDark flex items-center justify-center shrink-0 shadow-sm">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-olive-text block">
                  {isHy ? "Ընտրված Տուր / Երթուղի" : "Selected Tour / Itinerary"}
                </span>
                <span className="text-sm font-serif font-bold text-brand-forest block leading-snug">
                  {displayServiceTitle}
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
                  : "Select Tour or Ground Service"}
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
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-base sm:text-sm font-medium text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-olive shadow-sm"
            >
              <option value="">
                {isHy ? "Ընտրեք ցանկից կամ նշեք ստորև" : "Select from list or describe below"}
              </option>
              <optgroup label={isHy ? "Հեղինակային Երթուղիներ" : "Signature Tour Packages"}>
                {tours.map((t) => (
                  <option key={t.id} value={t.title_en}>
                    {isHy ? t.title_hy : t.title_en} ({isHy ? t.duration_hy : t.duration_en})
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
            <span>{isHy ? "Մասնավոր / Ընտանիք" : "Private / Leisure"}</span>
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
            <span>{isHy ? "B2B Տուրօպերատոր" : "B2B Partner / Agency"}</span>
          </button>
        </div>

        {/* Agency fields if B2B Travel */}
        {travelerType === "b2b" && (
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
                autoComplete="organization"
                maxLength={200}
                required
                aria-invalid={invalidField === "agencyName"}
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                placeholder={isHy ? "օրինակ՝ Dubai Travel LLC" : "e.g. Odyssey Holidays / GCC DMC"}
                className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border bg-white text-base sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none ${
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
                autoComplete="country-name"
                maxLength={120}
                value={agencyCountry}
                onChange={(e) => setAgencyCountry(e.target.value)}
                placeholder={isHy ? "օրինակ՝ ԱՄԷ, Գերմանիա, ՌԴ" : "e.g. UAE / Germany / France / USA"}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-base sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
              />
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {/* B2B Scope & Travel Dates */}
      {travelerType === "b2b" && (
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
              maxLength={200}
              value={travelDates}
              onChange={(e) => setTravelDates(e.target.value)}
              placeholder={
                isHy
                  ? "օրինակ՝ Գարուն 2026 / Սեպտեմբեր-Հոկտեմբեր"
                  : "e.g. Spring 2026 Series / Autumn Harvest / Monthly Departures"
              }
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-base sm:text-sm text-brand-ink shadow-sm"
            />
          </div>
        </div>
      )}

      {/* Individual / Family Options */}
      {travelerType === "individual" && (
        <div className="space-y-3.5 pt-1">
          {/* Travel Style Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-brand-forest flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-brand-olive-text" />
                <span>{isHy ? "Ճամփորդության դասը" : "Travel Tier"}</span>
              </span>
              <span className="text-xs font-sans text-brand-olive-text font-bold">
                {isHy
                  ? budgetTier === "Essential Comfort"
                    ? "Կոմֆորտ"
                    : budgetTier === "Classic Comfort"
                    ? "Կոմֆորտ (4★)"
                    : "Բուտիկ և VIP"
                  : budgetTier}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs">
              {[
                {
                  id: "Essential Comfort",
                  label_en: "Essential Comfort",
                  label_hy: "Կոմֆորտ",
                  sub_en: "Clean 3★, Private Fleet",
                  sub_hy: "3★, անհատական պարկ",
                  lodging: "Economy & Clean 3★ Stays",
                  fleet: "Economy Sedan",
                },
                {
                  id: "Classic Comfort",
                  label_en: "Classic Comfort",
                  label_hy: "Կոմֆորտ (4★)",
                  sub_en: "4★ Hotels, Chauffeur",
                  sub_hy: "4★, վարորդ",
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

          {/* Group Size */}
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
                  className="w-16 px-2 py-1 rounded-lg border border-brand-stone-300 bg-white text-xs font-bold font-sans tabular-nums text-center text-brand-forest focus:ring-1 focus:ring-brand-olive"
                />
                <span className="text-xs font-sans text-brand-olive-text font-bold">
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

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
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
              maxLength={200}
              value={travelDates}
              onChange={(e) => setTravelDates(e.target.value)}
              placeholder={
                isHy
                  ? "օրինակ՝ Հոկտեմբեր 15-22 / Աշուն 2026"
                  : "e.g. Oct 15–22 / Autumn Wine Season / Next Month"
              }
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-base sm:text-sm text-brand-ink shadow-sm"
            />
          </div>

          {/* Progressive Disclosure: Custom Lodging & Fleet Preferences */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowCustomOverrides((prev) => !prev)}
              aria-expanded={showCustomOverrides}
              className="w-full py-2 px-3 rounded-xl border border-dashed border-brand-stone-300 hover:border-brand-olive bg-brand-stone-50/80 hover:bg-white text-xs font-semibold text-brand-forest flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Wine className="w-3.5 h-3.5 text-brand-olive-text" />
                <span>
                  {isHy
                    ? showCustomOverrides
                      ? "Թաքցնել հավելյալ նախասիրությունները"
                      : "+ Ընտրել հյուրանոցի և մեքենայի դասը (ըստ ցանկության)"
                    : showCustomOverrides
                    ? "Hide custom preferences"
                    : "+ Choose hotel & vehicle class (Optional)"}
                </span>
              </span>
              <ChevronDown
                className={`w-4 h-4 text-brand-ink-subtle transition-transform duration-200 ${
                  showCustomOverrides ? "rotate-180" : ""
                }`}
              />
            </button>

            {showCustomOverrides && (
              <div className="space-y-3.5 pt-3 mt-1.5 border-t border-brand-stone-200/80">
                {/* Accommodation Style Preference */}
                <div>
                  <span className="text-xs font-semibold text-brand-forest mb-1.5 flex items-center gap-1.5">
                    <Wine className="w-3.5 h-3.5 text-brand-olive-text" />
                    <span>{isHy ? "Հյուրանոցային դաս" : "Accommodation Style"}</span>
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

                {/* Vehicle Class */}
                <div>
                  <span className="text-xs font-semibold text-brand-forest mb-1.5 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-brand-olive-text" />
                    <span>{isHy ? "Տրանսպորտային դաս" : "Vehicle Class"}</span>
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
          </div>
        </div>
      )}
    </>
  );
}
