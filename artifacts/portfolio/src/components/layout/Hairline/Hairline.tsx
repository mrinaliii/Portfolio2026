import { type HTMLAttributes } from 'react';
import styles from './Hairline.module.css';

interface HairlineProps extends HTMLAttributes<HTMLHRElement> {
  className?: string;
}

/**
 * 1px horizontal separator in --color-border.
 * Used below Signal section and between major content blocks.
 * DS Section 8.
 */
export function Hairline({ className, ...props }: HairlineProps) {
  return (
    <hr
      className={[styles.hairline, className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}
