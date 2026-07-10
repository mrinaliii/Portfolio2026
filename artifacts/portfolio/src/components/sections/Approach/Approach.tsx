import { Section } from '../../layout/Section/Section';
import { Container } from '../../layout/Container/Container';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import { Hairline } from '../../layout/Hairline/Hairline';
import styles from './Approach.module.css';

interface Role {
  label: string;
  heading: string;
  meta: string;
  body: string[];
}

const ROLES: Role[] = [
  {
    label: '2026',
    heading: 'Cybersecurity Intern — Abhita Aerospace',
    meta: 'Mumbai, Maharashtra · May 2026 – July 2026',
    body: [
      'Performed vulnerability assessments across web applications and networks.',
      'Conducted web application security testing and network security analysis.',
      'Supported security monitoring and documented findings for remediation.',
    ],
  },
  {
    label: '2025',
    heading: 'AI-ML Intern — Reliance New Energy',
    meta: 'Mumbai, Maharashtra · June 2025',
    body: [
      'Collaborated with teams to refine requirements for energy data systems.',
      'Built and evaluated hybrid retrieval models for accurate domain-specific queries.',
      'Delivered insights through dashboards and demos to support data-driven decision-making.',
    ],
  },
];

/**
 * Section 04 — Experience.
 * Work experience and patents. Formerly "Approach"; repurposed per request.
 * 2-up block grid on desktop, 1-up on mobile.
 * Children stagger at 80ms (handled by Section with staggered CSS delay classes).
 * Hairline separator below.
 */
export function Approach() {
  return (
    <>
      <Section id="experience" data-section="experience" aria-labelledby="experience-heading">
        <Container>
          <StampLabel className={styles.stamp}>Experience</StampLabel>

          <h2 id="experience-heading" className={styles.heading}>
            Where I've Worked
          </h2>

          <div className={styles.grid}>
            {ROLES.map((role, i) => (
              <article
                key={role.heading}
                className={styles.block}
                style={{ '--stagger-delay': `${i * 80}ms` } as React.CSSProperties}
              >
                <StampLabel className={styles.principleLabel}>
                  {role.label}
                </StampLabel>
                <h3 className={styles.principleHeading}>{role.heading}</h3>
                <p className={styles.roleMeta}>{role.meta}</p>
                <ul className={styles.roleBody}>
                  {role.body.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Hairline />
    </>
  );
}
