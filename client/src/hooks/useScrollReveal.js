import { useEffect } from 'react';

/**
 * Custom hook to trigger scroll reveal animations when elements with
 * 'reveal-fade-up' or 'reveal-scale-in' enter the viewport.
 * Uses IntersectionObserver with prefers-reduced-motion check.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-fade-up, .reveal-scale-in, .reveal-mask-in').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const elements = document.querySelectorAll('.reveal-fade-up, .reveal-scale-in, .reveal-mask-in');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}
