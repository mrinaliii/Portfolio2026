import { AnimatePresence, motion } from 'framer-motion';
import { Download, FileX, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useDrawerContext } from '../../context/DrawerContext';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { analytics } from '../../lib/analytics';
import { Button } from '../ui/Button/Button';
import { Skeleton } from '../ui/Skeleton/Skeleton';
import { DrawerBackdrop } from './DrawerBackdrop';
import styles from './ResumeDrawer.module.css';

type DrawerState = 'loading' | 'ready' | 'error' | 'downloading';

const RESUME_PREVIEW_SRC = '/resume-preview.jpg'; // public/ — served directly
const RESUME_PDF_SRC = '/resume.pdf';             // public/ — direct download

/**
 * Resume Drawer — right-edge slide-in panel (DS Section 25, TIP Milestone 8).
 * States: Loading → Ready, Image Error path, Download Active path.
 * Framer Motion AnimatePresence for exit animation.
 * Focus trap via useFocusTrap. Escape key closes.
 * Desktop: 480px panel. Mobile: full-width.
 */
export function ResumeDrawer() {
  const { isDrawerOpen, closeDrawer } = useDrawerContext();
  const [drawerState, setDrawerState] = useState<DrawerState>('loading');
  const trapRef = useFocusTrap<HTMLDivElement>(isDrawerOpen);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // On open: fire analytics, reset to loading, focus close button
  useEffect(() => {
    if (isDrawerOpen) {
      analytics.resumeDrawerOpen();
      setDrawerState('loading');
      // Focus close button on next frame
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }
  }, [isDrawerOpen]);

  // Escape key closes drawer
  useEffect(() => {
    if (!isDrawerOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDrawer();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isDrawerOpen, closeDrawer]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  function handleImageLoad() {
    setDrawerState('ready');
  }

  function handleImageError() {
    setDrawerState('error');
  }

  function handleDownload() {
    analytics.resumeDownload();
    setDrawerState('downloading');
    setTimeout(() => setDrawerState('ready'), 1800);
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          <DrawerBackdrop onClose={closeDrawer} />

          <motion.div
            ref={trapRef}
            className={styles.drawer}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{
              duration: 0.32,
              ease: [0.16, 1, 0.3, 1], // --ease-spring
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Resume preview"
          >
            {/* Header */}
            <div className={styles.header}>
              <span className={styles.title}>Resume</span>
              <button
                ref={closeButtonRef}
                className={styles.closeBtn}
                onClick={closeDrawer}
                aria-label="Close resume drawer"
              >
                <X size={18} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>

            {/* Preview area */}
            <div className={styles.preview} aria-busy={drawerState === 'loading'}>
              {/* Loading skeleton */}
              {drawerState === 'loading' && (
                <div className={styles.skeleton}>
                  <Skeleton height="100%" />
                </div>
              )}

              {/* Preview image — hidden while loading */}
              {drawerState !== 'error' && (
                <img
                  src={RESUME_PREVIEW_SRC}
                  alt="Resume preview — first page"
                  className={[
                    styles.previewImage,
                    drawerState === 'ready' || drawerState === 'downloading'
                      ? styles.previewVisible
                      : styles.previewHidden,
                  ].join(' ')}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  loading="eager"
                />
              )}

              {/* Error state */}
              {drawerState === 'error' && (
                <div className={styles.errorState}>
                  <FileX
                    size={32}
                    strokeWidth={1}
                    className={styles.errorIcon}
                    aria-hidden="true"
                  />
                  <p className={styles.errorText}>Preview unavailable</p>
                  <p className={styles.errorSubtext}>
                    Download the PDF to view the full resume.
                  </p>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className={styles.footer}>
              <a
                href={RESUME_PDF_SRC}
                download="Mrinali_Charhate_Resume.pdf"
                onClick={handleDownload}
                className={styles.downloadLink}
                aria-disabled={drawerState === 'downloading'}
              >
                <Button
                  variant="primary"
                  disabled={drawerState === 'downloading'}
                  aria-label={
                    drawerState === 'downloading'
                      ? 'Downloading…'
                      : 'Download resume PDF'
                  }
                >
                  <Download size={14} strokeWidth={1.5} aria-hidden="true" />
                  {drawerState === 'downloading' ? 'Downloading…' : 'Download PDF'}
                </Button>
              </a>

              <a
                href={RESUME_PDF_SRC}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.openLink}
                aria-label="Open resume in new tab"
              >
                Open in new tab ↗
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
