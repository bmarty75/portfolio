import type { LucideIcon } from 'lucide-react';

export type ProjectKind = 'project' | 'experience';

export type LayerAccent = 'cyan' | 'teal' | 'emerald' | 'blue';

export interface Project {
  id: number;
  title: string;
  category: string;
  role: string;
  /** Résumé court affiché sur la carte. */
  description: string;
  /** Texte long affiché dans la carte détaillée. */
  fullDescription: string;
  deliverables: string[];
  techs: string[];
  icon: LucideIcon;
  date: string;
  kind: ProjectKind;
  status?: string;
  /** Lignes de contexte affichées sous le titre du projet phare. */
  meta?: string[];
  location?: string;
  footerNote?: string;
  githubUrl?: string;
  demoUrl?: string;
}

export interface SkillGroup {
  title: string;
  icon: LucideIcon;
  /** Étiquette monospace affichée à droite de l'en-tête. */
  tag: string;
  accent: 'emerald' | 'cyan' | 'violet' | 'amber';
  techs: string[];
  wide?: boolean;
}

export interface ArchitectureLayer {
  layer: string;
  title: string;
  icon: LucideIcon;
  description: string;
  tag: string;
  accent: LayerAccent;
  footerLeft: string;
  footerRight: string;
  footerRightTone: string;
  highlight?: boolean;
  badge?: string;
}
