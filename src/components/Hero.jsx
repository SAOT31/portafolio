import { TypeAnimation } from 'react-type-animation';
import { ParticlesBackground } from './ParticlesBackground';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="min-h-screen flex items-center pt-16 max-w-container-max mx-auto px-gutter relative z-10 overflow-hidden" id="home">
      <ParticlesBackground />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full relative z-10">
        <div className="col-span-1 md:col-span-7 fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">{t.availability}</span>
          </div>
          <h1 className="font-display text-display text-on-background mb-6">
            {t.greeting} <br/>
            <span className="gradient-text cyberpunk-glitch" data-text={t.name}>{t.name}</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl min-h-[80px]">
            <TypeAnimation
              key={language}
              sequence={t.roles}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-primary font-code-sm"
            />
            <br />
            {t.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 font-label-caps text-label-caps">
            <a className="h-12 px-8 rounded-lg bg-gradient-to-r from-primary to-secondary text-surface-container-lowest flex items-center justify-center hover:opacity-90 transition-opacity" href="#contact">
              {t.contactMe}
            </a>
            <a className="hover-glow h-12 px-6 rounded-lg glass-panel flex items-center justify-center hover:bg-white/10 transition-colors gap-2 text-on-background hover:text-primary focus:text-primary dark:hover:text-primary" href="cv.pdf" download>
              <span className="material-symbols-outlined text-[20px]">download</span>
              {t.downloadCV}
            </a>
            <a className="hover-glow h-12 px-6 rounded-lg glass-panel flex items-center justify-center hover:bg-white/10 transition-colors gap-2 text-on-background hover:text-primary focus:text-primary dark:hover:text-primary" href="https://github.com/SAOT31" target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined text-[20px]">code</span>
              GitHub
            </a>
            <a className="hover-glow h-12 px-6 rounded-lg glass-panel flex items-center justify-center hover:bg-white/10 transition-colors gap-2 text-on-background hover:text-primary focus:text-primary dark:hover:text-primary" href="https://www.linkedin.com/in/sergio-alejandro-ospina-tabares-834913212/" target="_blank" rel="noreferrer">
              <span className="material-symbols-outlined text-[20px]">link</span>
              LinkedIn
            </a>
          </div>
        </div>
        <div className="hidden md:flex col-span-1 md:col-span-5 justify-end relative h-full min-h-[500px] fade-up" style={{ transitionDelay: '0.2s' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-[80px] z-0"></div>
          <div className="relative z-10 rounded-full p-[2px] w-[350px] h-[350px] mx-auto mt-12 flex flex-col justify-center items-center overflow-hidden group">
            <div className="absolute inset-[-50%] bg-[conic-gradient(transparent_270deg,theme(colors.primary)_360deg)] animate-[spin_3s_linear_infinite]"></div>
            <div className="w-full h-full rounded-full overflow-hidden bg-surface-container-lowest relative z-10 p-1 glass-panel">
                <img src="foto.jpg" alt="Profile" className="w-full h-full rounded-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
