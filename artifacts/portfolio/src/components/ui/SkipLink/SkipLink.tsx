import styles from './SkipLink.module.css';

/**
 * SkipLink — accessibility foundation.
 * Always the first Tab stop on the page.
 * Visually hidden until focused; reveals as a pill anchored to top-left.
 * Links to #main-content which is placed on the <main> element in App.tsx.
 */
export function SkipLink() {
  return (
    <a href="#main-content" className={styles.skipLink}>
      Skip to main content
    </a>
  );
}
