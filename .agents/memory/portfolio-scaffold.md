---
name: Portfolio scaffold setup
description: Milestone 0 wiring decisions, build config quirks, and known limitations for the "Precision at Rest" portfolio.
---

## Key decisions

- Project lives at `artifacts/portfolio/` — a standalone Vite 5 + React 18 + TypeScript SPA.
- Uses npm (not pnpm) despite the TIP calling for pnpm — Replit's package manager installs into the root; the portfolio has its own `package.json` and `node_modules` inside `artifacts/portfolio/`.
- Workflow command: `cd artifacts/portfolio && npm run dev` on port 5000 (webview).
- `tsconfig.app.json` requires `"composite": true` and `"skipLibCheck": true` for `tsc -b` to pass — Vite's `importGlob.d.ts` references `Worker` which fails without skipLibCheck in project-reference mode.
- CSS module types declared in `src/vite-env.d.ts` (triple-slash ref + module declaration).

## Font setup

- Self-hosted woff2 files (`public/fonts/Syne-variable.woff2`, `public/fonts/GeistMono-Regular.woff2`) **do not exist yet** — font files must be added before removing the Google Fonts fallback link in `index.html`.
- Font preload `<link>` tags are commented out in `index.html` until the files are present (they cause 404 + OTS parsing errors otherwise).
- The `@font-face` declarations in `typography.css` are correct and will activate once files land in `public/fonts/`.

**Why:** Preloading missing font files causes OTS parsing errors in the browser console and misleads future debugging.

## Theme detection

- Inline `<script>` in `<head>` (before any stylesheet) reads `localStorage` → `prefers-color-scheme` → sets `data-theme` on `<html>`. No FOUC possible.
- `ThemeContext` reads the already-set `data-theme` attribute on mount (not localStorage directly) to stay in sync with the inline script.

## Design token coverage

All Design System tokens are in `src/styles/tokens.css` (dark mode defaults) with semantic override block in `global.css` under `[data-theme="light"]`. Components must only reference `var(--color-*)`, `var(--space-*)`, etc. — never raw hex values.
