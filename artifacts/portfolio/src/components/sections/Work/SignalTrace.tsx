import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import styles from './SignalTrace.module.css';

interface SignalTraceProps {
  fromRef: React.RefObject<HTMLElement | null>;
  toRef: React.RefObject<HTMLElement | null>;
  isActive: boolean;
}

/**
 * Signal Trace — Primary Signature Interaction (DS Section 10b).
 * A single SVG <line> that draws from the hovered project card to the TechPanel.
 * Draws on hover (300ms), fades on card change (200ms), re-draws to new card.
 * Disabled on mobile and prefers-reduced-motion.
 * The SVG is fixed-position, full-viewport, pointer-events:none.
 */
export function SignalTrace({ fromRef, toRef, isActive }: SignalTraceProps) {
  const reducedMotion = useReducedMotion();
  const lineRef = useRef<SVGLineElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animRef = useRef<number>();

  useEffect(() => {
    if (reducedMotion) return;
    if (!isActive) return;

    function updateLine() {
      const from = fromRef.current;
      const to = toRef.current;
      const line = lineRef.current;
      if (!from || !to || !line) return;

      const fromRect = from.getBoundingClientRect();
      const toRect = to.getBoundingClientRect();

      // Draw from the right edge of the card to the left edge of the panel, mid-height
      const x1 = fromRect.right;
      const y1 = fromRect.top + fromRect.height * 0.45;
      const x2 = toRect.left;
      const y2 = toRect.top + toRect.height * 0.3;

      line.setAttribute('x1', String(x1));
      line.setAttribute('y1', String(y1));
      line.setAttribute('x2', String(x2));
      line.setAttribute('y2', String(y2));
    }

    // RAF loop while active — keeps line synced with scroll/resize
    function loop() {
      updateLine();
      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isActive, fromRef, toRef, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <svg
      ref={svgRef}
      className={[styles.svg, isActive && styles.active].filter(Boolean).join(' ')}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    >
      <line
        ref={lineRef}
        className={styles.line}
        strokeLinecap="round"
        x1="0"
        y1="0"
        x2="0"
        y2="0"
      />
    </svg>
  );
}
