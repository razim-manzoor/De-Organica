# Project State: De Organica LLC (`deorganica.am`)

**Updated:** 2026-11-11  
**Status:** Studio-Grade UI/UX & StageShow Architecture Shipped & Verified  

## Completed Work
1. **Authentic Brand Identity & Vector Lockup:**
   - Grounded in official brand asset (`de-organica-logo.jpg`) provided by client.
   - Re-engineered [`src/components/Logo.tsx`](file:///R:/Projects/De%20Organica/src/components/Logo.tsx) with classical Didone serif `D`, bottom sweeping ligature, botanical olive `O`, dual-leaf sprout, serif wordmark, and tracked `— LLC —` sub-mark.
   - Synchronized [`src/app/icon.svg`](file:///R:/Projects/De%20Organica/src/app/icon.svg) with the identical vector mark.
2. **Interactive StageShow Bento Modules:**
   - Authored [`src/components/ItineraryStageShow.tsx`](file:///R:/Projects/De%20Organica/src/components/ItineraryStageShow.tsx): 4-day Armenia tour explorer (Yerevan/Garni/Geghard, Lake Sevan/Dilijan, Khor Virap/Areni/Noravank, Wings of Tatev) with Mercedes Sedan vs VIP Sprinter selector, guide/wine/EVN toggles, and direct WhatsApp/drawer dispatch.
   - Authored [`src/components/PipelineStageShow.tsx`](file:///R:/Projects/De%20Organica/src/components/PipelineStageShow.tsx): 4-stage transparency tracker (*01: Employer Requisition → 02: Zero-Fee Sourcing → 03: Ministry Work Permits → 04: EVN Airport Reception & Deployment*), highlighting the "Pay-After-Job Placement" guarantee.
   - Integrated into [`src/app/travel/page.tsx`](file:///R:/Projects/De%20Organica/src/app/travel/page.tsx) and [`src/app/manpower/page.tsx`](file:///R:/Projects/De%20Organica/src/app/manpower/page.tsx).
3. **Multi-Route & Subdomain Synergy:**
   - Shipped `/`, `/travel`, `/manpower`, and `/contact` canonical routes.
   - Built Next.js [`src/middleware.ts`](file:///R:/Projects/De%20Organica/src/middleware.ts) supporting **Dual-Mode Subdomain & Path Routing**: automatically rewrites `travel.deorganica.am` to `/travel` and `manpower.deorganica.am` to `/manpower` without code modification, while retaining canonical path access on `deorganica.am`.
4. **Slide-Over Concierge Drawer & WhatsApp Engine:**
   - Accessible `<dialog>` slide-over drawer (`src/components/ConciergeDrawer.tsx`) supporting light-dismiss, keyboard Escape handling, and international dial codes.
   - 3 context-aware operational modes: Travel Booking, Candidate CV Submission, Employer Staffing.
   - `src/lib/whatsapp.ts` structured message formatter.
5. **Backend Route Handler:**
   - `src/app/api/inquiry/route.ts` for multipart form parsing, CV file buffering, and Resend email notifications.
6. **Production Compilation & Performance Telemetry:**
   - `npm run build`: Compiled 100% cleanly with zero errors across all static routes (`/`, `/travel`, `/manpower`, `/contact`), dynamic route (`/api/inquiry`), and Edge Middleware.
   - Awwwards CDP Telemetry (`awwwards audit_url`):
     - `layoutThrashCount: 0`
     - `measureBeforeCompositeCount: 0`
     - `layoutReads: 0`
     - `high: 0` (zero high-severity anti-patterns)
     - Prefers-reduced-motion safety guaranteed across all animations.
   - Live tunnel serving production build at `https://long-paths-take.loca.lt`.

## Outstanding / Client Configuration Points
- Provide official Armenian/international WhatsApp number in `src/data/deorganica-content.ts` (currently configured with placeholder `+374 99 000000`).
- Add `RESEND_API_KEY` to `.env.local` when ready to send live inquiry emails.
- Connect remote Git repository (e.g. GitHub) when target repository URL is provided.
