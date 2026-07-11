import { motion, useReducedMotion } from 'framer-motion';
import { scrollToTop } from '../../../lib/scroll';
import styles from './Footer.module.css';

/**
 * Footer — quiet signature. IA Section Footer.
 * Full width, --color-abyss (recessed) background.
 * Left: personal statement. Right: copyright + back to top.
 * CONTENT.md §FOOTER.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const reducedMotion = useReducedMotion();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.name}>Mrinali Charhate</span>
          <span className={styles.tagline}>
            Building systems that think carefully.
          </span>
        </div>

        <div className={styles.right}>
          <span className={styles.copyright}>
            © {year} · Mrinali Charhate
          </span>
          <motion.button
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Back to top of page"
            whileHover={reducedMotion ? undefined : { scale: 1.05 }}
            whileTap={reducedMotion ? undefined : { scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            Back to top ↑
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
