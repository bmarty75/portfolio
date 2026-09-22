import { Github, Linkedin, Mail, MapPin, Phone, Radio } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { IDENTITY, ALTERNANCE } from '../lib/constants';
import { Reveal } from './ui';

interface Channel {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  tone: string;
  external?: boolean;
}

const channels: Channel[] = [
  {
    label: 'Email Universitaire',
    value: IDENTITY.email,
    href: `mailto:${IDENTITY.email}`,
    icon: Mail,
    tone: 'group-hover:border-cyan-500/50 group-hover:text-cyan-300',
  },
  {
    label: 'Téléphone Direct',
    value: IDENTITY.phone,
    href: `tel:${IDENTITY.phone.replace(/\s/g, '')}`,
    icon: Phone,
    tone: 'group-hover:border-emerald-500/50 group-hover:text-emerald-300',
  },
  {
    label: 'LinkedIn Profil',
    value: IDENTITY.linkedinHandle,
    href: IDENTITY.linkedin,
    icon: Linkedin,
    tone: 'group-hover:border-blue-500/50 group-hover:text-blue-300',
    external: true,
  },
  {
    label: 'Dépôts GitHub',
    value: IDENTITY.githubHandle,
    href: IDENTITY.github,
    icon: Github,
    tone: 'group-hover:border-violet-500/50 group-hover:text-violet-300',
    external: true,
  },
];

export const Contact = () => (
  <section id="contact" className="relative w-full overflow-hidden py-20">
    <div className="pointer-events-none absolute left-1/2 top-1/4 h-96 w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" aria-hidden />

    <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
            <Radio size={14} />
            <span>CANAL DE COMMUNICATION OUVERT</span>
          </div>

          <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Initier une connexion professionnelle
          </h2>

          <p className="mx-auto mt-4 max-w-lg font-sans text-base leading-relaxed text-slate-300">
            Actuellement en alternance chez {ALTERNANCE.company}. Une question sur un projet, une
            architecture ou une techno de ma stack ? Les canaux ci-dessous sont ouverts.
          </p>
        </div>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((channel, i) => {
          const { icon: Icon } = channel;
          return (
            <Reveal key={channel.label} delay={i * 80} className="h-full">
              <a
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full flex-col items-center rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-7 text-center transition-all hover:border-slate-700 hover:shadow-xl"
              >
                <span
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/70 text-slate-400 transition-all ${channel.tone}`}
                >
                  <Icon size={18} />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                  {channel.label}
                </p>
                <p className="mt-1.5 break-all font-mono text-xs text-slate-200">{channel.value}</p>
              </a>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={200}>
        <p className="mt-10 flex flex-wrap items-center justify-center gap-2 font-mono text-xs text-slate-400">
          <MapPin size={14} className="text-emerald-400" />
          {IDENTITY.location}
          <span className="text-slate-600" aria-hidden>•</span>
          Mobilité Limousin
          <span className="text-slate-600" aria-hidden>•</span>
          Télétravail bienvenu
        </p>
      </Reveal>
    </div>
  </section>
);
