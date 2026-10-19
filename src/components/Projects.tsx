import { ArrowUpRight, Check, CircleCheck, SquareTerminal } from 'lucide-react';
import { featuredProject, projects } from '../data/projects';
import type { Project } from '../types';
import { EXTERNAL } from '../lib/constants';
import { DemoButton } from './DemoDialog';
import { Card, Chip, Eyebrow, Reveal, SectionHeading } from './ui';

/* ── Projet phare ─────────────────────────────────────────────────────── */

const FeaturedProject = () => {
  const p = featuredProject;

  return (
    <Card as="article" className="dim-item flex flex-col gap-space-lg p-space-lg md:p-space-xl">
      {/* En-tête */}
      <div className="flex flex-col justify-between gap-space-sm md:flex-row md:items-center">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
              {p.badge}
            </span>
            <span className="font-mono text-code-sm text-outline">{p.period}</span>
          </div>
          <h3 className="text-headline-lg-mobile font-semibold text-on-surface md:text-headline-lg">
            {p.title}
          </h3>
          <p className="text-body-md text-on-surface-variant">{p.context}</p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 self-start md:self-auto">
          {p.demo && <DemoButton title={p.title} media={p.demo} />}
          {p.githubUrl && (
            <a
              href={p.githubUrl}
              {...EXTERNAL}
              className="inline-flex items-center gap-1 rounded bg-surface-container px-2 py-1 font-mono text-code-sm text-outline transition-colors hover:bg-surface-container-high hover:text-on-surface"
            >
              Code source
              <ArrowUpRight size={14} aria-hidden />
            </a>
          )}
        </div>
      </div>

      {/* Description & spécifications */}
      <div className="grid grid-cols-1 gap-space-lg pt-space-xs lg:grid-cols-12">
        <div className="space-y-space-md lg:col-span-7">
          <p className="text-body-md leading-relaxed text-on-surface-variant">{p.description}</p>

          <div className="space-y-space-sm">
            <Eyebrow>{p.modules.length} modules métier intégrés</Eyebrow>
            <ul className="grid grid-cols-1 gap-2 text-body-sm text-on-surface sm:grid-cols-2">
              {p.modules.map(({ icon: Icon, label }, i) => (
                <li key={label}>
                  <Reveal
                    delay={250 + i * 80}
                    className="flex h-full items-start gap-2 rounded bg-surface-container p-2.5"
                  >
                    <Icon size={16} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                    <span>{label}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between space-y-space-md rounded-lg bg-surface-container-lowest p-space-md font-mono text-code-sm lg:col-span-5">
          <div>
            <div className="mb-2 flex items-center justify-between gap-2 pb-2 text-outline">
              <Eyebrow>Spécifications techniques</Eyebrow>
              <span>{p.platform}</span>
            </div>
            <dl className="space-y-1.5">
              {p.specs.map(spec => (
                <div key={spec.key} className="flex justify-between gap-space-md py-1">
                  <dt className="shrink-0 text-outline">{spec.key} :</dt>
                  <dd className="text-right font-medium text-on-surface">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex items-center gap-1.5 pt-space-xs text-[12px] text-outline">
            <SquareTerminal size={16} className="shrink-0 text-primary" aria-hidden />
            <span>{p.specsNote}</span>
          </div>
        </div>
      </div>

      {/* Pied */}
      <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
        <div className="flex flex-wrap items-center gap-space-xs">
          {p.techs.map(tech => (
            <Chip key={tech} label={tech} />
          ))}
        </div>
        <span className="flex items-center gap-1 text-body-sm text-primary">
          <CircleCheck size={18} aria-hidden />
          {p.status}
        </span>
      </div>
    </Card>
  );
};

/* ── Projet complémentaire ────────────────────────────────────────────── */

const ProjectCard = ({ project }: { project: Project }) => (
  <Card
    as="article"
    className="dim-item flex h-full flex-col justify-between gap-space-md p-space-lg"
  >
    <div className="space-y-space-sm">
      <div className="flex items-center justify-between gap-space-sm">
        <Eyebrow className="text-primary">{project.category}</Eyebrow>
        <span className="font-mono text-code-sm text-outline">{project.date}</span>
      </div>
      <h3 className="text-headline-md font-semibold text-on-surface">{project.title}</h3>
      <p className="text-body-md leading-relaxed text-on-surface-variant">{project.description}</p>
      <ul className="space-y-1.5 pt-1 text-body-sm text-on-surface-variant">
        {project.points.map(point => (
          <li key={point} className="flex items-start gap-2">
            <Check size={15} className="mt-0.5 shrink-0 text-primary" aria-hidden />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="flex flex-wrap items-end justify-between gap-space-sm pt-space-sm">
      <div className="flex flex-wrap gap-space-xs">
        {project.techs.map(tech => (
          <Chip key={tech} label={tech} />
        ))}
      </div>
      <div className="flex items-center gap-space-sm">
        {project.demo && <DemoButton title={project.title} media={project.demo} />}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            {...EXTERNAL}
            className="inline-flex items-center gap-1 font-mono text-code-sm text-outline transition-colors hover:text-primary"
          >
            GitHub
            <ArrowUpRight size={14} aria-hidden />
          </a>
        )}
      </div>
    </div>
  </Card>
);

/* ── Section ──────────────────────────────────────────────────────────── */

export const Projects = () => (
  <section id="projets" className="flex scroll-mt-24 flex-col gap-space-lg">
    <Reveal>
      <SectionHeading eyebrow="Travaux d'ingénierie" title="Réalisations & Architectures" />
    </Reveal>

    <Reveal delay={80}>
      <FeaturedProject />
    </Reveal>

    <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
      {projects.map((project, i) => (
        <Reveal key={project.title} delay={(i % 2) * 120} className="h-full">
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  </section>
);
