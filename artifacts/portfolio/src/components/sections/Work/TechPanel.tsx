import { AnimatePresence, motion } from 'framer-motion';
import { Tag } from '../../ui/Tag/Tag';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import type { Project } from '../../../data/projects';
import styles from './TechPanel.module.css';

interface TechPanelProps {
  project: Project | null;
  isVisible: boolean;
}

/**
 * TechPanel — right-side technology panel, revealed via Signal Trace hover.
 * Slides in on first hover (300ms spring), content updates without re-animation on card change.
 * Desktop only (hidden on mobile; accordion used instead — see ProjectCard mobile).
 * DS Section 13, IA Section 03, TIP Milestone 6.
 */
export function TechPanel({ project, isVisible }: TechPanelProps) {
  return (
    <AnimatePresence>
      {isVisible && project && (
        <motion.aside
          className={styles.panel}
          initial={{ x: 48, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 48, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1], // --ease-spring
          }}
          aria-label={`Technology stack for ${project.title}`}
        >
          <StampLabel className={styles.stamp}>Technologies</StampLabel>
          <p className={styles.projectName}>{project.title}</p>
          <div className={styles.tags}>
            {project.technologies.map((tech) => (
              <Tag key={tech.name} className={styles.tag}>
                {tech.name}
              </Tag>
            ))}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
