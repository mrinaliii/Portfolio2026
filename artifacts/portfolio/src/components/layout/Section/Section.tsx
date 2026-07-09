import { type HTMLAttributes, type ReactNode } from 'react';
import { useInView } from '../../../hooks/useInView';
import styles from './Section.module.css';

interface SectionProps extends HTMLAttributes<HTMLElement> {
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
 * - Triggers fadeUp entrance animation once on first viewport entry
 *   (disabled for Hero which manages its own stagger sequence)
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
  const [ref, inView] = useInView<HTMLElement>({ rootMargin: '-80px' });

  return (
    <section
      ref={animate ? ref : undefined}
      id={id}
      data-section={id}
      aria-labelledby={labelledBy}
      className={[
        styles.section,
        animate && styles.animatable,
        animate && inView && styles.inView,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </section>
  );
}
