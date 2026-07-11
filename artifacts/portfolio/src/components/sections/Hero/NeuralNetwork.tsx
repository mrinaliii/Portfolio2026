import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../../hooks/useReducedMotion';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  isHub: boolean;
  pulsePhase: number;
  opacity: number;
}

const CONNECTION_DIST = 140;  // px — max distance for an edge
const REPEL_DIST      = 90;   // px — cursor repel radius
const NODE_COUNT      = 38;   // total nodes including hub
const HUB_R           = 4.5;  // hub node radius
const NODE_R_MIN      = 1.8;
const NODE_R_MAX      = 3.2;
const MAX_SPEED       = 0.28; // px/frame
const MOBILE_BREAKPT  = 768;

/**
 * Animated neural network canvas.
 * Positioned over the right half of the hero (portrait column).
 * Reads --color-ice-signal from the document root so it follows the theme.
 */
export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const animRef  = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < MOBILE_BREAKPT;
    if (reducedMotion) return;

    // Theme-aware accent color — raw RGB extracted from CSS variable
    function getAccentRGB(): [number, number, number] {
      // --color-ice-signal resolves to #5ba8d4 (dark) or #2a7ab5 (light)
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-ice-signal')
        .trim();
      // parse hex
      const hex = raw.startsWith('#') ? raw.slice(1) : '5ba8d4';
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      return [r, g, b];
    }

    let nodes: Node[] = [];
    let W = 0, H = 0;

    function resize() {
      W = canvas!.offsetWidth;
      H = canvas!.offsetHeight;
      canvas!.width  = W;
      canvas!.height = H;
    }

    function initNodes() {
      const count = isMobile ? 18 : NODE_COUNT;
      nodes = [];
      // Hub at center of canvas
      nodes.push({
        x: W * 0.5,
        y: H * 0.5,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        r: HUB_R,
        isHub: true,
        pulsePhase: 0,
        opacity: 1,
      });
      // Distribute remaining nodes in a seeded grid so coverage is even
      const cols = Math.ceil(Math.sqrt(count * (W / H)));
      const rows = Math.ceil(count / cols);
      const cellW = W / cols;
      const cellH = H / rows;
      let placed = 1;
      for (let row = 0; row < rows && placed < count; row++) {
        for (let col = 0; col < cols && placed < count; col++) {
          // jitter within the cell for organic look
          const jx = (Math.random() - 0.5) * cellW * 0.7;
          const jy = (Math.random() - 0.5) * cellH * 0.7;
          nodes.push({
            x: cellW * (col + 0.5) + jx,
            y: cellH * (row + 0.5) + jy,
            vx: (Math.random() - 0.5) * MAX_SPEED,
            vy: (Math.random() - 0.5) * MAX_SPEED,
            r: NODE_R_MIN + Math.random() * (NODE_R_MAX - NODE_R_MIN),
            isHub: false,
            pulsePhase: Math.random() * Math.PI * 2,
            opacity: 0.55 + Math.random() * 0.45,
          });
          placed++;
        }
      }
    }

    let frame = 0;

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, W, H);

      frame++;
      const [r, g, b] = getAccentRGB();
      const mouse = isMobile ? null : mouseRef.current;

      // ── Radial background glow ──────────────────────────────────────────
      const grd = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.55);
      grd.addColorStop(0,   `rgba(${r},${g},${b},0.06)`);
      grd.addColorStop(0.5, `rgba(${r},${g},${b},0.025)`);
      grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);

      // ── Update node positions ───────────────────────────────────────────
      nodes.forEach(n => {
        // Cursor interaction (desktop only)
        if (mouse && !isMobile) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < REPEL_DIST && dist > 0) {
            const force = (REPEL_DIST - dist) / REPEL_DIST * 0.4;
            n.vx += (dx / dist) * force;
            n.vy += (dy / dist) * force;
          }
        }

        // Clamp velocity
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        const maxSp = n.isHub ? 0.12 : MAX_SPEED;
        if (speed > maxSp) {
          n.vx = (n.vx / speed) * maxSp;
          n.vy = (n.vy / speed) * maxSp;
        }

        n.x += n.vx;
        n.y += n.vy;

        // Soft bounce at canvas edges
        const margin = 20;
        if (n.x < margin)     { n.vx += 0.05; }
        if (n.x > W - margin) { n.vx -= 0.05; }
        if (n.y < margin)     { n.vy += 0.05; }
        if (n.y > H - margin) { n.vy -= 0.05; }

        // Pulse phase
        n.pulsePhase += 0.018;
      });

      // ── Draw edges ──────────────────────────────────────────────────────
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b_n = nodes[j];
          const dx = a.x - b_n.x;
          const dy = a.y - b_n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > CONNECTION_DIST) continue;

          const alpha = (1 - dist / CONNECTION_DIST) * 0.22;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b_n.x, b_n.y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      // ── Draw nodes ──────────────────────────────────────────────────────
      nodes.forEach(n => {
        if (n.isHub) {
          // Pulsing outer ring
          const pulse = 0.5 + 0.5 * Math.sin(n.pulsePhase);
          const outerR = HUB_R + 6 + pulse * 4;
          const ringAlpha = 0.08 + pulse * 0.10;
          const ringGrd = ctx.createRadialGradient(n.x, n.y, HUB_R * 0.5, n.x, n.y, outerR);
          ringGrd.addColorStop(0, `rgba(${r},${g},${b},${ringAlpha})`);
          ringGrd.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, outerR, 0, Math.PI * 2);
          ctx.fillStyle = ringGrd;
          ctx.fill();

          // Hub core
          ctx.beginPath();
          ctx.arc(n.x, n.y, HUB_R, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},0.9)`;
          ctx.fill();
        } else {
          // Soft glow behind node
          const glowGrd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3);
          glowGrd.addColorStop(0, `rgba(${r},${g},${b},${n.opacity * 0.3})`);
          glowGrd.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = glowGrd;
          ctx.fill();

          // Node dot
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${n.opacity * 0.75})`;
          ctx.fill();
        }
      });

      animRef.current = requestAnimationFrame(draw);
    }

    // Mouse tracking — canvas-relative coords
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    function onMouseLeave() {
      mouseRef.current = null;
    }

    resize();
    initNodes();
    draw();

    if (!isMobile) {
      canvas.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseleave', onMouseLeave);
    }

    const ro = new ResizeObserver(() => {
      resize();
      initNodes();
    });
    ro.observe(canvas);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto', // needs pointer events for cursor interaction
      }}
      aria-hidden="true"
    />
  );
}
