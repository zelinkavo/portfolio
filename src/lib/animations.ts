/**
 * Animation Utilities
 *
 * Intersection Observer based reveal animations.
 * Respects prefers-reduced-motion.
 */

export function setupScrollAnimations() {
  if (typeof window === 'undefined') return;

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  if (prefersReducedMotion) return;

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
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    },
  );

  document.querySelectorAll('[data-animate]').forEach((el) => {
    observer.observe(el);
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
