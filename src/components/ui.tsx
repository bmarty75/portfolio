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

/** Bandeau titre d'une section : pastille monospace + titre display. */
export const SectionHeading = ({
  eyebrow,
  icon,
  title,
  tone = 'cyan',
  className = '',
}: {
  eyebrow: string;
  icon: ReactNode;
  title: ReactNode;
  tone?: 'cyan' | 'emerald';
  className?: string;
}) => (
  <div className={className}>
    <div
      className={`mb-1 flex items-center gap-2 font-mono text-xs ${
        tone === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'
      }`}
    >
      {icon}
      <span>{eyebrow}</span>
    </div>
    <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
      {title}
    </h2>
  </div>
);

/** Étiquette technique monospace. */
export const Chip = ({ label, className = '' }: { label: string; className?: string }) => (
  <span
    className={`rounded border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-xs ${
      className || 'text-slate-300'
    }`}
  >
    {label}
  </span>
);
