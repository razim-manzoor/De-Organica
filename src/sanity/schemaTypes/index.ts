import { type SchemaTypeDefinition } from "sanity";
import { bilingualObjectTypes } from "./objects/bilingualObjects";
import { tourPackageType } from "./documents/tourPackageType";
import { travelServiceType } from "./documents/travelServiceType";
import { jobSectorType } from "./documents/jobSectorType";
import { jobVacancyType } from "./documents/jobVacancyType";
import { faqItemType } from "./documents/faqItemType";
import { siteSettingsType } from "./singletons/siteSettingsType";
import { homePageType } from "./singletons/homePageType";
import { travelPageType } from "./singletons/travelPageType";
import { manpowerPageType } from "./singletons/manpowerPageType";
import { contactPageType } from "./singletons/contactPageType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    ...bilingualObjectTypes,
    siteSettingsType,
    homePageType,
    travelPageType,
    manpowerPageType,
    contactPageType,
    tourPackageType,
    travelServiceType,
    jobSectorType,
    jobVacancyType,
    faqItemType,
  ],
};
