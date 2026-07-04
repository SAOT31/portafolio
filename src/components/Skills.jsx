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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          {t.techCategories.map((category, idx) => (
            <div key={idx} className={`glass-panel rounded-xl p-6 flex flex-col gap-4 ${idx === 4 ? 'md:col-span-2' : ''}`}>
              <div className="flex items-center gap-3 mb-2 border-b border-white/10 pb-3">
                <span className="material-symbols-outlined text-primary text-2xl">{category.icon}</span>
                <h4 className="font-headline-md text-headline-md text-on-background">{category.name}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="font-code-sm text-xs bg-surface/50 border border-white/5 rounded-full px-3 py-1 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
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
