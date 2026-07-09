import { type ElementType, type HTMLAttributes, type ReactNode } from 'react';
import styles from './Container.module.css';

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Max-width content rail — 1120px, centered, responsive side padding.
 * Use as a wrapper inside section elements, not as the section itself.
 * DS Section 8 grid system.
 */
export function Container({
  children,
  as: Tag = 'div',
  className,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={[styles.container, className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </Tag>
  );
}
