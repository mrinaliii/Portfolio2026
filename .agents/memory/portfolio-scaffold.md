---
name: Portfolio scaffold setup
description: Milestone 0 wiring decisions, token governance, build config quirks, and known limitations for the "Precision at Rest" portfolio.
---

## Key decisions

- Project lives at `artifacts/portfolio/` — standalone Vite 5 + React 18 + TypeScript SPA.
- Workflow command: `cd artifacts/portfolio && npm run dev` on port 5000 (webview).
- `tsconfig.app.json` requires `"composite": true` and `"skipLibCheck": true` for `tsc -b` to pass — Vite's `importGlob.d.ts` references `Worker` which fails without skipLibCheck in project-reference mode.
- CSS module types declared in `src/vite-env.d.ts`.

## Token governance (enforced)

Two enforcement tools live in `artifacts/portfolio/`:
- `npm run lint:tokens` → `scripts/check-tokens.sh` — greps all `*.module.css` for raw hex, rgba(), numeric z-index, named colors. Exit 1 on violations.
- `npm run lint:css` → stylelint with `stylelint-declaration-strict-value` — enforces that color/background/border-color/etc. properties use CSS custom properties, not raw values.
- `npm run check` — runs tsc + both lint steps together.

Stylelint exemptions: `src/styles/tokens.css` and `src/styles/global.css` (these ARE the raw-value sources).

## Correct token values (do not regress)

- `--nav-height: 56px` (DS Section 14) — was wrong at 64px in the initial scaffold
- Light mode `--color-text-muted: #628199` (DS accessibility section override) — NOT #7a98ad from the initial DS table
- `--color-text-muted` in light mode is for stamps/dates/decorative text ≥ 16px ONLY — not body copy

## Token coverage additions (post-Milestone-0 audit)

Motion: `--duration-theme`, `--duration-tooltip-*`, `--duration-precision-stagger`, `--duration-char-render`, `--duration-anchor-flash`, `--duration-nav-scroll`, `--duration-overlay`, `--duration-drawer-in/out`, `--ease-spring`, `--ease-smooth`, `--translate-entrance`, `--translate-nav-entrance`

Layout/Z: `--z-skip/nav/overlay/drawer`, `--drawer-width`, `--scroll-indicator-width`, `--backdrop-blur`, `--scrollbar-size/radius`

Color: `--color-nav-bg-scrolled`, `--color-overlay`, `--color-glow-ambient/peak`

Typography: `--text-hero-mobile/tablet`, `--text-mobile-nav`, `--text-button-ghost`, `--tracking-button-ghost`

Focus: `--focus-ring-width`, `--focus-ring-offset`, `--focus-ring-radius`

Spacing: `--space-3-5` (14px, KC input padding), `--space-7` (28px, KC response padding), `--input-padding-y`, `--input-icon-clearance`

Parallax: `--parallax-headline` (0.3), `--parallax-portrait` (0.15)

## Font setup

- Self-hosted woff2 files don't exist yet — font preload `<link>` tags are commented out in `index.html`.
- Google Fonts active as fallback until files land in `public/fonts/`.
- `@font-face` declarations in `typography.css` are correct and will activate once files are present.

## CSS exceptions (not violations)

- `.visually-hidden` 1px/-1px values — ARIA/SR pattern constants, must be exactly these values.
- Media query breakpoints (640px, 1024px) — CSS custom properties cannot be used in @media rules (CSS spec limitation). Use literals directly; values are documented in tokens.css header comment.
- `translateY(-120%)` in SkipLink — component behavior value referencing the element's own height; not a spacing token.
- `0.01ms` in `prefers-reduced-motion` block — accessibility safety-net constant, not a design token.
- Scale values in @keyframes (0.8, 1.4, 1.05, etc.) — keyframe-specific visual multipliers, not spacing tokens.

**Why:** These exceptions are documented in the source files with inline comments so future implementors know they're intentional, not oversights.
