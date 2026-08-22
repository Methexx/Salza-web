# Portfolio Audit Report

Generated: 2026-08-22 · Read-only inventory, no changes made.

---

## 1. Project Structure

**Framework:** Next.js `14.2.35` (App Router), React `^18`, TypeScript `^5`.

**Package manager:** npm (`package-lock.json` present, no `pnpm-lock.yaml` / `yarn.lock`).

**Node version (local environment):** v24.11.1 (no `.nvmrc` / `engines` field in `package.json` to pin a version).

### Routing structure (App Router)
| Route | File | Type |
|---|---|---|
| `/` | `src/app/page.tsx` | Static home page, composes all sections |
| `/projects` | `src/app/projects/page.tsx` | All-projects listing page |
| `/projects/[slug]` | `src/app/projects/[slug]/page.tsx` | Dynamic project detail page, uses `generateStaticParams` + `generateMetadata` (fully static-generated) |
| Root layout | `src/app/layout.tsx` | Wraps every route: theme provider, intro overlay, smooth scroll, cursor orb, back-to-top, background layer, navbar, footer |

No `middleware.ts`, no API routes (`src/app/api`), no route groups.

### Where things live
- **Pages/routes:** `src/app/` (App Router)
- **Layout-level components:** `src/components/layout/` (Navbar, Footer, ThemeProvider, ThemeToggle, BackToTopButton)
- **Page sections:** `src/components/sections/` (Hero, About, Experience, Volunteering, Certifications, AchievementsBlock, Projects, InterfacesShowcase, Contact, Skills, HeroTerminal, ColomboClock)
- **Reusable UI primitives:** `src/components/ui/` (Button, Container, Pill, ProjectCard, ProjectDetailBackLink, SectionEyebrow, SectionHeading, SectionWrapper, StatCounter, Timeline)
- **Background/visual effects:** `src/components/background/` (BackgroundLayer, CalmSectionBackground, ParticleCanvas), `src/components/effects/` (CursorOrb, IntroOverlay, LaserFlow, Shuffle, SmoothScroll)
- **Data (content-as-code):** `src/lib/data/` (achievements, certifications, experience, nav, profile, projects, skills)
- **Other lib code:** `src/lib/constants.ts`, `src/lib/contact.ts`, `src/lib/utils.ts`
- **Global styles:** `src/styles/globals.css`
- **Local fonts:** `src/app/fonts/` (`.woff` files)
- **Type declarations:** `src/types/styles.d.ts`

### Full file tree (excluding node_modules, .git, .next, dist)
```
.eslintrc.json
next-env.d.ts
next.config.mjs
package.json
package-lock.json
postcss.config.mjs
README.md
tailwind.config.ts
tsconfig.json
tsconfig.tsbuildinfo

public/
  favicons/
    android-chrome-192x192.png
    android-chrome-512x512.png
    apple-touch-icon.png
    favicon-16x16.png
    favicon-32x32.png
    favicon.ico
    site.webmanifest
  projects/
    abc-cinema/          (Movie list.png, abc.png, home.png, ticket booking.png)
    astrolift/            (dashboard.png, login.png, payment dashboard.png)
    avurudu/               [EMPTY FOLDER — no files]
    greenie/               (Feed.png, Leaderboard.png, Login.png, greenie.jpg)
    oncallr/               (Dashboard.png)
    screeenc/              (Mobile.png, Web.png)
    showcase/              (interface-01.svg .. interface-04.svg)
    ticket-platform/       (Dashboard.png, Feed.png, Login.png, Main.png, Saved.png, Ticket Price.png)
    universe/              (Admin dashboard.png, Attendance - mobile.png, Mobile - support.png, Teachers List.png, User Profile.png)
    walkwise/               (walkwise.png)
    weather/                (clearsky.png)

src/
  app/
    apple-icon.png
    favicon.ico
    fonts/
      GeistMonoVF.woff
      GeistVF.woff
      inter-latin-400-normal.woff
      inter-latin-500-normal.woff
      jetbrains-mono-latin-500-normal.woff
      rajdhani-latin-600-normal.woff
      rajdhani-latin-700-normal.woff
    icon.png
    layout.tsx
    page.tsx
    projects/
      page.tsx
      [slug]/page.tsx
  components/
    background/
      BackgroundLayer.tsx
      CalmSectionBackground.tsx
      ParticleCanvas.tsx
    effects/
      CursorOrb.tsx
      IntroOverlay.tsx
      LaserFlow.tsx
      Shuffle.tsx
      SmoothScroll.tsx
    layout/
      BackToTopButton.tsx
      Footer.tsx
      Navbar.tsx
      ThemeProvider.tsx
      ThemeToggle.tsx
    sections/
      About.tsx
      AchievementsBlock.tsx
      Certifications.tsx
      ColomboClock.tsx
      Contact.tsx
      Experience.tsx
      Hero.tsx
      HeroTerminal.tsx
      InterfacesShowcase.tsx
      Projects.tsx
      Skills.tsx
      Volunteering.tsx
    ui/
      Button.tsx
      Container.tsx
      Pill.tsx
      ProjectCard.tsx
      ProjectDetailBackLink.tsx
      SectionEyebrow.tsx
      SectionHeading.tsx
      SectionWrapper.tsx
      StatCounter.tsx
      Timeline.tsx
  lib/
    constants.ts
    contact.ts
    data/
      achievements.ts
      certifications.ts
      experience.ts
      nav.ts
      profile.ts
      projects.ts
      skills.ts
    utils.ts
  styles/
    globals.css
  types/
    styles.d.ts
```

Note: `src/app/fonts/` contains `GeistVF.woff` and `GeistMonoVF.woff`, but neither is referenced by any `@font-face` in `globals.css` (only Rajdhani, Inter, JetBrains Mono are declared) and Geist is not imported via `next/font` anywhere found — these two files appear unused by the current CSS.

---

## 2. Dependencies

### `dependencies`
| Package | Version | Category |
|---|---|---|
| `@fontsource/inter` | ^5.2.8 | Typography |
| `@fontsource/jetbrains-mono` | ^5.2.8 | Typography |
| `@fontsource/rajdhani` | ^5.2.7 | Typography |
| `@gsap/react` | ^2.1.2 | **Animation** (GSAP React hook wrapper) |
| `clsx` | ^2.1.1 | Utility (class name merging) |
| `framer-motion` | ^11.13.1 | **Animation** |
| `gsap` | ^3.15.0 | **Animation** |
| `lenis` | ^1.3.25 | **Animation/scroll** (smooth scroll) |
| `lucide-react` | ^1.23.0 | Icons |
| `next` | 14.2.35 | Framework |
| `next-themes` | ^0.4.6 | Theming (dark/light) |
| `react` | ^18 | Framework |
| `react-dom` | ^18 | Framework |
| `tailwind-merge` | ^3.6.0 | Styling utility |
| `three` | ^0.185.1 | **3D** (used directly, no react-three-fiber) |

### `devDependencies`
| Package | Version | Category |
|---|---|---|
| `@types/node` | ^20 | Types |
| `@types/react` | ^18 | Types |
| `@types/react-dom` | ^18 | Types |
| `@types/three` | ^0.185.0 | Types |
| `eslint` | ^8 | Linting |
| `eslint-config-next` | 14.2.35 | Linting |
| `postcss` | ^8 | Styling (Tailwind pipeline) |
| `tailwindcss` | ^3.4.1 | **Styling** |
| `typescript` | ^5 | Types/build |

### Animation/3D-related
`framer-motion`, `gsap`, `@gsap/react`, `lenis`, `three`

### Styling-related
`tailwindcss`, `postcss`, `tailwind-merge`, `clsx`, `@fontsource/*` (font delivery, styling-adjacent)

No `styled-components`, `sass`/`scss`, `emotion`, or CSS-in-JS libraries present.

---

## 3. Global Styling

### `src/styles/globals.css` — full contents
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@font-face {
  font-family: "Rajdhani";
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("../app/fonts/rajdhani-latin-600-normal.woff") format("woff");
}

@font-face {
  font-family: "Rajdhani";
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("../app/fonts/rajdhani-latin-700-normal.woff") format("woff");
}

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("../app/fonts/inter-latin-400-normal.woff") format("woff");
}

@font-face {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("../app/fonts/inter-latin-500-normal.woff") format("woff");
}

@font-face {
  font-family: "JetBrains Mono";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("../app/fonts/jetbrains-mono-latin-500-normal.woff") format("woff");
}

@keyframes status-pulse {
  0%, 100% { opacity: 0.38; transform: scale(0.62); }
  50% { opacity: 1; transform: scale(1); }
}

@keyframes terminal-cursor {
  0%, 45% { opacity: 1; }
  46%, 100% { opacity: 0; }
}

@keyframes intro-name-cursor {
  0%, 48% { opacity: 1; }
  49%, 100% { opacity: 0; }
}

@layer base {
  :root {
    --font-display: "Rajdhani", sans-serif;
    --font-body: "Inter", sans-serif;
    --font-mono: "JetBrains Mono", monospace;

    --accent: 50 95 254;
    --accent-dim: 37 71 205;
    --accent-bright: 93 128 255;
    --accent-glow: rgba(50, 95, 254, 0.45);

    --bg: 250 247 244;
    --bg-elevated: 255 255 255;
    --bg-elevated-2: 240 235 229;
    --border: 224 214 204;
    --foreground: 26 20 17;
    --muted: 107 95 84;
    --muted-2: 163 149 136;
    --particle-color: 176 166 156;
  }

  .dark {
    --accent: 50 95 254;
    --accent-dim: 37 71 205;
    --accent-bright: 93 128 255;
    --accent-glow: rgba(50, 95, 254, 0.45);

    --bg: 10 8 7;
    --bg-elevated: 18 14 11;
    --bg-elevated-2: 26 20 17;
    --border: 42 33 26;
    --foreground: 245 239 233;
    --muted: 163 149 136;
    --muted-2: 92 82 72;
    --particle-color: 255 255 255;
  }

  * { @apply border-border; }

  html { scroll-behavior: smooth; }

  html.lenis, html.lenis body { height: auto; }
  .lenis.lenis-smooth { scroll-behavior: auto !important; }
  .lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
  .lenis.lenis-stopped { overflow: hidden; }

  body {
    background-color: rgb(var(--bg));
    color: rgb(var(--foreground));
    font-family: var(--font-body), sans-serif;
    background-image: linear-gradient(180deg, rgb(var(--bg)), rgb(var(--bg-elevated-2)) 100%);
  }

  h1, h2, h3 {
    color: rgb(var(--foreground));
    font-family: var(--font-display), sans-serif;
    letter-spacing: -0.02em;
  }
}

@layer utilities {
  .text-balance { text-wrap: balance; }

  .clipped-corner {
    clip-path: polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px);
  }

  .clipped-corner-sm {
    clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  }

  .accent-glow-text { text-shadow: 0 0 18px var(--accent-glow); }
  .accent-glow-shadow { box-shadow: 0 0 18px var(--accent-glow); }

  .status-pulse { animation: status-pulse 2.8s ease-in-out infinite; transform-origin: center; }
  .status-pulse-fast { animation: status-pulse 1.9s ease-in-out infinite; transform-origin: center; }

  .cursor-orb { backdrop-filter: blur(6px); }

  .hero-terminal {
    @apply relative w-full overflow-hidden rounded-2xl border border-border bg-bg-elevated/95 font-mono;
    min-height: 25rem;
    box-shadow: 0 0 0 1px rgba(50, 95, 254, 0.05), 0 24px 70px rgba(0, 0, 0, 0.28), 0 0 48px rgba(50, 95, 254, 0.09);
  }
  .hero-terminal::before {
    background-image: repeating-linear-gradient(90deg, transparent 0, transparent 3px, rgba(50, 95, 254, 0.018) 4px);
    content: "";
    inset: 3.25rem 0 0;
    pointer-events: none;
    position: absolute;
  }
  .hero-terminal__bar {
    @apply relative z-10 flex h-[3.25rem] items-center justify-between border-b border-border px-4 sm:px-5;
    background: rgb(var(--bg-elevated-2) / 0.7);
  }
  .hero-terminal__dot { @apply block h-3 w-3 rounded-full; }
  .hero-terminal__title { @apply text-[0.62rem] uppercase tracking-[0.2em] text-muted sm:text-xs sm:tracking-[0.24em]; }
  .hero-terminal__body { @apply relative z-10 space-y-3 p-5 text-xs leading-6 sm:p-7 sm:text-sm sm:leading-7; }
  .hero-terminal__line { min-height: 1.75rem; overflow-wrap: anywhere; white-space: pre-wrap; }
  .hero-terminal__line--command { @apply mt-2 font-semibold text-accent; }
  .hero-terminal__line--output { @apply text-muted; }
  .hero-terminal__line--success { color: rgb(var(--foreground)); }
  .hero-terminal__cursor {
    @apply ml-1 inline-block h-[1.05em] w-[0.55em] translate-y-[0.12em] bg-accent;
    animation: terminal-cursor 0.9s steps(1, end) infinite;
  }

  .intro-name-cursor {
    animation: intro-name-cursor 0.8s steps(1, end) infinite;
    box-shadow: 0 0 18px rgba(50, 95, 254, 0.75);
  }

  .hero-horizon { opacity: 0.95; transform-origin: center bottom; }

  @media (prefers-reduced-motion: reduce) {
    .hero-terminal__cursor { animation: none; }
    .intro-name-cursor { animation: none; }
  }
}
```

### Tailwind config (`tailwind.config.ts`)
```ts
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        "bg-elevated": "rgb(var(--bg-elevated) / <alpha-value>)",
        "bg-elevated-2": "rgb(var(--bg-elevated-2) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-2": "rgb(var(--muted-2) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-dim": "rgb(var(--accent-dim) / <alpha-value>)",
        "accent-bright": "rgb(var(--accent-bright) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
      },
      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "accent-glow": "0 0 24px var(--accent-glow)",
      },
    },
  },
  plugins: [],
};
```
No `tailwindcss/typography`, `tailwindcss/forms`, or other plugins registered. `content` glob still includes `./src/pages/**/*` even though the project uses only App Router (no `src/pages` directory exists).

### Design tokens (CSS variables)
All tokens are defined as space-separated RGB triplets in `:root` / `.dark` (consumed by Tailwind's `rgb(var(--x) / <alpha-value>)` pattern):

| Token | Light value | Dark value |
|---|---|---|
| `--accent` | `50 95 254` | `50 95 254` (same) |
| `--accent-dim` | `37 71 205` | `37 71 205` (same) |
| `--accent-bright` | `93 128 255` | `93 128 255` (same) |
| `--accent-glow` | `rgba(50,95,254,0.45)` | `rgba(50,95,254,0.45)` (same) |
| `--bg` | `250 247 244` | `10 8 7` |
| `--bg-elevated` | `255 255 255` | `18 14 11` |
| `--bg-elevated-2` | `240 235 229` | `26 20 17` |
| `--border` | `224 214 204` | `42 33 26` |
| `--foreground` | `26 20 17` | `245 239 233` |
| `--muted` | `107 95 84` | `163 149 136` |
| `--muted-2` | `163 149 136` | `92 82 72` |
| `--particle-color` | `176 166 156` | `255 255 255` |

No explicit spacing-scale, radius, or shadow token system beyond Tailwind defaults plus the one custom `boxShadow.accent-glow` and the two `clipped-corner` clip-path utilities (which function as the site's signature "cut corner" radius replacement).

### Dark/light mode setup
- Implemented via `next-themes` (`ThemeProvider` in `src/components/layout/ThemeProvider.tsx`, configured in `layout.tsx` with `attribute="class"`, `defaultTheme="dark"`, `enableSystem`, `disableTransitionOnChange`).
- Toggle UI: `src/components/layout/ThemeToggle.tsx`.
- Tailwind/CSS driven by the presence/absence of a `.dark` class on `<html>`, switching the CSS variable block shown above.
- Default theme is **dark**, with system-preference detection enabled.

---

## 4. Typography

### Fonts loaded
Two parallel font-loading mechanisms are present in the codebase:

1. **`@font-face` declarations in `globals.css`** (pointing at local `.woff` files in `src/app/fonts/`) — this is what's actually wired into the CSS variables (`--font-display`, `--font-body`, `--font-mono`) and therefore what's live:
   - **Rajdhani** — weights 600, 700 (display/heading font)
   - **Inter** — weights 400, 500 (body font)
   - **JetBrains Mono** — weight 500 (mono font)

2. **`@fontsource/*` npm packages** installed (`@fontsource/inter`, `@fontsource/jetbrains-mono`, `@fontsource/rajdhani`) but no import of these packages was found in any `.tsx`/`.ts` file — they appear to duplicate the local `.woff` files already declared via `@font-face` and are not currently imported/used.

3. **Unused font files present but not referenced:** `GeistVF.woff`, `GeistMonoVF.woff` in `src/app/fonts/` — no `@font-face` or `next/font` reference found for Geist anywhere.

No `next/font` (Google or local) usage was found — fonts are loaded purely via manual `@font-face` in CSS, not Next.js's font optimization system.

### Where fonts are applied
- `--font-display` (Rajdhani) → applied to `h1, h2, h3` globally, plus explicit `font-display` Tailwind utility usage in some components (e.g., IntroOverlay).
- `--font-body` (Inter) → applied to `body` as the default text font.
- `--font-mono` (JetBrains Mono) → applied via `font-mono` Tailwind utility, used extensively for eyebrow labels, terminal UI text, uppercase tracked labels throughout sections.

---

## 5. Color Palette

All colors below were found across `globals.css`, `tailwind.config.ts`, and component files (deduplicated).

### Design-token colors (CSS variables, RGB channel values — see Section 3 table for light/dark pairs)
`--accent`, `--accent-dim`, `--accent-bright`, `--accent-glow`, `--bg`, `--bg-elevated`, `--bg-elevated-2`, `--border`, `--foreground`, `--muted`, `--muted-2`, `--particle-color`

### Literal/hardcoded colors found in component code (not tokenized)
| Color | Location(s) | Context |
|---|---|---|
| `#325FFE` | `Footer.tsx`, `LaserFlow.tsx` (default prop) | Accent blue used directly (matches `--accent` = `rgb(50 95 254)`) as an SVG/laser-effect color prop |
| `#030303` | `IntroOverlay.tsx` | Intro overlay background |
| `#f2f2f2` | `IntroOverlay.tsx` | Intro overlay name text color |
| `#ff5f57` | `HeroTerminal.tsx` | macOS-style terminal traffic-light dot (red) |
| `#febc2e` | `HeroTerminal.tsx` | Terminal traffic-light dot (yellow) |
| `#28c840` | `HeroTerminal.tsx` | Terminal traffic-light dot (green) |
| `#101724` | `Contact.tsx` | Contact card/form background (dark navy, off-palette from the warm neutral `--bg-elevated` tokens) |
| `#0d1524` | `Contact.tsx` | Contact form input backgrounds |
| `#0b0f16` | `Contact.tsx` | Gradient stop in contact section overlay |
| `#090706`, `#0c0908` | `Footer.tsx` | Footer background gradient stops |

### Recurring rgba() accent glows (all derived from the same accent blue, `50, 95, 254`)
Used at varying opacities (0.05–0.9) across: `globals.css` (hero terminal glow/shadow), `Navbar.tsx` (shadow/glow), `BackToTopButton.tsx`, `Footer.tsx`, `ProjectCard.tsx`, `Contact.tsx`, `Projects.tsx`, `Timeline.tsx`, `IntroOverlay.tsx`, project detail page (`[slug]/page.tsx`).

### Neutral/black rgba overlays (image scrims, gradients)
`rgba(7,4,1,*)` (ProjectCard image overlay), `rgba(3,3,3,*)` (InterfacesShowcase), `rgba(0,0,0,*)` (various shadows), `rgba(255,255,255,*)` (subtle highlight overlays).

### Dynamic/computed colors
`ParticleCanvas.tsx` builds `rgba(${red}, ${green}, ${blue}, ${alpha})` gradients at runtime from the `--particle-color` CSS variable (parsed via JS), not a static value.

**Observation (descriptive only):** the design-token system (warm off-white/near-black neutrals) and several hardcoded component colors (`#101724`, `#0d1524`, `#090706`, `#0c0908` — cool navy/near-black) are visually distinct palettes coexisting in the same UI (Contact section and Footer use the cool navy hardcoded values instead of the warm `--bg-elevated` tokens).

---

## 6. Layout & Sections

Home page (`src/app/page.tsx`) renders sections in this order:

| # | Section | Component file | Animation/scroll effects present |
|---|---|---|---|
| 1 | Hero | `sections/Hero.tsx` (+ `HeroTerminal.tsx`) | Terminal typing cursor (CSS keyframes), likely GSAP-driven intro (see `Shuffle.tsx`), particle background |
| 2 | About | `sections/About.tsx` | Wrapped in `SectionWrapper` → Framer Motion fade/slide-up on scroll into view |
| 3 | Experience | `sections/Experience.tsx` | `SectionWrapper` scroll-in animation; uses `ui/Timeline.tsx` |
| 4 | Volunteering | `sections/Volunteering.tsx` | `SectionWrapper` scroll-in animation |
| 5 | Certifications | `sections/Certifications.tsx` | `SectionWrapper` scroll-in animation |
| 6 | Achievements | `sections/AchievementsBlock.tsx` | `SectionWrapper` scroll-in animation |
| 7 | Projects | `sections/Projects.tsx` | `SectionWrapper` scroll-in animation; `ui/ProjectCard.tsx` hover transitions |
| 8 | Interfaces Showcase | `sections/InterfacesShowcase.tsx` | Framer Motion (`motion.` usage) — carousel/slide transitions between showcase images |
| 9 | Contact | `sections/Contact.tsx` | `SectionWrapper` scroll-in animation; form state via React `useState` |
| — | Footer | `layout/Footer.tsx` | Framer Motion (`motion.` usage) |

Additional persistent (non-section) layout/effect components rendered in `layout.tsx` on every route:
- `IntroOverlay.tsx` — full-screen intro animation on load (Framer Motion)
- `SmoothScroll.tsx` — wraps page in Lenis smooth-scroll
- `CursorOrb.tsx` — custom cursor-follow orb effect
- `BackToTopButton.tsx` — Framer Motion show/hide + click-to-scroll
- `BackgroundLayer.tsx` → `ParticleCanvas.tsx` — canvas-based particle background rendered behind all content
- `Navbar.tsx` — sticky nav with scroll-based style change and mobile menu

Other effect components not confirmed wired into a specific section from this pass: `LaserFlow.tsx` (WebGL/shader-based laser effect, has a `color` prop defaulting to `#325FFE`), `Shuffle.tsx` (GSAP-based, likely text shuffle/scramble effect, used in Hero based on naming).

`ColomboClock.tsx` and `Skills.tsx` exist in `sections/` but are **not imported in `page.tsx`** — not currently rendered on the home page (may be used elsewhere or unused).

`ProjectDetailBackLink.tsx` is used only on the `[slug]` detail page.

### Scroll-based library summary
- **Framer Motion**: `SectionWrapper` (shared scroll-reveal for all sections), `IntroOverlay`, `BackToTopButton`, `Footer`, `InterfacesShowcase`
- **GSAP** (`gsap` + `@gsap/react`): `Shuffle.tsx`
- **Lenis**: `SmoothScroll.tsx` (global smooth-scroll wrapper)
- **Three.js**: not found imported in any component file scanned in `src/components` — installed as a dependency but no direct usage located in this pass (`LaserFlow.tsx` uses raw WebGL/shader constants, not confirmed to import `three`).

---

## 7. Assets

### `/public/favicons/`
Standard favicon set: `favicon.ico`, `favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `android-chrome-192x192.png` (20.5 KB), `android-chrome-512x512.png` (92.4 KB), `site.webmanifest`.

### `/public/projects/` (project screenshots, by folder)
| Folder | Files | Approx. total size |
|---|---|---|
| `abc-cinema/` | `Movie list.png`, `abc.png`, `home.png`, `ticket booking.png` | 1.1 MB |
| `astrolift/` | `dashboard.png`, `login.png`, `payment dashboard.png` | 416 KB |
| `avurudu/` | **empty — no files** | 0 |
| `greenie/` | `Feed.png`, `Leaderboard.png`, `Login.png`, `greenie.jpg` | 356 KB |
| `oncallr/` | `Dashboard.png` (1.57 MB single file) | 1.6 MB |
| `screeenc/` | `Mobile.png` (1.7 MB), `Web.png` (1.4 MB) | 3.0 MB |
| `showcase/` | `interface-01.svg` .. `interface-04.svg` (~1.5–1.9 KB each) | 20 KB |
| `ticket-platform/` | `Dashboard.png`, `Feed.png`, `Login.png`, `Main.png`, `Saved.png`, `Ticket Price.png` | 1.1 MB |
| `universe/` | `Admin dashboard.png`, `Attendance - mobile.png`, `Mobile - support.png`, `Teachers List.png`, `User Profile.png` | 344 KB |
| `walkwise/` | `walkwise.png` (1.0 MB single file) | 1.0 MB |
| `weather/` | `clearsky.png` | 488 KB |

All screenshots are `.png`/`.jpg`; only `showcase/` uses `.svg`. Several files use spaces in filenames (`Movie list.png`, `ticket booking.png`, `payment dashboard.png`, `Attendance - mobile.png`, `Mobile - support.png`, `Ticket Price.png`). Largest individual files: `oncallr/Dashboard.png` (~1.57 MB), `screeenc/Mobile.png` (~1.7 MB), `screeenc/Web.png` (~1.4 MB), `walkwise/walkwise.png` (~1.0 MB) — none are pre-optimized/compressed relative to the others in the set.

**Empty folder note:** `public/projects/avurudu/` exists but contains no files — no image assets for an "avurudu" project, but the folder is present in the tree.

### `/src/app/`
`favicon.ico`, `apple-icon.png`, `icon.png` — Next.js App Router auto-detected metadata icon files (in addition to the `public/favicons/` set referenced explicitly in `layout.tsx` metadata).

### `/src/app/fonts/`
7 `.woff` files (see Section 4).

---

## 8. Deployment

- **No deployment config files found**: no `vercel.json`, no `netlify.toml`, no Dockerfile, no CI workflow files (`.github/workflows/`) detected in the repo listing.
- **`next.config.mjs`**: essentially empty — `const nextConfig = {};` — no image domains, no redirects/rewrites, no experimental flags configured.
- **`package.json` scripts**:
  ```json
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
  ```
- `.gitignore` includes standard Next.js/Vercel entries (`/.next/`, `/out/`, `.vercel`), implying Vercel is the likely intended deployment target, but no explicit Vercel project config file is committed.

---

## 9. Misc

### SEO / Meta
- Defined only in root `src/app/layout.tsx` via the `metadata` export:
  - `title`: `"Methum Pathirana | Full-Stack Developer"`
  - `description`: present (full-stack developer bio)
  - `icons`: favicon/apple-touch-icon set (see Section 7)
  - `manifest`: `/favicons/site.webmanifest`
- `src/app/projects/page.tsx` and `src/app/projects/[slug]/page.tsx` each define their own page-level `metadata` (`title`/`description` only).
- **No Open Graph tags** (`openGraph` key) found in any metadata export.
- **No Twitter card metadata** found.
- **No canonical URL, no `robots` config, no `sitemap.xml`/`sitemap.ts`, no `manifest.ts`** beyond the static `site.webmanifest` file.

### Analytics
- No analytics scripts, tags, or packages found (`grep` for `gtag`, `google-analytics`, `plausible`, `vercel/analytics`, etc. returned no matches). No analytics currently wired into the site.

### Accessibility notes (descriptive only — not fixed)
- Only **4** occurrences of `alt=` attributes found across the entire `src/` tree, spread across `next/image` (`Image` component, used in `ProjectCard.tsx`, `InterfacesShowcase.tsx`, `[slug]/page.tsx`) and one plain `<img>` (`[slug]/page.tsx`, GitHub favicon icon, uses `alt=""` — decorative).
- Contact form (`Contact.tsx`) inputs (`#contact-name`, `#contact-email`, `#contact-message`) — did not confirm presence of associated `<label>` elements in this pass (only `id` + `placeholder` observed at the read lines); worth a closer look if accessibility is a concern.
- `SectionWrapper` and several effects respect `prefers-reduced-motion` (via `useReducedMotion()` from Framer Motion, and an explicit `@media (prefers-reduced-motion: reduce)` block in `globals.css` disabling terminal/intro cursor animations) — this is a positive existing pattern, noted for completeness.
- `layout.tsx` includes a "Skip to content" link (`href="#main-content"`, `sr-only` until focused) — present and wired to `<main id="main-content">`.

### Content data source
All copy (profile info, project descriptions, experience, skills, achievements, certifications, nav links) is centralized in `src/lib/data/*.ts` as typed TypeScript objects/arrays, not fetched from a CMS or external API — fully static/build-time content.
