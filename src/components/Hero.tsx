import { ArrowDown, FileText, Github, Linkedin } from 'lucide-react';
import { ALTERNANCE, EXTERNAL, IDENTITY } from '../lib/constants';

export const Hero = () => (
  <section id="about" className="flex scroll-mt-24 flex-col items-start gap-space-lg pt-space-md">
    {/* Statut */}
    <div className="inline-flex items-center gap-space-sm rounded-2xl bg-surface-container-low px-space-md py-1.5 font-mono text-label-caps tracking-wider text-on-surface-variant shadow-sm">
      <span className="inline-block h-2 w-2 shrink-0 animate-pulse rounded-full bg-primary" aria-hidden />
      <span>
        En alternance chez {ALTERNANCE.company} — {ALTERNANCE.period} ({ALTERNANCE.duration})
      </span>
    </div>

    {/* Identité */}
    <div className="flex max-w-4xl flex-col gap-space-lg">
      <div className="flex flex-col items-start gap-space-lg sm:flex-row sm:items-center md:gap-space-xl">
        <img
          src={IDENTITY.photo}
          alt={`${IDENTITY.firstName} ${IDENTITY.lastName}`}
          width={400}
          height={400}
          fetchPriority="high"
          className="h-24 w-24 shrink-0 rounded-full object-cover ring-2 ring-outline-variant ring-offset-4 ring-offset-surface md:h-36 md:w-36"
        />
        <div className="flex min-w-0 flex-col gap-space-xs">
          <div className="flex flex-wrap items-baseline gap-x-space-md gap-y-1">
            <span className="font-mono text-label-caps uppercase tracking-widest text-primary">
              Ingénieur logiciel junior
            </span>
            <span className="font-mono text-code-sm text-outline">/ BUT Informatique 3e année</span>
          </div>
          <h1 className="text-display-hero-mobile font-semibold tracking-tight text-on-surface md:text-display-hero">
            {IDENTITY.firstName} {IDENTITY.lastName}
          </h1>
          <p className="text-headline-md font-medium tracking-tight text-primary">{IDENTITY.role}</p>
        </div>
      </div>

      <p className="max-w-3xl text-body-lg leading-relaxed text-on-surface-variant">
        Étudiant en 3<sup>e</sup> année de BUT Informatique à l&apos;IUT du Limousin, en alternance
        chez {ALTERNANCE.company}. Je conçois des architectures applicatives fiables, modulaires et
        maintenables, avec une affinité prononcée pour l&apos;écosystème Java, Python et les bases de
        données relationnelles (SQL).
      </p>
    </div>

    {/* Actions & profils */}
    <div className="flex w-full flex-wrap items-center gap-space-md pt-space-sm">
      <a
        href="#projets"
        className="inline-flex items-center justify-center rounded bg-on-surface px-space-lg py-2.5 text-body-sm font-semibold text-surface shadow-md transition-all hover:bg-white"
      >
        <span>Explorer les projets</span>
        <ArrowDown size={16} className="ml-1.5" />
      </a>

      <a
        href={IDENTITY.cv}
        download="CV_Marty_Benjamin.pdf"
        className="inline-flex items-center justify-center rounded bg-surface-container px-space-md py-2.5 text-body-sm text-on-surface shadow-sm transition-colors hover:bg-surface-container-high"
      >
        <FileText size={16} className="mr-1.5 text-primary" />
        <span>Télécharger le CV (PDF)</span>
      </a>

      <span className="mx-space-xs hidden h-6 w-px bg-surface-variant sm:block" aria-hidden />

      <div className="flex flex-wrap items-center gap-space-sm">
        <a
          href={IDENTITY.github}
          {...EXTERNAL}
          className="inline-flex items-center gap-1.5 rounded px-space-sm py-2 font-mono text-code-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
        >
          <Github size={16} />
          <span>github/bmarty75</span>
        </a>
        <a
          href={IDENTITY.linkedin}
          {...EXTERNAL}
          className="inline-flex items-center gap-1.5 rounded px-space-sm py-2 font-mono text-code-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
        >
          <Linkedin size={16} />
          <span>linkedin/benjamin-marty-info</span>
        </a>
      </div>
    </div>
  </section>
);
