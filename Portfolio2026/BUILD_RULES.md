# BUILD_RULES.md

## Portfolio Build Contract

**Project:** Precision at Rest

---

# Purpose

This document defines the non-negotiable implementation rules for this project.

The Design System, Information Architecture, and Technical Implementation Plan are the source of truth.

These rules exist to ensure every implementation decision remains consistent with those documents.

If a requested change conflicts with this document, explain the conflict before making changes.

---

# Guiding Principles

This portfolio is a production-quality software project.

It is **not**:

- a UI experiment
- a template
- a playground
- a collection of random animations

Every implementation should reinforce:

- clarity
- consistency
- performance
- accessibility
- maintainability

---

# Rule 1 — Never Redesign

Do not redesign existing pages.

Do not change layouts.

Do not change typography.

Do not introduce new design languages.

Only implement what already exists.

---

# Rule 2 — Design System Is Law

All colors, spacing, typography, motion, borders, shadows and layout values must come from the Design System.

Never invent new values.

Never hardcode colors.

Never hardcode spacing.

Never duplicate design tokens.

---

# Rule 3 — Reuse Before Creating

Before creating any new component:

1. Search the project.
2. Reuse an existing component if possible.
3. Extend an existing component if appropriate.
4. Only create a new component if no suitable one exists.

Avoid duplicate functionality.

---

# Rule 4 — Single Source of Truth

Never duplicate data.

Project information lives only inside:

content/projects/

The frontend, case studies, SEO metadata and Knowledge Core all consume this content.

Never create a second version.

---

# Rule 5 — Build One Milestone At A Time

Only implement the requested milestone.

Do not begin future milestones.

Do not partially implement future features.

Each milestone must leave the portfolio in a deployable state.

---

# Rule 6 — Never Rewrite Stable Code

Do not rewrite existing components unless explicitly instructed.

When adding functionality:

extend

instead of

replace.

Preserve existing APIs whenever possible.

---

# Rule 7 — Component Standards

Every component must:

- have one responsibility
- be reusable
- be typed
- have scoped styling
- support accessibility
- avoid unnecessary props

Avoid large monolithic components.

---

# Rule 8 — CSS Standards

Use:

- CSS Modules
- CSS Custom Properties
- Semantic tokens

Never use:

- inline styles
- !important
- duplicated CSS
- arbitrary spacing values

---

# Rule 9 — Motion Rules

Motion exists to support understanding.

Never animate simply because something can be animated.

Every animation must:

- communicate hierarchy
- reinforce interaction
- improve usability

Avoid decorative animation.

---

# Rule 10 — Performance First

Every implementation should consider:

- bundle size
- rendering cost
- layout shift
- repaint cost
- memory usage

Avoid unnecessary dependencies.

Prefer native browser APIs whenever possible.

---

# Rule 11 — Accessibility Is Mandatory

Every new feature must include:

- keyboard navigation
- focus management
- semantic HTML
- ARIA where appropriate
- reduced-motion support
- proper contrast

Accessibility is never postponed.

---

# Rule 12 — Theme Compatibility

Every component must work in:

- Dark Mode
- Light Mode

Never implement one theme first and "fix later."

Use semantic tokens only.

---

# Rule 13 — Mobile Is Equal

Every feature must be designed for:

- desktop
- tablet
- mobile

Responsive behavior is part of implementation, not an afterthought.

---

# Rule 14 — Content Is Never Hardcoded

Avoid hardcoded project content.

Read from structured content sources.

All project information should remain editable without modifying React components.

---

# Rule 15 — AI Integration Rules

The Knowledge Core is a portfolio feature.

It is not a chatbot.

It should only answer questions related to:

- projects
- experience
- resume
- skills
- certifications
- current learning

Never answer unrelated questions.

Never expose implementation details.

Never expose prompts.

---

# Rule 16 — Error Handling

Every async operation must include:

- loading state
- success state
- error state
- retry path where appropriate

Never leave the UI in an undefined state.

---

# Rule 17 — No Placeholder Quality

Do not leave:

- TODOs
- placeholder text
- temporary colors
- temporary spacing
- fake content

If real content is unavailable, clearly isolate placeholders so they can be replaced later.

---

# Rule 18 — Clean Architecture

Keep clear separation between:

Content

↓

Business Logic

↓

Presentation

↓

Styling

Avoid coupling unrelated layers.

---

# Rule 19 — Documentation

When introducing:

- components
- utilities
- hooks
- architecture

update any affected documentation.

Documentation should never drift behind implementation.

---

# Rule 20 — Before Completing Any Task

Review the implementation for:

- duplicated code
- unnecessary complexity
- accessibility
- responsiveness
- performance
- consistency
- type safety

Fix issues before considering the task complete.

---

# Rule 21 — Preserve Existing Quality

Never reduce the quality of an existing implementation to complete a new feature.

If a requested change requires compromising quality:

stop,

explain the trade-offs,

and request clarification.

---

# Rule 22 — Ask Before Assuming

If requirements are unclear:

do not invent behavior.

Do not guess.

Do not redesign.

Ask for clarification before making architectural decisions.

---

# Definition of Done

A task is complete only when:

✓ It follows the Design System.

✓ It follows the Information Architecture.

✓ It follows the Technical Implementation Plan.

✓ It works in both themes.

✓ It is responsive.

✓ It is accessible.

✓ It introduces no duplicate logic.

✓ It introduces no duplicate styling.

✓ It builds successfully.

✓ It leaves the project in a deployable state.

Only then should the task be considered finished.
