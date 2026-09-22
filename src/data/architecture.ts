import { Monitor, Shield, Server, Database } from 'lucide-react';
import type { ArchitectureLayer } from '../types';

/**
 * Chaîne de traitement de l'ERP universitaire, présentée comme un flux
 * requête → réponse de la couche cliente jusqu'à la persistance.
 */
export const architectureLayers: ArchitectureLayer[] = [
  {
    layer: 'LAYER 01',
    title: 'Interface Vue.js',
    icon: Monitor,
    tag: 'SPA Client',
    accent: 'cyan',
    description:
      'Composants réactifs, formulaires dynamiques des 6 modules métier (maquettes, heures, TAC) et stockage token JWT sécurisé.',
    footerLeft: 'Protocole: HTTPS',
    footerRight: '200 OK',
    footerRightTone: 'text-emerald-400',
  },
  {
    layer: 'LAYER 02',
    title: 'Nginx & SSL Gateway',
    icon: Shield,
    tag: 'Reverse Proxy',
    accent: 'teal',
    description:
      "Terminaison TLS, redirection du trafic, filtrage des requêtes et distribution vers le container d'API applicatif.",
    footerLeft: 'Port : 443 → 8080',
    footerRight: 'Routing',
    footerRightTone: 'text-cyan-400',
  },
  {
    layer: 'LAYER 03',
    title: 'API REST Java 21',
    icon: Server,
    tag: 'Spring Boot 3.3',
    accent: 'emerald',
    highlight: true,
    badge: 'Cœur Back-end',
    description:
      'Spring Security avec JWT stateless, validation de rôles granulaires, architecture en couches Service/DAO, et logique des règles métier.',
    footerLeft: '6 modules intégrés',
    footerRight: '100% Stateless',
    footerRightTone: 'text-emerald-400 font-bold',
  },
  {
    layer: 'LAYER 04',
    title: 'PostgreSQL 15 & Flyway',
    icon: Database,
    tag: 'Persistance',
    accent: 'blue',
    description:
      'Schéma relationnel strict, migrations versionnées via scripts Flyway, requêtes optimisées et conteneurisation isolée.',
    footerLeft: 'Migrations SQL',
    footerRight: 'Zéro drift',
    footerRightTone: 'text-emerald-400',
  },
];
