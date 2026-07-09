import { useEffect, useState } from 'react';
import styles from './ScrollDepthIndicator.module.css';

interface ScrollDepthIndicatorProps {
  /** Section IDs to mark on the track */
  sectionIds: string[];
}

/**
 * Thin right-edge progress track showing how far down the page the visitor has scrolled.
 * Section markers appear at each section's proportional position on the track.
 * Hidden on mobile. aria-hidden — purely decorative.
 * DS Section 14, TIP Milestone 2.
 */
export function ScrollDepthIndicator({ sectionIds }: ScrollDepthIndicatorProps) {
  const [progress, setProgress] = useState<number>(0);
  const [markers, setMarkers] = useState<Array<{ id: string; percent: number }>>([]);

  // Calculate scroll progress
  useEffect(() => {
    const onScroll = () => {
      const scrollEl = document.documentElement;
      const max = scrollEl.scrollHeight - scrollEl.clientHeight;
      if (max <= 0) return;
      setProgress(Math.min(100, (window.scrollY / max) * 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Calculate section marker positions after mount (DOM must be ready)
  useEffect(() => {
    const calculate = () => {
      const max =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (max <= 0) return;

      const computed = sectionIds
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          const top = el.getBoundingClientRect().top + window.scrollY;
          return { id, percent: Math.min(100, (top / max) * 100) };
        })
        .filter((m): m is { id: string; percent: number } => m !== null);

      setMarkers(computed);
    };

    // Delay until layout is settled
    const t = setTimeout(calculate, 200);
    return () => clearTimeout(t);
  }, [sectionIds]);

  return (
    <div className={styles.track} aria-hidden="true">
      {/* Fill */}
      <div className={styles.fill} style={{ height: `${progress}%` }} />
      {/* Section markers */}
      {markers.map(({ id, percent }) => (
        <div
          key={id}
          className={styles.marker}
          style={{ top: `${percent}%` }}
        />
      ))}
    </div>
  );
}
