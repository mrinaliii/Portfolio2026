import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
}

/**
 * 8–12 slowly drifting particles — ice-signal blue, 2px circles.
 * Max speed: 0.3px/frame. No trail, no glow, no mouse interaction.
 * Disabled on mobile (< 640px) and prefers-reduced-motion.
 * DS Section 10a.
 */
export function DriftParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const animRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Disable on mobile
    if (window.innerWidth < 640) return;
    // Disable on reduced-motion
    if (reducedMotion) return;

    let particles: Particle[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function initParticles() {
      if (!canvas) return;
      const count = Math.floor(Math.random() * 5) + 8; // 8–12
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.3, // –0.3 to 0.3 px/frame (DS max speed)
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.08 + 0.04, // 0.04–0.12 (barely perceptible)
      }));
    }

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas!.width;
        if (p.x > canvas!.width) p.x = 0;
        if (p.y < 0) p.y = canvas!.height;
        if (p.y > canvas!.height) p.y = 0;

        // Draw 2px circle (DS spec: 2px circle)
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(91, 168, 212, ${p.opacity})`; // --color-ice-signal raw value
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    }

    resize();
    initParticles();
    animate();

    const ro = new ResizeObserver(() => {
      resize();
      initParticles();
    });
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
