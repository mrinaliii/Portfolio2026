import { useEffect, useRef, useState } from 'react';

/**
 * Tracks which section is currently in the viewport using IntersectionObserver.
 * Used by Nav to drive the active link indicator.
 *
 * rootMargin '-30% 0px -60% 0px' — a section is considered "active" when
 * it occupies the middle band of the viewport (between 30% from top and
 * 40% from bottom). This prevents rapid flicker at section boundaries.
 *
 * @param sectionIds  Array of data-section attribute values to observe.
 *                    Must match [data-section="…"] attributes on section elements.
 */
export function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  // Store ids in a ref so the effect doesn't re-run when the array reference changes
  const idsRef = useRef(sectionIds);
  idsRef.current = sectionIds;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section');
            if (id) setActiveId(id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    );

    idsRef.current.forEach((id) => {
      const el = document.querySelector(`[data-section="${id}"]`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return activeId;
}
