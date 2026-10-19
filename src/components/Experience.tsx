import { DatabaseZap, MapPin, Workflow } from 'lucide-react';
import { ALTERNANCE, IDENTITY } from '../lib/constants';
import { Card, Chip, Reveal, SectionHeading } from './ui';

const highlights = [
  {
    icon: Workflow,
    title: 'Modélisation relationnelle',
    text: "Analyse de la base FoxPro héritée et reconception d'un schéma normalisé sous MySQL, avec contraintes d'intégrité explicites.",
  },
  {
    icon: DatabaseZap,
    title: 'Contrôle automatisé des rapports',
    text: 'Script qui compare automatiquement le rapport généré sous FoxPro et celui produit sous MySQL, et fait ressortir les différences.',
  },
];

const techTags = [
  'FoxPro Legacy',
  'MySQL',
  'Modélisation MCD / MLD',
  'Comparaison FoxPro / MySQL',
  "Audit d'intégrité",
];

export const Experience = () => (
  <section id="parcours" className="flex scroll-mt-24 flex-col gap-space-lg">
    <Reveal>
      <SectionHeading eyebrow="Parcours & Industrie" title="Expérience professionnelle" />
    </Reveal>

    <Reveal delay={80}>
      <Card
        as="article"
        className="dim-item flex flex-col gap-space-xl p-space-lg md:flex-row md:p-space-xl"
      >
        {/* Méta */}
        <div className="flex flex-col justify-between gap-space-lg md:w-1/3">
          <div className="space-y-space-xs">
            <span className="inline-flex items-center rounded bg-surface-container px-2 py-0.5 font-mono text-[11px] font-medium text-primary">
              Alternance · {ALTERNANCE.year} · En cours
            </span>
            <h3 className="pt-1 text-headline-md font-semibold text-on-surface">
              {ALTERNANCE.company}
            </h3>
            <p className="text-body-sm text-on-surface-variant">PME de menuiserie industrielle</p>
            <div className="flex items-center gap-1.5 font-mono text-code-sm text-outline">
              <MapPin size={15} aria-hidden />
              <span>{IDENTITY.location}, Nouvelle-Aquitaine</span>
            </div>
          </div>

          <dl className="space-y-space-md">
            <div>
              <dt className="font-mono text-code-sm uppercase tracking-wider text-outline">Période</dt>
              <dd className="text-body-md font-medium text-on-surface">{ALTERNANCE.period}</dd>
              <dd className="mt-1 font-mono text-code-sm text-outline">
                Rôle : Développeur en alternance
              </dd>
            </div>
            <div>
              <dt className="font-mono text-code-sm uppercase tracking-wider text-outline">
                Précédée de
              </dt>
              <dd className="text-body-sm text-on-surface-variant">
                Stage de fin de 2<sup>e</sup> année · Avr. – Juin 2026
              </dd>
            </div>
          </dl>
        </div>

        {/* Mission */}
        <div className="flex flex-col justify-between gap-space-lg md:w-2/3">
          <div className="space-y-space-md">
            <div>
              <h4 className="text-headline-sm font-medium text-on-surface">
                Modernisation du système de données hérité &amp; migration FoxPro vers MySQL
              </h4>
              <p className="mt-2 text-body-md leading-relaxed text-on-surface-variant">
                Dans le cadre de la modernisation de l&apos;outil informatique, sous la direction
                d&apos;Antoine Faure, je prends en charge la transformation complète de la
                persistance d&apos;un ERP métier : remplacement d&apos;une base Microsoft Visual
                FoxPro vieillissante par un schéma relationnel normalisé sous MySQL. Un projet
                critique, à impact direct sur la chaîne opérationnelle de l&apos;entreprise.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-space-md pt-space-xs sm:grid-cols-2">
              {highlights.map(({ icon: Icon, title, text }, i) => (
                <Reveal
                  key={title}
                  delay={250 + i * 120}
                  className="space-y-1 rounded-lg bg-surface-container p-space-md"
                >
                  <div className="flex items-center gap-2 text-body-sm font-semibold text-on-surface">
                    <Icon size={18} className="text-primary" aria-hidden />
                    <span>{title}</span>
                  </div>
                  <p className="text-body-sm text-on-surface-variant">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-space-xs pt-space-md">
            {techTags.map(tag => (
              <Chip
                key={tag}
                label={tag}
                className="bg-surface-container-high px-2.5 text-on-surface-variant"
              />
            ))}
          </div>
        </div>
      </Card>
    </Reveal>
  </section>
);
