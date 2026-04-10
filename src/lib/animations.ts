/**
 * Animation Utilities
 *
 * Intersection Observer based reveal animations.
 * Respects prefers-reduced-motion.
 * Uses double-RAF to ensure initial hidden state renders
 * before revealing, so CSS transitions actually fire.
 */

export function setupScrollAnimations() {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  if (prefersReducedMotion) {
    // Show all elements immediately
    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  // Double RAF ensures the opacity:0 state has painted before
  // we start observing. Without this, SSR/SSG pages may add
  // is-visible in the same frame as the initial render, causing
  // the browser to skip the CSS transition entirely.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -60px 0px',
        },
      );

      document.querySelectorAll('[data-animate]').forEach((el) => {
        observer.observe(el);
      });
    });
  });
}

/**
 * Staggered animation delay for child elements
 */
export function staggerChildren(
  parentSelector: string,
  delayMs: number = 100,
) {
  const parent = document.querySelector(parentSelector);
  if (!parent) return;

  Array.from(parent.children).forEach((child, index) => {
    (child as HTMLElement).style.animationDelay = `${index * delayMs}ms`;
  });
}
