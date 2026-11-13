# DE ORGANICA LLC

[![Domain](https://img.shields.io/badge/Domain-deorganica.am-233D20?style=for-the-badge)](https://deorganica.am)
[![Framework](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Bilingual](https://img.shields.io/badge/Bilingual-EN%20%7C%20HY%20%28%D5%80%D5%A1%D5%B5%D5%A5%D6%80%D5%A5%D5%B6%29-668B2E?style=for-the-badge)](#bilingual-engine)

> **Official sovereign commercial web platform for De Organica LLC**, registered in the Republic of Armenia.  
> Bringing premium bespoke tourism, local DMC ground operations, and ethical international recruitment together under one institutional digital experience.

---

## 1. Corporate Overview

- **Legal Entity:** De Organica LLC (`«Դե Օրգանիկա» ՍՊԸ`)
- **Jurisdiction:** Republic of Armenia (`Հայաստանի Հանրապետություն`), Yerevan
- **Founder / CEO:** Maneesha Muraleedharan
- **Official Desk Email:** `deorganicallc@gmail.com`
- **Headquarters Desk:** Yerevan, Republic of Armenia
- **Primary Domain:** [deorganica.am](https://deorganica.am)
- **GitHub Repository:** [github.com/razim-manzoor/De-Organica](https://github.com/razim-manzoor/De-Organica)

### Strategic Commercial Verticals

```
                     ┌──────────────────────────────┐
                     │       DE ORGANICA LLC        │
                     │   Yerevan, Rep. of Armenia   │
                     └──────────────┬───────────────┘
                                    │
            ┌───────────────────────┴───────────────────────┐
            ▼                                               ▼
┌───────────────────────────────┐               ┌───────────────────────────────┐
│     DE ORGANICA TRAVEL        │               │     DE ORGANICA MANPOWER      │
│   Bespoke Inbound Armenia     │               │    Ethical Talent Placement   │
├───────────────────────────────┤               ├───────────────────────────────┤
│ • Tailored Private Tours      │               │ • 0.00 AMD Upfront Fee Model  │
│ • Areni 6,100-Yr Wine Terroir │               │ • Legal Work Permits & Visas  │
│ • Wings of Tatev & Canyons    │               │ • Ministry Quota Management   │
│ • UNESCO Tonir Lavash Masters │               │ • Hospitality & Construction  │
│ • EVN Airport Chauffeur Fleet │               │ • Logistics & Agri Workforce  │
│ • B2B DMC Ground Handling     │               │ • 30-Day Replacement SLA      │
└───────────────────────────────┘               └───────────────────────────────┘
```

---

## 2. Key Architectural Features

### A. Full Armenian & English Bilingual Engine
- Zero machine-translated gibberish: All copy is hand-crafted in English (`en`) and Armenian (`hy` — Հայերեն).
- Native typography bindings via Google Fonts:
  - **Headings & Serif:** `Noto Serif Armenian` + `Playfair Display`
  - **Body & Interface:** `Noto Sans Armenian` + `Inter`
- Client-side language switcher context with persistence and seamless bidirectional layout support.

### B. Sanity CMS & Zero-Dependency Fallback Engine
- **Embedded Studio:** Accessible at `/studio` via [`sanity.config.ts`](sanity.config.ts) and [`src/app/studio/[[...tool]]/page.tsx`](src/app/studio/[[...tool]]/page.tsx). When `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset, `/studio` displays a safe setup screen instead of crashing.
- **Typed Domain Fallback Layer:** [`src/data/cms-fallbacks.ts`](src/data/cms-fallbacks.ts) and [`src/data/deorganica-content.ts`](src/data/deorganica-content.ts) provide 100% bilingual defaults for every singleton (`siteSettings`, `homePage`, `travelPage`, `manpowerPage`) and collection (`tourPackage`, `travelService`, `jobVacancy`, `faqItem`).
- **On-Demand ISR & Draft Preview:** Webhooks trigger [`src/app/api/revalidate/route.ts`](src/app/api/revalidate/route.ts), and editorial previews use `/api/draft-mode/enable` and `/api/draft-mode/disable`.
- **Single-Command Dataset Seeding:** `npm run sanity:seed` uploads local imagery from `public/images/` and upserts all 31 bilingual documents into Sanity (or `--export-ndjson` generates an importable NDJSON bundle).

### C. Tri-Modal Context-Aware Concierge Drawer
- Located at [`src/components/ConciergeDrawer.tsx`](src/components/ConciergeDrawer.tsx).
- Adapts intelligently based on entry point:
  1. **Travel Mode:** Route selection, travel dates, passenger headcount, vehicle class preference, special requests.
  2. **Candidate Mode:** Vacancy / general application, CV/resume file upload, experience level chips, language fluency, mobility status, and mandatory zero-fee legal consent checkbox.
  3. **Employer Mode:** Corporate headcount requisition, industry vertical, corporate tax ID (TIN / ՀՎՀՀ), timeline urgency, and housing policy.

### D. Multi-Region Phone Input with Custom Vector SVG Flags
- Located at [`src/components/PhoneCountryInput.tsx`](src/components/PhoneCountryInput.tsx).
- Bypasses Windows platform emoji bugs where flag emojis fail to render in native dropdowns.
- Features 38+ handcrafted, pixel-crisp SVG vector flags (Armenia, India, UAE, Philippines, Georgia, US, Europe, GCC) with real-time dial-code search.

### E. Serverless Multipart Email & WhatsApp Dispatch
- API handler at [`src/app/api/inquiry/route.ts`](src/app/api/inquiry/route.ts).
- Parses multipart form data, buffers candidate CV attachments, and delivers structured HTML email notifications via Resend.
- Complementary instant WhatsApp router at [`src/lib/whatsapp.ts`](src/lib/whatsapp.ts) constructing structured pre-filled messages directly to the Yerevan operations desk.

### F. Authentic Armenian Cultural Asset Grounding
- 100% of cultural and geographical photos correspond strictly to real Armenian landmarks:
  - **Garni Greco-Roman Temple & Geghard:** Authentic basalt peristyle temple (`public/images/tours/garni-temple.jpg`).
  - **Wings of Tatev:** Authentic aerial ropeway cabin over Vorotan Gorge (`public/images/tours/wings-of-tatev.jpg`).
  - **UNESCO Tonir Lavash:** Authentic Armenian flatbread baking in subterranean clay hearth (`public/images/heritage/tonir-lavash.jpg`).
  - **Tsaghkadzor Ski:** Mount Teghenis chairlift and snow runs (`public/images/tours/tsaghkadzor-ski.jpg`).
  - **Yerevan Cascade:** Cafesjian art center monumental staircase overlooking Mount Ararat (`public/images/tours/yerevan-cascade.jpg`).

---

## 3. Brand Identity & Design System

The visual identity embodies timeless Armenian heritage, volcanic stone architecture, and lush mountain biospheres:

| Color Token | Hex Code | Visual Application |
| :--- | :--- | :--- |
| **Heritage Forest Green** | `#233D20` | Primary brand canvas, header lockups, primary CTA buttons, dark cards. |
| **Botanical Olive Leaf** | `#668B2E` | Section category eyebrows, active highlights, icons, secondary accent buttons. |
| **Warm Alabaster** | `#FBFBF9` | Clean editorial background canvas, subtle card bodies. |
| **Architectural Stone** | `#F4F3EE` | Structural borders, neutral pill containers, alternating section backgrounds. |
| **Historic Armenian Ink** | `#1A2219` | High-contrast editorial typography, titles, body copy. |
| **Armenian Gold Accent** | `#C5A880` | Signature expedition badges, popular highlights. |
| **Official WhatsApp** | `#25D366` | Strictly reserved for direct WhatsApp desk communication triggers. |

---

## 4. Project Directory Structure

```
r:/Projects/De Organica/
├── .brain/                     # Persistent project state and architectural logs
├── public/                     # Static production assets
│   ├── favicon.ico
│   └── images/
│       ├── de-organica-logo.png
│       ├── de-organica-logo-white.png
│       ├── heritage/           # Authentic Armenian UNESCO heritage photos
│       │   └── tonir-lavash.jpg
│       └── tours/              # Authentic Armenian destination photos
│           ├── garni-temple.jpg
│           ├── tsaghkadzor-ski.jpg
│           ├── wings-of-tatev.jpg
│           └── yerevan-cascade.jpg
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── api/
│   │   │   ├── draft-mode/     # Sanity preview enable & disable routes
│   │   │   ├── inquiry/        # Serverless Resend multipart email handler
│   │   │   └── revalidate/     # On-demand Sanity webhook revalidation
│   │   ├── contact/            # /contact dedicated route
│   │   ├── manpower/           # /manpower dedicated route
│   │   ├── studio/             # /studio embedded Sanity Content Desk
│   │   ├── travel/             # /travel overview + /travel/[slug] details
│   │   ├── layout.tsx          # Async root layout fetching SiteSettings & providing SiteDataContext
│   │   ├── page.tsx            # / Overview Gateway route
│   │   ├── sitemap.ts          # Dynamic sitemap including published tours
│   │   └── globals.css         # Tailwind CSS imports and theme variables
│   ├── components/             # Production UI components (including TourDetailView & icons.ts)
│   ├── context/
│   │   ├── DrawerContext.tsx   # Global slide-over drawer state
│   │   ├── LanguageContext.tsx # Global bilingual locale state
│   │   └── SiteDataContext.tsx # Server-injected CMS siteSettings, tours & services
│   ├── data/
│   │   ├── cms-fallbacks.ts    # Typed bilingual default fallbacks for Sanity singletons & collections
│   │   └── deorganica-content.ts# Core typed domain datasets
│   ├── lib/
│   │   └── whatsapp.ts         # Structured WhatsApp message & URL builder
│   ├── sanity/
│   │   ├── env.ts              # Safe Sanity env detection (`isSanityConfigured`)
│   │   ├── structure.ts        # Desk structure organizing Singletons & Collections
│   │   ├── lib/                # client.ts, image.ts, queries.ts, fetch.ts (with fallback merge)
│   │   └── schemaTypes/        # Bilingual object, singleton & document schemas
│   └── types/
│       └── content.ts          # TypeScript interfaces for all CMS & site data structures
├── scripts/
│   └── seed-sanity.mjs         # Seeds Sanity dataset from src/data/cms-fallbacks.ts
├── AGENTS.md                   # Agent directives & workspace rules
├── next.config.mjs             # Next.js image optimization (incl. cdn.sanity.io)
├── package.json                # Dependencies and script definitions
├── sanity.config.ts            # Embedded Sanity Studio configuration
├── README.md                   # This document
├── tailwind.config.ts          # Tailwind theme configuration
└── tsconfig.json               # Strict TypeScript configuration
```

---

## 5. Development & Deployment

### Prerequisites
- Node.js `18.17.0` or later (Node 20+ recommended)
- `npm` or `pnpm`

### Installation

```bash
# Clone the repository
git clone https://github.com/razim-manzoor/De-Organica.git
cd De-Organica

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env.local` file in the project root (see `.env.example`):

```env
# Resend API Key for Email Notifications
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=De Organica Desk <inquiries@deorganica.am>

# Sanity CMS Configuration (Optional — falls back cleanly to local defaults if omitted)
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
SANITY_API_READ_TOKEN=your_read_token
SANITY_REVALIDATE_SECRET=your_webhook_secret
SANITY_API_WRITE_TOKEN=your_write_token
```

### Scripts

```bash
# Start local development server (http://localhost:3000)
npm run dev

# Run strict TypeScript and Next.js production build
npm run build

# Start production server
npm start

# Seed all singletons, tours, services, vacancies, FAQs & local images into Sanity
npm run sanity:seed
```

---

## 6. Verification & Quality Assurance

The codebase adheres to the strict 5-point production quality gate:

1. **Compilation:** `npm run build` generates 100% of static routes with zero TypeScript or syntax errors.
2. **Asset Grounding:** All local and remote photographic assets return HTTP 200 OK and load with verified `naturalWidth > 0`.
3. **Bilingual Parity:** 100% of routes and interactive controls function in both English and Armenian.
4. **Form Telemetry:** Forms validate required inputs, verify CV upload size constraints, and dispatch to both email and WhatsApp desks.
5. **No Broken States:** Gracefully handles omitted optional fields (such as bespoke quote prices or external booking links) without UI distortion.

---

## 7. Corporate Governance & Legal

© 2026 **De Organica LLC** (`«Դե Օրգանիկա» ՍՊԸ`). All Rights Reserved.  
Registered Commercial Enterprise, Republic of Armenia.  
Headquarters: Yerevan, Republic of Armenia.  
Founder & CEO: Maneesha Muraleedharan (`deorganicallc@gmail.com`).
