import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useDrawerContext } from '../../../context/DrawerContext';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { handleAnchorClick } from '../../../lib/scroll';
import { NAV_ITEMS, NAV_RESUME_ITEM } from '../../../data/nav-items';
import styles from './MobileNav.module.css';

interface MobileNavProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  activeId: string | null;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { y: '-100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.32,
      ease: [0.16, 1, 0.3, 1], // --ease-spring
    },
  },
  exit: {
    y: '-100%',
    opacity: 0,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1], // --ease-smooth
    },
  },
};

/**
 * Full-screen mobile navigation overlay.
 * Framer Motion AnimatePresence handles exit animation on unmount.
 * Focus trap keeps keyboard navigation inside while open.
 * Closes on: X button, backdrop tap, Escape key.
 * DS Section 14.
 */
export function MobileNav({ id, isOpen, onClose, activeId }: MobileNavProps) {
  const { openDrawer } = useDrawerContext();
  const trapRef = useFocusTrap<HTMLDivElement>(isOpen);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  function handleResumeClick() {
    onClose();
    openDrawer();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className={styles.backdrop}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.22 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            id={id}
            ref={trapRef}
            className={styles.panel}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close button */}
            <div className={styles.header}>
              <span className={styles.monogram} aria-hidden="true">MC</span>
              <button
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close navigation menu"
              >
                <X size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            {/* Nav links — staggered entrance via nth-child CSS */}
            <nav aria-label="Mobile navigation">
              <ul className={styles.links} role="list">
                {NAV_ITEMS.map((item, i) => {
                  const sectionId = item.href.replace('#', '');
                  const isActive = activeId === sectionId;
                  return (
                    <li key={item.href} className={styles.item}>
                      <a
                        href={item.href}
                        className={[
                          styles.link,
                          isActive && styles.linkActive,
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        style={
                          /* Dynamic delay per item — CSS custom property, not an inline design value */
                          { '--item-delay': `${i * 80}ms` } as React.CSSProperties
                        }
                        onClick={(e) => {
                          handleAnchorClick(e, item.href);
                          onClose();
                        }}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Resume trigger */}
            <div className={styles.footer}>
              <button
                className={styles.resumeLink}
                onClick={handleResumeClick}
                style={{ '--item-delay': `${NAV_ITEMS.length * 80}ms` } as React.CSSProperties}
              >
                {NAV_RESUME_ITEM.label}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
