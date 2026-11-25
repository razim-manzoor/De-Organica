# De Organica LLC — System Architecture & Design Specification

## 1. Architectural Philosophy
The De Organica platform is architected as an **institutional digital flagship** for a dual-vertical sovereign commercial house in Yerevan, Republic of Armenia:
1. **Vertical I: De Organica Travel & Tours** (Inbound Armenian luxury, outbound leisure, private chauffeured transport, and B2B DMC ground operations).
2. **Vertical II: De Organica Manpower & Recruitment** (Ethical international candidate placement under a strict 0.00 AMD upfront fee contingency model and enterprise workforce staffing).

The system prioritizes **uncompromising visual elegance, zero buzzword inflation, authentic cultural grounding, strict bilingual parity (English / Armenian), and resilient serverless multi-channel inquiry dispatch**.

---

## 2. Technology Stack & Runtime Environment

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | Next.js 15+ (App Router) | High-performance React Server Components, static/ISR generation, and edge-ready API routes. |
| **Language** | Strict TypeScript (ES2022) | 100% type-safe data schema for tours, vacancies, services, and form submissions. |
| **Styling** | Tailwind CSS v3 + PostCSS | Zero-runtime CSS with custom architectural color palette (`brand-forest`, `brand-olive`, `brand-stone`, `brand-ink`). |
| **Typography** | Google Fonts (`next/font/google`) | Native font bindings for `Noto Serif Armenian`, `Noto Sans Armenian`, `Cinzel`, and `Plus Jakarta Sans` with zero layout shift (CLS = 0). |
| **Email Dispatch** | Resend API | Serverless multipart email handling with buffered PDF/Word CV attachments. |
| **Instant Dispatch** | WhatsApp Deep Linking | Direct URL scheme builder routing inquiries with pre-filled structured Armenian/English text to the Yerevan desk. |
| **Icons** | Lucide React | Tree-shaken, pixel-crisp SVG icon set. |
| **Testing** | Playwright (Python / Node) | Automated headless visual regression and image load validation across mobile and desktop viewports. |

---

## 3. Data Flow & Component Hierarchy

### Sanity CMS + Typed Fallback Engine
Content flows from Sanity CMS (`src/sanity/lib/fetch.ts`) with deep-merge fallback onto typed local defaults (`src/data/cms-fallbacks.ts` & `src/data/deorganica-content.ts`) whenever `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset or fields are omitted:
- **Singletons:** `siteSettings`, `homePage`, `travelPage`, `manpowerPage`
- **Collections:** `tourPackage` (drives `/travel` + dynamic `/travel/[slug]` + `/sitemap.xml`), `travelService`, `jobVacancy` (filtered by `isPublished == true`), `faqItem`
- **Embedded Desk & Webhooks:** `/studio` (Sanity Studio v4 via `next-sanity/studio`), `/api/revalidate` (ISR tag/path invalidation), `/api/draft-mode/enable|disable`.

### Component Hierarchy & Layout Tree
```
RootLayout (src/app/layout.tsx)
 ├── LanguageProvider (src/context/LanguageContext.tsx)
 │    └── DrawerProvider (src/context/DrawerContext.tsx)
 │         ├── Header (src/components/Header.tsx)
 │         │    ├── Logo (src/components/Logo.tsx)
 │         │    ├── NavigationLinks (Overview, Travel, Manpower, Contact)
 │         │    └── LanguageSwitcher (src/components/LanguageSwitcher.tsx)
 │         │
 │         ├── Route Content:
 │         │    ├── / (src/app/page.tsx)
 │         │    │    ├── HeroDualGateway.tsx
 │         │    │    ├── YerevanCrossroadsBanner.tsx
 │         │    │    ├── ItineraryStageShow.tsx (Travel Preview)
 │         │    │    ├── PipelineStageShow.tsx (Manpower Preview)
 │         │    │    ├── CorporateFoundation.tsx
 │         │    │    └── ContactSection.tsx
 │         │    │
 │         │    ├── /travel (src/app/travel/page.tsx)
 │         │    │    ├── TravelHero.tsx
 │         │    │    ├── ItineraryStageShow.tsx
 │         │    │    ├── TravelServicesMatrix.tsx
 │         │    │    ├── FeaturedToursGrid.tsx (Flagship Panoramic + 2x2 Grid)
 │         │    │    ├── TravelHeritageShowcase.tsx (Living Culture)
 │         │    │    ├── DmcPartnerSection.tsx
 │         │    │    ├── TravelFaqSection.tsx
 │         │    │    └── ContactSection.tsx
 │         │    │
 │         │    ├── /manpower (src/app/manpower/page.tsx)
 │         │    │    ├── ManpowerHero.tsx
 │         │    │    ├── PipelineStageShow.tsx
 │         │    │    ├── ManpowerCandidateHub.tsx (Ethical Charter + Vacancies)
 │         │    │    ├── ManpowerEmployerSection.tsx
 │         │    │    ├── ManpowerComplianceBanner.tsx
 │         │    │    ├── ManpowerFaqSection.tsx
 │         │    │    └── ContactSection.tsx
 │         │    │
 │         │    └── /contact (src/app/contact/page.tsx)
 │         │         └── ContactSection.tsx
 │         │
 │         ├── ConciergeDrawer (src/components/ConciergeDrawer.tsx)
 │         │    ├── PhoneCountryInput (src/components/PhoneCountryInput.tsx - 38+ SVG Flags)
 │         │    ├── Travel Inquiry Form
 │         │    ├── Candidate Application Form (with File Buffer)
 │         │    └── Employer Staffing RFP Form
 │         │
 │         └── Footer (src/components/Footer.tsx)
```

---

## 4. Multi-Channel Dispatch Pipeline

```
                       ┌────────────────────────┐
                       │  User Submits Inquiry  │
                       └───────────┬────────────┘
                                   │
                  ┌────────────────┴────────────────┐
                  ▼                                 ▼
      [Email Route Dispatch]              [Instant WhatsApp Desk]
      POST /api/inquiry                   src/lib/whatsapp.ts
      Multipart Form-Data                 buildWhatsAppUrl(...)
                  │                                 │
                  ▼                                 ▼
     ┌────────────────────────┐         ┌────────────────────────┐
     │ Node.js Serverless API │         │ Redirects to           │
     │ - Buffers CV file      │         │ https://wa.me/374...   │
     │ - Sanitizes telemetry  │         │ with structured        │
     │ - Formats HTML Table   │         │ Armenian/English text  │
     └────────────┬───────────┘         └────────────────────────┘
                  │
                  ▼
     ┌────────────────────────┐
     │ Resend API Delivery    │
     │ -> deorganicallc@gmail │
     └────────────────────────┘
```

---

## 5. Bilingual Font Loading Strategy

To ensure zero layout shift and flawless rendering of the Armenian alphabet:
1. `Noto Serif Armenian`, `Noto Sans Armenian`, `Cinzel`, and `Plus Jakarta Sans` are instantiated in `src/app/layout.tsx` via `next/font/google` and configured with CSS variable bindings (`--font-serif`, `--font-sans`, `--font-armenian-serif`, `--font-armenian-sans`).
2. Tailwind maps `font-serif` and `font-sans` to those CSS variables in `tailwind.config.ts`.
3. The root layout updates `lang={locale}` via `LanguageContext`, guaranteeing semantic accessibility for screen readers.

---

## 6. Security & Production Checklist
- **No Client-Side Secrets:** Resend API keys are strictly server-side (`RESEND_API_KEY`).
- **File Upload Safeguards:** `api/inquiry` limits candidate CV attachments to 4 MB with strict MIME and magic-byte validation (PDF, DOC, DOCX).
- **Zero External Stock Vulnerabilities:** Cultural photography is permanently hosted inside `public/images/` to eliminate broken external CDN URLs.
