import React from 'react';

export default function FooterSection({ lang, onOpenDocs, onOpenSettings }) {
  const content = {
    ru: {
      columns: [
        {
          icon: '🎯',
          title: 'Стратегический анализ',
          desc: 'Agent Director формулирует цели и задаёт концепцию решения на основе вашей задачи.',
          bgColor: 'bg-red-50 dark:bg-red-950/30 text-red-600',
        },
        {
          icon: '📊',
          title: 'GTM и маркетинг',
          desc: 'Agent Marketer строит воронки, определяет каналы и позиционирование.',
          bgColor: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600',
        },
        {
          icon: '💡',
          title: 'Финансовое моделирование',
          desc: 'Agent Financier считает юнит-экономику, бюджет и сценарии роста.',
          bgColor: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600',
        },
      ],
      copyright: '© 2025 ПФОР · Powered by Google Gemini ·',
      apiDocs: 'API Docs',
    },
    en: {
      columns: [
        {
          icon: '🎯',
          title: 'Strategic Analysis',
          desc: 'Agent Director formulates goals and sets the solution framework based on your request.',
          bgColor: 'bg-red-50 dark:bg-red-950/30 text-red-600',
        },
        {
          icon: '📊',
          title: 'GTM & Marketing',
          desc: 'Agent Marketer builds funnels, defines channels, and establishes positioning.',
          bgColor: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600',
        },
        {
          icon: '💡',
          title: 'Financial Modeling',
          desc: 'Agent Financier calculates unit economics, budget runway, and growth scenarios.',
          bgColor: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600',
        },
      ],
      copyright: '© 2025 PFOR · Powered by Google Gemini ·',
      apiDocs: 'API Docs',
    },
  }[lang];

  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-slate-800/80 pt-14 pb-12 transition-colors">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6">
        
        {/* 3 Columns Features from Screenshot 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {content.columns.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg ${col.bgColor} border border-black/5 dark:border-white/5`}>
                <span>{col.icon}</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">
                {col.title}
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                {col.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom copyright line matching screenshot 2 */}
        <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 text-center">
          <span>{content.copyright}</span>
          <a
            href="https://ai.google.dev/gemini-api/docs"
            target="_blank"
            rel="noreferrer"
            className="hover:text-slate-600 dark:hover:text-slate-300 underline underline-offset-4 decoration-slate-300 transition-colors"
          >
            {content.apiDocs}
          </a>
        </div>

      </div>
    </footer>
  );
}
