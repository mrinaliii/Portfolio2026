import { ArrowUp } from 'lucide-react';
import { useScrollY } from '../../../hooks/useScrollY';
import { scrollToTop } from '../../../lib/scroll';
import styles from './BackToTop.module.css';

const TRIGGER_PX = 400;

/**
 * Appears after 400px scroll. Smooth-scrolls to the top of the page.
 * Keyboard accessible; aria-label describes the action.
 * DS Section 21.
 */
export function BackToTop() {
  const scrollY = useScrollY();
  const visible = scrollY > TRIGGER_PX;

  return (
    <button
      className={[styles.button, visible && styles.visible].filter(Boolean).join(' ')}
      onClick={scrollToTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp size={18} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
