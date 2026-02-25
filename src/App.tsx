import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  Database,
  Globe,
  Users,
  GitBranch,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Terminal,
  Layers,
  Cpu,
  Menu,
  X,
  Calendar,
  CheckCircle2,
  Code as CodeIcon,
  ChevronDown,
  Send
} from 'lucide-react';

interface Skill {
  category: string;
  icon: ReactNode;
  techs: string[];
  desc: string;
  analyse?: string;
  relatedProjects?: number[];
}

interface SkillModalProps {
  skill: Skill | null;
  onClose: () => void;
  onOpenProject: (projectId: number) => void;
}

interface Project {
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
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const skillsData: Skill[] = [
  {
    category: "Programmation Orientée Objet",
    icon: <Cpu className="w-8 h-8 text-blue-400" />,
    techs: ["Java", "Design Patterns", "UML", "Junit"],
    desc: "Conception robuste et modulaire respectant les principes SOLID.",
    analyse: "Durant mon parcours formateur, j'ai conceptualisé et développé plusieurs architectures orientées objet. Mon apprentissage des design patterns m'a permis d'implémenter des solutions flexibles et évolutives, en utilisant des principes comme SOLID, et en garantissant la qualité de la base de code grâce à des tests unitaires (Mocking, JUnit).",
    relatedProjects: [1]
  },
  {
    category: "Bases de Données",
    icon: <Database className="w-8 h-8 text-emerald-400" />,
    techs: ["PostgreSQL", "SQL Avancé", "Modélisation MCD/MLD", "Procédures Stockées"],
    desc: "Gestion de l'intégrité des données et optimisation des requêtes.",
    analyse: "J'ai acquis une solide expérience dans la conception de bases de données, en partant de l'analyse des besoins métiers pour créer des modèles conceptuels (MCD/MLD) jusqu'à l'implémentation physique sous PostgreSQL. Je maîtrise l'écriture de requêtes structurées, la création de triggers, ainsi que les procédures stockées permettant de garantir l'intégrité et la fiabilité des données.",
    relatedProjects: [3, 2]
  },
  {
    category: "Développement Web",
    icon: <Globe className="w-8 h-8 text-purple-400" />,
    techs: ["HTML5/CSS3", "JavaScript", "PHP", "React (Notions)"],
    desc: "Création d'interfaces réactives et logiques métier complètes.",
    analyse: "Je conçois des applications web dynamiques et responsives. Du développement orienté front-end interactif avec JavaScript (et des bases en React) au développement back-end logique reposant sur PHP et des architectures MVC, j'ai appris à structurer mon code convenablement pour de meilleures performances et une maintenabilité aisée.",
    relatedProjects: [2]
  },
  {
    category: "DevOps & Outils",
    icon: <GitBranch className="w-8 h-8 text-orange-400" />,
    techs: ["Git", "GitLab CI", "Linux", "Docker"],
    desc: "Versionning, intégration continue et travail collaboratif.",
    analyse: "Afin de sécuriser et faciliter le développement, je place au centre de ma méthode de travail le versionnement rigoureux sous Git et l’automatisation des déploiements. J'ai eu l'opportunité de configurer des pipelines d'intégration continue via GitLab CI et j'utilise des systèmes Linux au quotidien, en y greffant des concepts de conteneurisation au moyen de Docker.",
    relatedProjects: [4, 3]
  },
  {
    category: "Agilité & Soft Skills",
    icon: <Users className="w-8 h-8 text-pink-400" />,
    techs: ["Scrum", "Trello", "Communication", "Gestion de conflit"],
    desc: "Organisation en sprints et livraison incrémentale de valeur.",
    analyse: "Mon adaptabilité et ma capacité à travailler en équipe sont des atouts majeurs. En endossant le rôle de Scrum Master lors de divers projets collaboratifs, j’ai orchestré des rituels agiles (Daily, Sprint Review, Rétrospective) favorisant une livraison de valeur en continu. Ces expériences ont façonné ma communication au sein d'une équipe technique et renforcé mon leadership pour débloquer les situations complexes.",
    relatedProjects: [4]
  }
];

const projectsData: Project[] = [
  {
    id: 1,
    title: "Jeu Latice (Java)",
    category: "Application Lourde",
    role: "Développeur Back-end & Front-end",
    description: "Implémentation complète d'un jeu de société complexe avec interface graphique. Gestion stricte de l'état du jeu, des règles et de l'IA basique.",
    fullDescription: "Ce projet consistait à numériser le jeu de société Latice en respectant scrupuleusement les règles officielles. Le défi principal était de concevoir une architecture orientée objet capable de gérer l'état complexe du plateau et les interactions des joueurs en temps réel.",
    deliverables: ["Code source Java", "Documentation technique (UML)", "Exécutable .jar"],
    techs: ["Java", "Swing/JavaFX", "POO", "MVC"],
    icon: <Terminal className="w-12 h-12 text-white opacity-80" />,
    color: "from-blue-600 to-blue-900",
    date: "2023"
  },
  {
    id: 2,
    title: "La Cosina",
    category: "Full Stack Web",
    role: "Développeur Full Stack Junior",
    description: "Développement d'une application web de A à Z pour un restaurant fictif. Création de l'interface client et d'un back-office pour la gestion des menus.",
    fullDescription: "La Cosina est une plateforme complète permettant aux clients de réserver et de voir le menu, et aux restaurateurs de gérer leurs plats. J'ai dû gérer la persistance des données et créer une interface responsive sans utiliser de frameworks lourds initialement.",
    deliverables: ["Site Web dynamique", "Manuel utilisateur", "Déploiement local"],
    techs: ["HTML/CSS", "PHP", "MySQL", "JS"],
    icon: <Globe className="w-12 h-12 text-white opacity-80" />,
    color: "from-purple-600 to-purple-900",
    date: "2023"
  },
  {
    id: 3,
    title: "Gestion BDD & Admin",
    category: "Data Engineering",
    role: "Administrateur BDD",
    description: "Conception et implémentation d'une base de données PostgreSQL complexe. Écriture de scripts de maintenance et de vues pour le reporting.",
    fullDescription: "L'objectif était de structurer une base de données cohérente pour une grande quantité de données. J'ai mis en place des contraintes d'intégrité strictes, des triggers pour l'automatisation et des vues pour faciliter l'accès aux données par les non-techniciens.",
    deliverables: ["Scripts SQL (DDL/DML)", "Procédures stockées", "Dictionnaire de données"],
    techs: ["PostgreSQL", "PL/pgSQL", "Bash", "Merise"],
    icon: <Database className="w-12 h-12 text-white opacity-80" />,
    color: "from-emerald-600 to-emerald-900",
    date: "2024"
  },
  {
    id: 4,
    title: "Projet SAE Agile",
    category: "Gestion de Projet",
    role: "Product Owner / Scrum Master",
    description: "Simulation d'un projet réel en équipe. Gestion du backlog, animation des cérémonies (Daily, Review, Retro) et suivi de l'avancement.",
    fullDescription: "Dans ce projet académique de grande envergure, le défi n'était pas seulement technique mais humain. En tant que Scrum Master, j'ai dû m'assurer que l'équipe restait alignée sur les objectifs du sprint et que la communication était fluide via Trello et Git.",
    deliverables: ["Backlog produit", "Rapport de projet", "Présentation orale"],
    techs: ["Trello", "Agile/Scrum", "GitLab", "Jira"],
    icon: <Users className="w-12 h-12 text-white opacity-80" />,
    color: "from-pink-600 to-pink-900",
    date: "2024"
  }
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#home' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Projets', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav shadow-lg shadow-blue-900/20 py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm hover:scale-105 transition-transform cursor-pointer">
          DEV.<span className="text-slate-100">PORTFOLIO</span>
        </a>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-white hover:scale-105 transition-all text-sm font-medium uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-slate-800 p-4 flex flex-col space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-300 hover:text-white block"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 text-center z-10">
        <div className="inline-block px-4 py-1.5 mb-8 border border-slate-700/50 rounded-full glass shadow-lg shadow-purple-500/10">
          <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent text-sm font-bold tracking-widest uppercase">
            DÉVELOPPEUR JUNIOR & FUTUR INGÉNIEUR
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-tight tracking-tight">
          Transformer des idées <br />
          en <span className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">Solutions Robustes</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Passionné par la conception logicielle, du Back-end Java aux bases de données complexes, avec une approche Agile et DevOps rigoureuse.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <a href="#projects" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold transition-all shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)] hover:-translate-y-1 flex items-center justify-center gap-2">
            <Layers size={20} />
            Voir mes projets
          </a>
          <a href="mailto:benjamin.marty1@etu.unilim.fr" className="px-8 py-4 glass hover:bg-slate-800/80 text-white border border-slate-700 rounded-xl font-semibold transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
            <Mail size={20} />
            Me contacter
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#skills" className="text-slate-500 hover:text-white transition-colors">
          <ChevronDown size={32} />
        </a>
      </div>
    </section>
  );
};

const SkillModal = ({ skill, onClose, onOpenProject }: SkillModalProps) => {
  if (!skill) return null;

  const related = projectsData.filter(p => skill.relatedProjects?.includes(p.id));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" onClick={onClose}>
      <div
        className="glass border border-slate-700/60 w-full max-w-2xl rounded-3xl relative shadow-[0_0_100px_-20px_rgba(0,0,0,1)] flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 pt-12 relative flex-1">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 bg-slate-800/80 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 p-2.5 rounded-full transition-colors border border-transparent hover:border-rose-500/30"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 shadow-xl shrink-0">
              {skill.icon}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{skill.category}</h3>
              <p className="text-blue-400 font-medium text-sm">Analyse et Expérience</p>
            </div>
          </div>

          <div className="mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700/50">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              L'Analyse
            </h4>
            <p className="text-slate-300 leading-relaxed text-sm">
              {skill.analyse || skill.desc}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Technologies / Méthodologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {skill.techs.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-slate-700 text-emerald-300 rounded-full text-sm font-medium border border-slate-600">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Layers size={16} className="text-purple-400" />
                Projets Liés
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map(p => (
                  <div
                    key={p.id}
                    onClick={() => onOpenProject(p.id)}
                    className="glass hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/50 p-4 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner`}>
                      <div className="scale-75 text-white">{p.icon}</div>
                    </div>
                    <div>
                      <h5 className="text-white font-medium text-sm group-hover:text-purple-300 transition-colors">{p.title}</h5>
                      <p className="text-slate-400 text-xs">{p.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface SkillsProps {
  onOpenProject: (projectId: number) => void;
}

const Skills = ({ onOpenProject }: SkillsProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <section id="skills" className="py-20 bg-slate-900 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Domaines de Maîtrise</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Une palette technique complète alliant développement pur, gestion de données et méthodologies modernes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <div key={index} className="glass p-8 rounded-3xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.3)] group flex flex-col h-full relative overflow-hidden card-hover-effect cursor-default">

              {/* Subtle background glow on hover */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 transition-all duration-700 ease-in-out blur-xl opacity-0 group-hover:opacity-100 rounded-3xl"></div>

              <div className="mb-8 bg-slate-900/80 border border-slate-700/50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-lg">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 transition-colors">{skill.category}</h3>
              <p className="text-slate-400 mb-8 text-sm flex-1 relative z-10 leading-relaxed">{skill.desc}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {skill.techs.slice(0, 3).map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-700 text-blue-300 rounded-full text-xs font-medium">
                    {tech}
                  </span>
                ))}
                {skill.techs.length > 3 && (
                  <span className="px-3 py-1 bg-slate-700 text-blue-300 rounded-full text-xs font-medium">
                    +{skill.techs.length - 3}
                  </span>
                )}
              </div>

              <div className="mt-auto relative z-10">
                <button
                  onClick={() => setSelectedSkill(skill)}
                  className="w-full py-3.5 glass hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-300 border border-slate-700/50 hover:border-transparent flex justify-center items-center gap-2 group/btn shadow-md hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]"
                >
                  Lire l'analyse
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SkillModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        onOpenProject={(id) => {
          setSelectedSkill(null);
          onOpenProject(id);
        }}
      />
    </section>
  );
};

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" onClick={onClose}>
      <div
        className="glass border border-slate-700/60 w-full max-w-3xl rounded-3xl relative shadow-[0_0_100px_-20px_rgba(0,0,0,1)] flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className={`h-40 bg-gradient-to-r ${project.color} w-full shrink-0 relative flex items-center justify-center overflow-hidden`}>
          {/* Decorative background circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full transition-colors backdrop-blur-md border border-white/10"
          >
            <X size={20} />
          </button>
          <div className="absolute -bottom-12 left-10 p-5 glass rounded-2xl border border-white/10 shadow-2xl">
            {project.icon}
          </div>
        </div>

        <div className="pt-12 px-8 pb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
              <p className="text-blue-400 font-medium">{project.role}</p>
            </div>
            {project.date && (
              <div className="flex items-center gap-2 text-slate-500 text-sm bg-slate-800 px-3 py-1 rounded-full">
                <Calendar size={14} /> {project.date}
              </div>
            )}
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Contexte & Mission</h4>
            <p className="text-slate-400 leading-relaxed">
              {project.fullDescription || project.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" /> Livrables
              </h4>
              <ul className="space-y-2">
                {project.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start text-slate-400 text-sm">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2 mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
              <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CodeIcon size={16} className="text-blue-400" /> Stack Technique
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((t, i) => (
                  <span key={i} className="px-2 py-1 bg-slate-700 text-blue-200 rounded text-xs border border-slate-600">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <div className="group relative glass rounded-3xl overflow-hidden border border-slate-700/50 hover:border-slate-500/50 transition-all duration-500 flex flex-col h-full card-hover-effect cursor-pointer" onClick={onClick}>
      <div className={`h-56 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-500"></div>
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-black/30 rounded-full blur-xl group-hover:bg-black/10 transition-all duration-500"></div>

        <div className="transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500 ease-out drop-shadow-2xl">
          {project.icon}
        </div>
        <div className="absolute bottom-5 left-5">
          <span className="px-4 py-1.5 bg-black/40 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider rounded-xl border border-white/10 shadow-lg">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-blue-400 text-sm font-medium mb-4">{project.role}</p>

        <p className="text-slate-300 text-sm mb-6 flex-1">
          {project.description}
        </p>

        <div className="mb-6 p-4 bg-slate-900/50 rounded-lg border border-slate-700/50">
          <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Livrables Clés</h4>
          <ul className="space-y-1">
            {project.deliverables.slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-center text-slate-300 text-xs">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                {item}
              </li>
            ))}
            {project.deliverables.length > 2 && (
              <li className="text-slate-500 text-xs pl-3.5 italic">
                + {project.deliverables.length - 2} autres...
              </li>
            )}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-700">
          <div className="flex gap-3 text-slate-400">
            <div className="flex -space-x-2">
              {project.techs.slice(0, 3).map((t, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-[10px] text-white font-bold" title={t}>
                  {t[0]}
                </div>
              ))}
            </div>
          </div>
          <button className="text-white hover:text-indigo-400 text-sm font-semibold flex items-center gap-2 transition-colors">
            Voir Détails <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProjectsProps {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
}

const Projects = ({ selectedProject, setSelectedProject }: ProjectsProps) => {
  return (
    <section id="projects" className="py-20 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Projets Réalisés</h2>
            <div className="w-20 h-1 bg-purple-500 rounded-full"></div>
            <p className="text-slate-400 mt-4">Preuves de concept, applications et travail d'équipe.</p>
          </div>
          <a href="https://github.com/bmarty75/bmarty75.git" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors mt-4 md:mt-0">
            <Github size={20} />
            Voir mon GitHub
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

const Contact = () => {

  return (
    <section id="contact" className="py-20 bg-slate-900 relative">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-5/12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Prêt à collaborer ?</h2>
            <div className="w-20 h-1 bg-blue-500 rounded-full mb-6"></div>
            <p className="text-slate-400 mb-8 leading-relaxed">
              Je suis actuellement à la recherche d'un stage. N'hésitez pas à me contacter via ce formulaire, je vous répondrai dans les plus brefs délais !
            </p>

            <div className="flex flex-col gap-6">
              <a href="mailto:benjamin.marty1@etu.unilim.fr" className="flex items-center gap-4 text-slate-300 hover:text-white group">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-blue-600/20 transition-colors border border-slate-700 border-t-white/10 shadow-lg">
                  <Mail size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Email direct</p>
                  <p className="font-semibold text-slate-300">benjamin.marty1@etu.unilim.fr</p>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/benjamin-marty-info/" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-300 hover:text-white group">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-blue-600/20 transition-colors border border-slate-700 border-t-white/10 shadow-lg">
                  <Linkedin size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Réseau Professionnel</p>
                  <p className="font-semibold text-slate-300">LinkedIn</p>
                </div>
              </a>
            </div>
          </div>

          <div className="lg:w-7/12">
            <form action="https://api.web3forms.com/submit" method="POST" className="glass p-8 rounded-3xl border border-slate-700/50 shadow-2xl shadow-black/40 border-t-white/10">

              <input type="hidden" name="access_key" value="cc2b7ac7-44ca-4832-9369-32145230723a" />
              <input type="hidden" name="subject" value="Nouveau message de votre Portfolio !" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Votre Nom</label>
                  <input type="text" name="name" id="name" required className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner" placeholder="Jean Dupont" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Votre Email</label>
                  <input type="email" name="email" id="email" required className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner" placeholder="jean@exemple.com" />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Votre Message</label>
                <textarea name="message" id="message" required rows={5} className="w-full bg-slate-900/80 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner resize-none" placeholder="Bonjour, je vous contacte pour un stage..."></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)]"
              >
                Envoyer le message
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 pt-10 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© 2024 - Benjamin Marty - Tous droits réservés.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://github.com/bmarty75" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><Github size={16} /> GitHub</a>
            <a href="https://www.linkedin.com/in/benjamin-marty-info/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2"><Linkedin size={16} /> LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="bg-slate-900 min-h-screen text-slate-300 font-sans selection:bg-blue-500/30">
      <Navigation />
      <main>
        <Hero />
        <Skills onOpenProject={(id) => {
          const p = projectsData.find(proj => proj.id === id);
          if (p) {
            setSelectedProject(p);
            setTimeout(() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }} />
        <Projects selectedProject={selectedProject} setSelectedProject={setSelectedProject} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}