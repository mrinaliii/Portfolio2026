import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './StampLabel.module.css';

interface StampLabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
}

/**
 * Geist Mono stamp — section labels, role/category tags, date stamps.
 * Always uppercase. Always 11px. Always --color-text-muted.
 * Never used for body copy or interactive labels (per DS Section 7).
 */
export function StampLabel({ children, className, ...props }: StampLabelProps) {
  return (
    <span
      className={[styles.stamp, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  );
}
