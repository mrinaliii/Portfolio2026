import styles from './AmbientGlow.module.css';

interface AmbientGlowProps {
  isActive: boolean;
}

/**
 * AmbientGlow — a single slow glow pulse during Knowledge Core loading state.
 * opacity(rgba(91,168,212,0.04) → 0.08 → 0.04) over 1.5s, once, not a loop.
 * Only renders when `isActive` is true.
 * DS Section 10 microinteractions, IA Section 06.
 */
export function AmbientGlow({ isActive }: AmbientGlowProps) {
  if (!isActive) return null;

  return (
    <div
      className={styles.glow}
      aria-hidden="true"
    />
  );
}
