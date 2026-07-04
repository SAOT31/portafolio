import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;

  return (
    <section className="py-section-gap-mobile md:py-section-gap max-w-container-max mx-auto px-gutter relative z-10" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 fade-up">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-4">{t.title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md">{t.subtitle}</p>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-on-surface-variant">
              <span className="material-symbols-outlined text-primary">mail</span>
              <span className="font-code-sm text-code-sm">{t.email}</span>
            </div>
            <div className="flex items-center gap-4 text-on-surface-variant">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <span className="font-code-sm text-code-sm">{t.location}</span>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-8">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">{t.form.name}</label>
              <input className="bg-surface/50 border border-white/10 rounded-lg p-3 font-body-md text-on-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder={t.form.namePlaceholder} type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">{t.form.email}</label>
              <input className="bg-surface/50 border border-white/10 rounded-lg p-3 font-body-md text-on-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder={t.form.emailPlaceholder} type="email" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">{t.form.message}</label>
              <textarea className="bg-surface/50 border border-white/10 rounded-lg p-3 font-body-md text-on-background focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" placeholder={t.form.messagePlaceholder} rows="4"></textarea>
            </div>
            <button className="h-12 w-full rounded-lg bg-gradient-to-r from-primary to-secondary text-surface-container-lowest font-label-caps text-label-caps mt-2 hover:opacity-90 transition-opacity flex items-center justify-center gap-2" type="submit">
              {t.form.submit} <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
