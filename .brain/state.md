# Project State: De Organica LLC (`deorganica.am`)

**Updated:** 2026-11-11  
**Status:** Studio-Grade Flagship Verified & Shipped (SEO, Archetypes, Telemetry)

## Completed Work
1. **Thematic Visual Archetypes Tailored to Domain (Anti-Slop):**
   - **Archetype I: Travel & Tours (`/travel`)**:
     - Warm volcanic tufa ochre & stone palette (`#F5EFEB`, `#E9DFD5`, `#8C5338`).
     - Geographic coordinate baseline (`YEREVAN HUB · 40.1792° N, 44.4991° E · 1,020m – 2,200m ASL`).
     - Interactive **Armenian Destination Panorama Capsule** with live tab switching across Garni/Geghard, Lake Sevan, Khor Virap/Ararat, and Wings of Tatev (altitude meters, distances from Yerevan, seasonal windows, and direct route inquiries).
   - **Archetype II: Manpower & Recruitment (`/manpower`)**:
     - High-trust architectural blueprint styling (`bg-slate-50` with fine technical hairline borders).
     - Official `REPUBLIC OF ARMENIA · MINISTRY OF LABOR FRAMEWORK` and `PAY-AFTER-JOB GUARANTEE` seals.
     - Apple-style **Dimensional Spec Sheet** (`DWG NO: ARM-REC-2026 / REV 2.4`) with interactive Candidate vs Enterprise Employer protocol switcher.
     - Verifiable metrics: `0.00 AMD Upfront Fee`, `15–25 Days Ministry Permit SLA`, `100% Legal Residence Card`.
   - **Archetype III: Corporate Gateway (`/`)**:
     - Visual dual-pillar split contrasting the natural heritage world of Division I with the legal workforce world of Division II.
   - **Archetype IV: Yerevan Executive Desk (`/contact`)**:
     - Live real-time Yerevan local clock (`Asia/Yerevan`, `GMT+4`) with active desk indicator.
     - 3 intent-segmented direct WhatsApp routing channels (Travel, Job Seekers, Enterprise Employers).
     - Republic of Armenia State Registry & corporate credentials.
2. **SEO, Schema & Discovery Architecture:**
   - Shipped `src/app/sitemap.ts` generating canonical `/sitemap.xml` with priorities and weekly change frequencies.
   - Shipped `src/app/robots.ts` generating `/robots.txt` disallowing internal APIs and pointing to sitemap.
   - Integrated Schema.org JSON-LD structured data (`Organization`, `TravelAgency`, `EmploymentAgency`) in `src/app/layout.tsx`.
   - Optimized header navigation breakpoint (`lg:flex`) for full menu visibility on standard laptops and desktops.
3. **Authentic Brand Identity & Vector Lockup:**
   - Grounded in official brand asset (`de-organica-logo.jpg`).
   - Re-engineered [`src/components/Logo.tsx`](file:///R:/Projects/De%20Organica/src/components/Logo.tsx) with Didone serif `D`, curved ligature, olive `O` with dual-leaf sprout, serif wordmark, and tracked `— LLC —`.
   - Synchronized [`src/app/icon.svg`](file:///R:/Projects/De%20Organica/src/app/icon.svg).
4. **Interactive StageShow Bento Modules:**
   - [`src/components/ItineraryStageShow.tsx`](file:///R:/Projects/De%20Organica/src/components/ItineraryStageShow.tsx) (Travel) and [`src/components/PipelineStageShow.tsx`](file:///R:/Projects/De%20Organica/src/components/PipelineStageShow.tsx) (Manpower).
5. **Production Compilation & Verification:**
   - `npm run build`: Compiled 100% cleanly (exit code `0`) generating all 11 static assets, dynamic route handler, and edge middleware.
   - Awwwards CDP Telemetry (`awwwards audit_url`): `layoutThrashCount: 0`, `measureBeforeCompositeCount: 0`, `layoutReads: 0`, `high: 0`.
   - All 6 endpoints (`/`, `/travel`, `/manpower`, `/contact`, `/sitemap.xml`, `/robots.txt`) return HTTP 200.
   - Public preview tunnel active at `https://itchy-trees-yawn.loca.lt` (Password IP: `223.181.9.221`).

## Outstanding / Client Configuration Points
- Provide official Armenian/international WhatsApp number in `src/data/deorganica-content.ts` (currently configured with placeholder `+374 99 000000`).
- Add `RESEND_API_KEY` to `.env.local` when ready to send live inquiry emails.
- Connect remote Git repository (e.g. GitHub) when target repository URL is provided.
