import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Initializes Lenis smooth scrolling for the whole document.
 * Mounted once at the app root. Skips entirely when the user has
 * prefers-reduced-motion enabled, leaving native scroll behavior intact.
 */
export function useLenis(): void {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, []);
}
