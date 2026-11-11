# Project State: De Organica LLC (`deorganica.am`)

**Updated:** 2026-11-11  
**Status:** Distinct Visual Archetypes & Thematic Domain Language Shipped & Verified  

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
2. **Authentic Brand Identity & Vector Lockup:**
   - Grounded in official brand asset (`de-organica-logo.jpg`).
   - Re-engineered [`src/components/Logo.tsx`](file:///R:/Projects/De%20Organica/src/components/Logo.tsx) with Didone serif `D`, curved ligature, olive `O` with dual-leaf sprout, serif wordmark, and tracked `— LLC —`.
   - Synchronized [`src/app/icon.svg`](file:///R:/Projects/De%20Organica/src/app/icon.svg).
3. **Interactive StageShow Bento Modules:**
   - [`src/components/ItineraryStageShow.tsx`](file:///R:/Projects/De%20Organica/src/components/ItineraryStageShow.tsx) (Travel) and [`src/components/PipelineStageShow.tsx`](file:///R:/Projects/De%20Organica/src/components/PipelineStageShow.tsx) (Manpower).
4. **Production Compilation & Verification:**
   - `npm run build`: Compiled 100% cleanly (exit code `0`) across all static pages, dynamic route handler, and edge middleware.
   - Awwwards CDP Telemetry (`awwwards audit_url`): `layoutThrashCount: 0`, `measureBeforeCompositeCount: 0`, `layoutReads: 0`, `high: 0`.
   - All 4 routes respond with HTTP 200.

## Outstanding / Client Configuration Points
- Provide official Armenian/international WhatsApp number in `src/data/deorganica-content.ts` (currently configured with placeholder `+374 99 000000`).
- Add `RESEND_API_KEY` to `.env.local` when ready to send live inquiry emails.
- Connect remote Git repository (e.g. GitHub) when target repository URL is provided.
