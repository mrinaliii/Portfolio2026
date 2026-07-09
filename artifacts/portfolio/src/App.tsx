import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { DrawerProvider } from './context/DrawerContext';
import { ProgressProvider } from './context/ProgressContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProgressBar } from './components/ui/ProgressBar/ProgressBar';
import { SkipLink } from './components/ui/SkipLink/SkipLink';
import { ResumeDrawer } from './components/resume-drawer/ResumeDrawer';

const HomePage = lazy(() => import('./pages/HomePage'));
const CaseStudyPage = lazy(() => import('./pages/CaseStudyPage'));

/**
 * Application root.
 * Provider order (outer → inner):
 *   HelmetProvider → ThemeProvider → DrawerProvider → ProgressProvider → Router
 *
 * ProgressBar: NProgress-style top bar, reads ProgressContext.
 * SkipLink: first focusable element — jumps to #main-content.
 * ResumeDrawer: globally mounted; toggled by DrawerContext.openDrawer().
 */
export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <DrawerProvider>
          <ProgressProvider>
            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
              }}
            >
              <SkipLink />
              <ProgressBar />
              {/* Resume drawer — globally mounted above all page content */}
              <ResumeDrawer />
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/work/:projectSlug" element={<CaseStudyPage />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </ProgressProvider>
        </DrawerProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
