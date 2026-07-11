import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps, useReducedMotion } from 'framer-motion';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
}

/**
 * Three variants — primary, secondary (outlined), ghost (text + underline).
 * All sizing comes from tokens.css. No inline styles.
 * Hover/tap add a subtle spring scale on top of the existing CSS transitions.
 * DS Section 16.
 */
export function Button({
  variant = 'primary',
  children,
  className,
  ...props
}: ButtonProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.button
      className={[styles.button, styles[variant], className].filter(Boolean).join(' ')}
      whileHover={reducedMotion ? undefined : { scale: 1.05 }}
      whileTap={reducedMotion ? undefined : { scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
