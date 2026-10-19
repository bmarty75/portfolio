import { CalendarCheck, Cpu, GraduationCap, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { ALTERNANCE } from '../lib/constants';
import { Card, Eyebrow, Reveal } from './ui';

interface Fact {
  label: string;
  icon: LucideIcon;
  value: string;
  /** Complément affiché en plus petit après la valeur. */
  unit?: ReactNode;
  detail: string;
  meta: string;
}

const facts: Fact[] = [
  {
    label: 'Formation',
    icon: GraduationCap,
    value: '3',
    unit: (
      <>
        <sup>e</sup> année
      </>
    ),
    detail: 'BUT Informatique',
    meta: 'IUT du Limousin · Limoges',
  },
  {
    label: 'Alternance',
    icon: CalendarCheck,
    value: '11',
    unit: ' mois',
    detail: ALTERNANCE.company,
    meta: ALTERNANCE.period,
  },
  {
    label: 'Profil',
    icon: Cpu,
    value: 'Full-stack',
    detail: 'Java · Python · Vue.js',
    meta: "Du modèle de données à l'interface",
  },
  {
    label: 'Engagement',
    icon: Trophy,
    value: 'D1 Corrèze',
    detail: 'Football de compétition',
    meta: 'Collectif, régularité & exigence',
  },
];

/** Grille de chiffres clés sous le hero. */
export const KeyFacts = () => (
  <section aria-label="Chiffres clés" className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-4">
    {facts.map((fact, i) => {
      const { icon: Icon } = fact;
      return (
        <Reveal key={fact.label} delay={i * 120} className="h-full">
          <Card className="flex h-full flex-col justify-between p-space-lg">
            <div className="mb-space-md flex items-center justify-between">
              <Eyebrow>{fact.label}</Eyebrow>
              <Icon size={20} className="text-primary" aria-hidden />
            </div>
            <div>
              <div className="text-headline-lg font-semibold tracking-tight text-on-surface">
                {fact.value}
                {fact.unit && (
                  <span className="text-headline-sm font-normal text-on-surface-variant">
                    {fact.unit}
                  </span>
                )}
              </div>
              <div className="mt-1 text-body-sm text-on-surface-variant">{fact.detail}</div>
              <div className="mt-0.5 font-mono text-code-sm text-outline">{fact.meta}</div>
            </div>
          </Card>
        </Reveal>
      );
    })}
  </section>
);
