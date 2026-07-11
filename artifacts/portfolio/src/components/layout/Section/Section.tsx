import React, { type ReactNode } from 'react';
import { motion, type HTMLMotionProps, useReducedMotion } from 'framer-motion';
import { fadeUp, revealViewport } from '../../../lib/motion';
import styles from './Section.module.css';

interface SectionProps extends HTMLMotionProps<'section'> {
  id: string;
  children: ReactNode;
  /** ID of the heading element that labels this section for screen readers */
  labelledBy?: string;
  /**
   * Enable scroll-entrance animation (fadeUp on first viewport entry).
   * Disable for the Hero — it manages its own 7-element stagger.
   * @default true
   */
  animate?: boolean;
  className?: string;
}

/**
 * Semantic section wrapper.
 * - Sets data-section attribute for useActiveSection hook
 * - Applies scroll-margin-top so anchors clear the fixed nav
 * - Triggers a Framer Motion fade + slide-up entrance once on first
 *   viewport entry (disabled for Hero which manages its own stagger)
 *
 * DS Section 9 entrance animations.
 */
export function Section({
  id,
  children,
  labelledBy,
  animate = true,
  className,
  ...props
}: SectionProps) {
  const reducedMotion = useReducedMotion();

  if (!animate || reducedMotion) {
    return (
      <section
        id={id}
        data-section={id}
        aria-labelledby={labelledBy}
        className={[styles.section, className].filter(Boolean).join(' ')}
        {...(props as React.HTMLAttributes<HTMLElement>)}
      >
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      data-section={id}
      aria-labelledby={labelledBy}
      className={[styles.section, className].filter(Boolean).join(' ')}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeUp}
      {...props}
    >
      {children}
    </motion.section>
  );
}
