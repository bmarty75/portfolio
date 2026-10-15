import type { TechInfo } from '../types';

/* ── Fiches partagées par plusieurs libellés ──────────────────────────── */

const java: TechInfo = {
  name: 'Java',
  category: 'Langage back-end',
  summary:
    "Langage orienté objet, fortement typé et compilé en bytecode exécuté par la JVM. Java 21 est une version LTS (support long terme) qui apporte notamment les records, le pattern matching et les threads virtuels.",
  usage:
    "Back-end de l'ERP universitaire (Java 21) et moteur de règles du jeu Latice, conçu en POO.",
};

const springBoot: TechInfo = {
  name: 'Spring Boot',
  category: 'Framework back-end',
  summary:
    "Framework Java qui simplifie la création d'applications Spring prêtes pour la production : configuration automatique, serveur web embarqué et écosystème complet (Spring Web, Spring Data, Spring Security).",
  usage:
    "API REST de l'ERP universitaire, sécurisée par Spring Security et une authentification JWT sans état.",
};

const postgresql: TechInfo = {
  name: 'PostgreSQL',
  category: 'Base de données relationnelle',
  summary:
    "Système de gestion de base de données relationnelle open source, réputé pour sa robustesse, son respect du standard SQL, ses transactions ACID et ses types avancés (JSON, tableaux…).",
  usage: "SGBD principal de l'ERP universitaire, avec un schéma versionné par Flyway.",
};

const docker: TechInfo = {
  name: 'Docker & Docker Compose',
  category: 'Conteneurisation',
  summary:
    "Docker empaquette une application et ses dépendances dans un conteneur isolé, identique du poste de développement à la production. Docker Compose décrit et lance plusieurs conteneurs ensemble (API, base de données, serveur web).",
  usage:
    "Déploiement de l'ERP universitaire (API, PostgreSQL, Nginx) sur le serveur Linux de l'IUT.",
};

const debian: TechInfo = {
  name: 'Linux Debian',
  category: "Système d'exploitation",
  summary:
    "Distribution Linux libre réputée pour sa stabilité, très utilisée sur les serveurs. Elle s'administre en ligne de commande : paquets, services, utilisateurs, réseau.",
  usage:
    "Plateforme de déploiement de l'ERP universitaire et machines de l'infrastructure réseau simulée.",
};

const wireshark: TechInfo = {
  name: 'Wireshark',
  category: 'Analyse réseau',
  summary:
    "Analyseur de paquets qui capture le trafic réseau et décode chaque protocole couche par couche. Indispensable pour diagnostiquer un échange ou vérifier qu'un service se comporte comme prévu.",
  usage: "Analyse des flux DHCP, DNS, FTP et SSH de l'infrastructure réseau simulée.",
};

const kathara: TechInfo = {
  name: 'Kathará',
  category: 'Émulation réseau',
  summary:
    "Émulateur de réseaux basé sur des conteneurs : chaque machine (routeur, serveur, poste) est un conteneur, ce qui permet de monter une topologie complète sur un seul ordinateur.",
  usage:
    "Conception d'une infrastructure d'entreprise simulée : sous-réseaux cloisonnés et routage entre domaines.",
};

const vue: TechInfo = {
  name: 'Vue.js',
  category: 'Framework front-end',
  summary:
    "Framework JavaScript progressif pour construire des interfaces réactives à base de composants. Vue 3 introduit la Composition API et un système de réactivité plus performant.",
  usage: "Front-end SPA de l'ERP universitaire, qui consomme l'API REST Spring Boot.",
};

const javafx: TechInfo = {
  name: 'JavaFX',
  category: 'Interface desktop',
  summary:
    "Bibliothèque Java pour créer des interfaces graphiques de bureau : composants, mise en page, styles CSS, animations et gestion des événements.",
  usage: 'Interface graphique interactive du jeu Latice, découplée du moteur de règles (MVC).',
};

const modelisation: TechInfo = {
  name: 'Modélisation relationnelle',
  category: 'Conception de données',
  summary:
    "Démarche qui traduit les besoins métier en un modèle conceptuel (MCD, entités et associations) puis en un modèle logique (MLD, tables, clés et contraintes), afin d'obtenir un schéma normalisé sans redondance.",
  usage:
    "Reconception du schéma de l'ERP de l'entreprise lors de la migration FoxPro vers MySQL, et maquette pédagogique de l'ERP universitaire.",
};

const uml: TechInfo = {
  name: 'UML',
  category: 'Conception logicielle',
  summary:
    "Langage de modélisation graphique standard. Les diagrammes de classes, de séquence ou de cas d'utilisation permettent de concevoir une application avant de la coder.",
  usage: "Diagrammes de classes du jeu Latice, réalisés avant l'implémentation.",
};

/** Fiches explicatives indexées par le libellé affiché (comme les logos). */
export const techDetails: Record<string, TechInfo> = {
  // Back-end & runtimes
  'Java 21': java,
  Java: java,
  JavaFX: javafx,
  'Spring Boot 3.3': springBoot,
  'JPA / Hibernate': {
    name: 'JPA / Hibernate',
    category: 'ORM Java',
    summary:
      "JPA est la spécification Java de correspondance objet-relationnel ; Hibernate en est l'implémentation la plus répandue. Les classes Java sont annotées pour être liées aux tables, ce qui évite d'écrire le SQL de base à la main.",
    usage: "Couche de persistance de l'API Spring Boot de l'ERP universitaire.",
  },
  Python: {
    name: 'Python',
    category: 'Langage de script',
    summary:
      'Langage interprété à la syntaxe concise, doté d’une vaste bibliothèque standard. Idéal pour automatiser des tâches, traiter des fichiers ou manipuler des données.',
    usage: "Scripts d'automatisation et de traitement de données.",
  },
  PHP: {
    name: 'PHP',
    category: 'Langage web',
    summary:
      "Langage côté serveur conçu pour le web : il génère des pages dynamiques et dialogue avec une base de données. Il propulse une grande partie des sites existants.",
    usage: 'Développement de pages web dynamiques lors des projets universitaires.',
  },

  // Données & persistance
  'PostgreSQL 15': postgresql,
  PostgreSQL: postgresql,
  MySQL: {
    name: 'MySQL',
    category: 'Base de données relationnelle',
    summary:
      "SGBD relationnel open source parmi les plus utilisés au monde, apprécié pour sa simplicité de mise en œuvre et ses performances sur les applications web et métier.",
    usage:
      "Nouvelle base de l'ERP de l'entreprise en alternance, qui remplace l'ancienne base FoxPro.",
  },
  Flyway: {
    name: 'Flyway',
    category: 'Migrations de schéma',
    summary:
      "Outil de versionnage de base de données : chaque évolution du schéma est un script SQL numéroté, appliqué automatiquement et dans l'ordre. Toutes les instances restent ainsi au même niveau.",
    usage: "Évolutions du schéma PostgreSQL de l'ERP universitaire.",
  },
  'Modélisation relationnelle': modelisation,
  'SQL avancé': {
    name: 'SQL avancé',
    category: 'Langage de requête',
    summary:
      "Au-delà des requêtes simples : jointures multiples, sous-requêtes, agrégats, transactions et index pour garder des temps de réponse maîtrisés sur de gros volumes.",
    usage: 'Requêtes métier des ERP et scripts de migration des données en alternance.',
  },

  // Infrastructure & DevOps
  'Docker & Compose': docker,
  Docker: docker,
  'Linux Debian': debian,
  Nginx: {
    name: 'Nginx',
    category: 'Serveur web',
    summary:
      "Serveur web et reverse proxy très performant. Il sert les fichiers statiques et redirige les requêtes vers les bons services applicatifs, en gérant au passage HTTPS.",
    usage: "Reverse proxy de l'ERP universitaire : sert le front Vue.js et relaie les appels vers l'API.",
  },
  'Git & GitHub': {
    name: 'Git & GitHub',
    category: 'Gestion de versions',
    summary:
      "Git suit l'historique du code et permet de travailler en parallèle grâce aux branches. GitHub héberge les dépôts et ajoute les pull requests pour la revue de code.",
    usage: "Travail en équipe de 5 sur l'ERP universitaire : branches, revues croisées et fusions.",
  },
  'Kathará & Wireshark': {
    name: 'Kathará & Wireshark',
    category: 'Réseau',
    summary: `${kathara.summary} ${wireshark.summary}`,
    usage:
      "Infrastructure d'entreprise simulée : topologie émulée sous Kathará, flux vérifiés sous Wireshark.",
  },
  Kathará: kathara,
  Wireshark: wireshark,
  'DHCP / DNS': {
    name: 'DHCP / DNS',
    category: 'Services réseau',
    summary:
      "DHCP attribue automatiquement une adresse IP et la configuration réseau aux machines. DNS traduit les noms de domaine en adresses IP ; Bind est le serveur DNS de référence.",
    usage: "Services d'adressage et de résolution de noms de l'infrastructure réseau simulée.",
  },

  // Front-end & rendu
  'Vue.js 3': vue,
  'Vue.js': vue,
  'JavaScript (ES6+)': {
    name: 'JavaScript (ES6+)',
    category: 'Langage front-end',
    summary:
      "Langage du navigateur. Les versions ES6 et suivantes apportent modules, classes, fonctions fléchées et programmation asynchrone (promesses, async/await, fetch).",
    usage: "Logique du front-end Vue.js et appels asynchrones vers l'API REST.",
  },
  'HTML5 / CSS3': {
    name: 'HTML5 / CSS3',
    category: 'Fondations du web',
    summary:
      'HTML structure le contenu des pages, CSS gère leur mise en forme. Flexbox et Grid permettent des mises en page adaptatives, du mobile au grand écran.',
    usage: 'Intégration des interfaces web de mes projets, dont ce portfolio.',
  },
  'React & Tailwind': {
    name: 'React & Tailwind CSS',
    category: 'Front-end',
    summary:
      "React est une bibliothèque JavaScript d'interfaces à base de composants. Tailwind CSS est un framework de classes utilitaires qui permet de styliser directement dans le balisage.",
    usage: 'Ce portfolio est développé avec React, TypeScript et Tailwind CSS.',
  },

  // Conception
  POO: {
    name: 'Programmation orientée objet',
    category: 'Paradigme',
    summary:
      "Organisation du code en objets qui regroupent données et comportements. Encapsulation, héritage et polymorphisme favorisent la modularité et la réutilisation.",
    usage: 'Architecture du jeu Latice : moteur de règles, contrôleurs et rendu découplés.',
  },
  UML: uml,

  // Expérience professionnelle
  'FoxPro Legacy': {
    name: 'Visual FoxPro',
    category: 'Base de données héritée',
    summary:
      "Environnement de développement et base de données de Microsoft, dont le support s'est arrêté en 2015. De nombreux logiciels métier anciens reposent encore dessus.",
    usage: "Base d'origine de l'ERP de l'entreprise, analysée puis migrée vers MySQL.",
  },
  'Modélisation MCD / MLD': modelisation,
  'Scripts de migration SQL': {
    name: 'Scripts de migration SQL',
    category: 'Migration de données',
    summary:
      "Scripts qui extraient les données de l'ancien système, les transforment au format du nouveau schéma puis les chargent (démarche ETL), de façon rejouable.",
    usage: 'Transfert des données de FoxPro vers le nouveau schéma MySQL en alternance.',
  },
  "Audit d'intégrité": {
    name: "Audit d'intégrité",
    category: 'Qualité des données',
    summary:
      "Contrôles qui vérifient que les données migrées sont complètes et cohérentes : nombre d'enregistrements, clés étrangères valides, doublons, valeurs hors format.",
    usage: 'Validation des données migrées avant la mise en service de la base MySQL.',
  },
};
