import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language].experience;

  return (
    <section className="py-section-gap-mobile md:py-section-gap max-w-container-max mx-auto px-gutter relative z-10" id="experience">
      <div className="ambient-glow bg-secondary w-[400px] h-[400px] top-[20%] left-[-150px]"></div>
      <div className="mb-16 fade-up">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-4">{t.title}</h2>
      </div>
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2"></div>
        {t.items.map((item, index) => (
          <div key={index} className="relative flex flex-col md:flex-row justify-end md:justify-between items-start md:items-center w-full mb-12 pl-12 md:pl-0 fade-up">
            <div className="hidden md:block w-[45%] text-right pr-8">
              <span className="font-code-sm text-code-sm text-primary">{item.period}</span>
            </div>
            <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full glass-panel flex items-center justify-center -translate-x-1/2 z-10 bg-surface-container-lowest">
              <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_10px_theme('colors.primary')]"></div>
            </div>
            <div className="w-full md:w-[45%] pl-0 md:pl-8">
              <span className="md:hidden font-code-sm text-code-sm text-primary block mb-2">{item.period}</span>
              <div className="glass-panel glass-panel-hover rounded-xl p-6">
                <h3 className="font-headline-md text-headline-md text-on-background mb-1">{item.role}</h3>
                <h4 className="font-body-md text-body-md text-on-surface-variant mb-1">{item.company}</h4>
                {item.location && <h5 className="font-code-sm text-xs text-on-surface-variant opacity-70 mb-4">{item.location}</h5>}
                <p className="font-body-md text-body-md text-on-surface-variant opacity-80 text-sm mt-4">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
