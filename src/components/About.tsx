import { Fingerprint, IdCard } from 'lucide-react';
import { IDENTITY, ALTERNANCE } from '../lib/constants';
import { Reveal, SectionHeading } from './ui';

const identityRows = [
  { key: 'Alternance :', value: ALTERNANCE.company, tone: 'text-white font-semibold' },
  { key: 'Période :', value: ALTERNANCE.period, tone: 'text-emerald-400 font-semibold' },
  { key: 'Formation :', value: 'BUT Informatique', tone: 'text-slate-200' },
  { key: 'Mobilité :', value: 'Limoges, Limousin & Remote', tone: 'text-slate-200' },
];

const metrics = [
  { value: '11 M', label: 'Alternance en entreprise', tone: 'text-cyan-400' },
  { value: 'BUT 3', label: 'Année en cours à l’IUT', tone: 'text-emerald-400' },
  { value: '6 Mods', label: 'ERP Universitaire déployé', tone: 'text-teal-300' },
  { value: '04', label: 'Projets d’envergure menés', tone: 'text-amber-400' },
];

const IdentityCard = () => (
  <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-[#080d16] p-6 shadow-xl">
    <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" aria-hidden />

    <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
      <div className="flex items-center gap-2">
        <IdCard size={20} className="text-cyan-400" />
        <span className="font-mono text-xs tracking-wider text-slate-300">
          DEV_IDENTITY_RECORD
        </span>
      </div>
      <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] text-emerald-400">
        ACTIF
      </span>
    </div>

    <div className="my-4 flex flex-col items-center text-center">
      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-cyan-400/50 bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 p-1 shadow-[0_0_25px_rgba(56,189,248,0.2)]">
        <span className="bg-gradient-to-br from-white via-cyan-200 to-emerald-300 bg-clip-text font-display text-4xl font-extrabold text-transparent">
          BM
        </span>
      </div>
      <h3 className="font-display text-xl font-bold text-white">
        {IDENTITY.firstName} {IDENTITY.lastName}
      </h3>
      <p className="mt-0.5 font-mono text-xs text-cyan-300">Étudiant BUT Informatique 3A</p>
      <p className="mt-1 font-mono text-[11px] text-slate-500">IUT du Limousin • Limoges (87)</p>
    </div>

    <dl className="mt-4 space-y-2.5 border-t border-slate-800/80 pt-4 font-mono text-xs">
      {identityRows.map(row => (
        <div key={row.key} className="flex items-center justify-between gap-3 text-slate-400">
          <dt>{row.key}</dt>
          <dd className={`text-right ${row.tone}`}>{row.value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export const About = () => (
  <section id="about" className="relative w-full py-20">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
        {/* Carte d'identité */}
        <Reveal className="flex justify-center lg:col-span-4">
          <IdentityCard />
        </Reveal>

        {/* Contenu */}
        <Reveal delay={120} className="lg:col-span-8">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="INGÉNIERIE & PARCOURS"
              icon={<Fingerprint size={16} />}
              tone="emerald"
              title={<>Rigueur logicielle, esprit collectif &amp; passion du code</>}
            />

            <p className="font-sans text-base leading-relaxed text-slate-300 sm:text-lg">
              Actuellement en 3ème année de{' '}
              <strong className="font-semibold text-white">
                BUT Informatique à l&apos;IUT du Limousin
              </strong>
              , je conçois et déploie des applications complètes en mettant un accent strict sur la
              structure du code, la sécurité et la maintenabilité.
            </p>

            <p className="font-sans text-sm leading-relaxed text-slate-400 sm:text-base">
              Curieux et autonome, je privilégie les projets concrets : des applications
              d&apos;entreprise hébergées en conditions réelles aux missions industrielles de
              migration de bases de données. Le travail en équipe est le fil rouge de mon parcours,
              du développement collectif jusqu&apos;au{' '}
              <strong className="text-slate-200">football en compétition</strong> — j&apos;y ai pris
              le goût de la régularité à l&apos;effort et de l&apos;exigence partagée.
            </p>

            {/* Indicateurs */}
            <dl className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              {metrics.map(metric => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 transition-colors hover:border-slate-700"
                >
                  <dd className={`font-mono text-2xl font-bold ${metric.tone}`}>{metric.value}</dd>
                  <dt className="mt-1 font-mono text-xs text-slate-400">{metric.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
