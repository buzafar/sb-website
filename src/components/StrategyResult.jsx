import React, { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { Copy, Check, Download, RotateCcw, Sparkles } from 'lucide-react';

export default function StrategyResult({
  result,
  onReset,
  lang,
}) {
  const [copied, setCopied] = useState(false);
  const resultRef = useRef(null);

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  if (!result) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([result.text], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `b2b-strategy-${new Date().toISOString().slice(0, 10)}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Convert markdown to sanitized HTML
  const htmlContent = marked.parse(result.text, {
    breaks: true,
    gfm: true,
  });

  return (
    <div
      ref={resultRef}
      className="mt-10 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md overflow-hidden transition-all animate-in fade-in slide-in-from-bottom-6 duration-500"
    >
      {/* Result Card Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
            {lang === 'ru' ? 'Результат генерации стратегии' : 'Strategy Output'}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400">
                  {lang === 'ru' ? 'Скопировано!' : 'Copied!'}
                </span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{lang === 'ru' ? 'Копировать' : 'Copy'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
            title={lang === 'ru' ? 'Скачать .md файл' : 'Download .md file'}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'ru' ? 'Скачать MD' : 'Export MD'}</span>
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors"
            title={lang === 'ru' ? 'Новая стратегия' : 'New strategy'}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{lang === 'ru' ? 'Сбросить' : 'Reset'}</span>
          </button>
        </div>
      </div>

      {/* Rendered Strategy Body */}
      <div className="p-6 sm:p-10 prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-4">
        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
          className="[&>h1]:text-2xl [&>h1]:font-extrabold [&>h1]:text-slate-900 [&>h1]:dark:text-white [&>h1]:mb-6
                     [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-slate-900 [&>h3]:dark:text-white [&>h3]:mt-6 [&>h3]:mb-3
                     [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>li]:text-slate-700 [&>li]:dark:text-slate-300
                     [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:bg-blue-50/50 [&>blockquote]:dark:bg-blue-950/20 [&>blockquote]:p-3.5 [&>blockquote]:rounded-r-lg [&>blockquote]:italic
                     [&>hr]:border-slate-200 [&>hr]:dark:border-slate-800 [&>hr]:my-6
                     [&>table]:w-full [&>table]:border-collapse [&>table]:my-4
                     [&>table_th]:border [&>table_th]:border-slate-200 [&>table_th]:dark:border-slate-700 [&>table_th]:bg-slate-100 [&>table_th]:dark:bg-slate-800 [&>table_th]:p-2.5 [&>table_th]:text-left [&>table_th]:font-semibold
                     [&>table_td]:border [&>table_td]:border-slate-200 [&>table_td]:dark:border-slate-800 [&>table_td]:p-2.5"
        />
      </div>

    </div>
  );
}
