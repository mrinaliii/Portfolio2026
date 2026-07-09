import { useEffect, useRef } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { scrollToSection } from '../../../lib/scroll';
import { Button } from '../../ui/Button/Button';
import { LazyImage } from '../../ui/LazyImage/LazyImage';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import { Container } from '../../layout/Container/Container';
import { DriftParticles } from './DriftParticles';
import { RadarPulse } from './RadarPulse';
import { StarField } from './StarField';
import styles from './Hero.module.css';

/**
 * PORTRAIT — replace src with your actual photo once available.
 * Drop: src/assets/portrait/portrait.jpg (640×854px minimum)
 * Then update the src below to the imported asset.
 */
const PORTRAIT_SRC = '/portrait-placeholder.svg';
const PORTRAIT_LQIP =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='27'%3E%3Crect width='20' height='27' fill='%230f1522'/%3E%3C/svg%3E";

/**
 * Hero Section — the first impression.
 *
 * Entrance sequence (7 elements, staggered via CSS animation-delay):
 *   1. Nav:        0ms  500ms  fadeDown  — in Nav.tsx
 *   2. Stamp:    200ms  500ms  fadeUp
 *   3. Name:     350ms  700ms  fadeUp
 *   4. Descriptor: 450ms 700ms fadeUp
 *   5. Subtext:  600ms  500ms  fadeIn
 *   6. CTAs:     750ms  400ms  fadeIn
 *   7. Portrait: 900ms  500ms  fadeIn (opacity-only)
 *
 * Parallax (desktop + reduced-motion off only):
 *   - Name + descriptor: –0.3× scroll speed (CSS `translate` property)
 *   - Portrait: –0.15× scroll speed
 *   Using CSS `translate` individual transform so it composes with CSS
 *   animation's `transform` without conflict.
 *
 * DS Section 10a. IA Section 01. TIP Milestone 3.
 */
export function Hero() {
  const { theme } = useTheme();
  const reducedMotion = useReducedMotion();

  const nameRef = useRef<HTMLHeadingElement>(null);
  const descriptorRef = useRef<HTMLParagraphElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);

  // Parallax — direct DOM manipulation via CSS custom property, not inline style.
  // CSS `translate` property on each element reads this variable and composes
  // with the entrance animation's `transform` without conflict.
  useEffect(() => {
    if (reducedMotion) return;

    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        // Only compute while hero is in view — skip once past viewport height
        if (y > window.innerHeight) return;

        // Headline group: 0.3× scroll speed
        const hy = `${-y * 0.3}px`;
        nameRef.current?.style.setProperty('--parallax-y', hy);
        descriptorRef.current?.style.setProperty('--parallax-y', hy);

        // Portrait: 0.15× scroll speed (independent plane)
        portraitRef.current?.style.setProperty('--parallax-y', `${-y * 0.15}px`);
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      data-section="hero"
      className={styles.hero}
      aria-label="Introduction"
    >
      {/* ── Ambient layer ─────────────────────────────────────────────────── */}
      <div className={styles.ambient} aria-hidden="true">
        <StarField theme={theme} />
        <DriftParticles />
        <RadarPulse />
        {/* Radial glow — CSS gradient, DS Section 10a */}
        <div className={styles.radialGlow} />
      </div>

      {/* ── Content grid ──────────────────────────────────────────────────── */}
      <Container className={styles.container}>
        <div className={styles.heroGrid}>

          {/* Element 2 — Stamp (200ms / 500ms) */}
          <StampLabel className={styles.stamp}>
            Hello, I&#8217;m
          </StampLabel>

          {/* Element 3 — Name headline (350ms / 700ms) */}
          <h1
            ref={nameRef}
            className={styles.name}
          >
            Mrinali Charhate
          </h1>

          {/* Element 4 — Descriptor (450ms / 700ms) */}
          <p
            ref={descriptorRef}
            className={styles.descriptor}
          >
            Building Intelligent Systems
          </p>

          {/* Element 7 — Portrait (900ms / 500ms / fade only) */}
          <div
            ref={portraitRef}
            className={styles.portraitColumn}
          >
            <LazyImage
              src={PORTRAIT_SRC}
              lqip={PORTRAIT_LQIP}
              alt="Mrinali Charhate"
              aspectRatio="3 / 4"
              eager
              className={styles.portrait}
            />
          </div>

          {/* Element 5 — Subtext (600ms / 500ms) */}
          <p className={styles.subtext}>
            Computer Science student specializing in Information Security,
            exploring the intersection of Artificial Intelligence,
            Machine Learning, and Cybersecurity.
          </p>

          {/* Element 6 — CTA row (750ms / 400ms) */}
          <div className={styles.ctaRow}>
            <Button
              variant="primary"
              onClick={() => scrollToSection('work')}
              aria-label="Explore my work — scroll to projects"
            >
              Explore My Work
            </Button>
            <Button
              variant="ghost"
              onClick={() => scrollToSection('signal')}
              aria-label="About me — scroll to signal section"
            >
              About Me
            </Button>
          </div>

        </div>
      </Container>
    </section>
  );
}
