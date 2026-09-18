import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import {
  Mail,
  Phone,
  Github,
  Linkedin,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Download,
  Calendar,
  CheckCircle2,
  Code as CodeIcon,
  Moon,
  Sun,
  FolderOpen,
  FileText,
  Server,
  Monitor,
  Database,
  Container,
  Workflow,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Project } from './types';
import { projectsData } from './data/projects';

const LINKEDIN = 'https://www.linkedin.com/in/benjamin-marty-info/';
const GITHUB = 'https://github.com/bmarty75';
const EMAIL = 'benjamin.marty1@etu.unilim.fr';
const PHONE = '+33 7 86 29 55 41';
const CV_URL = '/cv.pdf';

const skillGroups: { title: string; icon: LucideIcon; items: string[]; wide?: boolean }[] = [
  { title: 'Back-end',        icon: Server,    items: ['Java', 'Spring Boot', 'JPA / Hibernate', 'Python', 'PHP'] },
  { title: 'Front-end',       icon: Monitor,   items: ['JavaScript', 'Vue.js', 'HTML / CSS', 'React (notions)'] },
  { title: 'Bases de données', icon: Database, items: ['PostgreSQL', 'MySQL', 'SQL'] },
  { title: 'DevOps & Outils', icon: Container, items: ['Docker', 'Docker Compose', 'Git / GitHub', 'Linux', 'Nginx', 'IntelliJ', 'VS Code'], wide: true },
  { title: 'Méthodologie & Architecture', icon: Workflow, items: ['UML & POO', 'Méthodes Agiles (Scrum)', 'API RESTful', 'Sécurité JWT'] },
];

const navLinks = [
  { name: 'À propos',    href: '#about' },
  { name: 'Expérience',  href: '#experience' },
  { name: 'Projets',     href: '#projects' },
  { name: 'Compétences', href: '#skills' },
  { name: 'Contact',     href: '#contact' },
];

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

/* ─── Éléments réutilisables ─────────────────────────────────────────────── */

const Chip = ({ label, variant = 'neutral' }: { label: string; variant?: 'neutral' | 'accent' }) => (
  <span className={`px-2 py-0.5 text-xs font-medium rounded border ${
    variant === 'accent'
      ? 'bg-blue-50 text-accent border-blue-100 dark:bg-blue-500/10 dark:text-accent-light dark:border-blue-500/20'
      : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
  }`}>
    {label}
  </span>
);

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold tracking-tight text-ink dark:text-slate-100">
    <span className="w-1 h-7 rounded-full bg-accent dark:bg-accent-light" aria-hidden />
    {children}
  </h2>
);

const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-[0_1px_3px_rgba(15,23,42,0.04)] ${className}`}>
    {children}
  </div>
);

const Logo = ({ size = 'sm' }: { size?: 'sm' | 'lg' }) => (
  <div className={`flex items-center justify-center bg-gradient-to-br from-navy to-navy-dark text-white font-bold select-none ${
    size === 'sm' ? 'w-9 h-9 rounded-md text-sm' : 'w-40 h-40 rounded-2xl text-5xl shadow-xl shadow-navy/20 flex-col'
  }`}>
    BM
    {size === 'lg' && <span className="mt-1 text-[10px] font-medium tracking-[0.2em] text-blue-200/80">LIMOGES • 87</span>}
  </div>
);

const AvailabilityPill = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold tracking-widest uppercase">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    {children}
  </span>
);

/* ─── Navigation ─────────────────────────────────────────────────────────── */

const ThemeToggle = ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className="w-8 h-8 flex items-center justify-center rounded-full bg-navy text-white hover:bg-navy-dark dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
    aria-label={isDark ? 'Mode clair' : 'Mode sombre'}
  >
    {isDark ? <Sun size={15} /> : <Moon size={15} />}
  </button>
);

const Navigation = ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 bg-white/90 dark:bg-night/90 backdrop-blur transition-shadow duration-300 border-b ${scrolled ? 'border-slate-200 dark:border-slate-800 shadow-sm' : 'border-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-16">
        <div className="flex items-center gap-5">
          <a href="#home" className="flex items-center gap-2.5">
            <Logo />
            <span className="leading-tight">
              <span className="block text-sm font-bold text-ink dark:text-slate-100">Benjamin Marty</span>
              <span className="block text-[11px] text-slate-500 dark:text-slate-400">Full-Stack &amp; Back-End</span>
            </span>
          </a>
          <span className="hidden lg:inline-flex"><AvailabilityPill>Alternance sept. 2026</AvailabilityPill></span>
        </div>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(link => (
            <a key={link.name} href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-ink dark:text-slate-300 dark:hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <a href={CV_URL} download
            className="flex items-center gap-1.5 px-3 py-1.5 bg-navy text-white text-xs font-semibold rounded-md hover:bg-navy-dark dark:bg-accent dark:hover:bg-blue-700 transition-colors">
            <Download size={13} /> CV
          </a>
          <ThemeToggle isDark={isDark} onToggle={onToggle} />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle isDark={isDark} onToggle={onToggle} />
          <button className="p-1 text-slate-700 dark:text-slate-300" onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-night border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex flex-col gap-3 shadow-lg">
          {navLinks.map(link => (
            <a key={link.name} href={link.href}
              className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-accent dark:hover:text-accent-light transition-colors py-1"
              onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
          <a href={CV_URL} download
            className="flex items-center gap-2 px-4 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg w-fit mt-1">
            <Download size={15} /> Télécharger mon CV
          </a>
        </div>
      )}
    </nav>
  );
};

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const Hero = () => (
  <section id="home" className="relative min-h-[88vh] flex flex-col items-center justify-center pt-24 pb-20 px-6">
    <div className="max-w-3xl mx-auto text-center">
      <Reveal>
        <div className="mb-7"><AvailabilityPill>Disponible pour alternance · Septembre 2026</AvailabilityPill></div>
      </Reveal>

      <Reveal delay={100}>
        <h1 className="text-5xl md:text-6xl font-extrabold text-ink dark:text-slate-100 mb-5 tracking-tight">
          Benjamin Marty
        </h1>
      </Reveal>

      <Reveal delay={200}>
        <p className="text-xl md:text-2xl text-accent dark:text-accent-light font-semibold mb-5 leading-snug max-w-xl mx-auto">
          Étudiant BUT Informatique — Recherche alternance dev pour septembre 2026
        </p>
        <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-xl mx-auto leading-relaxed">
          Développeur full-stack avec une orientation back-end (<strong className="text-slate-700 dark:text-slate-200 font-semibold">Java&nbsp;/&nbsp;Spring Boot</strong>), basé
          à Limoges. Passionné par l'architecture logicielle, les API robustes et les projets concrets à fort impact.
        </p>
      </Reveal>

      <Reveal delay={300}>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10">
          <a href="#projects"
            className="flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-semibold rounded-lg shadow-lg shadow-navy/20 hover:bg-navy-dark dark:bg-accent dark:hover:bg-blue-700 transition-colors">
            <FolderOpen size={16} /> Voir mes projets
          </a>
          <a href={CV_URL} download
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-ink dark:text-slate-100 text-sm font-semibold rounded-lg shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
            <FileText size={16} /> Télécharger mon CV
          </a>
          <a href="#contact"
            className="group flex items-center gap-1.5 px-4 py-2.5 text-slate-600 dark:text-slate-300 text-sm font-semibold hover:text-ink dark:hover:text-white transition-colors">
            Me contacter <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center items-center text-xs text-slate-400 dark:text-slate-500">
          <a href={LINKEDIN} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-accent dark:hover:text-accent-light transition-colors">
            <Linkedin size={14} /> linkedin.com/in/benjamin-marty-info
          </a>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <a href={GITHUB} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-accent dark:hover:text-accent-light transition-colors">
            <Github size={14} /> github.com/bmarty75
          </a>
        </div>
      </Reveal>
    </div>

    <a href="#about"
      className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600 hover:text-ink dark:hover:text-slate-400 transition-colors animate-bounce"
      aria-label="Défiler vers le bas">
      <ChevronDown size={24} />
    </a>
  </section>
);

/* ─── À propos ───────────────────────────────────────────────────────────── */

const stats = [
  { label: 'Formation',       value: 'BUT Info 2A' },
  { label: 'Alternance',      value: '12 mois' },
  { label: 'Localisation',    value: 'Limoges (87)' },
  { label: 'Cœur de métier',  value: 'Back-end Java' },
];

const About = () => (
  <section id="about" className="py-20">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal><div className="mb-8"><SectionTitle>À propos</SectionTitle></div></Reveal>

      <Reveal delay={100}>
        <Card className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/3 flex justify-center shrink-0">
              <Logo size="lg" />
            </div>
            <div className="flex-1">
              <p className="text-ink dark:text-slate-200 text-lg leading-relaxed mb-4">
                Étudiant en <strong className="font-semibold">BUT Informatique à l'IUT du Limousin</strong>, je termine actuellement ma 2ème
                année. Je recherche une alternance de <strong className="font-semibold">12 mois à partir de septembre 2026</strong>, sur
                Limoges et le Limousin.
              </p>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Curieux et autonome, j'aime travailler sur des projets concrets — qu'il s'agisse de back-end Java en équipe
                ou de migrations métier en entreprise. À côté de mes études, je joue au football au niveau D1 Corrèze,
                cultivant esprit d'équipe, engagement et persévérance.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map(s => (
                  <div key={s.label} className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 rounded-lg px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-0.5">{s.label}</p>
                    <p className="text-sm font-bold text-ink dark:text-slate-100">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </Reveal>
    </div>
  </section>
);

/* ─── Expérience ─────────────────────────────────────────────────────────── */

const Experience = () => (
  <section id="experience" className="py-20">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal><div className="mb-8"><SectionTitle>Expérience professionnelle</SectionTitle></div></Reveal>

      <Reveal delay={100}>
        <Card className="overflow-hidden border-t-[3px] border-t-accent dark:border-t-accent-light p-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
            <div>
              <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                <h3 className="text-xl font-bold text-ink dark:text-slate-100">{stageProject.title}</h3>
                <span className="px-2 py-0.5 bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded border border-amber-200 dark:border-amber-500/30 uppercase tracking-wider">
                  En cours
                </span>
              </div>
              <p className="text-accent dark:text-accent-light font-semibold text-sm">{stageProject.role}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400 shrink-0">
              <span className="flex items-center gap-1.5"><Calendar size={13} /> {stageProject.date}</span>
              <span className="flex items-center gap-1.5"><MapPin size={13} /> Limoges (87)</span>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-5 text-[15px]">
            Stage de fin de deuxième année (avril – juin 2026) chez <strong className="text-ink dark:text-slate-100 font-semibold">Faure Menuiseries</strong>,
            PME de menuiserie industrielle basée à Limoges, sous la direction d'Antoine Faure. Mission principale : analyser la base
            de données FoxPro d'un ERP existant, concevoir le schéma de migration vers MySQL et implémenter les scripts de
            transformation des données. Un projet concret avec un impact direct sur les opérations quotidiennes de l'entreprise.
          </p>

          <div className="flex flex-wrap gap-1.5">
            {stageProject.techs.map(tech => <Chip key={tech} label={tech} />)}
          </div>
        </Card>
      </Reveal>
    </div>
  </section>
);

/* ─── Projets ────────────────────────────────────────────────────────────── */

const DeliverablesList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map(item => (
      <li key={item} className="text-slate-600 dark:text-slate-300 text-sm flex items-start gap-2">
        <CheckCircle2 size={15} className="text-accent dark:text-accent-light mt-0.5 shrink-0" />
        {item}
      </li>
    ))}
  </ul>
);

const ProjectModal = ({ project, onClose }: { project: Project | null; onClose: () => void }) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-slate-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-t-[3px] border-accent" onClick={e => e.stopPropagation()}>
        <div className="p-8">
          <div className="flex justify-between items-start mb-5">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">{project.category} · {project.date}</p>
              <h3 className="text-xl font-bold text-ink dark:text-slate-100 mb-1">{project.title}</h3>
              <p className="text-accent dark:text-accent-light font-semibold text-sm">{project.role}</p>
            </div>
            <button onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Fermer">
              <X size={20} />
            </button>
          </div>

          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-sm">{project.fullDescription}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50/60 dark:bg-blue-500/5 rounded-lg p-4 border border-blue-100 dark:border-blue-500/20">
              <h4 className="text-sm font-bold text-ink dark:text-slate-100 mb-3 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-accent dark:text-accent-light" /> Livrables clés
              </h4>
              <DeliverablesList items={project.deliverables} />
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-4 border border-slate-200/80 dark:border-slate-700">
              <h4 className="text-sm font-bold text-ink dark:text-slate-100 mb-3 flex items-center gap-1.5">
                <CodeIcon size={15} className="text-accent dark:text-accent-light" /> Stack technique
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techs.map(tech => <Chip key={tech} label={tech} variant="accent" />)}
              </div>
            </div>
          </div>

          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 hover:border-accent text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent-light rounded-lg text-sm font-medium transition-colors">
              <Github size={15} /> Voir le code source <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => (
  <Card className="group p-6 h-full flex flex-col cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
    <div onClick={onClick} className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{project.category}</span>
        <span className="text-xs text-slate-400 shrink-0 ml-2">{project.date}</span>
      </div>
      <h3 className="text-lg font-bold text-ink dark:text-slate-100 mb-0.5">{project.title}</h3>
      <p className="text-sm text-accent dark:text-accent-light font-semibold mb-3">{project.role}</p>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>
      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.techs.slice(0, 4).map(tech => <Chip key={tech} label={tech} />)}
        {project.techs.length > 4 && <Chip label={`+${project.techs.length - 4}`} />}
      </div>
      <span className="text-sm text-accent dark:text-accent-light font-semibold flex items-center gap-1">
        Voir le détail <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </span>
    </div>
  </Card>
);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <SectionTitle>Projets</SectionTitle>
            <a href={GITHUB} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-accent dark:hover:text-accent-light transition-colors font-medium">
              Voir mon GitHub <ArrowUpRight size={15} />
            </a>
          </div>
        </Reveal>

        {/* ERP — Carte featured */}
        <Reveal delay={100}>
          <Card className="overflow-hidden border-t-[3px] border-t-ink dark:border-t-slate-300 p-8 mb-6">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="px-2 py-0.5 bg-ink dark:bg-slate-100 text-white dark:text-ink text-[10px] font-bold rounded uppercase tracking-wider">
                    Projet phare
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{featuredProject.category}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-ink dark:text-slate-100 mb-1 tracking-tight">{featuredProject.title}</h3>
                <p className="text-sm text-slate-400">
                  <span className="text-accent dark:text-accent-light font-semibold">{featuredProject.role}</span>
                  <span className="mx-2">·</span>{featuredProject.date}
                  <span className="mx-2">·</span>Équipe de 5
                </p>
              </div>
              {featuredProject.githubUrl && (
                <a href={featuredProject.githubUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-700 hover:border-accent text-slate-600 dark:text-slate-300 hover:text-accent dark:hover:text-accent-light rounded-md text-xs font-semibold transition-colors shrink-0 self-start">
                  <Github size={14} /> Code source <ArrowUpRight size={13} />
                </a>
              )}
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-[15px]">{featuredProject.fullDescription}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50/60 dark:bg-blue-500/5 rounded-lg p-5 border border-blue-100 dark:border-blue-500/20">
                <h4 className="text-sm font-bold text-ink dark:text-slate-100 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-accent dark:text-accent-light" /> Livrables clés
                </h4>
                <DeliverablesList items={featuredProject.deliverables} />
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-5 border border-slate-200/80 dark:border-slate-700">
                <h4 className="text-sm font-bold text-ink dark:text-slate-100 mb-3 flex items-center gap-1.5">
                  <CodeIcon size={16} className="text-accent dark:text-accent-light" /> Stack technique
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {featuredProject.techs.map(tech => <Chip key={tech} label={tech} variant="accent" />)}
                </div>
              </div>
            </div>
          </Card>
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
  <section id="skills" className="py-20">
    <div className="max-w-6xl mx-auto px-6">
      <Reveal><div className="mb-8"><SectionTitle>Compétences techniques</SectionTitle></div></Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skillGroups.map(({ title, icon: Icon, items, wide }, i) => (
          <Reveal key={title} delay={(i % 3) * 100} className={wide ? 'lg:col-span-2' : ''}>
            <Card className="p-5 h-full">
              <h3 className="text-sm font-bold text-ink dark:text-slate-100 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 flex items-center justify-center rounded-md bg-blue-50 dark:bg-blue-500/10 text-accent dark:text-accent-light">
                  <Icon size={15} />
                </span>
                {title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {items.map(item => <Chip key={item} label={item} />)}
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Contact ────────────────────────────────────────────────────────────── */

const contactCards = [
  { label: 'Email',     value: EMAIL,                  href: `mailto:${EMAIL}`,                    icon: Mail,     external: false },
  { label: 'Téléphone', value: PHONE,                  href: `tel:${PHONE.replace(/\s/g, '')}`,    icon: Phone,    external: false },
  { label: 'LinkedIn',  value: 'benjamin-marty-info',  href: LINKEDIN,                             icon: Linkedin, external: true },
  { label: 'GitHub',    value: 'bmarty75',             href: GITHUB,                               icon: Github,   external: true },
];

const Contact = () => (
  <section id="contact" className="relative overflow-hidden py-24 bg-night">
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_45%,rgba(37,99,235,0.28),transparent_70%)]" aria-hidden />
    <div className="relative max-w-5xl mx-auto px-6">
      <Reveal>
        <div className="text-center mb-12">
          <span className="inline-block mb-5 px-2.5 py-1 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-300 text-[10px] font-bold tracking-widest uppercase">
            Connectivité directe
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Me contacter</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Prêt à discuter d'une alternance ? N'hésitez pas à me contacter directement.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {contactCards.map(({ label, value, href, icon: Icon, external }) => (
            <a key={label} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              className="group bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-blue-400/40 rounded-xl p-6 text-center transition-all hover:-translate-y-0.5">
              <span className="w-9 h-9 mx-auto mb-3 flex items-center justify-center rounded-lg bg-blue-500/15 text-blue-300 group-hover:text-white transition-colors">
                <Icon size={17} />
              </span>
              <p className="text-white text-sm font-bold uppercase tracking-wider mb-1">{label}</p>
              <p className="text-slate-400 text-xs break-all">{value}</p>
            </a>
          ))}
        </div>

        <p className="text-slate-400 text-sm text-center flex items-center justify-center gap-2">
          <MapPin size={15} className="text-blue-400" /> Limoges (87) — mobilité Limousin
        </p>
      </Reveal>
    </div>
  </section>
);

/* ─── Footer ─────────────────────────────────────────────────────────────── */

const footerNav = [
  { name: 'À propos',               href: '#about' },
  { name: 'Parcours & Expérience',  href: '#experience' },
  { name: 'Réalisations & Projets', href: '#projects' },
  { name: 'Stack technique',        href: '#skills' },
  { name: 'Contact direct',         href: '#contact' },
];

const Footer = () => (
  <footer className="bg-night border-t border-white/10 text-sm">
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-white font-bold text-base">Benjamin Marty</span>
          <span className="px-1.5 py-0.5 rounded border border-white/15 bg-white/5 text-slate-300 text-[10px] font-semibold">Développeur Full-Stack</span>
        </div>
        <p className="text-slate-400 leading-relaxed max-w-sm mb-4">
          Applications web robustes, API REST et interfaces réactives. Spécialisation Java, Spring Boot, Vue.js et
          conteneurisation Docker.
        </p>
        <p className="flex items-center gap-2 text-xs text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Disponible pour une alternance (sept. 2026)
        </p>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-3">Navigation</h3>
        <ul className="space-y-2">
          {footerNav.map(l => (
            <li key={l.name}><a href={l.href} className="text-slate-400 hover:text-white transition-colors">{l.name}</a></li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-white font-semibold mb-3">Connectivité</h3>
        <ul className="space-y-2 text-slate-400">
          <li><a href={GITHUB} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors"><Github size={14} /> GitHub</a></li>
          <li><a href={LINKEDIN} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors"><Linkedin size={14} /> LinkedIn</a></li>
          <li><a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-white transition-colors break-all"><Mail size={14} className="shrink-0" /> {EMAIL}</a></li>
          <li><a href={`tel:${PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors"><Phone size={14} /> {PHONE}</a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
        <p>© 2026 Benjamin Marty. Tous droits réservés.</p>
        <p>Conçu avec React · TypeScript · Tailwind CSS</p>
      </div>
    </div>
  </footer>
);

/* ─── App ────────────────────────────────────────────────────────────────── */

export default function App() {
  const [isDark, toggleDark] = useDarkMode();

  return (
    <div className="bg-[#F6F7F9] dark:bg-night text-ink dark:text-slate-100 font-sans antialiased selection:bg-accent/20 dark:selection:bg-blue-500/30">
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
