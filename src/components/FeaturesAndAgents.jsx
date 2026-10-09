import React from 'react';

export default function FeaturesAndAgents({ lang, activeAgent }) {
  const content = {
    ru: {
      features: [
        {
          id: 'Director',
          icon: '🎯',
          title: 'Стратегический анализ',
          desc: 'Agent Director формулирует цели и задаёт концепцию решения на основе вашей задачи.',
          bgColor: 'bg-red-50 dark:bg-red-950/30 text-red-600',
        },
        {
          id: 'Marketer',
          icon: '📈',
          title: 'GTM и маркетинг',
          desc: 'Agent Marketer строит воронку, определяет каналы и формирует позиционирование.',
          bgColor: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600',
        },
        {
          id: 'Financier',
          icon: '💡',
          title: 'Финансовое моделирование',
          desc: 'Agent Financier считает юнит-экономику, бюджет и сценарии роста.',
          bgColor: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600',
        },
      ],
      agentsTitle: 'АГЕНТЫ',
      agents: [
        { id: 'Director', name: 'Director', desc: 'предлагает' },
        { id: 'Marketer', name: 'Marketer', desc: 'оценивает рынок' },
        { id: 'Financier', name: 'Financier', desc: 'анализирует модель' },
        { id: 'Editor', name: 'Editor', desc: 'сводит в итог' },
      ],
    },
    en: {
      features: [
        {
          id: 'Director',
          icon: '🎯',
          title: 'Strategic Analysis',
          desc: 'Agent Director defines key goals and formulates the core concept based on your challenge.',
          bgColor: 'bg-red-50 dark:bg-red-950/30 text-red-600',
        },
        {
          id: 'Marketer',
          icon: '📈',
          title: 'GTM & Marketing',
          desc: 'Agent Marketer maps the sales funnel, identifies acquisition channels, and shapes positioning.',
          bgColor: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600',
        },
        {
          id: 'Financier',
          icon: '💡',
          title: 'Financial Modeling',
          desc: 'Agent Financier calculates unit economics, budget runway, and growth scenarios.',
          bgColor: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600',
        },
      ],
      agentsTitle: 'AGENTS',
      agents: [
        { id: 'Director', name: 'Director', desc: 'strategic lead' },
        { id: 'Marketer', name: 'Marketer', desc: 'evaluates market & GTM' },
        { id: 'Financier', name: 'Financier', desc: 'financial modeling' },
        { id: 'Editor', name: 'Editor', desc: 'executive synthesis' },
      ],
    },
  }[lang];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-10">
      
      {/* Left Column: 3 Key Competencies */}
      <div className="lg:col-span-7 space-y-7">
        {content.features.map((item) => (
          <div key={item.id} className="flex items-start gap-4 group">
            {/* Soft Icon Badge */}
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 ${item.bgColor} border border-black/5 dark:border-white/5 transition-transform group-hover:scale-105`}>
              <span>{item.icon}</span>
            </div>
            
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-[16px] sm:text-[17px] leading-snug">
                {item.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right Column: Agents Card */}
      <div className="lg:col-span-5">
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 shadow-xs backdrop-blur-sm">
          
          <div className="text-[11px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mb-4">
            {content.agentsTitle}
          </div>

          <div className="space-y-4">
            {content.agents.map((agent) => {
              const isActive = activeAgent === agent.id;
              return (
                <div
                  key={agent.id}
                  className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                    isActive
                      ? 'bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-2 h-2 rounded-full transition-all ${
                        isActive
                          ? 'bg-blue-600 dark:bg-blue-400 ring-4 ring-blue-100 dark:ring-blue-900/50 animate-pulse'
                          : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                    <span className="font-semibold text-slate-900 dark:text-white text-sm">
                      {agent.name}
                    </span>
                  </div>

                  <span className={`text-xs ${isActive ? 'text-blue-600 dark:text-blue-400 font-medium' : 'text-slate-400 dark:text-slate-500'}`}>
                    {isActive ? (lang === 'ru' ? 'генерирует...' : 'thinking...') : agent.desc}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
}
