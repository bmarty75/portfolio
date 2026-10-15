import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { EXTERNAL, IDENTITY, NAV_LINKS } from '../lib/constants';
import { Monogram } from './ui';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(NAV_LINKS[0].href);

  /* Surlignage du lien correspondant à la section visible. */
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href)).filter(
      (el): el is Element => el !== null,
    );

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5] },
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Blocage du défilement quand le menu mobile est ouvert. */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* Le verrou est levé avant le saut d'ancre : sinon le navigateur ne défile pas. */
  const closeMenu = () => {
    document.body.style.overflow = '';
    setOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-surface/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-page items-center justify-between gap-space-md px-margin-mobile md:px-margin">
        {/* Identité */}
        <a
          href="#about"
          className="flex items-center gap-space-md text-on-surface transition-colors hover:text-primary"
        >
          <Monogram />
          <span className="flex items-baseline gap-space-xs">
            <span className="text-headline-sm font-semibold tracking-tight">
              {IDENTITY.firstName} {IDENTITY.lastName}
            </span>
            <span className="hidden font-mono text-code-sm text-outline sm:inline">// dev</span>
          </span>
        </a>

        {/* Liens */}
        <nav className="hidden items-center gap-space-lg md:flex" aria-label="Navigation principale">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              aria-current={active === link.href ? 'location' : undefined}
              className={`text-body-sm transition-colors ${
                active === link.href
                  ? 'font-medium text-on-surface'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-space-sm">
          <a
            href={IDENTITY.cv}
            {...EXTERNAL}
            className="hidden items-center justify-center rounded bg-surface-container px-space-md py-space-xs text-body-sm text-on-surface transition-colors hover:bg-surface-container-high sm:inline-flex"
          >
            Curriculum Vitae
          </a>

          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-surface-container text-on-surface-variant transition-colors hover:text-on-surface md:hidden"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav id="mobile-menu" className="h-[calc(100dvh-4rem)] bg-surface md:hidden" aria-label="Navigation mobile">
          <ul className="mx-auto flex max-w-page flex-col px-margin-mobile py-space-sm">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className={`block py-3 text-body-lg transition-colors ${
                    active === link.href ? 'text-on-surface' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-space-md">
              <a
                href={IDENTITY.cv}
                {...EXTERNAL}
                onClick={closeMenu}
                className="flex w-full items-center justify-center rounded bg-surface-container px-space-md py-2.5 text-body-sm text-on-surface"
              >
                Curriculum Vitae
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
