import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import styles from './NetworkCanvas.module.css';

// ─── Node ─────────────────────────────────────────────────────────────────────
interface Node {
  // Physics position (drifts freely)
  x: number;
  y: number;
  vx: number;
  vy: number;
  // Rendering
  r: number;
  isHub: boolean;
  pulsePhase: number;
  pulseSpeed: number;
  opacity: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
// Ring layout: [count, fractional radius from center]
// Chosen so rings cover the pane evenly from center to edges.
const RINGS: [number, number][] = [
  [1,  0.00], // hub
  [7,  0.22], // inner ring
  [13, 0.45], // mid ring
  [15, 0.70], // outer ring
  [10, 0.92], // edge ring (slightly sparser — avoids crowding the boundary)
];

const HUB_R           = 5.5;
const HUB_CONNECT_R   = 200;  // hub connects further than regular nodes
const CONNECT_DIST    = 155;  // regular edge threshold
const EDGE_ALPHA_BASE = 0.32; // ~18% higher than 0.27 — more visible lines
const MOUSE_RADIUS    = 115;
const MOUSE_STRENGTH  = 0.020;
const DRIFT_SPEED     = 0.25; // slower = more cohesive
const DAMPING         = 0.987;
const MIN_SPEED       = 0.05;
const JITTER          = 0.030;
const BREATH_AMP      = 0.038; // ±3.8% expansion/contraction
const BREATH_SPEED    = 0.22;  // one breath every ~28s

// Read --color-ice-signal from CSS at runtime → theme-aware
function getAccentRGB(): [number, number, number] {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-ice-signal')
    .trim();
  if (raw.startsWith('#') && raw.length === 7) {
    return [
      parseInt(raw.slice(1, 3), 16),
      parseInt(raw.slice(3, 5), 16),
      parseInt(raw.slice(5, 7), 16),
    ];
  }
  return [91, 168, 212]; // fallback to dark-theme ice-signal
}

// Build nodes using a polar ring layout so coverage is hub-centric and even.
function makeNodes(W: number, H: number): Node[] {
  const cx = W * 0.5;
  const cy = H * 0.5;
  // Use the shorter half-dimension so nodes don't spill outside the pane
  const maxR = Math.min(W, H) * 0.47;

  const nodes: Node[] = [];

  for (const [count, frac] of RINGS) {
    const ringR = frac * maxR;
    for (let i = 0; i < count; i++) {
      const isHub = count === 1 && frac === 0;
      // Spread evenly around the ring, staggered per ring for less symmetry
      const baseAngle = (i / count) * Math.PI * 2;
      // Angular jitter — more for outer rings to break up symmetry
      const angJitter = isHub ? 0 : (Math.random() - 0.5) * (0.5 / (count * 0.1 + 1));
      const angle = baseAngle + angJitter;
      // Radial jitter — slight variation in ring radius
      const radJitter = isHub ? 0 : (Math.random() - 0.5) * maxR * 0.08;
      const r = ringR + radJitter;

      nodes.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * DRIFT_SPEED * (isHub ? 0.3 : 1),
        vy: (Math.random() - 0.5) * DRIFT_SPEED * (isHub ? 0.3 : 1),
        r: isHub ? HUB_R : 1.7 + Math.random() * 1.9,
        isHub,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: isHub ? 0.018 : 0.014 + Math.random() * 0.020,
        opacity: isHub ? 1 : 0.50 + Math.random() * 0.50,
      });
    }
  }
  return nodes;
}

/**
 * Refined neural network for the Signal "Why I Build" section.
 *
 * Architecture:
 *   • Polar ring layout — hub at center, 4 concentric rings outward
 *   • Hub connects up to 200 px (wider than regular 155 px) → never isolated
 *   • Edge alpha raised ~18% for better line visibility
 *   • Global "breathing" — canvas positions gently scale ±3.8% around center
 *   • Strong radial background glow for depth
 *   • Theme-aware: reads --color-ice-signal at every frame
 *   • Cursor repels nodes (section-level tracking so text hover drives it too)
 *   • Disabled on mobile (<1024 px) and prefers-reduced-motion
 */
export function NetworkCanvas() {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const nodesRef      = useRef<Node[]>([]);
  const mouseRef      = useRef({ x: -9999, y: -9999 });
  const rafRef        = useRef<number>(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;
    if (window.innerWidth < 1024) return;

    const ctx = canvas.getContext('2d')!;
    let t = 0;

    // ── Sizing ──────────────────────────────────────────────────────────────
    const fit = () => {
      const parent = canvas.parentElement!;
      const { width, height } = parent.getBoundingClientRect();
      if (
        canvas.width  === Math.floor(width) &&
        canvas.height === Math.floor(height)
      ) return;
      canvas.width  = Math.floor(width);
      canvas.height = Math.floor(height);
      nodesRef.current = makeNodes(canvas.width, canvas.height);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas.parentElement!);

    // ── Mouse tracking (section-level so text hover drives the field) ───────
    const section = canvas.closest('section') ?? document.body;
    const onMove  = (e: Event) => {
      const rect = canvas.getBoundingClientRect();
      const me = e as MouseEvent;
      mouseRef.current = { x: me.clientX - rect.left, y: me.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);

    // ── Render loop ──────────────────────────────────────────────────────────
    const frame = () => {
      const W = canvas.width;
      const H = canvas.height;
      if (!W || !H) { rafRef.current = requestAnimationFrame(frame); return; }

      ctx.clearRect(0, 0, W, H);
      t += 0.012;

      const [r, g, b] = getAccentRGB();
      const nodes = nodesRef.current;
      const { x: mx, y: my } = mouseRef.current;

      // Canvas center — used for breath scaling
      const cx = W * 0.5;
      const cy = H * 0.5;

      // Global breathing scale — ±BREATH_AMP around 1
      const breathScale = 1 + BREATH_AMP * Math.sin(t * BREATH_SPEED);

      // ── Background radial glow (depth layer) ──────────────────────────────
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(W, H) * 0.55);
      bg.addColorStop(0,    `rgba(${r},${g},${b},0.10)`);
      bg.addColorStop(0.35, `rgba(${r},${g},${b},0.045)`);
      bg.addColorStop(0.70, `rgba(${r},${g},${b},0.015)`);
      bg.addColorStop(1,    `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Physics ───────────────────────────────────────────────────────────
      for (const n of nodes) {
        // Cursor repulsion
        // Interaction uses actual (un-breathed) position for physics consistency
        const dx = n.x - mx;
        const dy = n.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < MOUSE_RADIUS * MOUSE_RADIUS && d2 > 0) {
          const d   = Math.sqrt(d2);
          const mag = (1 - d / MOUSE_RADIUS) * MOUSE_STRENGTH;
          n.vx += (dx / d) * mag;
          n.vy += (dy / d) * mag;
        }

        // Velocity damping
        n.vx *= DAMPING;
        n.vy *= DAMPING;

        // Keep nodes gently drifting (avoid stall)
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd < MIN_SPEED) {
          n.vx += (Math.random() - 0.5) * JITTER;
          n.vy += (Math.random() - 0.5) * JITTER;
        }

        // Hub drifts much slower to stay near center
        if (n.isHub) { n.vx *= 0.92; n.vy *= 0.92; }

        n.x += n.vx;
        n.y += n.vy;
        n.pulsePhase += n.pulseSpeed;

        // Soft wrap — keeps nodes in a padded band
        const pad = 24;
        if (n.x < -pad)    n.x = W + pad;
        if (n.x > W + pad) n.x = -pad;
        if (n.y < -pad)    n.y = H + pad;
        if (n.y > H + pad) n.y = -pad;
      }

      // ── Compute breath-scaled render positions ─────────────────────────────
      // Physics live in actual coords; rendering scales them from center
      // so the whole network gently expands/contracts together.
      const rx = (n: Node) => cx + (n.x - cx) * breathScale;
      const ry = (n: Node) => cy + (n.y - cy) * breathScale;

      // ── Edges ─────────────────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ax = rx(a), ay = ry(a);

        for (let j = i + 1; j < nodes.length; j++) {
          const bb = nodes[j];
          const bx = rx(bb), by = ry(bb);
          const dx = ax - bx;
          const dy = ay - by;
          const d  = Math.sqrt(dx * dx + dy * dy);
          // Use the larger of the two nodes' thresholds
          const threshold = Math.max(
            a.isHub  ? HUB_CONNECT_R : CONNECT_DIST,
            bb.isHub ? HUB_CONNECT_R : CONNECT_DIST,
          );
          if (d >= threshold) continue;

          const t0    = 1 - d / threshold;
          // Hub edges are slightly more visible; EDGE_ALPHA_BASE is ~18% higher
          const alpha = t0 * t0 * EDGE_ALPHA_BASE * (a.isHub || bb.isHub ? 1.25 : 1);

          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth   = a.isHub || bb.isHub ? 0.9 : 0.65;
          ctx.stroke();
        }
      }

      // ── Nodes ─────────────────────────────────────────────────────────────
      for (const n of nodes) {
        const nx = rx(n), ny = ry(n);
        const pulse = 0.5 + 0.5 * Math.sin(n.pulsePhase);

        if (n.isHub) {
          // Layered hub glow: two rings for depth
          for (const [outerMult, alphaBase] of [[3.0, 0.10], [5.5, 0.045]] as [number, number][]) {
            const outerR    = HUB_R + (pulse * 7) + HUB_R * outerMult;
            const ringAlpha = alphaBase + pulse * 0.08;
            const ring = ctx.createRadialGradient(nx, ny, HUB_R * 0.4, nx, ny, outerR);
            ring.addColorStop(0, `rgba(${r},${g},${b},${ringAlpha})`);
            ring.addColorStop(1, `rgba(${r},${g},${b},0)`);
            ctx.beginPath();
            ctx.arc(nx, ny, outerR, 0, Math.PI * 2);
            ctx.fillStyle = ring;
            ctx.fill();
          }
          // Core
          ctx.beginPath();
          ctx.arc(nx, ny, HUB_R * (0.9 + 0.12 * pulse), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},0.95)`;
          ctx.fill();
        } else {
          const opacity = (0.26 + 0.36 * pulse) * n.opacity;
          const radius  = n.r * (0.86 + 0.20 * pulse);

          // Soft glow
          const glowR = radius * 5.2;
          const grd   = ctx.createRadialGradient(nx, ny, 0, nx, ny, glowR);
          grd.addColorStop(0,   `rgba(${r},${g},${b},${opacity * 0.48})`);
          grd.addColorStop(0.4, `rgba(${r},${g},${b},${opacity * 0.14})`);
          grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(nx, ny, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(nx, ny, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${opacity * 0.9})`;
          ctx.fill();
        }
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
