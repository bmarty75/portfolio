import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { KeyFacts } from './components/KeyFacts';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-surface text-on-surface">
      <Navbar />

      <main className="relative w-full flex-grow overflow-hidden pt-16">
        {/* Halo ambiant discret en haut de page */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[980px] -translate-x-1/2 bg-gradient-to-b from-primary/10 via-primary-container/5 to-transparent blur-[120px]"
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-page flex-col gap-space-3xl px-margin-mobile pb-space-3xl pt-space-xl md:px-margin">
          <Hero />
          <KeyFacts />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
}
