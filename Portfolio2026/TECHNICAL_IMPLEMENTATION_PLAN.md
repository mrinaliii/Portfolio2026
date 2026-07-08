# Technical Implementation Plan
## Portfolio — "Precision at Rest"
### Production Architecture & Milestone Roadmap

---

> **Governing principle:** This portfolio is built like a production application — not a static site, not a template. Every architectural decision is made to minimize rewrites, maximize reusability, and leave the door open for the Knowledge Core backend without painting the frontend into a corner.

---

## 1. React Project Architecture

### Framework Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | React 18 + TypeScript | Concurrent mode for smooth character-by-character rendering; strict typing prevents runtime errors at scale |
| Bundler | Vite 5 | Native ESM, sub-second HMR, first-class CSS custom property support, optimized production builds |
| Package manager | pnpm (workspace) | Already configured in the monorepo; workspace allows shared types between frontend and API |
| CSS approach | CSS Custom Properties + CSS Modules | All design tokens live in `:root`; component-scoped styles prevent conflicts without a heavy CSS-in-JS runtime penalty |
| Routing | React Router v6 | Hash-free history-based routing; nested route support for the case study layout; small bundle footprint |

### Why Not Next.js or Remix

The portfolio is not content-heavy enough to need SSR, and the Knowledge Core backend (Express in `artifacts/api-server`) is already established in the monorepo. Adding Next.js would create a redundant server layer and complicate the existing workspace structure. React + Vite + React Router gives full control with zero framework overhead.

### Why Not a Full CSS-in-JS Solution

The design system is already expressed as CSS Custom Properties. Recreating those as JS objects (styled-components, Emotion) would add bundle weight, create a theme-switching lag risk on cold load, and require maintaining two sources of truth. CSS Modules + native custom properties are the correct fit.

---

## 2. Folder Structure

```
artifacts/
└── portfolio/                          # New artifact directory
    ├── index.html                      # Theme detection script in <head>
    ├── vite.config.ts
    ├── tsconfig.json
    ├── content/                        # Content-driven architecture — single source of truth
    │   └── projects/
    │       ├── ai-soc-analyst.md       # Frontmatter + full 13-section case study narrative
    │       └── [project-slug].md       # One file per project; same files power frontend + KC
    ├── public/
    │   ├── favicon-dark.svg
    │   ├── favicon-light.svg
    │   ├── resume.pdf                  # Served statically
    │   └── resume-preview.jpg          # Pre-rendered first-page image (2×)
    └── src/
        ├── main.tsx                    # App entry — ThemeProvider wrap
        ├── App.tsx                     # Router setup, global layout
        │
        ├── styles/
        │   ├── tokens.css              # All CSS Custom Properties (DS reference)
        │   ├── global.css              # Reset, base HTML, semantic tokens
        │   ├── typography.css          # Font-face declarations, type utilities
        │   └── animations.css          # @keyframes, reduced-motion overrides
        │
        ├── types/
        │   ├── project.ts              # Project, CaseStudy, Technology interfaces
        │   ├── knowledge-core.ts       # Query, Response, Citation interfaces
        │   └── theme.ts                # Theme type ('dark' | 'light')
        │
        ├── data/
        │   └── nav-items.ts            # Navigation link definitions
        │
        ├── lib/
        │   ├── scroll.ts               # Smooth scroll with 80px offset utility
        │   ├── clipboard.ts            # Copy-to-clipboard with async/error handling
        │   ├── lqip.ts                 # LQIP placeholder generator utilities
        │   ├── parse-projects.ts       # Vite virtual module: reads content/projects/*.md → typed Project[]
        │   ├── knowledge-core-api.ts   # API client for /api/knowledge-core/query
        │   └── analytics.ts            # All Plausible event wrappers — only file that calls plausible()
        │
        ├── hooks/
        │   ├── useTheme.ts             # Read/set theme, localStorage sync
        │   ├── useActiveSection.ts     # Intersection Observer → active nav item
        │   ├── useScrollY.ts           # Passive scroll position (nav opacity, back-to-top)
        │   ├── useReducedMotion.ts     # prefers-reduced-motion media query
        │   ├── useFocusTrap.ts         # Focus trap for drawer + mobile nav
        │   ├── useInView.ts            # Single-element viewport detection
        │   └── useKnowledgeCore.ts     # Query state machine (idle/loading/done/error)
        │
        ├── components/
        │   │
        │   ├── ui/                     # Pure, reusable primitive components
        │   │   ├── Button/
        │   │   │   ├── Button.tsx      # variant: 'primary' | 'secondary' | 'ghost'
        │   │   │   └── Button.module.css
        │   │   ├── StampLabel/
        │   │   │   ├── StampLabel.tsx
        │   │   │   └── StampLabel.module.css
        │   │   ├── Tooltip/
        │   │   │   ├── Tooltip.tsx     # Copied ✓, tech-tag hover
        │   │   │   └── Tooltip.module.css
        │   │   ├── Tag/
        │   │   │   ├── Tag.tsx         # Technology tag
        │   │   │   └── Tag.module.css
        │   │   ├── Skeleton/
        │   │   │   ├── Skeleton.tsx    # Shape-matched shimmer block
        │   │   │   └── Skeleton.module.css
        │   │   ├── ProgressBar/
        │   │   │   ├── ProgressBar.tsx # Top-of-viewport, globally managed
        │   │   │   └── ProgressBar.module.css
        │   │   ├── BackToTop/
        │   │   │   ├── BackToTop.tsx
        │   │   │   └── BackToTop.module.css
        │   │   ├── SkipLink/
        │   │   │   ├── SkipLink.tsx
        │   │   │   └── SkipLink.module.css
        │   │   └── LazyImage/
        │   │       ├── LazyImage.tsx   # LQIP blur-up wrapper
        │   │       └── LazyImage.module.css
        │   │
        │   ├── layout/                 # Structural layout components
        │   │   ├── Container/
        │   │   │   ├── Container.tsx   # max-width: 1120px rail
        │   │   │   └── Container.module.css
        │   │   ├── Section/
        │   │   │   ├── Section.tsx     # Entrance animation wrapper, scroll-margin
        │   │   │   └── Section.module.css
        │   │   ├── Grid/
        │   │   │   ├── Grid.tsx        # 12-col grid helper
        │   │   │   └── Grid.module.css
        │   │   └── Hairline/
        │   │       ├── Hairline.tsx    # 1px section separator
        │   │       └── Hairline.module.css
        │   │
        │   ├── navigation/
        │   │   ├── Nav/
        │   │   │   ├── Nav.tsx         # Desktop nav bar (fixed, blur backdrop)
        │   │   │   └── Nav.module.css
        │   │   ├── MobileNav/
        │   │   │   ├── MobileNav.tsx   # Full-screen overlay, focus trap
        │   │   │   └── MobileNav.module.css
        │   │   ├── ThemeToggle/
        │   │   │   ├── ThemeToggle.tsx # Moon/Sun icon with 15° rotation
        │   │   │   └── ThemeToggle.module.css
        │   │   └── ScrollDepthIndicator/
        │   │       ├── ScrollDepthIndicator.tsx
        │   │       └── ScrollDepthIndicator.module.css
        │   │
        │   ├── sections/               # One component per page section
        │   │   ├── Hero/
        │   │   │   ├── Hero.tsx
        │   │   │   ├── Hero.module.css
        │   │   │   ├── StarField.tsx   # Canvas-based static star field
        │   │   │   ├── DriftParticles.tsx
        │   │   │   └── RadarPulse.tsx
        │   │   ├── Signal/
        │   │   │   ├── Signal.tsx
        │   │   │   └── Signal.module.css
        │   │   ├── Work/
        │   │   │   ├── Work.tsx
        │   │   │   ├── Work.module.css
        │   │   │   ├── ProjectCard.tsx
        │   │   │   ├── ProjectCard.module.css
        │   │   │   ├── TechPanel.tsx   # Right-side desktop panel
        │   │   │   ├── TechPanel.module.css
        │   │   │   ├── SignalTrace.tsx  # SVG line between card and panel
        │   │   │   └── SignalTrace.module.css
        │   │   ├── Approach/
        │   │   │   ├── Approach.tsx
        │   │   │   └── Approach.module.css
        │   │   ├── Stack/
        │   │   │   ├── Stack.tsx
        │   │   │   ├── Stack.module.css
        │   │   │   └── PrecisionReveal.tsx  # 35ms staggered token reveal
        │   │   ├── KnowledgeCore/
        │   │   │   ├── KnowledgeCore.tsx
        │   │   │   ├── KnowledgeCore.module.css
        │   │   │   ├── SearchInput.tsx
        │   │   │   ├── SuggestionChip.tsx
        │   │   │   ├── ResponseBlock.tsx
        │   │   │   └── AmbientGlow.tsx  # Section background pulse (isolated)
        │   │   ├── Contact/
        │   │   │   ├── Contact.tsx
        │   │   │   └── Contact.module.css
        │   │   └── Footer/
        │   │       ├── Footer.tsx
        │   │       └── Footer.module.css
        │   │
        │   ├── resume-drawer/
        │   │   ├── ResumeDrawer.tsx    # Dialog, focus trap, state machine
        │   │   ├── ResumeDrawer.module.css
        │   │   ├── DrawerBackdrop.tsx
        │   │   └── DrawerBackdrop.module.css
        │   │
        │   └── case-study/
        │       ├── CaseStudyHeader.tsx # Minimal nav: name + ← All Projects
        │       ├── CaseStudyHero.tsx   # Title, stamp, metadata strip
        │       ├── CaseStudySection.tsx # Generic section wrapper (label + heading + body)
        │       ├── Gallery.tsx         # 2-up image grid
        │       ├── CodeBlock.tsx       # Syntax-highlighted + copy button
        │       └── LinksSection.tsx    # Live Demo, GitHub, ← Back
        │
        ├── pages/
        │   ├── HomePage.tsx            # All 7 sections in order
        │   └── CaseStudyPage.tsx       # Dynamic route: /work/[project-slug]
        │
        └── context/
            ├── ThemeContext.tsx         # Theme value + setter
            ├── DrawerContext.tsx        # Resume drawer open/close
            └── ProgressContext.tsx      # Global progress bar trigger
```

---

## 3. Reusable Component Hierarchy

The component tree is organized in three tiers. Each tier only imports from tiers below it — never above.

```
Tier 1 — Primitives (no external dependencies)
    Button, StampLabel, Tooltip, Tag, Skeleton, ProgressBar,
    BackToTop, SkipLink, LazyImage, Hairline, Container, Grid, Section

Tier 2 — Composed (import Tier 1 only)
    Nav, MobileNav, ThemeToggle, ScrollDepthIndicator,
    ProjectCard, TechPanel, SignalTrace,
    SearchInput, SuggestionChip, ResponseBlock,
    CaseStudyHeader, CaseStudySection, CodeBlock, Gallery,
    ResumeDrawer, DrawerBackdrop

Tier 3 — Sections/Pages (import Tier 1 + Tier 2)
    Hero, Signal, Work, Approach, Stack, KnowledgeCore,
    Contact, Footer, HomePage, CaseStudyPage
```

### Component API Conventions

Every component follows these contracts:

- **No inline styles.** All styling through CSS Modules + custom properties.
- **`className` pass-through.** Every component accepts an optional `className` prop for layout overrides at the page level.
- **`data-section` attributes on every `<section>`** — used by `useActiveSection` Intersection Observer.
- **`aria-*` props are never hardcoded.** They are always passed as props so the same component can serve different contexts with correct semantics.
- **No component manages its own scroll position.** Scroll effects live in hooks; components only consume them.

---

## 4. Routing Strategy

### Route Map

```
/                           → HomePage.tsx
/work/:projectSlug          → CaseStudyPage.tsx
*                           → 404 redirect → /
```

### Implementation Details

**React Router v6 with `<BrowserRouter>`:**
- History-based routing (no hash URLs)
- `useParams()` in `CaseStudyPage` to extract `projectSlug` and look up project data
- `<ScrollRestoration />` from React Router handles scroll position on back/forward navigation

**Anchor navigation on the home page:**
- Nav links like `href="#work"` use a custom `scrollTo` utility (not `<Link>`) that applies the 80px nav offset via `scroll-margin-top` on each section
- `useActiveSection` drives the active nav indicator; it does not drive routing — it is purely visual

**Case study → home navigation:**
- `← All Projects` link uses React Router `<Link to="/#work">`. On arrival, detect the `#work` hash and fire `scrollIntoView` after mount — this correctly handles the "navigate + scroll" pattern without a framework plugin

**404 handling:**
- Any unknown route redirects to `/` to avoid a blank page. Since the portfolio is a Vite SPA, the production server must serve `index.html` for all routes (configured in Vite's `preview` and Replit's proxy)

**Scroll restoration:**
- Home page sections maintain their position on forward navigation; case study pages scroll to top on arrival

---

## 5. Animation Libraries

### Decision Matrix

| Animation type | Tool | Reason |
|---------------|------|--------|
| Entrance animations (fade-up on scroll) | CSS + Intersection Observer | Zero JS runtime; declarative `opacity`/`transform`; CSS handles `prefers-reduced-motion` in one rule |
| Hero staggered sequence | CSS animation-delay | 7 elements, fixed delays — no library needed; simpler than Framer for static sequences |
| Resume Drawer slide-in/out | Framer Motion (`AnimatePresence` + `motion.div`) | Unmount animation requires `AnimatePresence`; the spring easing is hard to replicate cleanly with pure CSS on conditional render |
| Mobile nav overlay | Framer Motion | Same reason as drawer — requires exit animation on unmount |
| Signal Trace SVG line | Manual SVG `stroke-dasharray/dashoffset` via CSS | One SVG line; no library overhead warranted |
| Precision Reveal (35ms token stagger) | JavaScript `setTimeout` with `requestAnimationFrame` | Must be cancellable (re-entry, reduced motion); pure CSS `animation-delay` works but requires all tokens in the DOM upfront |
| Parallax (hero scroll) | `requestAnimationFrame` + `transform` | Direct DOM manipulation; no library adds value for a single translate |
| Character-by-character text render | React `useEffect` + `setInterval` | State-driven; integrates cleanly with the Knowledge Core query state machine |
| Scroll depth indicator | CSS `height` transition | The track fill is a CSS height driven by a CSS variable set from a `scroll` event listener |
| All other microinteractions | Pure CSS `transition` | Color, border, opacity, transform — these belong in CSS |

**Framer Motion is used in exactly two places:** the Resume Drawer and the mobile nav overlay. Both require exit animations on unmount, which is the one thing pure CSS cannot do cleanly for conditionally-rendered React components.

**No GSAP, no anime.js, no Three.js.** GSAP requires a license for many commercial uses and is overkill. Three.js is explicitly forbidden outside project showcases. The star field and drift particles are canvas-based, written in vanilla JS.

---

## 6. State Management

### Global State — React Context

Three contexts cover the globally-shared state:

| Context | State | Consumers |
|---------|-------|-----------|
| `ThemeContext` | `theme: 'dark' \| 'light'`, `toggleTheme()` | Nav, ThemeToggle, every component (via CSS custom properties — the toggle just swaps `data-theme` on `<html>`) |
| `DrawerContext` | `isDrawerOpen: boolean`, `openDrawer()`, `closeDrawer()` | Nav, ResumeDrawer, DrawerBackdrop |
| `ProgressContext` | `start()`, `finish()` | Knowledge Core query hook, any async operation |

`ThemeContext` is the only context with significant render frequency. It changes at most once per user session. Zero performance concern.

### Local State — Component-Owned

| State | Owner | Tool |
|-------|-------|------|
| Active nav section | `useActiveSection` hook | `IntersectionObserver` → `useState` in the hook, consumed by `Nav` |
| Scroll Y position | `useScrollY` hook | `scroll` event → `useState`, consumed by `Nav` (opacity) and `BackToTop` (visibility) |
| Knowledge Core query lifecycle | `useKnowledgeCore` hook | State machine with `status: 'idle' \| 'loading' \| 'streaming' \| 'done' \| 'error'` |
| Precision Reveal animation | `PrecisionReveal` component | Local `useState` + `useInView` trigger |
| Project card hover (Signal Trace) | `Work` section | `useState` tracking `hoveredProjectSlug \| null` |
| Copy tooltip visibility | `Tooltip` + `clipboard.ts` | `useState` in the Tooltip trigger component |
| Resume Drawer state (Loading/Ready/Error/Active) | `ResumeDrawer` component | Local `useState` state machine, isolated |

### No Redux, No Zustand

The application has no server-side data fetching beyond the Knowledge Core endpoint. There is no cart, no user session, no paginated list. Adding a global state library would be gold-plating. React Context is sufficient for the three pieces of truly global state; everything else is local.

---

## 7. Theme Implementation

### The Anti-Flash Contract

The theme must resolve synchronously before any pixel renders. This is a non-negotiable UX requirement. The implementation:

**`index.html` — inline script in `<head>` (before any stylesheet):**
```html
<script>
  (function() {
    var s = localStorage.getItem('theme');
    var p = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', s || p);
  })();
</script>
```

This script runs synchronously. By the time the browser parses any CSS, `data-theme` is already set. No FOUC, no flash of wrong color.

### Token Architecture

**`src/styles/tokens.css`** declares all raw palette values and semantic tokens on `:root` (dark mode default).

**`src/styles/global.css`** imports `tokens.css` and applies the `[data-theme="light"]` override block from the Design System CSS reference (Section 4a). No component ever touches this — they only reference semantic tokens.

**Component CSS Modules** reference only `var(--color-*)`, `var(--space-*)`, `var(--radius-*)`, etc. — never raw hex values. If a component ever needs a hex value, it belongs in `tokens.css` as a named token.

### Theme Toggle Mechanics

`ThemeContext` exposes `toggleTheme()` which:
1. Reads the current `data-theme` attribute from `document.documentElement`
2. Sets the new value (`'dark'` ↔ `'light'`)
3. Writes to `localStorage`
4. Triggers CSS transitions via the `html { transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease }` rule

The `ThemeToggle` component subscribes to the context. The icon crossfade (outgoing → 0 over 120ms, incoming → 1 over 180ms with 15° rotation) is a local CSS animation within the `ThemeToggle` component — it does not involve context re-renders.

---

## 8. AI Assistant Architecture

### Public-Facing vs. Internal Naming

The section heading visible to visitors is **"Ask My AI"** — immediately communicating purpose without requiring explanation. "Knowledge Core" is internal architecture branding used in code, component names, and this document. No visitor sees the words "Knowledge Core."

### System Topology

```
Browser (React frontend)
    │
    │   POST /api/knowledge-core/query
    │   { query: string }
    ▼
artifacts/api-server (Express)
    │
    ├── Rate limiter (express-rate-limit, 10 req/min per IP)
    ├── Input sanitization
    ├── Embedding call → IEmbeddingProvider.embed(text)
    │
    ├── Vector similarity search → Supabase pgvector
    │   (top-k = 5, cosine similarity, returns chunks + source metadata)
    │
    ├── LLM completion → ILLMProvider.complete(prompt, system, context)
    │   Returns: { answer, citations, relatedProjects, followUps }
    │
    └── Response → JSON → browser
```

### LLM Provider Abstraction Layer

The backend never calls any LLM vendor API directly. All completion and embedding calls go through provider interfaces. Changing the model or vendor in the future requires only swapping the registered implementation.

```typescript
// artifacts/api-server/src/llm/ILLMProvider.ts
interface ILLMProvider {
  complete(
    userPrompt: string,
    systemPrompt: string,
    context: string[]
  ): Promise<string>;
}

// artifacts/api-server/src/llm/IEmbeddingProvider.ts
interface IEmbeddingProvider {
  embed(text: string): Promise<number[]>;
}
```

**Concrete implementations (one file each):**

```
artifacts/api-server/src/llm/
├── ILLMProvider.ts              # Interface — never import a vendor here
├── IEmbeddingProvider.ts        # Interface
├── providers/
│   ├── OpenAIProvider.ts        # GPT-4o-mini + text-embedding-3-small (default)
│   ├── ClaudeProvider.ts        # claude-3-haiku (stub — wired when key is present)
│   ├── GeminiProvider.ts        # gemini-flash (stub — wired when key is present)
│   └── OllamaProvider.ts        # Local Ollama (stub — for offline development)
└── getLLMProvider.ts            # Factory: reads LLM_PROVIDER env var → returns instance
```

**Factory pattern:**
```typescript
// getLLMProvider.ts
export function getLLMProvider(): ILLMProvider {
  const provider = process.env.LLM_PROVIDER ?? 'openai';
  switch (provider) {
    case 'claude':   return new ClaudeProvider();
    case 'gemini':   return new GeminiProvider();
    case 'ollama':   return new OllamaProvider();
    default:         return new OpenAIProvider();
  }
}
```

The route handler calls `getLLMProvider().complete(...)` and `getEmbeddingProvider().embed(...)` exclusively. No `openai.chat.completions.create(...)` calls appear anywhere outside `OpenAIProvider.ts`.

### Knowledge Base Structure

The Knowledge Core indexes the **exact same markdown files** that power the frontend case studies. There is no separate AI document corpus. When project content changes, both the website and the Knowledge Core stay synchronized automatically.

```
content/projects/                       # Single source of truth for all project data
├── ai-soc-analyst.md                   # Frontmatter + full narrative → frontend + KC
└── [project-slug].md                   # One file per project

artifacts/api-server/knowledge-base/    # Non-project knowledge (symlinked at embed time)
├── resume.md                           # Education, experience, skills, certs
├── skills.md                           # Technology inventory with context
├── certifications.md                   # Cert name, issuer, relevance
└── current-learning.md                 # Active learning goals
```

**Data flow:**
```
content/projects/*.md
    │
    ├──▶ Frontend (Vite virtual module → typed Project[])
    │        └──▶ ProjectCard, CaseStudyPage, SEO metadata, Search
    │
    └──▶ Knowledge Core (embedding pipeline → Supabase pgvector)
             └──▶ RAG query → ILLMProvider → "Ask My AI" response
```

Each markdown file is chunked at paragraph boundaries (max 400 tokens per chunk) with 50-token overlap. Chunks are embedded via `IEmbeddingProvider` and stored in Supabase with source metadata (`{ file, section, slug }`).

### API Response Contract

```typescript
interface KnowledgeCoreResponse {
  answer: string;
  citations: Array<{ label: string; slug?: string }>;
  relatedProjects: Array<{ title: string; slug: string }>;
  followUps: string[];
  error?: string;
}
```

### Frontend State Machine (`useKnowledgeCore`)

```
idle ──── submit ────▶ loading ──── response arrives ────▶ streaming ──── complete ────▶ done
           │                                                                              │
           └──────────────────────────────────────────────────────────── new query ──────┘
                                              │ error
                                              ▼
                                           error (retry available)
```

The `streaming` state drives the character-by-character render via a `setInterval` at 18ms ticks consuming the answer string. Citations, related project links, and follow-up chips render after the streaming state completes, each group with a 200ms fade-in separated by 100ms gaps.

### Rate Limiting & Abuse Prevention

- 10 requests per minute per IP (express-rate-limit)
- Maximum query length: 500 characters (client + server validated)
- System prompt is server-side only — never exposed to the client
- Out-of-scope responses are handled by the LLM system prompt, not client-side filtering

### Embedding Pipeline (run during content updates, not at query time)

A Node.js script (`scripts/embed-knowledge-base.ts`) reads all markdown files, chunks them, calls the embedding API, and upserts to Supabase. This runs manually when content changes. It is not a build step — it is a one-time setup operation that only reruns when knowledge base content is updated.

---

## 9. Case Study Architecture

### Route and Data Loading

`CaseStudyPage.tsx` receives `projectSlug` from `useParams()`. Project data is loaded from the virtual module `virtual:projects`, which is resolved at build time by a Vite plugin (`vite-plugin-projects`) that reads `content/projects/*.md`, parses frontmatter with `gray-matter`, and exports a strongly-typed `Project[]` array. No API call is needed for case study content; the data is bundled with the application.

**Why a Vite virtual module instead of a direct `import`?** Markdown files are not natively importable in Vite without a plugin. The virtual module approach keeps the content in a human-readable format (`content/projects/*.md`), gives the embedding pipeline direct access to the same files without any transformation, and emits typed TypeScript objects to the frontend without any runtime parsing overhead.

This is intentional: case study content is authored content that changes infrequently. Bundling it means zero network round-trip on page load, instant render, and full static type safety on the content shape. The `parse-projects.ts` Vite plugin registers the virtual module and is the only code that touches `gray-matter` — no component ever imports a markdown file directly.

### Case Study Content Shape

```typescript
interface CaseStudy {
  slug: string;
  title: string;
  year: number;
  category: string;
  status: 'Active' | 'Completed' | 'Ongoing';
  shortDescription: string;
  duration: string;
  role: string;
  technologies: Technology[];
  liveUrl?: string;
  githubUrl?: string;
  sections: CaseStudySection[];    // 11 narrative sections (PROJECT OVERVIEW → FUTURE IMPROVEMENTS)
  gallery?: GalleryImage[];
  codeExample?: string;            // For projects with no visual output
}

interface CaseStudySection {
  label: string;                   // Geist Mono stamp (e.g., 'PROJECT OVERVIEW')
  heading: string;                 // Syne 28px heading
  body: string | string[];         // String for prose, string[] for bullet lists
}
```

### Section Rendering

`CaseStudySection.tsx` is a generic component that accepts a `section: CaseStudySection` prop and renders stamp + heading + body in the correct typographic hierarchy. Every one of the 13 sections uses this component — there is no one-off section template.

Sections 12 (Gallery) and 13 (Links) use specialized components (`Gallery.tsx`, `LinksSection.tsx`) but follow the same stamp-label + content structure.

### Reading Experience Details

- Body copy constrained to 7 of 12 columns via a `prose` layout class
- Body section entrance animations are **disabled** — the reader is in focused reading mode; sections do not animate on scroll in case studies
- Hero title still uses the standard `translateY(24px) → 0` entrance
- Scroll Depth Indicator maps its markers to case study section labels dynamically
- Back to Top is active
- Reading Depth microinteraction is active (paragraph opacity tracking on mouse move)

---

## 10. Asset Organization

```
public/
├── favicon-dark.svg                    # Ice signal (#5ba8d4) on transparent
├── favicon-light.svg                   # Ice signal dim (#3a6f94) on transparent
├── resume.pdf                          # Served directly for download
├── resume-preview.jpg                  # 2× pre-rendered first page (960×1244px)
├── og-image.png                        # 1200×630px — Open Graph share card
└── fonts/                              # Self-hosted (see Image Optimization)
    ├── Syne-variable.woff2
    └── GeistMono-Regular.woff2

src/assets/
├── portrait/
│   ├── portrait.jpg                    # 640×854px source
│   └── portrait-lqip.jpg              # ~20px thumbnail, base64-encoded for LQIP
└── projects/
    └── [project-slug]/
        ├── cover.jpg                   # Card visual (16:9 or 4:3)
        ├── cover-lqip.jpg
        ├── gallery-01.jpg              # Case study gallery images
        ├── gallery-01-lqip.jpg
        └── gallery-02.jpg
```

### Asset Naming Conventions

- All image filenames are lowercase, hyphen-separated
- Every image has a paired `-lqip.jpg` variant for the blur-up placeholder
- Portrait assets are isolated from project assets
- No vendor assets mixed with project assets

---

## 11. Image Optimization Strategy

### Delivery Format

Modern formats are preferred in order of browser support, with JPEG as the universal fallback. All multi-format images are served via `<picture>` with explicit `<source type>` declarations so no browser ever downloads an unsupported format.

**Portrait (hero photograph):**
- AVIF (best compression, most precise gradients — supported in all modern browsers)
- WebP (Safari < 16 fallback)
- JPEG (IE / very old browsers — never actually displayed in practice)

**Project screenshots and gallery images:**
- WebP (primary — universal modern support, ~30% smaller than JPEG at equal quality)
- JPEG fallback

**All other assets:**
- **SVG** for favicons, icons, and any diagram content
- **PNG** only for assets with transparency that cannot be SVG

`LazyImage` wraps a `<picture>` element rather than a bare `<img>` when multiple formats are available. The AVIF and WebP `<source>` elements precede the `<img>` fallback — browsers stop at the first supported format.

### LQIP (Low-Quality Image Placeholder) Pipeline

1. At build time, a Vite plugin (or a pre-build script) generates LQIP variants: each source image is resized to ~20px width, saved as JPEG at quality 20
2. LQIP files are base64-encoded and inlined into the `LazyImage` component as the `src` of the `<img>` element on initial render
3. The full image loads in the background via a new `Image()` object; when it fires `onload`, the full image fades in over 300ms and the LQIP fades out

### The `LazyImage` Component Contract

```typescript
interface LazyImageProps {
  src: string;           // Full-resolution URL
  lqip: string;          // Base64 data URI
  alt: string;
  aspectRatio: string;   // e.g., '16/9' or '3/4'
  eager?: boolean;       // true for hero portrait (above fold)
  className?: string;
}
```

`eager` images use `loading="eager"` and skip the LQIP fade (they load before the entrance animation fires). All other images use `loading="lazy"`.

### Layout Shift Prevention

All image containers declare `aspect-ratio` explicitly. The browser reserves the correct layout space before the image loads. Cumulative Layout Shift (CLS) is zero for all images.

### Portrait Sizing

- Source: 640×854px (minimum 2× the rendered size of 320×427px)
- Rendered at `320×427px` on desktop, `64vw` on mobile
- `srcset` provides 1× and 2× variants; browser selects based on device pixel ratio

---

## 12. SEO Strategy

### Metadata Architecture

`react-helmet-async` provides document head management per-route. Every page declares its own `<title>`, `<meta description>`, and Open Graph tags.

**Home page (`/`):**
```
Title:       [Name] — AI, ML & Cybersecurity Engineer
Description: Portfolio of [Name], a CS student specializing in AI, ML, and cybersecurity.
             Building intelligent systems at the intersection of machine learning and security.
OG Image:    /og-image.png (1200×630px)
OG Type:     website
```

**Case study pages (`/work/[slug]`):**
```
Title:       [Project Title] — [Name]
Description: [Project shortDescription] — case study by [Name]
OG Image:    /projects/[slug]/cover.jpg (cropped to 1200×630)
OG Type:     article
```

### Structured Data (JSON-LD)

Home page includes a `Person` schema:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[Name]",
  "url": "https://[domain]",
  "jobTitle": "CS Student / Software Engineer",
  "knowsAbout": ["Artificial Intelligence", "Machine Learning", "Cybersecurity"]
}
```

Case study pages include a `CreativeWork` schema for each project.

### URL Structure

- Human-readable, hyphenated slugs (`/work/ai-soc-analyst`, not `/work/1`)
- No trailing slashes
- Canonical tags on all pages to prevent duplicate content from hash routes
- Sitemap generated at build time listing `/` and all `/work/[slug]` routes

### Prerendering Consideration

The portfolio is not SSR'd, but the content is entirely static (no user-specific data). Replit's static deployment serves `index.html` for all routes. Search engine crawlers that execute JavaScript (Googlebot) will index correctly. For crawlers that don't, a prerender service is not needed at MVP — the portfolio's audience (recruiters, engineers) will access it via browser, not scraper.

---

## 13. Accessibility Strategy

### Foundation: Semantic HTML

- One `<h1>` per page (home: your name; case study: project title)
- Sections use `<section>` with `aria-labelledby` pointing to the `<h2>` heading
- Navigation uses `<nav aria-label="Main navigation">`
- `<main>` wraps all page content; `<header>` wraps the nav
- No `<div>` where a semantic element exists

### Focus Management

- **Skip link** is always the first Tab stop, visually hidden until focused
- **Tab order** follows visual reading order — no positive `tabindex` values
- **Focus trap** in Resume Drawer (via `useFocusTrap` hook using `focus-trap-react` or a bespoke implementation)
- **Focus trap** in mobile nav overlay (same hook)
- On Drawer open: focus moves to close button
- On Drawer close: focus returns to the "Resume" nav trigger
- On mobile nav close: focus returns to the hamburger button

### ARIA Conventions

| Component | ARIA attributes |
|-----------|----------------|
| Nav links | `aria-current="page"` on active link |
| Theme toggle | `aria-label` updates dynamically: "Switch to light mode" / "Switch to dark mode" |
| Resume drawer | `role="dialog" aria-modal="true" aria-label="Resume preview"` |
| Drawer backdrop | `aria-hidden="true"` |
| Mobile nav overlay | `role="dialog" aria-modal="true" aria-label="Navigation menu"` |
| Knowledge Core region | `role="region" aria-label="Knowledge Core — Ask about my work"` |
| Knowledge Core input | `aria-label="Ask about my projects and experience"` |
| Canvas ambient effects | `aria-hidden="true"` |
| Scroll depth indicator | `aria-hidden="true"` |
| Skeleton loaders | `aria-busy="true"` on the containing region |
| Gallery images | descriptive `alt` text — never `alt=""` unless purely decorative |

### Reduced Motion

`useReducedMotion()` hook reads `window.matchMedia('(prefers-reduced-motion: reduce)')` reactively. Components consume it to:
- Disable parallax in the Hero
- Skip entrance animation transforms (opacity-only transitions remain)
- Pause star field canvas
- Collapse all animation durations to 0.01ms via the global CSS rule
- Precision Reveal: all tokens appear simultaneously
- Signal Trace: sidebar opens immediately, no SVG draw animation

The CSS rule (`@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; ... } }`) in `animations.css` is the safety net. The React hook provides additional control for JS-driven animations.

### Color Contrast Compliance

All text uses verified semantic tokens. The one known exception (`--color-text-muted` at `--text-stamp` size) is explicitly restricted to non-critical metadata (timestamps, category stamps) — never body copy or interactive labels. Light mode uses `--color-ice-signal-dim` for interactive text links (verified AA at 4.2:1 on the frost canvas).

---

## 14. Performance Strategy

### Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP (hero portrait) | < 1.5s | `loading="eager"`, `fetchpriority="high"`, preconnect to font CDN |
| CLS | 0 | All images declare `aspect-ratio`; no content inserted before layout |
| FID / INP | < 100ms | No heavy main-thread work at load; canvas effects are requestAnimationFrame |
| TTFB | < 200ms | Replit's CDN + small initial HTML |

### Bundle Strategy

**Code splitting by route:**
- `HomePage` and `CaseStudyPage` are loaded with `React.lazy()` + `Suspense`
- Each case study page is one JS chunk (the content is resolved from `content/projects/*.md` at build time via the virtual module — it is bundled, not fetched at runtime)
- Framer Motion is imported only in components that use it (`ResumeDrawer`, `MobileNav`) — tree-shaking removes unused Framer APIs

**Font loading:**
- Syne variable font: self-hosted as `woff2`, preloaded with `<link rel="preload">` in `<head>`
- Geist Mono: self-hosted, preloaded
- No Google Fonts network request — zero render-blocking font CDN round-trip

**Canvas effects:**
- Star field and drift particles are vanilla canvas — zero library overhead
- Canvas is offscreen during SSR (not applicable here) and gracefully absent if `<canvas>` is unsupported

**Third-party budget:**
- Framer Motion: ~30KB gzipped (acceptable — used for two critical components)
- React Router: ~15KB gzipped
- Lucide React: tree-shaken to only imported icons (~1KB per icon)
- react-helmet-async: ~5KB gzipped
- Plausible Analytics: < 1KB gzipped (deferred, external — never blocks rendering)
- Total estimated gzipped JS budget: < 120KB

### Critical CSS

Vite inlines critical CSS for the above-the-fold hero automatically via its build process. The theme detection script is already inline. The LQIP data URI is embedded inline. The hero renders with zero network round-trips beyond the HTML document itself.

### Knowledge Core — API Performance

- Response is not streamed from the server; the full JSON response returns at once and the character-by-character render is client-side simulation
- This avoids CORS complications with streaming and keeps the API response contract simple
- If response times exceed 3s (P95), add a server-sent events (SSE) stream endpoint as a future optimization
- Responses are not cached client-side (each query may have different context); the rate limiter prevents abuse

---

## 15. Deployment Strategy

### Platform: Replit Deployments

The portfolio deploys as a static site artifact from the monorepo. The Vite build output (`dist/`) is served by Replit's static hosting infrastructure.

**Build command:** `pnpm --filter @workspace/portfolio run build`
**Output directory:** `artifacts/portfolio/dist`
**Serve:** All routes → `index.html` (SPA fallback configured in Replit artifact settings)

### Environment Variables

| Variable | Environment | Purpose |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Production | Knowledge Core API endpoint (the api-server artifact's deployed URL) |
| `OPENAI_API_KEY` | API server only (secret) | Embedding + LLM calls (used by `OpenAIProvider`) |
| `DATABASE_URL` | API server only (secret) | Supabase pgvector connection |
| `LLM_PROVIDER` | API server | Selects active LLM provider (`openai` default; `claude`, `gemini`, `ollama` available) |

No environment variables are ever exposed to the client bundle except `VITE_*` prefixed variables. The OpenAI key and database URL live only in the API server process.

### Development vs Production URL Handling

In development, the frontend proxies `/api/*` to `localhost:[API_PORT]` via Vite's `server.proxy`. In production, `VITE_API_BASE_URL` is set to the deployed API server URL. The `knowledge-core-api.ts` client reads this variable — no hardcoded URLs anywhere in component code.

### Pre-launch Checklist

- [ ] All `VITE_*` environment variables set in Replit's production secrets
- [ ] Knowledge base markdown files authored and embedded (embedding script run)
- [ ] `resume.pdf` and `resume-preview.jpg` present in `public/`
- [ ] Portrait image present at correct dimensions (640×854px minimum)
- [ ] All project content authored in `content/projects/*.md` (frontmatter + narrative complete)
- [ ] OG image generated (`public/og-image.png`)
- [ ] Adaptive favicons present (`public/favicon-dark.svg`, `public/favicon-light.svg`)
- [ ] Plausible Analytics domain configured (script tag pointing to correct domain in `index.html`)
- [ ] `analytics.ts` wired to all tracked interactions (verify in Plausible live dashboard before launch)
- [ ] Lighthouse audit run (target 95+ Performance, 100 Accessibility)
- [ ] Tested on mobile (iOS Safari, Chrome Android) — especially drawer and Knowledge Core
- [ ] `prefers-reduced-motion` verified
- [ ] Light mode verified at all breakpoints

---

## 16. Analytics Strategy

### Platform: Plausible Analytics

Plausible is a lightweight, privacy-first analytics tool that requires no cookie banner, collects no personal data, and adds < 1KB to the page. It is the only analytics dependency. No Google Analytics, no GTM.

**Script tag (added to `index.html` `<head>`, deferred):**
```html
<script defer
  data-domain="[your-domain]"
  src="https://plausible.io/js/script.tagged-events.js">
</script>
```

### Events Tracked

All tracked events use Plausible's `plausible()` custom event function. Events fire client-side and never block the user interaction that triggered them.

| Event | Trigger | Properties |
|-------|---------|------------|
| `pageview` | Automatic — every route change | path |
| `resume_drawer_open` | Drawer opens | — |
| `resume_download` | Download button clicked in drawer | — |
| `github_click` | External GitHub link clicked | project_slug |
| `demo_click` | External live demo link clicked | project_slug |
| `knowledge_core_query` | Query submitted | — (no query text — privacy) |
| `theme_change` | Theme toggled | theme: 'dark' \| 'light' |
| `contact_email_copy` | Email address copied | — |
| `contact_social_click` | Social link clicked | platform |

### Implementation Rule

Analytics calls live in exactly one file: `src/lib/analytics.ts`. No component ever calls `plausible()` directly — they call typed wrappers:

```typescript
// src/lib/analytics.ts
export const analytics = {
  resumeDrawerOpen: () => plausible('resume_drawer_open'),
  resumeDownload:   () => plausible('resume_download'),
  githubClick:      (slug: string) => plausible('github_click', { props: { project_slug: slug } }),
  demoClick:        (slug: string) => plausible('demo_click', { props: { project_slug: slug } }),
  knowledgeCoreQuery: () => plausible('knowledge_core_query'),
  themeChange:      (theme: string) => plausible('theme_change', { props: { theme } }),
  emailCopy:        () => plausible('contact_email_copy'),
  socialClick:      (platform: string) => plausible('contact_social_click', { props: { platform } }),
};
```

This pattern ensures analytics calls are searchable, typeable, and removable without grepping for raw `plausible(...)` calls across the entire codebase.

### Performance Impact

- Script is `defer` — never blocks rendering
- Script loads from `plausible.io` (external, but tiny and cached by Cloudflare globally)
- No analytics calls happen in render paths — all calls are event handlers
- If the script fails to load (adblockers), all `plausible()` calls are no-ops (Plausible's script sets a global guard)

---

## 17. Milestone-Based Implementation Roadmap

Each milestone is independently deployable, always leaves the portfolio in a presentable state, and never requires a rewrite of the previous milestone's code.

---

### Milestone 0 — Project Scaffold (½ day)
**Goal:** Running dev server with design tokens, typography, and routing wired. No visible content.

**Deliverables:**
- New `artifacts/portfolio` artifact registered in the monorepo
- Vite config with CSS Modules, path aliases, proxy to API server
- `styles/tokens.css` — all CSS custom properties from the Design System
- `styles/global.css` — reset, semantic token map, dark/light override block
- `styles/typography.css` — font-face declarations (self-hosted Syne + Geist Mono)
- `styles/animations.css` — all `@keyframes`, reduced-motion override
- Theme detection inline script in `index.html`
- `ThemeContext` + `useTheme` hook wired
- React Router with placeholder `HomePage` and `CaseStudyPage`
- `SkipLink` as first Tab stop (accessibility foundation from day one)
- Plausible `<script>` tag added to `index.html` (`defer`, correct `data-domain`)
- Pageview tracking wired via React Router's location listener in `App.tsx` so SPA route changes fire Plausible's virtual pageview

**Success criterion:** `localhost` shows a blank `#070911` page with the correct font, the correct tokens in DevTools, theme toggle switches `data-theme` on `<html>`, no console errors.

---

### Milestone 1 — Design System Primitives (1 day)
**Goal:** All Tier 1 components built, tested in isolation, and documented.

**Deliverables:**
- `Button` (primary, secondary, ghost variants)
- `StampLabel`
- `Tooltip` with 150ms/1.8s/300ms lifecycle
- `Tag` (technology tag)
- `Skeleton` with shimmer animation
- `ProgressBar` (global, connected to `ProgressContext`)
- `BackToTop` (appears after 400px scroll, `useScrollY` hook)
- `LazyImage` (LQIP blur-up, aspect-ratio preservation)
- `Container`, `Section`, `Grid`, `Hairline` layout components
- `useReducedMotion`, `useScrollY`, `useInView` hooks

**Success criterion:** Every primitive renders correctly in both themes, passes keyboard navigation, shows correct focus ring, and respects `prefers-reduced-motion`.

---

### Milestone 2 — Navigation System (½ day)
**Goal:** Fully functional nav — desktop and mobile, theme toggle, active section tracking.

**Deliverables:**
- `Nav` (fixed, blur backdrop, opacity on scroll)
- `MobileNav` (full-screen overlay, focus trap, staggered link entrance)
- `ThemeToggle` (icon crossfade with 15° rotation)
- `useActiveSection` (Intersection Observer with `rootMargin: '-30% 0px -60% 0px'`)
- `ScrollDepthIndicator` (1.5px track, section markers, mobile hidden)
- Smooth scroll utility with 80px offset

- `analytics.ts` wired: `theme_change` event fires on every theme toggle (passes `'dark'` or `'light'`)

**Success criterion:** Scrolling the page updates the active nav link. Mobile overlay opens/closes cleanly with focus trap. Theme toggles without FOUC. Scroll indicator reflects position.

---

### Milestone 3 — Hero Section (1 day)
**Goal:** The portfolio's most important 3 seconds is fully realized.

**Deliverables:**
- Two-column desktop layout (text cols 1–7, portrait cols 9–12)
- Mobile stacking order
- `StarField` canvas (120 static dots, 60 on mobile)
- `DriftParticles` canvas (8–12 particles, disabled on mobile)
- `RadarPulse` canvas (8s cycle, opacity 0→0.04→0, disabled on mobile)
- Radial glow via CSS gradient
- 7-element staggered entrance sequence with correct delays
- Headline parallax at 0.3× scroll speed (disabled on mobile and reduced-motion)
- Portrait parallax at 0.15× (disabled on mobile and reduced-motion)
- `LazyImage` with `eager` flag for portrait
- CTA buttons (primary: "View My Work" → scroll to #work, ghost: "Read About Me" → scroll to #signal)
- Adaptive favicon linked in `<head>`

**Success criterion:** Hero renders in < 1.5s LCP. Entrance sequence fires correctly in order. Parallax feels subtle, not distracting. Reduced-motion mode shows instant appearance without transforms. Portrait is correctly sized and positioned.

---

### Milestone 4 — Content Sections (2 days)
**Goal:** Signal, Approach, Stack, and Contact sections — all content-only, no async.

**Deliverables (each section):**
- `Signal` — 7-col text rail, standard entrance, hairline separator below
- `Approach` — 2-up principle block grid, Reading Depth microinteraction
- `Stack` — 4-up skill group grid, `PrecisionReveal` with 35ms stagger, "Current Focus" line
- `Contact` — centered layout, email copy-to-clipboard with `Tooltip`, ghost social links, hairline separator above

**Shared work:**
- Reading Depth hook (`useReadingDepth`) — paragraph opacity tracking on mouse move, touch disabled, reduced-motion disabled
- `Hairline` separator positioned correctly after §02 and §04

- `analytics.ts` wired: `contact_email_copy` fires on clipboard success; `contact_social_click` fires on each social link with `platform` prop

**Success criterion:** All four sections enter viewport cleanly. Precision Reveal fires once and does not re-animate. Email copy shows correct tooltip and returns focus correctly. Reading Depth opacity changes are felt, not seen.

---

### Milestone 5 — Knowledge Core Frontend (1 day)
**Goal:** Full "Ask My AI" UI with the correct state machine, built before the projects section so the AI experience is a structural part of the portfolio from the start — not a feature bolted on at the end. Uses a mock API response during this milestone.

**Deliverables:**
- `KnowledgeCore` section with stamp, heading **"Ask My AI"** (public facing), subtext
- `SearchInput` — Spotlight style, search icon pinned left, ghost `↵` label on focus, ice-signal border on focus
- `SuggestionChip` — 4 initial chips with `○` prefix and fill animation on select
- `useKnowledgeCore` hook — full state machine (idle → loading → streaming → done → error)
- `AmbientGlow` — single 1.5s pulse during loading state only
- Search icon arc rotation during loading
- Input border pulse during loading
- `ResponseBlock` — answer text streaming via character render, citation row, related links, follow-up chips, all with 200ms fade sequential reveal
- Disclaimer text below response area
- Progress bar fires on query start, completes on response
- Mock API client that returns canned responses (swapped for real API in Milestone 9)
- `knowledge-core-api.ts` stubbed to the exact production request/response shape so Milestone 9 is a drop-in swap
- `analytics.ts` wired: `knowledge_core_query` event fires on submit

**Success criterion:** Full interaction loop works end-to-end with mock data. Character-by-character render feels correct at 18ms. Citation row and follow-ups reveal in the correct sequence. Reduced-motion: text appears instantly, no character animation.

---

### Milestone 6 — Work Section + Signal Trace (1.5 days)
**Goal:** Project cards with Signal Trace signature interaction, fully functional on desktop and mobile.

**Deliverables:**
- `ProjectCard` with all anatomy (stamp, title, descriptor, description, tags, ghost CTA)
- 2-up desktop grid, 1-up mobile grid
- `TechPanel` — fixed right-side panel, slides in on first hover, content updates on card change (no re-animation)
- `SignalTrace` — SVG `<line>` that draws on hover, fades on card change, re-draws to new card
- Mobile accordion ("Show Stack ↓") replacing the tech panel
- Card hover state (lift, shadow, border brighten) — 320ms
- Correct routing from "Read Case Study →" to `/work/[project-slug]`
- `useScrollY`-based Signal Trace positioning (the line must track to the card's DOM position)
- `analytics.ts` wired: `github_click` and `demo_click` fire on external link clicks

**Success criterion:** Signal Trace draws to the correct position on hover, fades and re-draws on card change. Mobile accordion expands correctly. "Read Case Study →" routes to the correct case study page. Reduced-motion: sidebar opens immediately, no SVG animation.

---

### Milestone 7 — Case Study Pages (1.5 days)
**Goal:** Full case study template, breadcrumb navigation, gallery, links.

**Deliverables:**
- `CaseStudyPage` route consuming `virtual:projects` (the Vite virtual module that parses `content/projects/*.md` at build time)
- `CaseStudyHeader` — minimal nav, portfolio name → `/`, `← All Projects` → `/#work`
- `CaseStudyHero` — stamp row, title (56px), short description, metadata strip
- `CaseStudySection` — generic stamp + heading + body component
- `Gallery` — 2-up desktop, 1-up mobile, LQIP images with AVIF/WebP sources, no lightbox
- `CodeBlock` — Geist Mono, syntax-highlighted, copy-to-clipboard button
- `LinksSection` — Live Demo, GitHub, ← Back to Projects
- Scroll Depth Indicator mapped to case study sections
- Reading Depth active on body copy
- Back to Top active
- 404 → `/` redirect for unknown slugs
- SEO meta tags per case study via react-helmet-async

**Success criterion:** `/work/ai-soc-analyst` (or whichever slug is first authored) renders all 13 sections correctly. Breadcrumb navigation returns to `/#work` with correct scroll position. Gallery images load with blur-up. Copy-to-clipboard works on code blocks.

---

### Milestone 8 — Resume Drawer (½ day)
**Goal:** Resume Drawer with all four states, focus trap, and keyboard accessibility.

**Deliverables:**
- `ResumeDrawer` with Framer Motion `AnimatePresence` slide-in/out
- `DrawerBackdrop` with opacity transition and click-to-close
- Drawer state machine (Loading → Ready, Image Error path, Download Active path)
- Preview image skeleton during Loading state
- `FileX` icon + "Preview unavailable" for Image Error state
- Download Active: label swap + disabled button for 1.8s
- `useFocusTrap` hook wired to drawer
- Escape key closes drawer, returns focus to "Resume" nav trigger
- "Resume" nav link in desktop and mobile nav wired to `DrawerContext`
- Full-width (`100vw`) on mobile
- `analytics.ts` wired: `resume_drawer_open` on open, `resume_download` on download click

**Success criterion:** Drawer opens/closes with spring animation. All four states are reachable and visually correct. Tab key cycles only within the drawer while open. Escape closes and returns focus.

---

### Milestone 9 — Knowledge Core Backend (1.5 days)
**Goal:** Live RAG endpoint replacing the mock API client.

**Deliverables:**
- Express route `POST /api/knowledge-core/query` in `artifacts/api-server`
- Rate limiter middleware (10 req/min per IP)
- Input validation (max 500 chars, sanitized)
- `ILLMProvider` and `IEmbeddingProvider` interfaces + `OpenAIProvider` implementation (default)
- Stub implementations for Claude, Gemini, Ollama (all return `Error: not configured` until a key is present)
- `getLLMProvider()` factory wired to `LLM_PROVIDER` env var
- Supabase pgvector similarity search (top-5 chunks, cosine similarity)
- Scoped system prompt (server-side only — never exposed to client)
- Response serialized to `KnowledgeCoreResponse` contract
- `scripts/embed-knowledge-base.ts` — chunks `content/projects/*.md` and `artifacts/api-server/knowledge-base/*.md` via paragraph-boundary splitter (max 400 tokens, 50-token overlap), embeds via `IEmbeddingProvider`, upserts to Supabase with source metadata
- Frontend `knowledge-core-api.ts` updated to call real endpoint (the stub contract from M5 makes this a one-line change)
- `VITE_API_BASE_URL` wired for both development (Vite proxy) and production (env var)
- `LLM_PROVIDER` env var documented in deployment guide (default: `openai`)

**Success criterion:** A real question about a real project returns a grounded, cited answer. Out-of-scope question returns the scope-enforcement response. Rate limiter returns 429 on the 11th request within a minute. Swapping `LLM_PROVIDER=claude` (once a key is present) requires zero code changes.

---

### Milestone 10 — Premium Details + Polish (1 day)
**Goal:** Every "feels right" detail implemented. The portfolio is complete.

**Deliverables:**
- Anchor color flash on nav link click (`--color-ice-signal` hold 600ms)
- Nav monogram tooltip (full name + year on hover)
- Footer personal statement or coordinate
- Star field easter egg (one slightly brighter star — hardcoded `Math.random` seed)
- Technology tag tooltips (1-line description on hover)
- `prefers-reduced-motion` verified end-to-end
- Light mode QA at all breakpoints
- CLS verified (0 layout shift)
- Lighthouse audit (target: 95+ Performance, 100 Accessibility, 100 Best Practices)
- SEO meta tags complete (home + all case studies)
- JSON-LD structured data
- Sitemap generated
- OG image finalized
- All placeholder content replaced with real content

**Success criterion:** Lighthouse 95+ across all categories. Zero accessibility violations in axe DevTools. Both themes look correct on mobile and desktop. Every section renders correctly with real content.

---

### Milestone 11 — Deployment (½ day)
**Goal:** Portfolio is live at a production URL.

**Deliverables:**
- Production environment variables set in Replit secrets
- API server deployed as a separate artifact
- Portfolio static site deployed, SPA fallback configured
- Custom domain configured (if applicable)
- Knowledge base fully embedded (embedding script run against production Supabase)
- Post-deploy smoke test: home page, 2 case studies, Knowledge Core query, Resume drawer, theme toggle, mobile nav

**Success criterion:** Portfolio loads at production URL in < 2s on a 4G connection. Knowledge Core returns real answers. Resume drawer downloads the correct PDF. All case study routes resolve correctly.

---

## Summary Table

| Milestone | What Gets Built | Est. Time | Presentable? |
|-----------|----------------|-----------|--------------|
| 0 | Scaffold + tokens + routing | ½ day | No |
| 1 | All primitive components | 1 day | No |
| 2 | Navigation system | ½ day | Yes (bare bones) |
| 3 | Hero section | 1 day | Yes — the first impression |
| 4 | Signal, Approach, Stack, Contact | 2 days | Yes — full page sans projects |
| 5 | Knowledge Core frontend (mock) | 1 day | Yes — AI present from this point forward |
| 6 | Work section + Signal Trace | 1.5 days | Yes — full portfolio page |
| 7 | Case study pages | 1.5 days | Yes — complete minus live AI |
| 8 | Resume drawer | ½ day | Yes — complete minus live AI |
| 9 | Knowledge Core backend (live) | 1.5 days | Yes — fully functional |
| 10 | Polish + QA | 1 day | Yes — production-ready |
| 11 | Deployment | ½ day | **Live** |
| **Total** | | **~12 days** | |

---

*The portfolio is ready to build. The only blocking inputs are: your name, project content, portrait photograph, and resume PDF.*
