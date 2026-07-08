# Portfolio Design System
## For a CS Student in AI, Machine Learning & Cybersecurity

---

> **Design Concept: "Precision at Rest"**
>
> The feeling of a measurement instrument that is perfectly calibrated and waiting. Not a hacker site. Not a corporate brochure. A quiet, confident space — like the desk of someone who builds things that think. Everything earns its place. The calm is earned, not empty.

---

## 1. Design Philosophy

This portfolio communicates one thing above everything else: **you build intelligent systems, and you do it with care.**

The design is not a personality on top of a resume — it *is* the personality. Every spacing decision, every typographic choice, every motion curve is a signal of how you work: deliberate, unhurried, precise.

**Core principles:**

1. **Restraint is confidence.** Every element that could be there but isn't is a deliberate choice. The portfolio doesn't explain itself; it demonstrates.

2. **Motion carries meaning.** Nothing moves without reason. Transitions are not decoration — they are the system revealing itself in sequence, like a calculation resolving.

3. **Information has weight.** Typography and spacing create hierarchy. The eye knows where to go without being told.

4. **Dark is not dramatic.** The dark canvas is quiet, not brooding. It makes your work the brightest thing on the screen.

5. **One signal.** A single accent color fires only when something important happens. Its rarity is its power.

6. **Technical interest is implied, never stated.** AI, ML, and cybersecurity are not iconography — they are embedded in how the interface *behaves*: precise, responsive, pattern-aware.

---

## 2. Visual Identity

**The metaphor:** An astronomer's control room — technically dense, carefully ordered, calmly lit. Instruments are beautiful because they are exactly what they need to be.

**The experience arc:** A visitor lands, pauses, scrolls slowly. They don't see a portfolio — they see a *person* who thinks carefully. They leave thinking: "this person is unusually precise for their age."

**Visual grammar:**
- Near-void dark backgrounds with subtle cool undertones (space, not dungeon)
- Type that is generous at large sizes and precise at small sizes
- White space that breathes — not empty, but *held*
- A single signal color that fires at the right moment
- Structure revealed through invisible grids, not visible boxes
- Motion that feels like physics, not theatrics
- Ambient effects that reinforce atmosphere — never compete with content

---

## 3. Brand Personality

| Dimension | Expression |
|-----------|------------|
| **Intelligence** | Expressed through precision: exact spacing, exact timing, exact hierarchy. Nothing is accidental. |
| **Calm** | Wide section breath, unhurried motion, no competing elements. The page is confident it will be read. |
| **Curiosity** | Small unexpected details reward the careful observer. The portfolio has layers. |
| **Sophistication** | Restraint over decoration. A fine material, not a loud one. |
| **Personal** | The voice in copy is specific — not "I build software" but the actual story. The design gives that story room. |

**What this portfolio is NOT:**
- Not a showcase of technical achievement for its own sake
- Not minimalist for minimalism's sake (minimalism with nothing to say is emptiness)
- Not dark-mode-by-default because it's fashionable
- Not a template with your name swapped in

---

## 4. Color System

### Philosophy
The palette is primarily achromatic — deep cool-blues and grays — with a single luminous accent. The accent color is `Ice Signal` — the precise, unambiguous blue of a radar return, a sonar ping, a signal confirmed. It is not decorative. It fires once per section, at the moment of most importance.

### Primary Colors

| Name | Hex | CSS Token | Role |
|------|-----|-----------|------|
| **Void** | `#070911` | `--color-void` | Page canvas. Near-black with a trace of blue-violet — space, not emptiness. |
| **Abyss** | `#0b0e18` | `--color-abyss` | Deepest recessed surface — footer, recessed bands, below-the-fold separators. |
| **Ice Signal** | `#5ba8d4` | `--color-ice-signal` | The one accent. Radar blue. Reserved for primary actions, hover states on names, and one moment per section. Never decorative. |
| **Ice Signal Dim** | `#3a6f94` | `--color-ice-signal-dim` | Muted version of the accent — used for subtle borders around interactive elements, secondary links on hover. |

### Surface Colors

| Name | Hex | CSS Token | Role |
|------|-----|-----------|------|
| **Slate Panel** | `#0f1522` | `--color-slate-panel` | Primary card and panel surface. |
| **Slate Raised** | `#19253a` | `--color-slate-raised` | Elevated card, modal surface, hover state on panels. |
| **Slate Edge** | `#1e2d42` | `--color-slate-edge` | Structural borders — card outlines, section dividers. |
| **Slate Trim** | `#2d3f58` | `--color-slate-trim` | Visible separator lines and hairlines. |

### Typography Colors

| Name | Hex | CSS Token | Role |
|------|-----|-----------|------|
| **Starlight** | `#dce8f5` | `--color-starlight` | Primary text. Cool, precise off-white — not warm cream, not stark white. |
| **Steel** | `#7f96b2` | `--color-steel` | Secondary labels, subtitles, and descriptive copy. |
| **Slate Mist** | `#4d6275` | `--color-slate-mist` | Muted helper text, timestamps, metadata. Recedes without disappearing. |

### Interaction States

| State | Treatment |
|-------|-----------|
| **Default** | `--color-starlight` text on `--color-void` canvas |
| **Hover (link)** | Text transitions from `--color-starlight` to `--color-ice-signal` over 200ms |
| **Focus** | `1px` border shifts to `--color-ice-signal`. No glow. No blur. Just the color shift. |
| **Active** | Slight brightness increase on `--color-ice-signal` elements |
| **Disabled** | `--color-slate-mist` text, `--color-slate-edge` borders |

### Background Treatments

| Level | Value | Purpose |
|-------|-------|---------|
| **Canvas** | `#070911` | Full page |
| **Recessed band** | `#0b0e18` | Footer, deeply inset sections |
| **Panel** | `#0f1522` | Cards, project tiles |
| **Raised** | `#19253a` | Hovered cards, modals, popovers |
| **Inverse** | `#dce8f5` on `#0f1522` | Never used as page-wide inversion — small inline badges only |
| **Tinted glass** | `rgba(15,21,34,0.75)` + `backdrop-filter: blur(12px)` | Sticky navigation only |

### Accent Usage Rules

- `--color-ice-signal` fires at most **once per section**
- Never use it as a background fill for large surfaces (> 200px wide)
- Permitted uses: primary CTA button fill, link hover color, active nav indicator, one small icon highlight per section, input focus border
- The accent's power comes from its scarcity. When it appears, the eye goes there immediately.

---

## 4a. Theme System

### Overview

The portfolio supports two intentional themes: **Dark Mode** (primary) and **Light Mode** (secondary). Dark mode is the designed identity — the one that defines the "Precision at Rest" concept. Light mode is not an afterthought or inversion; it is a fully considered companion, designed to feel like the same portfolio viewed in a different physical environment. The same instrument, in daylight.

**Dark Mode:** A near-void canvas, content emerging from depth. Astronomical. Signals in the dark.
**Light Mode:** A cool, blue-tinted parchment. Northern light. Drafting paper. The same precision, different conditions.

The Ice Signal accent (`#5ba8d4`) is consistent across both themes. Everything else adapts.

### Semantic Color Tokens

All components reference **semantic tokens** — not raw palette values. This ensures that a theme switch propagates automatically without touching component code. The raw palette tokens (`--color-void`, `--color-starlight`, etc.) remain as named constants; semantic tokens map to them.

| Semantic Token | Dark Mode Value | Light Mode Value | Role |
|---------------|-----------------|------------------|------|
| `--color-canvas` | `#070911` | `#f0f5fa` | Page background |
| `--color-recessed` | `#0b0e18` | `#e6edf6` | Footer, recessed bands |
| `--color-surface` | `#0f1522` | `#ffffff` | Card and panel surface |
| `--color-surface-raised` | `#19253a` | `#f4f8fc` | Elevated cards, modals |
| `--color-border` | `#1e2d42` | `#d0dde8` | Structural borders |
| `--color-border-strong` | `#2d3f58` | `#b8ccd8` | Separator hairlines, strong edges |
| `--color-text` | `#dce8f5` | `#0c1825` | Primary text |
| `--color-text-secondary` | `#7f96b2` | `#3d5a72` | Labels, subtitles, descriptions |
| `--color-text-muted` | `#4d6275` | `#7a98ad` | Metadata, timestamps, helpers |
| `--color-nav-bg` | `rgba(7,9,17,0.75)` | `rgba(240,245,250,0.85)` | Navigation backdrop |

### Light Mode Palette

The light palette is not an inversion of dark. It is derived independently, guided by the same constraints: cool not warm, structured not clinical, low contrast at the surface level and high contrast at the text level.

| Name | Hex | CSS Token | Role |
|------|-----|-----------|------|
| **Frost** | `#f0f5fa` | `--color-frost` | Page canvas — cool off-white, slight blue tint |
| **Frost Recessed** | `#e6edf6` | `--color-frost-recessed` | Footer and recessed section bands |
| **Pure** | `#ffffff` | `--color-pure` | Card surfaces — white panels on the pale canvas |
| **Pure Raised** | `#f4f8fc` | `--color-pure-raised` | Elevated cards, modal surfaces |
| **Mist Edge** | `#d0dde8` | `--color-mist-edge` | Border — structural card outlines |
| **Mist Trim** | `#b8ccd8` | `--color-mist-trim` | Separator lines and hairlines |
| **Ink** | `#0c1825` | `--color-ink` | Primary text — cool near-black |
| **Ink Secondary** | `#3d5a72` | `--color-ink-secondary` | Secondary text, labels |
| **Ink Muted** | `#628199` | `--color-ink-muted` | Metadata text — stamps, dates, decorative labels; 16px+ only |

### Light Mode Accent Usage

Ice Signal behaves differently on light surfaces and requires one adjustment:

- **`#5ba8d4` (Ice Signal):** Retained for button fills, icon highlights, borders, and decorative accents. Reads as a confident mid-blue on light backgrounds — still distinctive, still restrained.
- **For interactive text links (light mode only):** Use `#3a6f94` (Ice Signal Dim). On the Frost canvas, `#5ba8d4` achieves only ~1.9:1 contrast — below readable threshold. Ice Signal Dim achieves ~4.2:1 (WCAG AA). This is the only divergence in accent usage between themes.
- **Primary button in light mode:** Ice Signal fill (`#5ba8d4`) with `#0c1825` label text instead of `--color-void`. The visual result is identical; the contrast is correct.
- **The "once per section" scarcity rule applies equally in light mode.**

### Theme Preference Logic

1. **First visit:** Read `prefers-color-scheme`. Apply the matched theme. No flash of wrong theme.
2. **Explicit toggle:** User selects via the theme toggle (see Section 14). Store in `localStorage` as `"dark"` or `"light"`.
3. **Return visits:** Read `localStorage` first. `prefers-color-scheme` is ignored once the user has expressed a preference.
4. **Flash prevention:** Apply the theme synchronously in a `<script>` tag in `<head>`, before stylesheets render.

```html
<!-- In <head>, before any stylesheet link -->
<script>
  (function() {
    var stored = localStorage.getItem('theme');
    var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', stored || preferred);
  })();
</script>
```

### Theme Transition

When the user toggles the theme, all color-bearing properties transition simultaneously:

```css
html {
  transition:
    background-color 300ms ease,
    color 300ms ease,
    border-color 300ms ease,
    box-shadow 300ms ease;
}
```

Canvas-based ambient effects (star field, drift particles) do not cross-fade — they re-render in the new theme context. The ambient radial glow adjusts automatically as it uses a CSS `radial-gradient` referencing semantic tokens. The total visual transition takes approximately 300ms. No element on the page should flash, pop, or jump during a theme switch.

---

## 5. Typography

### Philosophy
Two typefaces, two voices. One editorial humanist sans for everything readable. One geometric display for the moments that need to stop time. A monospace is used sparingly — for technical labels only, never body copy.

### Font Pairings

#### Primary: **Syne**
*Available free via Google Fonts*

A geometric sans with unusual proportions at large sizes — wider, more confident than Inter, but not as aggressive as a display face. Excellent variable weight support. Used for all display, heading, and body text.

- **Weights used:** 400 (regular), 500 (medium), 700 (bold display)
- **Do not use:** 300 (too light at body sizes), 800 (too aggressive for this system)
- **Character:** Editorial, curious, slightly wide — feels like a magazine by someone who also reads research papers

```
font-family: 'Syne', ui-sans-serif, system-ui, sans-serif;
```

#### Accent Mono: **Geist Mono** (or IBM Plex Mono as fallback)
*Available free — designed by Vercel*

Used **only** for technical stamps, section labels in all-caps, and technical metadata (role tags, skill categories). Never body copy. Its mechanical precision creates contrast against Syne without feeling like a hacker cliché.

```
font-family: 'Geist Mono', 'IBM Plex Mono', ui-monospace, monospace;
```

### Type Scale

| Role | Size | Line Height | Letter Spacing | Weight | Font | Token |
|------|------|-------------|----------------|--------|------|-------|
| `stamp` | 11px | 1.2 | 0.18em | 500 | Geist Mono | `--text-stamp` |
| `caption` | 12px | 1.4 | 0.02em | 400 | Syne | `--text-caption` |
| `body-sm` | 14px | 1.6 | 0 | 400 | Syne | `--text-body-sm` |
| `body` | 16px | 1.65 | 0 | 400 | Syne | `--text-body` |
| `body-lg` | 18px | 1.6 | -0.01em | 400 | Syne | `--text-body-lg` |
| `subheading` | 20px | 1.4 | -0.02em | 500 | Syne | `--text-subheading` |
| `heading-sm` | 28px | 1.2 | -0.03em | 500 | Syne | `--text-heading-sm` |
| `heading` | 40px | 1.1 | -0.04em | 700 | Syne | `--text-heading` |
| `heading-lg` | 56px | 1.05 | -0.05em | 700 | Syne | `--text-heading-lg` |
| `display` | 72px | 1.0 | -0.06em | 700 | Syne | `--text-display` |
| `display-lg` | 88px | 0.95 | -0.07em | 700 | Syne | `--text-display-lg` |
| `hero` | 104px | 0.9 | -0.08em | 700 | Syne | `--text-hero` |

### Hierarchy Rules

1. Only one typographic level above `heading-lg` per page (the hero only)
2. Section headings are `heading` (40px) by default; sub-section headings are `heading-sm` (28px)
3. Body copy never goes below 14px
4. Stamp labels (Geist Mono, uppercase, tracked) are used for: section indicators, role/category tags, date stamps, technology labels. Always uppercase. Always `--text-stamp` size.
5. **Never stack two display-size elements without at least 40px between them**

### Letter Spacing Principle
Negative tracking scales proportionally with size. Text at 16px has zero tracking. Text at 40px has `-0.04em`. Text at 104px has `-0.08em`. Positive tracking is reserved exclusively for `stamp` style labels in Geist Mono.

---

## 6. Spacing System

**Base unit: 4px**

All spacing values are multiples of 4. This is non-negotiable — it keeps the grid coherent across all viewport sizes.

| Token | Value | Use |
|-------|-------|-----|
| `--space-1` | 4px | Icon gaps, tight inline spacing |
| `--space-2` | 8px | Tag padding, micro-components |
| `--space-3` | 12px | Compact element padding |
| `--space-4` | 16px | Default element padding, card internal gaps |
| `--space-5` | 20px | List item gaps |
| `--space-6` | 24px | Component inner padding |
| `--space-8` | 32px | Between related components |
| `--space-10` | 40px | Card padding (standard) |
| `--space-12` | 48px | Between subsections within a section |
| `--space-16` | 64px | Between major visual groups |
| `--space-20` | 80px | Section padding top/bottom (mobile) |
| `--space-24` | 96px | Section padding top/bottom (tablet) |
| `--space-32` | 128px | Section gap (desktop) |
| `--space-40` | 160px | Hero vertical breath |

**Section rhythm:** `128px` between major sections on desktop. Never less than `80px`. This is where the premium feel lives.

---

## 7. Grid System

### Page Max-Width
`1120px` — slightly narrower than the references (1200px), which forces more generous side margins and makes the content feel more deliberate.

### Columns

| Breakpoint | Columns | Gutter | Side Margin |
|------------|---------|--------|-------------|
| Mobile (`< 640px`) | 4 | 16px | 20px |
| Tablet (`640–1024px`) | 8 | 24px | 40px |
| Desktop (`1024–1280px`) | 12 | 32px | 48px |
| Wide (`> 1280px`) | 12 | 32px | auto (centered, max 1120px) |

### Layout Patterns

- **Hero:** Full bleed background, content in a 12-col container. Headline spans 10 columns max.
- **Project cards:** 2-up grid on desktop (6 cols each), 1-up on mobile
- **Feature rows:** Alternating left/right layout — text 5 cols, detail 5 cols, 2 cols gap
- **About:** 7 cols text + 4 cols visual, with 1 col gutter
- **Skills/Tools:** 3 or 4-up grid, stamp labels above each group

### Content Rail
The content rail is consistently `max-width: 1120px; margin: 0 auto; padding: 0 var(--side-margin)`. No exceptions — every section uses the same container. Visual variety comes from background colors and element arrangements, not inconsistent max-widths.

---

## 8. Border Radius

The system uses **two radii only**. Not three. Not five. Two.

| Element | Value | Token | Rationale |
|---------|-------|-------|-----------|
| Cards, panels, containers | `12px` | `--radius-base` | Grounded but not sharp. Feels structural, not bubbly. |
| Buttons, tags, badges, inputs | `10px` | `--radius-sm` | Softer than a rectangle, still precise. Clearly a control, clearly not a pill. |

**Rules:**
- Never use `border-radius: 9999px` (full pill) on this portfolio. It reads as consumer app, not precision instrument.
- Never use `border-radius: 0` except on full-bleed section dividers.
- Buttons use `--radius-sm` (10px). Cards use `--radius-base` (12px). These are the only two values in the system.
- The 2px difference between button (10px) and card (12px) is intentional: buttons feel like controls, cards feel like containers.

---

## 9. Shadows and Elevation

**Shadows are nearly absent from this system.** Elevation is expressed through color differential and border hairlines, not shadows. This keeps the interface feeling flat, precise, and undecorated.

| Level | Treatment | Token |
|-------|-----------|-------|
| **Flat** (cards, panels) | `border: 1px solid var(--color-slate-edge)` — no shadow | — |
| **Raised** (modals, dropdowns) | `border: 1px solid var(--color-slate-trim)` + `background: var(--color-slate-raised)` | — |
| **Nav** | `backdrop-filter: blur(12px)` + `border-bottom: 1px solid var(--color-slate-edge)` | — |
| **Focus ring** | `outline: 1.5px solid var(--color-ice-signal); outline-offset: 3px` | — |

**The one permitted shadow:**
```css
--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(5, 8, 18, 0.5);
```
Used only on project cards when hovered — not at rest. The shadow deepens on hover to create the sensation of the card lifting.

---

## 10. Motion Language

### Philosophy
Motion in this portfolio behaves like physics — it has mass, inertia, and intention. Nothing snaps. Nothing bounces. Animations are understatements, not statements. The portfolio uses the default system cursor; all character is expressed through thoughtful microinteractions, typography, and motion — not custom pointer graphics.

### Duration Scale

| Use | Duration | Easing |
|-----|----------|--------|
| Micro (color, opacity toggle) | `150ms` | `ease-out` |
| Standard (hover reveals, underlines) | `220ms` | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| Component (card lift, menu open) | `320ms` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Page section entrance | `500ms` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Hero entrance sequence | `700ms–1000ms` (staggered) | `cubic-bezier(0.16, 1, 0.3, 1)` |

### Scrolling & Entrance Animations

Every section enters the viewport with a subtle upward translate + fade:
- Transform: `translateY(24px) → translateY(0)`
- Opacity: `0 → 1`
- Duration: `500ms`
- Stagger children: `60ms` apart

**Implementation constraint:** Use Intersection Observer with a `rootMargin: '-80px'` threshold so sections begin animating just *before* they're fully in view — not at the moment they're visible.

### Hover Effects

| Element | Hover Behavior |
|---------|---------------|
| Project card | `translateY(-4px)` + shadow deepens + border brightens to `--color-slate-trim` — 320ms |
| Nav links | Underline slides in from left (`width: 0 → 100%`) over 220ms |
| Text links | Color transitions to `--color-ice-signal` over 200ms |
| CTA button | Background brightens by 10%, no scale, no movement |
| Technology tag | Background from `--color-slate-edge` to `--color-slate-raised` |
| Name/monogram in nav | First letter transitions to `--color-ice-signal` only |

### Page Transitions
The portfolio is a single-page app. Section transitions use a sequential entrance model (not page-to-page routing). If routing is implemented:
- Exit: `opacity: 1 → 0`, `200ms ease-in`
- Enter: `opacity: 0 → 1`, `300ms ease-out`, delayed `100ms` after exit completes

### Hero Entrance Sequence
The hero loads with a controlled reveal — not all at once. Sequence:
1. Nav fades in: `0ms` delay, `500ms`
2. Stamp label above headline fades + slides up: `200ms` delay, `500ms`
3. Headline line 1 slides up: `350ms` delay, `700ms`
4. Headline line 2 slides up: `450ms` delay, `700ms`
5. Subtext fades in: `600ms` delay, `500ms`
6. CTA button fades in: `750ms` delay, `400ms`
7. Portrait fades in: `900ms` delay, `500ms` — `opacity: 0 → 1` only, no translate. Arrives last, like stepping into frame after the scene is set.

This sequence takes approximately 1.4 seconds total. **`prefers-reduced-motion: reduce` is mandatory** — implement it so all durations collapse to `0ms` and transforms are removed. In reduced-motion mode, the portrait appears simultaneously with the CTA row (no stagger).

### Microinteractions

- **Button press:** `scale(0.97)` on `mousedown`, returns on `mouseup` — 80ms
- **Form input focus:** Border color transitions from `--color-slate-edge` to `--color-ice-signal` over 150ms. No glow.
- **Copy email/link:** Small tooltip fades in saying "Copied" with a check icon — 150ms in, 1.8s hold, 300ms fade out
- **Reading depth:** As the mouse moves within a body-copy paragraph, the paragraph's opacity increases from `0.85` to `1.0` — 150ms ease-out. Neighboring paragraphs dim slightly to `0.7`. This creates the sensation that the page is reading *with* you, not at you.
- **Knowledge Core processing:** While the system retrieves and generates a response, the background ambient glow pulses once (`rgba(91,168,212,0.04) → 0.08 → 0.04`, 1.5s). The search icon in the input rotates at 800ms linear. When the response arrives, text renders character-by-character at 18ms per character. The glow does not pulse on arrival — only during the wait.

---

## 10a. Signature Hero Experience

The hero is the most important 3 seconds of the portfolio. It must communicate calm intelligence before the visitor reads a single word.

### Atmosphere
The hero section sits on the `--color-void` canvas with three layered background elements:

1. **Static star field** — ~120 tiny dots (`1–2px` diameter, random positions) at varying opacities (`0.15–0.5`), rendered to a `<canvas>` element behind the content layer. They do not move. Their stillness is the point — like looking up on a clear night.

2. **Ambient radial glow** — `radial-gradient(ellipse 900px 600px at 25% 60%, rgba(91, 168, 212, 0.05), transparent)` — a single ice-signal bloom off-center. This is not decorative; it defines depth.

3. **Subtle drift layer** — 8–12 near-invisible particles (`rgba(91, 168, 212, 0.12)`, `2px` circle) drifting slowly at `0.15–0.3px` per frame, each on a unique path. Speed is imperceptible in isolation — only visible if you stop to watch. They do not interact with the mouse. They are not a particle system — they are dust in light.

**Implementation constraint:** All three layers are CSS/canvas — no Three.js in the hero unless a project specifically demands it. The goal is atmosphere, not spectacle.

### Typography
The hero headline uses `--text-hero` (104px on desktop, 52px on mobile). The headline is the visitor's first read — it must be a statement, not a label.

**Format:**
```
[STAMP LABEL — Geist Mono, 11px, --color-slate-mist]

[Your name]
[One precise line about what you build]
```

The name is weight 700. The descriptor line is weight 400 at 28px — lighter, wider, a breath after the name.

### The One Memorable Hero Interaction
On desktop: **slow vertical parallax on the name** — as the visitor scrolls the first 200px, the headline translates upward at 0.3× scroll speed while the background layers move at 0.1× speed. This creates a subtle sense of depth — two planes of glass separating the text from the atmosphere. The effect is almost imperceptible at normal reading speed, but felt.

This is not scroll-jacking. The native scroll speed is untouched. Only the transform changes.

### The Portrait

A professional portrait is integrated into the hero as an editorial element — not a profile photo, but a compositional anchor.

**Function:** The portrait confirms there is a real person behind the precision. On a portfolio this controlled and restrained, the photograph becomes the warmest thing on the page — a deliberate contrast that makes everything else feel more credible.

**Composition on desktop:**
- The hero text content (stamp label, name, descriptor, subtext, CTA) occupies **columns 1–7**
- The portrait occupies **columns 9–12** — right-aligned, vertically centered with the text block
- The portrait floats against the ambient hero layer with a `1px` border in `--color-border` and `12px` border radius. No background fill behind it. No glow. No frame.
- Aspect ratio: **3:4** (portrait orientation). Approximate rendered size: `320 × 427px` at standard desktop widths.
- The portrait and the headline text are at the same vertical midpoint. They balance each other — the type and the person.

**Composition on mobile:**
- Portrait moves **below** the descriptor line, above the CTA row
- Width: `64%` of the viewport, centered
- Aspect ratio remains 3:4
- Mobile stacking order: stamp label → name → descriptor → portrait → subtext → CTA
- The portrait lands between the statement of what you build and the explanation of why — a breath in the middle of the introduction

**Aesthetic requirements:**
- **No circular crop.** Rectangular, `12px` border radius. The system has established this as its container shape — the portrait uses the same radius.
- **No decorative frame, drop shadow, or gradient border.** The `1px` structural border is sufficient. The photo earns its presence through composition, not decoration.
- **The portrait is secondary to the typography.** If the photograph catches the eye before the headline is read, the layout needs adjustment. The name remains the dominant element; the portrait is counterpoint.
- **At rest:** The portrait has no hover effect. It does not zoom, tilt, or reveal anything on interaction. It is simply, deliberately present.

**Photography direction:**
- **Background:** Dark or near-dark neutral — cool slate, charcoal, deep navy. The background should fade naturally into the hero canvas rather than contrast against it sharply. Shoot against a solid dark wall or use a studio cyclorama with cool lighting.
- **Framing:** Head and upper torso, shoulders visible. Leave breathing room above the head. Slightly off-center gaze — looking 15–20° away from the camera — is preferred over direct eye contact. More contemplative, less LinkedIn.
- **Lighting:** Rembrandt or split lighting setup. One strong, directional light source from roughly 45° above and to one side. Avoid flat, equal-intensity soft-box lighting — it reads as stock photo and lacks the depth that editorial photographs have.
- **Color grade:** Cool grade applied in post. Reduce yellow and orange channels. Slightly boost blue-cyan. The goal: blues and dark tones in the photograph should rhyme with `#5ba8d4` and `#070911` respectively. The photo and the canvas should feel like they were planned together.
- **Resolution:** Minimum `640 × 854px` source file. The displayed size is `320 × 427px` — deliver `2×` for retina displays.
- **Clothing:** Neutral tones (dark, grey, slate, white, charcoal). No loud patterns. No graphic tees. No branded clothing. The clothing recedes so the face is the subject.

**Light mode behavior:**
The portrait renders identically in both themes — no photo switching required. A well-graded cool-toned photograph reads naturally against both the dark `#070911` canvas and the light `#f0f5fa` canvas. In light mode, the hero's radial glow becomes subtler (the ambient tokens adjust), and the portrait's structural border inherits `--color-border` from the light palette — a slightly warmer `#d0dde8` that integrates cleanly.

**Entrance animation:**
The portrait enters as the 7th element in the hero entrance sequence, after the CTA row:
- Delay: `900ms`
- Animation: `opacity: 0 → 1`, `500ms`, `cubic-bezier(0.16, 1, 0.3, 1)`
- No translate, no scale — a clean fade. It arrives last, like stepping into frame after the scene is already set.

---

## 10b. Signature Interactions

The portfolio contains exactly **two** signature interactions. They are used once each. They are earned, not decorative.

---

### Interaction 1: Signal Trace (Primary Signature)

**Location:** Work / Projects section  
**Trigger:** Hover on a project card  
**Behavior:** A thin `1px` line in `--color-ice-signal-dim` (opacity `0.4`) traces from the hovered project card to a shared sidebar or overlay on the right that shows the technologies used in that project — as if revealing a circuit between the project and its components.

When the cursor moves to a different card, the line fades (200ms) and re-draws to the new card (300ms, with a slight delay suggesting the system is "looking up" the new connection).

**Why it works:** It visualizes the concept of systems thinking — everything is connected. It feels like something you'd see in a network visualization tool. It is genuinely useful: the visitor doesn't need to read each card's tech stack in isolation; the trace makes the connection immediate. It is remembered because no other portfolio does it.

**Rules:**
- The trace is a single `<svg>` line — not a canvas animation, not WebGL
- The line must not flicker or animate continuously — it draws once per hover, then rests
- On touch devices, the trace appears when a card is tapped (and the tech sidebar opens)
- Implement with `prefers-reduced-motion: reduce` fallback (the sidebar opens immediately, no line)

---

### Interaction 2: Precision Reveal (Secondary Signature)

**Location:** Skills / Stack section  
**Trigger:** Section enters the viewport  
**Behavior:** Skills and technology tags appear one by one — not as a typing effect, not as a fade-in grid — but as discrete tokens appearing at precise 35ms intervals. The effect is like watching a system enumerate its own capabilities. Each tag pops in with a 0ms transition (instant appearance), which paradoxically makes it feel more mechanical and purposeful than a fade.

After all tags have appeared, the section rests completely. Nothing pulses, nothing loops.

**Why it works:** The instant appearance (no fade, no slide) at exactly 35ms per tag feels like a process completing — like watching `ls -la` output stream in a well-tuned terminal. But because the tags are beautifully styled (10px radius, precise typography, palette colors), it reads as sophisticated rather than hackery. A recruiter who has never seen a terminal in their life will still feel the rhythm as intentional.

**Rules:**
- Delay before sequence starts: `300ms` after the section enters the viewport
- Max total duration: `~1.8s` for ~50 tags. If there are more than 50 tags, group them and reveal groups at 60ms intervals instead
- Once revealed, tags do not re-animate on re-scroll
- `prefers-reduced-motion: reduce`: all tags appear simultaneously with a single `opacity: 0 → 1` fade

---

## 11. Component Philosophy

Every component in this system follows three rules:

1. **No decoration that doesn't carry information.** If a gradient, border, or color isn't telling the user something, it shouldn't exist.
2. **State is explicit.** Default, hover, active, focus, and disabled states are all designed — never assumed. Especially focus states (accessibility).
3. **Components are sized by content, not the reverse.** Width is determined by context (grid), height by content + defined padding. No fixed heights on text-containing elements.

Components are designed for **desktop-first reading** but engineered for mobile-first interaction — touch targets are always at minimum 44×44px.

---

## 12. Button System

### Principle
Buttons are rare. The portfolio has one primary action (contact/hire me), and sparse secondary actions (view project, view resume). When everything is a button, nothing is.

### Variants

#### Primary Button
The main CTA — appears once in the nav and once at the bottom of the page.

```
background: var(--color-ice-signal)
color: var(--color-void)
font: 14px Syne 500
padding: 10px 20px
border-radius: var(--radius-sm) [10px]
border: none
transition: background 200ms ease-out, transform 80ms ease-out
```
On hover: background brightens to `#73bfe3`. On `mousedown`: `scale(0.97)`.

#### Secondary Button / Outlined
Used for secondary actions — "View Resume", "View Code".

```
background: transparent
color: var(--color-starlight)
border: 1px solid var(--color-slate-trim)
font: 14px Syne 400
padding: 9px 18px
border-radius: var(--radius-sm) [10px]
transition: border-color 200ms, color 200ms
```
On hover: border transitions to `--color-ice-signal-dim`, text stays `--color-starlight`.

#### Ghost / Text Button
For inline actions inside cards and the Knowledge Core — "Read Case Study →", "→ View AI SOC Analyst", follow-up chips.

```
background: transparent
color: var(--color-steel)
border: none
font: 13px Syne 500, uppercase, 0.08em tracking
padding: 4px 0
underline: animated (width: 0 → 100% on hover, 220ms)
```
On hover: color transitions to `--color-starlight`.

### Rules
- Never more than two buttons in one visual group (primary + secondary or secondary + ghost)
- Buttons never have icons unless the icon adds essential information (not decoration)
- All button text is sentence case, never ALL CAPS (that belongs to stamp labels only)

---

## 13. Card System

Cards are the primary container for project work.

### Project Card

The most important component. A project card must communicate: what it is, what it does, and why it matters — all before the visitor clicks.

```
background: var(--color-slate-panel)
border: 1px solid var(--color-slate-edge)
border-radius: var(--radius-base) [12px]
padding: 32px
```

**Anatomy (top to bottom):**
1. **Stamp row:** Geist Mono 11px uppercase — `[YEAR]  ·  [CATEGORY]` in `--color-slate-mist`
2. **Project title:** Syne 28px weight 700, `--color-starlight`, `-0.03em` tracking
3. **One-line descriptor:** Syne 15px weight 400, `--color-steel`
4. **Description:** Syne 14px weight 400, `--color-steel`, max 3 lines
5. **Spacer**
6. **Technology tags:** Small 10px-radius tags, `--color-slate-raised` fill, `--color-steel` text, Geist Mono 11px uppercase
7. **"Read Case Study →" ghost button** — navigates to `/work/[project-slug]`

**Hover state:**
- `translateY(-4px)` over 320ms
- Border changes from `--color-slate-edge` to `--color-slate-trim`
- Shadow appears: `--shadow-card`
- Signal Trace line fires (see Section 10b)

### Minimal Card / Info Block
For smaller containers — skills, tools, or contextual info.

```
background: transparent
border: 1px solid var(--color-slate-edge)
border-radius: var(--radius-base) [12px]
padding: 24px
```

No shadow. No hover state unless interactive.

---

## 14. Navigation System

### Desktop Navigation

A sticky top bar — present always, but recedes visually to not compete with content.

```
position: fixed; top: 0; width: 100%;
background: var(--color-nav-bg)          /* rgba(7,9,17,0.75) dark / rgba(240,245,250,0.85) light */
backdrop-filter: blur(12px)
border-bottom: 1px solid var(--color-border)
height: 56px
padding: 0 var(--side-margin)
z-index: 100
```

**Layout:**
- Left: Full name or monogram in Syne 16px weight 700, `--color-text`. On hover, the first letter transitions to `--color-ice-signal` only.
- Center: Navigation links — Syne 14px weight 400, `--color-text-secondary`. On hover, underline slides in from left and color shifts to `--color-text`.
- Right: Theme toggle + Primary CTA button (see Theme Toggle subsection below)

**Active section indicator:** The current section's nav link has a 1.5px underline in `--color-ice-signal`. This updates on scroll via Intersection Observer. It does not animate between links — it simply appears/disappears at the precise moment of section change.

### Mobile Navigation

Below 768px: hamburger icon (three 14px horizontal lines, `--color-text`, 2px height, 6px apart). On tap, a full-screen overlay slides in from top:

```
background: var(--color-canvas)
padding: 80px 24px
```

Nav links stack vertically, left-aligned, Syne 32px weight 700. Each link enters staggered (80ms apart) from the top. Overlay closes by tapping the X or tapping the background.

### Scroll Behavior
On scroll down past 120px, the nav background opacity increases from `0.75` to `0.92` over 200ms. This is the only dynamic behavior — the nav does not hide on scroll.

### Theme Toggle

The theme toggle lives in the navigation bar between the navigation links and the primary CTA button. It is an icon-only control — no visible text label.

**Visual design:**
- **Icon:** `Moon` (Lucide, outline) when currently in dark mode (offers light mode). `Sun` (Lucide, outline) when currently in light mode (offers dark mode). 18px, 1.5px stroke.
- **Click target:** `40 × 40px`, visually rendered as a `32px` circle (`border-radius: 50%`)
- **At rest:** No background fill. Icon color is `--color-text-secondary`. Sits quietly between nav links and CTA.
- **On hover:** Background fills with `--color-surface-raised`. Icon color shifts to `--color-text`. Transition: `150ms ease`.

**Placement in the nav bar:**
```
[NAME / MONOGRAM]   [NAV LINKS — center]   [THEME TOGGLE · 16px gap · PRIMARY CTA]
```
The toggle sits `16px` to the left of the primary CTA button. It is not grouped with the nav links — it belongs to the utility side of the nav.

**Toggle animation — the switch moment:**
1. The outgoing icon fades to `opacity: 0` over `120ms`
2. The incoming icon fades in to `opacity: 1` over `180ms`, arriving with a `15deg` rotation from its rest position — suggesting recalibration, not theatrics
3. All semantic color tokens on the page transition simultaneously at `300ms ease`

Total perceived switch time: `300ms`. The icon and the page change feel coordinated, not sequential.

**Accessibility:**
- `aria-label` is dynamic and always describes the action, not the state: `"Switch to light mode"` when in dark mode, `"Switch to dark mode"` when in light mode
- Reachable by Tab, activatable by Space or Enter
- `role="button"` if not a native `<button>` element

**Mobile placement:**
Below `768px`, the toggle moves into the hamburger overlay — positioned in the top-right corner of the full-screen menu, always visible. On mobile it gains a small text label (`LIGHT` / `DARK` in Geist Mono 11px uppercase, `--color-text-muted`) to the right of the icon, since the overlay has more space and the context is less obvious.

---

## 15. Iconography

### Philosophy
Icons are structural, not decorative. They appear in four contexts only: navigation (hamburger), CTAs (arrow on links), technology tags (optional), and contact links (GitHub, LinkedIn, email).

### Icon Style
- **Style:** Line icons only. 1.5px stroke. No fill.
- **Library:** Lucide Icons (free, consistent, well-maintained) or Heroicons (outline set)
- **Size:** 16px in-line, 20px standalone
- **Color:** Always inherits from parent text color — never a separate color
- **Hover:** Icon color follows text color transition — no independent animation

### Icon Rules
- Never place an icon without a text label (exceptions: social links in footer, which are widely recognized)
- Never use filled icons and outline icons in the same section

---

## 16. Illustration and Imagery Direction

### Photography

This portfolio does not use stock photography. The only photograph on the site is your professional portrait, which appears in the Hero section (see Section 10a for placement and composition rules).

**Portrait brief (summary):**
- **Background:** Dark or near-dark neutral — cool slate, charcoal, deep navy — so the photo fades into the hero canvas
- **Framing:** Head and upper torso. Slightly off-center gaze preferred (15–20° away from lens). Not a direct LinkedIn pose.
- **Lighting:** Rembrandt or split lighting — one directional source, one side. Avoid flat, equal soft-box setups.
- **Color grade:** Cool grade — reduce yellow/orange, boost blue-cyan. The photo's dark tones should rhyme with `#070911`; any visible blues should rhyme with `#5ba8d4`.
- **Resolution:** Minimum `640 × 854px` source; deliver `2×` for the `320 × 427px` rendered size.
- **Clothing:** Neutral tones only. No patterns. No branding. The clothing recedes so the face leads.

**What a good portrait does for this portfolio:**
On a site this restrained and precise, a photograph is the warmest element on the page. Its presence confirms a real person built this — not a template. The cool grade connects it to the palette; the editorial framing connects it to the aesthetic. A bad portrait (circular crop, plain white background, forced smile) would break the design faster than any other single decision.

### Project Imagery
Project screenshots or mockups are the primary visual content. Rules:
- Place on a `--color-slate-panel` background with subtle device framing (simple 12px-radius rectangle, no phone/laptop chrome unless essential)
- Use a consistent aspect ratio (16:9 or 4:3) for all project visuals
- Do not use decorative blobs, gradient orbs, or abstract shapes behind screenshots
- If a project has no visual output (e.g., a research paper or CLI tool), use a clean dark code block as the visual — actual relevant code, monospaced, syntax-highlighted to palette colors

### No-Illustration Rule
This system has no illustrations, no iconographic brand mascots, no abstract vector art in content sections. The work speaks for itself.

### WebGL and 3D — Permitted Uses
WebGL, Three.js, React Three Fiber, and GLSL shaders are permitted **only when they improve storytelling or showcase actual project work**. Permitted use cases:
- A project that *is* a 3D visualization gets to show that visualization embedded in its card or detail view
- The Knowledge Core section may use a subtle shader-based ambient effect if it reinforces the "intelligent system" feeling — one small canvas, restrained
- An interactive demo of an actual project (e.g., a neural network visualizer you built) is a showcase, not decoration

**Not permitted:**
- 3D objects spinning behind your name in the hero
- Floating geometric shapes as section separators
- WebGL used because it's impressive, not because it's useful

### Diagrams (if needed)
If a project requires a diagram (architecture, data flow), apply the design system to it:
- Background: `--color-slate-panel`
- Lines: `--color-slate-trim`
- Text: `--color-steel` for labels, `--color-starlight` for key nodes
- Accent node: `--color-ice-signal` for the one most important element in the diagram

---

## 17. Background Treatments

### Permitted Background Treatments

| Name | Treatment | Usage |
|------|-----------|-------|
| **Void canvas** | Solid `#070911` | Most sections |
| **Recessed band** | Solid `#0b0e18` | Footer, alternating for visual rhythm |
| **Subtle grid** | `1px` lines at `32px` intervals, `rgba(255,255,255,0.03)` | Hero only — creates depth without distraction |
| **Noise texture** | SVG noise filter at `3% opacity` | Applied globally over the canvas — film grain that reads as premium |
| **Radial glow** | `radial-gradient(ellipse 900px 600px at 25% 60%, rgba(91, 168, 212, 0.05), transparent)` | Hero only — one ice-signal ambient bloom, not a bloom cluster |
| **Star field** | 120 static canvas dots, `1–2px`, `0.15–0.5` opacity | Hero only — static, not animated |
| **Drift particles** | 8–12 slow-moving particles, `rgba(91, 168, 212, 0.12)`, `2px` circle | Hero only — speed imperceptible at normal reading; no mouse interaction |

### Ambient Effects — Rules of Engagement

Ambient effects are permitted when they reinforce atmosphere and remain invisible under normal reading conditions. The test: if a visitor is reading your headline and the ambient effect catches their eye, it has failed. Ambient is felt, not seen.

**Approved ambient effects (hero only):**
- Static star fields — no blinking, no pulsing, no movement
- Ultra-slow drifting micro-particles — max speed `0.3px/frame`, no trail, no glow
- Subtle radial glows via CSS gradient — single color only (`--color-ice-signal` family)
- Canvas-based neural network nodes — only if very dim (opacity < 0.08) and very slow (deliberate, not energetic)
- Radar-ring ambient pulse — a single expanding ring from a fixed off-center point, opacity `0 → 0.04 → 0`, cycle every 8s. Nearly invisible. It suggests monitoring, awareness, attention — all aligned with the portfolio's identity.

**Ambient effects are forbidden outside the hero section.** Scrolling past the hero means entering the work — atmosphere gives way to content.

### Forbidden Background Treatments
- Animated particle systems with mouse interaction or high speed
- Matrix/binary rain
- Gradient meshes with multiple colors
- Blurred duplicate images as backgrounds
- Solid `--color-ice-signal` backgrounds on large surfaces
- Video backgrounds
- Diagonal stripes or dot grids visible at normal reading distance
- Any ambient effect in sections below the hero

---

## 18. Accessibility Guidelines

### Color Contrast
All text must meet WCAG 2.1 AA at minimum, AAA where feasible:
- `--color-starlight` on `--color-void`: contrast ratio ≈ 15:1 ✓ (exceeds AAA)
- `--color-steel` on `--color-void`: contrast ratio ≈ 4.8:1 ✓ (AA)
- `--color-slate-mist` on `--color-void`: contrast ratio ≈ 3.2:1 — use **only** for non-critical metadata (timestamps, category labels)
- `--color-ice-signal` on `--color-void`: contrast ratio ≈ 5.2:1 ✓ (AA) — permissible for interactive text

**Caution:** `--color-slate-mist` does NOT meet AA. It must never carry primary information — only supplementary metadata. If a label is important, it must be in `--color-steel` or lighter.

### Light Mode Contrast Ratios

In light mode, all components reference semantic tokens mapping to the light palette. Verified ratios:

| Token (Light) | Hex | Against canvas `#f0f5fa` | Against surface `#ffffff` | Status |
|---------------|-----|--------------------------|---------------------------|--------|
| `--color-text` | `#0c1825` | ~16:1 | ~18:1 | ✓ AAA |
| `--color-text-secondary` | `#3d5a72` | ~6.6:1 | ~7.2:1 | ✓ AA+ (AAA on white) |
| `--color-text-muted` | `#628199` | ~3.7:1 | ~4.0:1 | ⚠ Stamps/dates at 16px+ only |
| `--color-ice-signal-dim` (text links) | `#3a6f94` | ~4.9:1 | ~5.4:1 | ✓ AA |
| `--color-ice-signal` (decorative only) | `#5ba8d4` | ~2.4:1 | ~2.6:1 | ✗ Non-text use only |

**Light mode rules:**
- `--color-text-muted` is `#628199` in light mode (updated from the initial draft palette to meet large-text AA at 3:1+). Use only for stamps, dates, category labels, and other decorative text at 16px+. Not for body copy or critical labels — use `--color-text-secondary` instead.
- `--color-ice-signal` (`#5ba8d4`) must not be used for text in light mode — use `--color-ice-signal-dim` (`#3a6f94`) for all interactive text links and active nav indicators.
- The Ice Signal primary button in light mode uses `#0c1825` label text, not white. White-on-Ice-Signal achieves ~2.9:1 — it fails AA.

### Focus Indicators
All interactive elements (links, buttons, inputs, cards with click behavior) must have:
```css
outline: 1.5px solid var(--color-ice-signal);
outline-offset: 3px;
```
Never remove `:focus-visible` outlines. The `outline: none` rule is forbidden in this codebase without a custom replacement immediately following it.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
When `prefers-reduced-motion: reduce` is detected:
- All entrance animations collapse to instant opacity changes
- Hero ambient effects (star field, particles, radar pulse) pause completely
- Signal Trace and Precision Reveal interactions use their simplified fallbacks

### Semantic HTML
- The portfolio uses one `<h1>` per page (your name in the hero)
- Section headings are `<h2>` — never skip heading levels
- Project titles inside cards are `<h3>`
- Navigation uses `<nav aria-label="Main navigation">`
- Current section link has `aria-current="true"`
- The Knowledge Core section uses `role="region"` and `aria-label="Knowledge Core — Ask about my work"`

### Keyboard Navigation
- Tab order follows visual reading order
- The mobile nav overlay traps focus while open (focus lock)
- The Knowledge Core input is reachable by Tab and submittable by Enter
- All ambient canvas elements have `aria-hidden="true"` — they carry no information

---

## 19. Responsive Design Principles

### Breakpoints

| Name | Range | Description |
|------|-------|-------------|
| `xs` | `< 480px` | Small phones |
| `sm` | `480–639px` | Large phones |
| `md` | `640–1023px` | Tablets |
| `lg` | `1024–1279px` | Small desktop |
| `xl` | `>= 1280px` | Standard desktop |

### Responsive Rules

**Typography scales down on mobile:**
- Hero headline: `104px → 48px` (mobile), `72px` (tablet)
- Section headings: `40px → 28px` (mobile)
- All body text stays at 16px (never scale down body copy)

**Layout collapses predictably:**
- 2-up project grid → 1-up on mobile
- Side-by-side "about" layout → stacked on mobile (visual on top, text below)
- 4-up skill grid → 2-up on tablet, 1-up on mobile

**Spacing contracts gracefully:**
- `--space-32` (128px) section gap → `--space-20` (80px) on mobile
- `--space-10` (40px) card padding → `--space-6` (24px) on mobile

**Ambient effects on mobile:**
- Star field: retained but reduced to ~60 dots
- Drift particles: disabled on mobile (performance)
- Radar pulse: disabled on mobile
- Radial glow: retained (CSS only, no performance cost)

### Touch Targets
All interactive elements have a minimum touch target of 44×44px, regardless of visual size. For small ghost buttons, use `padding` to extend the target without changing the visual footprint.

---

## 20. Interaction Principles

### The 3 Questions Every Interaction Must Answer

1. **Where am I?** — The active nav link, the scroll position indicator (optional thin line at page right edge showing progress), and section headings always answer this.
2. **What can I do?** — Hover states reveal action clearly. Nothing is interactive without a visible state change.
3. **What just happened?** — Every action has a response. Copy button shows "Copied." Form submit shows a success state. Animation completes before the next one begins.

### Loading States
If any data loads asynchronously (form submission, Knowledge Core AI response):
- Use a single `--color-ice-signal` progress bar at the top of the viewport (inspired by NProgress)
- For the Knowledge Core: the input border pulses and the search icon rotates while the AI is thinking — not a spinner, not a skeleton screen
- No spinners. No skeleton screens with fake content. **Exception:** shape-matched skeleton shimmer blocks are permitted for structural loading states (e.g. the Resume Drawer preview image, a project list before data arrives). These are outlines that match real content geometry — not placeholder copy or fake text.

### Scroll Experience

- **Section awareness:** Track the active section with Intersection Observer. Update the nav link indicator silently.
- **Smooth scrolling:** `scroll-behavior: smooth` on the HTML element. Anchor links scroll smoothly to their targets with 80px offset for the fixed nav.
- **No scroll jacking:** The scroll wheel scrolls at the native speed. The portfolio does not intercept scroll events for section-locking effects.
- **Parallax:** Permitted only in the hero — specifically the headline at 0.3× scroll speed (see Section 10a). No parallax below the hero.

### The Curiosity Layer
Small details reward attentive visitors:
- Hovering the monogram in the nav shows a subtle tooltip with your full name and current year
- The footer contains something unexpected — not just "© 2025" but a small personal statement or coordinate, in Geist Mono `--text-stamp` size
- Technology tags in project cards show a 1-line description on hover (tooltip, not modal)
- The star field in the hero has one star slightly brighter than the others. It has no function. It is just there.

These details are never announced. They are found.

---

## 21. Design Rules — Every Page Must Follow These

1. **One accent activation per section.** `--color-ice-signal` fires once, on the most important element in each section. Never twice.

2. **The grid is invisible.** Content is aligned to the 12-column grid, but the grid itself is never drawn, hinted, or decorated.

3. **Section breath is non-negotiable.** Sections are separated by at least `128px` on desktop, `80px` on mobile. Reducing it to save space destroys the system.

4. **Stamp labels always precede section headings.** The pattern is:
   ```
   SECTION LABEL  [Geist Mono, 11px, uppercase, --color-slate-mist]
   Section Heading [Syne, 40px, weight 700, --color-starlight]
   ```
   This creates a consistent rhythm across every section.

5. **Copy is specific.** No "I am a passionate developer who loves solving problems." Write what you actually built, what it does, and why it matters. The design supports specificity — use it.

6. **Every section has a clear exit point.** A visitor must know what to do next after each section.

7. **Only two typefaces appear anywhere on the site** — Syne and Geist Mono. No exceptions.

8. **Buttons are always labeled with verbs.** "View Project" not "Project." "Read More" not "More." "Hire Me" not "Contact."

9. **The portfolio is complete before launch.** No "coming soon" project placeholders. Incomplete work is not shown.

10. **Dark is the primary mode; light is the companion.** Both themes are fully designed and intentional. Dark mode is the visual identity — the designed default specified throughout this document. Light mode is an equally considered companion: the same portfolio viewed in different conditions. Neither is an afterthought; neither is an inversion of the other. The theme toggle (see Section 14) remembers the user's preference. (See Section 4a for the complete theme system specification.)

11. **Ambient effects reinforce, never distract.** If an ambient effect is noticed before the headline is read, it has failed. The test is always: "does removing this make the section feel emptier?" If no, remove it.

12. **WebGL serves the work.** Use Three.js, shaders, and canvas only when they showcase actual projects or meaningfully reinforce the portfolio's identity. Never for spectacle.

---

## 22. Things the Design Must Never Do

1. **Never use green in any form.** Especially `#00ff00`, `#39d353` (GitHub contribution), or any terminal green.

2. **Never show floating code.** Code snippets that drift or scroll decoratively are a cliché. Code appears only as project content.

3. **Never use a binary, hex, or matrix pattern as decoration.** This includes animated backgrounds, watermarks, and section divider text.

4. **Never use a full-pill button.** Buttons use `10px` radius. The pill shape reads as consumer app, not precision instrument.

5. **Never use more than one accent color.** `--color-ice-signal` is the only chromatic signal.

6. **Never introduce box-shadows at rest.** The only shadow is the card hover shadow — `--shadow-card` — and only on hover.

7. **Never use animations to fill empty space.** If a section is thin and animation is added to pad it, add content instead or remove the section.

8. **Never use 3D or WebGL simply for decoration.** A spinning object behind your name, floating geometry between sections, or shader effects that don't connect to your work are all forbidden. WebGL is permitted when it showcases actual project work or meaningfully reinforces the "intelligent systems" identity (see Section 16).

9. **Never center body copy.** Left-aligned text only in this system. Centered text is reserved for the hero headline only.

10. **Never use `font-weight: 300`.** The system uses 400 and 700 on Syne, 500 for emphasis. Light weight reads as fragile at these sizes.

11. **Never use `transition: all`.** Specify exactly what transitions — `color`, `border-color`, `background-color`, `transform`, `opacity`.

12. **Never skip the stamp label.** Every major section begins with a Geist Mono stamp label.

13. **Never let the portfolio look generic at 3 seconds.** The hero's layered atmosphere (star field, ambient glow, radar pulse), the precise typography, and the stamp label rhythm should all be immediately apparent. If the above-the-fold looks like a Tailwind starter template, something has gone wrong.

14. **Never build a fake terminal, fake loading screen, or fake OS window** as a decorative element. These are the most tired tropes in developer portfolios. Your work is real. Show it as it is.

---

## 23. Knowledge Core — AI Assistant Section

### What It Is

The Knowledge Core is a portfolio section, not a chatbot widget. It is discovered by scrolling — placed near the end of the page, after the visitor has spent time with your projects and understood who you are. By then, the AI is not a gimmick — it is a demonstration of capability. *Of course this person built their own intelligent search interface for their portfolio.*

The experience model is **Spotlight Search**, not chat. A visitor types a question, receives a precise answer drawn from the knowledge base, sees which source it came from, and can navigate directly to cited projects. It feels like searching a well-organized personal knowledge base — not querying a general assistant.

### What It Is Not

- Not a floating bubble in the corner
- Not a replica of ChatGPT with your name on it
- Not a support widget ("How can I help you today?")
- Not a conversation UI — no chat bubbles, no message history
- Not a fake demo with hardcoded responses
- Not a general-purpose assistant — it answers only about this person

### Design

The section follows the standard stamp + heading pattern:

```
STAMP LABEL:   KNOWLEDGE CORE — Geist Mono, 11px, --color-text-muted
HEADING:       Ask My AI  — Syne, 40px, weight 700
SUBTEXT:       Curious about my work? Rather than reading every project,
               ask my AI assistant. It can explain projects, technical
               decisions, experience, certifications, and current learning.
```

"Knowledge Core" is the section branding. "Ask My AI" is the feature name — the heading that greets the visitor. The subtext removes all ambiguity about what the feature does before any interaction occurs.

### The Input — Spotlight Style

The input is designed to feel like a command palette, not a chat box. The mental model is **search**, not **conversation**.

```
┌─────────────────────────────────────────────────────────────┐
🔍  Ask about my projects, experience...
└─────────────────────────────────────────────────────────────┘
```

```
background: var(--color-surface)
border: 1px solid var(--color-border)
border-radius: var(--radius-sm) [10px]
padding: 14px 16px 14px 44px   /* left padding reserves space for the icon */
font: 16px Syne 400, --color-text
placeholder: "Ask about my projects, experience..."
placeholder color: --color-text-muted
```

A Search icon (Lucide `Search`, 18px, `--color-text-muted`) sits inside the input, pinned left at `14px` from the left edge. This is the only time an icon appears inside an input in this system — it establishes the "search" mental model immediately, before a word is typed.

**Focus state:** Border shifts from `--color-border` to `--color-ice-signal`. No glow. The search icon brightens to `--color-text-secondary`.

**Submission:** `Enter` key, or a ghost `↵` label that appears at the far right of the input on focus (`--color-text-muted`, Geist Mono 11px). No separate Submit button. The Spotlight model implies keyboard interaction.

### Suggestion Chips

Below the input, before any interaction, four chips invite the visitor to explore:

```
○ AI SOC Analyst
○ RAG Project
○ Resume
○ Skills
```

Each chip is a ghost button (Section 12 ghost variant) with a `○` prefix — a small unfilled dot in `--color-ice-signal-dim` — suggesting selectable options, not navigation links. Chips are arranged horizontally with `--space-3` (12px) gaps and wrap naturally on narrow viewports.

On click: the chip text populates the input and triggers the query automatically. The selected chip's `○` fills to `--color-ice-signal` for 200ms as the query fires — a brief confirmation before the processing state begins.

### Processing State

While the system is retrieving and generating:

- **Search icon animates:** A subtle arc rotation (CSS `@keyframes`, `--color-ice-signal-dim`, `800ms linear infinite`) replaces the static icon — suggesting active retrieval, not waiting
- **Input border pulses:** `opacity: 1 → 0.6 → 1`, `1.2s ease-in-out`, repeating until the response arrives
- **Ambient glow pulse:** The background of this section produces a single, slow pulse: `rgba(91, 168, 212, 0.04) → 0.08 → 0.04` over `1.5s` — once. This is the only ambient motion permitted outside the hero, and it is tied to a real event, not a loop.

### Response Display

The response appears directly below the input in a contained block:

```
background: var(--color-surface)
border: 1px solid var(--color-border)
border-radius: var(--radius-base) [12px]
padding: 24px 28px
font: 16px Syne 400, --color-text, line-height 1.65
```

**Response anatomy — in order of appearance:**

1. **Answer text** — Renders character-by-character at 18ms per character. Fast enough to feel immediate, slow enough to feel like retrieval. This is the section's earned microinteraction.

2. **Citation row** — After the text completes, a row fades in (200ms) below the answer:
   ```
   FROM: AI SOC Analyst · Resume
   ```
   Geist Mono 11px, `--color-text-muted`. Multiple sources separated by `·`. This is the system showing its work — it answers, then cites.

3. **Related project links** — 1–2 ghost-button links that navigate to the relevant case study or scroll to the project card:
   ```
   → View AI SOC Analyst   → View RAG Project
   ```
   These guide the visitor toward the portfolio rather than replacing it.

4. **Follow-up chips** — 3–4 suggested next questions in the same chip style as the initial suggestions. Updated based on the answer topic. They invite the next question.

**Disclosure order:** answer → citations → related links → follow-ups. Each group fades in after the previous completes (200ms fade, 100ms gap between groups). The sequence communicates: here is the answer, here is where it came from, here is where to go next.

### Scope Enforcement

The assistant answers questions only about:
- Projects, technical decisions, and architecture choices
- Resume, work experience, and background
- Skills and technologies used
- Certifications and their context
- Current learning goals and future direction

For out-of-scope questions, the response is direct and unambiguous:
*"I can only answer questions about [Name]'s work and background. Try asking about a specific project or skill."* — Delivered through the same character-by-character render, without apology or elaboration.

### Knowledge Sources

| Source | Content |
|--------|---------|
| Project case studies | Full narrative: problem, approach, outcome, trade-offs, lessons |
| Resume | Education, experience, certifications, skills |
| GitHub READMEs | Technical implementation details |
| Skill inventory | Technologies, tools, proficiency context |
| Certifications | Names, issuers, relevance |
| Current learning | Topics, resources, goals |
| Future blog posts | Planned — added as written |

### Technical Architecture (for implementation reference)

The Knowledge Core is a **RAG (Retrieval-Augmented Generation)** system:

| Layer | Implementation |
|-------|---------------|
| **Knowledge base** | Markdown documents: resume, project case studies, READMEs, certifications, skill inventory, experience descriptions |
| **Embedding** | Text chunked and embedded via OpenAI `text-embedding-3-small` or equivalent |
| **Vector store** | Lightweight store (Pinecone free tier, Supabase pgvector, or Chroma locally) |
| **Retrieval** | Top-k cosine similarity search on query embedding; returns source metadata for citations and related-project links |
| **Generation** | LLM (GPT-4o-mini or Claude Haiku) with retrieved context + system prompt enforcing scope |
| **API** | Single POST `/api/knowledge-core/query` — rate-limited by IP, no auth required, returns `{ answer, citations, relatedProjects, followUps }` |
| **Frontend** | React hook that calls the endpoint, streams the response, renders character-by-character, displays structured metadata after text completes |

**System prompt (non-negotiable):**
```
You are the knowledge interface for [Name]'s portfolio.
Answer questions specifically about [Name]'s projects, skills,
experience, and background — using only the provided context.
For each answer, identify which source document(s) you drew from.
If a question cannot be answered from the provided context, say so directly.
Be precise. Be specific. Avoid generic developer clichés.
Do not pretend to be a general assistant.
Guide the visitor toward the most relevant part of the portfolio.
```

---

## 24. Case Study Template

### What It Is

Every featured project has a dedicated case study page. Case studies are not blog posts — they are engineering reports written for humans. The goal is to demonstrate how you think, not just what you built. A recruiter reads the narrative; an engineer reads the architecture section and knows immediately whether you understand the problem space.

### Routing

Case study pages are separate routes within the single-page application framework. The URL structure is `/work/[project-slug]`. Navigation from the Work section (`Section 03`) goes to the case study; navigation back returns to the home page at the `#work` anchor. The browser back button works naturally.

### Page Header

Every case study page begins with its own minimal navigation — the portfolio name on the left and a single ghost breadcrumb on the right. No full nav repetition. No distracting links. The visitor's only choices are to read forward or go back.

```
[Your Name]                         ← All Projects
─────────────────────────────────────────────────
```

**Link destinations (unambiguous):**
- **Portfolio name (left):** `href="/"` — returns to the portfolio root page
- **← All Projects (right):** `href="/#work"` — returns to the root page scrolled to the Work section (Section 03). Uses `scrollIntoView` with the smooth scroll + 80px nav offset after navigation.

On mobile, both links remain. The breadcrumb sits below the portfolio name (stacked) rather than right-aligned, since the viewport is too narrow for the two-column nav layout.

### Hero — Project Introduction

```
[STAMP ROW — Geist Mono 11px, --color-text-muted]
[YEAR]  ·  [CATEGORY]  ·  [STATUS: Active / Completed / Ongoing]

[PROJECT TITLE — Syne 56px, weight 700, --color-text]

[SHORT DESCRIPTION — Syne 20px, weight 400, --color-text-secondary, max 2 lines]
A one-sentence statement of what the project is and why it exists.

[METADATA STRIP — two columns, desktop]

LEFT:                               RIGHT:
Duration: [e.g., 3 months]         [PRIMARY LINK: Live Demo ↗]
Role: [e.g., Solo project]         [SECONDARY LINK: View on GitHub ↗]
Technologies: [top 4 as tags]
```

The hero does not use a full-viewport layout. It uses the standard content rail (`max-width: 1120px`) with generous top padding (`--space-40`, 160px, to clear the minimal nav). The title occupies columns 1–9; the metadata strip is full width below.

### Content Sections — The Narrative

Each section within the case study follows the same micro-pattern:

```
[SECTION LABEL — Geist Mono 11px uppercase, --color-text-muted]
[SECTION HEADING — Syne 28px, weight 700, --color-text]
[BODY CONTENT — Syne 16px, weight 400, --color-text-secondary, line-height 1.65]
```

Body copy is constrained to **7 columns** (of 12) on desktop — approximately 65 characters per line. This is the optimal reading line length for editorial copy. The right 5 columns remain empty, giving the content room to breathe and distinguishing this from a documentation page.

**Required sections, in order (13 total):**

| # | Section Label | Heading Example | Content |
|---|---------------|-----------------|---------|
| 1 | `PROJECT OVERVIEW` | "What it is." | 2–4 sentence summary for the reader who won't read the rest. |
| 2 | `THE PROBLEM` | "What I was trying to solve." | The specific problem — not the general domain. What was broken, missing, or hard? |
| 3 | `WHY IT MATTERED` | "Why this was worth building." | Stakes. Real-world consequence. Why this problem, now, to you. |
| 4 | `GOALS` | "What success looked like." | 3–5 bullet points. Measurable or observable outcomes. |
| 5 | `ARCHITECTURE` | "How the system is structured." | The technical overview. Diagrams permitted — use design system tokens (see Section 16). |
| 6 | `DEVELOPMENT PROCESS` | "How I built it." | Narrative of the build. What order, what decisions, what surprises. |
| 7 | `TECHNICAL CHALLENGES` | "What was hard." | 2–4 specific challenges. Not "it was complex" — the actual hard parts. |
| 8 | `TRADE-OFFS & DECISIONS` | "What I chose and why." | The most consequential decisions with their reasoning. Both what was chosen and what was rejected. |
| 9 | `OUTCOME` | "What resulted." | Concrete results. Numbers if available. Honest if mixed. |
| 10 | `LESSONS LEARNED` | "What I'd tell myself at the start." | Specific. Not generic wisdom. Something that will actually change how you build the next thing. |
| 11 | `FUTURE IMPROVEMENTS` | "What I'd do next." | Concrete next steps. Shows ongoing thinking. |
| 12 | `GALLERY` | — | Visual output (screenshots, mockups) in 2-up grid. If no visual output, a clean code block. Full spec below. |
| 13 | `LINKS` | — | Live Demo (primary), GitHub (secondary), ← Back to Projects (ghost). Full spec below. |

### Gallery

If the project has visual output, a full-width gallery appears as section 12, after `FUTURE IMPROVEMENTS`:

```
STAMP LABEL: GALLERY

Images in a 2-up grid (desktop) or 1-up (mobile).
Each image: aspect ratio 16:9 or 4:3 (consistent within a project).
Background: --color-surface, border: 1px solid --color-border, radius: --radius-base.
Caption below each image: Syne 13px, --color-text-muted, left-aligned.
```

Images use native `loading="lazy"` and LQIP (low-quality image placeholder) blur-up. No lightbox — the images are documentation, not a gallery experience.

If the project has no visual output (a CLI tool, a research paper, a library), a clean dark code block with actual relevant code serves as the gallery. Syntax-highlighted to palette colors, Geist Mono.

### Links Section

At the very end:

```
STAMP LABEL: LINKS

[LIVE DEMO ↗]       — Primary button
[VIEW ON GITHUB ↗]  — Secondary button / outlined
[← Back to Projects] — Ghost button, left-aligned, leads back to /#work
```

### Typography Notes for Case Studies

- Section labels (Geist Mono stamps) are spaced `--space-12` (48px) apart — more breathing room than the main page because the reader is spending more time here
- Body paragraphs are separated by `--space-6` (24px)
- Code blocks inside case study sections: `background: var(--color-surface)`, `border: 1px solid var(--color-border)`, `border-radius: var(--radius-base)`, `padding: --space-6`, Geist Mono 14px
- Blockquotes (for key insights): `border-left: 2px solid var(--color-ice-signal)`, `padding-left: --space-6`, `--color-text-secondary` — used sparingly for a most important insight per section

### Interaction on Case Study Pages

- **Entrance:** The hero title and stamp row use the standard section entrance animation (`translateY(24px) → 0`, 500ms). Body sections do not animate on scroll — the reader is in focused reading mode.
- **Reading depth:** The Reading Depth microinteraction (Section 20) applies to all body copy paragraphs on case study pages. It is especially effective here because the visitor is reading longer text.
- **Copy code blocks:** All code blocks have a copy-to-clipboard icon (top-right corner, appears on hover). Clicking shows the `Copied ✓` feedback (Section 20 microinteractions).
- **Scroll depth indicator:** The Scroll Depth Indicator (IA Section — Additional Interaction B) applies to case study pages. Section markers correspond to each case study section label.
- **Back to top:** The smooth Back to Top interaction is active on case study pages.

### Case Study Page Accessibility

- One `<h1>` per page: the project title
- Section headings are `<h2>`, subsections `<h3>`
- Gallery images have descriptive `alt` text — never `alt="Screenshot"`
- Code blocks use `<pre><code>` with appropriate `aria-label`

---

## 25. Resume Drawer

### What It Is

The Resume Drawer replaces the traditional "Download Resume" link. Instead of immediately triggering a file download or opening a browser PDF viewer, it slides in a right-edge panel that lets the visitor preview the resume and choose how to proceed.

The drawer uses the existing panel design language — it is not a new design pattern. It is a `--color-surface` panel with a `--color-border` edge, exactly like a project card, extended to full height.

### Trigger

The drawer is opened by a "Resume" link in the navigation bar. The nav layout updates:

```
[NAME / MONOGRAM]   [Work · Signal · Stack · Resume · Ask · Contact]   [THEME TOGGLE · CTA]
```

"Resume" is a nav link styled identically to other nav links (Syne 14px, `--color-text-secondary`, underline-slide-in hover). On click, the drawer opens — the page does not navigate. On mobile, "Resume" appears in the hamburger overlay and opens the drawer after the overlay closes.

### Visual Design

```
Width (desktop):   480px
Width (mobile):    100vw
Height:            100svh
Position:          fixed; right: 0; top: 0; z-index: 200
Background:        var(--color-surface)
Border-left:       1px solid var(--color-border)
Overflow-y:        auto
```

The drawer slides in from the right edge:
- **Entrance:** `translateX(480px) → translateX(0)`, `320ms`, `--ease-spring` (`cubic-bezier(0.16, 1, 0.3, 1)`)
- **Exit:** `translateX(0) → translateX(480px)`, `220ms`, `--ease-smooth`

A semi-transparent backdrop covers the page behind the drawer:
```
background: rgba(7, 9, 17, 0.6)    /* dark mode */
background: rgba(12, 24, 37, 0.3)  /* light mode — lighter, less opaque */
transition: opacity 220ms ease
```
Clicking the backdrop closes the drawer.

### Drawer Header

```
padding: --space-6 (24px) on all sides

Left:   "Resume" — Syne 20px weight 700, --color-text
Right:  ✕ close button — icon-only (Lucide X, 20px), same 40×40px target
        as the theme toggle, same hover style (--color-surface-raised bg)
```

The close button is `aria-label="Close resume drawer"`. `Escape` key also closes.

### Drawer Content

**1. First-Page Preview**

A static image of the resume's first page — not an embedded PDF, not an `<iframe>`. A rendered image avoids browser PDF viewer inconsistencies and loads instantly.

```
Image:          full drawer width minus 2 × --space-6 padding
Aspect ratio:   Letter (8.5:11 ≈ 1:1.294)
Border:         1px solid var(--color-border)
Border-radius:  var(--radius-base)
Loading:        lazy + LQIP blur placeholder
```

**2. Quick Summary**

Below the preview, a compact summary for visitors who want the key facts without opening the full document:

```
[EDUCATION]     — Geist Mono stamp label + 1–2 lines (degree, institution, year)
[EXPERIENCE]    — Geist Mono stamp label + 2–3 lines (role, org, dates)
[SKILLS]        — Geist Mono stamp label + top 6–8 technology tags
[CERTIFICATIONS]— Geist Mono stamp label + 1–2 lines
```

Each subsection is separated by a `1px` hairline in `--color-border`. The layout matches the Section 04 (Approach) minimal block style — no card borders, spacing creates the boundary.

**3. Action Buttons**

At the bottom of the drawer content (sticky on desktop if content overflows):

```
[Download PDF]      — Primary button, full drawer width
[Open Fullscreen]   — Secondary / outlined button, full drawer width, below
```

"Download PDF" triggers a direct file download (`<a download>`). "Open Fullscreen" opens the PDF in a new tab (`target="_blank"`). Neither opens a browser embed within the drawer.

### State Matrix

The drawer has four named states. Every visual decision below is bounded by this table — no state gets a design treatment that isn't listed here.

| State | Preview Area | Action Buttons | Notes |
|-------|-------------|----------------|-------|
| **Loading** | LQIP blur placeholder fills the preview slot; a skeleton shimmer (`--skeleton-duration: 1.4s`) overlays it | Buttons rendered but `disabled` with 0.4 opacity | Shown until the preview image fires `onload` |
| **Ready** | Preview image visible at full resolution (blur-up from LQIP) | Both buttons active | Normal operating state |
| **Image Error** | Placeholder block (same dimensions as the preview) with a centered Lucide `FileX` icon (32px, `--color-text-secondary`) and copy "Preview unavailable" in Geist Mono 13px | Both buttons remain active — visitor can still download | Fires if preview image `onerror` triggers |
| **Download Active** | Unchanged | "Download PDF" label swaps to "Downloading…" for 1.8s then reverts; button is `disabled` during that window | Prevents double-tap confusion; 1.8s matches copy-tooltip duration; no spinner (see §26 no-spinner rule) |

No error state disables the PDF download — even when the preview fails, the underlying file should still be accessible.

### Focus Management

When the drawer opens:
- Focus moves to the close button immediately
- Tab cycles only within the drawer (focus trap)
- `Escape` closes and returns focus to the "Resume" nav link

### Resume Drawer Accessibility

```html
<div role="dialog" aria-modal="true" aria-label="Resume preview">
```

The backdrop is `aria-hidden="true"` — screen readers interact only with the drawer content.

---

## 26. Premium Details System

These are the quality-of-life interactions that separate a portfolio that "works" from one that "feels right." None of them are individually remarkable — together they create the impression that every surface has been thought about. They all inherit the existing motion language and design system tokens.

### Navigation Quality

**Active section tracking** — The current section's nav link has an `--color-ice-signal` underline. This is driven by Intersection Observer watching each section's `<h2>` element with a `rootMargin: '-30% 0px -60% 0px'` threshold — the active section is the one most prominently in view, not just the first to enter. Updating is instantaneous — no transition between active states.

**Smooth scroll** — `scroll-behavior: smooth` on the HTML element. All anchor links (`href="#section"`) scroll with an `80px` top offset to account for the fixed nav (`--nav-height: 56px` + `24px` breathing room). Implemented via `scrollIntoView({ behavior: 'smooth', block: 'start' })` with the offset applied via a scroll-margin-top on each section.

**Back to Top** — A `↑` ghost button appears in the bottom-right corner after the visitor scrolls past `400px`. Fade-in: `opacity: 0 → 1`, 220ms. Fade-out: reversed. On click: `window.scrollTo({ top: 0, behavior: 'smooth' })`. The button is `40×40px`, `--color-surface` background, `1px solid --color-border` border, `--radius-sm`. It does not compete with content — it appears when the page is being navigated, not read.

### Image Loading

**Native lazy loading** — All images below the fold use `loading="lazy"`. The hero portrait uses `loading="eager"` — it is above the fold and must appear with the entrance animation.

**LQIP blur placeholders** — Every image has a low-quality placeholder: a tiny (`~20px`) version of the image, base64-encoded, rendered with `filter: blur(12px)` and `transform: scale(1.05)` (to hide blur edges). When the full image loads, the placeholder fades out: `opacity: 1 → 0`, `300ms ease`. This creates a blur-up effect identical to high-quality image services. No skeleton or gray box.

**Aspect ratio preservation** — All image containers declare `aspect-ratio` explicitly so layout does not shift on load. No CLS (cumulative layout shift).

### Adaptive Favicon

Two favicon variants — one for dark system backgrounds, one for light:

```html
<link rel="icon" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)">
<link rel="icon" href="/favicon-light.svg" media="(prefers-color-scheme: light)">
```

Both are minimal — initials or a single geometric mark from the ice-signal palette. The dark favicon uses `#5ba8d4` on transparent; the light favicon uses `#3a6f94` on transparent. SVG format for crispness at all sizes.

### Loading States

**Top-of-viewport progress bar** — For any asynchronous operation (Knowledge Core query, resume PDF download start), a `2px` bar in `--color-ice-signal` runs across the top of the viewport — inspired by NProgress. It begins at `0%`, animates to `~75%` immediately (suggesting progress without knowing the real value), then completes to `100%` on resolution and fades out over `200ms`. One element, globally managed.

**Knowledge Core thinking state** — The search icon in the input rotates (CSS keyframe, `800ms linear infinite`). The input border pulses. No spinner in the response area.

**No spinners anywhere else.** Spinners create anxiety — they measure waiting, not progress. The progress bar measures progress.

### Empty States

When the Knowledge Core has no response yet (initial state), the response area does not exist — it appears only after the first query. There is no "Ask a question to get started" placeholder inside an empty box. The suggestion chips are the invitation to begin.

For sections that might render empty (a project list while loading), show a minimal skeleton rather than an empty state — see Skeleton Loaders below.

### Skeleton Loaders

Used only while data is loading — never as a design element. Pattern: a `--color-surface` block with a subtle shimmer animation:

```css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface) 25%,
    var(--color-surface-raised) 50%,
    var(--color-surface) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: var(--radius-base);
}
```

Skeleton blocks match the approximate shape of the content they represent. A project card skeleton has three rows (stamp, title, description) at the right heights. The shimmer moves left-to-right — in the reading direction.

### Anchor Transitions

When navigating to an anchor (`#work`, `#contact`, etc.):
1. The page scrolls smoothly (300–500ms depending on distance)
2. The target section's heading briefly highlights: `color` transitions to `--color-ice-signal` over `150ms`, holds for `600ms`, then returns over `300ms` — a subtle "you are here" signal
3. The active nav link updates simultaneously

This makes anchor navigation feel deliberate and confirmed — the visitor always knows the scroll landed correctly.

### Keyboard Accessibility Throughout

**Tab order** follows visual reading order left-to-right, top-to-bottom. No visual element is reachable by Tab that is not interactive.

**Focus states** match the design system: `outline: 1.5px solid var(--color-ice-signal); outline-offset: 3px` on all interactive elements. Never removed. The Knowledge Core input, drawer close button, suggestion chips, resume download buttons, and all nav links are Tab-reachable.

**Skip link** — A visually hidden "Skip to main content" link is the first Tab stop on every page, visible only on focus:
```css
.skip-link { position: absolute; transform: translateY(-100%); }
.skip-link:focus { transform: translateY(0); }
```

**The Resume Drawer** traps focus while open (Tab cycles within it). Escape closes and returns focus to the trigger.

**The mobile nav overlay** traps focus while open. Escape closes and returns focus to the hamburger.

### Copy-to-Clipboard Feedback

Used in two places: the Contact section (email address copy) and case study code blocks.

On successful copy:
```
Tooltip text: "Copied ✓"
Position: above the trigger element, centered
Background: var(--color-surface-raised)
Border: 1px solid var(--color-border)
Border-radius: var(--radius-sm)
Font: Geist Mono 11px, --color-text-secondary
Padding: 4px 10px

Fade in: 150ms ease
Hold: 1.8s
Fade out: 300ms ease
```

The tooltip does not interfere with layout — it is `position: absolute` and always fits within the viewport. On mobile, it appears below the trigger if the element is near the top edge.

---

## CSS Custom Properties Reference

```css
:root {
  /* === COLORS === */

  /* Canvas & Surfaces */
  --color-void: #070911;
  --color-abyss: #0b0e18;
  --color-slate-panel: #0f1522;
  --color-slate-raised: #19253a;
  --color-slate-edge: #1e2d42;
  --color-slate-trim: #2d3f58;

  /* Typography */
  --color-starlight: #dce8f5;
  --color-steel: #7f96b2;
  --color-slate-mist: #4d6275;

  /* Accent */
  --color-ice-signal: #5ba8d4;
  --color-ice-signal-dim: #3a6f94;

  /* === TYPOGRAPHY === */

  --font-primary: 'Syne', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'IBM Plex Mono', ui-monospace, monospace;

  --text-stamp: 11px;
  --leading-stamp: 1.2;
  --tracking-stamp: 0.18em;

  --text-caption: 12px;
  --leading-caption: 1.4;
  --tracking-caption: 0.02em;

  --text-body-sm: 14px;
  --leading-body-sm: 1.6;

  --text-body: 16px;
  --leading-body: 1.65;

  --text-body-lg: 18px;
  --leading-body-lg: 1.6;
  --tracking-body-lg: -0.01em;

  --text-subheading: 20px;
  --leading-subheading: 1.4;
  --tracking-subheading: -0.02em;

  --text-heading-sm: 28px;
  --leading-heading-sm: 1.2;
  --tracking-heading-sm: -0.03em;

  --text-heading: 40px;
  --leading-heading: 1.1;
  --tracking-heading: -0.04em;

  --text-heading-lg: 56px;
  --leading-heading-lg: 1.05;
  --tracking-heading-lg: -0.05em;

  --text-display: 72px;
  --leading-display: 1.0;
  --tracking-display: -0.06em;

  --text-display-lg: 88px;
  --leading-display-lg: 0.95;
  --tracking-display-lg: -0.07em;

  --text-hero: 104px;
  --leading-hero: 0.9;
  --tracking-hero: -0.08em;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;

  /* === SPACING === */

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
  --space-40: 160px;

  /* === LAYOUT === */

  --page-max-width: 1120px;
  --section-gap: 128px;
  --section-gap-mobile: 80px;
  --card-padding: 32px;
  --element-gap: 16px;
  --side-margin-mobile: 20px;
  --side-margin-tablet: 40px;
  --side-margin-desktop: 48px;

  /* === BORDER RADIUS === */

  --radius-base: 12px;   /* Cards, panels, containers */
  --radius-sm: 10px;     /* Buttons, tags, inputs */

  /* === SHADOWS === */

  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(5, 8, 18, 0.5);

  /* === MOTION === */

  --ease-out: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);

  --duration-micro: 150ms;
  --duration-standard: 220ms;
  --duration-component: 320ms;
  --duration-entrance: 500ms;
  --duration-hero: 700ms;

  /* === NAV === */

  --nav-height: 56px;
  --nav-bg: rgba(7, 9, 17, 0.75);
  --nav-blur: blur(12px);

  /* === RESUME DRAWER === */

  --drawer-width: 480px;
  --z-drawer: 200;          /* above nav (z-index: 100) */
  --z-backdrop: 150;        /* between page and drawer */
  --drawer-backdrop-dark: rgba(7, 9, 17, 0.6);
  --drawer-backdrop-light: rgba(12, 24, 37, 0.3);

  /* === PREMIUM DETAILS === */

  --progress-bar-height: 2px;
  --scroll-back-size: 40px;
  --skeleton-duration: 1.4s;
  --lqip-blur: 12px;

  /* === SEMANTIC TOKENS — Dark Mode (default) === */
  /* Components reference these. Raw palette tokens above are the source values. */

  --color-canvas: var(--color-void);
  --color-recessed: var(--color-abyss);
  --color-surface: var(--color-slate-panel);
  --color-surface-raised: var(--color-slate-raised);
  --color-border: var(--color-slate-edge);
  --color-border-strong: var(--color-slate-trim);
  --color-text: var(--color-starlight);
  --color-text-secondary: var(--color-steel);
  --color-text-muted: var(--color-slate-mist);
  --color-nav-bg: rgba(7, 9, 17, 0.75);
}

/* Light Mode — applied via [data-theme="light"] on <html> */
[data-theme="light"] {

  /* Light Palette Raw Values */
  --color-frost: #f0f5fa;
  --color-frost-recessed: #e6edf6;
  --color-pure: #ffffff;
  --color-pure-raised: #f4f8fc;
  --color-mist-edge: #d0dde8;
  --color-mist-trim: #b8ccd8;
  --color-ink: #0c1825;
  --color-ink-secondary: #3d5a72;
  --color-ink-muted: #628199;  /* ~3.7:1 on frost canvas — stamps/dates 16px+ only */

  /* Accent — Ice Signal unchanged; Dim used for text links in light mode */
  --color-ice-signal: #5ba8d4;
  --color-ice-signal-dim: #3a6f94;

  /* Semantic Token Overrides */
  --color-canvas: var(--color-frost);
  --color-recessed: var(--color-frost-recessed);
  --color-surface: var(--color-pure);
  --color-surface-raised: var(--color-pure-raised);
  --color-border: var(--color-mist-edge);
  --color-border-strong: var(--color-mist-trim);
  --color-text: var(--color-ink);
  --color-text-secondary: var(--color-ink-secondary);
  --color-text-muted: var(--color-ink-muted);
  --color-nav-bg: rgba(240, 245, 250, 0.85);

  /* Shadow — lighter in light mode; depth is expressed differently */
  --shadow-card: 0 1px 3px rgba(12, 24, 37, 0.06), 0 4px 16px rgba(12, 24, 37, 0.08);
}
```

---

## Appendix: Quick Decisions Reference

| Decision | Answer |
|----------|--------|
| Button radius | `10px` |
| Card radius | `12px` |
| Pill buttons? | Never |
| Accent color? | `#5ba8d4` — once per section max |
| How many typefaces? | 2 (Syne + Geist Mono) |
| Light mode? | Yes — fully designed companion to dark mode (see Section 4a) |
| Shadows at rest? | No — borders only |
| Scroll jacking? | Never |
| Custom cursor? | No — system default cursor |
| Ambient effects? | Yes — hero only, imperceptible under normal reading |
| Stock photos? | Never |
| Decorative animations? | Never — all motion serves information |
| WebGL for decoration? | Never — only for project showcases |
| Section gap? | `128px` desktop, `80px` mobile |
| Max content width? | `1120px` |
| Font weights? | 400, 500, 700 on Syne. 400 on Geist Mono. Nothing else. |
| Green, anywhere? | Never |
| Floating code? | Never |
| Icons: filled or outline? | Outline only, 1.5px stroke |
| Focus styles? | Always present: 1.5px `--color-ice-signal` outline |
| Signature interactions? | Signal Trace (projects) + Precision Reveal (skills) |
| AI assistant? | Yes — Knowledge Core, Spotlight-style, RAG-based, near page end |
| AI experience model? | Search interface, not chat. Spotlight / command palette. |
| Project case studies? | Yes — dedicated pages at `/work/[project-slug]`, editorial layout |
| Resume download? | Via side drawer — preview first, then download or open fullscreen |
| Skeleton loaders? | Yes — shimmer animation, shape-matched to content |
| Image loading? | Native `loading="lazy"` + LQIP blur-up placeholders |
| Back to top? | Yes — appears after 400px scroll, bottom-right, 40×40px |
| Adaptive favicon? | Yes — dark + light SVG variants via `media` attribute |
| Progress bar? | `2px` ice-signal bar at viewport top for async operations |
| Copy feedback? | `Copied ✓` tooltip — 150ms in, 1.8s hold, 300ms out |
| Skeleton base color? | `--color-surface` with `--color-surface-raised` shimmer |
| Drawer z-index? | `200` (nav is `100`, backdrop is `150`) |
| Drawer width? | `480px` desktop, `100vw` mobile |
| Skip link? | Yes — visually hidden, first Tab stop on every page |

---

*This document is the source of truth. When a future implementation decision conflicts with this specification, the specification wins — or this document is updated with a documented reason. Drift is the enemy of a designed system.*
