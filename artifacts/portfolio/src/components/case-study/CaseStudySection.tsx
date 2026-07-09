import { StampLabel } from '../ui/StampLabel/StampLabel';
import { useReadingDepth } from '../../hooks/useReadingDepth';
import type { CaseStudySection as CaseStudySectionType } from 'virtual:projects';
import styles from './CaseStudySection.module.css';

interface CaseStudySectionProps {
  section: CaseStudySectionType;
  index: number;
}

/**
 * Generic case study section — stamp + heading + body.
 * Body copy is constrained to 7 of 12 columns (prose layout).
 * Reading Depth active on body copy paragraphs.
 * No entrance animation (TIP Section 9: "sections do not animate on scroll in case studies").
 * TIP Milestone 7, DS Section 24.
 */
export function CaseStudySection({ section }: CaseStudySectionProps) {
  const bodyRef = useReadingDepth<HTMLDivElement>();

  return (
    <article className={styles.section}>
      <StampLabel className={styles.stamp}>{section.label}</StampLabel>

      <h2 className={styles.heading}>{section.heading}</h2>

      <div className={styles.body} ref={bodyRef}>
        {Array.isArray(section.body) ? (
          <ul className={styles.list}>
            {section.body.map((item, i) => (
              <li key={i} className={styles.listItem}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className={styles.prose}>{section.body}</p>
        )}
      </div>
    </article>
  );
}
