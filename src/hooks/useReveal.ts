import { useEffect, useRef, useState } from 'react';

/** Part visible de l'élément à partir de laquelle l'animation se déclenche. */
const SHOW_RATIO = 0.1;

/**
 * Observe un élément et bascule `active` à chaque fois qu'il entre dans le
 * viewport. L'état est réinitialisé dès que l'élément en sort entièrement, de
 * sorte que l'animation se rejoue en remontant comme en redescendant.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= SHOW_RATIO) {
          setVisible(true);
        } else if (!entry.isIntersecting) {
          // Masqué uniquement hors écran : aucune disparition visible.
          setVisible(false);
        }
      },
      { threshold: [0, SHOW_RATIO] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible] as const;
}
