import { useEffect, useState } from 'react';
import { TerminalSquare, Network, Copy } from 'lucide-react';
import { IDENTITY, ALTERNANCE } from '../lib/constants';
import { Terminal } from './Terminal';

const specs = [
  { label: 'Stack', value: 'Java & Python', tone: 'text-emerald-400' },
  { label: 'Localisation', value: 'Limoges & Remote', tone: 'text-cyan-400' },
  { label: 'Mindset', value: 'Rigueur & collectif', tone: 'text-amber-400' },
];

/** Bouton copiant l'adresse e-mail dans le presse-papiers. */
const CopyEmailButton = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(IDENTITY.email);
      setCopied(true);
    } catch {
      /* Presse-papiers indisponible : on ouvre le client mail en repli. */
      window.location.href = `mailto:${IDENTITY.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-950 px-3 py-3 font-mono text-xs text-slate-400 transition-colors hover:text-emerald-400"
    >
      {copied ? (
        <span className="text-emerald-400">Email copié !</span>
      ) : (
        <>
          <span className="text-emerald-500">$</span>
          <span>curl contact</span>
          <Copy size={14} className="opacity-70 transition-opacity group-hover:opacity-100" />
        </>
      )}
    </button>
  );
};

export const Hero = () => (
  <section id="top" className="relative w-full overflow-hidden pb-20 pt-10 md:pb-28 md:pt-16">
    {/* Halos ambiants */}
    <div className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" aria-hidden />
    <div className="pointer-events-none absolute right-1/4 top-1/3 h-96 w-96 rounded-full bg-emerald-500/10 blur-[140px]" aria-hidden />

    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Colonne gauche */}
        <div className="flex flex-col gap-5 text-left lg:col-span-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
            <span>EN ALTERNANCE — {ALTERNANCE.company.toUpperCase()}</span>
            <span className="text-slate-500" aria-hidden>•</span>
            <span className="text-slate-300">{ALTERNANCE.year}</span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {IDENTITY.firstName}{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              {IDENTITY.lastName}
            </span>
          </h1>

          <div className="flex items-center gap-2 font-mono text-lg font-medium text-cyan-300 sm:text-xl">
            <span className="text-emerald-400">&gt;</span>
            <span>{IDENTITY.role}</span>
          </div>

          <p className="font-sans text-base leading-relaxed text-slate-300 sm:text-lg">
            Étudiant en{' '}
            <strong className="font-semibold text-white">
              3ème année de BUT Informatique à l&apos;IUT du Limousin
            </strong>
            , passionné par la modélisation logicielle résiliente, les architectures modulaires et
            les applications menées de bout en bout, de la base de données à l&apos;interface.
          </p>

          {/* Indicateurs rapides */}
          <div className="grid grid-cols-3 gap-3 py-1 font-mono text-xs">
            {specs.map(spec => (
              <div key={spec.label} className="rounded-lg border border-slate-800 bg-slate-900/80 p-2.5">
                <div className="text-[10px] uppercase text-slate-400">{spec.label}</div>
                <div className={`mt-0.5 font-semibold ${spec.tone}`}>{spec.value}</div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projets"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-mono text-sm font-semibold text-slate-950 shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all hover:from-cyan-400 hover:to-blue-500 active:scale-95"
            >
              <TerminalSquare size={18} />
              <span>Explorer les Projets</span>
            </a>

            <a
              href="#architecture"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700/80 bg-slate-900 px-4 py-3 font-mono text-sm text-slate-200 transition-all hover:border-cyan-500/50 hover:bg-slate-800"
            >
              <Network size={18} className="text-cyan-400" />
              <span>Voir l&apos;Architecture ERP</span>
            </a>

            <CopyEmailButton />
          </div>
        </div>

        {/* Colonne droite */}
        <div className="min-w-0 lg:col-span-6">
          <Terminal />
        </div>
      </div>
    </div>
  </section>
);
