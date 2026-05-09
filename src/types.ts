import type { ReactNode } from 'react';

export interface Project {
  id: number;
  title: string;
  category: string;
  role: string;
  description: string;
  fullDescription: string;
  deliverables: string[];
  techs: string[];
  icon: ReactNode;
  color: string;
  date: string;
  githubUrl?: string;
  demoUrl?: string;
  type?: 'project' | 'experience';
}

export interface Skill {
  category: string;
  icon: ReactNode;
  techs: string[];
  desc: string;
  analyse?: string;
  relatedProjects?: number[];
}
