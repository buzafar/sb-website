import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, mode, onClose, lang }) {
  const [isLogin, setIsLogin] = useState(mode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    setIsLogin(mode === 'login');
    setSuccess(false);
  }, [mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      onClose();
      setSuccess(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#192231] text-white flex items-center justify-center font-bold text-xs">
              П
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {isLogin
                ? (lang === 'ru' ? 'Вход в ПФОР Consulting' : 'Sign in to PFOR')
                : (lang === 'ru' ? 'Регистрация аккаунта' : 'Create an Account')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {success ? (
            <div className="py-6 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto text-lg">
                ✓
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                {isLogin
                  ? (lang === 'ru' ? 'Успешный вход!' : 'Welcome back!')
                  : (lang === 'ru' ? 'Аккаунт успешно создан!' : 'Account created!')}
              </p>
            </div>
          ) : (
            <>
              {!isLogin && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'ru' ? 'Имя' : 'Full Name'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'ru' ? 'Алексей Смирнов' : 'Alex Smirnov'}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="founder@company.com"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ru' ? 'Пароль' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 rounded-xl font-medium text-xs bg-[#192231] hover:bg-[#253247] text-white flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <span>{isLogin ? (lang === 'ru' ? 'Войти' : 'Sign in') : (lang === 'ru' ? 'Зарегистрироваться' : 'Create account')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  {isLogin
                    ? (lang === 'ru' ? 'Нет аккаунта? Зарегистрироваться' : "Don't have an account? Sign up")
                    : (lang === 'ru' ? 'Уже есть аккаунт? Войти' : 'Already have an account? Sign in')}
                </button>
              </div>
            </>
          )}
        </form>

      </div>
    </div>
  );
}
