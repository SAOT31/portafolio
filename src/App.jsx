import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { ToTopButton } from './components/ToTopButton';
import { ScrollProgress } from './components/ScrollProgress';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    // Wait a tick for rendering
    setTimeout(() => {
      document.querySelectorAll('.fade-up').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <LanguageProvider>
      <div className="bg-surface-container-lowest min-h-screen text-on-surface font-body-md transition-colors duration-300">
        <CustomCursor />
        <ScrollProgress />
        <Header />
        
        <main className="w-full relative">
          <Hero />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>

        <Footer />
        <ToTopButton />
      </div>
    </LanguageProvider>
  );
}

export default App;
