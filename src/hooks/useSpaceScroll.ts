import { useEffect, type RefObject } from 'react';

/** Hauteur de la navbar fixe + marge, alignée sur `scroll-mt-24`. */
const OFFSET = 96;
/** Distance (px) en deçà de laquelle on considère être déjà sur une section. */
const EPSILON = 40;
/** Durée (ms) pendant laquelle un appui suivant part de la cible précédente. */
const CHAIN_DELAY = 800;

/**
 * Éléments où la barre d'espace a déjà un rôle (saisie, activation). Les liens
 * n'en font pas partie : Espace ne les active pas, elle fait défiler la page.
 */
const INTERACTIVE = 'input, textarea, select, button, summary, [contenteditable], [role="button"]';

/** Position verticale dans la page, sans tenir compte des `transform` (`.reveal`). */
const pageTop = (el: HTMLElement) => {
  let top = 0;
  for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
    top += n.offsetTop;
  }
  return top;
};

/**
 * Barre d'espace : saute à la section suivante (Maj + Espace : précédente)
 * parmi les enfants directs de `root`, au lieu du défilement d'une page.
 */
export function useSpaceScroll(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    // Cible en cours d'animation, pour enchaîner plusieurs appuis rapides.
    let pending: { top: number; at: number } | null = null;
    const clearPending = () => {
      pending = null;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code !== 'Space' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target instanceof Element && e.target.closest(INTERACTIVE)) return;
      if (document.querySelector('dialog[open]') || !root.current) return;

      e.preventDefault();

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const from =
        pending && performance.now() - pending.at < CHAIN_DELAY ? pending.top : window.scrollY;
      const tops = Array.from(root.current.children as HTMLCollectionOf<HTMLElement>, el =>
        Math.min(pageTop(el) - OFFSET, maxScroll),
      );

      const target = e.shiftKey
        ? ([...tops].reverse().find(t => t < from - EPSILON) ?? 0)
        : (tops.find(t => t > from + EPSILON) ?? maxScroll);

      if (Math.abs(target - from) < 1) return;
      pending = { top: target, at: performance.now() };
      window.scrollTo({ top: target });
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scrollend', clearPending);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scrollend', clearPending);
    };
  }, [root]);
}
