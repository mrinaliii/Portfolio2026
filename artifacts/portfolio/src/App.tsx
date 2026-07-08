import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/context/ThemeContext';
import { DrawerProvider } from '@/context/DrawerContext';
import { ProgressProvider } from '@/context/ProgressContext';
import { SkipLink } from '@/components/ui/SkipLink/SkipLink';

import '@/styles/global.css';
import '@/styles/typography.css';
import '@/styles/animations.css';

// Route-level code splitting — each page is its own JS chunk
const HomePage = lazy(() =>
  import('@/pages/HomePage').then((m) => ({ default: m.HomePage })),
);
const CaseStudyPage = lazy(() =>
  import('@/pages/CaseStudyPage').then((m) => ({ default: m.CaseStudyPage })),
);

/**
 * PageviewTracker — fires a Plausible virtual pageview on every route change.
 * Placed inside BrowserRouter so it has access to useLocation().
 */
function PageviewTracker() {
  const location = useLocation();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof window.plausible === 'function'
    ) {
      window.plausible('pageview');
    }
  }, [location.pathname]);

  return null;
}

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <DrawerProvider>
          <ProgressProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              {/* Accessibility: always the first Tab stop */}
              <SkipLink />

              {/* SPA pageview tracking */}
              <PageviewTracker />

              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/work/:projectSlug"
                    element={<CaseStudyPage />}
                  />
                  {/* 404 → home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ProgressProvider>
        </DrawerProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
