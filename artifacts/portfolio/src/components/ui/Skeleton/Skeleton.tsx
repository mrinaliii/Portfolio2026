import { type CSSProperties } from 'react';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
  /** border-radius override — defaults to --radius-sm */
  rounded?: boolean;
}

/**
 * Shimmer loading placeholder.
 * Width/height default to 100% of their container.
 * Uses the shimmer keyframe from animations.css.
 */
export function Skeleton({ width, height, className, rounded = false }: SkeletonProps) {
  const style: CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={[styles.skeleton, rounded && styles.rounded, className]
        .filter(Boolean)
        .join(' ')}
      style={style}
      aria-hidden="true"
    />
  );
}
