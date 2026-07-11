import React, { type ReactNode } from 'react';
import { motion, type HTMLMotionProps, useReducedMotion } from 'framer-motion';
import { fadeUp, revealViewport } from '../../lib/motion';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  /** Renders a different element type (e.g. 'section', 'article'). */
  as?: 'div' | 'section' | 'article' | 'header';
  children: ReactNode;
}

/**
 * Reusable scroll-reveal wrapper — fade + slide-up (opacity 0→1, y 40→0),
 * fires once when the element enters the viewport.
 * Respects prefers-reduced-motion by rendering content statically visible.
 */
export function Reveal({ as = 'div', children, className, ...props }: RevealProps) {
  const reducedMotion = useReducedMotion();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MotionTag = motion[as] as any;

  if (reducedMotion) {
    const Tag = as;
    return <Tag className={className} {...(props as React.HTMLAttributes<HTMLElement>)}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={fadeUp}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
