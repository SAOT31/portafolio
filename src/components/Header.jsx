import { useState, useEffect } from 'react';
import { useUISounds } from '../hooks/useSound';

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { playClickSound } = useUISounds();

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
          <a className="hover-glow font-label-caps text-label-caps text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#experience">Experience</a>
          <a className="hover-glow font-label-caps text-label-caps text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#skills">Skills</a>
          <a className="hover-glow font-label-caps text-label-caps text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#projects">Projects</a>
          <a className="hover-glow font-label-caps text-label-caps text-on-surface-variant hover:text-primary dark:hover:text-primary transition-colors duration-300" href="#contact">Contact</a>
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
          <button className="md:hidden text-on-surface-variant">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
