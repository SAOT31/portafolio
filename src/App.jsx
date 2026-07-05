import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
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
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Admin } from './pages/Admin';

const Portfolio = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    setTimeout(() => {
      document.querySelectorAll('.fade-up').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
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
  );
};

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            } />
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
