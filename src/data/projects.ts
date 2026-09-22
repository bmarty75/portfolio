import { Terminal, Network } from 'lucide-react';
import type { Project } from '../types';

/** Projet phare — carte pleine largeur de la section Projets. */
export const featuredProject: Project = {
  id: 1,
  title: 'ERP Universitaire — IUT du Limousin',
  category: 'Architecture Full-Stack & API REST',
  role: 'Développeur',
  description:
    "Application d'entreprise commandée par un client réel et déployée en production sur le serveur Linux de l'université.",
  fullDescription: '',
  deliverables: [
    "Déploiement en production sur serveur dédié Debian Linux de l'université",
    'API REST Spring Boot 3.3 orchestrant 6 modules sans couplage fort',
    "Sécurité JWT stateless avec matrice d'autorisations rôles/utilisateurs",
  ],
  techs: [],
  icon: Terminal,
  date: '2025 — 2026',
  kind: 'project',
  status: 'PROJET PHARE • PRODUCTION',
  meta: [
    'Rôle : Développeur',
    'Projet de 2ème année de BUT',
    'Équipe de 5 développeurs',
  ],
  githubUrl: 'https://github.com/AbdelmalikMoussaoui/SAE_ERP',
};

/** Stack du projet phare, avec teinte par technologie. */
export const featuredStack = [
  { label: 'Java 21', tone: 'bg-cyan-950/60 text-cyan-300 border-cyan-800' },
  { label: 'Spring Boot 3.3', tone: 'bg-emerald-950/60 text-emerald-300 border-emerald-800' },
  { label: 'Spring Security (JWT)', tone: 'bg-slate-800 text-slate-200 border-slate-700' },
  { label: 'PostgreSQL 15', tone: 'bg-blue-950/60 text-blue-300 border-blue-800' },
  { label: 'Vue.js', tone: 'bg-slate-800 text-slate-200 border-slate-700' },
  { label: 'Docker', tone: 'bg-slate-800 text-slate-200 border-slate-700' },
  { label: 'Nginx', tone: 'bg-slate-800 text-slate-200 border-slate-700' },
  { label: 'Flyway', tone: 'bg-slate-800 text-slate-200 border-slate-700' },
];

/** Projets secondaires — grille deux colonnes. */
export const projects: Project[] = [
  {
    id: 4,
    title: 'Jeu Latice — Numérisation & Architecture POO',
    category: 'Application Desktop JavaFX',
    role: 'Développeur Java • Modélisation Objet',
    description: '',
    fullDescription:
      "Numérisation complète du jeu de plateau hawaïen Latice, depuis le moteur de règles console jusqu'à l'interface graphique JavaFX interactive. Modélisation préalable stricte via diagrammes de classes UML pour garantir un découplage sans concession entre logique de jeu, contrôleurs et rendu graphique.",
    deliverables: [],
    techs: ['Java', 'JavaFX', 'POO Strict', 'Modélisation UML'],
    icon: Terminal,
    date: '2025',
    kind: 'project',
    footerNote: 'IUT Limousin',
    githubUrl: 'https://github.com/bmarty75/projet-latice',
  },
  {
    id: 5,
    title: 'Infrastructure Réseau Simulée',
    category: 'Réseaux & Systèmes Linux',
    role: 'Administrateur Réseau & Systèmes',
    description: '',
    fullDescription:
      "Conception et déploiement d'une infrastructure réseau d'entreprise complète avec l'émulateur Kathará. Configuration de sous-réseaux cloisonnés, services essentiels (DHCP, DNS Bind, FTP, SSH sécurisé) et diagnostic approfondi des flux de paquets à l'aide de Wireshark.",
    deliverables: [],
    techs: ['Kathará', 'Linux Debian', 'DHCP / DNS', 'Wireshark'],
    icon: Network,
    date: '2024',
    kind: 'project',
    footerNote: 'IUT Limousin',
  },
];
