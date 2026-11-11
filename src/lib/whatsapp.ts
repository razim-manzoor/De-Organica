import { deorganicaConfig } from "@/data/deorganica-content";

export interface TravelWhatsAppParams {
  name: string;
  email?: string;
  phone?: string;
  serviceOrTour: string;
  dates?: string;
  guests?: string;
  notes?: string;
}

export interface CandidateWhatsAppParams {
  name: string;
  nationality?: string;
  currentLocation?: string;
  role: string;
  phone?: string;
  email?: string;
  notes?: string;
}

export interface EmployerWhatsAppParams {
  companyName: string;
  contactPerson: string;
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
  const lines = [
    `*DE ORGANICA TRAVEL & TOURS — DESK INQUIRY*`,
    `----------------------------------------`,
    `*Client Name:* ${params.name}`,
    params.email ? `*Email:* ${params.email}` : null,
    params.phone ? `*Phone/WhatsApp:* ${params.phone}` : null,
    `*Selected Tour/Service:* ${params.serviceOrTour}`,
    params.dates ? `*Estimated Travel Dates:* ${params.dates}` : null,
    params.guests ? `*Group Size / Guests:* ${params.guests}` : null,
    params.notes ? `*Custom Requirements:* ${params.notes}` : null,
    `----------------------------------------`,
    `_Sent via deorganica.am Corporate Portal_`,
  ].filter(Boolean);

  return lines.join("\n");
}

export function buildCandidateWhatsAppMessage(params: CandidateWhatsAppParams): string {
  const lines = [
    `*DE ORGANICA MANPOWER — CANDIDATE APPLICATION*`,
    `----------------------------------------`,
    `*Candidate Name:* ${params.name}`,
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
  const lines = [
    `*DE ORGANICA MANPOWER — B2B EMPLOYER INQUIRY*`,
    `----------------------------------------`,
    `*Company Name:* ${params.companyName}`,
    `*Contact Person:* ${params.contactPerson}`,
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
