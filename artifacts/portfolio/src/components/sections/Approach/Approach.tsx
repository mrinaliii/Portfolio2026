import { Section } from '../../layout/Section/Section';
import { Container } from '../../layout/Container/Container';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import { Hairline } from '../../layout/Hairline/Hairline';
import styles from './Approach.module.css';

interface Role {
  label: string;
  heading: string;
  meta: string;
  body: string;
}

const ROLES: Role[] = [
  {
    label: '2026',
    heading: 'Cybersecurity Intern — Abhita Aerospace',
    meta: 'Mumbai, Maharashtra · May 2026 – July 2026',
    body: 'Conducted vulnerability assessments across 10+ web applications and internal network segments, identifying and documenting critical misconfigurations for remediation. Supported continuous security monitoring using SIEM tooling, contributing to a 30% reduction in unresolved alert backlog over the internship period.',
  },
  {
    label: '2025',
    heading: 'AI-ML Intern — Reliance New Energy',
    meta: 'Mumbai, Maharashtra · June 2025',
    body: 'Designed and evaluated hybrid retrieval-augmented generation (RAG) models for energy-domain datasets, achieving ~18% improvement in query accuracy over baseline keyword search. Delivered interactive dashboards and live demos to cross-functional stakeholders, translating model outputs into actionable insights for data-driven energy planning.',
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
                <p className={styles.roleBody}>{role.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
      <Hairline />
    </>
  );
}
