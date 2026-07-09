import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

const CYCLE_MS = 8000; // 8-second cycle (DS Section 10a)

/**
 * Single expanding ring from off-center — nearly invisible (opacity 0 → 0.04 → 0).
 * 8-second cycle. Disabled on mobile and prefers-reduced-motion.
 * Origin: approximately 75% width, 50% height (right-side, mid height).
 * DS Section 10a.
 */
export function RadarPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const animRef = useRef<number>();
  const startRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (reducedMotion) return;
    // Disable on mobile
    if (window.innerWidth < 640) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function draw(timestamp: number) {
      if (!canvas || !ctx) return;

      if (!startRef.current) startRef.current = timestamp;
      const elapsed = (timestamp - startRef.current) % CYCLE_MS;
      const t = elapsed / CYCLE_MS; // 0 → 1 over 8s

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Opacity: peaks at t=0.4 (opacity 0.04), returns to 0 at t=1
      // Eased triangle: 0 → 0.04 → 0
      let opacity: number;
      if (t < 0.4) {
        opacity = (t / 0.4) * 0.04;
      } else {
        opacity = ((1 - t) / 0.6) * 0.04;
      }

      // Ring expands from small → large over the cycle
      const maxRadius = Math.max(canvas.width, canvas.height) * 0.7;
      const radius = t * maxRadius;

      // Off-center origin: 75% width, 50% height
      const cx = canvas.width * 0.75;
      const cy = canvas.height * 0.5;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(91, 168, 212, ${opacity})`; // --color-ice-signal raw
      ctx.lineWidth = 1;
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    animRef.current = requestAnimationFrame(draw);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}
