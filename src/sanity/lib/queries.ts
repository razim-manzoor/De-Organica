import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    company,
    nav,
    footerDescription_en,
    footerDescription_hy,
    corporateFoundation,
    seoTitle,
    seoDescription
  }
`);

export const HOME_PAGE_QUERY = defineQuery(`
  *[_type == "homePage" && _id == "homePage"][0]{
    masthead,
    travelPillar{
      badge_en,
      badge_hy,
      locationStrip_en,
      locationStrip_hy,
      dispatchTag_en,
      dispatchTag_hy,
      title_en,
      title_hy,
      description_en,
      description_hy,
      features,
      "image": coalesce(image.asset->url, imageUrl),
      imageAlt_en,
      imageAlt_hy,
      ctaPrimary_en,
      ctaPrimary_hy,
      ctaSecondary_en,
      ctaSecondary_hy
    },
    manpowerPillar{
      badge_en,
      badge_hy,
      feeTag_en,
      feeTag_hy,
      slaTag_en,
      slaTag_hy,
      title_en,
      title_hy,
      description_en,
      description_hy,
      features,
      "image": coalesce(image.asset->url, imageUrl),
      imageAlt_en,
      imageAlt_hy,
      ctaPrimary_en,
      ctaPrimary_hy,
      ctaSecondary_en,
      ctaSecondary_hy
    },
    crossroadsBanner,
    seo{
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url
    }
  }
`);

export const TRAVEL_PAGE_QUERY = defineQuery(`
  *[_type == "travelPage" && _id == "travelPage"][0]{
    hero{
      eyebrow_en,
      eyebrow_hy,
      headline_en,
      headline_hy,
      subtext_en,
      subtext_hy,
      ctaPrimary_en,
      ctaPrimary_hy,
      ctaSecondary_en,
      ctaSecondary_hy,
      badges,
      destinations[]{
        id,
        name_en,
        name_hy,
        subtitle_en,
        subtitle_hy,
        distKm,
        altitudeM,
        season_en,
        season_hy,
        "image": coalesce(image.asset->url, imageUrl),
        tag_en,
        tag_hy
      }
    },
    itineraryStageShow{
      eyebrow_en,
      eyebrow_hy,
      headline_en,
      headline_hy,
      subtext_en,
      subtext_hy,
      statusBadge_en,
      statusBadge_hy,
      days[]{
        day,
        title_en,
        title_hy,
        places_en,
        places_hy,
        description_en,
        description_hy,
        "image": coalesce(image.asset->url, imageUrl)
      }
    },
    servicesHeader,
    toursHeader,
    heritageShowcase{
      eyebrow_en,
      eyebrow_hy,
      headline_en,
      headline_hy,
      subtext_en,
      subtext_hy,
      cta_en,
      cta_hy,
      pillars[]{
        id,
        title_en,
        title_hy,
        tagline_en,
        tagline_hy,
        desc_en,
        desc_hy,
        badge_en,
        badge_hy,
        "image": coalesce(image.asset->url, imageUrl),
        icon
      }
    },
    dmcPartner,
    faqHeader,
    seo{
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url
    }
  }
`);

export const MANPOWER_PAGE_QUERY = defineQuery(`
  *[_type == "manpowerPage" && _id == "manpowerPage"][0]{
    hero,
    pipelineStageShow,
    candidateHub,
    complianceBanner,
    employerSection,
    faqHeader,
    seo{
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url
    }
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_type == "contactPage" && _id == "contactPage"][0]{
    eyebrow_en,
    eyebrow_hy,
    headline_en,
    headline_hy,
    subtext_en,
    subtext_hy,
    deskOpenLabel_en,
    deskOpenLabel_hy,
    deskClosedLabel_en,
    deskClosedLabel_hy,
    coordinates,
    channelsTitle_en,
    channelsTitle_hy,
    channelsSubtitle_en,
    channelsSubtitle_hy,
    replySla_en,
    replySla_hy,
    seo{
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url
    }
  }
`);

export const JOB_SECTORS_QUERY = defineQuery(`
  *[_type == "jobSector"] | order(coalesce(orderRank, 999) asc, _createdAt asc){
    "id": slug.current,
    label_en,
    label_hy
  }
`);

export const TOURS_QUERY = defineQuery(`
  *[_type == "tourPackage" && coalesce(isPublished, true) == true] | order(coalesce(orderRank, 999) asc, _createdAt asc){
    "id": coalesce(id, _id),
    "slug": slug.current,
    title_en,
    title_hy,
    tagline_en,
    tagline_hy,
    duration_en,
    duration_hy,
    location_en,
    location_hy,
    description_en,
    description_hy,
    highlights_en,
    highlights_hy,
    inclusions_en,
    inclusions_hy,
    "image": coalesce(image.asset->url, imageUrl),
    "gallery": gallery[]{
      "url": image.asset->url,
      alt_en,
      alt_hy
    },
    itinerary,
    price,
    showPrice,
    externalBookingUrl,
    paymentLinkUrl,
    isFeatured,
    "isPublished": coalesce(isPublished, true),
    seo{
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url
    }
  }
`);

export const TOUR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "tourPackage" && slug.current == $slug && coalesce(isPublished, true) == true][0]{
    "id": coalesce(id, _id),
    "slug": slug.current,
    title_en,
    title_hy,
    tagline_en,
    tagline_hy,
    duration_en,
    duration_hy,
    location_en,
    location_hy,
    description_en,
    description_hy,
    highlights_en,
    highlights_hy,
    inclusions_en,
    inclusions_hy,
    "image": coalesce(image.asset->url, imageUrl),
    "gallery": gallery[]{
      "url": image.asset->url,
      alt_en,
      alt_hy
    },
    itinerary,
    price,
    showPrice,
    externalBookingUrl,
    paymentLinkUrl,
    isFeatured,
    "isPublished": coalesce(isPublished, true),
    seo{
      seoTitle,
      seoDescription,
      "ogImage": ogImage.asset->url
    }
  }
`);

export const TRAVEL_SERVICES_QUERY = defineQuery(`
  *[_type == "travelService" && coalesce(isPublished, true) == true] | order(coalesce(orderRank, 999) asc, _createdAt asc){
    "id": coalesce(id, _id),
    "slug": slug.current,
    icon,
    title_en,
    title_hy,
    tagline_en,
    tagline_hy,
    description_en,
    description_hy,
    features_en,
    features_hy,
    badge_en,
    badge_hy,
    "image": coalesce(image.asset->url, imageUrl),
    inquiryType,
    "isPublished": coalesce(isPublished, true)
  }
`);

export const JOB_VACANCIES_QUERY = defineQuery(`
  *[_type == "jobVacancy" && coalesce(isPublished, true) == true] | order(coalesce(orderRank, 999) asc, _createdAt asc){
    "id": coalesce(id, _id),
    "slug": slug.current,
    title_en,
    title_hy,
    "sector": coalesce(sectorRef->slug.current, sector),
    "sector_en": coalesce(sectorRef->label_en, sector_en),
    "sector_hy": coalesce(sectorRef->label_hy, sector_hy),
    location_en,
    location_hy,
    type_en,
    type_hy,
    description_en,
    description_hy,
    requirements_en,
    requirements_hy,
    benefits_en,
    benefits_hy,
    salary,
    showSalary,
    externalRecruitmentUrl,
    "isPublished": coalesce(isPublished, true)
  }
`);

export const FAQS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "faqItem" && category == $category && coalesce(isPublished, true) == true] | order(coalesce(orderRank, 999) asc, _createdAt asc){
    "id": _id,
    category,
    target,
    q_en,
    q_hy,
    a_en,
    a_hy,
    "isPublished": coalesce(isPublished, true)
  }
`);
