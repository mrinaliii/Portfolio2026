# Precision at Rest — Portfolio

**Owner:** Mrinali Charhate  
**Concept:** "Precision at Rest" — the feeling of a perfectly calibrated measurement instrument that is waiting. Quiet, confident, deliberate.

## Project Overview

A production-grade portfolio SPA for a CS student specializing in AI, ML, and Cybersecurity. Built with React 18 + TypeScript + Vite 5. The design communicates intellectual depth and precision — not a template with a name swapped in.

### Architecture

| Layer | Choice |
|-------|--------|
| Framework | React 18 + TypeScript |
| Bundler | Vite 5 |
| Styling | CSS Modules + CSS Custom Properties |
| Routing | React Router v6 |

### Key directories

- `artifacts/portfolio/` — The React SPA
- `artifacts/portfolio/src/styles/` — Design tokens, global CSS, typography, animations
- `artifacts/portfolio/src/components/` — Component library (Tier 1 primitives → Tier 2 composed → Tier 3 sections)
- `artifacts/portfolio/src/context/` — ThemeContext, DrawerContext, ProgressContext
- `artifacts/portfolio/src/hooks/` — Custom hooks
- `artifacts/portfolio/src/lib/` — Utilities and API clients
- `artifacts/portfolio/content/projects/` — Single source of truth for all project data (added in Milestone 7)

### Milestone Progress

- [x] **Milestone 0** — Project scaffold: tokens, typography, routing, theme detection, SkipLink
- [ ] Milestone 1 — Design System Primitives
- [ ] Milestone 2 — Navigation System
- [ ] Milestone 3 — Hero Section
- [ ] Milestone 4 — Content Sections
- [ ] Milestone 5 — Knowledge Core Frontend
- [ ] Milestone 6 — Work Section + Signal Trace
- [ ] Milestone 7 — Case Study Pages
- [ ] Milestone 8 — Resume Drawer
- [ ] Milestone 9 — Knowledge Core Backend
- [ ] Milestone 10 — Polish + Launch

## User Preferences

- Follow the BUILD_RULES.md contract exactly — Rule 5 (one milestone at a time) is critical
- Design System is law — never invent new tokens, never hardcode colors or spacing
- Accessibility is mandatory, never postponed (Rule 11)
- Both themes (dark + light) must work at all times (Rule 12)
- Mobile is equal to desktop (Rule 13)
- Content never hardcoded in components (Rule 14)
