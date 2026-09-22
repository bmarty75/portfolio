import { ShaderBackground } from './components/ShaderBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Architecture } from './components/Architecture';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#090d14] text-slate-100 antialiased">
      <ShaderBackground />

      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Architecture />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
