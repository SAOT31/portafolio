import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language].skills;

  return (
    <section className="py-section-gap-mobile md:py-section-gap max-w-container-max mx-auto px-gutter relative z-10" id="skills">
      <div className="text-center mb-16 fade-up">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-4">{t.title}</h2>
      </div>
      <div className="flex flex-col items-center fade-up gap-12">
        
        {/* Hard Skills Section */}
        <div className="w-full max-w-4xl text-left mb-4">
            <h3 className="font-headline-md text-headline-md text-on-background">{t.hardSkills}</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">data_object</span>
            <span className="font-body-md text-body-md font-medium">{t.items.python}</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">html</span>
            <span className="font-body-md text-body-md font-medium">{t.items.htmlCss}</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">javascript</span>
            <span className="font-body-md text-body-md font-medium">{t.items.javascript}</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">terminal</span>
            <span className="font-body-md text-body-md font-medium">{t.items.csharp}</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">database</span>
            <span className="font-body-md text-body-md font-medium">{t.items.databases}</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">account_tree</span>
            <span className="font-body-md text-body-md font-medium">{t.items.git}</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">code</span>
            <span className="font-body-md text-body-md font-medium">{t.items.vscode}</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">language</span>
            <span className="font-body-md text-body-md font-medium">{t.items.english}</span>
          </div>
        </div>

        {/* Soft Skills Section */}
        <div className="w-full max-w-4xl text-left space-y-4">
          <div className="mb-4">
            <h3 className="font-headline-md text-headline-md text-on-background">{t.softSkills}</h3>
          </div>
          <div className="glass-panel rounded-xl p-6">
             <p className="font-body-lg text-body-lg text-on-surface-variant">{t.soft1}</p>
          </div>
          <div className="glass-panel rounded-xl p-6">
             <p className="font-body-lg text-body-lg text-on-surface-variant">{t.soft2}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
