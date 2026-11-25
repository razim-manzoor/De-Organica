export type Locale = 'en' | 'hy';

export interface NavItem {
  href: string;
  label_en: string;
  label_hy: string;
}

export interface SectionHeaderCopy {
  eyebrow_en: string;
  eyebrow_hy: string;
  title_en: string;
  title_hy: string;
  subtitle_en: string;
  subtitle_hy: string;
}

export interface PageSeoMeta {
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export interface TourGalleryItem {
  url: string;
  alt_en?: string;
  alt_hy?: string;
}

export interface TourItineraryStep {
  day: number;
  title_en: string;
  title_hy: string;
  description_en: string;
  description_hy: string;
}

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
  gallery?: TourGalleryItem[];
  itinerary?: TourItineraryStep[];
  price?: string;
  showPrice?: boolean;
  externalBookingUrl?: string;
  paymentLinkUrl?: string;
  isFeatured?: boolean;
  isPublished?: boolean;
  updatedAt?: string;
  seo?: PageSeoMeta;
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
  isPublished?: boolean;
}

export type JobSector = 'hospitality' | 'skilled-trades' | 'logistics' | 'corporate' | (string & {});

export interface JobVacancy {
  id: string;
  slug?: string;
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
  ceo?: string;
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

export interface FoundationSignal {
  icon: string;
  title_en: string;
  title_hy: string;
  desc_en: string;
  desc_hy: string;
}

export interface CorporateFoundationContent {
  eyebrow_en: string;
  eyebrow_hy: string;
  title_en: string;
  title_hy: string;
  subtitle_en: string;
  subtitle_hy: string;
  signals: FoundationSignal[];
}

export interface SiteSettings {
  company: CompanyInfo;
  nav: NavItem[];
  footerDescription_en: string;
  footerDescription_hy: string;
  corporateFoundation: CorporateFoundationContent;
  seoTitle?: string;
  seoDescription?: string;
}

export interface HeroPillarFeature {
  icon: string;
  label_en: string;
  label_hy: string;
}

export interface HomePageContent {
  masthead: {
    eyebrow_en: string;
    eyebrow_hy: string;
    headline_en: string;
    headline_hy: string;
    subtext_en: string;
    subtext_hy: string;
  };
  travelPillar: {
    badge_en: string;
    badge_hy: string;
    locationStrip_en: string;
    locationStrip_hy: string;
    dispatchTag_en: string;
    dispatchTag_hy: string;
    title_en: string;
    title_hy: string;
    description_en: string;
    description_hy: string;
    features: HeroPillarFeature[];
    image: string;
    imageAlt_en: string;
    imageAlt_hy: string;
    ctaPrimary_en: string;
    ctaPrimary_hy: string;
    ctaSecondary_en: string;
    ctaSecondary_hy: string;
  };
  manpowerPillar: {
    badge_en: string;
    badge_hy: string;
    feeTag_en: string;
    feeTag_hy: string;
    slaTag_en: string;
    slaTag_hy: string;
    title_en: string;
    title_hy: string;
    description_en: string;
    description_hy: string;
    features: HeroPillarFeature[];
    image: string;
    imageAlt_en: string;
    imageAlt_hy: string;
    ctaPrimary_en: string;
    ctaPrimary_hy: string;
    ctaSecondary_en: string;
    ctaSecondary_hy: string;
  };
  crossroadsBanner: {
    eyebrow_en: string;
    eyebrow_hy: string;
    headline_en: string;
    headline_hy: string;
    subtext_en: string;
    subtext_hy: string;
    cards: FoundationSignal[];
  };
  seo?: PageSeoMeta;
}

export interface HighlightDestination {
  id: string;
  name_en: string;
  name_hy: string;
  subtitle_en: string;
  subtitle_hy: string;
  distKm: number;
  altitudeM: number;
  season_en: string;
  season_hy: string;
  image: string;
  tag_en: string;
  tag_hy: string;
}

export interface DayStop {
  day: number;
  title_en: string;
  title_hy: string;
  places_en: string;
  places_hy: string;
  description_en: string;
  description_hy: string;
  image: string;
}

export interface HeritagePillar {
  id: string;
  title_en: string;
  title_hy: string;
  tagline_en: string;
  tagline_hy: string;
  desc_en: string;
  desc_hy: string;
  badge_en: string;
  badge_hy: string;
  image: string;
  icon: string;
}

export interface TravelPageContent {
  hero: {
    eyebrow_en: string;
    eyebrow_hy: string;
    headline_en: string;
    headline_hy: string;
    subtext_en: string;
    subtext_hy: string;
    ctaPrimary_en: string;
    ctaPrimary_hy: string;
    ctaSecondary_en: string;
    ctaSecondary_hy: string;
    badges: HeroPillarFeature[];
    destinations: HighlightDestination[];
  };
  itineraryStageShow: {
    eyebrow_en: string;
    eyebrow_hy: string;
    headline_en: string;
    headline_hy: string;
    subtext_en: string;
    subtext_hy: string;
    statusBadge_en: string;
    statusBadge_hy: string;
    days: DayStop[];
  };
  servicesHeader: SectionHeaderCopy;
  toursHeader: SectionHeaderCopy;
  heritageShowcase: {
    eyebrow_en: string;
    eyebrow_hy: string;
    headline_en: string;
    headline_hy: string;
    subtext_en: string;
    subtext_hy: string;
    cta_en: string;
    cta_hy: string;
    pillars: HeritagePillar[];
  };
  dmcPartner: {
    eyebrow_en: string;
    eyebrow_hy: string;
    headline_en: string;
    headline_hy: string;
    subtext_en: string;
    subtext_hy: string;
    ctaTitle_en: string;
    ctaTitle_hy: string;
    ctaDesc_en: string;
    ctaDesc_hy: string;
    ctaButton_en: string;
    ctaButton_hy: string;
    pillars: FoundationSignal[];
  };
  faqHeader: SectionHeaderCopy;
  seo?: PageSeoMeta;
}

export interface HeroStageItem {
  stage_en: string;
  stage_hy: string;
  badge_en: string;
  badge_hy: string;
  badgeTone?: 'olive' | 'muted' | 'forest';
  desc_en: string;
  desc_hy: string;
  isHighlight?: boolean;
}

export interface PipelineStage {
  id: string;
  step: string;
  title_en: string;
  title_hy: string;
  badge_en: string;
  badge_hy: string;
  role_en: string;
  role_hy: string;
  description_en: string;
  description_hy: string;
  safeguards_en: string[];
  safeguards_hy: string[];
  metrics_en: string;
  metrics_hy: string;
}

export interface ManpowerTrustMetric {
  figure: string;
  label_en: string;
  label_hy: string;
  detail_en: string;
  detail_hy: string;
}

export interface ManpowerSector {
  id: string;
  label_en: string;
  label_hy: string;
}

export interface ManpowerTrustPillar {
  title_en: string;
  title_hy: string;
  desc_en: string;
  desc_hy: string;
}

export interface ManpowerMobilityStep {
  step: string;
  title_en: string;
  title_hy: string;
  desc_en: string;
  desc_hy: string;
}

export interface ManpowerPageContent {
  hero: {
    eyebrow_en: string;
    eyebrow_hy: string;
    headline_en: string;
    headline_hy: string;
    subtext_en: string;
    subtext_hy: string;
    metrics: { figure: string; label_en: string; label_hy: string }[];
    candidateStages: HeroStageItem[];
    employerStages: HeroStageItem[];
  };
  pipelineStageShow: {
    eyebrow_en: string;
    eyebrow_hy: string;
    headline_en: string;
    headline_hy: string;
    subtext_en: string;
    subtext_hy: string;
    stages: PipelineStage[];
  };
  candidateHub: {
    eyebrow_en: string;
    eyebrow_hy: string;
    headline_en: string;
    headline_hy: string;
    subtext_en: string;
    subtext_hy: string;
    charterTitle_en: string;
    charterTitle_hy: string;
    charterDesc_en: string;
    charterDesc_hy: string;
    trustPillars: ManpowerTrustPillar[];
    mobilitySteps: ManpowerMobilityStep[];
    sectors: ManpowerSector[];
  };
  complianceBanner: {
    eyebrow_en: string;
    eyebrow_hy: string;
    headline_en: string;
    headline_hy: string;
    subtext_en: string;
    subtext_hy: string;
    trustMetrics: ManpowerTrustMetric[];
  };
  employerSection: {
    eyebrow_en: string;
    eyebrow_hy: string;
    headline_en: string;
    headline_hy: string;
    subtext_en: string;
    subtext_hy: string;
    steps: EmployerProcessStep[];
  };
  faqHeader: SectionHeaderCopy;
  seo?: PageSeoMeta;
}

export interface ContactPageContent {
  eyebrow_en: string;
  eyebrow_hy: string;
  headline_en: string;
  headline_hy: string;
  subtext_en: string;
  subtext_hy: string;
  deskOpenLabel_en: string;
  deskOpenLabel_hy: string;
  deskClosedLabel_en: string;
  deskClosedLabel_hy: string;
  coordinates: string;
  channelsTitle_en: string;
  channelsTitle_hy: string;
  channelsSubtitle_en: string;
  channelsSubtitle_hy: string;
  replySla_en: string;
  replySla_hy: string;
  seo?: PageSeoMeta;
}

export interface FaqItem {
  id?: string;
  category: 'travel' | 'manpower';
  target?: 'candidate' | 'employer' | 'both';
  q_en: string;
  q_hy: string;
  a_en: string;
  a_hy: string;
  isPublished?: boolean;
}

export interface DrawerInitialState {
  isOpen: boolean;
  mode: 'travel' | 'candidate' | 'employer';
  presetServiceOrTour?: string;
  presetJobTitle?: string;
}
