export type Locale = 'en' | 'hy';

export interface TourPackage {
  id: string;
  slug: string;
  title_en: string;
  title_hy: string;
  tagline_en: string;
  tagline_hy: string;
  duration_en: string;
  duration_hy: string;
  location_en: string;
  location_hy: string;
  description_en: string;
  description_hy: string;
  highlights_en: string[];
  highlights_hy: string[];
  inclusions_en: string[];
  inclusions_hy: string[];
  image: string;
  price?: string;
  showPrice?: boolean;
  externalBookingUrl?: string;
  paymentLinkUrl?: string;
  isFeatured?: boolean;
}

export interface TravelService {
  id: string;
  slug: string;
  icon: string;
  title_en: string;
  title_hy: string;
  tagline_en: string;
  tagline_hy: string;
  description_en: string;
  description_hy: string;
  features_en: string[];
  features_hy: string[];
  badge_en?: string;
  badge_hy?: string;
  image: string;
  inquiryType: string;
}

export type JobSector = 'hospitality' | 'skilled-trades' | 'logistics' | 'corporate';

export interface JobVacancy {
  id: string;
  title_en: string;
  title_hy: string;
  sector: JobSector;
  sector_en: string;
  sector_hy: string;
  location_en: string;
  location_hy: string;
  type_en: string;
  type_hy: string;
  description_en: string;
  description_hy: string;
  requirements_en: string[];
  requirements_hy: string[];
  benefits_en: string[];
  benefits_hy: string[];
  salary?: string;
  showSalary?: boolean;
  externalRecruitmentUrl?: string;
  isPublished: boolean;
}

export interface EmployerProcessStep {
  step: string;
  title_en: string;
  title_hy: string;
  description_en: string;
  description_hy: string;
  bullets_en: string[];
  bullets_hy: string[];
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline_en: string;
  tagline_hy: string;
  ceo: string;
  address_en: string;
  address_hy: string;
  city: string;
  country_en: string;
  country_hy: string;
  email: string;
  phoneYerevanDesk: string;
  phoneInternationalWhatsApp: string;
  whatsappNumberDigits: string; // E.164 without plus for wa.me URL
  workingHours_en: string;
  workingHours_hy: string;
  timeZone: string;
  registrationStatus_en: string;
  registrationStatus_hy: string;
}

export interface DrawerInitialState {
  isOpen: boolean;
  mode: 'travel' | 'candidate' | 'employer';
  presetServiceOrTour?: string;
  presetJobTitle?: string;
}
