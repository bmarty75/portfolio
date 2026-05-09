import { useState, useEffect, useRef } from 'react';
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
  Layers,
  Cpu,
  Menu,
  X,
  Calendar,
  CheckCircle2,
  Code as CodeIcon,
  ChevronDown,
  Send,
} from 'lucide-react';
import type { Project, Skill } from './types';
import { projectsData } from './data/projects';

interface SkillModalProps {
  skill: Skill | null;
  onClose: () => void;
  onOpenProject: (projectId: number) => void;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

// Hook d'Intersection Observer pour les animations au défilement
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    const currentTarget = targetRef.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [options]);

  return [targetRef, isIntersecting] as const;
}

// Composant Reveal pour animer l'apparition
const Reveal = ({ children, delay = 0, className = "" }: { children: ReactNode, delay?: number, className?: string }) => {
  const [ref, isVisible] = useIntersectionObserver();
  let delayClass = "";
  if (delay === 100) delayClass = "reveal-delay-100";
  if (delay === 200) delayClass = "reveal-delay-200";
  if (delay === 300) delayClass = "reveal-delay-300";

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'active' : ''} ${delayClass} ${className}`}>
      {children}
    </div>
  );
};

const skillsData: Skill[] = [
  {
    category: "Programmation Orientée Objet",
    icon: <Cpu className="w-8 h-8 text-blue-400" />,
    techs: ["Java", "Design Patterns", "UML", "Junit"],
    desc: "Conception robuste et modulaire respectant les principes SOLID.",
    analyse: "Durant mon parcours formateur, j'ai conceptualisé et développé plusieurs architectures orientées objet. Mon apprentissage des design patterns m'a permis d'implémenter des solutions flexibles et évolutives, en utilisant des principes comme SOLID, et en garantissant la qualité de la base de code grâce à des tests unitaires (Mocking, JUnit).",
    relatedProjects: [4, 1]
  },
  {
    category: "Bases de Données",
    icon: <Database className="w-8 h-8 text-emerald-400" />,
    techs: ["PostgreSQL", "SQL Avancé", "Modélisation MCD/MLD", "Procédures Stockées"],
    desc: "Gestion de l’intégrité des données et optimisation des requêtes.",
    analyse: "J’ai acquis une solide expérience dans la conception de bases de données, en partant de l’analyse des besoins métiers pour créer des modèles conceptuels (MCD/MLD) jusqu’à l’implémentation physique sous PostgreSQL. Je maîtrise l’écriture de requêtes structurées, la création de triggers, ainsi que les procédures stockées permettant de garantir l’intégrité et la fiabilité des données.",
    relatedProjects: [1, 2]
  },
  {
    category: "Développement Web",
    icon: <Globe className="w-8 h-8 text-purple-400" />,
    techs: ["HTML5/CSS3", "JavaScript", "PHP", "React / Vue.js"],
    desc: "Création d’interfaces réactives et logiques métier complètes.",
    analyse: "Je conçois des applications web dynamiques et responsives. Du développement orienté front-end interactif avec JavaScript (et des bases en React) au développement back-end logique reposant sur PHP et des architectures MVC, j’ai appris à structurer mon code convenablement pour de meilleures performances et une maintenabilité aisée.",
    relatedProjects: [1]
  },
  {
    category: "DevOps & Outils",
    icon: <GitBranch className="w-8 h-8 text-orange-400" />,
    techs: ["Git", "GitLab CI", "Linux", "Docker"],
    desc: "Versionning, intégration continue et travail collaboratif.",
    analyse: "Afin de sécuriser et faciliter le développement, je place au centre de ma méthode de travail le versionnement rigoureux sous Git et l’automatisation des déploiements. J’ai eu l’opportunité de configurer des pipelines d’intégration continue via GitLab CI et j’utilise des systèmes Linux au quotidien, en y greffant des concepts de conteneurisation au moyen de Docker.",
    relatedProjects: [1, 5]
  },
  {
    category: "Agilité & Soft Skills",
    icon: <Users className="w-8 h-8 text-pink-400" />,
    techs: ["Scrum", "Trello", "Communication", "Gestion de conflit"],
    desc: "Organisation en sprints et livraison incrémentale de valeur.",
    analyse: "Mon adaptabilité et ma capacité à travailler en équipe sont des atouts majeurs. En endossant le rôle de Scrum Master lors de divers projets collaboratifs, j’ai orchestré des rituels agiles (Daily, Sprint Review, Rétrospective) favorisant une livraison de valeur en continu. Ces expériences ont façonné ma communication au sein d’une équipe technique et renforcé mon leadership pour débloquer les situations complexes.",
    relatedProjects: [1]
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
          Benjamin <span className="text-slate-100">Marty</span>
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
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-[#050b14] bg-noise overflow-hidden">
      {/* Premium Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>

      {/* Ambient glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-sky-600/20 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 text-center z-10 relative mt-16 pb-16">
        <Reveal delay={0}>
          <div className="inline-flex items-center gap-2 px-5 py-2 mb-8 md:mb-10 border border-indigo-500/20 rounded-full bg-indigo-500/5 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(99,102,241,0.2)]">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-blue-300 text-xs font-bold tracking-[0.2em] uppercase">
              Benjamin Marty — Développeur Junior
            </span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-white mb-6 md:mb-8 leading-[1.1] tracking-tight">
            Créateur de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-300 via-indigo-400 to-purple-400 drop-shadow-sm pb-2">Solutions Connectées</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="text-slate-400/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed font-light">
            Développeur passionné par la conception logicielle. De l'architecture back-end <strong className="text-slate-200 font-medium">Java</strong> à la modélisation de <strong className="text-slate-200 font-medium">Bases de Données</strong>, avec une approche d'ingénierie rigoureuse.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a href="#projects" className="group relative px-8 py-4 bg-white text-slate-900 rounded-2xl font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
              <span className="relative z-10 flex items-center gap-2">
                <Layers size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                Découvrir mon travail
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>

            <a href="#contact" className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 backdrop-blur-sm text-white border border-slate-700/50 hover:border-slate-500 rounded-2xl font-semibold transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
              <Mail size={20} className="text-slate-400" />
              Me contacter
            </a>
          </div>
        </Reveal>
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
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

const SkillCard = ({ skill, onClick }: { skill: Skill; onClick: () => void }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="glass p-8 rounded-3xl border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-500 hover:shadow-[0_0_40px_-15px_rgba(99,102,241,0.3)] group flex flex-col h-full relative overflow-hidden card-hover-effect cursor-default"
    >
      {/* Interactive Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
      />

      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/5 group-hover:to-pink-500/10 transition-all duration-700 ease-in-out blur-xl opacity-0 group-hover:opacity-100 rounded-3xl pointer-events-none"></div>

      <div className="mb-8 bg-slate-900/80 border border-slate-700/50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative z-10 shadow-lg">
        {skill.icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 relative z-10 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 transition-colors font-display">{skill.category}</h3>
      <p className="text-slate-400 mb-8 text-sm flex-1 relative z-10 leading-relaxed font-light">{skill.desc}</p>

      <div className="flex flex-wrap gap-2 mb-8 relative z-10">
        {skill.techs.slice(0, 3).map((tech, i) => (
          <span key={i} className="px-3 py-1 bg-slate-900/60 text-blue-300 rounded-full text-xs font-medium border border-slate-700/50">
            {tech}
          </span>
        ))}
        {skill.techs.length > 3 && (
          <span className="px-3 py-1 bg-slate-900/60 text-blue-300 rounded-full text-xs font-medium border border-slate-700/50">
            +{skill.techs.length - 3}
          </span>
        )}
      </div>

      <div className="mt-auto relative z-10">
        <button
          onClick={onClick}
          className="w-full py-3.5 glass hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 text-slate-300 hover:text-white text-sm font-semibold rounded-xl transition-all duration-300 border border-slate-700/50 hover:border-transparent flex justify-center items-center gap-2 group/btn shadow-md hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]"
        >
          Lire l'analyse
        </button>
      </div>
    </div>
  );
};

const Skills = ({ onOpenProject }: SkillsProps) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  return (
    <section id="skills" className="py-32 bg-[#080d1a] relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <Reveal delay={0}>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">Domaines de Maîtrise</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
            <p className="text-slate-400 mt-6 max-w-xl mx-auto text-lg leading-relaxed">
              Une palette technique complète alliant développement pur, gestion de données et méthodologies modernes.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <Reveal key={index} delay={(index % 3) * 100}>
              <SkillCard skill={skill} onClick={() => setSelectedSkill(skill)} />
            </Reveal>
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

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 rounded-xl text-slate-300 hover:text-white text-sm font-medium transition-all"
            >
              <Github size={16} />
              Voir le code source
              <ExternalLink size={14} className="text-slate-500" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="group relative glass rounded-[2.5rem] overflow-hidden border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-700 flex flex-col h-full card-hover-effect cursor-pointer shadow-2xl bg-gradient-to-b from-slate-900/40 to-slate-900/90"
      onClick={onClick}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
      />

      <div className={`h-64 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden shrink-0 border-b border-white/5`}>
        {/* Advanced Decorative elements */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-0"></div>
        <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all duration-700 group-hover:scale-150"></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/40 rounded-full blur-xl group-hover:bg-black/20 transition-all duration-700"></div>

        <div className="transform group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700 ease-out drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] z-10 p-5 glass rounded-3xl border border-white/10">
          {project.icon}
        </div>

        <div className="absolute bottom-5 left-6 z-10 hidden sm:block">
          <span className="px-5 py-2 bg-white/10 backdrop-blur-md text-white/90 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-white/20 shadow-lg">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-8 lg:p-10 flex-1 flex flex-col relative z-10 backdrop-blur-xl">
        <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3 font-display tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-300 group-hover:to-purple-300 transition-all drop-shadow-sm">{project.title}</h3>
        <p className="text-indigo-400 text-sm font-semibold mb-6 tracking-wider uppercase">{project.role}</p>

        <p className="text-slate-300/90 text-[15px] mb-8 flex-1 font-light leading-relaxed">
          {project.description}
        </p>

        <div className="mb-8 p-6 bg-slate-900/60 rounded-3xl border border-slate-700/50 shadow-inner group-hover:border-slate-600/50 transition-colors relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl"></div>
          <h4 className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-3 relative z-10">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
            Livrables Clés
          </h4>
          <ul className="space-y-3 relative z-10">
            {project.deliverables.slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-start text-slate-400 text-sm font-medium">
                <span className="w-4 h-px bg-indigo-500/50 mt-2.5 mr-3 shrink-0"></span>
                {item}
              </li>
            ))}
            {project.deliverables.length > 2 && (
              <li className="text-slate-500 text-xs pl-7 italic mt-2 font-light">
                + {project.deliverables.length - 2} autres détails...
              </li>
            )}
          </ul>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-5 pt-6 border-t border-slate-700/50 mt-auto">
          <div className="flex flex-wrap gap-2 items-center flex-1 min-w-[200px]">
            {project.techs.map((t, i) => (
              <span key={i} className="px-3 py-1.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-xs text-slate-300 font-medium tracking-wider shadow-sm transition-colors hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-200">
                {t}
              </span>
            ))}
          </div>
          <button className="px-5 py-3 xl:px-6 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-2xl text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all group/btn shadow-lg backdrop-blur-md shrink-0">
            Explorer le projet
            <ExternalLink size={16} className="text-indigo-400 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
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
    <section id="projects" className="py-32 bg-[#070e1a] relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <Reveal delay={0}>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">Projets Réalisés</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
              <p className="text-slate-400 mt-6 text-lg">Preuves de concept, applications et travail d'équipe.</p>
            </div>
            <a href="https://github.com/bmarty75/bmarty75.git" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors mt-4 md:mt-0 font-medium bg-slate-800/50 hover:bg-slate-800 px-6 py-3 rounded-xl border border-slate-700/50 hover:border-slate-500/50">
              <Github size={20} />
              Voir mon GitHub
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 100}>
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </Reveal>
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
    <section id="contact" className="py-32 bg-[#050b14] relative bg-noise overflow-hidden">
      {/* Premium background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 absolute pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-5/12">
            <Reveal delay={0}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">Prêt à collaborer ?</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-8"></div>
              <p className="text-slate-400 mb-12 text-lg leading-relaxed">
                Je suis actuellement à la recherche d'un stage. N'hésitez pas à me contacter via ce formulaire, je vous répondrai dans les plus brefs délais !
              </p>

              <div className="flex flex-col gap-6">
                <a href="mailto:benjamin.marty1@etu.unilim.fr" className="flex items-center gap-5 text-slate-300 hover:text-white group">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-blue-600/20 transition-all group-hover:scale-110 border border-slate-700/50 shadow-lg group-hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] group-hover:border-blue-500/30">
                    <Mail size={22} className="text-blue-400 transition-transform group-hover:-mt-1" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1 tracking-wide uppercase">Email direct</p>
                    <p className="font-semibold text-slate-300 text-lg">benjamin.marty1@etu.unilim.fr</p>
                  </div>
                </a>

                <a href="https://www.linkedin.com/in/benjamin-marty-info/" target="_blank" rel="noreferrer" className="flex items-center gap-5 text-slate-300 hover:text-white group">
                  <div className="w-14 h-14 glass rounded-2xl flex items-center justify-center group-hover:bg-blue-600/20 transition-all group-hover:scale-110 border border-slate-700/50 shadow-lg group-hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.5)] group-hover:border-blue-500/30">
                    <Linkedin size={22} className="text-blue-400 transition-transform group-hover:scale-110" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1 tracking-wide uppercase">Réseau Professionnel</p>
                    <p className="font-semibold text-slate-300 text-lg">LinkedIn</p>
                  </div>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:w-7/12">
            <Reveal delay={200}>
              <form action="https://api.web3forms.com/submit" method="POST" className="glass p-8 md:p-10 rounded-[2rem] border border-slate-700/50 shadow-2xl relative overflow-hidden group">
                {/* Form spotlight hint */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] group-hover:bg-indigo-500/30 transition-colors pointer-events-none"></div>

                <input type="hidden" name="access_key" value="cc2b7ac7-44ca-4832-9369-32145230723a" />
                <input type="hidden" name="subject" value="Nouveau message de votre Portfolio !" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="relative">
                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2 ml-1">Votre Nom</label>
                    <input type="text" name="name" id="name" required className="w-full bg-slate-900/60 border border-slate-700/80 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner focus:bg-slate-900" placeholder="Jean Dupont" />
                  </div>
                  <div className="relative">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2 ml-1">Votre Email</label>
                    <input type="email" name="email" id="email" required className="w-full bg-slate-900/60 border border-slate-700/80 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner focus:bg-slate-900" placeholder="jean@exemple.com" />
                  </div>
                </div>
                <div className="mb-8 relative">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2 ml-1">Votre Message</label>
                  <textarea name="message" id="message" required rows={5} className="w-full bg-slate-900/60 border border-slate-700/80 rounded-2xl px-5 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner resize-none focus:bg-slate-900" placeholder="Bonjour, je vous contacte pour un stage..."></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg rounded-2xl transition-all flex items-center justify-center gap-3 group/btn shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_40px_-5px_rgba(79,70,229,0.7)] relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Envoyer le message
                    <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                </button>
              </form>
            </Reveal>
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