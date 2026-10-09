import React from 'react';

export default function HeroHeader({ lang }) {
  const content = {
    ru: {
      badge: 'Мультиагентный ИИ · Gemini API',
      title: 'Автоматизированная генерация бизнес-стратегий',
      subtitle: 'Введите вашу проблему простым языком — мультиагентная система сформирует детальный план за 5 минут.',
    },
    en: {
      badge: 'Multi-Agent AI · Gemini API',
      title: 'Automated Business Strategy Generation',
      subtitle: 'Describe your business challenge in simple words — our multi-agent system will craft a comprehensive plan in 5 minutes.',
    },
  }[lang];

  return (
    <div className="pt-8 sm:pt-12 text-left">
      {/* Badge pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[13px] font-medium border border-slate-200/60 dark:border-slate-700/60 shadow-xs mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-slate-200" />
        <span>{content.badge}</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-[46px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.14]">
        {content.title}
      </h1>

      {/* Subtitle */}
      <p className="mt-4 text-slate-500 dark:text-slate-400 text-base sm:text-lg max-w-3xl leading-relaxed">
        {content.subtitle}
      </p>
    </div>
  );
}
