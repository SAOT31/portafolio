export const Skills = () => {
  return (
    <section className="py-section-gap-mobile md:py-section-gap max-w-container-max mx-auto px-gutter relative z-10" id="skills">
      <div className="text-center mb-16 fade-up">
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background mb-4">Skills</h2>
      </div>
      <div className="flex flex-col items-center fade-up gap-12">
        
        {/* Hard Skills Section */}
        <div className="w-full max-w-4xl text-left mb-4">
            <h3 className="font-headline-md text-headline-md text-on-background">Hard Skills</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">data_object</span>
            <span className="font-body-md text-body-md font-medium">Python</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">html</span>
            <span className="font-body-md text-body-md font-medium">HTML &amp; CSS</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">javascript</span>
            <span className="font-body-md text-body-md font-medium">JavaScript</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">terminal</span>
            <span className="font-body-md text-body-md font-medium">C# .NET</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">database</span>
            <span className="font-body-md text-body-md font-medium">Databases</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">account_tree</span>
            <span className="font-body-md text-body-md font-medium">Git / GitHub</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">code</span>
            <span className="font-body-md text-body-md font-medium">VS Code</span>
          </div>
          <div className="glass-panel skill-card-hover rounded-xl p-6 flex flex-col items-center justify-center gap-4 text-center cursor-default">
            <span className="material-symbols-outlined text-3xl text-primary transition-colors">language</span>
            <span className="font-body-md text-body-md font-medium">English</span>
          </div>
        </div>

        {/* Soft Skills Section */}
        <div className="w-full max-w-4xl text-left space-y-4">
          <div className="mb-4">
            <h3 className="font-headline-md text-headline-md text-on-background">Soft Skills</h3>
          </div>
          <div className="glass-panel rounded-xl p-6">
             <p className="font-body-lg text-body-lg text-on-surface-variant">I consider myself a <strong className="text-primary">proactive and goal-oriented person</strong>, with a high sense of responsibility and seriousness. I am analytical by nature; I acquire and share knowledge easily, always looking to provide innovative solutions.</p>
          </div>
          <div className="glass-panel rounded-xl p-6">
             <p className="font-body-lg text-body-lg text-on-surface-variant">I adapt easily to teamwork environments, contributing to the <strong className="text-primary">optimization of processes</strong>. I have the ability to plan and prioritize tasks, maintaining a <strong className="text-primary">positive attitude</strong> and willingness to learn.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
