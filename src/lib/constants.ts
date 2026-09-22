export const IDENTITY = {
  firstName: 'Benjamin',
  lastName: 'Marty',
  role: 'Full-stack Engineer & Software Developer',
  shortRole: 'Développeur Full-stack',
  version: 'v2.6',
  location: 'Limoges (87)',
  email: 'benjamin.marty1@etu.unilim.fr',
  phone: '+33 7 86 29 55 41',
  linkedin: 'https://www.linkedin.com/in/benjamin-marty-info/',
  linkedinHandle: 'in/benjamin-marty-info',
  github: 'https://github.com/bmarty75',
  githubHandle: 'github.com/bmarty75',
  cv: '/cv.pdf',
} as const;

/** Alternance en cours — 3ème année de BUT. */
export const ALTERNANCE = {
  company: 'Faure Menuiseries',
  year: 'BUT 3',
  start: 'Septembre 2026',
  end: 'Juillet 2027',
  period: 'Sept. 2026 – Juil. 2027',
  duration: '11 mois',
} as const;

export const NAV_LINKS = [
  { label: '/about', href: '#about' },
  { label: '/experience', href: '#experience' },
  { label: '/architecture', href: '#architecture' },
  { label: '/projets', href: '#projets' },
  { label: '/stack', href: '#stack' },
  { label: '/contact', href: '#contact' },
] as const;
