import { useState, useEffect } from 'react';
import { useUISounds } from '../hooks/useSound';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { playClickSound } = useUISounds();
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  useEffect(() => {
    // Check local storage or default to true
    const savedMode = localStorage.getItem('theme');
    if (savedMode === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    playClickSound();
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
      window.dispatchEvent(new Event('themeChanged'));
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
      window.dispatchEvent(new Event('themeChanged'));
    }
  };
  return (
    <nav className="fixed top-0 w-full h-16 z-50 bg-surface/80 dark:bg-surface-container-lowest/80 backdrop-blur-md border-b border-white/10 dark:border-white/5 transition-all duration-300">
      <div className="flex justify-between items-center max-w-container-max mx-auto px-gutter w-full h-full">
        <div className="font-display text-headline-md tracking-tighter text-on-surface dark:text-on-background">
          DevPortfolio.
        </div>
        <div className="hidden md:flex space-x-8">
          <a className="hover-glow font-label-caps text-label-caps text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#home">Home</a>
          <a className="hover-glow font-label-caps text-label-caps text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#experience">{t.experience}</a>
          <a className="hover-glow font-label-caps text-label-caps text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#skills">{t.skills}</a>
          <a className="hover-glow font-label-caps text-label-caps text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#projects">{t.projects}</a>
          <a className="hover-glow font-label-caps text-label-caps text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#contact">{t.contact}</a>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="text-on-surface-variant hover:text-primary transition-colors duration-300"
            aria-label="Toggle dark mode"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>
              {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button 
            onClick={() => { playClickSound(); toggleLanguage(); }}
            className="text-on-surface-variant hover:text-primary font-label-caps font-bold transition-colors duration-300 w-8 text-center"
            aria-label="Toggle language"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
          <button className="md:hidden text-on-surface-variant">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
