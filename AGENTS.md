# DE ORGANICA LLC — PROJECT DIRECTIVES & WORKSPACE ARCHITECTURE

## 1. Project Overview
- **Domain:** `deorganica.am`
- **Legal Entity:** De Organica LLC (`Republic of Armenia`)
- **Executive Desk:** `deorganicallc@gmail.com`
- **Verticals:**
  1. De Organica Travel & Tours (Inbound Armenia tours, outbound holidays, visa consultation, EVN transfers, B2B DMC ground handling)
  2. De Organica Manpower (International recruitment, legal work permits, candidate vetting, B2B enterprise staffing)

## 2. Technical Stack
- **Framework:** Next.js 15+ (App Router, Strict TypeScript)
- **Styling:** Tailwind CSS with custom brand palette:
  - Heritage Forest Green: `#233D20`
  - Botanical Olive Leaf: `#668B2E`
  - Warm Alabaster Canvas: `#FBFBF9`
  - Architectural Stone: `#F4F3EE`
  - Ink: `#1A2219`
- **Bilingual Engine:** English (`en`) and Armenian (`hy` — Հայերեն) with native `Noto Serif Armenian` and `Noto Sans Armenian` fonts.
- **Config-Driven Data Architecture:** All tours, services, vacancies, and company details live in `src/data/deorganica-content.ts`.

## 3. Key Components & Pathways
- `src/components/ConciergeDrawer.tsx`: Context-aware slide-over modal drawer supporting Travel, Candidate CV upload, and Employer Staffing inquiries.
- `src/lib/whatsapp.ts`: Structured URL & message builder for direct routing to the Yerevan desk.
- `src/app/api/inquiry/route.ts`: Serverless route handler handling multipart form data, CV attachment buffering, and Resend email notifications.
- Dedicated landing routes: `/`, `/travel`, `/manpower`, `/contact`.

## 4. Verification Protocol
- Run `npm run build` to verify strict TypeScript, font bindings, and static generation.
- Zero broken UI states when optional prices or external URLs are omitted.
