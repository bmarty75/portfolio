import { useEffect, useState } from 'react';
import { FileText, Send, Menu, X } from 'lucide-react';
import { IDENTITY, NAV_LINKS } from '../lib/constants';
import { TopBar } from './TopBar';

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#architecture');

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
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090d14]/85 backdrop-blur-xl transition-all">
      <TopBar />

      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
        {/* Identité */}
        <a href="#top" className="group flex items-center gap-3 focus:outline-none">
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-tr from-slate-950 via-slate-900 to-slate-800 shadow-[0_0_12px_rgba(56,189,248,0.2)] ring-1 ring-cyan-500/30 transition-all group-hover:ring-cyan-400">
            <span className="bg-gradient-to-br from-white via-cyan-200 to-emerald-300 bg-clip-text font-display text-sm font-extrabold text-transparent">
              BM
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-display text-base font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400">
                {IDENTITY.firstName} {IDENTITY.lastName}
              </span>
              <span className="rounded border border-slate-700 bg-slate-800 px-1 font-mono text-[10px] text-cyan-300">
                {IDENTITY.version}
              </span>
            </div>
            <span className="font-mono text-[11px] tracking-tight text-slate-400">
              {IDENTITY.shortRole}
            </span>
          </div>
        </a>

        {/* Liens */}
        <nav className="hidden items-center gap-1 font-mono text-[13px] md:flex lg:gap-2">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-1.5 transition-all hover:bg-slate-800/60 ${
                active === link.href
                  ? 'text-cyan-400 hover:text-cyan-300'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={IDENTITY.cv}
            download
            className="hidden items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/90 px-3.5 py-1.5 font-mono text-xs text-slate-200 shadow-sm transition-all hover:border-slate-500 hover:bg-slate-700/80 sm:inline-flex"
          >
            <FileText size={15} className="text-cyan-400" />
            <span>CV.pdf</span>
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 px-3.5 py-1.5 font-mono text-xs font-semibold text-slate-950 transition-all hover:shadow-[0_0_16px_rgba(78,222,163,0.4)] active:scale-95"
          >
            <Send size={15} />
            <span>Me contacter</span>
          </a>

          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800/90 text-slate-300 transition-colors hover:text-white md:hidden"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav className="border-t border-slate-800/80 bg-[#090d14] md:hidden">
          <ul className="mx-auto flex max-w-[1240px] flex-col px-4 py-3 sm:px-6">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-slate-800/60 py-3 font-mono text-sm text-slate-300 transition-colors hover:text-cyan-400"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-4">
              <a
                href={IDENTITY.cv}
                download
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-800/90 px-3.5 py-2.5 font-mono text-xs text-slate-200"
              >
                <FileText size={15} className="text-cyan-400" /> CV.pdf
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
