import { ChartLine, ClipboardList, FileText, MessageSquare, Network } from 'lucide-react';
import type { FeaturedProject, Project } from '../types';

/** Projet phare — carte pleine largeur de la section Projets. */
export const featuredProject: FeaturedProject = {
  title: 'ERP Universitaire — Système de Gestion Pédagogique',
  badge: 'Projet phare · SAÉ universitaire',
  period: '2025–2026',
  context:
    'Commanditaire réel : Mme Sarlot · IUT du Limousin · Projet de 2e année mené en équipe de 5 développeurs.',
  description:
    "Conception et déploiement d'une application d'entreprise pour l'administration du département Informatique. L'architecture sépare strictement la logique métier, exposée par une API REST sécurisée, d'un front-end Vue.js, le tout conteneurisé sur le serveur Linux de l'université.",
  modules: [
    { icon: Network, label: 'Maquette pédagogique (UE, compétences, SAÉ, coefficients)' },
    { icon: FileText, label: 'Fiches ressources universitaires' },
    { icon: ChartLine, label: 'Module TAC' },
    { icon: ClipboardList, label: "Suivi des heures d'enseignement" },
    { icon: MessageSquare, label: 'Collecte des feedbacks' },
  ],
  specs: [
    { key: 'Backend', value: 'Spring Boot 3.3 (Java 21)' },
    { key: 'Persistance', value: 'PostgreSQL 15 + Flyway' },
    { key: 'Frontend', value: 'Vue.js 3 (SPA)' },
    { key: 'Déploiement', value: 'Docker Compose & Nginx' },
  ],
  specsNote: 'Documentation API : Swagger / OpenAPI 3',
  platform: 'Debian Linux',
  techs: ['Java 21', 'Spring Boot 3.3', 'PostgreSQL', 'Flyway', 'Docker', 'Vue.js'],
  status: "Déployé sur le serveur de l'IUT",
  githubUrl: 'https://github.com/MalikMoussaoui/SAE_ERP',
  demo: [
    {
      type: 'video',
      src: '/projects/erp/demo.mp4',
      poster: '/projects/erp/demo-poster.webp',
      caption: "Parcours complet de l'application",
    },
    {
      type: 'image',
      src: '/projects/erp/fiches.webp',
      caption: 'Fiches ressources et leur cycle de validation (brouillon, soumise, validée)',
    },
    {
      type: 'image',
      src: '/projects/erp/fiche.webp',
      caption: 'Fiche ressource : identification, volume horaire et objectifs',
    },
    {
      type: 'image',
      src: '/projects/erp/mccc.webp',
      caption: 'Modalités de contrôle des connaissances (MCCC) par UE',
    },
    {
      type: 'image',
      src: '/projects/erp/maquette.webp',
      caption: 'Paramétrage de la formation : départements et UE',
    },
    {
      type: 'image',
      src: '/projects/erp/swagger.webp',
      caption: "Documentation de l'API (Swagger / OpenAPI)",
    },
  ],
};

/** Projets complémentaires — grille deux colonnes. */
export const projects: Project[] = [
  {
    title: 'Jeu Latice — Numérisation & Architecture POO',
    category: 'Conception objet & algorithmique',
    date: '2025',
    description:
      "Numérisation complète du jeu de plateau hawaïen Latice, du moteur de règles en console jusqu'à l'interface graphique JavaFX interactive, avec un découplage strict entre logique de jeu, contrôleurs et rendu.",
    points: [
      'Modélisation préalable par diagrammes de classes UML',
      'Moteur de règles indépendant, validé en console',
      'Séparation logique de jeu / contrôleurs / rendu (MVC)',
    ],
    techs: ['Java', 'JavaFX', 'POO', 'UML'],
    githubUrl: 'https://github.com/bmarty75/projet-latice',
    demo: [
      {
        type: 'video',
        src: '/projects/latice/partie.mp4',
        poster: '/projects/latice/plateau.webp',
        caption: 'Une partie en cours',
      },
      {
        type: 'image',
        src: '/projects/latice/plateau.webp',
        caption: 'Plateau de jeu et main du joueur',
      },
      { type: 'image', src: '/projects/latice/fin-partie.webp', caption: 'Écran de fin de partie' },
      { type: 'image', src: '/projects/latice/uml.webp', caption: 'Diagramme de classes UML' },
    ],
  },
  {
    title: "Infrastructure Réseau d'Entreprise Simulée",
    category: 'Systèmes & réseaux',
    date: '2024',
    description:
      "Conception et déploiement d'une infrastructure réseau d'entreprise complète avec l'émulateur Kathará : sous-réseaux cloisonnés, services essentiels et diagnostic des flux.",
    points: [
      'Sous-réseaux cloisonnés et routage entre domaines',
      'Services DHCP et DNS (Bind)',
      'Accès FTP & SSH sécurisés, analyse des paquets sous Wireshark',
    ],
    techs: ['Kathará', 'Linux Debian', 'DHCP / DNS', 'Wireshark'],
  },
];
