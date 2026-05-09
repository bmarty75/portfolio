import { Layers, Database, Terminal, Network } from 'lucide-react';
import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 1,
    title: "ERP Universitaire — IUT Limousin",
    category: "Full Stack Web",
    role: "Développeur Back-end",
    description:
      "Application web commandée par un vrai client (IUT du Limousin), déployée en production sur le serveur Linux de l'université. 6 modules métier — authentification JWT, maquette pédagogique, suivi des heures — développés en équipe de 5.",
    fullDescription:
      "Projet de deuxième année de BUT réalisé pour l'IUT du Limousin à la demande de Mme Sarlot (commanditaire réel). En équipe de 5, dont 3 développeurs back-end dont moi-même, nous avons conçu et déployé une application web d'entreprise couvrant 6 modules métier : authentification avec gestion des rôles via Spring Security (JWT), gestion de la maquette pédagogique, fiches ressources, module TAC, suivi des heures et feedbacks. L'application est hébergée en production sur le serveur Linux Debian de l'université, avec un déploiement conteneurisé via Docker et Nginx.",
    deliverables: [
      "Application déployée en production sur serveur Linux Debian",
      "API REST Spring Boot 3.3 — 6 modules métier",
      "Authentification JWT avec gestion des rôles (Spring Security)",
    ],
    techs: ["Java 21", "Spring Boot 3.3", "Spring Security", "PostgreSQL 15", "Vue.js", "Docker", "Nginx", "Flyway"],
    icon: <Layers className="w-12 h-12 text-white opacity-80" />,
    color: "from-blue-600 to-indigo-900",
    date: "2025 – 2026",
    githubUrl: "https://github.com/AbdelmalikMoussaoui/SAE_ERP",
    type: "project",
  },
  {
    id: 2,
    title: "Migration ERP — Faure Menuiseries",
    category: "Expérience Professionnelle",
    role: "Développeur — Stagiaire",
    description:
      "Migration d'un ERP FoxPro vers MySQL pour une PME de menuiserie à Limoges. Travail sur une base de données réelle, critique, utilisée au quotidien par l'entreprise.",
    fullDescription:
      "Stage de fin de deuxième année (avril – juin 2026) chez Faure Menuiseries, PME de menuiserie industrielle basée à Limoges, sous la direction d'Antoine Faure. Mission principale : analyser la base de données FoxPro d'un ERP existant, concevoir le schéma de migration vers MySQL et implémenter les scripts de transformation des données. Un projet concret avec un impact direct sur les opérations quotidiennes de l'entreprise.",
    deliverables: [
      "Analyse et cartographie de la base FoxPro existante",
      "Scripts de migration vers MySQL",
      "Documentation technique de la nouvelle structure",
    ],
    techs: ["MySQL", "FoxPro", "SQL"],
    icon: <Database className="w-12 h-12 text-white opacity-80" />,
    color: "from-amber-600 to-orange-900",
    date: "Avr. – Juin 2026",
    type: "experience",
  },
  {
    id: 4,
    title: "Jeu Latice",
    category: "Application Desktop",
    role: "Développeur Java",
    description:
      "Numérisation complète du jeu de plateau hawaïen Latice — de la logique console pure à l'interface graphique JavaFX. L'architecture objet est intégralement modélisée en UML avant d'être implémentée.",
    fullDescription:
      "Adaptation numérique du jeu de société Latice, réalisée en équipe de 4. Le projet démarre d'une version console pure où la totalité des règles du jeu est modélisée (plateau, pièces, validation des coups, score) puis évolue vers une interface graphique JavaFX complète. Toute la conception orientée objet est formalisée en UML (diagramme de classes, de séquence) avant chaque phase d'implémentation.",
    deliverables: [
      "Application JavaFX jouable (deux joueurs)",
      "Diagrammes UML complets (classes, séquences)",
      "Exécutable .jar",
    ],
    techs: ["Java", "JavaFX", "POO", "UML", "MVC"],
    icon: <Terminal className="w-12 h-12 text-white opacity-80" />,
    color: "from-cyan-600 to-blue-900",
    date: "2025",
    githubUrl: "https://github.com/bmarty75/projet-latice",
    type: "project",
  },
  {
    id: 5,
    title: "Infrastructure Réseau Simulée",
    category: "Réseaux & Systèmes",
    role: "Administrateur Réseau",
    description:
      "Conception et déploiement d'un réseau d'entreprise complet sous Kathará : sous-réseaux cloisonnés, services DHCP, DNS, FTP et SSH configurés de zéro, analyse du trafic avec Wireshark.",
    fullDescription:
      "Projet de conception d'infrastructure réseau réalisé avec Kathará, framework de virtualisation réseau léger basé sur Docker. L'objectif : simuler l'infrastructure complète d'une PME — découpage IP en sous-réseaux, configuration d'un serveur DHCP pour l'attribution automatique, DNS pour la résolution de noms, FTP et SSH pour les services de transfert et d'administration. Chaque étape est validée par capture et analyse de trames réseau avec Wireshark.",
    deliverables: [
      "Topologie réseau documentée (schéma IP)",
      "Configuration complète des services (DHCP, DNS, FTP, SSH)",
      "Captures et analyses Wireshark annotées",
    ],
    techs: ["Kathará", "Linux", "DHCP", "DNS", "FTP/SSH", "Wireshark"],
    icon: <Network className="w-12 h-12 text-white opacity-80" />,
    color: "from-emerald-600 to-teal-900",
    date: "2024",
    type: "project",
  },
];
