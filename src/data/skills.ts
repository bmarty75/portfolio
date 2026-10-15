import { Container, Database, Monitor, SquareTerminal } from 'lucide-react';
import type { Practice, SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Back-end & Runtimes',
    icon: SquareTerminal,
    skills: [
      { name: 'Java 21', note: 'LTS' },
      { name: 'Spring Boot 3.3', note: 'REST / Security' },
      { name: 'JPA / Hibernate', note: 'ORM / Mappings' },
      { name: 'Python', note: 'Scripts & automatisation' },
      { name: 'PHP', note: 'Web' },
    ],
  },
  {
    title: 'Données & Persistance',
    icon: Database,
    skills: [
      { name: 'PostgreSQL 15', note: 'SGBD principal' },
      { name: 'MySQL', note: 'Migration en entreprise' },
      { name: 'Flyway', note: 'Versionnage du schéma' },
      { name: 'Modélisation relationnelle', note: 'UML / MCD' },
      { name: 'SQL avancé', note: 'Jointures & index' },
    ],
  },
  {
    title: 'Infrastructure & DevOps',
    icon: Container,
    skills: [
      { name: 'Docker & Compose', note: 'Conteneurisation' },
      { name: 'Linux Debian', note: 'Administration' },
      { name: 'Nginx', note: 'Reverse proxy' },
      { name: 'Git & GitHub', note: 'Workflow' },
      { name: 'Kathará & Wireshark', note: 'Réseau' },
    ],
  },
  {
    title: 'Front-end & Rendu',
    icon: Monitor,
    skills: [
      { name: 'Vue.js 3', note: 'SPA' },
      { name: 'JavaScript (ES6+)', note: 'Async / Fetch' },
      { name: 'HTML5 / CSS3', note: 'Flexbox / Grid' },
      { name: 'JavaFX', note: 'UI desktop' },
      { name: 'React & Tailwind', note: 'Notions' },
    ],
  },
];

/** Méthodes & principes — carte large de la section Compétences. */
export const practices: Practice[] = [
  {
    title: 'Conception orientée objet',
    description: 'Modélisation UML, découplage des responsabilités, modularité et réutilisabilité.',
  },
  {
    title: 'Architecture RESTful & sécurité',
    description: 'Architecture en couches, endpoints normalisés, authentification JWT sans état.',
  },
  {
    title: 'Méthodes agiles (Scrum)',
    description: 'Sprints itératifs et points réguliers avec le commanditaire du projet.',
  },
  {
    title: 'Tests & revue de code',
    description: 'Tests des cas limites, relecture croisée en équipe et validation avant livraison.',
  },
];
