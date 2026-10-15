import { DraftingCompass } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { practices, skillGroups } from '../data/skills';
import { Card, Reveal, SectionHeading, TechIcon } from './ui';

const PanelTitle = ({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) => (
  <div className="flex items-center gap-space-sm text-headline-sm font-semibold text-on-surface">
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-surface-container text-primary">
      <Icon size={18} aria-hidden />
    </span>
    <h3>{children}</h3>
  </div>
);

export const Skills = () => (
  <section id="competences" className="flex scroll-mt-24 flex-col gap-space-lg">
    <Reveal>
      <SectionHeading eyebrow="Compétences & Standards" title="Arsenal technique & Pratiques" />
    </Reveal>

    <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group, i) => (
        <Reveal key={group.title} delay={(i % 3) * 120} className="h-full">
          <Card className="h-full space-y-space-md p-space-lg">
            <PanelTitle icon={group.icon}>{group.title}</PanelTitle>
            <dl className="space-y-space-xs">
              {group.skills.map(skill => (
                <div key={skill.name} className="flex items-center justify-between gap-space-md py-1">
                  <dt className="flex items-center gap-space-sm text-body-md font-medium text-on-surface">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-surface-container">
                      <TechIcon name={skill.name} />
                    </span>
                    {skill.name}
                  </dt>
                  <dd className="text-right font-mono text-code-sm text-outline">{skill.note}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      ))}

      <Reveal delay={120} className="h-full sm:col-span-2 lg:col-span-2">
        <Card className="h-full space-y-space-md p-space-lg">
          <PanelTitle icon={DraftingCompass}>Méthodologies &amp; Principes d&apos;ingénierie</PanelTitle>
          <dl className="grid grid-cols-1 gap-space-md sm:grid-cols-2">
            {practices.map(practice => (
              <div key={practice.title} className="space-y-1">
                <dt className="text-body-md font-medium text-on-surface">{practice.title}</dt>
                <dd className="text-body-sm text-on-surface-variant">{practice.description}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </Reveal>
    </div>
  </section>
);
