import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './Tag.module.css';

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
}

/**
 * Technology / category tag.
 * Used on project cards and case study pages for tech labels.
 * DS Section 17.
 */
export function Tag({ children, className, ...props }: TagProps) {
  return (
    <span
      className={[styles.tag, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  );
}
