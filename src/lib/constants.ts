export const IDENTITY = {
  firstName: 'Benjamin',
  lastName: 'Marty',
  role: 'Développeur Back-end & Architecte Logiciel',
  shortRole: 'Développeur logiciel',
  location: 'Limoges (87)',
  email: 'benjamin.marty1@etu.unilim.fr',
  phone: '+33 7 86 29 55 41',
  linkedin: 'https://www.linkedin.com/in/benjamin-marty-info/',
  linkedinHandle: 'in/benjamin-marty-info',
  github: 'https://github.com/bmarty75',
  githubHandle: 'github.com/bmarty75',
  cv: '/cv.pdf',
  photo: '/photo.webp',
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
  { label: 'À propos', href: '#about' },
  { label: 'Parcours', href: '#parcours' },
  { label: 'Projets', href: '#projets' },
  { label: 'Compétences', href: '#competences' },
  { label: 'Contact', href: '#contact' },
] as const;

/** Lien `tel:` sans espaces. */
export const PHONE_HREF = `tel:${IDENTITY.phone.replace(/\s/g, '')}`;

/** Ouvre les liens externes dans un nouvel onglet sans exposer `window.opener`. */
export const EXTERNAL = { target: '_blank', rel: 'noopener noreferrer' } as const;
