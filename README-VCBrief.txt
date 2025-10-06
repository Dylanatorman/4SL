# 4StudentLives — VC Brief Tabs Site

**Goal:** A static, branded site to present a clickable investor dossier. Tabs for Overview, Cases, Regulations, Market, Vendors, Appendix. Content loads from a single JSON.

## Files
- `VCBriefApp.tsx` — drop-in Next.js page (or React component) using Tailwind and shadcn/ui primitives.
- You will need shadcn/ui and Tailwind configured in the host app.

## What still needs to be done
1. **Branding polish**
   - Set `THEME.company` to `4StudentLives`.
   - Set `THEME.logoUrl` to a hosted PNG/SVG or a data-URI.
   - Optionally recolor header to `#05092B`, tabs active `#1A3859`, buttons `#FCC169`.
2. **Content ingestion**
   - Replace `SAMPLE_CONTENT` with your `content.json` export.
   - Keep fields: `cases`, `regulations`, `vendors`, `market`, `appendix` as modeled.
3. **Components**
   - Ensure shadcn components are installed: `tabs`, `card`, `input`, `badge`, `button`, `dialog`, `separator`.
4. **Security / delivery**
   - Add HTTP basic auth and `X-Robots-Tag: noindex` at the edge (e.g., Vercel).
   - Optional print CSS refinement and “Export section to PDF” later.
5. **QA**
   - Verify every case summary and link. No hallucinations.

## What this code does
- Renders a header with logo and title.
- Shows six tabs.
- Cases tab includes search, tag chips, and a details modal with external link.
- Print button triggers browser print for quick PDF export.
- Brand tokens are centralized in `THEME` and used in a few utility classes.

## Project one-paragraph summary
Build a lightweight, passworded, branded website that presents our investor brief as interactive tabs. Each item (cases, regulations, vendors) is clickable with concise summaries and source links. Single JSON drives content so we can iterate quickly without a CMS. Deploy to Vercel for the VC to review.
