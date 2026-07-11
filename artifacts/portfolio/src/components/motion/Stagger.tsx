import React, { createElement, forwardRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps, useReducedMotion } from 'framer-motion';
import { fadeUpSmall, revealViewport, staggerContainer } from '../../lib/motion';

type StaggerTag = 'div' | 'ul' | 'section';

interface StaggerGroupProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  as?: StaggerTag;
  stagger?: number;
  delayChildren?: number;
  children: ReactNode;
}

/**
 * Stagger container — reveals its motion children (StaggerItem) in sequence
 * once when it enters the viewport. Used for project card grids, skill
 * groups, and any list of items that should cascade in.
 */
export function StaggerGroup({
  as = 'div',
  stagger = 0.12,
  delayChildren = 0.1,
  children,
  className,
  ...props
}: StaggerGroupProps) {
  const reducedMotion = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = motion[as] as any;

  if (reducedMotion) {
    // Narrow to the concrete HTML-only union so TS doesn't consider SVG elements.
    type HtmlTag = 'div' | 'ul' | 'section';
    const Tag = as as HtmlTag;
    return <Tag className={className} {...(props as React.HTMLAttributes<HTMLElement>)}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer(stagger, delayChildren)}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemTag = 'div' | 'li' | 'article';

interface StaggerItemProps extends Omit<HTMLMotionProps<'div'>, 'ref' | 'children'> {
  as?: StaggerItemTag;
  children: ReactNode;
}

/** A single item inside a StaggerGroup — fades + slides up on its turn. */
export const StaggerItem = forwardRef<HTMLElement, StaggerItemProps>(function StaggerItem(
  { as = 'div', children, className, ...props },
  ref,
) {
  const reducedMotion = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = motion[as] as any;

  if (reducedMotion) {
    return createElement(as, { ref, className, ...(props as Record<string, unknown>) }, children);
  }

  return (
    <MotionTag ref={ref} className={className} variants={fadeUpSmall} {...props}>
      {children}
    </MotionTag>
  );
});
