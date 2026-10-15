import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { EXTERNAL, IDENTITY } from '../lib/constants';

const links = [
  { label: 'GitHub', href: IDENTITY.github, icon: Github, external: true },
  { label: 'LinkedIn', href: IDENTITY.linkedin, icon: Linkedin, external: true },
  { label: IDENTITY.email, href: `mailto:${IDENTITY.email}`, icon: Mail, external: false },
];

export const Footer = () => (
  <footer className="w-full bg-surface-container-lowest">
    <div className="mx-auto max-w-page px-margin-mobile py-space-2xl md:px-margin">
      <div className="flex flex-col justify-between gap-space-lg md:flex-row md:items-center">
        <div className="space-y-space-xs">
          <div className="flex flex-wrap items-center gap-x-space-sm gap-y-1">
            <span className="text-headline-sm font-semibold tracking-tight text-on-surface">
              {IDENTITY.firstName} {IDENTITY.lastName}
            </span>
            <span className="font-mono text-label-caps uppercase tracking-wider text-outline">
              {IDENTITY.shortRole}
            </span>
          </div>
          <div className="flex items-center gap-space-xs text-body-sm text-on-surface-variant">
            <MapPin size={16} className="text-outline" aria-hidden />
            <span>Limoges, France</span>
          </div>
        </div>

        <ul className="flex flex-wrap items-center gap-x-space-lg gap-y-space-sm text-body-sm text-on-surface-variant">
          {links.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external ? EXTERNAL : {})}
                className="flex items-center gap-space-xs transition-colors hover:text-primary"
              >
                <Icon size={16} aria-hidden />
                <span className="break-all">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-space-xl flex flex-col items-center justify-between gap-space-sm pt-space-md text-center font-mono text-label-caps text-outline sm:flex-row sm:text-left">
        <span>
          © {new Date().getFullYear()} {IDENTITY.firstName} {IDENTITY.lastName}. Tous droits réservés.
        </span>
        <span>Architecture logicielle &amp; Systèmes distribués</span>
      </div>
    </div>
  </footer>
);
