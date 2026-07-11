import { ExternalLink } from 'lucide-react';
import { Section } from '../../layout/Section/Section';
import { Container } from '../../layout/Container/Container';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import { StaggerGroup } from '../../motion/Stagger';
import { ProjectCard } from './ProjectCard';
import { PROJECTS } from 'virtual:projects';
import styles from './Work.module.css';

const GITHUB_PROFILE = 'https://github.com/mrinaliii';

/**
 * Section 03 — Work.
 * 2-up card grid on desktop, 1-up on mobile.
 * Signal Trace: SVG line from hovered card → TechPanel on desktop.
 * Mobile: no Signal Trace; "Show Stack ↓" accordion in cards.
 * IA Section 03, DS Section 13, TIP Milestone 6.
 */
export function Work() {
  return (
    <Section id="work" data-section="work" aria-labelledby="work-heading">
      <Container>
        <StampLabel className={styles.stamp}>Projects</StampLabel>

        <h2 id="work-heading" className={styles.heading}>
          Projects That Reflect My Interests
        </h2>

        <StaggerGroup as="div" className={styles.grid} stagger={0.1}>
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
            />
          ))}
        </StaggerGroup>

        {/* GitHub link row */}
        <div className={styles.githubRow}>
          <a
            href={GITHUB_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
            aria-label="View all projects on GitHub"
          >
            View all on GitHub
            <ExternalLink size={13} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </Section>
  );
}
