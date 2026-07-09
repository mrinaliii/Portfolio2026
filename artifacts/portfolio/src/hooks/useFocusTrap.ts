import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), ' +
  'textarea:not([disabled]), select:not([disabled]), ' +
  '[tabindex]:not([tabindex="-1"])';

/**
 * Traps keyboard focus inside a container element when isActive is true.
 * On activation: moves focus to the first focusable element.
 * On Tab/Shift+Tab: cycles within the container.
 *
 * Used by: MobileNav, ResumeDrawer (Milestone 8).
 *
 * @param isActive  Enable/disable the trap. Typically tied to open state.
 * @returns         Ref to attach to the container element.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  isActive: boolean,
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const container = ref.current;
    const focusable = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((el) => !el.closest('[aria-hidden="true"]'));

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    // Move focus into the trap
    first?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown);
    return () => container.removeEventListener('keydown', handleKeyDown);
  }, [isActive]);

  return ref;
}
