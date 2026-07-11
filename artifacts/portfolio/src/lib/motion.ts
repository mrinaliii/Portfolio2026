import type { Transition, Variants } from 'framer-motion';

/**
 * Shared Framer Motion primitives — single source of truth for entrance,
 * stagger, and hover animation timing so every component feels consistent.
 * Distances/durations here are intentionally independent from the CSS
 * design tokens (tokens.css) — they drive JS-composed motion only and do
 * not affect layout, color, or typography.
 */

export const ENTRANCE_TRANSITION: Transition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
};

/** Fade + slide-up entrance — opacity 0→1, y 40→0. Used for whole sections. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: ENTRANCE_TRANSITION },
};

/** Softer variant for elements nested inside an already-revealed section. */
export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

/** Opacity + slight scale — used for images. */
export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/** Stagger container — reveals children in sequence. */
export const staggerContainer = (stagger = 0.12, delayChildren = 0.1): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

/** Card hover — lift, scale, stronger shadow (shadow handled via CSS class toggle). */
export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -8,
    scale: 1.02,
    transition: { type: 'spring', stiffness: 300, damping: 22 } as Transition,
  },
};

/** Button hover — gentle scale with a spring settle. */
export const buttonHover = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.96 },
  transition: { type: 'spring', stiffness: 400, damping: 17 } as Transition,
};

/** Social/icon hover — scale + slight rotation. */
export const iconHover = {
  whileHover: { scale: 1.15, rotate: 6 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 400, damping: 15 } as Transition,
};

/** Viewport options for one-shot scroll reveals. */
export const revealViewport = { once: true, margin: '-80px' } as const;
