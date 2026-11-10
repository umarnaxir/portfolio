# Umar Nazir | Software Engineer & SEO Executive Portfolio

Personal portfolio website for **Umar Nazir**, Lead Engineer at **Vipthra Technologies** and Founder & CEO of **NexGen Developers**. Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Styled Components v6**, **GSAP + ScrollTrigger**, and **Lenis** smooth scrolling.

## Visual & Design System

The interface combines near-white content surfaces (`#ffffff`, `#f1f0ee`), high-contrast deep ink blocks (`#0a0a0a`), concrete studio gray hero atmosphere (`#989a9c`), and burnt-orange accents (`#b15f2c`, `#cf8047`, `#97501f`), paired with the **Onest** typeface and a viewport-adaptive root grid (`hooks/useAdaptiveGrid.ts`).

## Key Features & Sections

- **Preloader (`IntroLoader.tsx`)**: Full-screen dark entrance overlay counting from `000` to `100` before unlocking scroll and triggering above-the-fold reveals.
- **Minimal Fixed Navbar (`Header.tsx` & `NavOverlay.tsx`)**: Displays brand identity, live studio local time (`useLiveClock.ts`), and a fullscreen dark navigation drawer (`Home`, `About`, `Projects`, `Experience`, `Services`, `Contact`) with automatic closing on navigation.
- **Interactive Hero (`HeroSection.tsx`, `LiquidRevealCanvas.tsx`, `HeroCardCarousel.tsx`)**:
  - Full-bleed cursor-following sunset-orange liquid canvas trail and dual-layer radial spotlights.
  - Centered transparent portrait (`/images/umar.png`) anchored at the bottom with subtle hover lighting transitions and locked positioning.
  - Background `UMAR` watermark, left-aligned hero headline (`Software Engineer & SEO Executive`), social links, and an interactive highlight carousel card.
- **Live GitHub Contributions (`GitHubContributionsSection.tsx` & `/api/github-contributions`)**: Real-time animated GitHub activity card placed right after The Engineer section, fetching live daily commit contributions and year filters directly from GitHub with responsive horizontal mobile swipe support.
- **The Engineer Statement (`AboutSection.tsx`)**: Features the `/images/umar.jpeg` portrait in a 3D tilt card alongside a GSAP ScrollTrigger word-by-word animated statement.
- **Engineering Methodology (`CreativeBand.tsx`)**: "From Conception to Search Dominance" showcase with four-stage interactive methodology cards (`Think`, `Design`, `Build`, `Grow`), asymmetric corners, ScrollTrigger entrance, and cursor-driven 3D tilt.
- **Featured Projects (`ProjectsSection.tsx` & `/projects`)**: Desktop horizontal ScrollTrigger-pinned showcase displaying 70/30 image-to-detail project cards, responsive stacked cards on mobile/tablet, plus a full category-filterable directory at `/projects`.
- **Work Experience & Leadership (`ExperienceSection.tsx`)**: Sticky milestone sidebar paired with vertically stacking ScrollTrigger career cards covering NexGen Developers, Vipthra Technologies, Saibbyweb, and Harmukh Technologies.
- **Services & Stats (`ServicesSection.tsx` & `StatsSection.tsx`)**: Interactive full-width service rows covering Web Development, Full-Stack Systems, Mobile Apps, E-Commerce, Technical SEO, and AI/ML Solutions, followed by a dark metrics panel with scroll-driven counters.
- **Footer & Inquiry Flow (`Footer.tsx`, `ContactModal.tsx`, `app/api/contact/route.ts`)**: Direct contact channel cards (WhatsApp, LinkedIn, GitHub, Email, Phone), watermark typography, and an inquiry modal backed by a Next.js API endpoint (`/api/contact`).

## Tech Stack

- **Framework**: Next.js `16.4.5` (App Router & Turbopack)
- **Language**: TypeScript `^5`
- **UI Library**: React `19.3.0`
- **Styling**: `styled-components` `^6.6.0` (compiler transform enabled in `next.config.ts`) & `styled-system` `^5.1.5`
- **Animations**: `gsap` `^3.15.1` (`ScrollTrigger`)
- **Smooth Scrolling**: `lenis` `^1.3.27`
- **Linting**: ESLint `^9` (`eslint-config-next`)

## Project Structure

```text
nexgen/
├── app/
│   ├── api/contact/route.ts                # Contact inquiry POST endpoint
│   ├── api/github-contributions/route.ts   # Real-time GitHub contributions proxy API
│   ├── projects/                # Filterable full projects showcase page
│   ├── layout.tsx               # Root layout, metadata, OpenGraph & StyledComponentsRegistry
│   └── page.tsx                 # Main portfolio landing page
├── components/
│   ├── providers/
│   │   ├── AppClientShell.tsx   # ThemeProvider, GlobalStyle, Lenis, header/footer shell
│   │   └── SmoothScrollProvider.tsx
│   ├── sections/                # Hero, About, CreativeBand, Projects, Experience, Services, Stats, Footer
│   └── ui/                      # PillButton, Eyebrow, TagChip, AnimatedLink, SVG Icons
├── data/
│   ├── personal.ts              # Bio, stats, contact details & social URLs
│   ├── projects.ts              # Project entries and screenshots
│   ├── experience.ts            # Career timeline milestones
│   └── services.ts              # Service capabilities catalog
├── hooks/
│   ├── useAdaptiveGrid.ts       # Viewport-based root rem scaling
│   └── useLiveClock.ts          # Real-time local studio time & date
├── lib/
│   └── registry.tsx             # Server-side Styled Components registry
├── public/
│   └── images/                  # Portrait photos (umar.png, umar.jpeg) & project previews
├── styles/
│   ├── GlobalStyle.ts           # Base resets & Onest font styles
│   ├── primitives.ts            # Shared layout Container primitive
│   └── theme.ts                 # Color palette, typography scale, spacing & breakpoints
├── types/
│   ├── index.ts                 # Portfolio TypeScript interfaces
│   └── styled.d.ts              # Styled Components DefaultTheme declaration
└── next.config.ts               # Styled Components compiler & remote image patterns
```

## Getting Started

### Prerequisites

- **Node.js** `20.x` or later
- **npm** (or compatible package manager)

### Installation

```bash
git clone <your-repository-url>
cd nexgen
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Start

```bash
npm run build
npm run start
```

To serve production mode on a specific host and port (e.g., port `8000`):

```bash
npx next start -H 0.0.0.0 -p 8000
```

### Type Checking & Linting

```bash
npx tsc --noEmit
npm run lint
```

## Customization

- **Profile & Socials**: Update `data/personal.ts` for contact numbers, email, location, and social URLs.
- **Projects, Experience & Services**: Edit `data/projects.ts`, `data/experience.ts`, and `data/services.ts`.
- **Visual Assets**: Replace portrait imagery in `public/images/` (`umar.png`, `umar.jpeg`) and project previews in `public/images/projects/`.
- **Theme Colors & Typography**: Modify design tokens in `styles/theme.ts`.
- **Contact Form Delivery**: Connect an email or webhook provider (such as Resend or SendGrid) inside `app/api/contact/route.ts` for production email delivery.

## Deployment

Deploy directly with [Vercel](https://vercel.com) or any Node.js hosting provider supporting Next.js App Router:

1. Push the repository to GitHub (`.gitignore` excludes dependencies, build outputs, local AI/editor tooling, and `.env*` secrets).
2. Import the repository in Vercel with framework preset **Next.js**.
3. Configure any required environment variables for email forwarding if integrated into `app/api/contact/route.ts`.

## Contact

- **Name**: Umar Nazir
- **Email**: `erumarnazir@gmail.com`
- **GitHub**: [@umarnaxir](https://github.com/umarnaxir)
- **LinkedIn**: [/in/umar-nazir19](https://www.linkedin.com/in/umar-nazir19/)
- **X**: [@umr_nazir](https://x.com/umr_nazir)
- **Live Site**: [https://umarnazir.vercel.app](https://umarnazir.vercel.app)
