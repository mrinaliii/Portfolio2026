import { Section } from '../../layout/Section/Section';
import { Container } from '../../layout/Container/Container';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import { Hairline } from '../../layout/Hairline/Hairline';
import styles from './Approach.module.css';

interface Principle {
  label: string;
  heading: string;
  body: string;
}

const PRINCIPLES: Principle[] = [
  {
    label: 'UNDERSTAND FIRST',
    heading: 'Problem Before Solution',
    body: 'Before writing code, I focus on understanding the problem, its constraints, and the trade-offs involved. A solution built on a misunderstood problem is a liability — no matter how cleanly it is engineered.',
  },
  {
    label: 'BUILD WITH PURPOSE',
    heading: 'Clarity Over Cleverness',
    body: 'I prefer solutions that are reliable, maintainable, and thoughtfully designed rather than unnecessarily complex. The most impressive code is often the simplest code that correctly solves the right problem.',
  },
  {
    label: 'KEEP LEARNING',
    heading: 'Iteration Is the Method',
    body: 'Technology evolves constantly. I enjoy exploring new tools, reading documentation, experimenting with ideas, and improving every project through iteration. Every project leaves me more capable than before.',
  },
];

/**
 * Section 04 — Approach.
 * How I think. Principles, not skills.
 * 2-up principle block grid on desktop, 1-up on mobile.
 * Children stagger at 80ms (handled by Section with staggered CSS delay classes).
 * Hairline separator below.
 * IA Section 04, CONTENT.md §APPROACH.
 */
export function Approach() {
  return (
    <>
      <Section id="approach" data-section="approach" aria-labelledby="approach-heading">
        <Container>
          <StampLabel className={styles.stamp}>Approach</StampLabel>

          <h2 id="approach-heading" className={styles.heading}>
            How I Think
          </h2>

          <div className={styles.grid}>
            {PRINCIPLES.map((principle, i) => (
              <article
                key={principle.label}
                className={styles.block}
                style={{ '--stagger-delay': `${i * 80}ms` } as React.CSSProperties}
              >
                <StampLabel className={styles.principleLabel}>
                  {principle.label}
                </StampLabel>
                <h3 className={styles.principleHeading}>{principle.heading}</h3>
                <p className={styles.principleBody}>{principle.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Hairline />
    </>
  );
}
