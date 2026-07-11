import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CaseStudyHeader } from '../components/case-study/CaseStudyHeader';
import { CaseStudyHero } from '../components/case-study/CaseStudyHero';
import { CaseStudySection } from '../components/case-study/CaseStudySection';
import { LinksSection } from '../components/case-study/LinksSection';
import { Footer } from '../components/sections/Footer/Footer';
import { PROJECT_MAP } from 'virtual:projects';
import type { CaseStudySection as CaseStudySectionType } from 'virtual:projects';
import styles from './CaseStudyPage.module.css';

/**
 * Case Study Page — Milestone 7.
 * Route: /work/:projectSlug
 * Renders all case study sections from project data.
 * Redirects to / if the slug is unknown.
 */
export default function CaseStudyPage() {
  const { projectSlug } = useParams<{ projectSlug: string }>();

  // Always start at the top when navigating to a case study.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [projectSlug]);

  if (!projectSlug) {
    return <Navigate to="/" replace />;
  }

  const project = PROJECT_MAP[projectSlug];

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{project.title} — Mrinali Charhate</title>
        <meta name="description" content={project.shortDescription} />
        <meta property="og:title" content={`${project.title} — Mrinali Charhate`} />
        <meta property="og:description" content={project.shortDescription} />
      </Helmet>

      <CaseStudyHeader />

      <main id="main-content" className={styles.page}>
        {/* Hero — stamp row, title, description, metadata, tags */}
        <CaseStudyHero project={project} />

        {/* All case study sections from project data */}
        <div className={styles.sections}>
          {project.caseStudySections.map((section: CaseStudySectionType, index: number) => (
            <CaseStudySection
              key={section.label}
              section={section}
              index={index}
            />
          ))}
        </div>

        {/* Footer links — GitHub, Live Demo, ← Back */}
        <LinksSection project={project} />
      </main>

      <Footer />
    </>
  );
}
