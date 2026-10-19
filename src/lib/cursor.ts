/** Durée (ms) pendant laquelle l'anneau du curseur affiche la coche. */
const CONFIRM_DURATION = 1200;

let timer = 0;

/**
 * Transforme brièvement l'anneau du curseur personnalisé en coche, pour
 * confirmer une action (voir Cursor et .cursor-confirm).
 */
export const flashCursorCheck = () => {
  const root = document.documentElement;
  if (!root.classList.contains('has-custom-cursor')) return;
  window.clearTimeout(timer);
  root.classList.add('cursor-confirm');
  timer = window.setTimeout(() => root.classList.remove('cursor-confirm'), CONFIRM_DURATION);
};
