import { ChevronLeft, ChevronRight, Film, ImageOff, Play, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent } from 'react';
import type { DemoMedia } from '../types';

/** Distance horizontale minimale (px) pour qu'un glissement change de média. */
const SWIPE_THRESHOLD = 50;

/** Emplacement affiché tant qu'une capture ou une vidéo n'a pas été ajoutée. */
const Placeholder = ({ media }: { media: DemoMedia }) => {
  const Icon = media.type === 'video' ? Film : ImageOff;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-space-md text-center text-outline">
      <Icon size={32} aria-hidden />
      <span className="text-body-sm">
        {media.type === 'video' ? 'Vidéo à venir' : 'Capture à venir'}
      </span>
      <code className="font-mono text-code-sm opacity-70">public{media.src}</code>
    </div>
  );
};

/** Galerie modale : vidéo et captures d'un projet, au clavier, à la souris ou au doigt. */
const DemoDialog = ({
  title,
  media,
  onClose,
}: {
  title: string;
  media: DemoMedia[];
  onClose: () => void;
}) => {
  const ref = useRef<HTMLDialogElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState<Set<string>>(() => new Set());
  const current = media[index];
  const multiple = media.length > 1;

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  const go = (delta: number) => setIndex(i => (i + delta + media.length) % media.length);
  const markFailed = (src: string) => setFailed(prev => new Set(prev).add(src));

  const onKeyDown = (e: KeyboardEvent) => {
    if (!multiple) return;
    if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
  };

  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') swipeStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (swipeStart.current === null) return;
    const dx = e.clientX - swipeStart.current;
    swipeStart.current = null;
    if (multiple && Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
  };

  const navButton =
    'absolute top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70';

  return (
    <dialog
      ref={ref}
      aria-labelledby="demo-dialog-title"
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={e => e.target === e.currentTarget && ref.current?.close()}
      className="tech-dialog m-auto w-[calc(100%-2rem)] max-w-4xl rounded-2xl bg-surface-container-low text-on-surface shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm"
    >
      <div className="space-y-space-md p-space-md md:p-space-lg">
        <div className="flex items-start justify-between gap-space-md">
          <div className="min-w-0 space-y-1">
            <span className="font-mono text-label-caps uppercase tracking-wider text-primary">
              Démonstration
            </span>
            <h3 id="demo-dialog-title" className="text-headline-sm font-semibold text-on-surface">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Fermer"
            className="-mr-1 -mt-1 rounded p-1 text-outline transition-colors hover:bg-surface-container hover:text-on-surface"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        {/* Scène */}
        <div
          className="relative aspect-video max-h-[60vh] w-full touch-pan-y overflow-hidden rounded-lg bg-surface-container-lowest"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (swipeStart.current = null)}
        >
          {failed.has(current.src) ? (
            <Placeholder media={current} />
          ) : current.type === 'video' ? (
            <video
              key={current.src}
              src={current.src}
              poster={current.poster && !failed.has(current.poster) ? current.poster : undefined}
              controls
              playsInline
              preload="metadata"
              onError={() => markFailed(current.src)}
              className="h-full w-full object-contain"
            />
          ) : (
            <img
              key={current.src}
              src={current.src}
              alt={current.caption}
              onError={() => markFailed(current.src)}
              className="h-full w-full select-none object-contain"
              draggable={false}
            />
          )}

          {multiple && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Média précédent"
                className={`${navButton} left-2`}
              >
                <ChevronLeft size={20} aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Média suivant"
                className={`${navButton} right-2`}
              >
                <ChevronRight size={20} aria-hidden />
              </button>
            </>
          )}
        </div>

        {/* Légende */}
        <div className="flex items-baseline justify-between gap-space-md">
          <p className="text-body-sm text-on-surface-variant" aria-live="polite">
            {current.caption}
          </p>
          {multiple && (
            <span className="shrink-0 font-mono text-code-sm text-outline">
              {index + 1} / {media.length}
            </span>
          )}
        </div>

        {/* Miniatures */}
        {multiple && (
          <ul className="flex gap-2 overflow-x-auto pb-1">
            {media.map((m, i) => {
              const thumb = m.type === 'video' ? m.poster : m.src;
              const showThumb = thumb && !failed.has(thumb);
              return (
                <li key={m.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={m.caption}
                    aria-current={i === index}
                    className={`relative flex h-14 w-24 items-center justify-center overflow-hidden rounded bg-surface-container-lowest text-outline ring-2 transition-shadow ${
                      i === index ? 'ring-primary' : 'ring-transparent hover:ring-primary/40'
                    }`}
                  >
                    {showThumb ? (
                      <img
                        src={thumb}
                        alt=""
                        onError={() => markFailed(thumb)}
                        className="h-full w-full object-cover"
                        draggable={false}
                      />
                    ) : m.type === 'video' ? (
                      <Film size={18} aria-hidden />
                    ) : (
                      <ImageOff size={18} aria-hidden />
                    )}
                    {m.type === 'video' && showThumb && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/30 text-white">
                        <Play size={16} fill="currentColor" aria-hidden />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </dialog>
  );
};

/** Bouton « Voir la démo » qui ouvre la galerie du projet. */
export const DemoButton = ({ title, media }: { title: string; media: DemoMedia[] }) => {
  const [open, setOpen] = useState(false);
  if (media.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="inline-flex shrink-0 items-center gap-1.5 rounded bg-primary/10 px-2 py-1 font-mono text-code-sm text-primary transition-colors hover:bg-primary/20"
      >
        <Play size={13} fill="currentColor" aria-hidden />
        Voir la démo
      </button>
      {open && <DemoDialog title={title} media={media} onClose={() => setOpen(false)} />}
    </>
  );
};
