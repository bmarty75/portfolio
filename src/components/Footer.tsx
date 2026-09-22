import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { IDENTITY, ALTERNANCE, NAV_LINKS } from '../lib/constants';

const directLinks = [
  { value: IDENTITY.githubHandle, href: IDENTITY.github, icon: Github, external: true },
  { value: IDENTITY.linkedinHandle, href: IDENTITY.linkedin, icon: Linkedin, external: true },
  { value: IDENTITY.email, href: `mailto:${IDENTITY.email}`, icon: Mail, external: false },
  { value: IDENTITY.phone, href: `tel:${IDENTITY.phone.replace(/\s/g, '')}`, icon: Phone, external: false },
];

export const Footer = () => (
  <footer className="w-full border-t border-slate-800/80 bg-slate-950/60">
    <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* Identité */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 ring-1 ring-cyan-500/30">
              <span className="bg-gradient-to-br from-white via-cyan-200 to-emerald-300 bg-clip-text font-display text-sm font-extrabold text-transparent">
                BM
              </span>
            </div>
            <span className="font-display text-base font-bold text-white">
              {IDENTITY.firstName} {IDENTITY.lastName}
            </span>
            <span className="rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-cyan-300">
              {IDENTITY.shortRole}
            </span>
          </div>

          <p className="max-w-sm font-sans text-sm leading-relaxed text-slate-400">
            Ingénierie logicielle orientée architecture distribuée et services conteneurisés.
            Java, Python, Spring Boot, PostgreSQL et déploiement Linux.
          </p>

          <p className="mt-5 flex items-center gap-2 font-mono text-xs text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" aria-hidden />
            En alternance chez {ALTERNANCE.company} — {ALTERNANCE.period}
          </p>
        </div>

        {/* Navigation */}
        <nav>
          <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Architecture &amp; Sections
          </h2>
          <ul className="space-y-2.5">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-mono text-xs text-slate-400 transition-colors hover:text-cyan-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Contact Direct
          </h2>
          <ul className="space-y-2.5">
            {directLinks.map(link => {
              const { icon: Icon } = link;
              return (
                <li key={link.value}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex items-center gap-2 font-mono text-xs text-slate-400 transition-colors hover:text-emerald-400"
                  >
                    <Icon size={13} className="shrink-0" />
                    <span className="break-all">{link.value}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t border-slate-800/80">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-2 px-4 py-5 font-mono text-[11px] text-slate-500 sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {IDENTITY.firstName} {IDENTITY.lastName} — Tous droits
          réservés
        </p>
        <p>React · TypeScript · Tailwind CSS · Vite</p>
      </div>
    </div>
  </footer>
);
