import { StampLabel } from '../ui/StampLabel/StampLabel';
import { Tag } from '../ui/Tag/Tag';
import type { Project } from 'virtual:projects';
import styles from './CaseStudyHero.module.css';

interface CaseStudyHeroProps {
  project: Project;
}

/**
 * Case study hero — stamp row, title (56px), short description, metadata strip, tech tags.
 * TIP Milestone 7, DS Section 24.
 */
export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <section className={styles.hero} aria-label={`${project.title} overview`}>
      <div className={styles.inner}>
        {/* Stamp row */}
        <StampLabel className={styles.stamp}>
          {project.year}&nbsp;·&nbsp;{project.category}&nbsp;·&nbsp;{project.status}
        </StampLabel>

        {/* Title */}
        <h1 className={styles.title}>{project.title}</h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>{project.subtitle}</p>

        {/* Short description */}
        <p className={styles.description}>{project.shortDescription}</p>

        {/* Metadata strip */}
        <dl className={styles.meta}>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Duration</dt>
            <dd className={styles.metaValue}>{project.duration}</dd>
          </div>
          <div className={styles.metaItem}>
            <dt className={styles.metaLabel}>Role</dt>
            <dd className={styles.metaValue}>{project.role}</dd>
          </div>
        </dl>

        {/* Technology tags */}
        <div className={styles.tags}>
          {project.technologies.map((tech) => (
            <Tag key={tech.name}>{tech.name}</Tag>
          ))}
        </div>
      </div>
    </section>
  );
}
