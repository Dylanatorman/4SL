# Changelog

All notable changes to the 4StudentLives VC Brief project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [0.6.0] - 2025-10-06

### Added - Cinematic Splash Screen Intro

**New Component: SplashIntro**
- **Premium 9-second intro sequence** presenting 4StudentLives and Startup Ignition branding
- Only displays once per browser session (sessionStorage)
- Accessible skip functionality (click anywhere, ESC key, or "Skip intro" button)
- Respects `prefers-reduced-motion` accessibility preference

**Visual Sequence:**
1. **4SL Logo** - Smooth 1.3s fade-in on navy background (#1A3859)
2. **"Presents Dossier for"** - Gold text (#FCC169) appears at 2.3s
3. **Startup Ignition Arrow** - Green arrow animates down at 3.9s (layered on top)
4. **Startup Ignition Base** - White base logo fades in behind arrow at 4.9s
5. **2.5s Dramatic Reveal** - Radial mask expansion smoothly reveals VC Brief content underneath

**Split-Screen Background:**
- Top half: 4SL Secondary Navy (#1A3859)
- Bottom half: Startup Ignition dark green (rgba(23, 29, 26, 1))
- Creates elegant two-tone presentation backdrop

**Technical Implementation:**
- Content always rendered underneath splash (prevents white flash)
- Exit animation uses CSS mask for smooth radial reveal
- No opacity fade - pure mask expansion for clean transition
- Framer Motion for all animations with premium easing curves
- z-index layering ensures proper logo stacking (arrow over base)

**Assets Added:**
- `/public/startup_ignition_arrow_hd.png` - Green arrow logo (top layer)
- `/public/startup_ignition_base_hd.png` - White base text (bottom layer)

**User Experience:**
- Prevents initial content flash by checking sessionStorage on mount
- Skip functionality always available for repeat viewers
- sessionStorage flag ensures one view per tab session
- Smooth transition into main VC brief content

### Files Created
- `/components/splash/SplashIntro.tsx` - Main splash screen component

### Files Modified
- `/app/page.tsx` - Wrapped main content with SplashIntro component

---

## [0.5.6] - 2025-10-06

### Changed - Tab Rename & Mandates Layout

**Tab 2: Renamed to "Impact"**
- Changed tab name from "Perfect Storm" to "Impact" for clearer messaging
- Tab trigger text updated in navigation

**Tab 2: Chart Visualization Fix**
- **Fixed Mandate Adoption Bar Chart:**
  - Added left margin (20px) to prevent y-axis label cutoff
  - "States with Mandates" label now fully visible (was truncated to "Mand...")

**Tab 4: The Mandate Landscape - California Comparison Section**
- **Added California Header:**
  - Large, bold "California" header (text-4xl) now displayed above SB 906/SB 1241 sections
  - Clearly indicates these bills are California-specific legislation

- **Swapped Layout:**
  - LEFT side: California bills (SB 906 & SB 1241) with requirements
  - RIGHT side: 4StudentLives solutions
  - Previous layout had 4SL on left and bills on right
  - Better visual flow showing mandate → solution

### Files Modified
- `/app/page.tsx` - Tab rename, chart margin fix, California header addition, layout swap

---

## [0.5.5] - 2025-10-06

### Changed - Mandate Links & Citations

**Tab 4: The Mandate Landscape**
- **Removed State Card Hyperlinks:**
  - Removed "View Statute" links from individual state cards
  - Cleaner, more professional presentation
  - All statute references remain in Sources & Citations section

- **Updated California Bill Links:**
  - Split California SB 906 and SB 1241 into 4 separate citation entries
  - Each bill now has dedicated "Bill Status" and "Full Text" links
  - Full URLs displayed as clickable link text for transparency
  - New links:
    - SB 906 Bill Status: `https://leginfo.legislature.ca.gov/faces/billStatusClient.xhtml?bill_id=202320240SB906`
    - SB 906 Full Text: `https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB906`
    - SB 1241 Bill Status: `https://leginfo.legislature.ca.gov/faces/billStatusClient.xhtml?bill_id=202320240SB1241`
    - SB 1241 Full Text: `https://leginfo.legislature.ca.gov/faces/billTextClient.xhtml?bill_id=202320240SB1241`

### Files Modified
- `/app/page.tsx` - Removed state card links, updated CA bill citations

---

## [0.5.4] - 2025-10-06

### Changed - Traction Data & Vision Updates

**Tab 7: Market Opportunity**
- **Current Traction Metrics Updated:**
  - Districts: Changed from 6 to **17**
  - Students Served: Changed from "Thousands" to **36,800**
  - Assessments Completed: Replaced with **States Served: 3**
  - More accurate representation of current market penetration

**Tab 8: The Vision** (formerly "The Ask")
- **Tab Renamed:**
  - Changed from "The Ask" to "The Vision" for stronger messaging

- **Use of Funds Restructured (4 → 3 categories):**
  - **Product Development: 40%**
    - Description: "Compliance, platform scalability, and AI integration"
    - Consolidated State-Specific Compliance Engineering and Platform Scalability
  - **Sales and Marketing Efforts: 40%**
    - Description: "Target mandate states, build partnerships, and accelerate market penetration"
    - Increased from 35% to reflect go-to-market priority
  - **Customer Success and Retention: 20%**
    - Description: "Ensure adoption, maximize retention, and drive district expansion"
    - Increased from 15% to emphasize retention focus

### Files Modified
- `/app/page.tsx` - Tab 8 title rename
- `/lib/content.json` - Traction metrics, Use of Funds categories

---

## [0.5.3] - 2025-10-06

### Changed - Data & Visual Updates

**Tab 5: Discovery**
- **Progress Bar Color System:**
  - Implemented percentage-based color coding for "Mandate Readiness & Gaps" and "Current State of Case Management" sections
  - 90s percentages (90-99%) → Green (indicates compliance/achievement)
  - 70s percentages (70-79%) → Gold (#FCC169) (indicates moderate performance)
  - 20s percentages (20-29%) → Red (indicates gaps/opportunities)
  - Enhanced visual clarity showing compliance gaps and opportunities

**Tab 6: Why We Win**
- **Quote Formatting Fixed:**
  - Added closing quotation mark (&rdquo;) to pull quote
  - Quote now properly formatted with both opening and closing marks

**Tab 7: Market Opportunity** (formerly "Business")
- **Tab Title Renamed:**
  - Changed from "Business" to "Market Opportunity" for clearer messaging
- **Market Size Data Updated:**
  - Changed total market from "130,000+ U.S. schools" to "13,500 districts"
  - Updated TAM from "$5B+" to "$200M" (compliance and safety technology market)
  - More accurate representation of addressable market based on district-level sales model

**Sources & Citations**
- **NCES Citation Enhanced:**
  - Updated with specific URL: https://nces.ed.gov/programs/digest/d23/tables/dt23_214.10.asp
  - Added specific data point: "Approximately 13,500 public school districts in the United States"
  - Provides authoritative source for district count

### Files Modified
- `/app/page.tsx` - Discovery progress bars, Why We Win quote, tab title
- `/lib/content.json` - Market size data (districts and TAM)

---

## [0.5.2] - 2025-10-06

### Changed - UI/UX Updates

**Tab 3: The Solution**
- **"What We Replace" Tiles Redesign:**
  - Changed tile backgrounds from white with border to gold (#FCC169) with navy text (#05092B)
  - Added shadow effects with hover states for consistency with other gold cards
  - Updated arrow icons to navy color to match text

**Tab 4: The Mandate Landscape**
- **"Establishing the Standard" Card:**
  - Renamed from "The Future Baseline" to "Establishing the Standard"
  - Moved to appear directly under the hero section (was at bottom before sources)
  - Changed background to gold (#FCC169) with navy text
  - Added shadow effects with hover state
- **Terminology Updates:**
  - Changed "digital threat assessment" to "digital suicide risk and behavioral threat assessment platforms" (2 locations)
  - Updated text from "the future baseline for compliance" to "the emerging standard"

**Tab 5: Discovery**
- **Stats at a Glance Update:**
  - Changed "Districts Represented" description from "Across the state" to "by Engaged Counties"

**Tab 6: Why We Win**
- **Content Simplification:**
  - Removed "The Gap" explanation card ("Adjacent functions (reporting, emergency response) ≠ Compliance backbone for threat assessment mandates")

### Files Modified
- `/app/page.tsx` - Updated Solution, Mandates, and Why We Win tabs
- `/lib/content.json` - Updated mandate terminology and Discovery stats

---

## [0.5.1] - 2025-10-06

### Changed - Content Updates

**Tab 1: The Crisis**
- **"Preventable" Stat Card Updated:**
  - Changed value from "Most" to "94%"
  - Updated description from "Had identifiable precursors never formally assessed" to "Of attackers had identifiable precursors never formally assessed"
- **School Shootings Graph:**
  - Updated data range to show only 2020-2024 (removed 2018-2019 data)
  - Now displays 5 years instead of 7 for more focused recent trends

**Tab 3: The Solution**
- **Core Capabilities Enhancement:**
  - Updated "Digitized Suicide Risk Assessments" to "Digitized Suicide Risk and Behavioral Threat Assessments"
- **Content Reorganization:**
  - Moved "What We Replace" section to appear immediately after Mission statement
  - Removed quote card ("A standardized platform ensures no concern falls through the cracks...")
  - New order: Hero → Mission → What We Replace → Core Capabilities → Sources

### Files Modified
- `/lib/content.json` - Updated crisis and solution content
- `/lib/crisis-data.ts` - Filtered shooting data to 2020-2024
- `/app/page.tsx` - Reordered Solution tab sections and removed quote card

---

## [0.5.0] - 2025-10-06

### Added
- **Partnership Letter PDF Viewer:** Embedded PDF viewer for California County Superintendents Partnership Letter in Discovery tab
  - 800px height iframe displaying official partnership renewal document
  - Download button with gold styling below the PDF viewer
  - PDF file added to `/public/` directory

### Changed - Major UI/UX Redesign
- **Background Color:** Changed main page background from navy (#1A3859) to white for improved readability
- **Active Tab Styling:** Active tab buttons now have gold background (#FCC169) with navy text instead of white background
- **Text Color Standardization:** All body text changed from grey (#7A7A7A) to navy (#05092B) for better consistency and readability
- **Footer Styling:** Updated footer colors to work with white background (slate-200 border, slate-600 text)

### Changed - Stat Cards Redesign
All stat cards across the app now feature gold backgrounds (#FCC169) with navy text (#05092B):
- **The Crisis Tab:** 4 stat cards (Students Considered Suicide, Leading Cause of Death, School Shootings, Preventable)
- **Perfect Storm Tab:**
  - 3 force cards (Youth Mental Health Crisis, Legal & Regulatory Demands, Escalating Financial Liability)
  - 4 lawsuit settlement cards (Virginia Tech, Marysville WA, Parkland FL, Cleveland v. Taft)
- **Discovery Tab:** 4 stats at a glance cards (counties engaged, districts, respondents, sessions)
- **Business Tab:** 4 traction metric cards (Districts, Students Served, Assessments Completed, Pipeline)

### Fixed
- **Youth Suicide Rate Chart:** Added explicit tick marks for all years 2011-2021 including 2020
  - Chart now displays all 11 years without skipping any
  - Added angled labels (-45 degrees) to prevent overlapping
  - Increased chart container height to accommodate angled labels

### UI Improvements
- Enhanced hover effects on all gold stat cards (shadow increases on hover)
- Improved visual hierarchy with navy header and white content area
- Better contrast throughout the application
- Consistent gold accent color usage across all interactive elements

---

## [0.4.1] - 2025-10-06

### Changed
- **Renamed Tab 5:** "California" tab renamed to "Discovery" for clearer messaging
- **Improved Progress Bar Visibility:**
  - Increased progress bar height from 8px to 12px (h-2 to h-3)
  - Enhanced background contrast (slate-100 to slate-200)
  - Added explicit height class to colored bars for consistent rendering
  - Progress bars now properly display percentages in both "Mandate Readiness & Gaps" and "Current State of Case Management" sections

### UI/UX Improvements
- Discovery tab progress bars are now more prominent and easier to read
- Better visual representation of the gap between current compliance (21%) and demand (97%)

---

## [0.4.0] - 2025-10-06

### Added - ALL 8 TABS COMPLETED ✅

**Tab 5: California Momentum** ✓
- Hero section "From Discovery to Statewide Partnership"
- Overview of 12-month engagement with CA County Superintendents
- Stats at a Glance (4 metrics):
  - 45/58 counties engaged (≈78% of CA)
  - 550+ districts represented
  - 480-520 unique respondents
  - 100+ sessions & briefings
- Discovery Findings section with 2-column layout:
  - Mandate Readiness & Gaps (5 metrics with progress bars)
  - Current State of Case Management (3 findings)
- Color-coded progress indicators (green/red/gold) showing gaps and opportunities
- Partnership Letter card from CA County Superintendents Board of Directors
  - Official renewal announcement (June 2025)
  - Full letter text with elegant formatting
  - Gold-accented card with amber gradient
- "The Opportunity" statement card highlighting 97% demand vs 21% current implementation
- Sources & Citations with discovery engagement details

### Changed
- All 8 tabs now use ONLY 4SL brand colors consistently
- California tab transformed from placeholder to fully functional with real discovery data
- Added conditional rendering in Mandates tab for different state data structures
- Fixed icon imports (Star, AlertTriangle) for California tab

### Bug Fixes
- Fixed runtime error in Mandates tab when accessing California legislation data
- Added safety checks for optional state data properties

---

## [0.3.0] - 2025-10-06

### Added - 7 TABS COMPLETED ✅

**Tab 2: The Perfect Storm** ✓
- Three converging forces visualization with icons (Brain, Shield, DollarSign)
- Mental Health Crisis force with key statistics
- Legal & Regulatory Demands force with mandate timeline
- Financial Liability force with lawsuit settlements
- Mandate adoption timeline bar chart (2013-2023)
- Lawsuit settlements bar chart showing escalating liability ($11M to $152.5M)
- Convergence statement emphasizing market necessity
- Sources & Citations with all relevant links

**Tab 3: The Solution** ✓
- Mission statement card with Target icon
- Core capabilities organized by three categories:
  - Addressing the Mental Health Crisis
  - Meeting Legal Mandates
  - Eliminating Liability
- "What We Replace" comparison showing transformation from paper to digital
- Pull quote emphasizing standardized platform benefits
- Sources & Citations for compliance frameworks

**Tab 4: The Mandate Landscape** ✓
- 11 states mandate summary card
- Searchable state-by-state breakdown with filter functionality
- Individual state cards showing:
  - State name, statute citation, year enacted
  - Key requirements as checklist
  - Clickable statute links
- California deep dive with SB 906 and SB 1241 (SAFE Act)
- Federal guidance section (DHS, Secret Service)
- "Future Baseline" statement card
- Sources & Citations with all state statute links

**Tab 6: Why We Win** ✓
- Positioning statement emphasizing compliance-specific platform
- "The Gap" explanation card
- Three competitor analysis cards:
  - Navigate360 (broad safety suite)
  - STOPit Solutions (anonymous reporting)
  - Raptor Technologies (visitor/emergency management)
- Strengths/Weaknesses comparison with color-coded sections
- Gap summary for each competitor
- "Our Competitive Moat" section with 7 advantages
- Pull quote on compliance gap
- Sources & Citations for competitive intelligence

**Tab 7: Business & Traction** ✓
- Market size cards (Total Market: 130,000+ schools, $5B+ opportunity)
- Mandated market cards (11 states, 50,000+ schools)
- Current traction metrics (6 districts, thousands of students)
- Revenue model breakdown (SaaS subscription, enterprise scalability)
- Retention strategy cards (compliance-driven, high retention expected)
- "Why Now" section with 5 converging drivers
- Team section highlighting execution speed and engineering agility
- Market outlook statement
- Sources & Citations with NCES and market analysis references

**Tab 8: The Ask** ✓
- Dramatic hero section with vision and mission
- The Opportunity cards (current, trend, future, advantage)
- Use of Funds pie chart with 4 categories:
  - State-Specific Compliance Engineering (30%)
  - Sales & Partnerships (35%)
  - Platform Scalability (20%)
  - Customer Success (15%)
- Detailed breakdown cards for each funding category
- Moral AND Financial impact cards
- "Join Us" call-to-action card with investment details
- Sources & Citations for market and compliance data

### Changed
- All 7 active tabs now use ONLY 4SL brand colors consistently
- Every tab includes Sources & Citations section at bottom
- Consistent hero section pattern across all tabs (navy gradient)
- Uniform card styling with white backgrounds and gold accent borders
- Typography hierarchy standardized across all content
- All data visualizations use brand color palette exclusively

### Components Added
- `PerfectStorm` component replacing old `MarketOpportunity`
- `TheSolution` component replacing old `ProductTechnology`
- `TheMandates` component replacing old `LegalCompliance`
- `CaliforniaMomentum` component (NEW - Tab 5)
- `WhyWeWin` component replacing old `Competition`
- `BusinessAndTraction` component replacing old `Traction`
- `TheAsk` component replacing old `FundingAsk`

### Visualizations Added
- Mandate adoption timeline (bar chart)
- Lawsuit settlements comparison (bar chart)
- Use of funds allocation (pie chart)
- State-by-state mandate cards with search functionality

---

## [0.2.0] - 2025-10-06

### Added
- **Tab 1: The Crisis** - Complete restructure with real data
  - Hero section with navy gradient (#05092B → #1A3859)
  - 4 crisis statistics cards with gold accent borders
  - Youth Suicide Rate graph (2011-2021) showing 39% increase
  - School Shootings graph (2018-2024) showing incident trends
  - "The Common Thread" section emphasizing missed warning signs
  - Sources & Citations section with clickable CDC and EdWeek links
- Crisis data file (`lib/crisis-data.ts`) with TypeScript interfaces
- CSV data integration:
  - `lib/cdc_youth_suicide_rate_10_24_2011_2021.csv`
  - `lib/edweek_school_shootings_2018_2024.csv`
- Complete content structure in `lib/content.json` for all 8 tabs

### Changed
- **Enforced EXACT 4SL Brand Colors:**
  - Primary Navy: `#05092B`
  - Secondary Navy: `#1A3859`
  - Text Gray: `#7A7A7A`
  - Accent Gold: `#FCC169`
  - Link Blue: `#007097`
  - Removed all red/orange colors from crisis visualizations
- Background color changed from gradient to solid `#1A3859`
- Header redesigned with solid navy background matching logo
- Tab structure renamed to match narrative flow

---

## [0.1.0] - 2025-10-05

### Added
- Initial Next.js 14 project setup with TypeScript
- Tailwind CSS configuration with 4SL brand tokens
- shadcn/ui base components
- Framer Motion for animations
- Recharts for data visualization
- 8-tab structure with placeholder content
- 4SL logo integration
- Print/PDF export functionality
- Responsive design with mobile/tablet/desktop support

---

## Current Status

### ✅ Completed (8 of 8 tabs) - 100% COMPLETE 🎉
1. Tab 1: The Crisis ✓
2. Tab 2: The Perfect Storm ✓
3. Tab 3: The Solution ✓
4. Tab 4: The Mandate Landscape ✓
5. Tab 5: California Momentum ✓
6. Tab 6: Why We Win ✓
7. Tab 7: Business & Traction ✓
8. Tab 8: The Ask ✓

### 🚧 Remaining Work (Optional Enhancements)
- [ ] Mobile responsiveness testing across all tabs
- [ ] Print optimization verification
- [ ] Performance optimization (lazy loading charts)
- [ ] Final QA and user review
- [ ] Deployment to Vercel

---

## Development Notes

### Color Enforcement
**CRITICAL:** Only use these exact hex codes:
- `#05092B` - Primary Navy (headings, dark elements)
- `#1A3859` - Secondary Navy (background, secondary elements)
- `#7A7A7A` - Text Gray (body text, descriptions)
- `#FCC169` - Accent Gold (highlights, borders, CTAs)
- `#007097` - Link Blue (clickable links)
- `#FFFFFF` - White (cards, contrast)

No red, orange, or other colors allowed.

### Component Patterns
Every tab follows this structure:
1. Hero section with navy gradient (#05092B → #1A3859)
2. Content sections with white cards
3. Data visualizations using brand colors only
4. Sources & Citations section at bottom

### Data Sources
All content references real sources with clickable links in Sources sections.

---

**Maintainers:** 4StudentLives Team
**Last Updated:** 2025-10-06
**Version:** 0.4.0
