import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './Grid.module.css';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

/**
 * 12-column CSS grid.
 * Use grid-column utilities or component-specific overrides for column spans.
 * Gap values come from tokens; responsive via CSS breakpoints.
 * DS Section 8.
 */
export function Grid({ children, className, ...props }: GridProps) {
  return (
    <div
      className={[styles.grid, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
