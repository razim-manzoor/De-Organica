# Project State: De Organica LLC (`deorganica.am`)

**Updated:** 2026-11-11  
**Status:** V1 Foundation & Architecture Shipped & Verified  

## Completed Work
1. **Design & Taste Blueprint:**
   - Authored and approved design blueprint adhering to `taste-skill` and `modern-web-guidance`.
   - Defined Heritage Forest Green (`#233D20`), Botanical Olive Leaf (`#668B2E`), and warm stone neutral tokens.
   - Built mathematical SVG Monogram & Wordmark honoring the interlocking D-O with botanical olive leaf mark.
2. **Grow-As-You-Go Content Architecture:**
   - `src/types/content.ts` & `src/data/deorganica-content.ts` authored with complete bilingual (`en` and `hy`) copy for all 6 travel services, starter tour itineraries, active job vacancies, and B2B employer staffing.
   - Translation fallback helper `tField` automatically defaults missing Armenian fields to English.
3. **Slide-Over Concierge Drawer & WhatsApp Engine:**
   - Accessible `<dialog>` slide-over drawer (`src/components/ConciergeDrawer.tsx`) supporting light-dismiss, keyboard Escape handling, and international dial codes.
   - 3 context-aware operational modes: Travel Booking, Candidate CV Submission, Employer Staffing.
   - `src/lib/whatsapp.ts` structured message formatter.
4. **Backend Route Handler:**
   - `src/app/api/inquiry/route.ts` for multipart form parsing, CV file buffering, and Resend email notifications.
5. **Multi-Route & Subdomain Synergy:**
   - Shipped `/`, `/travel`, `/manpower`, and `/contact` canonical routes.
   - Built Next.js [`src/middleware.ts`](file:///R:/Projects/De%20Organica/src/middleware.ts) supporting **Dual-Mode Subdomain & Path Routing**: automatically rewrites `travel.deorganica.am` to `/travel` and `manpower.deorganica.am` to `/manpower` without code modification, while retaining canonical path access on `deorganica.am`.
6. **Verification & Local Testing:**
   - `npm run build`: Compiled 100% cleanly with zero errors across all static routes (`/`, `/travel`, `/manpower`, `/contact`), dynamic route (`/api/inquiry`), and Edge Middleware.
   - Subdomain Verification: Verified `travel.localhost` and `manpower.localhost` rewrites return the respective divisional portals.
   - Local HTTP Endpoint Testing: Verified HTTP 200 on all routes.
   - API Multipart Testing: Verified `POST /api/inquiry` handles travel and candidate CV submissions with file buffering and returns `{ success: true }`.
   - Browser & Accessibility Verification (Playwright): Verified visual layout, backdrop light-dismiss, keyboard Escape dismissal, and instant `EN | ՀԱՅ` font switching.
   - Git State: Clean working tree on `master` (`71a45af`) with studio-grade UI/UX elevations, tactile micro-interactions, and Awwwards-audited layout.

## Outstanding / Client Configuration Points
- Provide official Armenian/international WhatsApp number in `src/data/deorganica-content.ts` (currently configured with placeholder `+374 99 000000`).
- Add `RESEND_API_KEY` to `.env.local` when ready to send live inquiry emails.
- Connect remote Git repository (e.g. GitHub) when target repository URL is provided.
