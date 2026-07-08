# Portfolio Information Architecture
## "Precision at Rest" — Narrative Flow & Section Design

---

> **Governing Narrative:**
>
> The portfolio tells the story of someone growing into an AI/ML and Cybersecurity engineer — not a list of projects, but a progression of thinking. A visitor should finish the page understanding not only what you have built, but *how you think*. The structure is a slow reveal: who you are → what drives you → what you've built → how you think → what your depth looks like → an invitation to go further.

---

> **Implementation Note — Color Tokens:**
>
> Token references throughout this document (e.g. `--color-starlight`, `--color-steel`, `--color-void`) reflect dark-mode raw palette values for human readability in this spec. All implementation code must reference **semantic tokens** (`--color-text`, `--color-text-secondary`, `--color-canvas`, `--color-surface`, `--color-border`, etc.) so that theme switching propagates automatically. See Section 4a of the Design System for the full semantic token map.

---

## Section Map

```
01  HERO          — The first impression. Name, atmosphere, one statement.
02  SIGNAL        — Your thesis. Why AI + Security. One paragraph.
03  WORK          — Featured projects. The evidence.
                   └─ /work/[project-slug]  Case Study pages (sub-routes, one per project)
04  APPROACH      — How you think. Principles, not skills.
05  STACK         — Technical capabilities. The Precision Reveal interaction.
06  KNOWLEDGE CORE — The AI knowledge search. The culminating feature.
07  CONTACT       — Simple. Direct. One action.
    FOOTER        — Quiet. Personal. A small signature.
```

**Page-level routing:** The portfolio is primarily a single-page application. Case study pages are the only sub-routes (`/work/[project-slug]`). All other navigation is anchor-based scrolling within the root page.

**Resume Drawer:** Not a page or section — a right-edge slide-in panel triggered by the "Resume" nav link. Accessible from any scroll position. See Design System Section 25.

---

## Section 01 — Hero

### Purpose
Create an immediate, memorable first impression that communicates: "This person is different. I want to keep reading."

### Emotional Goal
Calm confidence. The visitor should feel they've landed somewhere intentional — not a template, not a tryhard. A composed, intelligent space.

### Content Hierarchy
```
[NAV — floating, transparent · includes theme toggle]

[AMBIENT LAYER — star field, radial glow, drift particles, radar pulse]

LEFT COLUMN (cols 1–7):                    RIGHT COLUMN (cols 9–12):

[STAMP LABEL]     — Geist Mono 11px        [PORTRAIT — 3:4 ratio, 12px radius,
[YOUR NAME]       — Syne 104px weight 700    vertically centered with text block,
[ONE DESCRIPTOR]  — Syne 28px weight 400    1px --color-border frame]
                    "Building intelligent
                     systems at the
                     intersection of AI
                     and security."

[SUBTEXT — optional, max 2 lines]
  Syne 16px · --color-text-secondary
  Example: "Currently exploring how ML
  systems fail — and how to make them not."

[CTA ROW]
  Primary button: "View My Work" → scrolls to Section 03
  Ghost link: "Read About Me" → scrolls to Section 02
```

### Layout

**Desktop:**
- Full viewport height (`100svh`)
- Two-column split within the 12-column grid
- **Left (cols 1–7):** All text content — stamp label, name, descriptor, subtext, CTA row. Left-aligned, vertically centered at ~45% viewport height.
- **Right (cols 9–12):** Portrait. `320 × 427px`, aspect ratio 3:4, `12px` border radius, `1px` border in `--color-border`. No background. Vertically centered with the text block.
- Col 8 is a deliberate 1-column gap — breathing room between text and image.
- Ambient layers span the full viewport behind both columns.

**Mobile:**
- Full viewport height
- Stacked single column, vertically centered at 40%
- Order: stamp label → name → descriptor → portrait → subtext → CTA row
- Portrait: `64%` viewport width, centered, between descriptor and subtext
- Name at 52px, descriptor at 22px
- Star field reduced to ~60 dots, drift particles disabled

### Entrance Sequence (extended)
Seven elements enter in order, staggered:
1. Nav: `0ms` delay, `500ms` fade
2. Stamp label: `200ms` delay, `500ms` fade + slide up `24px`
3. Headline line 1: `350ms` delay, `700ms` slide up
4. Headline line 2: `450ms` delay, `700ms` slide up
5. Subtext: `600ms` delay, `500ms` fade
6. CTA row: `750ms` delay, `400ms` fade
7. Portrait: `900ms` delay, `500ms` fade — arrives last, like stepping into frame

### Interaction
- **Hero entrance sequence**: staggered fade-up over ~1.4s (see sequence above)
- **Slow parallax on headline**: `translateY` at 0.3× scroll speed as visitor scrolls first 200px. Background layers at 0.1×. Portrait translates at 0.15× — a third plane, between the text and the atmosphere.
- **Radar pulse ambient**: single expanding ring from off-center position, 8s cycle, nearly invisible
- **Theme toggle**: in nav — see Section 14 of design system

### Transition Into Section 02
No explicit divider. The hero fades naturally as the visitor scrolls. At the bottom of the hero viewport, the ambient effects end and the content begins — Section 02 enters with the standard `translateY(24px) → 0` entrance animation. The transition is an exhale: atmosphere → substance.

---

## Section 02 — Signal

### Purpose
Answer the question every recruiter and engineer asks before they click anything: "Why this combination? Why AI *and* security?" This section turns a potential gap (not purely one thing) into a distinctive identity.

### Emotional Goal
Intellectual recognition. The visitor reads this and thinks: "This person has a reason. They've thought about this." It's the section that makes the portfolio memorable to a senior engineer.

### Content Hierarchy
```
[STAMP LABEL]   — "WHAT DRIVES ME" or "THESIS"

[STATEMENT]     — Syne 28px weight 700 · --color-starlight · max 2 lines
                  One precise, non-generic statement about your direction.
                  Not "I'm passionate about." A claim.
                  Example: "Intelligent systems are only as trustworthy
                             as the security model underneath them."

[BODY TEXT]     — Syne 16px weight 400 · --color-steel · 3–5 sentences
                  The story in your own voice. Where the interest came from.
                  What you've noticed. What question you're trying to answer.
                  This is the most personal writing on the page — it must
                  sound like you, not a LinkedIn summary.

[OPTIONAL: 2–3 brief principle cards]
                  If the body text alone feels thin, add 2–3 horizontal
                  cards — each with a one-word label (Geist Mono stamp) and
                  one sentence. Examples: "CURIOSITY", "PRECISION", "SYSTEMS".
                  These are not skills — they are traits of thinking.
```

### Layout

**Desktop:**
- Content in a 7-column left rail, 5-column right empty (creates deliberate asymmetry — the content does not fill the page; it earns its space)
- Principle cards (if used): 3-up horizontal grid, full width

**Mobile:**
- Full width, single column
- Principle cards stack vertically

### Interaction
- Standard entrance animation (fade-up, stagger)
- No hover interactions — this section is text only
- No accent color fires here (the section is the signal — it doesn't need one)

### Transition Into Section 03
A subtle `1px` horizontal hairline (`--color-slate-trim`) separates this section from the Work section. The hairline is not a divider — it's punctuation. Like a paragraph break after a thesis statement.

---

## Section 03 — Work

### Purpose
Show what you've actually built. This is the portfolio's evidence. Three to five projects, each with enough specificity that a technical reader understands the problem, the approach, and the outcome.

### Emotional Goal
Credibility. A recruiter scrolling this section should feel increasingly convinced that the person described in Section 02 is real. An engineer should find at least one project to slow down for.

### Content Hierarchy
```
[STAMP LABEL]   — "SELECTED WORK"

[SECTION HEADING] — "Projects that taught me something."
                    (Or: "What I've built." — simpler is fine.)

[PROJECT CARDS — 2-up grid on desktop, 1-up on mobile]
  Each card follows the Project Card spec from Section 13 of the design system.
  Ghost button CTA on each card: "Read Case Study →"
  On click: navigates to /work/[project-slug] (case study page).
  Cards do not open modals or expand inline — they route to a dedicated page.

[CASE STUDY PAGE HEADER — on each /work/[project-slug] page]
  Left:   Portfolio name (same monogram as root nav) — href="/"
  Right:  "← All Projects" ghost link — href="/#work"
          After navigation the root page scrolls to the Work section (smooth scroll + 80px offset).
  No full nav. No other links. Visitor's only choices: read forward or go back.

[FEATURED PROJECT — optional]
  If one project is significantly more impressive than the others,
  give it a full-width card at the top of the grid. Half the card
  is a project screenshot/visual; the other half is the card anatomy.
  This is the only place a full-width card is permitted in this section.

[LINK ROW]
  Ghost button: "View all on GitHub →"
  This is the only GitHub link on the page — placed here because this
  is where the visitor is most motivated to see more.
```

### Project Count
3–5 projects maximum. Fewer is better if each is strong. Do not show 8 mediocre projects to look prolific. Show 3 strong ones and own it.

### Project Selection Priority
1. Projects that demonstrate AI/ML systems thinking
2. Projects that demonstrate security understanding
3. Projects that combine both
4. Projects that show breadth (a game, a tool, something different — shows the person behind the engineer)

### Layout

**Desktop:**
- Featured project (if present): full 12-column width, split visual/text
- Standard cards: 2-up grid (6 cols each), max 2 rows
- `--space-4` (16px) gap between cards

**Mobile:**
- All cards: single column, full width
- Featured project: stacked (visual on top, text below)

### Interaction
- **Signal Trace** (Primary Signature — see Section 10b): On hover, a `1px` line in `--color-ice-signal-dim` traces from the hovered card to a technology panel
- **Card lift**: `translateY(-4px)` + border brightens + shadow appears — 320ms
- **Technology panel** (desktop only): A fixed right-side panel, `240px` wide, that shows the technology stack of the currently-hovered project. Slides in on first hover (from right, 300ms, `--ease-spring`). Updates content (no re-animation) as the hovered card changes.

### Transition Into Section 04
No divider. The last row of project cards ends with standard section spacing (`128px`). Section 04 enters with its stamp label visible mid-scroll — the timing of the entrance animation is what signals the transition, not a visual separator.

---

## Section 04 — Approach

### Purpose
Reveal how you think. This is the section that differentiates you from candidates with similar resumes. Most portfolios skip it. Yours doesn't.

### Emotional Goal
Depth. A senior engineer reading this should think: "This person has developed an actual perspective. They're not just collecting skills." A hiring manager should think: "They're going to be easy to work with because they think about the right things."

### Content Hierarchy
```
[STAMP LABEL]   — "HOW I THINK" or "APPROACH"

[SECTION HEADING] — "Principles I keep coming back to."
                    (Or another framing — the heading should not be generic.)

[3–4 PRINCIPLE BLOCKS]
  Each block is a labeled idea — not a buzzword, a real principle.
  Format:
    [LABEL — Geist Mono stamp]   e.g., "FAILURE FIRST"
    [One sentence]               e.g., "I start by asking how a system can be
                                        broken, then design around the answer."
    [2–3 sentence elaboration]   Context, example, or origin of the principle.

  Principle examples (replace with your actual ones):
    — "FAILURE FIRST" — Think adversarially before building defensively.
    — "INTERPRETABILITY" — A model you can't explain is a liability, not a feature.
    — "MINIMAL FOOTPRINT" — The best system does exactly what it needs to, no more.
    — "SYSTEMS OVER SOLUTIONS" — Solving the symptom is slower than fixing the model.
```

### Layout

**Desktop:**
- Principle blocks: 2-up grid (6 cols each)
- Top-left principle: slightly larger label text to create asymmetric entry point
- Content within each block is left-aligned, no card borders — just spacing creating the boundary

**Mobile:**
- Single column stack
- Each block has a `1px` top hairline (`--color-slate-trim`) as a separator

### Interaction
- No hover interactions — the content is the interaction
- Standard entrance animation with children staggered at `80ms` apart
- Principle labels (Geist Mono stamps) are the only elements in `--color-starlight` in this section — the body copy is in `--color-steel`, making labels feel like they're illuminated

### Transition Into Section 05
A second `1px` hairline separator. By now, two hairlines have been used (after Section 02 and after Section 04). They create a rhythm — punctuation at the end of the conceptual sections before the technical ones begin.

---

## Section 05 — Stack

### Purpose
Communicate technical breadth and depth without listing everything you've ever touched. The goal is confidence, not comprehensiveness.

### Emotional Goal
Competence. The Precision Reveal interaction (Section 10b of design system) is the entire emotional experience here — the mechanical appearance of skill tokens makes the visitor feel they're watching a system enumerate itself.

### Content Hierarchy
```
[STAMP LABEL]   — "TECHNICAL STACK"

[SECTION HEADING] — "Tools I use to build." (Simple. Direct.)

[SKILL GROUPS — 3–4 categories]
  Each group:
    [GROUP LABEL — Geist Mono stamp, --color-slate-mist]
    e.g., "AI & ML", "SECURITY", "LANGUAGES", "INFRASTRUCTURE"
    [SKILL TOKENS — the Precision Reveal sequence]

[CURRENT FOCUS — optional, below the grid]
  One line:
  "Currently deepening: [Topic]" — Geist Mono 12px · --color-slate-mist
  This tells the visitor you're still moving, not static.
```

### Skill Group Examples

| Group | Content |
|-------|---------|
| `AI & ML` | PyTorch, Hugging Face, LangChain, scikit-learn, OpenAI API, RAG, embeddings |
| `SECURITY` | Wireshark, Burp Suite, SIEM, IDS/IPS concepts, CTF tools, threat modeling |
| `LANGUAGES` | Python, TypeScript, C, SQL, Bash |
| `INFRASTRUCTURE` | Docker, Linux, PostgreSQL, Git, REST APIs, cloud (AWS/GCP basics) |

**Rule:** Do not list skills you cannot speak to in an interview. This section is an invitation — every token is a possible question.

### Layout

**Desktop:**
- 4-up group grid (3 cols each on a 12-col grid)
- Tokens wrap naturally within each group
- 24px gap between tokens, 48px between groups

**Mobile:**
- 2-up group grid (collapses to 1-up on `xs`)

### Interaction
- **Precision Reveal** (Secondary Signature — see Section 10b): tokens appear one-by-one at 35ms intervals after the section enters viewport
- No hover interaction on individual tokens — they are informational only
- The `--color-ice-signal` fires once: on the `CURRENT FOCUS` label below the grid

### Transition Into Section 06
After Section 05, the background subtly deepens from `--color-void` to `--color-abyss` — a one-step darkening that signals the approach of something different. This is not an animation — it's the `background-color` of Section 06's container being `--color-abyss`. The contrast is barely perceptible but felt.

---

## Section 06 — Knowledge Core

### Purpose
Demonstrate that you build intelligent systems — by providing one as part of the portfolio. By this point in the page, the visitor knows who you are, what you've built, how you think, and what you know. The Knowledge Core is the closing argument: *and here is the kind of thing I actually make.*

### Emotional Goal
Delight with restraint. Not "wow, a chatbot!" — but "of course this person built this, and of course it feels like a precision search tool, not a support widget." The section should feel inevitable given everything that came before it.

### Content Hierarchy
```
[STAMP LABEL]   — "KNOWLEDGE CORE"

[SECTION HEADING] — "Ask My AI"
                    Syne 40px weight 700 · --color-text

[SUBTEXT]       — Syne 16px · --color-text-secondary · max 3 lines
                  "Curious about my work? Rather than reading every project,
                   ask my AI assistant. It can explain projects, technical
                   decisions, experience, certifications, and current learning."

[SEARCH INPUT — full content-width, Spotlight style]
  ┌─────────────────────────────────────────────────────────────┐
  🔍  Ask about my projects, experience...
  └─────────────────────────────────────────────────────────────┘

  The 🔍 icon (Lucide Search, 18px) sits inside the input at left.
  Submit via Enter key or a ghost ↵ label that appears on focus.
  No separate Submit button.

[SUGGESTION CHIPS — 4 pre-seeded topics]
  Below the input, before any interaction:
  Horizontal row of ghost buttons with ○ prefix:

  ○ AI SOC Analyst   ○ RAG Project   ○ Resume   ○ Skills

  Clicking one populates and submits the input automatically.

[RESPONSE AREA — appears after first submission]
  ┌──────────────────────────────────────────────────────┐
  │  [Answer text — renders character-by-character,      │
  │   18ms per character]                                │
  │                                                      │
  │  FROM: AI SOC Analyst · Resume  [citation row]      │
  │                                                      │
  │  → View AI SOC Analyst   → View RAG Project          │
  │    [related project links]                           │
  └──────────────────────────────────────────────────────┘

  After response: 3–4 follow-up chips update below the block.

[SMALL DISCLAIMER — below response area]
  Geist Mono 11px · --color-text-muted
  "Answers are AI-generated from a curated knowledge base.
   May not reflect the most recent updates."
```

### Content — What the Subtext Communicates

The subtext removes all ambiguity before interaction begins. It lists specifically what the assistant can do:
- Explain projects
- Explain technical decisions
- Discuss experience
- Discuss certifications
- Describe current learning

This is not a marketing claim — it is a scope declaration. The visitor knows exactly what to ask.

### Layout

**Desktop:**
- Search input: full 12-column width, constrained to content rail
- Suggestion chips: horizontal row, left-aligned, `--space-3` (12px) gaps
- Response area: full 12-column width, below input
- Citation row and related links: within the response block, full width
- Follow-up chips: below the response block, same chip style

**Mobile:**
- Same structure, single column
- Suggestion chips wrap to 2 columns if needed
- ↵ submit label appears below the input on focus (visible without keyboard obscuring it)

### The Ambient Moment
When the AI is processing, the background of this section produces a single, slow pulse of the ambient glow: `rgba(91, 168, 212, 0.04) → 0.08 → 0.04` over `1.5s`. Once. This is the only place ambient motion occurs outside the hero — and it is tied to a real processing event, not a loop. The search icon within the input also rotates gently during processing.

### What It Must Not Be
- Not a multi-turn conversation UI (no chat bubbles, no message history)
- Not a general-purpose AI (every response is scoped to the knowledge base)
- Not styled like a product or widget — it uses the same design system tokens as every other section
- Not a chatbot with a greeting — it is a search interface that waits

### Transition Into Section 07
After the Knowledge Core, the background returns from `--color-abyss` to `--color-void`. A simple hairline separator marks the boundary. This is the third hairline — completing the punctuation rhythm.

---

## Section 07 — Contact

### Purpose
Make it effortless to reach you. This section should take 5 seconds to read and 10 seconds to act on.

### Emotional Goal
Warmth and directness. The section should feel like the end of a good conversation — not a form to fill out.

### Content Hierarchy
```
[STAMP LABEL]   — "GET IN TOUCH"

[SECTION HEADING] — "Let's talk."
                    (Or: "I'd like to hear from you." — something human.)

[SUBTEXT]       — 1–2 lines. What you're looking for.
                  "Open to internships, research collaborations, and
                   conversations about AI systems and security engineering."

[CONTACT OPTIONS]
  Primary:   email address — displayed in full, as a link
             On click: copies to clipboard, shows "Copied" tooltip
             Color: --color-ice-signal (the one accent in this section)

  Secondary: LinkedIn profile link — ghost button
  Secondary: GitHub profile link — ghost button

  [No contact form. Forms create friction. An email link is direct.]
```

### Layout

**Desktop:**
- All content centered (this is the only section where centered alignment is used — it marks the ending of the narrative, a closing beat)
- Email address at `--text-heading-sm` (28px), not body size — it should feel like an invitation, not fine print

**Mobile:**
- Same centered alignment
- Email at 22px

### Interaction
- Email click: copy to clipboard + tooltip "Copied ✓" fades in below the email address — 150ms in, 1.8s hold, 300ms out
- `--color-ice-signal` fires on the email address only — the last time the accent appears on the page
- Social links: standard ghost button hover (underline slide-in)

### Transition Into Footer
No separator. The Contact section blends directly into the footer — they share the same visual register.

---

## Footer

### Purpose
A quiet signature. Not a sitemap, not a legal block, not a social media cluster.

### Content
```
Left:   Your name in Geist Mono 11px · --color-slate-mist (stamp style)
        Under it: one short personal line in Geist Mono 11px
        Example: "Building systems that think carefully."
        Or coordinates: "23.6345° N, 102.5528° W" (wherever is meaningful to you)

Right:  © [Year] · [Your Name]
        One ghost link: "Back to top ↑"
```

### Layout
- Full width, `--color-abyss` background
- 40px vertical padding
- Content left and right within the content rail

---

## Animation Sequence — Full Page

This table shows every animation on the page in order. No two major animations overlap. Each has a reason.

| Trigger | Element | Animation | Duration | Why |
|---------|---------|-----------|----------|-----|
| Page load | Nav | `opacity: 0 → 1` | 500ms | Nav exists before scroll begins |
| 200ms | Hero stamp | `translateY(16px) → 0` + fade | 500ms | First content read |
| 350ms | Hero name line 1 | `translateY(24px) → 0` + fade | 700ms | The name is the hero |
| 450ms | Hero name line 2 | `translateY(24px) → 0` + fade | 700ms | Stagger creates weight |
| 600ms | Hero subtext | `opacity: 0 → 1` | 500ms | Follows the name naturally |
| 750ms | Hero CTA | `opacity: 0 → 1` | 400ms | Last to arrive — ready to act |
| 900ms | Hero portrait | `opacity: 0 → 1` | 500ms | Arrives after the scene is set |
| Scroll: §02 enters | Section 02 content | `translateY(24px) → 0`, stagger 60ms | 500ms | Standard entrance |
| Scroll: §03 enters | Section heading | `translateY(24px) → 0` | 500ms | Standard entrance |
| Scroll: §03 card hover | Signal Trace SVG line | Draw from card to tech panel | 300ms | Signature interaction |
| Scroll: §05 enters | Section heading | Standard entrance | 500ms | — |
| 300ms after §05 | Skill tokens | Appear at 35ms intervals | ~1.8s total | Precision Reveal signature |
| Scroll: §06 enters | Section heading + input | Standard entrance | 500ms | — |
| §06 chip click | Selected chip ○ fills | Opacity pulse on dot | 200ms | Query confirmation |
| §06 AI query submitted | Background glow pulse | Opacity pulse × 1 | 1.5s | Processing feedback |
| §06 query in-flight | Search icon in input | Slow arc rotation | 800ms loop | Active retrieval signal |
| §06 response arrives | Response text | Character-by-character at 18ms | Varies | Retrieval feel |
| §06 text complete | Citation row + links | `opacity: 0 → 1` | 200ms | Source disclosure |
| §06 citations visible | Follow-up chips | `opacity: 0 → 1`, 100ms delay | 200ms | Navigation invitation |
| Scroll: §07 enters | Contact content | `translateY(24px) → 0` | 500ms | Final entrance |
| Email click | Clipboard tooltip | Fade in/hold/fade out | 150ms + 1.8s + 300ms | Confirmation |
| Resume nav click | Drawer + backdrop | `translateX(480px → 0)` + backdrop fade | 320ms | Panel entrance |
| Drawer close | Drawer + backdrop | `translateX(0 → 480px)` + backdrop fade | 220ms | Panel exit |
| Anchor navigate | Target section heading | Color flash `--color-ice-signal` | 150ms in, 600ms hold, 300ms out | "You are here" |
| Scroll past 400px | Back to top button | `opacity: 0 → 1` | 220ms | Navigation aid appears |
| Image enters viewport | LQIP placeholder | Blur fades as full image loads | 300ms | Smooth image reveal |

---

## Interaction Opportunities — Complete Map

| Section | Interaction | Type | Priority |
|---------|-------------|------|----------|
| Hero | Headline parallax on scroll | Atmospheric | Medium |
| Hero | Portrait parallax (0.15× speed) | Atmospheric | Low |
| Hero | Nav monogram: first letter → ice signal on hover | Microinteraction | Low |
| Hero | Star field: one slightly brighter star | Easter egg | Low |
| Work | Signal Trace on card hover | Signature | High |
| Work | Card lift + shadow on hover | Standard | High |
| Work | Tech panel updates on hover change | Standard | High |
| Work | "Read Case Study →" routes to case study page | Navigation | High |
| Case Study | Reading Depth (body copy attention tracking) | Atmospheric | Medium |
| Case Study | Scroll Depth Indicator (section markers) | Navigation | Medium |
| Case Study | Code block copy-to-clipboard | Utility | Medium |
| Case Study | Back to top button | Utility | Medium |
| Case Study | Back to Projects breadcrumb: portfolio name → `/`, "← All Projects" → `/#work` | Navigation | High |
| Skills | Precision Reveal on enter | Signature | High |
| Knowledge Core | Search input focus: border → ice signal | Microinteraction | High |
| Knowledge Core | Chip click: fills input + submits | Utility | High |
| Knowledge Core | Chip ○ fill animation on select | Microinteraction | Medium |
| Knowledge Core | Processing: search icon rotation | Microinteraction | High |
| Knowledge Core | Processing: ambient glow pulse | Atmospheric | Medium |
| Knowledge Core | Response: character render at 18ms | Microinteraction | High |
| Knowledge Core | Citations fade in after text completes | Microinteraction | High |
| Knowledge Core | Related project links → case study pages | Navigation | High |
| Knowledge Core | Follow-up chips fade in after citations | Utility | High |
| Nav | "Resume" link opens drawer | Navigation | High |
| Resume Drawer | Slides in from right (320ms spring) | Component | High |
| Resume Drawer | Backdrop click or Escape to close | Component | High |
| Resume Drawer | Download PDF / Open Fullscreen actions | Utility | High |
| Contact | Email: copy to clipboard + tooltip | Utility | High |
| Contact | Social links: underline slide-in | Standard | Medium |
| All sections | Entrance: fade-up on viewport entry | Standard | High |
| All sections | Active nav link updates on scroll | Utility | High |
| All sections | Anchor target: heading color flash | Utility | Medium |
| All text links | Color → ice signal on hover | Standard | High |
| All images | LQIP blur-up on load | Premium | Medium |
| Async ops | Top-of-viewport progress bar | Utility | High |
| Global | Back to top (after 400px scroll) | Utility | Medium |
| Global | Focus states: ice signal outline on all interactive elements | Accessibility | High |
| Global | Skip link (first Tab stop) | Accessibility | High |

---

## Reusable Components

| Component | Used In | Design System Reference |
|-----------|---------|------------------------|
| Stamp label | Every section, case studies | §5, Rule 4 in §21 |
| Section heading | Every section, case studies | Type scale `--text-heading` |
| Project card | §03 Work | §13 |
| Minimal card | §02 Signal (principles), §04 Approach | §13 |
| Primary button | Hero CTA, §07 Contact, Nav, resume drawer | §12 |
| Secondary button | Hero (ghost), resume drawer | §12 |
| Ghost button | Cards (Read Case Study →), nav links, social links, follow-up chips | §12 |
| Technology tag | §03 Work cards, §05 Stack | §13 |
| Section entrance animation | Every section | §10 |
| Hairline separator | §02/§04/§07 boundaries | §9 |
| Tooltip | Email copy, tech tag descriptions, `Copied ✓` | §20 |
| Knowledge Core search input | §06 only | §23 |
| Suggestion chip | §06 initial + follow-up chips | §23 |
| Case study page | /work/[project-slug] routes | §24 |
| Resume drawer | Nav trigger → right-edge panel | §25 |
| Skeleton loader | Any async content area | §26 |
| Progress bar | Top viewport, async operations | §26 |
| LQIP blur placeholder | Every `<img>` below fold | §26 |
| Back to top button | Fixed bottom-right, after 400px scroll | §26 |
| Skip link | First Tab stop, every page | §26 |

---

## Desktop Layout Sketches

### Hero
```
┌──────────────────────────────────────────────────────────────────────────┐
│ [NAV: Name ·· Work  Signal  Stack  Resume  Ask  Contact  [☽] [Hire Me]] │
│                                                                           │
│  [ambient: star field + radial glow + drift particles + radar pulse]     │
│                                                                           │
│  COLS 1–7                              COLS 9–12                         │
│                                                                           │
│  BUILDING SINCE ——                     ┌──────────────────┐             │
│                                        │                  │             │
│  YOUR NAME                             │                  │             │
│  Building intelligent systems          │   [PORTRAIT]     │             │
│  at the intersection of                │   3:4 ratio      │             │
│  AI and security.                      │   12px radius    │             │
│                                        │   1px border     │             │
│  A brief qualifier about where         │                  │             │
│  your head is right now.               │                  │             │
│                                        └──────────────────┘             │
│  [View My Work]  Read About Me →                                         │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

### Work — Signal Trace Active
```
┌─────────────────────────────────────────────────────────────────────────┐
│  SELECTED WORK                                                           │
│  Projects that taught me something.                                     │
│                                                                         │
│  ┌─────────────────────────────────┐       ┌──────────────────────┐    │
│  │ 2024 · AI/ML                    │╌╌╌╌╌> │ TECHNOLOGIES         │    │
│  │                                 │  SVG  │ ─────────────────    │    │
│  │ AI SOC Analyst                  │  line │ PyTorch              │    │
│  │ Autonomous threat detection...  │       │ LangChain            │    │
│  │                                 │       │ OpenAI API           │    │
│  │ PYTORCH  LANGCHAIN  OPENAI      │       │ Supabase             │    │
│  │ Read Case Study →               │       │ FastAPI              │    │
│  └─────────────────────────────────┘       └──────────────────────┘    │
│  ┌─────────────────────────────────┐                                   │
│  │ 2023 · SECURITY                 │                                   │
│  │                                 │                                   │
│  │ Network Intrusion Detector      │                                   │
│  │ Read Case Study →               │                                   │
│  └─────────────────────────────────┘                                   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Knowledge Core
```
┌─────────────────────────────────────────────────────────────────┐
│  KNOWLEDGE CORE                                                  │
│  Ask My AI                                                       │
│                                                                  │
│  Curious about my work? Rather than reading every project,      │
│  ask my AI assistant. It can explain projects, technical        │
│  decisions, experience, certifications, and current learning.   │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🔍  Ask about my projects, experience...            ↵  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ○ AI SOC Analyst   ○ RAG Project   ○ Resume   ○ Skills        │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ The AI SOC Analyst is a real-time threat detection      │   │
│  │ system that uses LangChain and GPT-4o-mini to...       │   │
│  │                                                         │   │
│  │ FROM: AI SOC Analyst · Resume                          │   │
│  │                                                         │   │
│  │ → View AI SOC Analyst   → View RAG Project             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ○ How does the RAG work?  ○ Compare your AI projects           │
│  ○ What are you learning?                                        │
│                                                                  │
│  Answers are AI-generated from a curated knowledge base.        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Mobile Layout Notes

| Section | Desktop | Mobile |
|---------|---------|--------|
| Hero | Two-column split: text cols 1–7, portrait cols 9–12 | Single column, portrait between descriptor and CTA |
| Signal | 7-col text + 5-col empty | Full width |
| Work | 2-up card grid + Signal Trace | 1-up card, no tech panel (tap to expand stack inline) |
| Approach | 2-up principle blocks | 1-up, hairline top separator |
| Stack | 4-up skill groups | 2-up groups |
| Knowledge Core | Spotlight input inline with ↵ label + chips row | Input full-width, chips wrap 2-col |
| Contact | Centered | Centered |
| Resume Drawer | 480px right-edge panel | Full width (`100vw`) |
| Case Study pages | 7-col editorial body copy, 2-up gallery | Full width, 1-up gallery |

### Mobile-Specific Interactions
- **Signal Trace:** Disabled on mobile. The tech panel that appears on desktop via SVG trace is replaced with an inline accordion. A "Show Stack ↓" ghost link sits below the technology tags on each card — tapping it expands the full stack list in-place (same content as the desktop tech panel, 220ms ease). Tapping the "Read Case Study →" ghost button routes to the case study page. These are two separate touch targets; they do not conflict.
- **Precision Reveal:** Retained as-is — works equally well on mobile.
- **Hero parallax:** Disabled. The hero is static on mobile. Portrait parallax (0.15×) also disabled.
- **Ambient effects:** Star field at 60 dots (retained). Drift particles and radar pulse disabled.
- **Knowledge Core chips:** Wrap to a 2-column grid if all four don't fit on one row.
- **Scroll Depth Indicator:** Hidden on mobile (`display: none` below `md` breakpoint).
- **Reading Depth:** Disabled on touch devices — no hover event available.
- **Back to top button:** Retained on mobile.
- **Resume Drawer:** Full viewport width. Drawer header and action buttons use the same design, scaled to full width.

---

## Proposed Additional Signature Interactions

Two additional interactions, each subtle, each aligned with "Precision at Rest":

---

### Additional Interaction A: Reading Depth

**Location:** Any section with body copy (Signal, Approach, Knowledge Core response)
**Trigger:** Mouse position within a text block

**Behavior:** As the mouse cursor moves into a paragraph's horizontal range, that paragraph's opacity increases from `0.75` to `1.0` over 150ms. Adjacent paragraphs dim slightly to `0.7`. When the mouse leaves the text block entirely, all paragraphs return to `0.85` over 300ms.

**Why it's memorable:** The page seems to follow your attention. It does not feel like a hover state — it feels like the text is *aware* of being read. The effect is barely noticeable, but its absence would be noticed.

**Why it's aligned with the design concept:** Precision at Rest — the system is calibrated, waiting, responsive. It responds to presence, not click. Like a sensor measuring attention.

**Rules:**
- Opacity range: `0.7 (dimmed) → 0.85 (default) → 1.0 (active)` — never below 0.7
- Transition: `150ms ease-out` in, `300ms ease-out` out
- Must not apply to headings or stamp labels — only body copy paragraphs
- `prefers-reduced-motion: reduce` disables entirely — all paragraphs at `opacity: 1`
- Disabled on touch devices — no hover event available

---

### Additional Interaction B: Scroll Depth Indicator

**Location:** Fixed to the right edge of the viewport, full page height
**Trigger:** Passive scroll position tracking

**Behavior:** A `1.5px` wide, `100svh` tall track in `--color-slate-edge` sits fixed at the right edge (12px from viewport edge). A `--color-ice-signal` filled segment traces scroll progress from top to bottom — like a timeline marking how far the story has been read.

At the position of each section, a tiny `4px × 4px` square marker appears on the track in `--color-slate-trim`. When the visitor is in that section, the marker fills to `--color-ice-signal`.

**Why it's memorable:** It communicates that the page has a deliberate length and structure — it is not infinite scroll, it is a document. The visitor always knows how far they are and how much remains. For a portfolio with 7 sections of substance, this removes anxiety about commitment.

**Why it's aligned with the design concept:** The track looks like a sensor readout — a measurement, not a decoration. The tiny section markers look like calibration marks on a precision instrument. It is genuinely useful and quietly distinctive.

**Rules:**
- Track width: `1.5px`
- Active segment: filled, animated continuously as scroll position changes — `transition: height 80ms linear`
- Section markers: 4 per side, `4px × 4px`, `--color-slate-trim` by default, `--color-ice-signal` when active
- Hidden on mobile (`display: none` below `md` breakpoint) — too small to be useful and takes up viewport width on small screens
- Hidden entirely if viewport height < 600px
- `aria-hidden="true"` — purely visual, carries no information for screen readers

---

## Content Writing Guidelines

These rules govern every word on the portfolio. The design system governs the visual — these govern the voice.

1. **No "I am passionate about."** Replace with a specific claim or observable fact.
2. **No "experience in."** Replace with "built", "designed", "deployed", "broke", "fixed".
3. **No technology lists without context.** Every technology should appear near a project that used it.
4. **Project descriptions answer three questions:** What problem? What approach? What did you learn or discover?
5. **The headline is not your title.** "Computer Science Student" is not a headline. Your work, your intersection, your direction — that is the headline.
6. **The footer line is not copyright.** Write one sentence that is true, specific, and yours. Not "© 2025 Your Name." That belongs on the right. The left is where you get to say something.
7. **The Knowledge Core system prompt is the most important writing on the page.** It controls what every recruiter who clicks a suggestion chip will read. Write it with care: specific, honest, direct, without filler.

---

*The information architecture is complete when a visitor can close the tab, and explain to someone else what you build, why, and how you think — without having memorized your resume.*
