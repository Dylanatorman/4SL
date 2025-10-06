# Development Guide

## Getting Started

### Prerequisites
```bash
Node.js 18+
npm or yarn
```

### Initial Setup
```bash
# Navigate to project
cd "/mnt/c/Users/dylan/Claude Code/4SL/vc-brief-app"

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Open http://localhost:3000

---

## Development Workflow

### Making Changes

1. **Edit Content:**
   - Update `lib/content.json` for text/data changes
   - No code changes needed for content updates

2. **Edit Styling:**
   - Modify classes in `app/page.tsx`
   - Add custom CSS in `app/globals.css` if needed
   - Update Tailwind config in `tailwind.config.ts`

3. **Add New Components:**
   - Create in `app/page.tsx` (for tab components)
   - Create in `components/ui/` (for reusable UI components)

4. **Test Changes:**
   - Browser auto-refreshes on save
   - Check all tabs
   - Test responsive design (resize browser)
   - Test print (Ctrl+P)

---

## Color Usage Guide

### ⚠️ CRITICAL: Only Use These Colors

```tsx
// ✅ CORRECT
<div className="bg-[#1A3859]">           // Background
<h1 className="text-[#05092B]">          // Headings
<p className="text-[#7A7A7A]">           // Body text
<span className="text-[#FCC169]">        // Accents
<a className="text-[#007097]">           // Links

// ❌ WRONG - Never use these
<div className="bg-red-500">
<div className="text-orange-600">
<div className="border-blue-400">
```

### Color Reference
| Color | Hex | Usage |
|-------|-----|-------|
| Primary Navy | `#05092B` | Headings, primary elements |
| Secondary Navy | `#1A3859` | Background, secondary elements |
| Text Gray | `#7A7A7A` | Body text, descriptions |
| Accent Gold | `#FCC169` | Highlights, borders, CTAs |
| Link Blue | `#007097` | Clickable links |
| White | `#FFFFFF` | Card backgrounds, contrast |

---

## Adding a New Tab Component

### Step-by-Step

1. **Add content to `lib/content.json`:**
```json
{
  "newSection": {
    "title": "Section Title",
    "subtitle": "Section Subtitle",
    "content": "..."
  }
}
```

2. **Create component in `app/page.tsx`:**
```tsx
const NewSection: React.FC = () => {
  const sectionContent = (content as any).newSection;

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#05092B] to-[#1A3859] p-12 text-white shadow-2xl"
      >
        <h2 className="text-5xl font-bold">{sectionContent.title}</h2>
        <p className="mt-4 text-2xl text-white/90">{sectionContent.subtitle}</p>
      </motion.div>

      {/* Content sections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-[#05092B]">
            Content Title
          </CardTitle>
        </CardHeader>
        <CardContent className="text-[#7A7A7A]">
          {sectionContent.content}
        </CardContent>
      </Card>

      {/* Sources */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Sources & Citations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>Source links here</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
```

3. **Add to tab list:**
```tsx
<TabsList>
  <TabsTrigger value="new">New Tab</TabsTrigger>
</TabsList>

<TabsContent value="new">
  <NewSection />
</TabsContent>
```

---

## Working with Charts

### Adding a Chart

1. **Prepare data:**
```typescript
// lib/your-data.ts
export const chartData = [
  { year: 2020, value: 100 },
  { year: 2021, value: 150 },
  { year: 2022, value: 200 },
];
```

2. **Import and use:**
```tsx
import { chartData } from "@/lib/your-data";

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={chartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="year" />
    <YAxis />
    <Tooltip />
    <Line
      dataKey="value"
      stroke="#05092B"         // Primary Navy
      strokeWidth={3}
      dot={{ fill: '#FCC169', r: 5 }}  // Gold dots
    />
  </LineChart>
</ResponsiveContainer>
```

### Chart Color Guidelines
- **Line strokes:** `#05092B` or `#1A3859`
- **Bars:** `#1A3859` or `#007097`
- **Data points:** `#FCC169`
- **Grid:** `#E5E7EB` (light gray)

---

## Common Development Tasks

### Update Logo
```bash
# Replace file
cp new-logo.png public/4SL_logo.png

# Server auto-refreshes
```

### Add New Font
```css
/* app/globals.css */
@import url('https://fonts.googleapis.com/css2?family=New+Font:wght@400;700&display=swap');

/* tailwind.config.ts */
fontFamily: {
  sans: ['"New Font"', ...],
}
```

### Add Animation
```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Debug Issues
```bash
# Check for errors
npm run build

# Clear Next.js cache
rm -rf .next
npm run dev

# Check dependencies
npm list
```

---

## Code Style Guidelines

### Component Structure
```tsx
// 1. Imports
import { ... } from "react";

// 2. Types (if needed)
interface Props {
  title: string;
}

// 3. Component
const Component: React.FC<Props> = ({ title }) => {
  // 4. Hooks
  const [state, setState] = useState();

  // 5. Event handlers
  const handleClick = () => { ... };

  // 6. Render
  return (
    <div>
      {title}
    </div>
  );
};

// 7. Export
export default Component;
```

### Naming Conventions
- **Components:** PascalCase (`TheCrisis`, `StatCard`)
- **Functions:** camelCase (`formatNumber`, `handleClick`)
- **Constants:** UPPER_SNAKE_CASE (`COLORS`, `CHART_COLORS`)
- **Files:** kebab-case (`crisis-data.ts`, `tab-sections.tsx`)

### Formatting
```tsx
// ✅ Good
<div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-lg">

// ❌ Bad
<div className="flex items-center gap-4 rounded-lg bg-white p-6 shadow-lg">  // Too long
<div className="flex items-center gap-4
  rounded-lg bg-white p-6 shadow-lg">  // Weird break
```

---

## Testing Checklist

Before committing changes:

- [ ] All tabs load without errors
- [ ] Colors match brand palette
- [ ] Responsive on mobile (resize browser to ~375px)
- [ ] Responsive on tablet (resize to ~768px)
- [ ] Print view looks good (Ctrl+P)
- [ ] Sources section has clickable links
- [ ] Graphs render correctly
- [ ] Animations work smoothly
- [ ] No console errors
- [ ] Build succeeds (`npm run build`)

---

## Common Errors & Solutions

### Error: Module not found
```bash
# Solution: Install dependencies
npm install
```

### Error: Port 3000 already in use
```bash
# Solution: Kill existing process
pkill -f "next dev"
npm run dev
```

### Error: Build fails with TypeScript error
```bash
# Solution: Check types in content.json
# Make sure data structure matches interfaces
```

### Charts not rendering
```typescript
// Solution: Check data format
// Recharts needs array of objects
const data = [
  { x: 1, y: 2 },  // ✅ Good
  // NOT: [[1, 2]]  // ❌ Bad
];
```

### Tailwind classes not working
```bash
# Solution: Restart dev server
# Ctrl+C to stop
npm run dev
```

---

## Git Workflow

### Before Making Changes
```bash
git status
git pull origin main
```

### After Making Changes
```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: Add Tab 2 - Perfect Storm with visualizations"

# Push to remote
git push origin main
```

### Commit Message Format
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format/styling changes
refactor: Code refactoring
perf: Performance improvement
test: Add tests
```

---

## Deployment

### Build for Production
```bash
npm run build
npm run start  # Test production build locally
```

### Deploy to Vercel
```bash
# First time
npx vercel

# Subsequent deploys
npx vercel --prod
```

### Environment Variables (if needed)
```bash
# .env.local (gitignored)
NEXT_PUBLIC_API_KEY=xxx

# Access in code
process.env.NEXT_PUBLIC_API_KEY
```

---

## Performance Tips

1. **Optimize Images:**
   - Use Next.js `<Image>` component
   - Provide width/height
   - Use WebP format

2. **Lazy Load Charts:**
   ```tsx
   import dynamic from 'next/dynamic';
   const Chart = dynamic(() => import('./Chart'), { ssr: false });
   ```

3. **Minimize Re-renders:**
   ```tsx
   const memoizedValue = useMemo(() => expensiveCalculation(), [deps]);
   ```

4. **Code Splitting:**
   ```tsx
   const HeavyComponent = dynamic(() => import('./Heavy'));
   ```

---

## Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter

# Dependencies
npm install          # Install dependencies
npm update          # Update dependencies
npm outdated        # Check for outdated packages

# Cleaning
rm -rf .next        # Clear Next.js cache
rm -rf node_modules # Clear dependencies
npm install         # Reinstall

# Git
git status          # Check status
git add .           # Stage all changes
git commit -m ""    # Commit with message
git push            # Push to remote
```

---

## Resources

### Documentation
- **Next.js:** https://nextjs.org/docs
- **Tailwind:** https://tailwindcss.com/docs
- **Framer Motion:** https://www.framer.com/motion/
- **Recharts:** https://recharts.org/

### Tools
- **Tailwind Playground:** https://play.tailwindcss.com/
- **Color Picker:** https://htmlcolorcodes.com/
- **SVG Icons:** https://lucide.dev/

### Community
- **Next.js Discord:** https://discord.gg/nextjs
- **Stack Overflow:** Tag: next.js, tailwindcss

---

**Last Updated:** 2025-10-06
