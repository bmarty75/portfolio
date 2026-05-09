import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Download,
  Calendar,
  CheckCircle2,
  Code as CodeIcon,
  Moon,
  Sun,
} from 'lucide-react';
import type { Project } from './types';
import { projectsData } from './data/projects';

const LINKEDIN = 'https://www.linkedin.com/in/benjamin-marty-info/';
const GITHUB = 'https://github.com/bmarty75';
const EMAIL = 'benjamin.marty1@etu.unilim.fr';
const PHONE = '+33 7 86 29 55 41';
const CV_URL = '/cv.pdf';

const skillGroups: Record<string, string[]> = {
  'Backend': ['Java', 'Spring Boot', 'JPA / Hibernate', 'Python', 'PHP'],
  'Frontend': ['JavaScript', 'Vue.js', 'HTML / CSS', 'React (notions)'],
  'Bases de données': ['PostgreSQL', 'MySQL', 'SQL'],
  'DevOps & Outils': ['Docker', 'Docker Compose', 'Git / GitHub', 'Linux', 'Nginx', 'IntelliJ', 'VS Code'],
  'Méthodologie': ['API REST', 'JWT', 'POO', 'UML', 'Agile / Scrum'],
};

const featuredProject = projectsData.find(p => p.id === 1)!;
const stageProject    = projectsData.find(p => p.id === 2)!;
const gridProjects    = projectsData.filter(p => p.id !== 1 && p.id !== 2);

/* ─── Hooks ──────────────────────────────────────────────────────────────── */

function useIntersectionObserver() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsIntersecting(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    const el = targetRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);
  return [targetRef, isIntersecting] as const;
}

function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return [isDark, () => setIsDark(d => !d)] as const;
}

const Reveal = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const delayClass = delay === 100 ? 'reveal-delay-100' : delay === 200 ? 'reveal-delay-200' : delay === 300 ? 'reveal-delay-300' : '';
  return (
    <div ref={ref} className={`reveal ${isVisible ? 'active' : ''} ${delayClass} ${className}`}>
      {children}
    </div>
  );
};

/* ─── Chip réutilisable ──────────────────────────────────────────────────── */

const Chip = ({ label, size = 'md' }: { label: string; size?: 'sm' | 'md' }) => (
  <span className={`
    bg-[#EFF6FF] text-[#1B365D] border border-[#BFDBFE] rounded-full font-medium
    dark:bg-slate-700 dark:text-blue-300 dark:border-slate-600
    ${size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm'}
  `}>
    {label}
  </span>
);

/* ─── Navigation ─────────────────────────────────────────────────────────── */

const Navigation = ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'À propos',    href: '#about' },
    { name: 'Expérience',  href: '#experience' },
    { name: 'Projets',     href: '#projects' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Contact',     href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 bg-white dark:bg-slate-900 transition-shadow duration-300 ${scrolled ? 'shadow-sm border-b border-slate-200 dark:border-slate-700' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
        <a href="#home" className="text-lg font-bold text-[#1B365D] dark:text-blue-400 tracking-tight">
          Benjamin Marty
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-[#1B365D] dark:text-slate-300 dark:hover:text-blue-400 transition-colors">
              {link.name}
            </a>
          ))}
          <button
            onClick={onToggle}
            className="p-2 text-slate-500 hover:text-[#1B365D] dark:text-slate-400 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href={CV_URL} download
            className="flex items-center gap-1.5 px-4 py-2 bg-[#1B365D] text-white text-sm font-semibold rounded-lg hover:bg-[#152a4a] transition-colors">
            <Download size={15} /> CV
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={onToggle}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="p-1 text-slate-700 dark:text-slate-300" onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 px-6 py-4 flex flex-col gap-3 shadow-lg">
          {navLinks.map(link => (
            <a key={link.name} href={link.href}
              className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-[#1B365D] dark:hover:text-blue-400 transition-colors py-1"
              onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
          <a href={CV_URL} download
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1B365D] text-white text-sm font-semibold rounded-lg w-fit mt-1">
            <Download size={15} /> Télécharger mon CV
          </a>
        </div>
      )}
    </nav>
  );
};

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const Hero = () => (
  <section id="home" className="relative min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-slate-950 pt-16 px-6">
    <div className="max-w-3xl mx-auto text-center">
      <Reveal>
        <span className="inline-block px-3 py-1 bg-[#EFF6FF] dark:bg-slate-800 text-[#1B365D] dark:text-blue-400 text-xs font-bold rounded-full border border-[#BFDBFE] dark:border-slate-600 mb-8 tracking-widest uppercase">
          Disponible pour alternance · Septembre 2026
        </span>
      </Reveal>

      <Reveal delay={100}>
        <h1 className="text-5xl md:text-6xl font-bold text-[#0F172A] dark:text-slate-100 mb-5 tracking-tight leading-tight">
          Benjamin Marty
        </h1>
      </Reveal>

      <Reveal delay={200}>
        <p className="text-xl md:text-2xl text-[#1B365D] dark:text-blue-400 font-semibold mb-4 leading-snug">
          Étudiant BUT Informatique — Recherche alternance dev pour septembre 2026
        </p>
        <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
          Développeur full-stack avec une orientation back-end (Java&nbsp;/&nbsp;Spring Boot), basé à Limoges.
        </p>
      </Reveal>

      <Reveal delay={300}>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10 flex-wrap">
          <a href="#projects" className="px-6 py-3 bg-[#1B365D] text-white font-semibold rounded-lg hover:bg-[#152a4a] transition-colors">
            Voir mes projets
          </a>
          <a href={CV_URL} download
            className="px-6 py-3 border-2 border-[#1B365D] dark:border-blue-400 text-[#1B365D] dark:text-blue-400 font-semibold rounded-lg hover:bg-[#EFF6FF] dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
            <Download size={18} /> Télécharger mon CV
          </a>
          <a href="#contact"
            className="px-6 py-3 text-slate-600 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            Me contacter
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-slate-500 dark:text-slate-400">
          <a href={LINKEDIN} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 hover:text-[#1B365D] dark:hover:text-blue-400 transition-colors">
            <Linkedin size={17} /> linkedin.com/in/benjamin-marty-info
          </a>
          <a href={GITHUB} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 hover:text-[#1B365D] dark:hover:text-blue-400 transition-colors">
            <Github size={17} /> github.com/bmarty75
          </a>
        </div>
      </Reveal>
    </div>

    <a href="#about"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600 hover:text-[#1B365D] dark:hover:text-slate-400 transition-colors animate-bounce"
      aria-label="Défiler vers le bas">
      <ChevronDown size={28} />
    </a>
  </section>
);

/* ─── À propos ───────────────────────────────────────────────────────────── */

const About = () => (
  <section id="about" className="py-24 bg-white dark:bg-slate-900">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-[#1B365D] flex items-center justify-center flex-shrink-0 shadow-lg">
            <span className="text-4xl md:text-5xl font-bold text-white select-none">BM</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#0F172A] dark:text-slate-100 mb-3">À propos</h2>
            <div className="w-10 h-1 bg-[#1B365D] dark:bg-blue-400 rounded mb-6"></div>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              Étudiant en BUT Informatique à l'IUT du Limousin, je termine actuellement ma 2ème année.
              Je recherche une alternance de 12 mois à partir de septembre 2026, sur Limoges et le Limousin.
              Curieux et autonome, j'aime travailler sur des projets concrets — qu'il s'agisse de back-end Java en équipe
              ou de migrations métier en entreprise. À côté de mes études, je joue au football au niveau D1 Corrèze.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ─── Expérience ─────────────────────────────────────────────────────────── */

const Experience = () => (
  <section id="experience" className="py-24 bg-[#F8FAFC] dark:bg-slate-950">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <h2 className="text-3xl font-bold text-[#0F172A] dark:text-slate-100 mb-3">Expérience professionnelle</h2>
        <div className="w-10 h-1 bg-[#1B365D] dark:bg-blue-400 rounded mb-12"></div>
      </Reveal>

      <Reveal delay={100}>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="h-1.5 bg-[#1B365D]"></div>
          <div className="p-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-[#0F172A] dark:text-slate-100">{stageProject.title}</h3>
                  <span className="px-2.5 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-xs font-bold rounded-full border border-amber-200 dark:border-amber-800 uppercase tracking-wide">
                    En cours
                  </span>
                </div>
                <p className="text-[#1B365D] dark:text-blue-400 font-semibold">{stageProject.role}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 text-sm text-slate-500 dark:text-slate-400 mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-400 dark:text-slate-500" />
                {stageProject.date}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="text-slate-400 dark:text-slate-500" />
                Limoges (87)
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">{stageProject.fullDescription}</p>

            <div className="flex flex-wrap gap-2">
              {stageProject.techs.map((tech, i) => <Chip key={i} label={tech} />)}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ─── Projets ────────────────────────────────────────────────────────────── */

const ProjectModal = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="h-1.5 bg-[#1B365D] rounded-t-2xl"></div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#0F172A] dark:text-slate-100 mb-1">{project.title}</h3>
              <p className="text-[#1B365D] dark:text-blue-400 font-semibold text-sm">{project.role}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0 ml-4">
              <span className="text-sm text-slate-400 flex items-center gap-1.5">
                <Calendar size={13} /> {project.date}
              </span>
              <button onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                aria-label="Fermer">
                <X size={20} />
              </button>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm">{project.fullDescription}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-100 dark:border-slate-600">
              <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#1B365D] dark:text-blue-400" /> Livrables
              </h4>
              <ul className="space-y-2">
                {project.deliverables.map((item, i) => (
                  <li key={i} className="text-slate-600 dark:text-slate-300 text-sm flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[#1B365D] dark:bg-blue-400 rounded-full mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-100 dark:border-slate-600">
              <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <CodeIcon size={13} className="text-[#1B365D] dark:text-blue-400" /> Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech, i) => <Chip key={i} label={tech} size="sm" />)}
              </div>
            </div>
          </div>

          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-600 hover:border-[#1B365D] dark:hover:border-blue-400 text-slate-600 dark:text-slate-300 hover:text-[#1B365D] dark:hover:text-blue-400 rounded-lg text-sm font-medium transition-colors">
              <Github size={15} /> Voir le code source <ExternalLink size={13} className="text-slate-400" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => (
  <div onClick={onClick}
    className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer overflow-hidden group flex flex-col h-full">
    <div className="h-1 bg-[#1B365D] group-hover:h-1.5 transition-all duration-200"></div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full">
          {project.category}
        </span>
        <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0 ml-2">
          <Calendar size={12} /> {project.date}
        </span>
      </div>
      <h3 className="text-lg font-bold text-[#0F172A] dark:text-slate-100 mb-1 group-hover:text-[#1B365D] dark:group-hover:text-blue-400 transition-colors">
        {project.title}
      </h3>
      <p className="text-sm text-[#1B365D] dark:text-blue-400 font-semibold mb-3">{project.role}</p>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.techs.slice(0, 4).map((tech, i) => (
          <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full font-medium">
            {tech}
          </span>
        ))}
        {project.techs.length > 4 && (
          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs rounded-full">
            +{project.techs.length - 4}
          </span>
        )}
      </div>
    </div>
    <div className="px-6 py-3 bg-slate-50 dark:bg-slate-700 border-t border-slate-100 dark:border-slate-600">
      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5 group-hover:text-[#1B365D] dark:group-hover:text-blue-400 transition-colors">
        Voir le détail <ExternalLink size={12} />
      </span>
    </div>
  </div>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#0F172A] dark:text-slate-100 mb-3">Projets</h2>
              <div className="w-10 h-1 bg-[#1B365D] dark:bg-blue-400 rounded"></div>
            </div>
            <a href={GITHUB} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-[#1B365D] dark:hover:text-blue-400 transition-colors font-medium self-start sm:self-auto">
              <Github size={17} /> Voir mon GitHub <ExternalLink size={14} />
            </a>
          </div>
        </Reveal>

        {/* ERP — Carte featured */}
        <Reveal delay={100}>
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden mb-8">
            <div className="h-1.5 bg-[#1B365D]"></div>
            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 bg-[#1B365D] text-white text-xs font-bold rounded uppercase tracking-wider">
                      Projet phare
                    </span>
                    <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full font-medium">
                      {featuredProject.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A] dark:text-slate-100 mb-1">{featuredProject.title}</h3>
                  <p className="text-[#1B365D] dark:text-blue-400 font-semibold">{featuredProject.role}</p>
                  <p className="text-slate-400 text-sm mt-1.5 flex items-center gap-1.5">
                    <Calendar size={13} /> {featuredProject.date} · Équipe de 5
                  </p>
                </div>
                {featuredProject.githubUrl && (
                  <a href={featuredProject.githubUrl} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 hover:border-[#1B365D] dark:hover:border-blue-400 text-slate-600 dark:text-slate-300 hover:text-[#1B365D] dark:hover:text-blue-400 rounded-lg text-sm font-medium transition-colors shrink-0 self-start">
                    <Github size={15} /> Code source <ExternalLink size={13} className="text-slate-400" />
                  </a>
                )}
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">{featuredProject.fullDescription}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-5 border border-slate-100 dark:border-slate-700">
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-[#1B365D] dark:text-blue-400" /> Livrables
                  </h4>
                  <ul className="space-y-2">
                    {featuredProject.deliverables.map((item, i) => (
                      <li key={i} className="text-slate-600 dark:text-slate-300 text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-[#1B365D] dark:bg-blue-400 rounded-full mt-1.5 shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-5 border border-slate-100 dark:border-slate-700">
                  <h4 className="text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CodeIcon size={13} className="text-[#1B365D] dark:text-blue-400" /> Stack technique
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredProject.techs.map((tech, i) => <Chip key={i} label={tech} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {gridProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gridProjects.map((project, i) => (
              <Reveal key={project.id} delay={(i % 2) * 100}>
                <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

/* ─── Compétences ────────────────────────────────────────────────────────── */

const Skills = () => (
  <section id="skills" className="py-24 bg-[#F8FAFC] dark:bg-slate-950">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <h2 className="text-3xl font-bold text-[#0F172A] dark:text-slate-100 mb-3">Compétences techniques</h2>
        <div className="w-10 h-1 bg-[#1B365D] dark:bg-blue-400 rounded mb-12"></div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(skillGroups).map(([category, items], i) => (
          <Reveal key={category} delay={(i % 2) * 100}>
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 h-full">
              <h3 className="text-xs font-bold text-[#1B365D] dark:text-blue-400 uppercase tracking-widest mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((item, j) => <Chip key={j} label={item} />)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Contact ────────────────────────────────────────────────────────────── */

const Contact = () => (
  <section id="contact" className="py-24 bg-[#1B365D]">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Me contacter</h2>
          <div className="w-10 h-1 bg-white/30 rounded mx-auto mb-6"></div>
          <p className="text-blue-200 text-lg max-w-lg mx-auto">
            Prêt à discuter d'une alternance ? N'hésitez pas à me contacter directement.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
          <a href={`mailto:${EMAIL}`}
            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-6 text-center transition-all hover:-translate-y-0.5">
            <Mail size={24} className="text-white mx-auto mb-3" />
            <p className="text-blue-300 text-xs uppercase tracking-wider mb-1 font-semibold">Email</p>
            <p className="text-white text-xs font-medium break-all">{EMAIL}</p>
          </a>

          <a href={`tel:${PHONE.replace(/\s/g, '')}`}
            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-6 text-center transition-all hover:-translate-y-0.5">
            <Phone size={24} className="text-white mx-auto mb-3" />
            <p className="text-blue-300 text-xs uppercase tracking-wider mb-1 font-semibold">Téléphone</p>
            <p className="text-white text-sm font-medium">{PHONE}</p>
          </a>

          <a href={LINKEDIN} target="_blank" rel="noreferrer"
            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-6 text-center transition-all hover:-translate-y-0.5">
            <Linkedin size={24} className="text-white mx-auto mb-3" />
            <p className="text-blue-300 text-xs uppercase tracking-wider mb-1 font-semibold">LinkedIn</p>
            <p className="text-white text-sm font-medium">benjamin-marty-info</p>
          </a>

          <a href={GITHUB} target="_blank" rel="noreferrer"
            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl p-6 text-center transition-all hover:-translate-y-0.5">
            <Github size={24} className="text-white mx-auto mb-3" />
            <p className="text-blue-300 text-xs uppercase tracking-wider mb-1 font-semibold">GitHub</p>
            <p className="text-white text-sm font-medium">github.com/bmarty75</p>
          </a>
        </div>

        <p className="text-blue-300 text-sm text-center flex items-center justify-center gap-2">
          <MapPin size={15} /> Limoges (87) — mobilité Limousin
        </p>
      </Reveal>
    </div>
  </section>
);

/* ─── Footer ─────────────────────────────────────────────────────────────── */

const Footer = () => (
  <footer className="bg-slate-950 py-6">
    <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
      <p>© 2026 Benjamin Marty — Tous droits réservés.</p>
      <div className="flex gap-6">
        <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
          <Github size={15} /> GitHub
        </a>
        <a href={LINKEDIN} target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
          <Linkedin size={15} /> LinkedIn
        </a>
      </div>
    </div>
  </footer>
);

/* ─── App ────────────────────────────────────────────────────────────────── */

export default function App() {
  const [isDark, toggleDark] = useDarkMode();

  return (
    <div className="bg-[#F8FAFC] dark:bg-slate-950 text-[#0F172A] dark:text-slate-100 font-sans antialiased selection:bg-[#1B365D]/20 dark:selection:bg-blue-500/30">
      <Navigation isDark={isDark} onToggle={toggleDark} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
