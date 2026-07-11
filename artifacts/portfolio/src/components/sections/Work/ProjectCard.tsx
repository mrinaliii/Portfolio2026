import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import { Tag } from '../../ui/Tag/Tag';
import { StaggerItem } from '../../motion/Stagger';
import type { Project } from 'virtual:projects';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  cardRef?: React.RefCallback<HTMLElement>;
}

/**
 * Project Card — DS Section 13.
 * Anatomy: stamp row → title → descriptor → description → tags → ghost CTA.
 * Hover: translateY(-4px), border brightens, shadow appears, Signal Trace fires (in parent).
 */
export function ProjectCard({
  project,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  cardRef,
}: ProjectCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <StaggerItem
      as="article"
      ref={cardRef as React.Ref<HTMLElement>}
      className={[styles.card, isHovered && styles.cardHovered].filter(Boolean).join(' ')}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      whileHover={
        reducedMotion
          ? undefined
          : { y: -8, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 22 } }
      }
    >
      {/* Stamp row: YEAR · CATEGORY */}
      <StampLabel className={styles.stamp}>
        {project.year}&nbsp;·&nbsp;{project.category}
      </StampLabel>

      {/* Title */}
      <h3 className={styles.title}>{project.title}</h3>

      {/* One-line descriptor */}
      <p className={styles.descriptor}>{project.subtitle}</p>

      {/* Description — max 3 lines */}
      <p className={styles.description}>{project.shortDescription}</p>

      {/* Technology tags */}
      <div className={styles.tags}>
        {project.technologies.slice(0, 5).map((tech) => (
          <Tag key={tech.name}>{tech.name}</Tag>
        ))}
      </div>

      {/* Ghost CTA */}
      <Link
        to={`/work/${project.slug}`}
        className={styles.cta}
        onClick={() => {}}
        aria-label={`Read case study for ${project.title}`}
      >
        Read Case Study
        <ArrowRight size={14} strokeWidth={1.5} aria-hidden="true" />
      </Link>
    </StaggerItem>
  );
}
