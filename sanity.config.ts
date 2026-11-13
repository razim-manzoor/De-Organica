import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool, defineLocations } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const SINGLETON_TYPES = new Set([
  "siteSettings",
  "homePage",
  "travelPage",
  "manpowerPage",
  "contactPage",
]);

const plugins = [
  structureTool({ structure }),
  presentationTool({
    title: "Live Preview",
    previewUrl: {
      previewMode: {
        enable: "/api/draft-mode/enable",
      },
    },
    resolve: {
      locations: {
        homePage: defineLocations({
          locations: [{ title: "Home Gateway", href: "/" }],
        }),
        travelPage: defineLocations({
          locations: [{ title: "Travel & Tours", href: "/travel" }],
        }),
        manpowerPage: defineLocations({
          locations: [{ title: "Manpower & Careers", href: "/manpower" }],
        }),
        contactPage: defineLocations({
          locations: [{ title: "Contact Desk", href: "/contact" }],
        }),
        tourPackage: defineLocations({
          select: {
            title: "title_en",
            slug: "slug.current",
          },
          resolve: (doc) => ({
            locations: doc?.slug
              ? [
                  { title: doc.title || "Tour Detail Page", href: `/travel/${doc.slug}` },
                  { title: "All Tour Packages", href: "/travel#tours-matrix" },
                ]
              : [{ title: "All Tour Packages", href: "/travel#tours-matrix" }],
          }),
        }),
        jobVacancy: defineLocations({
          locations: [{ title: "Active Job Openings", href: "/manpower#manpower-candidates" }],
        }),
        travelService: defineLocations({
          locations: [{ title: "Travel Services", href: "/travel#travel-services" }],
        }),
      },
    },
  }),
];

if (process.env.NODE_ENV === "development") {
  plugins.push(visionTool({ defaultApiVersion: apiVersion }));
}

export default defineConfig({
  basePath: "/studio",
  name: "de-organica-studio",
  title: "De Organica LLC — Content Desk",
  projectId: projectId || "unconfigured",
  dataset,
  schema: {
    ...schema,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
  plugins,
  document: {
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((item) => !SINGLETON_TYPES.has(item.templateId))
        : prev,
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({ action }) =>
            action ? ["publish", "discardChanges", "restore"].includes(action) : false
          )
        : input,
  },
});
