import { StampLabel } from '../ui/StampLabel/StampLabel';
import { Tag } from '../ui/Tag/Tag';
import { LazyImage } from '../ui/LazyImage/LazyImage';
import type { Project } from 'virtual:projects';
import styles from './CaseStudyHero.module.css';

const COVER_LQIP =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='9'%3E%3Crect width='16' height='9' fill='%230f1522'/%3E%3C/svg%3E";

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

        {/* Cover image */}
        {project.coverSrc && (
          <LazyImage
            src={project.coverSrc}
            lqip={project.coverLqip ?? COVER_LQIP}
            alt={`${project.title} — project cover`}
            aspectRatio="16 / 9"
            eager
            className={styles.cover}
          />
        )}

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
