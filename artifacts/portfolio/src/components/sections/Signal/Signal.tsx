import { Hairline } from '../../layout/Hairline/Hairline';
import { Section } from '../../layout/Section/Section';
import { Container } from '../../layout/Container/Container';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import { useReadingDepth } from '../../../hooks/useReadingDepth';
import { NetworkCanvas } from './NetworkCanvas';
import styles from './Signal.module.css';

/**
 * Section 02 — Signal.
 * Why AI + Security. One thesis paragraph.
 * Desktop: 7-col text rail | 5-col network canvas.
 * Mobile: text only; canvas hidden for performance.
 * Reading Depth interaction on body paragraphs (DS Section 10 microinteractions).
 * IA Section 02, CONTENT.md §SIGNAL.
 */
export function Signal() {
  const bodyRef = useReadingDepth<HTMLDivElement>();

  return (
    <>
      <Section id="signal" data-section="signal" aria-labelledby="signal-heading">
        <Container>
          <div className={styles.layout}>
            {/* ── left: text rail ─────────────────────────────────── */}
            <div className={styles.inner}>
              <StampLabel className={styles.stamp}>Signal</StampLabel>

              <h2 id="signal-heading" className={styles.heading}>
                Why I Build
              </h2>

              <div className={styles.body} ref={bodyRef}>
                <p>
                  Technology fascinates me because every system tells a story.
                </p>
                <p>
                  Artificial Intelligence teaches machines to reason. Cybersecurity teaches us how
                  systems fail. Software Engineering connects both through thoughtful design and
                  careful implementation.
                </p>
                <p>
                  That's why I enjoy building at the intersection of these disciplines — creating
                  intelligent systems that are not only technically sound, but genuinely useful.
                </p>
                <p>
                  I don't believe good engineering is just about writing code. It's about
                  understanding problems deeply, making deliberate decisions, and continuously
                  improving with every iteration.
                </p>
              </div>
            </div>

            {/* ── right: decorative network canvas (desktop only) ── */}
            <div className={styles.canvasPane} aria-hidden="true">
              <NetworkCanvas />
            </div>
          </div>
        </Container>
      </Section>
      <Hairline />
    </>
  );
}
