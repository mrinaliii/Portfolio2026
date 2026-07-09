import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
}

interface StarFieldProps {
  theme: 'dark' | 'light';
}

/**
 * Static star field — ~120 dots on desktop, ~60 on mobile.
 * Canvas rendered, aria-hidden.
 * Stars do NOT move or animate — their stillness is the point (DS Section 10a).
 *
 * In dark mode: starlight-white dots at varying opacities.
 * In light mode: ink-dark dots at very low opacity (barely perceptible).
 * Canvas re-renders when theme changes.
 */
export function StarField({ theme }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    }

    function generateStars(count: number): Star[] {
      if (!canvas) return [];
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1 + 0.5, // 0.5–1.5px radius
          opacity: Math.random() * 0.35 + 0.15, // 0.15–0.5 (DS spec)
        });
      }
      return stars;
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isMobile = canvas.offsetWidth < 640;
      const count = isMobile ? 60 : 120;

      // Regenerate on resize if count changes
      if (starsRef.current.length !== count) {
        starsRef.current = generateStars(count);
      }

      // Theme-aware star color
      const r = theme === 'dark' ? 220 : 12;
      const g = theme === 'dark' ? 232 : 24;
      const b = theme === 'dark' ? 245 : 37;

      starsRef.current.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.opacity})`;
        ctx.fill();
      });
    }

    // Generate initial stars
    starsRef.current = [];
    resize();
    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [theme]); // Re-render when theme changes

  // In reduced-motion mode, still render the static stars (they don't animate)
  if (reducedMotion && false) return null; // Stars are static — always render

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}
