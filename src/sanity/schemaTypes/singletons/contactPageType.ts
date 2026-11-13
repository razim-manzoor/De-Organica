import { defineField, defineType } from "sanity";

export const contactPageType = defineType({
  name: "contactPage",
  title: "Contact Desk Page",
  type: "document",
  groups: [
    { name: "header", title: "Page Header & Desk Status", default: true },
    { name: "channels", title: "Inquiry Channels & SLA" },
    { name: "seo", title: "SEO & Social Share" },
  ],
  fields: [
    defineField({ name: "eyebrow_en", title: "Eyebrow (EN)", type: "string", group: "header" }),
    defineField({ name: "eyebrow_hy", title: "Eyebrow (HY)", type: "string", group: "header" }),
    defineField({ name: "headline_en", title: "Headline (EN)", type: "string", group: "header" }),
    defineField({ name: "headline_hy", title: "Headline (HY)", type: "string", group: "header" }),
    defineField({ name: "subtext_en", title: "Subtext (EN)", type: "text", rows: 3, group: "header" }),
    defineField({ name: "subtext_hy", title: "Subtext (HY)", type: "text", rows: 3, group: "header" }),
    defineField({ name: "deskOpenLabel_en", title: "Desk Open Badge (EN)", type: "string", group: "header" }),
    defineField({ name: "deskOpenLabel_hy", title: "Desk Open Badge (HY)", type: "string", group: "header" }),
    defineField({ name: "deskClosedLabel_en", title: "After-Hours Badge (EN)", type: "string", group: "header" }),
    defineField({ name: "deskClosedLabel_hy", title: "After-Hours Badge (HY)", type: "string", group: "header" }),
    defineField({ name: "coordinates", title: "Yerevan GPS Coordinates", type: "string", group: "header" }),
    defineField({ name: "channelsTitle_en", title: "Channels Section Title (EN)", type: "string", group: "channels" }),
    defineField({ name: "channelsTitle_hy", title: "Channels Section Title (HY)", type: "string", group: "channels" }),
    defineField({ name: "channelsSubtitle_en", title: "Channels Subtitle (EN)", type: "text", rows: 2, group: "channels" }),
    defineField({ name: "channelsSubtitle_hy", title: "Channels Subtitle (HY)", type: "text", rows: 2, group: "channels" }),
    defineField({ name: "replySla_en", title: "Reply SLA Note (EN)", type: "string", group: "channels" }),
    defineField({ name: "replySla_hy", title: "Reply SLA Note (HY)", type: "string", group: "channels" }),
    defineField({ name: "seo", title: "Contact Page SEO", type: "pageSeo", group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Desk Page" };
    },
  },
});
