import { useEffect, useRef, useState } from 'react';

/**
 * Observe un élément et bascule `active` la première fois qu'il entre dans le
 * viewport. L'observation est libérée immédiatement après.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      // Déclenche un peu après l'entrée dans l'écran pour que l'animation soit visible.
      { threshold: 0.1, rootMargin: '0px 0px -12% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}
