---
name: Lenis + scroll-behavior: smooth conflict
description: Documented incompatibility between Lenis smooth-scroll and CSS scroll-behavior: smooth on <html>, causing autoscroll jump on page load.
---

## Rule
Never set `scroll-behavior: smooth` on the `html` element when Lenis is active. Remove it entirely; Lenis owns all scroll interpolation.

**Why:** Lenis and native `scroll-behavior: smooth` both fight over scroll position. On page load, the conflict causes the page to auto-scroll down by several hundred pixels, pushing hero content out of the viewport. This is a documented Lenis incompatibility. `scroll-padding-top` on `<html>` is unaffected and safe to keep alongside Lenis.

**How to apply:** When adding Lenis to any project, audit `global.css` (or equivalent) for `scroll-behavior: smooth` on `html` or `*` and remove it. The `scrollToSection`/`scrollToTop` helpers must also respect `prefers-reduced-motion` — use `behavior: 'auto'` when `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true, since Lenis is skipped under that condition and native scroll takes over.
