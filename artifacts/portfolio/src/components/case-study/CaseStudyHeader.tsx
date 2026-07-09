import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './CaseStudyHeader.module.css';

/**
 * Minimal case study header — no full nav, just two links.
 * Left: portfolio name → / (root)
 * Right: ← All Projects → /#work
 * TIP Milestone 7, DS Section 24.
 */
export function CaseStudyHeader() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.monogram} aria-label="Back to portfolio home">
        MC
      </Link>
      <Link to="/#work" className={styles.backLink} aria-label="Back to all projects">
        <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
        All Projects
      </Link>
    </header>
  );
}
