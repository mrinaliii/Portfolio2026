import { useCallback, useRef, useState } from 'react';

/**
 * One-shot viewport detection for single elements.
 * Once the element enters the viewport it stays "in view" and
 * the observer disconnects — animations triggered by this hook
 * fire exactly once.
 *
 * Returns a callback ref (not a RefObject) to avoid the React 18.3
 * "Unexpected ref object" warning when passing the ref to DOM elements.
 *
 * rootMargin default: '-80px' so sections begin animating just
 * before they are fully visible (per DS Section 10 specification).
 */
export function useInView<T extends Element = HTMLElement>(
  options?: IntersectionObserverInit,
): [React.RefCallback<T>, boolean] {
  const [inView, setInView] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      // Clean up previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }

      if (!node) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        },
        { rootMargin: '-80px', threshold: 0, ...options },
      );

      observer.observe(node);
      observerRef.current = observer;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return [ref, inView];
}
