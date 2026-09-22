import { Server, Database, Monitor, Container, Workflow } from 'lucide-react';
import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Langages & Frameworks',
    icon: Server,
    tag: 'CORE',
    accent: 'emerald',
    techs: ['Java 21', 'Python', 'Spring Boot 3.3', 'Spring Security', 'JPA / Hibernate', 'API RESTful', 'PHP'],
  },
  {
    title: 'Bases de données',
    icon: Database,
    tag: 'DATA LAYER',
    accent: 'cyan',
    techs: ['PostgreSQL 15', 'MySQL', 'SQL avancé', 'Flyway', 'Modélisation relationnelle'],
  },
  {
    title: 'Front-end & UI',
    icon: Monitor,
    tag: 'INTERFACE',
    accent: 'violet',
    techs: ['Vue.js 3', 'JavaScript ES6+', 'HTML5 / CSS3', 'React (notions)', 'Tailwind CSS'],
  },
  {
    title: 'DevOps, Systèmes & Outillage',
    icon: Container,
    tag: 'INFRA',
    accent: 'amber',
    wide: true,
    techs: ['Docker', 'Docker Compose', 'Linux Debian', 'Nginx', 'Git / GitHub', 'IntelliJ IDEA', 'VS Code', 'Wireshark'],
  },
  {
    title: 'Méthodes & Conception',
    icon: Workflow,
    tag: 'PROCESS',
    accent: 'emerald',
    techs: ['UML', 'POO', 'Méthodes Agiles (Scrum)', 'Architecture en couches', 'Sécurité JWT', 'Tests & revue de code'],
  },
];
