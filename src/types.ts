import type { LucideIcon } from 'lucide-react';
import type { SimpleIcon } from 'simple-icons';

/** Logo d'une technologie : marque (Simple Icons) ou icône générique Lucide. */
export type TechLogo = SimpleIcon | LucideIcon;

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
}

export interface Project {
  title: string;
  category: string;
  date: string;
  description: string;
  points: string[];
  techs: string[];
  githubUrl?: string;
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
