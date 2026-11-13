import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings & Brand Identity",
  type: "document",
  groups: [
    { name: "company", title: "Company & Contacts", default: true },
    { name: "navigation", title: "Navigation & Footer" },
    { name: "foundation", title: "Corporate Foundation" },
    { name: "seo", title: "Global SEO" },
  ],
  fields: [
    defineField({
      name: "company",
      title: "Company Information & Contacts",
      type: "companyInfo",
      group: "company",
    }),
    defineField({
      name: "nav",
      title: "Top Navigation Links",
      type: "array",
      of: [{ type: "navItem" }],
      group: "navigation",
    }),
    defineField({
      name: "footerDescription_en",
      title: "Footer Overview (EN)",
      type: "text",
      rows: 3,
      group: "navigation",
    }),
    defineField({
      name: "footerDescription_hy",
      title: "Footer Overview (HY)",
      type: "text",
      rows: 3,
      group: "navigation",
    }),
    defineField({
      name: "corporateFoundation",
      title: "Corporate Foundation Section",
      type: "object",
      group: "foundation",
      fields: [
        defineField({ name: "eyebrow_en", title: "Eyebrow (EN)", type: "string" }),
        defineField({ name: "eyebrow_hy", title: "Eyebrow (HY)", type: "string" }),
        defineField({ name: "title_en", title: "Title (EN)", type: "string" }),
        defineField({ name: "title_hy", title: "Title (HY)", type: "string" }),
        defineField({ name: "subtitle_en", title: "Subtitle (EN)", type: "text", rows: 2 }),
        defineField({ name: "subtitle_hy", title: "Subtitle (HY)", type: "text", rows: 2 }),
        defineField({ name: "signals", title: "Foundation Signals", type: "array", of: [{ type: "foundationSignal" }] }),
      ],
    }),
    defineField({ name: "seoTitle", title: "Default SEO Title", type: "string", group: "seo" }),
    defineField({ name: "seoDescription", title: "Default SEO Description", type: "text", rows: 3, group: "seo" }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings & Company Identity" };
    },
  },
});
