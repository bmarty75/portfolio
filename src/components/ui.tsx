import type { ReactNode } from 'react';
import { techDetails } from '../data/techDetails';
import { techLogos } from '../data/techLogos';
import { useReveal } from '../hooks/useReveal';
import { useTechDialog } from '../lib/techDialog';

/** Révèle son contenu à chaque fois qu'il entre dans le viewport. */
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

/** Luminance relative WCAG d'une couleur hexadécimale (« RRGGBB »). */
const luminance = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map(i => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** Les marques trop sombres pour le fond (#1a1b21) prennent la couleur du texte. */
const SURFACE_LUMINANCE = luminance('1a1b21');
const readableBrandColor = (hex: string) =>
  (luminance(hex) + 0.05) / (SURFACE_LUMINANCE + 0.05) >= 3 ? `#${hex}` : 'currentColor';

/** Logo d'une technologie : couleur de marque si lisible, icône Lucide sinon. */
export const TechIcon = ({ name, size = 16 }: { name: string; size?: number }) => {
  const logo = techLogos[name];
  if (!logo) return null;
  if (!('path' in logo)) {
    const Icon = logo;
    return <Icon size={size} className="shrink-0 text-on-surface-variant" aria-hidden />;
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={readableBrandColor(logo.hex)}
      className="shrink-0"
      aria-hidden
    >
      <path d={logo.path} />
    </svg>
  );
};

/**
 * Étiquette technique monospace, précédée du logo de la technologie s'il existe.
 * Cliquable lorsqu'une fiche explicative est disponible.
 */
export const Chip = ({
  label,
  className = 'bg-surface-container text-on-surface',
}: {
  label: string;
  className?: string;
}) => {
  const openTech = useTechDialog();
  const base = `inline-flex items-center gap-1.5 rounded px-2 py-1 font-mono text-code-sm ${className}`;
  const content = (
    <>
      <TechIcon name={label} size={13} />
      {label}
    </>
  );

  if (!techDetails[label]) return <span className={base}>{content}</span>;
  return (
    <button
      type="button"
      onClick={() => openTech(label)}
      aria-haspopup="dialog"
      title={`En savoir plus : ${label}`}
      className={`${base} cursor-pointer ring-1 ring-transparent transition-shadow hover:ring-primary/50`}
    >
      {content}
    </button>
  );
};

/** Monogramme affiché dans l'en-tête et le pied de page. */
export const Monogram = () => (
  <span
    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-container font-mono text-[12px] font-medium text-primary"
    aria-hidden
  >
    BM
  </span>
);
