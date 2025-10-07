# Architecture Documentation

## Project Architecture - 4StudentLives VC Brief

This document explains the technical architecture, design decisions, and patterns used in the 4StudentLives VC Brief application.

---

## 🏗️ High-Level Architecture

### Technology Stack

```
┌─────────────────────────────────────────────────┐
│              Next.js 14 (App Router)            │
│                  TypeScript                     │
└─────────────────────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────┐
│        React 18 + Framer Motion                 │
│     (Component Layer + Animations)              │
└─────────────────────────────────────────────────┘
                       ↓
┌──────────────┬──────────────┬──────────────────┐
│  Tailwind    │  shadcn/ui   │    Recharts     │
│  CSS 3.4     │  Components  │ Visualizations  │
└──────────────┴──────────────┴──────────────────┘
                       ↓
┌─────────────────────────────────────────────────┐
│        Static JSON Data + CSV Files             │
│         (No Backend Required)                   │
└─────────────────────────────────────────────────┘
```

### Why This Stack?

**Next.js 14:**
- Server-side rendering for SEO (even with noindex, good practice)
- Optimized production builds
- Built-in image optimization
- Fast development experience
- Easy Vercel deployment

**TypeScript:**
- Type safety for content structure
- Autocomplete for developers
- Catch errors at compile time
- Self-documenting interfaces

**Tailwind CSS:**
- Utility-first approach for rapid development
- Custom design tokens for brand colors
- Small production bundle (only used classes)
- Consistent design system

**Framer Motion:**
- Smooth, performant animations
- Declarative animation syntax
- Scroll-based animations
- Professional micro-interactions

**Recharts:**
- React-native charting library
- Responsive charts
- Customizable with brand colors
- Good TypeScript support

---

## 📁 Directory Structure

```
vc-brief-app/
│
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles + design tokens
│   ├── layout.tsx               # Root layout + metadata
│   └── page.tsx                 # ⭐ MAIN FILE - All 8 tab components
│
├── components/
│   ├── ui/                      # Base UI Components (shadcn/ui pattern)
│   │   ├── button.tsx          # Reusable button component
│   │   ├── card.tsx            # Card component with variants
│   │   ├── tabs.tsx            # Tab navigation component
│   │   ├── badge.tsx           # Badge/chip component
│   │   ├── input.tsx           # Form input component (for search)
│   │   ├── dialog.tsx          # Modal dialog component
│   │   └── separator.tsx       # Divider component
│   │
│   └── vc-brief/               # VC Brief Specific Components
│       └── TabSections.tsx     # (OLD - deprecated, not used)
│
├── lib/                         # Utilities & Data
│   ├── content.json            # ⭐ ALL CONTENT DATA
│   ├── crisis-data.ts          # Crisis statistics + CSV data
│   ├── types.ts                # TypeScript interfaces
│   ├── utils.ts                # Helper functions
│   ├── cdc_youth_suicide_rate_10_24_2011_2021.csv
│   └── edweek_school_shootings_2018_2024.csv
│
├── public/                      # Static Assets
│   └── 4SL_logo.png            # 4StudentLives logo
│
├── tailwind.config.ts           # Tailwind configuration + brand tokens
├── next.config.js               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
│
└── Documentation
    ├── README.md                # Full project documentation
    ├── QUICKSTART.md           # Quick start guide
    ├── DEVELOPMENT.md          # Development guide
    ├── next_session.md         # Session summary
    ├── CHANGELOG.md            # Change history
    └── ARCHITECTURE.md         # This file
```

---

## 🎨 Design System Architecture

### Color Token System

**Defined in:** `tailwind.config.ts` and `app/globals.css`

```typescript
// COLORS constant in app/page.tsx
const COLORS = {
  primary: '#05092B',      // e-global-color-primary
  secondary: '#1A3859',    // e-global-color-secondary
  text: '#7A7A7A',         // e-global-color-text
  accent: '#FCC169',       // e-global-color-accent
  link: '#007097',         // e-global-color-fb89c3d
};

const CHART_COLORS = ['#05092B', '#1A3859', '#007097', '#FCC169', '#7A7A7A'];
```

**Usage in Components:**
```tsx
// Direct hex values (most common)
<div className="bg-[#1A3859]">
<h1 className="text-[#05092B]">
<p className="text-[#7A7A7A]">
<button className="border-[#FCC169]">

// Also correct (using Tailwind config)
<div className="bg-brand-secondary">
```

### Typography System

```css
Font Family: 'Space Grotesk' (Google Fonts)
Weights: 300, 400, 500, 600, 700

Hierarchy:
- Hero Titles:    text-5xl/text-6xl font-bold (48px/60px)
- Page Titles:    text-4xl font-bold (36px)
- Section Titles: text-2xl font-semibold (24px)
- Card Titles:    text-xl font-semibold (20px)
- Body Text:      text-base (16px)
- Small Text:     text-sm (14px)
- Captions:       text-xs (12px)
```

### Component Classes

**Custom Utility Classes:**
```css
.card-premium {
  @apply bg-white rounded-xl shadow-premium hover:shadow-premium-lg transition-all duration-300;
}

.gradient-brand {
  background: linear-gradient(135deg, #05092B 0%, #1A3859 100%);
}

.text-gradient {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary;
}
```

---

## 🔧 Component Architecture

### Single-File Pattern (Current Approach)

**All tab components live in:** `app/page.tsx`

**Rationale:**
- Easier to maintain consistent styling
- Shared state management if needed
- Single source of truth
- Faster development iteration
- No prop drilling
- Consistent color usage

**Structure:**
```tsx
// app/page.tsx

// 1. Imports
import { ... } from "next"
import { motion } from "framer-motion"
import { LineChart, BarChart, PieChart } from "recharts"

// 2. Data & Constants
const COLORS = { primary: '#05092B', ... }
const CHART_COLORS = ['#05092B', '#1A3859', ...]

// 3. Shared Components
const BrandHeader = () => { ... }
const StatCard = () => { ... }

// 4. Tab Components (All 8)
const TheCrisis = () => { ... }              // Tab 1 ✓
const PerfectStorm = () => { ... }           // Tab 2 ✓
const TheSolution = () => { ... }            // Tab 3 ✓
const TheMandates = () => { ... }            // Tab 4 ✓
const CaliforniaMomentum = () => { ... }     // Tab 5 ✓ (renamed to "Discovery")
const WhyWeWin = () => { ... }               // Tab 6 ✓
const BusinessAndTraction = () => { ... }    // Tab 7 ✓
const TheAsk = () => { ... }                 // Tab 8 ✓

// 5. Main Page Component
export default function VCBriefPage() {
  return (
    <Tabs defaultValue="crisis">
      <TabsContent value="crisis"><TheCrisis /></TabsContent>
      <TabsContent value="storm"><PerfectStorm /></TabsContent>
      <TabsContent value="solution"><TheSolution /></TabsContent>
      <TabsContent value="mandates"><TheMandates /></TabsContent>
      <TabsContent value="discovery"><CaliforniaMomentum /></TabsContent>
      <TabsContent value="competition"><WhyWeWin /></TabsContent>
      <TabsContent value="business"><BusinessAndTraction /></TabsContent>
      <TabsContent value="funding"><TheAsk /></TabsContent>
    </Tabs>
  )
}
```

### Component Pattern Template

Every tab component follows this structure:

```tsx
const TabName: React.FC = () => {
  // 1. Get content from JSON
  const tabContent = (content as any).sectionName;

  return (
    <div className="space-y-8">
      {/* Hero Section - REQUIRED */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-12 text-white shadow-2xl"
      >
        <div className="relative z-10">
          <h2 className="text-5xl font-bold">{tabContent.title}</h2>
          <p className="mt-4 text-2xl text-white/90">{tabContent.subtitle}</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-white/5 to-transparent" />
      </motion.div>

      {/* Content Sections */}
      <Card className="border-t-4 border-t-[#FCC169]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">Section Title</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Section content */}
        </CardContent>
      </Card>

      {/* Visualizations (if applicable) */}
      <Card>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <Bar dataKey="value" fill="#05092B" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Sources Section - REQUIRED */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Sources & Citations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>
              <strong>Source Name</strong> -{' '}
              <a href="URL" target="_blank" rel="noreferrer" className="text-[#007097] hover:underline">
                URL
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
```

---

## 📊 Data Architecture

### Content Structure

**Primary Data File:** `lib/content.json`

**Why JSON?**
- Easy to edit by non-developers
- No database needed
- Type-safe with TypeScript interfaces
- Fast to load (client-side)
- Version control friendly

**Structure:**
```json
{
  "crisis": {
    "title": "A System Failing Its Students",
    "subtitle": "...",
    "keyStats": [...],
    "commonThread": {...}
  },
  "perfectStorm": {
    "title": "Three Forces Converging",
    "forces": [...],
    "convergence": "..."
  },
  "solution": {
    "mission": "...",
    "coreCapabilities": [...],
    "whatWeReplace": [...]
  },
  "mandates": {
    "states": [...],
    "federalGuidance": [...],
    "trendline": "..."
  },
  "california": {
    "status": "placeholder"
  },
  "competition": {
    "competitors": [...],
    "ourMoat": [...]
  },
  "business": {
    "marketSize": {...},
    "traction": {...},
    "whyNow": [...]
  },
  "funding": {
    "vision": "...",
    "useOfFunds": [...]
  },
  "team": {
    "description": "...",
    "executionSpeed": "..."
  }
}
```

### CSV Data Integration

**For charts that need historical data:**

```typescript
// lib/crisis-data.ts
export const suicideData: SuicideDataPoint[] = [
  { year: 2011, rate: 7.9 },
  { year: 2012, rate: 8.0 },
  // ... parsed from CDC CSV
  { year: 2021, rate: 11.0 },
];

export const shootingData: ShootingDataPoint[] = [
  { year: 2018, incidents: 24 },
  // ... parsed from EdWeek CSV
  { year: 2024, incidents: 39 },
];

// Used in component:
<LineChart data={suicideData}>
  <Line dataKey="rate" stroke="#05092B" dot={{ fill: '#FCC169', r: 5 }} />
</LineChart>
```

---

## 🎭 Animation Architecture

### Framer Motion Patterns

**Page Entry Animations:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
```

**Staggered Cards:**
```tsx
{items.map((item, idx) => (
  <motion.div
    key={idx}
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: idx * 0.1 }}
  >
))}
```

**Hover Effects:**
```tsx
<Card className="hover:shadow-lg transition-shadow">
```

### Performance Considerations

- Animations are GPU-accelerated (transform, opacity)
- No layout thrashing
- Staggered animations for visual polish
- Consistent timing functions across app

---

## 📱 Responsive Design

### Breakpoints

Following Tailwind defaults:
```
sm:  640px  (Mobile landscape, small tablets)
md:  768px  (Tablets)
lg:  1024px (Laptops)
xl:  1280px (Desktops)
2xl: 1536px (Large desktops)
```

### Responsive Pattern

```tsx
<div className="
  grid gap-4
  grid-cols-1        /* Mobile: Stack */
  sm:grid-cols-2     /* Small: 2 columns */
  lg:grid-cols-4     /* Large: 4 columns */
">
```

### Mobile-First Approach

- Base styles are for mobile
- Add `sm:`, `md:`, `lg:` prefixes for larger screens
- Charts use `ResponsiveContainer` for fluid sizing
- Tab navigation wraps on mobile

---

## 🖨️ Print Architecture

### Print Styles

**Defined in:** `app/globals.css`

```css
@media print {
  .print\:hidden {
    display: none !important;
  }

  header, footer {
    break-inside: avoid;
  }

  main {
    padding: 0;
  }

  body {
    color: #111827;
  }
}
```

### Print Strategy

1. **Hide interactive elements:** Print button hidden with `print:hidden`
2. **Show sources:** Citations remain visible for credibility
3. **Optimize spacing:** Reduced padding for print
4. **Page breaks:** Avoid breaking cards/sections
5. **Maintain branding:** Navy headers, gold accents preserved

---

## 📊 Data Visualization Architecture

### Chart Library: Recharts

**Used in:**
- Tab 1: Line chart (suicide rates), Bar chart (school shootings)
- Tab 2: Bar charts (mandate timeline, lawsuit settlements)
- Tab 8: Pie chart (use of funds allocation)

**Color Usage:**
```tsx
// Line charts
<Line
  dataKey="rate"
  stroke="#05092B"           // Primary navy
  strokeWidth={3}
  dot={{ fill: '#FCC169', r: 5 }}  // Gold dots
/>

// Bar charts
<Bar
  dataKey="amount"
  fill="#05092B"             // Primary navy
  name="Settlement Amount"
/>

// Pie charts
<Pie data={data} dataKey="value">
  {data.map((entry, index) => (
    <Cell fill={CHART_COLORS[index % CHART_COLORS.length]} />
  ))}
</Pie>
```

### Interactive Features

- **Tab 4:** Search/filter functionality for state mandates
- **All charts:** Tooltips on hover
- **Responsive:** All charts adapt to screen size

---

## 🚀 Build & Deployment Architecture

### Build Process

```bash
npm run build
```

**What happens:**
1. TypeScript compilation
2. Next.js optimization
3. Tailwind CSS purging (removes unused classes)
4. Image optimization
5. Code splitting
6. Static page generation

**Output:**
- Optimized JavaScript bundles
- CSS with only used classes
- Static HTML for each route
- Optimized images

### Deployment Target: Vercel

**Why Vercel:**
- Built for Next.js (same company)
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Environment variables support
- Analytics built-in

**Deployment:**
```bash
npx vercel
```

---

## 🔒 Security Considerations

### Current Security

**No Password Protection** (per user request)

**What IS secure:**
- No sensitive data in code
- No API keys exposed
- No backend to attack
- Static generation (no server vulnerabilities)
- noindex meta tag prevents search engine indexing

**Headers (configured):**
```tsx
// app/layout.tsx
<meta name="robots" content="noindex, nofollow" />
```

---

## 📈 Performance Architecture

### Current Performance

**Lighthouse Targets:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 95+
- SEO: 85+ (noindex is intentional)

### Optimizations Applied

1. **Next.js Image Optimization**
   - Automatic WebP conversion
   - Responsive images
   - Lazy loading

2. **Code Splitting**
   - Route-based splitting (automatic)
   - All components in single file (minimal bundle)

3. **CSS Optimization**
   - Tailwind purge removes unused classes
   - Critical CSS inlined

4. **Font Loading**
   - Google Fonts with `font-display: swap`
   - Preconnect to fonts.gstatic.com

### Future Optimizations

- [ ] Lazy load charts (only load when tab is active)
- [ ] Implement React.memo for expensive components
- [ ] Add loading skeletons
- [ ] Optimize CSV parsing (move to build time)

---

## 🔄 State Management

### Current Approach

**No global state library needed**

Why:
- Static content (no CRUD operations)
- Minimal user interaction
- Tab state managed by Tabs component
- No authentication/authorization

**Local State:**
```tsx
// Search/filter state in TheMandates component
const [searchQuery, setSearchQuery] = useState("");
```

---

## 🎯 Key Architectural Decisions

### Decision Log

| Decision | Rationale | Alternative Considered |
|----------|-----------|------------------------|
| **Single file for all tabs** | Easier maintenance, consistent styling, shared constants | Separate files per tab |
| **JSON for content** | No backend needed, easy editing, version control | CMS (Sanity, Contentful) |
| **Tailwind CSS** | Rapid development, small bundle, brand tokens | Styled-components, CSS modules |
| **No state library** | Unnecessary complexity for static content | Zustand, Redux |
| **Static generation** | Fast, cheap hosting, no server | SSR, client-side only |
| **Framer Motion** | Best-in-class animations, declarative | CSS animations, GSAP |
| **Recharts** | React-native, customizable, TypeScript | Chart.js, D3.js |
| **Direct hex values** | Ensures exact brand colors, no conflicts | Tailwind color names |

---

## 📖 Tab-Specific Architecture

### Tab 1: The Crisis
- **Data:** CSV files parsed into TypeScript arrays
- **Visualizations:** Line chart, bar chart
- **Special features:** Crisis statistics cards with animations

### Tab 2: The Perfect Storm
- **Components:** Three force cards with icons
- **Visualizations:** Timeline bar chart, lawsuit settlement bar chart
- **Pattern:** Grid layout for forces

### Tab 3: The Solution
- **Components:** Mission card, capability categories, before/after comparison
- **Pattern:** Category-based organization

### Tab 4: The Mandate Landscape
- **Features:** Search/filter functionality
- **Components:** 11+ state cards, California deep dive, federal guidance
- **Special:** Interactive search with useState

### Tab 5: Discovery (formerly "California Momentum")
- **Components:** 4 stat cards, 2-column discovery findings, partnership letter card
- **Features:** Enhanced progress bars (12px height, color-coded), discovery metrics, official letter
- **Pattern:** Stats + findings grid + prominent letter card + opportunity statement
- **Special:** Improved progress bar visibility with enhanced contrast (slate-200 background)
- **Visual Indicators:** Color-coded progress bars (green/red/gold) clearly show compliance gaps and opportunities

### Tab 6: Why We Win
- **Components:** 3 competitor cards with strengths/weaknesses
- **Pattern:** Comparative analysis layout
- **Features:** Color-coded sections (green/red)

### Tab 7: Business & Traction
- **Components:** Market size cards, traction metrics, team section
- **Pattern:** Grid of stat cards
- **Features:** Multiple metric categories

### Tab 8: The Ask
- **Visualizations:** Pie chart for use of funds
- **Components:** Opportunity cards, impact cards, CTA
- **Pattern:** Funding-focused layout

---

## 🎬 Splash Screen Architecture

### Component: SplashIntro

**Location:** `components/splash/SplashIntro.tsx`

**Purpose:** Premium cinematic intro presenting 4StudentLives and Startup Ignition branding before main VC brief

### Technical Implementation

**State Management:**
```tsx
// Immediate sessionStorage check prevents content flash
const [showSplash, setShowSplash] = useState(() => {
  if (typeof window !== 'undefined') {
    return !sessionStorage.getItem('4sl_intro_seen');
  }
  return true; // SSR default
});
```

**Key Features:**
- ✅ No white flash on load (content rendered underneath from start)
- ✅ sessionStorage prevents repeat views (once per tab session)
- ✅ Skip functionality (click, ESC key, skip button)
- ✅ Accessibility: respects `prefers-reduced-motion`
- ✅ Smooth radial reveal using CSS mask (no opacity fade)

### Animation Timeline (9 seconds total)

```
0.0s - 1.3s:  4SL Logo fade-in
2.3s - 3.2s:  "Presents Dossier for" text appears
3.9s - 4.7s:  Green arrow animates down (top layer, z-20)
4.9s - 5.9s:  Base logo fades behind arrow (bottom layer, z-10)
7.0s - 9.5s:  Radial mask expansion reveals content (2.5s)
```

### Visual Design

**Split-Screen Background:**
```css
background: linear-gradient(
  to bottom,
  #1A3859 0%, #1A3859 50%,          /* 4SL Navy top half */
  rgba(23, 29, 26, 1) 50%, rgba(23, 29, 26, 1) 100%  /* SI Green bottom half */
);
```

**Logo Layering:**
- **Green Arrow** (z-index: 20) - Top layer, prevents white wash-over
- **Base Text** (z-index: 10) - Behind arrow, creates depth
- **Background** (z-index: 1) - Split-tone gradient

### Exit Animation

**Radial Reveal Mechanism:**
```tsx
exit={{
  WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 100%)',
  maskImage: 'radial-gradient(circle at 50% 50%, black 0%, transparent 100%)'
}}
transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
```

**Why This Works:**
- Mask creates expanding transparent circle from center
- Content underneath becomes visible through transparent area
- No opacity fade = no white flash
- Smooth 2.5s expansion for cinematic reveal

### Performance Considerations

- All images use Next.js `Image` with `priority` flag
- Animations GPU-accelerated (transform, opacity, mask)
- Content pre-rendered (no lazy loading delay)
- Single component, minimal bundle impact

### Integration

**Usage in app/page.tsx:**
```tsx
export default function VCBriefPage() {
  return (
    <SplashIntro>
      {/* Main VC Brief content */}
    </SplashIntro>
  );
}
```

**Assets Required:**
- `/public/4SL_logo.png` (existing)
- `/public/startup_ignition_arrow_hd.png` (green arrow)
- `/public/startup_ignition_base_hd.png` (white base text)

---

## 📖 Further Reading

**Next.js Documentation:**
- https://nextjs.org/docs

**Tailwind CSS:**
- https://tailwindcss.com/docs

**Framer Motion:**
- https://www.framer.com/motion/

**Recharts:**
- https://recharts.org/

**shadcn/ui:**
- https://ui.shadcn.com/

---

**Last Updated:** 2025-10-06
**Version:** 0.6.0
**Status:** 8 of 8 tabs complete + Splash Screen 🎉 (100% COMPLETE)
**Maintainer:** 4StudentLives Development Team
