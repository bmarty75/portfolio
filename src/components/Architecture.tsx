import { GitFork, BadgeCheck } from 'lucide-react';
import { architectureLayers } from '../data/architecture';
import type { ArchitectureLayer, LayerAccent } from '../types';
import { Reveal } from './ui';

/* Classes de couleur par couche, écrites en entier pour rester détectables
   par le scanner de classes de Tailwind. */
const accents: Record<LayerAccent, { label: string; tag: string; hover: string; title: string }> = {
  cyan: {
    label: 'text-cyan-400',
    tag: 'bg-cyan-500/10 text-cyan-300',
    hover: 'hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]',
    title: 'group-hover:text-cyan-300',
  },
  teal: {
    label: 'text-teal-400',
    tag: 'bg-teal-500/10 text-teal-300',
    hover: 'hover:border-teal-500/50 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)]',
    title: 'group-hover:text-teal-300',
  },
  emerald: {
    label: 'text-emerald-400',
    tag: 'bg-emerald-500/10 text-emerald-300',
    hover: '',
    title: 'group-hover:text-emerald-300',
  },
  blue: {
    label: 'text-blue-400',
    tag: 'bg-blue-500/10 text-blue-300',
    hover: 'hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    title: 'group-hover:text-blue-300',
  },
};

const LayerNode = ({ layer }: { layer: ArchitectureLayer }) => {
  const a = accents[layer.accent];

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-xl bg-slate-900/90 p-5 transition-all ${
        layer.highlight
          ? 'border-2 border-emerald-500/60 shadow-[0_0_24px_rgba(78,222,163,0.18)]'
          : `border border-slate-700/70 ${a.hover}`
      }`}
    >
      {layer.badge && (
        <div className="absolute -top-3 right-4 rounded bg-emerald-500 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-slate-950">
          {layer.badge}
        </div>
      )}

      <div>
        <div className="mb-3 flex items-center justify-between font-mono text-xs text-slate-400">
          <span className={a.label}>{layer.layer}</span>
          <span className={`rounded px-2 py-0.5 text-[10px] ${a.tag}`}>{layer.tag}</span>
        </div>

        <h3 className={`font-display text-lg font-bold text-white transition-colors ${a.title}`}>
          {layer.title}
        </h3>

        <p
          className={`mt-2 text-xs leading-relaxed ${
            layer.highlight ? 'text-slate-300' : 'text-slate-400'
          }`}
        >
          {layer.description}
        </p>
      </div>

      <div
        className={`mt-4 flex items-center justify-between border-t border-slate-800/80 pt-4 font-mono text-[11px] ${
          layer.highlight ? 'text-slate-300' : 'text-slate-400'
        }`}
      >
        <span>{layer.footerLeft}</span>
        <span className={layer.footerRightTone}>{layer.footerRight}</span>
      </div>
    </div>
  );
};

export const Architecture = () => (
  <section
    id="architecture"
    className="relative w-full border-y border-slate-800/80 bg-slate-950/60 py-16"
  >
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <Reveal>
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-1 flex items-center gap-2 font-mono text-xs text-cyan-400">
              <GitFork size={16} />
              <span>SYSTEM DESIGN &amp; INFRASTRUCTURE</span>
            </div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Flux d&apos;Architecture : ERP Universitaire en Production
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-slate-400">
            Architecture réelle déployée sur serveur Debian universitaire pour Mme Sarlot. 6 modules
            métier conteneurisés avec séparation stricte des couches.
          </p>
        </div>
      </Reveal>

      {/* Schéma de flux */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0b101a] p-6 shadow-2xl sm:p-8">
        {/* Impulsion de données traversant le schéma */}
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-[2px] -translate-y-1/2 overflow-hidden bg-slate-800 lg:block"
          aria-hidden
        >
          <div className="data-stream" />
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {architectureLayers.map((layer, i) => (
            <Reveal key={layer.layer} delay={i * 90} className="h-full">
              <LayerNode layer={layer} />
            </Reveal>
          ))}
        </div>

        {/* Télémétrie de déploiement */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-4 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <BadgeCheck size={16} className="shrink-0 text-emerald-400" />
            <span>
              Hébergé en production : <strong>Debian Linux Server (Université de Limoges)</strong>
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="text-slate-300">DOCKER CONTAINERIZED</span>
            <span className="text-slate-600" aria-hidden>•</span>
            <span className="text-slate-300">SWAGGER / OPENAPI 3</span>
            <span className="text-slate-600" aria-hidden>•</span>
            <span className="text-slate-300">AUTO RESTART POLICY</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);
