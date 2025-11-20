# TrustScan Application Guide

**Last Updated:** 2025-11-20

## Table of Contents
1. [Application Overview](#application-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features & Functionality](#features--functionality)
5. [Design System](#design-system)
6. [Architecture & Data Flow](#architecture--data-flow)
7. [Routing](#routing)
8. [Configuration](#configuration)
9. [Key Dependencies](#key-dependencies)
10. [Development Notes](#development-notes)

---

## Application Overview

**TrustScan** is a DePIN (Decentralized Physical Infrastructure Network) platform that verifies product authenticity and combats counterfeiting using blockchain technology.

### Purpose
- **For Consumers**: Scan QR codes on products to verify authenticity and earn stablecoin rewards
- **For Manufacturers**: Upload and manage products, generate QR codes, and monitor verification analytics
- **For Retailers & Regulators**: Track products through supply chains and identify counterfeiting hotspots

### Problem Solved
Combat counterfeit product proliferation by leveraging blockchain-powered verification, making products traceable and tamper-proof.

---

## Tech Stack

### Core Framework
- **Next.js 14.2.16** - React framework with App Router
- **React 18** - UI library
- **TypeScript 5** - Type-safe development

### UI & Styling
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **shadcn/ui** - Component library (New York style)
- **Radix UI** - Accessible UI primitives (25+ components)
- **Geist Font** - Vercel's design system fonts
- **Lucide React 0.454.0** - Icon library

### Forms & Validation
- **React Hook Form 7.60.0** - Form state management
- **Zod 3.25.67** - Schema validation
- **@hookform/resolvers 3.10.0** - Validation resolvers

### Backend & Database
- **Supabase** - Backend-as-a-Service (PostgreSQL database, authentication, real-time subscriptions)
- **@supabase/supabase-js** - Supabase JavaScript client

### UI Features
- **cmdk 1.0.4** - Command menu
- **sonner 1.7.4** - Toast notifications
- **recharts 2.15.4** - Data visualization
- **embla-carousel-react 8.5.1** - Carousel component
- **react-day-picker 9.8.0** - Date picker
- **input-otp 1.4.1** - OTP input
- **next-themes 0.4.6** - Dark mode management

### Analytics
- **@vercel/analytics 1.3.1** - Usage analytics

---

## Project Structure

```
trustscan/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles + CSS variables
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   ├── waitlist/                # Waitlist page (ACTIVE)
│   │   └── page.tsx             # Waitlist signup form with Supabase
│   ├── dashboard/               # Manufacturer portal (BLOCKED)
│   │   ├── layout.tsx           # Dashboard layout - redirects to home
│   │   ├── page.tsx             # Dashboard overview
│   │   ├── products/
│   │   │   ├── page.tsx         # Manage products table
│   │   │   └── add/
│   │   │       └── page.tsx     # Add products form
│   │   └── reports/
│   │       └── page.tsx         # Analytics dashboard
│   └── scan/                    # Consumer verification (BLOCKED)
│       └── page.tsx             # Redirects to home
├── components/
│   ├── header.tsx               # Navigation header
│   ├── hero-section.tsx         # Landing hero
│   ├── process-section.tsx      # 4-step process
│   ├── technology-section.tsx   # Features showcase
│   ├── cta-section.tsx          # Call-to-action
│   ├── footer.tsx               # Footer
│   ├── theme-provider.tsx       # Dark mode provider
│   └── ui/                      # shadcn/ui components (50+)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── table.tsx
│       └── ... (40+ more)
├── hooks/
│   ├── use-mobile.ts            # Mobile detection
│   └── use-toast.ts             # Toast notifications
├── lib/
│   ├── utils.ts                 # Utilities (cn function)
│   └── supabase.ts              # Supabase client configuration & types
├── public/                      # Static assets
│   ├── person-scanning-*.jpg    # Hero images
│   └── placeholder-*.svg        # Logos & placeholders
├── next.config.mjs
├── tsconfig.json
├── postcss.config.mjs
├── components.json              # shadcn/ui config
├── package.json
├── .env.local.example           # Environment variables template
├── SUPABASE_SETUP.md            # Supabase setup instructions
└── CLAUDE.md                    # This guide
```

---

## Features & Functionality

### Landing Page ([/](app/page.tsx))
1. **Header Navigation** - Logo, menu, Dashboard link, "Verify Now" CTA
2. **Hero Section** - Value proposition, product images, dual CTAs
3. **Process Visualization** - 4 steps: Scan → Verify → Reward → Trust
4. **Technology Features**:
   - Blockchain-powered authenticity
   - Smart QR technology
   - Stablecoin rewards
   - Real-time analytics
5. **CTA Section** - Prominent call-to-action
6. **Footer** - Links, newsletter, copyright

### Consumer Scan Page ([/scan](app/scan/page.tsx))
- **Camera Scanner** - Real-time QR/barcode scanning using getUserMedia API
- **Scanning Overlay** - Visual alignment guide
- **Simulate Scan** - Demo functionality
- **Results Display** - Product details, verification status
- **Product Info** - Name, batch, dates, authenticity status

### Manufacturer Dashboard ([/dashboard](app/dashboard/page.tsx))

#### Overview
- **KPI Cards**:
  - Total Products: 260
  - Verified Scans: 260
  - Active Product Lines: 14

#### Manage Products ([/dashboard/products](app/dashboard/products/page.tsx))
- Products table with:
  - Columns: Image, Name, Batch No, Category, Status, QR Code, Actions
  - Filtering & sorting
  - Export functionality
  - Pagination (10 pages)
  - Download/Edit/Delete actions

#### Add Products ([/dashboard/products/add](app/dashboard/products/add/page.tsx))
- **Product Information**: Name, Description, Batch Number, Brand, Expiry Date
- **Manufacturing Details**: Manufacturer Name, Factory Location, Production Date
- **QR Code Generation** - Auto-generate and download

#### Reports ([/dashboard/reports](app/dashboard/reports/page.tsx))
- Product verification success rates
- Scan activity tracking
- Geographic data (countries reached)

---

## Design System

### Color Palette (OKLch Color Space)

**Light Mode:**
- Background: `oklch(0.99 0 0)` - White
- Foreground: `oklch(0.15 0 0)` - Dark text
- Primary: `oklch(0.55 0.15 240)` - Professional blue
- Primary Foreground: `oklch(0.99 0 0)` - White
- Muted: `oklch(0.96 0 0)` - Light gray
- Border: `oklch(0.92 0 0)` - Subtle gray

**Dark Mode:**
- Background: `oklch(0.145 0 0)` - Dark gray
- Foreground: `oklch(0.985 0 0)` - Light text
- Primary: `oklch(0.65 0.15 240)` - Lighter blue

**Semantic Colors:**
- Destructive: `oklch(0.577 0.245 27.325)` - Red
- Chart Colors: 5 distinct colors for visualization

### Typography

**Fonts:**
- Primary: **Geist Sans**
- Monospace: **Geist Mono**

**Scale:**
- sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl

**Weights:**
- 400 (normal), 500 (medium), 600 (semibold), 700 (bold), 900 (black)

### Spacing & Borders

**Border Radius:**
- sm: 4px
- md: 6px
- lg: 8px (base)
- xl: 12px

**Spacing:**
- Standard 4px scale (4, 8, 12, 16, 24, 32, etc.)

### Component Styling

**Approach:**
- **shadcn/ui** with **New York style**
- **CSS Variables** for theming
- **Class Variance Authority** for variants
- **Tailwind Utility Classes** for consistency
- **Radix UI** for accessible primitives

**Patterns:**
- Cards with subtle shadows
- Gradient text for emphasis
- Rounded corners on interactive elements
- Icon + Text combinations
- Status indicators (colored dots)
- Color-coded backgrounds

---

## Architecture & Data Flow

### Client-Side Architecture

**React State Management:**
- `useState` for component state
- Scan page: `isScanning`, `hasPermission`, `scannedData`, `error`
- Add Product: `productData`, `productImage`
- Manage Products: `currentPage`

**Camera/Media Access:**
- Uses `getUserMedia` API for device camera
- Environmental facing mode for product scanning
- `useRef` for stream management
- `useEffect` cleanup for proper resource disposal
- Permission handling with error states

**Form Handling:**
- React Hook Form for state
- Zod for validation schemas
- Controlled inputs for text, dates, dropdowns, file uploads
- Sample brands: Hollandia, Chivita, Caprisonne

**Data:**
- Currently uses **mock/hardcoded data**
- Sample products in manage products page
- Mock verification results in scan
- Static KPIs (260 products, 1,247 scans, 85% success rate)

**Navigation:**
- Next.js `Link` for client-side routing
- `usePathname` for active route detection
- Sidebar with dynamic active state

**Analytics:**
- Vercel Analytics at root level
- Tracks page views and interactions

---

## Routing

| Route | File | Purpose |
|-------|------|---------|
| `/` | [app/page.tsx](app/page.tsx) | Landing page |
| `/scan` | [app/scan/page.tsx](app/scan/page.tsx) | QR scanner (consumer) |
| `/dashboard` | [app/dashboard/page.tsx](app/dashboard/page.tsx) | Dashboard overview |
| `/dashboard/products` | [app/dashboard/products/page.tsx](app/dashboard/products/page.tsx) | Manage products |
| `/dashboard/products/add` | [app/dashboard/products/add/page.tsx](app/dashboard/products/add/page.tsx) | Add product form |
| `/dashboard/reports` | [app/dashboard/reports/page.tsx](app/dashboard/reports/page.tsx) | Analytics reports |

### Layout Hierarchy
1. **Root Layout** ([app/layout.tsx](app/layout.tsx)) - Global CSS, fonts, Analytics
2. **Dashboard Layout** ([app/dashboard/layout.tsx](app/dashboard/layout.tsx)) - Sidebar, header navigation

---

## Configuration

### [next.config.mjs](next.config.mjs)
```javascript
{
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true }
}
```

### [tsconfig.json](tsconfig.json)
- Target: ES6
- Module: ESNext
- Strict mode: enabled
- Path alias: `@/*` → project root
- JSX: preserve (Next.js handles)

### [components.json](components.json)
- Style: **new-york**
- RSC: true (React Server Components)
- Tailwind config with CSS variables
- Aliases: `@/components`, `@/lib`, `@/hooks`, `@/ui`
- Icons: lucide-react

### Metadata
- **Title**: "Trust Scan"
- **Description**: "TRUSTSCAN is a Depin platform that verifies the authenticity of a Product and leverages Stablecoin rewards for its loyal users."

---

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 14.2.16 | React framework, routing, SSR |
| react | ^18 | UI library |
| typescript | ^5 | Type safety |
| @radix-ui/* | Latest | Accessible UI primitives |
| tailwindcss | ^4.1.9 | Utility CSS |
| react-hook-form | ^7.60.0 | Form management |
| zod | 3.25.67 | Schema validation |
| recharts | 2.15.4 | Data visualization |
| cmdk | 1.0.4 | Command menu |
| sonner | ^1.7.4 | Toast notifications |
| embla-carousel-react | 8.5.1 | Carousel component |
| input-otp | 1.4.1 | OTP input |
| react-day-picker | 9.8.0 | Date picker |
| next-themes | ^0.4.6 | Dark mode |
| lucide-react | ^0.454.0 | Icons |
| class-variance-authority | ^0.7.1 | Variant management |
| clsx | ^2.1.1 | Class names utility |
| tailwind-merge | ^2.5.5 | Class merging |
| @vercel/analytics | 1.3.1 | Analytics |

---

## Development Notes

### Current State
- **Frontend-only application** - No backend API currently
- **Mock data** used throughout
- **No authentication** implemented yet
- **No blockchain integration** yet (described but not implemented)
- Build errors/warnings are **ignored** in config

### Interactive Components
Use `"use client"` directive for:
- Camera access (scan page)
- Form interactions (add products)
- Table pagination (manage products)
- State management

### Styling Conventions
- Use the `cn()` utility from [lib/utils.ts](lib/utils.ts) for class merging
- Prefer Tailwind utilities over custom CSS
- Use CSS variables for colors (defined in [app/globals.css](app/globals.css))
- Follow shadcn/ui component patterns

### Adding New Features
1. Check if shadcn/ui component exists in [components/ui/](components/ui/)
2. Use React Hook Form + Zod for new forms
3. Add new routes in [app/](app/) directory
4. Update sidebar navigation in [app/dashboard/layout.tsx](app/dashboard/layout.tsx)
5. Follow existing patterns for consistency

### Common Utilities
- **Class merging**: `cn()` from [lib/utils.ts](lib/utils.ts)
- **Mobile detection**: `useMobile()` from [hooks/use-mobile.ts](hooks/use-mobile.ts)
- **Toast notifications**: `useToast()` from [hooks/use-toast.ts](hooks/use-toast.ts)

### Assets Location
- Product images: [public/](public/)
- Logos: [public/placeholder-logo.svg](public/placeholder-logo.svg)
- Hero images: [public/person-scanning-*.jpg](public/)

---

## Quick Reference

### File Naming
- React components: PascalCase (e.g., `HeroSection.tsx`)
- Route pages: lowercase (e.g., `page.tsx`)
- Utilities/hooks: kebab-case (e.g., `use-mobile.ts`)

### Import Paths
- Components: `@/components/*`
- UI components: `@/components/ui/*`
- Utilities: `@/lib/*`
- Hooks: `@/hooks/*`

### Common Patterns
```typescript
// Client component
"use client"

// Form with validation
const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema)
})

// Navigation
import Link from "next/link"
<Link href="/path">Text</Link>

// Styling
className={cn("base-classes", conditional && "extra-classes")}

// Toast notification
import { toast } from "sonner"
toast.success("Message")

// Supabase queries
import { supabase } from "@/lib/supabase"
const { data, error } = await supabase
  .from('table_name')
  .select()
```

---

## Current Application State (Waitlist Mode)

### Active Features
✅ **Landing Page** - Fully functional with hero, features, process sections
✅ **Waitlist Page** - `/waitlist` with Supabase integration
✅ **Database Integration** - PostgreSQL via Supabase
✅ **Form Validation** - Email uniqueness, required fields
✅ **Error Handling** - User-friendly toast notifications
✅ **Loading States** - Spinner during form submission

### Blocked Features
🚫 **Dashboard** - All routes redirect to home page
🚫 **Scan Page** - Redirects to home page
🚫 **Product Management** - Not accessible
🚫 **Analytics** - Not accessible

### Supabase Integration

**Database Table**: `waitlist`

**Schema**:
```typescript
{
  id: UUID (primary key)
  name: string
  email: string (unique)
  company: string | null
  user_type: 'consumer' | 'manufacturer' | 'retailer' | 'regulator' | 'other'
  agreed_to_terms: boolean
  created_at: timestamp
  updated_at: timestamp
}
```

**Security**:
- Row Level Security (RLS) enabled
- Public inserts allowed (for waitlist signups)
- Authenticated reads only (for future admin dashboard)

**Setup Required**:
1. Create Supabase project
2. Run SQL schema from [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
3. Add credentials to `.env.local`
4. Restart dev server

**Environment Variables**:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Navigation Flow
- Home (`/`) → Active landing page
- Home → "Join Waitlist" button → Waitlist page (`/waitlist`)
- Waitlist form submission → Success state → "Return to Home"
- Direct access to `/dashboard/*` → Redirects to `/`
- Direct access to `/scan` → Redirects to `/`

---

**End of Guide**
