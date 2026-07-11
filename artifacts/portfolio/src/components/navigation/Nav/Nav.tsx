import { useState } from 'react';
import { motion } from 'framer-motion';
import { useDrawerContext } from '../../../context/DrawerContext';
import { useActiveSection } from '../../../hooks/useActiveSection';
import { useScrollY } from '../../../hooks/useScrollY';
import { handleAnchorClick } from '../../../lib/scroll';
import { NAV_ITEMS, NAV_RESUME_ITEM } from '../../../data/nav-items';
import { Button } from '../../ui/Button/Button';
import { MobileNav } from '../MobileNav/MobileNav';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Nav.module.css';

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace('#', ''));
const SCROLL_THRESHOLD = 120;

/**
 * Fixed navigation bar — glassmorphism on scroll, sliding active indicator,
 * link hover lift, Resume button glow.
 *
 * DS Section 14, TIP Milestone 2.
 */
export function Nav() {
  const scrollY   = useScrollY();
  const activeId  = useActiveSection(SECTION_IDS);
  const { openDrawer } = useDrawerContext();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = scrollY > SCROLL_THRESHOLD;

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <>
      <motion.header
        className={[styles.header, scrolled && styles.scrolled].filter(Boolean).join(' ')}
        /* Slide down + fade on page load */
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.inner}>
          {/* Monogram / name */}
          <a
            href="/"
            className={styles.monogram}
            aria-label="Mrinali Charhate — back to top"
          >
            MC
          </a>

          {/* Desktop nav links */}
          <nav
            className={styles.links}
            aria-label="Main navigation"
          >
            <ul role="list">
              {NAV_ITEMS.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive  = activeId === sectionId;
                return (
                  <li key={item.href} className={styles.navItem}>
                    <a
                      href={item.href}
                      className={[
                        styles.link,
                        isActive && styles.linkActive,
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={(e) => handleAnchorClick(e, item.href)}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      {item.label}
                    </a>

                    {/* Sliding underline — Framer Motion layoutId animates it
                        from the previous active link to the new one */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        style={{
                          position:        'absolute',
                          bottom:          0,
                          left:            0,
                          right:           0,
                          height:          '1.5px',
                          borderRadius:    '1px',
                          backgroundColor: 'var(--color-ice-signal)',
                          originX:         0,
                        }}
                        transition={{
                          type:      'spring',
                          stiffness: 380,
                          damping:   32,
                        }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right actions */}
          <div className={styles.actions}>
            <ThemeToggle />
            <Button
              variant="primary"
              className={styles.resumeBtn}
              onClick={openDrawer}
              aria-label={NAV_RESUME_ITEM.label}
            >
              {NAV_RESUME_ITEM.label}
            </Button>
          </div>

          {/* Hamburger — mobile only */}
          <div className={styles.mobileActions}>
            <ThemeToggle />
            <button
              className={styles.hamburger}
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <svg
                width="24"
                height="18"
                viewBox="0 0 24 18"
                fill="none"
                aria-hidden="true"
              >
                <rect width="24" height="2" rx="1" fill="currentColor" />
                <rect y="8" width="24" height="2" rx="1" fill="currentColor" />
                <rect y="16" width="24" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileNav
        id="mobile-nav"
        isOpen={mobileOpen}
        onClose={closeMobile}
        activeId={activeId}
      />
    </>
  );
}
