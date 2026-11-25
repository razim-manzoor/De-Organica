import { defineField, defineType } from "sanity";

const ICON_LIST = [
  { title: "Shield Check", value: "ShieldCheck" },
  { title: "Workflow", value: "Workflow" },
  { title: "Globe 2", value: "Globe2" },
  { title: "Globe", value: "Globe" },
  { title: "Clock 4", value: "Clock4" },
  { title: "Clock", value: "Clock" },
  { title: "Compass", value: "Compass" },
  { title: "Plane", value: "Plane" },
  { title: "File Check", value: "FileCheck" },
  { title: "Car", value: "Car" },
  { title: "Building 2", value: "Building2" },
  { title: "Users 2", value: "Users2" },
  { title: "Landmark", value: "Landmark" },
  { title: "Utensils", value: "Utensils" },
  { title: "Wine", value: "Wine" },
  { title: "Bus", value: "Bus" },
  { title: "Handshake", value: "Handshake" },
];

export const navItemType = defineType({
  name: "navItem",
  title: "Navigation Link",
  type: "object",
  fields: [
    defineField({ name: "href", title: "Route Path", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label_en", title: "Label (EN)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label_hy", title: "Label (HY)", type: "string", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "label_en", subtitle: "href" },
  },
});

export const sectionHeaderType = defineType({
  name: "sectionHeader",
  title: "Section Header",
  type: "object",
  fields: [
    defineField({ name: "eyebrow_en", title: "Eyebrow (EN)", type: "string" }),
    defineField({ name: "eyebrow_hy", title: "Eyebrow (HY)", type: "string" }),
    defineField({ name: "title_en", title: "Title (EN)", type: "string" }),
    defineField({ name: "title_hy", title: "Title (HY)", type: "string" }),
    defineField({ name: "subtitle_en", title: "Subtitle (EN)", type: "text", rows: 2 }),
    defineField({ name: "subtitle_hy", title: "Subtitle (HY)", type: "text", rows: 2 }),
  ],
});

export const heroPillarFeatureType = defineType({
  name: "heroPillarFeature",
  title: "Hero Pillar Feature",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ICON_LIST },
      initialValue: "ShieldCheck",
    }),
    defineField({ name: "label_en", title: "Label (EN)", type: "string" }),
    defineField({ name: "label_hy", title: "Label (HY)", type: "string" }),
  ],
  preview: { select: { title: "label_en", subtitle: "icon" } },
});

export const foundationSignalType = defineType({
  name: "foundationSignal",
  title: "Editorial Pillar / Signal Card",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ICON_LIST },
      initialValue: "ShieldCheck",
    }),
    defineField({ name: "title_en", title: "Title (EN)", type: "string" }),
    defineField({ name: "title_hy", title: "Title (HY)", type: "string" }),
    defineField({ name: "desc_en", title: "Description (EN)", type: "text", rows: 3 }),
    defineField({ name: "desc_hy", title: "Description (HY)", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title_en", subtitle: "icon" } },
});

export const highlightDestinationType = defineType({
  name: "highlightDestination",
  title: "Highlight Destination",
  type: "object",
  fields: [
    defineField({ name: "id", title: "ID", type: "string" }),
    defineField({ name: "name_en", title: "Name (EN)", type: "string" }),
    defineField({ name: "name_hy", title: "Name (HY)", type: "string" }),
    defineField({ name: "subtitle_en", title: "Subtitle (EN)", type: "string" }),
    defineField({ name: "subtitle_hy", title: "Subtitle (HY)", type: "string" }),
    defineField({ name: "distKm", title: "Distance From Yerevan (km)", type: "number" }),
    defineField({ name: "altitudeM", title: "Altitude (m)", type: "number" }),
    defineField({ name: "season_en", title: "Best Season (EN)", type: "string" }),
    defineField({ name: "season_hy", title: "Best Season (HY)", type: "string" }),
    defineField({ name: "image", title: "Destination Image (Upload)", type: "image", options: { hotspot: true } }),
    defineField({
      name: "imageUrl",
      title: "Fallback Image Path / URL",
      type: "string",
      description: "Developer fallback asset path used automatically if no image is uploaded.",
      hidden: ({ parent }) => Boolean(parent?.image),
    }),
    defineField({ name: "tag_en", title: "Tag (EN)", type: "string" }),
    defineField({ name: "tag_hy", title: "Tag (HY)", type: "string" }),
  ],
  preview: { select: { title: "name_en", subtitle: "subtitle_en", media: "image" } },
});

export const itineraryDayType = defineType({
  name: "itineraryDay",
  title: "Itinerary Day Stop",
  type: "object",
  fields: [
    defineField({ name: "day", title: "Day Number", type: "number" }),
    defineField({ name: "title_en", title: "Title (EN)", type: "string" }),
    defineField({ name: "title_hy", title: "Title (HY)", type: "string" }),
    defineField({ name: "places_en", title: "Route Places (EN)", type: "string" }),
    defineField({ name: "places_hy", title: "Route Places (HY)", type: "string" }),
    defineField({ name: "description_en", title: "Description (EN)", type: "text", rows: 3 }),
    defineField({ name: "description_hy", title: "Description (HY)", type: "text", rows: 3 }),
    defineField({ name: "image", title: "Day Image (Upload)", type: "image", options: { hotspot: true } }),
    defineField({
      name: "imageUrl",
      title: "Fallback Image Path / URL",
      type: "string",
      description: "Developer fallback asset path used automatically if no image is uploaded.",
      hidden: ({ parent }) => Boolean(parent?.image),
    }),
  ],
  preview: { select: { title: "title_en", subtitle: "places_en", media: "image" } },
});

export const heritagePillarType = defineType({
  name: "heritagePillar",
  title: "Heritage Showcase Pillar",
  type: "object",
  fields: [
    defineField({ name: "id", title: "ID", type: "string" }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { list: ICON_LIST },
      initialValue: "Compass",
    }),
    defineField({ name: "title_en", title: "Title (EN)", type: "string" }),
    defineField({ name: "title_hy", title: "Title (HY)", type: "string" }),
    defineField({ name: "tagline_en", title: "Tagline (EN)", type: "string" }),
    defineField({ name: "tagline_hy", title: "Tagline (HY)", type: "string" }),
    defineField({ name: "desc_en", title: "Description (EN)", type: "text", rows: 3 }),
    defineField({ name: "desc_hy", title: "Description (HY)", type: "text", rows: 3 }),
    defineField({ name: "badge_en", title: "Badge (EN)", type: "string" }),
    defineField({ name: "badge_hy", title: "Badge (HY)", type: "string" }),
    defineField({ name: "image", title: "Image (Upload)", type: "image", options: { hotspot: true } }),
    defineField({
      name: "imageUrl",
      title: "Fallback Image Path / URL",
      type: "string",
      description: "Developer fallback asset path used automatically if no image is uploaded.",
      hidden: ({ parent }) => Boolean(parent?.image),
    }),
  ],
  preview: { select: { title: "title_en", subtitle: "tagline_en", media: "image" } },
});

export const heroStageItemType = defineType({
  name: "heroStageItem",
  title: "Manpower Hero Stage Row",
  type: "object",
  fields: [
    defineField({ name: "stage_en", title: "Stage Label (EN)", type: "string" }),
    defineField({ name: "stage_hy", title: "Stage Label (HY)", type: "string" }),
    defineField({ name: "badge_en", title: "Badge (EN)", type: "string" }),
    defineField({ name: "badge_hy", title: "Badge (HY)", type: "string" }),
    defineField({
      name: "badgeTone",
      title: "Badge Tone",
      type: "string",
      options: {
        list: [
          { title: "Olive (Highlight)", value: "olive" },
          { title: "Muted", value: "muted" },
          { title: "Forest", value: "forest" },
        ],
      },
      initialValue: "muted",
    }),
    defineField({ name: "desc_en", title: "Description (EN)", type: "text", rows: 2 }),
    defineField({ name: "desc_hy", title: "Description (HY)", type: "text", rows: 2 }),
    defineField({ name: "isHighlight", title: "Highlight Row", type: "boolean", initialValue: false }),
  ],
  preview: { select: { title: "stage_en", subtitle: "badge_en" } },
});

export const pipelineStageType = defineType({
  name: "pipelineStage",
  title: "Manpower Pipeline Stage",
  type: "object",
  fields: [
    defineField({ name: "id", title: "ID", type: "string" }),
    defineField({ name: "step", title: "Step Number (e.g. 01)", type: "string" }),
    defineField({ name: "title_en", title: "Title (EN)", type: "string" }),
    defineField({ name: "title_hy", title: "Title (HY)", type: "string" }),
    defineField({ name: "badge_en", title: "Badge (EN)", type: "string" }),
    defineField({ name: "badge_hy", title: "Badge (HY)", type: "string" }),
    defineField({ name: "role_en", title: "Responsible Party (EN)", type: "string" }),
    defineField({ name: "role_hy", title: "Responsible Party (HY)", type: "string" }),
    defineField({ name: "description_en", title: "Description (EN)", type: "text", rows: 3 }),
    defineField({ name: "description_hy", title: "Description (HY)", type: "text", rows: 3 }),
    defineField({ name: "safeguards_en", title: "Safeguards (EN)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "safeguards_hy", title: "Safeguards (HY)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "metrics_en", title: "Outcome Metric (EN)", type: "string" }),
    defineField({ name: "metrics_hy", title: "Outcome Metric (HY)", type: "string" }),
  ],
  preview: { select: { title: "title_en", subtitle: "step" } },
});

export const manpowerTrustMetricType = defineType({
  name: "manpowerTrustMetric",
  title: "Compliance Metric",
  type: "object",
  fields: [
    defineField({ name: "figure", title: "Headline Figure (EN)", type: "string" }),
    defineField({ name: "figure_hy", title: "Headline Figure (HY)", type: "string" }),
    defineField({ name: "label_en", title: "Label (EN)", type: "string" }),
    defineField({ name: "label_hy", title: "Label (HY)", type: "string" }),
    defineField({ name: "detail_en", title: "Detail (EN)", type: "text", rows: 2 }),
    defineField({ name: "detail_hy", title: "Detail (HY)", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "figure", subtitle: "label_en" } },
});

export const manpowerSectorType = defineType({
  name: "manpowerSector",
  title: "Manpower Job Sector",
  type: "object",
  fields: [
    defineField({ name: "id", title: "Sector Key", type: "string" }),
    defineField({ name: "label_en", title: "Label (EN)", type: "string" }),
    defineField({ name: "label_hy", title: "Label (HY)", type: "string" }),
  ],
  preview: { select: { title: "label_en", subtitle: "id" } },
});

export const manpowerTrustPillarType = defineType({
  name: "manpowerTrustPillar",
  title: "Manpower Trust Pillar",
  type: "object",
  fields: [
    defineField({ name: "title_en", title: "Title (EN)", type: "string" }),
    defineField({ name: "title_hy", title: "Title (HY)", type: "string" }),
    defineField({ name: "desc_en", title: "Description (EN)", type: "text", rows: 2 }),
    defineField({ name: "desc_hy", title: "Description (HY)", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title_en" } },
});

export const manpowerMobilityStepType = defineType({
  name: "manpowerMobilityStep",
  title: "Manpower Mobility Step",
  type: "object",
  fields: [
    defineField({ name: "step", title: "Step Number (e.g. 01)", type: "string" }),
    defineField({ name: "title_en", title: "Title (EN)", type: "string" }),
    defineField({ name: "title_hy", title: "Title (HY)", type: "string" }),
    defineField({ name: "desc_en", title: "Description (EN)", type: "text", rows: 2 }),
    defineField({ name: "desc_hy", title: "Description (HY)", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "title_en", subtitle: "step" } },
});

export const employerProcessStepType = defineType({
  name: "employerProcessStep",
  title: "Employer B2B Process Step",
  type: "object",
  fields: [
    defineField({ name: "step", title: "Step Number", type: "string" }),
    defineField({ name: "title_en", title: "Title (EN)", type: "string" }),
    defineField({ name: "title_hy", title: "Title (HY)", type: "string" }),
    defineField({ name: "description_en", title: "Description (EN)", type: "text", rows: 2 }),
    defineField({ name: "description_hy", title: "Description (HY)", type: "text", rows: 2 }),
    defineField({ name: "bullets_en", title: "Deliverables (EN)", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "bullets_hy", title: "Deliverables (HY)", type: "array", of: [{ type: "string" }] }),
  ],
  preview: { select: { title: "title_en", subtitle: "step" } },
});

export const companyInfoType = defineType({
  name: "companyInfo",
  title: "Company Identity & Contact",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Brand Name", type: "string" }),
    defineField({ name: "legalName", title: "Legal Entity Name", type: "string" }),
    defineField({ name: "tagline_en", title: "Tagline (EN)", type: "string" }),
    defineField({ name: "tagline_hy", title: "Tagline (HY)", type: "string" }),
    defineField({ name: "ceo", title: "Founder / CEO", type: "string", hidden: true }),
    defineField({ name: "address_en", title: "Office Address (EN)", type: "string" }),
    defineField({ name: "address_hy", title: "Office Address (HY)", type: "string" }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "country_en", title: "Country (EN)", type: "string" }),
    defineField({ name: "country_hy", title: "Country (HY)", type: "string" }),
    defineField({ name: "email", title: "Official Desk Email", type: "string" }),
    defineField({ name: "phoneYerevanDesk", title: "Yerevan Desk Phone", type: "string" }),
    defineField({ name: "phoneInternationalWhatsApp", title: "WhatsApp Phone Display", type: "string" }),
    defineField({ name: "whatsappNumberDigits", title: "WhatsApp Digits (no +)", type: "string" }),
    defineField({ name: "workingHours_en", title: "Working Hours (EN)", type: "string" }),
    defineField({ name: "workingHours_hy", title: "Working Hours (HY)", type: "string" }),
    defineField({ name: "timeZone", title: "IANA Timezone", type: "string", initialValue: "Asia/Yerevan" }),
    defineField({ name: "registrationStatus_en", title: "Registration Notice (EN)", type: "string" }),
    defineField({ name: "registrationStatus_hy", title: "Registration Notice (HY)", type: "string" }),
  ],
});

export const pageSeoType = defineType({
  name: "pageSeo",
  title: "Page SEO & Social Share",
  type: "object",
  fields: [
    defineField({
      name: "seoTitle",
      title: "Browser / Google Title",
      type: "string",
      description: "Recommended 50–65 characters.",
    }),
    defineField({
      name: "seoDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Shown on Google results and WhatsApp/LinkedIn link previews (120–160 characters).",
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image (Optional)",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});

export const tourGalleryItemType = defineType({
  name: "tourGalleryItem",
  title: "Tour Gallery Photo",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Photo", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
    defineField({ name: "alt_en", title: "Caption / Alt Text (EN)", type: "string" }),
    defineField({ name: "alt_hy", title: "Caption / Alt Text (HY)", type: "string" }),
  ],
  preview: {
    select: { title: "alt_en", media: "image" },
    prepare({ title, media }) {
      return { title: title || "Gallery Photo", media };
    },
  },
});

export const tourItineraryStepType = defineType({
  name: "tourItineraryStep",
  title: "Tour Day Stop",
  type: "object",
  fields: [
    defineField({ name: "day", title: "Day Number", type: "number", initialValue: 1, validation: (r) => r.required() }),
    defineField({ name: "title_en", title: "Day Title (EN)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title_hy", title: "Day Title (HY)", type: "string" }),
    defineField({ name: "description_en", title: "Day Description (EN)", type: "text", rows: 3 }),
    defineField({ name: "description_hy", title: "Day Description (HY)", type: "text", rows: 3 }),
  ],
  preview: {
    select: { day: "day", title: "title_en" },
    prepare({ day, title }) {
      return { title: `Day ${day || "?"}: ${title || "Untitled"}` };
    },
  },
});

export const bilingualObjectTypes = [
  pageSeoType,
  tourGalleryItemType,
  tourItineraryStepType,
  navItemType,
  sectionHeaderType,
  heroPillarFeatureType,
  foundationSignalType,
  highlightDestinationType,
  itineraryDayType,
  heritagePillarType,
  heroStageItemType,
  pipelineStageType,
  manpowerTrustMetricType,
  manpowerSectorType,
  manpowerTrustPillarType,
  manpowerMobilityStepType,
  employerProcessStepType,
  companyInfoType,
];
