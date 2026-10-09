import React, { useState } from 'react';
import { Loader2, Sparkles, CornerDownLeft } from 'lucide-react';

export default function StrategyInputCard({
  lang,
  onSubmit,
  isLoading,
  currentStatus,
}) {
  const defaultPlaceholder = lang === 'ru'
    ? 'Например: Наш стартап делает B2B SaaS для автоматизации бухгалтерии малого бизнеса. Мы не можем масштабировать продажи — CAC слишком высок, конверсия из лида в клиента менее 5%. Как нам это исправить?'
    : 'Example: Our startup builds B2B SaaS for small business bookkeeping automation. We cannot scale sales — CAC is too high, and lead-to-customer conversion is under 5%. How can we fix this?';

  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!text.trim() || isLoading) return;
    onSubmit(text.trim());
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const fillExample = () => {
    setText(defaultPlaceholder.replace(/^Например:\s*|^Example:\s*/, ''));
  };

  return (
    <div className="mt-10 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs transition-all">
      <form onSubmit={handleSubmit}>
        
        {/* Card Header */}
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor="business-task"
            className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white"
          >
            {lang === 'ru' ? 'Ваша бизнес-задача' : 'Your Business Challenge'}
          </label>

          {/* Quick example insert button */}
          <button
            type="button"
            onClick={fillExample}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>{lang === 'ru' ? 'Вставить пример' : 'Insert example'}</span>
          </button>
        </div>

        {/* Textarea */}
        <div className="relative">
          <textarea
            id="business-task"
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={defaultPlaceholder}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-950 p-4 text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm sm:text-[15px] leading-relaxed focus:border-slate-400 dark:focus:border-slate-500 focus:outline-none focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-800/60 transition-all resize-y"
          />
        </div>

        {/* Footer controls: Character counter + Generate button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-1">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium select-none">
            <span>{text.length} {lang === 'ru' ? 'символов' : 'characters'}</span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400">
              <CornerDownLeft className="w-3 h-3" /> ⌘ + Enter
            </span>
          </div>

          <button
            type="submit"
            disabled={!text.trim() || isLoading}
            className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-medium text-sm transition-all shadow-xs ${
              !text.trim() || isLoading
                ? 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed'
                : 'bg-[#192231] hover:bg-[#253247] text-white active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>
                  {currentStatus?.message || (lang === 'ru' ? 'Генерация стратегии...' : 'Generating strategy...')}
                </span>
              </>
            ) : (
              <span>
                {lang === 'ru' ? 'Сформировать стратегию' : 'Generate strategy'}
              </span>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
