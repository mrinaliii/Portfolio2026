import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Tooltip.module.css';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  /** Position relative to trigger. Defaults to 'top'. */
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Tooltip with DS-specified lifecycle:
 *   Show delay:  150ms  (--duration-tooltip-show)
 *   Hold:       1800ms  (--duration-tooltip-hold)
 *   Hide delay:  300ms  (--duration-tooltip-hide)
 *
 * Accessible: tooltip element has role="tooltip", trigger has aria-describedby.
 * DS Section 18.
 */
export function Tooltip({ content, children, placement = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [id] = useState(() => `tooltip-${Math.random().toString(36).slice(2, 9)}`);
  const showTimer = useRef<ReturnType<typeof setTimeout>>();
  const holdTimer = useRef<ReturnType<typeof setTimeout>>();
  const hideTimer = useRef<ReturnType<typeof setTimeout>>();

  const clearAll = useCallback(() => {
    clearTimeout(showTimer.current);
    clearTimeout(holdTimer.current);
    clearTimeout(hideTimer.current);
  }, []);

  const show = useCallback(() => {
    clearAll();
    showTimer.current = setTimeout(() => {
      setVisible(true);
      holdTimer.current = setTimeout(() => {
        setVisible(false);
      }, 1800); // --duration-tooltip-hold
    }, 150); // --duration-tooltip-show
  }, [clearAll]);

  const hide = useCallback(() => {
    clearAll();
    hideTimer.current = setTimeout(() => {
      setVisible(false);
    }, 300); // --duration-tooltip-hide
  }, [clearAll]);

  useEffect(() => clearAll, [clearAll]);

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={visible ? id : undefined}>{children}</span>
      {visible && (
        <span
          id={id}
          role="tooltip"
          className={[styles.tooltip, styles[placement]].join(' ')}
        >
          {content}
        </span>
      )}
    </span>
  );
}
