# Mel Carl Chacon — Interactive Digital Dossier & Systems Portfolio

An interactive, high-performance personal dossier engineered with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Designed around an atmospheric cyber-minimalist aesthetic, this portfolio highlights multi-disciplinary systems across software engineering, game development, systems architecture, and community-building leadership.

Live Deployment: [melcarlchacon-portfolio.vercel.app](https://www.google.com/search?q=https://melcarlchacon-portfolio.vercel.app)

---

## 🏛️ System Architecture & UI Systems

* **Parallax Atmospheric Hero**: Multi-layered workspace leveraging physics springs (`framer-motion`) and viewport-relative cursor displacement to coordinate background wordmarks, ambient light fields, and foreground focal assets.
* **Constellation Radar (Tech Stack)**: Dynamic multi-ring orbital radar displaying engineering disciplines, runtime stacks, database structures, and development toolchains with zero layout shifts and hydration-safe rendering.
* **Sculptural Dossier (Recognition)**: Asymmetric 3-column winner's podium honoring verified national achievements, paired with accessible, high-resolution modal inspection overlays.
* **Kinetic Card Engine (Projects)**: Interactive showcase displaying production pipelines, solo full-stack research games, enterprise accreditation platforms, and AI systems.
* **Scroll-Synchronized Conveyor (Experience)**: Vertical timeline using step-anchored deceleration scrubbers and slide-over panels to document organizational scaling and technical direction.
* **Acoustic Interaction Engine (`useSoundEffects`)**: Non-blocking Web Audio API synthesizer synthesizing parametric clicks, frequency glides, and modal feedback tones on user interactions.

---

## 🛠️ Technology Stack & Toolchain

### Frontend & Runtimes

* **Core Framework**: [Next.js 15](https://nextjs.org/) (React 19 Server & Client Components)
* **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict typing, comprehensive interfaces)
* **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) (Custom CSS variables, fluid responsive typography)
* **Animation & Gestures**: [Framer Motion 11](https://www.framer.com/motion/) (Layout projections, gesture bindings, springs)
* **Vector System**: [Lucide React](https://lucide.dev/)

### Systems, Game Dev & Infrastructure

* **Game Development**: Unity Engine, C# Systems Scripting, Custom Shaders
* **Databases & Services**: PostgreSQL, Supabase, MySQL
* **Deployment & Edge**: Vercel Edge Network, Git CI/CD Automation

---

## 📂 Project Directory Layout

```text
mel-portfolio/
├── public/
│   ├── about/            # Documentary photography and community event captures
│   ├── logos/            # Institutional and organizational partner insignia
│   ├── projects/         # Engineering screenshots and game production showcases
│   ├── recognition/      # Verified award credentials and certificates
│   ├── Carl.png          # High-resolution hero portrait asset
│   └── resume.pdf        # Print-ready compiled executive résumé
├── src/
│   ├── app/
│   │   ├── favicon.ico   # Legacy browser tab icon  
│   │   ├── globals.css   # Global theme layers, scanlines, and typography tokens  
│   │   ├── icon.svg      # Vector dynamic favicon  
│   │   ├── layout.tsx    # Root metadata, font definitions, and viewport setup  
│   │   └── page.tsx      # Composition root for dossier sections  
│   ├── components/
│   │   ├── About.tsx             # Strategic leadership narrative and personal bio  
│   │   ├── ArkSection.tsx        # Organization incubator highlight and roadmap  
│   │   ├── Collaborations.tsx    # Ecosystem network and partner showcase  
│   │   ├── Contact.tsx           # Direct transmission console and clipboard relay  
│   │   ├── CustomCursor.tsx      # Custom hardware-accelerated pointer engine  
│   │   ├── Experience.tsx        # Scroll-scrubbed professional timeline  
│   │   ├── GlobalBackground.tsx  # Dynamic atmospheric ambient gradient field  
│   │   ├── Hero.tsx              # Parallax identity cluster and laurel medallions  
│   │   ├── Manifesto.tsx         # Architectural philosophy and core mission  
│   │   ├── Navbar.tsx            # Dynamic island capsule and smooth navigation  
│   │   ├── Projects.tsx          # Software and game production deck  
│   │   ├── Recognition.tsx       # Verified podium milestones and proof modals  
│   │   ├── SectionReveal.tsx     # Viewport entrance animation wrapper  
│   │   ├── SmoothScroll.tsx      # Smooth physics scroll conductor  
│   │   └── TechStack.tsx         # Orbital constellation radar and tech filters  
│   └── hooks/
│       └── useSoundEffects.ts    # Parametric Web Audio API feedback synthesizer  
├── .gitignore  
├── AGENTS.md  
├── eslint.config.mjs  
├── next.config.ts  
├── package.json  
└── tsconfig.json

```

---

## ⚡ Performance & Optimization Standards

* **Lighthouse Standards**: Scored for 95+ performance, accessibility, best practices, and SEO.
* **Zero Layout Shift (CLS)**: Pre-allocated spatial dimensions on all hero layers, custom SVG viewports, and modal backdrops.
* **Asset Pipeline**: Static raster media served in optimized formats, vector elements rendered via inline/sanitized SVG components, and résumé assets served via static edge resolution.

---

## 🚀 Local Development Setup

### Prerequisites

* **Node.js**: `v18.17.0` or higher
* **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation & Run

1. Clone the repository:
```bash
git clone https://github.com/kurushimu30/mel-portfolio.git
cd mel-portfolio

```


2. Install project dependencies:
```bash
npm install

```


3. Start local development server:
```bash
npm run dev

```


4. Launch [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build Verification

To run a production test build locally:

```bash
npm run build
npm run start

```

---

## 👤 Author & Leadership Dossier

**Mel Carl A. Chacon**

* **Founder & CEO**, AcademiTech Research & Knowledge (ARK)
* **Section President**, Polytechnic University of the Philippines — BSIT
* **GitHub**: [@kurushimu30](https://www.google.com/search?q=https://github.com/kurushimu30)
* **LinkedIn**: [linkedin.com/in/melcarl-chacon](https://linkedin.com/in/melcarl-chacon/)

---

## 📄 License

This repository is maintained as personal source code and portfolio collateral. All project implementations, game designs, and personal media assets are proprietary.