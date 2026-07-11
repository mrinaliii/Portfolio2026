import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import styles from './NetworkCanvas.module.css';

// Node in the network graph
interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;      // base radius
  phase: number;  // pulse phase offset
  speed: number;  // pulse speed multiplier
}

// ─── tunables ────────────────────────────────────────────────────────────────
const NODE_COUNT      = 32;
const CONNECT_DIST    = 155;   // px — max distance for a drawn edge
const MOUSE_RADIUS    = 140;   // px — cursor influence radius
const MOUSE_STRENGTH  = 0.018; // repulsion per frame
const DRIFT_SPEED     = 0.38;  // base drift magnitude
const DAMPING         = 0.982;
const MIN_SPEED       = 0.08;
const JITTER          = 0.04;
const TICK            = 0.010; // time step per frame

// Ice-signal palette (matches --color-ice-signal* in tokens.css)
const C_CORE  = '115, 191, 227'; // #73bfe3 bright
const C_GLOW  = ' 91, 168, 212'; // #5ba8d4 base
// ─────────────────────────────────────────────────────────────────────────────

function makeNodes(w: number, h: number): Node[] {
  return Array.from({ length: NODE_COUNT }, () => ({
    x:     Math.random() * w,
    y:     Math.random() * h,
    vx:    (Math.random() - 0.5) * DRIFT_SPEED,
    vy:    (Math.random() - 0.5) * DRIFT_SPEED,
    r:     1.8 + Math.random() * 2.2,
    phase: Math.random() * Math.PI * 2,
    speed: 0.45 + Math.random() * 0.55,
  }));
}

export function NetworkCanvas() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const nodesRef    = useRef<Node[]>([]);
  const mouseRef    = useRef({ x: -9999, y: -9999 });
  const rafRef      = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Disable on mobile — canvas is hidden via CSS anyway, but skip RAF too
    if (window.innerWidth < 1024) return;
    if (reducedMotion) return;

    const ctx = canvas.getContext('2d')!;

    // ── sizing ──────────────────────────────────────────────────────────────
    const fit = () => {
      const parent = canvas.parentElement!;
      const { width, height } = parent.getBoundingClientRect();
      if (canvas.width === width && canvas.height === height) return;
      canvas.width  = Math.floor(width);
      canvas.height = Math.floor(height);
      nodesRef.current = makeNodes(canvas.width, canvas.height);
    };

    fit();

    const ro = new ResizeObserver(fit);
    ro.observe(canvas.parentElement!);

    // ── mouse tracking (section-level so text hover also drives the field) ──
    const section = canvas.closest('section') ?? document.body;
    const onMove = (e: Event) => {
      const rect = canvas.getBoundingClientRect();
      const me = e as MouseEvent;
      mouseRef.current = { x: me.clientX - rect.left, y: me.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);

    // ── render loop ─────────────────────────────────────────────────────────
    let t = 0;

    const frame = () => {
      const W = canvas.width;
      const H = canvas.height;
      if (!W || !H) { rafRef.current = requestAnimationFrame(frame); return; }

      ctx.clearRect(0, 0, W, H);
      t += TICK;

      const nodes = nodesRef.current;
      const { x: mx, y: my } = mouseRef.current;

      // ── physics ──
      for (const n of nodes) {
        // cursor repulsion
        const dx = n.x - mx;
        const dy = n.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 0) {
          const d    = Math.sqrt(d2);
          const mag  = (1 - d / MOUSE_RADIUS) * MOUSE_STRENGTH;
          n.vx += (dx / d) * mag;
          n.vy += (dy / d) * mag;
        }

        n.vx *= DAMPING;
        n.vy *= DAMPING;

        // keep nodes gently drifting
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd < MIN_SPEED) {
          n.vx += (Math.random() - 0.5) * JITTER;
          n.vy += (Math.random() - 0.5) * JITTER;
        }

        n.x += n.vx;
        n.y += n.vy;

        // soft boundary — wrap-around looks more organic than bouncing
        if (n.x < -20)  n.x = W + 20;
        if (n.x > W + 20) n.x = -20;
        if (n.y < -20)  n.y = H + 20;
        if (n.y > H + 20) n.y = -20;
      }

      // ── edges ──
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d >= CONNECT_DIST) continue;

          // proximity-based alpha, softer falloff
          const t0    = 1 - d / CONNECT_DIST;
          const alpha = t0 * t0 * 0.28;

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${C_GLOW}, ${alpha})`;
          ctx.lineWidth   = 0.7;
          ctx.stroke();
        }
      }

      // ── nodes ──
      for (const n of nodes) {
        const pulse   = 0.5 + 0.5 * Math.sin(t * n.speed + n.phase);
        const opacity = 0.28 + 0.38 * pulse;
        const radius  = n.r * (0.88 + 0.24 * pulse);
        const glowR   = radius * 5.5;

        // outer glow
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR);
        grd.addColorStop(0,   `rgba(${C_GLOW}, ${opacity * 0.55})`);
        grd.addColorStop(0.4, `rgba(${C_GLOW}, ${opacity * 0.18})`);
        grd.addColorStop(1,   `rgba(${C_GLOW}, 0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${C_CORE}, ${opacity})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden="true"
    />
  );
}
