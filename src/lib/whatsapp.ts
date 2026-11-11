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
}

export interface CandidateWhatsAppParams {
  name?: string;
  nationality?: string;
  currentLocation?: string;
  role: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface EmployerWhatsAppParams {
  companyName?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  industry: string;
  headcount?: string;
  notes?: string;
}

/**
 * Encodes text into a valid WhatsApp URL targeting the official De Organica number
 */
export function buildWhatsAppUrl(message: string, targetDigits?: string): string {
  const number = targetDigits || deorganicaConfig.company.whatsappNumberDigits;
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${number}?text=${encoded}`;
}

export function buildTravelWhatsAppMessage(params: TravelWhatsAppParams): string {
  const isB2B = params.travelerType === "b2b" || Boolean(params.agencyName);
  const clientName = params.name && params.name !== "Traveler" && params.name !== "Prospective Traveler / Partner"
    ? params.name
    : null;

  const lines = [
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
      ? `*Inquiry Category:* ${isB2B ? "B2B DMC Wholesale Contract" : "Private Leisure / Family Expedition"}`
      : null,
    params.b2bScope ? `*B2B Group Scope:* ${params.b2bScope}` : null,
    params.budgetTier ? `*Budget / Trip Style:* ${params.budgetTier}` : null,
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
  const candidateName = params.name && params.name !== "Job Applicant" ? params.name : null;

  const lines = [
    `*DE ORGANICA MANPOWER — CANDIDATE APPLICATION*`,
    `----------------------------------------`,
    candidateName ? `*Candidate Name:* ${candidateName}` : null,
    params.nationality ? `*Nationality:* ${params.nationality}` : null,
    params.currentLocation ? `*Current Country:* ${params.currentLocation}` : null,
    `*Target Role / Sector:* ${params.role}`,
    params.phone ? `*WhatsApp Contact:* ${params.phone}` : null,
    params.email ? `*Email:* ${params.email}` : null,
    params.notes ? `*Experience / Qualifications:* ${params.notes}` : null,
    `----------------------------------------`,
    `_Zero Upfront Fee Guarantee · Sent via deorganica.am_`,
  ].filter(Boolean);

  return lines.join("\n");
}

export function buildEmployerWhatsAppMessage(params: EmployerWhatsAppParams): string {
  const company = params.companyName && params.companyName !== "Prospective Employer" && params.companyName !== "Enterprise Client"
    ? params.companyName
    : null;
  const contact = params.contactPerson && params.contactPerson !== "Hiring Manager" ? params.contactPerson : null;

  const lines = [
    `*DE ORGANICA MANPOWER — B2B EMPLOYER INQUIRY*`,
    `----------------------------------------`,
    company ? `*Company Name:* ${company}` : null,
    contact ? `*Contact Person:* ${contact}` : null,
    params.email ? `*Business Email:* ${params.email}` : null,
    params.phone ? `*Phone/WhatsApp:* ${params.phone}` : null,
    `*Industry Sector:* ${params.industry}`,
    params.headcount ? `*Personnel Required:* ${params.headcount}` : null,
    params.notes ? `*Scope & Requirements:* ${params.notes}` : null,
    `----------------------------------------`,
    `_Corporate Staffing Desk · Sent via deorganica.am_`,
  ].filter(Boolean);

  return lines.join("\n");
}
