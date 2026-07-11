import { useCallback, useRef, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Section } from '../../layout/Section/Section';
import { Container } from '../../layout/Container/Container';
import { StampLabel } from '../../ui/StampLabel/StampLabel';
import { StaggerGroup } from '../../motion/Stagger';
import { ProjectCard } from './ProjectCard';
import { TechPanel } from './TechPanel';
import { SignalTrace } from './SignalTrace';
import { PROJECTS } from 'virtual:projects';
import type { Project } from 'virtual:projects';
import styles from './Work.module.css';

const GITHUB_PROFILE = 'https://github.com/mrinali-charhate';

/**
 * Section 03 — Work.
 * 2-up card grid on desktop, 1-up on mobile.
 * Signal Trace: SVG line from hovered card → TechPanel on desktop.
 * Mobile: no Signal Trace; "Show Stack ↓" accordion in cards.
 * IA Section 03, DS Section 13, TIP Milestone 6.
 */
export function Work() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Map<string, HTMLElement>>(new Map());
  const hoveredCardRef = useRef<HTMLElement | null>(null);

  const getCardRef = useCallback((slug: string) => {
    return (el: HTMLElement | null) => {
      if (el) cardRefs.current.set(slug, el);
      else cardRefs.current.delete(slug);
    };
  }, []);

  function handleCardEnter(project: Project) {
    const cardEl = cardRefs.current.get(project.slug);
    hoveredCardRef.current = cardEl ?? null;
    setHoveredProject(project);
  }

  function handleCardLeave() {
    hoveredCardRef.current = null;
    setHoveredProject(null);
  }

  // Build a stable ref object for SignalTrace that always points to the current hovered card
  const fromRef = useRef<HTMLElement | null>(null);
  fromRef.current = hoveredCardRef.current;

  // TechPanel ref (cast for SignalTrace)
  const toPanelRef = panelRef as React.RefObject<HTMLElement | null>;

  return (
    <Section id="work" data-section="work" aria-labelledby="work-heading">
      <Container>
        <StampLabel className={styles.stamp}>Selected Work</StampLabel>

        <h2 id="work-heading" className={styles.heading}>
          Projects That Reflect My Interests
        </h2>

        <div className={styles.layout}>
          {/* Cards */}
          <StaggerGroup as="div" className={styles.grid} stagger={0.1}>
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                isHovered={hoveredProject?.slug === project.slug}
                onMouseEnter={() => handleCardEnter(project)}
                onMouseLeave={handleCardLeave}
                cardRef={getCardRef(project.slug)}
              />
            ))}
          </StaggerGroup>

          {/* Tech Panel — desktop only */}
          <div ref={panelRef as React.RefObject<HTMLDivElement>}>
            <TechPanel
              project={hoveredProject}
              isVisible={hoveredProject !== null}
            />
          </div>
        </div>

        {/* Signal Trace SVG — drawn between hovered card and tech panel */}
        <SignalTrace
          fromRef={fromRef}
          toRef={toPanelRef}
          isActive={hoveredProject !== null}
        />

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
