import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button/Button';
import { analytics } from '../../lib/analytics';
import type { Project } from 'virtual:projects';
import styles from './LinksSection.module.css';

interface LinksSectionProps {
  project: Project;
}

/**
 * Case study footer links — GitHub, Live Demo, ← Back to Projects.
 * TIP Milestone 7, DS Section 24.
 */
export function LinksSection({ project }: LinksSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.actions}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.githubClick(project.slug)}
              className={styles.link}
              aria-label={`View ${project.title} on GitHub`}
            >
              <Button variant="secondary">
                <Github size={14} strokeWidth={1.5} aria-hidden="true" />
                View on GitHub
              </Button>
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => analytics.demoClick(project.slug)}
              className={styles.link}
              aria-label={`View ${project.title} live demo`}
            >
              <Button variant="secondary">
                <ExternalLink size={14} strokeWidth={1.5} aria-hidden="true" />
                Live Demo
              </Button>
            </a>
          )}
        </div>

        <Link to="/#work" className={styles.backLink} aria-label="Back to all projects">
          ← Back to Projects
        </Link>
      </div>
    </div>
  );
}
