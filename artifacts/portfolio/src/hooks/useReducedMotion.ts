import { useEffect, useState } from 'react';

/**
 * Reactively reads prefers-reduced-motion.
 * Returns true when the user has requested reduced motion.
 * Components consume this to skip JS-driven transforms,
 * canvas animations, and parallax — the CSS rule in animations.css
 * handles CSS-based animation suppression independently.
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reducedMotion;
}
