import { useParams, Navigate } from 'react-router-dom';
import styles from './CaseStudyPage.module.css';

/**
 * CaseStudyPage — Milestone 0 placeholder.
 * In Milestone 7, this will consume the virtual:projects module,
 * render all case study sections, gallery, and links.
 */
export function CaseStudyPage() {
  const { projectSlug } = useParams<{ projectSlug: string }>();

  if (!projectSlug) {
    return <Navigate to="/" replace />;
  }

  return (
    <main id="main-content" className={styles.placeholder}>
      {/* Case study template is assembled in Milestone 7 */}
    </main>
  );
}
