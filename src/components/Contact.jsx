import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations';

export const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('saot-31@hotmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-section-gap-mobile md:py-section-gap max-w-container-max mx-auto px-gutter relative z-10" id="contact">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 fade-up">
        <div>
          <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-4">{t.title}</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md">{t.subtitle}</p>
          <div className="space-y-4">
            <button 
              onClick={handleCopyEmail}
              className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors group text-left"
              title={t.email}
            >
              <span className="material-symbols-outlined text-primary">mail</span>
              <span className="font-code-sm text-code-sm flex items-center gap-2">
                {copied ? <span className="text-primary font-bold">{t.copied}</span> : t.email}
                <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
                  {copied ? 'check' : 'content_copy'}
                </span>
              </span>
            </button>
            <a 
              href="https://wa.me/573148087498" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-on-surface-variant hover:text-[#25D366] transition-colors w-fit group"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary group-hover:text-[#25D366] transition-colors" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span className="font-code-sm text-code-sm">{t.whatsapp}</span>
            </a>
            <div className="flex items-center gap-4 text-on-surface-variant">
              <span className="material-symbols-outlined text-primary">location_on</span>
              <span className="font-code-sm text-code-sm">{t.location}</span>
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-8">
          <form className="flex flex-col gap-6" action="https://formsubmit.co/saot-31@hotmail.com" method="POST">
            <input type="hidden" name="_subject" value="Nuevo mensaje desde tu Portafolio" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="https://saot31.github.io/portafolio/" />
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">{t.form.name}</label>
              <input name="name" required className="w-full bg-white border border-gray-300 rounded-lg p-3 font-body-md text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder={t.form.namePlaceholder} type="text" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">{t.form.email}</label>
              <input name="email" required className="w-full bg-white border border-gray-300 rounded-lg p-3 font-body-md text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder={t.form.emailPlaceholder} type="email" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant">{t.form.message}</label>
              <textarea name="message" required className="w-full bg-white border border-gray-300 rounded-lg p-3 font-body-md text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" placeholder={t.form.messagePlaceholder} rows="4"></textarea>
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
