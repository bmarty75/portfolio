import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Database, 
  Globe, 
  Users, 
  GitBranch, 
  ChevronDown, 
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
  CheckCircle2
} from 'lucide-react';

const skillsData = [
  {
    category: "Programmation Orientée Objet",
    icon: <Cpu className="w-8 h-8 text-blue-400" />,
    techs: ["Java", "Design Patterns", "UML", "Junit"],
    desc: "Conception robuste et modulaire respectant les principes SOLID."
  },
  {
    category: "Bases de Données",
    icon: <Database className="w-8 h-8 text-emerald-400" />,
    techs: ["PostgreSQL", "SQL Avancé", "Modélisation MCD/MLD", "Procédures Stockées"],
    desc: "Gestion de l'intégrité des données et optimisation des requêtes."
  },
  {
    category: "Développement Web",
    icon: <Globe className="w-8 h-8 text-purple-400" />,
    techs: ["HTML5/CSS3", "JavaScript", "PHP", "React (Notions)"],
    desc: "Création d'interfaces réactives et logiques métier complètes."
  },
  {
    category: "DevOps & Outils",
    icon: <GitBranch className="w-8 h-8 text-orange-400" />,
    techs: ["Git", "GitLab CI", "Linux", "Docker"],
    desc: "Versionning, intégration continue et travail collaboratif."
  },
  {
    category: "Agilité & Soft Skills",
    icon: <Users className="w-8 h-8 text-pink-400" />,
    techs: ["Scrum", "Trello", "Communication", "Gestion de conflit"],
    desc: "Organisation en sprints et livraison incrémentale de valeur."
  }
];

const projectsData = [
  {
    id: 1,
    title: "Jeu Latice (Java)",
    category: "Application Lourde",
    role: "Développeur Back-end & Front-end",
    description: "Implémentation complète d'un jeu de société complexe avec interface graphique. Gestion stricte de l'état du jeu, des règles et de l'IA basique.",
    fullDescription: "Ce projet consistait à numériser le jeu de société Latice en respectant scrupuleusement les règles officielles. Le défi principal était de concevoir une architecture orientée objet capable de gérer l'état complexe du plateau et les interactions des joueurs en temps réel.",
    deliverables: ["Code source Java", "Documentation technique (UML)", "Exécutable .jar"],
    techs: ["Java", "JavaFX", "POO", "MVC"],
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
    techs: ["PostgreSQL", "SQL", "Bash"],
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
    techs: ["Trello", "Agile/Scrum", "GitLab"],
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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          DEV.PORTFOLIO
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
        <div className="inline-block px-4 py-1 mb-6 border border-slate-700 rounded-full bg-slate-800/50 backdrop-blur-sm">
          <span className="text-blue-400 text-sm font-semibold tracking-wide">DÉVELOPPEUR JUNIOR & FUTUR INGÉNIEUR</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
          Transformer des idées <br />
          en <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">Solutions Robustes</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Passionné par la conception logicielle, du Back-end Java aux bases de données complexes, avec une approche Agile et DevOps rigoureuse.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="#projects" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2">
            <Layers size={20} />
            Voir mes projets
          </a>
          <a href="#contact" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
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

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Domaines de Maîtrise</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            Une palette technique complète alliant développement pur, gestion de données et méthodologies modernes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((skill, index) => (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 group">
              <div className="mb-6 bg-slate-900 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {skill.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{skill.category}</h3>
              <p className="text-slate-400 mb-6 text-sm h-10">{skill.desc}</p>
              <div className="flex flex-wrap gap-2">
                {skill.techs.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-700 text-blue-300 rounded-full text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl relative shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()} 
      >
        <div className={`h-32 bg-gradient-to-r ${project.color} w-full shrink-0 relative`}>
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors backdrop-blur-md"
          >
            <X size={20} />
          </button>
          <div className="absolute -bottom-10 left-8 p-4 bg-slate-900 rounded-2xl border border-slate-700 shadow-xl">
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
                 <CheckCircle2 size={16} className="text-emerald-400"/> Livrables
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
                 <Code size={16} className="text-blue-400"/> Stack Technique
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

const ProjectCard = ({ project, onClick }) => {
  return (
    <div className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-slate-500 transition-all duration-300 flex flex-col h-full">
      <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-0 transition-opacity"></div>
        <div className="transform group-hover:scale-110 transition-transform duration-500">
           {project.icon}
        </div>
        <div className="absolute bottom-4 left-4">
           <span className="px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs rounded-full border border-white/10">
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
          <button onClick={onClick} className="text-white hover:text-blue-400 text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer">
            Détails <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

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

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-900 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Prêt à collaborer ?</h2>
            <p className="text-slate-400">Je suis actuellement à la recherche d'un stage.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
             <a href="mailto:votre-email@example.com" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                <Mail size={18} />
                Envoyer un email
             </a>
             <a href="https://www.linkedin.com/in/benjamin-marty-info/" className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                <Linkedin size={18} />
                LinkedIn
             </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800 text-slate-500 text-sm">
          <p>© 2024 - Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-300 font-sans selection:bg-blue-500/30">
      <Navigation />
      <main>
        <Hero />
        <Skills />
        <Projects />
      </main>
      <Footer />
    </div>
  );
}