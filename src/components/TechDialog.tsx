import { X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { techDetails } from '../data/techDetails';
import { TechDialogContext } from '../lib/techDialog';
import { Eyebrow, TechIcon } from './ui';

/**
 * Fournit l'ouverture des fiches techniques et affiche la fenêtre modale
 * partagée. Le `<dialog>` natif gère le piège du focus et la touche Échap.
 */
export const TechDialogProvider = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDialogElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const info = label ? techDetails[label] : undefined;

  const open = useCallback((next: string) => {
    if (techDetails[next]) setLabel(next);
  }, []);

  useEffect(() => {
    const dialog = ref.current;
    if (label && dialog && !dialog.open) dialog.showModal();
  }, [label]);

  const close = () => ref.current?.close();

  return (
    <TechDialogContext.Provider value={open}>
      {children}

      <dialog
        ref={ref}
        aria-labelledby="tech-dialog-title"
        onClose={() => setLabel(null)}
        // Un clic sur le fond (hors du panneau) ferme la fiche.
        onClick={e => e.target === e.currentTarget && close()}
        className="tech-dialog m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl bg-surface-container-low text-on-surface shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        {info && label && (
          <div className="space-y-space-md p-space-lg">
            <div className="flex items-start gap-space-md">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-container">
                <TechIcon name={label} size={26} />
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <Eyebrow className="text-primary">{info.category}</Eyebrow>
                <h3 id="tech-dialog-title" className="text-headline-sm font-semibold text-on-surface">
                  {info.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Fermer"
                className="-mr-1 -mt-1 rounded p-1 text-outline transition-colors hover:bg-surface-container hover:text-on-surface"
              >
                <X size={18} aria-hidden />
              </button>
            </div>

            <p className="text-body-md leading-relaxed text-on-surface-variant">{info.summary}</p>

            {info.usage && (
              <div className="space-y-1 rounded-lg bg-surface-container p-space-md">
                <Eyebrow>Dans mon parcours</Eyebrow>
                <p className="text-body-sm text-on-surface">{info.usage}</p>
              </div>
            )}
          </div>
        )}
      </dialog>
    </TechDialogContext.Provider>
  );
};
