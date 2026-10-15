import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

/** Révèle son contenu la première fois qu'il entre dans le viewport. */
export const Reveal = ({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'active' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

/** Libellé monospace en capitales (sur-titres, étiquettes de cartes). */
export const Eyebrow = ({
  children,
  className = 'text-outline',
}: {
  children: ReactNode;
  className?: string;
}) => (
  <span className={`font-mono text-label-caps uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

/** En-tête de section : sur-titre accentué suivi d'un filet, puis titre. */
export const SectionHeading = ({ eyebrow, title }: { eyebrow: string; title: ReactNode }) => (
  <div className="flex flex-col gap-space-xs">
    <div className="flex items-center gap-2">
      <Eyebrow className="tracking-widest text-primary">{eyebrow}</Eyebrow>
      <span className="h-px w-8 bg-surface-variant" aria-hidden />
    </div>
    <h2 className="text-headline-lg-mobile font-semibold tracking-tight text-on-surface md:text-headline-lg">
      {title}
    </h2>
  </div>
);

/** Carte de base de la maquette : surface surélevée, sans bordure. */
export const Card = ({
  children,
  className = '',
  id,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: 'div' | 'article' | 'section';
}) => (
  <Tag id={id} className={`rounded-xl bg-surface-container-low shadow-sm ${className}`}>
    {children}
  </Tag>
);

/** Étiquette technique monospace. */
export const Chip = ({
  label,
  className = 'bg-surface-container text-on-surface',
}: {
  label: string;
  className?: string;
}) => (
  <span className={`rounded px-2 py-1 font-mono text-code-sm ${className}`}>{label}</span>
);

/** Monogramme affiché dans l'en-tête et le pied de page. */
export const Monogram = () => (
  <span
    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-container font-mono text-[12px] font-medium text-primary"
    aria-hidden
  >
    BM
  </span>
);
