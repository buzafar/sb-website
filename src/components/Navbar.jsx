import React from 'react';
import { Moon, Sun } from 'lucide-react';

export default function Navbar({
  lang,
  setLang,
  darkMode,
  setDarkMode,
  onOpenAuth,
}) {
  return (
    <header className="w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-[#0b0f17]/80 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer select-none">
          <div className="w-8 h-8 rounded-lg bg-[#192231] dark:bg-slate-800 flex items-center justify-center text-white font-bold text-base shadow-sm">
            П
          </div>
          <span className="font-semibold text-slate-900 dark:text-white text-[15px] tracking-tight">
            ПФОР <span className="text-slate-400 font-normal">|</span> B2B AI Consulting
          </span>
        </div>

        {/* Right: Controls & Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Lang & Theme Pill */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 text-xs">
            <button
              onClick={() => setLang('ru')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                lang === 'ru'
                  ? 'bg-[#192231] text-white dark:bg-slate-700 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                lang === 'en'
                  ? 'bg-[#192231] text-white dark:bg-slate-700 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              EN
            </button>

            {/* Dark Mode toggle icon button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Light mode' : 'Dark mode'}
              className="p-1 px-1.5 text-amber-500 hover:text-amber-600 transition-colors ml-0.5"
            >
              {darkMode ? (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              )}
            </button>
          </div>

          {/* Войти (Log in) */}
          <button
            onClick={() => onOpenAuth('login')}
            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white px-2 py-1 transition-colors"
          >
            {lang === 'ru' ? 'Войти' : 'Log in'}
          </button>

          {/* Регистрация (Sign up) */}
          <button
            onClick={() => onOpenAuth('register')}
            className="text-sm font-medium bg-[#192231] hover:bg-[#253247] text-white px-4 py-2 rounded-xl transition-all shadow-xs active:scale-[0.98]"
          >
            {lang === 'ru' ? 'Регистрация' : 'Sign up'}
          </button>
        </div>

      </div>
    </header>
  );
}
