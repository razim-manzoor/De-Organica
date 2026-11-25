import { deorganicaConfig } from "@/data/deorganica-content";

export interface TravelWhatsAppParams {
  name?: string;
  email?: string;
  phone?: string;
  serviceOrTour: string;
  travelerType?: string;
  budgetTier?: string;
  agencyName?: string;
  agencyCountry?: string;
  b2bScope?: string;
  dates?: string;
  guests?: string;
  accommodation?: string;
  fleet?: string;
  notes?: string;
  locale?: "en" | "hy";
}

export interface CandidateWhatsAppParams {
  name?: string;
  nationality?: string;
  currentLocation?: string;
  role: string;
  experience?: string;
  languages?: string;
  status?: string;
  phone?: string;
  email?: string;
  notes?: string;
  locale?: "en" | "hy";
}

export interface EmployerWhatsAppParams {
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  jurisdiction?: string;
  industry: string;
  headcount?: string;
  urgency?: string;
  housing?: string;
  notes?: string;
  locale?: "en" | "hy";
}

/**
 * Encodes text into a valid WhatsApp URL targeting the official De Organica number
 */
export function buildWhatsAppUrl(message: string, targetDigits?: string): string {
  const rawNumber = targetDigits || deorganicaConfig.company.whatsappNumberDigits;
  const number = rawNumber.replace(/[^0-9]/g, "") || deorganicaConfig.company.whatsappNumberDigits;
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${number}?text=${encoded}`;
}

export function buildTravelWhatsAppMessage(params: TravelWhatsAppParams): string {
  const isHy = params.locale === "hy";
  const isB2B = params.travelerType === "b2b" || Boolean(params.agencyName);
  const clientName =
    params.name &&
    params.name !== "Traveler" &&
    params.name !== "Prospective Traveler / Partner"
      ? params.name
      : null;

  const lines = isHy
    ? [
        `*«ԴԵ ՕՐԳԱՆԻԿԱ» ՏՈՒՐԻԶՄ — ՀԱՐՑՈՒՄ ԵՐԵՎԱՆԻ ԴԵՍԿԻՆ*`,
        `----------------------------------------`,
        isB2B && params.agencyName
          ? `*Գործակալություն / DMC:* ${params.agencyName}${params.agencyCountry ? ` (${params.agencyCountry})` : ""}`
          : null,
        clientName ? (isB2B ? `*Կոնտակտային անձ:* ${clientName}` : `*Անուն:* ${clientName}`) : null,
        params.travelerType
          ? `*Տեսակ:* ${isB2B ? "B2B DMC Գործընկերություն" : "Անհատական / Ընտանեկան տուր"}`
          : null,
        params.b2bScope ? `*Խմբի ձևաչափ:* ${params.b2bScope}` : null,
        params.budgetTier ? `*Դաս և ոճ:* ${params.budgetTier}` : null,
        params.email ? `*Էլ. փոստ:* ${params.email}` : null,
        params.phone ? `*Հեռախոս/WhatsApp:* ${params.phone}` : null,
        `*Ընտրված ծառայություն:* ${params.serviceOrTour}`,
        params.dates ? `*Նախատեսվող ամսաթիվ:* ${params.dates}` : null,
        params.guests ? `*Հյուրերի թիվ:* ${params.guests}` : null,
        params.accommodation ? `*Հյուրանոցային դաս:* ${params.accommodation}` : null,
        params.fleet ? `*Տրանսպորտ:* ${params.fleet}` : null,
        params.notes ? `*Լրացուցիչ պահանջներ:* ${params.notes}` : null,
        `----------------------------------------`,
        `_Ուղարկված է deorganica.am կայքից_`,
      ].filter(Boolean)
    : [
        `*DE ORGANICA TRAVEL & TOURS — DESK INQUIRY*`,
        `----------------------------------------`,
        isB2B && params.agencyName
          ? `*Travel Agency / DMC:* ${params.agencyName}${params.agencyCountry ? ` (${params.agencyCountry})` : ""}`
          : null,
        clientName
          ? isB2B
            ? `*Contact Person / Agent:* ${clientName}`
            : `*Client Name:* ${clientName}`
          : null,
        params.travelerType
          ? `*Inquiry Category:* ${isB2B ? "B2B DMC Ground Partner Allotment" : "Private Leisure / Family Expedition"}`
          : null,
        params.b2bScope ? `*B2B Group Scope:* ${params.b2bScope}` : null,
        params.budgetTier ? `*Travel Style & Experience Preference:* ${params.budgetTier}` : null,
        params.email ? `*Email:* ${params.email}` : null,
        params.phone ? `*Phone/WhatsApp:* ${params.phone}` : null,
        `*Selected Tour/Service:* ${params.serviceOrTour}`,
        params.dates ? `*Estimated Travel Dates / Season:* ${params.dates}` : null,
        params.guests ? `*Group Size / Guests:* ${params.guests}` : null,
        params.accommodation ? `*Accommodation Preference:* ${params.accommodation}` : null,
        params.fleet ? `*Chauffeur Fleet Tier:* ${params.fleet}` : null,
        params.notes ? `*Custom Requirements:* ${params.notes}` : null,
        `----------------------------------------`,
        `_Sent via deorganica.am Inbound Desk_`,
      ].filter(Boolean);

  return lines.join("\n");
}

export function buildCandidateWhatsAppMessage(params: CandidateWhatsAppParams): string {
  const isHy = params.locale === "hy";
  const candidateName = params.name && params.name !== "Job Applicant" ? params.name : null;

  const lines = isHy
    ? [
        `*«ԴԵ ՕՐԳԱՆԻԿԱ» ԱՇԽԱՏԱՆՔ — ԹԵԿՆԱԾՈՒԻ ԴԻՄՈՒՄ*`,
        `----------------------------------------`,
        candidateName ? `*Թեկնածուի անուն:* ${candidateName}` : null,
        params.nationality ? `*Քաղաքացիություն:* ${params.nationality}` : null,
        params.currentLocation ? `*Երկիր:* ${params.currentLocation}` : null,
        `*Նպատակային պաշտոն:* ${params.role}`,
        params.experience ? `*Փորձ:* ${params.experience}` : null,
        params.languages ? `*Լեզուներ:* ${params.languages}` : null,
        params.status ? `*Տեղափոխման կարգավիճակ:* ${params.status}` : null,
        params.phone ? `*WhatsApp համար:* ${params.phone}` : null,
        params.email ? `*Էլ. փոստ:* ${params.email}` : null,
        params.notes ? `*Նշումներ:* ${params.notes}` : null,
        `----------------------------------------`,
        `_ՀՀ օրինական աշխատանքի թույլտվություն · deorganica.am_`,
      ].filter(Boolean)
    : [
        `*DE ORGANICA MANPOWER — CANDIDATE APPLICATION*`,
        `----------------------------------------`,
        candidateName ? `*Candidate Name:* ${candidateName}` : null,
        params.nationality ? `*Nationality:* ${params.nationality}` : null,
        params.currentLocation ? `*Current Country:* ${params.currentLocation}` : null,
        `*Target Role / Sector:* ${params.role}`,
        params.experience ? `*Years of Experience:* ${params.experience}` : null,
        params.languages ? `*Languages:* ${params.languages}` : null,
        params.status ? `*Mobility Status:* ${params.status}` : null,
        params.phone ? `*WhatsApp Contact:* ${params.phone}` : null,
        params.email ? `*Email:* ${params.email}` : null,
        params.notes ? `*Candidate Notes:* ${params.notes}` : null,
        `----------------------------------------`,
        `_Legal RA Work Permits & Verified Placement · Sent via deorganica.am_`,
      ].filter(Boolean);

  return lines.join("\n");
}

export function buildEmployerWhatsAppMessage(params: EmployerWhatsAppParams): string {
  const isHy = params.locale === "hy";
  const company =
    params.companyName &&
    params.companyName !== "Prospective Employer" &&
    params.companyName !== "Enterprise Client"
      ? params.companyName
      : null;
  const contact =
    params.contactPerson && params.contactPerson !== "Hiring Manager"
      ? params.contactPerson
      : null;

  const lines = isHy
    ? [
        `*«ԴԵ ՕՐԳԱՆԻԿԱ» ԿԱԴՐԵՐ — B2B ԳՈՐԾԱՏՈՒԻ ՀԱՅՏ*`,
        `----------------------------------------`,
        company ? `*Ընկերություն:* ${company}` : null,
        contact ? `*Կոնտակտային անձ:* ${contact}` : null,
        params.jurisdiction ? `*Իրավասություն:* ${params.jurisdiction}` : null,
        params.email ? `*Էլ. փոստ:* ${params.email}` : null,
        params.phone ? `*Հեռախոս/WhatsApp:* ${params.phone}` : null,
        `*Արդյունաբերական ոլորտ:* ${params.industry}`,
        params.headcount ? `*Աշխատակիցների թիվ:* ${params.headcount}` : null,
        params.urgency ? `*Սպասվող մեկնարկ:* ${params.urgency}` : null,
        params.housing ? `*Կացարան:* ${params.housing}` : null,
        params.notes ? `*Նշումներ և պահանջներ:* ${params.notes}` : null,
        `----------------------------------------`,
        `_Կորպորատիվ կադրային բաժին · deorganica.am_`,
      ].filter(Boolean)
    : [
        `*DE ORGANICA MANPOWER — B2B EMPLOYER INQUIRY*`,
        `----------------------------------------`,
        company ? `*Company Name:* ${company}` : null,
        contact ? `*Contact Person:* ${contact}` : null,
        params.jurisdiction ? `*Jurisdiction:* ${params.jurisdiction}` : null,
        params.email ? `*Business Email:* ${params.email}` : null,
        params.phone ? `*Phone/WhatsApp:* ${params.phone}` : null,
        `*Industry Sector:* ${params.industry}`,
        params.headcount ? `*Personnel Required:* ${params.headcount}` : null,
        params.urgency ? `*Target Timeline:* ${params.urgency}` : null,
        params.housing ? `*Housing Coordination:* ${params.housing}` : null,
        params.notes ? `*Scope & Requirements:* ${params.notes}` : null,
        `----------------------------------------`,
        `_Corporate Staffing Desk · Sent via deorganica.am_`,
      ].filter(Boolean);

  return lines.join("\n");
}
