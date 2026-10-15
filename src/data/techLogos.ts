import { Boxes, Database, FileCode, Network, ShieldCheck, Table2, Workflow } from 'lucide-react';
import {
  siDebian,
  siDocker,
  siFlyway,
  siGit,
  siHibernate,
  siHtml5,
  siJavascript,
  siMysql,
  siNginx,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siSpringboot,
  siVuedotjs,
  siWireshark,
} from 'simple-icons';
import type { TechLogo } from '../types';

/**
 * Logo associé à chaque technologie, indexé par le libellé affiché
 * (compétences et étiquettes de projets). Les notions sans marque
 * retombent sur une icône Lucide générique.
 */
export const techLogos: Record<string, TechLogo> = {
  // Back-end & runtimes
  'Java 21': siOpenjdk,
  Java: siOpenjdk,
  JavaFX: siOpenjdk,
  'Spring Boot 3.3': siSpringboot,
  'JPA / Hibernate': siHibernate,
  Python: siPython,
  PHP: siPhp,

  // Données & persistance
  'PostgreSQL 15': siPostgresql,
  PostgreSQL: siPostgresql,
  MySQL: siMysql,
  Flyway: siFlyway,
  'Modélisation relationnelle': Workflow,
  'SQL avancé': Table2,

  // Infrastructure & DevOps
  'Docker & Compose': siDocker,
  Docker: siDocker,
  'Linux Debian': siDebian,
  Nginx: siNginx,
  'Git & GitHub': siGit,
  'Kathará & Wireshark': siWireshark,
  Kathará: Network,
  Wireshark: siWireshark,
  'DHCP / DNS': Network,

  // Front-end & rendu
  'Vue.js 3': siVuedotjs,
  'Vue.js': siVuedotjs,
  'JavaScript (ES6+)': siJavascript,
  'HTML5 / CSS3': siHtml5,
  'React & Tailwind': siReact,

  // Conception
  POO: Boxes,
  UML: Workflow,

  // Expérience professionnelle
  'FoxPro Legacy': Database,
  'Modélisation MCD / MLD': Workflow,
  'Scripts de migration SQL': FileCode,
  "Audit d'intégrité": ShieldCheck,
};
