# 4StudentLives VC Brief

A premium, interactive investor presentation built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **8 Comprehensive Tabs**: Company, Market, Product, Business, Traction, Legal, Competition, Funding
- **Premium UI/UX**: Glassmorphism effects, smooth animations, responsive design
- **Data Visualizations**: Interactive charts and graphs using Recharts
- **Search & Filter**: Searchable legal cases with tag filtering
- **Print-Optimized**: Beautiful PDF export via browser print
- **Fully Responsive**: Mobile, tablet, and desktop optimized
- **4SL Branded**: Custom color palette matching the company website

## 📋 Prerequisites

- Node.js 18+
- npm or yarn

## 🛠️ Installation

1. Navigate to the project directory:
```bash
cd "/mnt/c/Users/dylan/Claude Code/4SL/vc-brief-app"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
vc-brief-app/
├── app/
│   ├── globals.css          # Global styles with brand tokens
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main VC brief page
├── components/
│   ├── ui/                   # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── dialog.tsx
│   │   └── separator.tsx
│   └── vc-brief/
│       └── TabSections.tsx   # All tab components
├── lib/
│   ├── content.json          # Dummy content (replace with real data)
│   ├── types.ts              # TypeScript interfaces
│   └── utils.ts              # Utility functions
├── public/
│   └── 4SL_logo.png         # 4StudentLives logo
├── tailwind.config.ts        # Tailwind with 4SL brand colors
└── package.json
```

## 🎨 Brand Colors

The app uses the official 4StudentLives color palette:

- **Primary Navy**: `#05092B`
- **Secondary Navy**: `#1A3859`
- **Accent Gold**: `#FCC169`
- **Link Blue**: `#007097`

## 📝 Updating Content

To update the VC brief content, edit `/lib/content.json`:

```json
{
  "company": { ... },
  "market": { ... },
  "product": { ... },
  "business": { ... },
  "traction": { ... },
  "legal": { ... },
  "competition": { ... },
  "funding": { ... }
}
```

The TypeScript interfaces in `/lib/types.ts` provide type safety and autocomplete.

## 🖨️ Exporting to PDF

1. Click the "Print / PDF" button in the header
2. In the print dialog, select "Save as PDF"
3. Adjust settings as needed
4. Save the file

The app includes print-optimized styles that hide navigation elements and ensure proper page breaks.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and configure settings
4. Click "Deploy"

### Environment Variables (Optional)

If you want to add basic authentication or other env vars:

```bash
# .env.local
BASIC_AUTH_USER=youruser
BASIC_AUTH_PASSWORD=yourpassword
```

## 🔒 Security & Privacy

- `noindex` meta tags prevent search engine indexing
- Marked as "Private • Confidential" in the UI
- No external tracking or analytics (add if needed)
- All data is client-side (consider server-side for sensitive info)

## 🎯 Customization

### Changing the Logo
Replace `/public/4SL_logo.png` with your logo (recommended size: 200x56px)

### Adjusting Colors
Edit the brand colors in:
- `/tailwind.config.ts`
- `/app/globals.css` (CSS variables)
- `/app/page.tsx` and `/components/vc-brief/TabSections.tsx` (COLORS constant)

### Adding New Sections
1. Update the content structure in `/lib/types.ts`
2. Add data to `/lib/content.json`
3. Create a new tab component in `/components/vc-brief/TabSections.tsx`
4. Import and use in `/app/page.tsx`

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom shadcn/ui components
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## 🐛 Troubleshooting

### Module not found errors
```bash
npm install
```

### Styles not applying
Make sure Tailwind is properly configured and the dev server is running.

### Images not loading
Ensure the logo is in `/public/4SL_logo.png` and Next.js config allows the domain.

### Type errors
Check that `/lib/content.json` matches the interfaces in `/lib/types.ts`

## 📄 License

Private and confidential. For 4StudentLives internal use only.

## 📞 Support

For questions or issues, contact:
- Sarah Johnson - sarah@4studentlives.com
- Development Team

---

Built with ❤️ for 4StudentLives
