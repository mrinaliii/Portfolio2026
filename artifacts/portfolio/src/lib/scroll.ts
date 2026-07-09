/**
 * Smooth scroll utilities.
 * CSS scroll-padding-top on <html> (set in global.css to var(--nav-height))
 * handles the 80px nav offset automatically — no manual offset calculation needed.
 *
 * All programmatic navigation (CTA buttons, mobile nav links) goes through
 * scrollToSection. Anchor <a href="#id"> clicks also call handleAnchorClick
 * to prevent the native jump and use smooth scroll instead.
 */

/**
 * Smooth-scrolls to a section by its ID.
 * Falls back silently if the element doesn't exist yet (future milestones).
 */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
