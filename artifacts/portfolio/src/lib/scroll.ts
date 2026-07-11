/**
 * Smooth scroll utilities.
 * CSS scroll-padding-top on <html> (set in global.css to var(--nav-height))
 * handles the 80px nav offset automatically — no manual offset calculation needed.
 *
 * All programmatic navigation (CTA buttons, mobile nav links) goes through
 * scrollToSection. Anchor <a href="#id"> clicks also call handleAnchorClick
 * to prevent the native jump and use smooth scroll instead.
 */

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Smooth-scrolls to a section by its ID.
 * Falls back silently if the element doesn't exist yet (future milestones).
 * Respects prefers-reduced-motion by jumping instantly instead of animating.
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;

  // scrollIntoView({ block: 'start' }) ignores scroll-padding-top on <html>.
  // Read the nav height from the CSS token and subtract it manually so the
  // section heading lands just below the fixed navbar.
  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '56',
    10,
  );
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight;

  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  });
}

/**
 * Call this in an anchor's onClick handler when the href is an anchor link.
 * Prevents the native jump, uses smooth scroll instead.
 */
export function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
): void {
  if (!href.startsWith('#')) return;
  e.preventDefault();
  const id = href.slice(1);
  scrollToSection(id);
}

/**
 * Scrolls to the top of the page.
 * Respects prefers-reduced-motion by jumping instantly instead of animating.
 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}
