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
  experience?: string;
  languages?: string;
  status?: string;
  phone?: string;
  email?: string;
  notes?: string;
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
  const candidateName = params.name && params.name !== "Job Applicant" ? params.name : null;

  const lines = [
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
  const company = params.companyName && params.companyName !== "Prospective Employer" && params.companyName !== "Enterprise Client"
    ? params.companyName
    : null;
  const contact = params.contactPerson && params.contactPerson !== "Hiring Manager" ? params.contactPerson : null;

  const lines = [
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
