import { useEffect, useState } from 'react';

/**
 * Returns the current window.scrollY, updated via a passive scroll listener
 * gated through requestAnimationFrame to avoid layout thrashing.
 *
 * Consumers:
 *  - Nav (opacity increase past 120px)
 *  - BackToTop (visibility past 400px)
 */
export function useScrollY(): number {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    // Initialise with current position (page may already be scrolled on mount)
    setScrollY(window.scrollY);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollY;
}
