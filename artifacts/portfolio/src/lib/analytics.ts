/**
 * Analytics — all Plausible event wrappers live here.
 *
 * RULE: No component ever calls plausible() directly.
 * They call the typed wrappers exported from this file.
 *
 * If the Plausible script fails to load (e.g., adblockers), all calls
 * are no-ops because Plausible's script sets a global guard.
 */

declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: { props?: Record<string, string> },
    ) => void;
  }
}

function track(
  eventName: string,
  props?: Record<string, string>,
): void {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(eventName, props ? { props } : undefined);
  }
}

export const analytics = {
  resumeDrawerOpen: (): void => track('resume_drawer_open'),

  resumeDownload: (): void => track('resume_download'),

  githubClick: (slug: string): void =>
    track('github_click', { project_slug: slug }),

  demoClick: (slug: string): void =>
    track('demo_click', { project_slug: slug }),

  themeChange: (theme: string): void => track('theme_change', { theme }),

  emailCopy: (): void => track('contact_email_copy'),

  socialClick: (platform: string): void =>
    track('contact_social_click', { platform }),
};
