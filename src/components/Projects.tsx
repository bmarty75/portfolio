import { ArrowUpRight, BadgeCheck, Check, Code2, ExternalLink, Layers, TerminalSquare } from 'lucide-react';
import { featuredProject, featuredStack, projects } from '../data/projects';
import type { Project } from '../types';
import { IDENTITY } from '../lib/constants';
import { Reveal, SectionHeading } from './ui';

/* ── Projet phare ─────────────────────────────────────────────────────── */

const FeaturedProject = () => {
  const p = featuredProject;

  return (
    <article className="group relative w-full overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-[#0d1422] to-slate-950 p-6 shadow-2xl transition-all hover:border-cyan-400/60 sm:p-9">
      <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded border border-emerald-500/40 bg-emerald-500/20 px-3 py-1 font-mono text-xs font-bold tracking-wider text-emerald-300">
              {p.status}
            </span>
            <span className="font-mono text-xs uppercase text-slate-400">{p.category}</span>
          </div>

          {p.githubUrl && (
            <a
              href={p.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 font-mono text-xs text-slate-200 transition-colors hover:bg-slate-700"
            >
              <Code2 size={15} />
              <span>Code source GitHub</span>
              <ArrowUpRight size={13} />
            </a>
          )}
        </div>

        <div>
          <h3 className="font-display text-2xl font-bold text-white transition-colors group-hover:text-cyan-300 sm:text-3xl">
            {p.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-slate-400">
            <span className="font-semibold text-cyan-400">{p.meta?.[0]}</span>
            <span aria-hidden>•</span>
            <span>{p.meta?.[1]}</span>
            <span aria-hidden>•</span>
            <span>{p.meta?.[2]}</span>
            <span aria-hidden>•</span>
            <span className="text-emerald-400">Commanditaire réel : Mme Sarlot</span>
          </div>
        </div>

        <p className="font-sans text-sm leading-relaxed text-slate-300 sm:text-base">
          Conception intégrale et déploiement en conditions réelles d&apos;une application
          d&apos;entreprise pour l&apos;administration de l&apos;IUT du Limousin. En équipe de 5
          étudiants développeurs, nous avons implémenté{' '}
          <strong className="text-white">6 modules métier complets</strong> : authentification
          stateless JWT avec gestion fine des habilitations via{' '}
          <strong className="text-cyan-300">Spring Security</strong>, gestion de la maquette
          pédagogique, fiches ressources universitaires, module TAC, suivi des heures
          d&apos;enseignement et collecte des feedbacks. L&apos;infrastructure est hébergée sur le
          serveur Linux Debian de l&apos;université avec conteneurisation Docker, proxy Nginx et
          migrations automatisées Flyway.
        </p>

        {/* Panneaux livrables / stack */}
        <div className="grid grid-cols-1 gap-4 pt-2 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-white">
              <BadgeCheck size={18} className="text-emerald-400" />
              <span>Livrables &amp; Garanties Qualité</span>
            </div>
            <ul className="space-y-2 font-sans text-xs text-slate-300">
              {p.deliverables.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <Check size={16} className="shrink-0 text-cyan-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-white">
              <Layers size={18} className="text-cyan-400" />
              <span>Stack de Déploiement</span>
            </div>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {featuredStack.map(tech => (
                <span key={tech.label} className={`rounded border px-2 py-0.5 ${tech.tone}`}>
                  {tech.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

/* ── Projet secondaire ────────────────────────────────────────────────── */

const ProjectCard = ({ project, tone }: { project: Project; tone: 'cyan' | 'teal' }) => (
  <article className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-6 transition-all hover:border-slate-700 hover:shadow-xl">
    <div className="space-y-4">
      <div className="flex items-center justify-between font-mono text-xs text-slate-400">
        <span className={`uppercase ${tone === 'cyan' ? 'text-cyan-400' : 'text-teal-400'}`}>
          {project.category}
        </span>
        <span>{project.date}</span>
      </div>

      <h3
        className={`font-display text-xl font-bold text-white transition-colors ${
          tone === 'cyan' ? 'group-hover:text-cyan-300' : 'group-hover:text-teal-300'
        }`}
      >
        {project.title}
      </h3>

      <p className="font-mono text-xs text-emerald-400">{project.role}</p>

      <p className="font-sans text-xs leading-relaxed text-slate-300 sm:text-sm">
        {project.fullDescription}
      </p>

      <div className="flex flex-wrap gap-1.5 pt-1 font-mono text-xs">
        {project.techs.map((tech, i) => (
          <span
            key={tech}
            className={`rounded border border-slate-700 bg-slate-800 px-2 py-0.5 ${
              i === 0 ? 'text-cyan-300' : i === project.techs.length - 1 ? 'text-emerald-300' : 'text-slate-300'
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-5">
      {project.githubUrl ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-mono text-xs text-cyan-400 transition-colors hover:text-cyan-300"
        >
          <span>Explorer sur GitHub</span>
          <ArrowUpRight size={14} />
        </a>
      ) : (
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-500">
          <TerminalSquare size={14} /> Projet académique
        </span>
      )}
      {project.footerNote && (
        <span className="font-mono text-[11px] text-slate-500">{project.footerNote}</span>
      )}
    </div>
  </article>
);

/* ── Section ──────────────────────────────────────────────────────────── */

export const Projects = () => (
  <section id="projets" className="relative w-full py-20">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <Reveal>
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="RÉALISATIONS MAJEURES"
            icon={<TerminalSquare size={16} />}
            tone="emerald"
            title={<>Projets &amp; Ingénierie Logicielle</>}
          />
          <a
            href={IDENTITY.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 font-mono text-xs text-cyan-400 transition-colors hover:text-cyan-300"
          >
            <span>{IDENTITY.githubHandle}</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </Reveal>

      <div className="flex flex-col gap-8">
        <Reveal delay={100}>
          <FeaturedProject />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={140 + i * 90} className="h-full">
              <ProjectCard project={project} tone={i === 0 ? 'cyan' : 'teal'} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
