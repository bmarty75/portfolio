import { useState } from 'react';
import { ArrowRight, Check, Github, Linkedin, Mail, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ALTERNANCE, EXTERNAL, IDENTITY, PHONE_HREF } from '../lib/constants';
import { flashCursorCheck } from '../lib/cursor';
import { Card, Eyebrow, Reveal, SectionHeading } from './ui';

const DirectChannel = ({
  href,
  icon: Icon,
  label,
  value,
  copyFallback = false,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
  copyFallback?: boolean;
}) => {
  const [copied, setCopied] = useState(false);

  // Si aucun client mail ne s'ouvre (la page garde le focus), on signale que l'adresse a été copiée.
  // La copie est faite tout de suite, tant que le clic autorise encore l'accès au presse-papiers.
  const handleClick = () => {
    if (!copyFallback || !navigator.clipboard) return;
    const copy = navigator.clipboard.writeText(value).then(
      () => true,
      () => false,
    );
    // Confirmation immédiate au curseur : l'anneau devient une coche.
    copy.then(ok => ok && flashCursorCheck());

    let left = false;
    const onLeave = () => {
      if (document.visibilityState === 'hidden' || !document.hasFocus()) left = true;
    };
    window.addEventListener('blur', onLeave);
    document.addEventListener('visibilitychange', onLeave);

    window.setTimeout(async () => {
      window.removeEventListener('blur', onLeave);
      document.removeEventListener('visibilitychange', onLeave);
      if (!left && (await copy)) {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2500);
      }
    }, 1000);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="group flex items-center justify-between gap-space-md rounded-lg bg-surface-container p-space-md transition-colors hover:bg-surface-container-high"
    >
      <div className="flex min-w-0 items-center gap-space-md">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-surface-container-low text-primary transition-transform group-hover:scale-105">
          <Icon size={20} aria-hidden />
        </span>
        <div className="min-w-0">
          <Eyebrow>{label}</Eyebrow>
          <div className="truncate text-body-md font-medium text-on-surface">{value}</div>
        </div>
      </div>
      <span className="flex shrink-0 items-center gap-2" aria-live="polite">
        {copied && <span className="font-mono text-code-sm text-primary">Adresse copiée</span>}
        {copied ? (
          <Check size={20} className="text-primary" aria-hidden />
        ) : (
          <ArrowRight
            size={20}
            className="text-outline transition-colors group-hover:text-primary"
            aria-hidden
          />
        )}
      </span>
    </a>
  );
};

const Profile = ({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  value: string;
}) => (
  <a
    href={href}
    {...EXTERNAL}
    className="group flex min-w-0 items-center gap-2 rounded-lg bg-surface-container p-space-md transition-colors hover:bg-surface-container-high"
  >
    <Icon size={18} className="shrink-0 text-outline group-hover:text-primary" aria-hidden />
    <div className="min-w-0">
      <div className="font-mono text-label-caps text-outline">{label}</div>
      <div className="truncate font-mono text-code-sm text-on-surface">{value}</div>
    </div>
  </a>
);

export const Contact = () => (
  <Reveal>
    <Card
      as="section"
      id="contact"
      className="flex scroll-mt-24 flex-col justify-between gap-space-xl p-space-lg md:flex-row md:p-space-xl"
    >
      <div className="space-y-space-md md:w-1/2">
        <SectionHeading eyebrow="Contact" title="Entrons en contact" />
        <p className="text-body-lg leading-relaxed text-on-surface-variant">
          Actuellement en alternance chez{' '}
          <strong className="font-medium text-on-surface">{ALTERNANCE.company}</strong> jusqu&apos;en
          juillet 2027. Une question sur un projet, une architecture ou une technologie de ma stack ?
          Échangeons sur vos besoins applicatifs et la suite de mon parcours.
        </p>
        <div className="flex items-center gap-2 pt-2 font-mono text-code-sm text-outline">
          <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span>Localisation : {IDENTITY.location} · Mobilité Limousin &amp; Télétravail</span>
        </div>
      </div>

      <div className="flex flex-col justify-center space-y-space-sm md:w-1/2">
        <DirectChannel
          href={`mailto:${IDENTITY.email}`}
          icon={Mail}
          label="Email universitaire"
          value={IDENTITY.email}
          copyFallback
        />
        <DirectChannel href={PHONE_HREF} icon={Phone} label="Téléphone" value={IDENTITY.phone} />

        <div className="grid grid-cols-1 gap-space-sm pt-space-xs min-[400px]:grid-cols-2">
          <Profile
            href={IDENTITY.linkedin}
            icon={Linkedin}
            label="LinkedIn"
            value={`/${IDENTITY.linkedinHandle}`}
          />
          <Profile href={IDENTITY.github} icon={Github} label="GitHub" value={IDENTITY.githubHandle} />
        </div>
      </div>
    </Card>
  </Reveal>
);
