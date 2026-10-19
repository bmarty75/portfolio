import { useEffect, useState } from 'react';

/** Caractères tirés au hasard pendant le « déchiffrement ». */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+/<>=?@$';

/** Délai avant que la première lettre ne commence à défiler (ms). */
const START_DELAY = 250;
/** Décalage entre l'apparition de deux lettres successives (ms). */
const STAGGER = 65;
/** Durée pendant laquelle une lettre défile avant de se figer (ms). */
const SCRAMBLE = 450;
/** Intervalle entre deux tirages de caractères (ms). */
const TICK = 45;

/** `''` : pas encore apparue, `null` : déchiffrée, sinon le glyphe affiché. */
type Cell = string | null;

const randomGlyph = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

/**
 * Affiche un texte qui se « déchiffre » au chargement : chaque lettre apparaît
 * à tour de rôle sous forme de caractères aléatoires, puis se fige sur la
 * bonne valeur, de gauche à droite.
 *
 * Le texte final est toujours présent (invisible) sous chaque lettre animée :
 * la largeur reste stable et la mise en page ne saute pas pendant l'effet.
 */
export const DecodeText = ({ text }: { text: string }) => {
  const chars = [...text];
  const [cells, setCells] = useState<Cell[]>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? chars.map(() => null)
      : chars.map((c) => (c === ' ' ? null : '')),
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const letters = [...text];
    const end = (letters.length - 1) * STAGGER + SCRAMBLE;
    const t0 = performance.now() + START_DELAY;

    // Intervalle plutôt que requestAnimationFrame : si le navigateur suspend
    // les frames (onglet en arrière-plan), le nom finit quand même par s'afficher.
    const timer = window.setInterval(() => {
      const t = performance.now() - t0;
      if (t >= end) {
        window.clearInterval(timer);
        setCells(letters.map(() => null));
        return;
      }
      setCells(
        letters.map((c, i) => {
          if (c === ' ') return null;
          const start = i * STAGGER;
          if (t < start) return '';
          return t < start + SCRAMBLE ? randomGlyph() : null;
        }),
      );
    }, TICK);

    return () => window.clearInterval(timer);
  }, [text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {chars.map((c, i) => {
          const cell = cells[i];
          if (cell === null) return c;
          return (
            <span key={i} className="relative inline-block">
              <span className="invisible">{c}</span>
              <span className="absolute left-1/2 top-0 -translate-x-1/2 font-mono font-normal text-primary">
                {cell}
              </span>
            </span>
          );
        })}
      </span>
    </>
  );
};
