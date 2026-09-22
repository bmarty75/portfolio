import { Briefcase, CalendarDays, MapPin } from 'lucide-react';
import { Reveal, SectionHeading } from './ui';

const techTags = [
  { label: 'MySQL', tone: 'text-cyan-300' },
  { label: 'FoxPro Legacy', tone: 'text-amber-300' },
  { label: 'Modélisation relationnelle', tone: 'text-slate-200' },
  { label: 'Scripts de migration SQL', tone: 'text-emerald-300' },
  { label: 'Intégrité & Audit des données', tone: 'text-slate-200' },
];

export const Experience = () => (
  <section id="experience" className="w-full border-t border-slate-800/80 bg-slate-950/40 py-16">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="EXPÉRIENCE EN ENTREPRISE"
          icon={<Briefcase size={16} />}
          title="Mission industrielle & migration de données"
          className="mb-8"
        />
      </Reveal>

      <Reveal delay={100}>
        <article className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#0c121e] p-6 shadow-xl transition-all hover:border-slate-700 sm:p-8">
          <div
            className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400"
            aria-hidden
          />

          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-xl font-bold text-white sm:text-2xl">
                    Migration ERP — Faure Menuiseries
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-amber-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" aria-hidden />
                    EN COURS
                  </span>
                </div>
                <p className="mt-1 font-mono text-sm font-medium text-cyan-400">
                  Développeur en alternance • Direction d&apos;Antoine Faure
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-1.5 font-mono text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <CalendarDays size={15} className="text-cyan-400" />
                  Sept. 2026 – Juil. 2027
                </span>
                <span aria-hidden>•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={15} className="text-cyan-400" />
                  Limoges (87)
                </span>
              </div>
            </div>

            <p className="font-sans text-sm leading-relaxed text-slate-300 sm:text-base">
              Alternance de troisième année de BUT chez{' '}
              <strong className="text-white">Faure Menuiseries</strong>, PME de menuiserie
              industrielle implantée à Limoges. Dans le cadre de la modernisation de l&apos;outil
              informatique sous la direction d&apos;Antoine Faure, je prends en charge la
              transformation complète de la persistance : analyse de la base de données héritée{' '}
              <strong className="text-amber-300">FoxPro</strong> d&apos;un ERP métier, reconception
              d&apos;un schéma relationnel normalisé sous{' '}
              <strong className="text-cyan-300">MySQL</strong>, et élaboration de scripts
              automatisés d&apos;extraction, transformation et contrôle d&apos;intégrité des
              données. Un projet critique ayant un impact direct sur la chaîne opérationnelle de
              l&apos;entreprise, mené en rythme alterné avec ma formation à l&apos;IUT.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {techTags.map(tag => (
                <span
                  key={tag.label}
                  className={`rounded border border-slate-700 bg-slate-800 px-2.5 py-1 font-mono text-xs ${tag.tone}`}
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Reveal>
    </div>
  </section>
);
