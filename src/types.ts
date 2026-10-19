import type { LucideIcon } from 'lucide-react';
import type { SimpleIcon } from 'simple-icons';

/** Logo d'une technologie : marque (Simple Icons) ou icône générique Lucide. */
export type TechLogo = SimpleIcon | LucideIcon;

/** Fiche explicative d'une technologie, affichée au clic sur son étiquette. */
export interface TechInfo {
  /** Nom complet affiché en titre de la fiche. */
  name: string;
  category: string;
  /** Ce qu'est la technologie, en quelques phrases. */
  summary: string;
  /** Où et comment je l'ai utilisée. */
  usage?: string;
}

/** Point fort illustré par une icône (modules, livrables…). */
export interface Highlight {
  icon: LucideIcon;
  label: string;
}

/** Ligne « clé : valeur » du bloc de spécifications techniques. */
export interface SpecRow {
  key: string;
  value: string;
}

/** Capture ou vidéo affichée dans la galerie de démonstration d'un projet. */
export interface DemoMedia {
  type: 'image' | 'video';
  /** Chemin depuis `public/` (ex. « /projects/erp/dashboard.webp »). */
  src: string;
  caption: string;
  /** Image affichée avant la lecture d'une vidéo. */
  poster?: string;
}

export interface FeaturedProject {
  title: string;
  badge: string;
  period: string;
  /** Contexte affiché sous le titre (commanditaire, équipe…). */
  context: string;
  description: string;
  modules: Highlight[];
  specs: SpecRow[];
  /** Mention affichée en pied du bloc de spécifications. */
  specsNote: string;
  platform: string;
  techs: string[];
  status: string;
  githubUrl?: string;
  demo?: DemoMedia[];
}

export interface Project {
  title: string;
  category: string;
  date: string;
  description: string;
  points: string[];
  techs: string[];
  githubUrl?: string;
  demo?: DemoMedia[];
}

export interface Skill {
  name: string;
  /** Annotation monospace alignée à droite. */
  note: string;
}

export interface SkillGroup {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

export interface Practice {
  title: string;
  description: string;
}
