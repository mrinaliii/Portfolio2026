import { useCallback, useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Reading Depth interaction — IA Section 07 / DS Section 10 microinteractions.
 *
 * As the mouse moves within the container, the paragraph the cursor hovers
 * receives `opacity: 1.0` while siblings dim to `0.7`. When the cursor
 * leaves, all paragraphs return to `0.85`.
 *
 * Rules:
 * - Applies ONLY to `<p>` elements inside the ref container
 * - Disabled on touch devices (no hover event)
 * - Disabled when prefers-reduced-motion is active
 * - Opacity range: 0.7 (dimmed) → 0.85 (default) → 1.0 (active)
 * - Transitions: 150ms ease-out in, 300ms ease-out out
 *
 * Usage:
 *   const containerRef = useReadingDepth<HTMLDivElement>();
 *   return <div ref={containerRef}>...</div>
 */
export function useReadingDepth<T extends HTMLElement>() {
  const containerRef = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  // Detect touch device — disable on touch
  const isTouchDevice = useCallback(() => {
    return window.matchMedia('(hover: none)').matches;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (reducedMotion) return;
    if (isTouchDevice()) return;

    const paragraphs = Array.from(container.querySelectorAll('p'));
    if (paragraphs.length === 0) return;

    function setDefaultOpacity() {
      paragraphs.forEach((p) => {
        (p as HTMLElement).style.opacity = '0.85';
        (p as HTMLElement).style.transition = 'opacity 300ms ease-out';
      });
    }

    function setFullOpacity() {
      paragraphs.forEach((p) => {
        (p as HTMLElement).style.opacity = '1';
        (p as HTMLElement).style.transition = 'opacity 300ms ease-out';
      });
    }

    function onMouseMove(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const activeParagraph = target.closest('p');

      if (!activeParagraph || !paragraphs.includes(activeParagraph)) {
        // Mouse is not over a paragraph
        setDefaultOpacity();
        return;
      }

      paragraphs.forEach((p) => {
        if (p === activeParagraph) {
          p.style.opacity = '1';
          p.style.transition = 'opacity 150ms ease-out';
        } else {
          p.style.opacity = '0.7';
          p.style.transition = 'opacity 150ms ease-out';
        }
      });
    }

    function onMouseLeave() {
      setFullOpacity();
    }

    // Set initial default state
    setDefaultOpacity();

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      // Reset opacity on cleanup
      paragraphs.forEach((p) => {
        (p as HTMLElement).style.opacity = '';
        (p as HTMLElement).style.transition = '';
      });
    };
  }, [reducedMotion, isTouchDevice]);

  return containerRef;
}
