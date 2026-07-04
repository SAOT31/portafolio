import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <footer className="w-full py-section-gap-mobile md:py-12 bg-surface dark:bg-surface-container-lowest border-t border-white/5 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto px-gutter gap-4">
        <div className="font-display text-body-lg font-bold text-on-surface">
          DevPortfolio.
        </div>
        <div className="font-body-md text-body-md text-on-surface-variant">
          © 2025 Sergio Alejandro Ospina Tabares. {t.rights}
        </div>
        <div className="flex gap-6">
          <a className="hover-glow font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300 hover:opacity-80 flex flex-col items-center gap-1" href="https://github.com/SAOT31" target="_blank" rel="noreferrer">
            <span className="material-symbols-outlined text-[24px]">code</span>
            GitHub
          </a>
          <a className="hover-glow font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300 hover:opacity-80 flex flex-col items-center gap-1" href="https://www.linkedin.com/in/sergio-alejandro-ospina-tabares-834913212/" target="_blank" rel="noreferrer">
            <span className="material-symbols-outlined text-[24px]">link</span>
            LinkedIn
          </a>
          <a className="hover-glow font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors duration-300 hover:opacity-80 flex flex-col items-center gap-1" href="https://www.instagram.com/" target="_blank" rel="noreferrer">
            <span className="material-symbols-outlined text-[24px]">photo_camera</span>
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};
