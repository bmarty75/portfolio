import { Layers } from 'lucide-react';
import { skillGroups } from '../data/skills';
import type { SkillGroup } from '../types';
import { Reveal, SectionHeading } from './ui';

const accents = {
  emerald: { icon: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400', tag: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' },
  cyan: { icon: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400', tag: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300' },
  violet: { icon: 'border-violet-500/30 bg-violet-500/10 text-violet-400', tag: 'border-violet-500/30 bg-violet-500/10 text-violet-300' },
  amber: { icon: 'border-amber-500/30 bg-amber-500/10 text-amber-400', tag: 'border-amber-500/30 bg-amber-500/10 text-amber-300' },
} as const;

const SkillPanel = ({ group }: { group: SkillGroup }) => {
  const { icon: Icon } = group;
  const a = accents[group.accent];

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/80 transition-all hover:border-slate-700 hover:shadow-xl">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-3.5">
        <h3 className="flex items-center gap-2.5 font-display text-sm font-bold text-white">
          <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md border ${a.icon}`}>
            <Icon size={14} />
          </span>
          {group.title}
        </h3>
        <span className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider ${a.tag}`}>
          {group.tag}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 p-5 font-mono text-xs">
        {group.techs.map(tech => (
          <span
            key={tech}
            className="rounded border border-slate-700 bg-slate-800 px-2 py-0.5 text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Skills = () => (
  <section id="stack" className="w-full border-t border-slate-800/80 bg-slate-950/40 py-20">
    <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <Reveal>
        <SectionHeading
          eyebrow="ARSENAL TECHNIQUE • CAPABILITIES"
          icon={<Layers size={16} />}
          title="Stack Technique Validée"
          className="mb-10"
        />
      </Reveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.title}
            delay={(i % 3) * 90}
            className={`h-full ${group.wide ? 'lg:col-span-2' : ''}`}
          >
            <SkillPanel group={group} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
