import { useEffect } from 'react';

/** Éléments sur lesquels l'anneau s'agrandit. */
const INTERACTIVE = 'a, button, summary, label, [role="button"], .cursor-pointer';

/** Part du chemin restant parcourue par l'anneau à chaque image (inertie). */
const RING_EASE = 0.18;

/**
 * Remplace le curseur système par un point chartreuse et un anneau qui le suit
 * avec un léger retard, accompagnés d'une grande lueur diffuse qui éclaire le
 * fond de la page. Actif uniquement avec une souris (pointeur précis).
 *
 * Les éléments sont créés hors de React : ils doivent pouvoir passer dans un
 * `<dialog>` ouvert, sans quoi la couche supérieure de la modale les masquerait.
 */
export const Cursor = () => {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = reduceMotion ? 1 : RING_EASE;

    const dot = document.createElement('div');
    const ring = document.createElement('div');
    const glow = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    glow.className = 'cursor-glow';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    glow.setAttribute('aria-hidden', 'true');

    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let frame = 0;

    const place = (el: HTMLElement, x: number, y: number) => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    // Suit la modale ouverte pour rester au-dessus de son fond.
    const mount = () => {
      const host = document.querySelector('dialog[open]') ?? document.body;
      if (dot.parentElement !== host) host.append(ring, dot);
    };

    const tick = () => {
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      place(ring, ringX, ringY);
      place(glow, ringX, ringY);
      // S'arrête une fois l'anneau rattrapé, jusqu'au prochain mouvement.
      frame = Math.hypot(mouseX - ringX, mouseY - ringY) > 0.1 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      if (!root.classList.contains('cursor-visible')) {
        // Première apparition : l'anneau part du pointeur, sans glisser depuis le coin.
        ringX = e.clientX;
        ringY = e.clientY;
        root.classList.add('cursor-visible');
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      mount();
      place(dot, mouseX, mouseY);
      if (!frame) frame = requestAnimationFrame(tick);

      const target = e.target instanceof Element ? e.target : null;
      root.classList.toggle('cursor-hover', !!target?.closest(INTERACTIVE));
    };

    const onDown = () => root.classList.add('cursor-press');
    const onUp = () => root.classList.remove('cursor-press');
    const onLeave = () => root.classList.remove('cursor-visible');

    // La lueur reste sous le contenu de la page, même quand une modale est ouverte.
    document.body.prepend(glow);
    mount();
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    root.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      root.removeEventListener('mouseleave', onLeave);
      root.classList.remove('has-custom-cursor', 'cursor-visible', 'cursor-hover', 'cursor-press');
      dot.remove();
      ring.remove();
      glow.remove();
    };
  }, []);

  return null;
};
