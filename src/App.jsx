import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroHeader from './components/HeroHeader';
import FeaturesAndAgents from './components/FeaturesAndAgents';
import StrategyInputCard from './components/StrategyInputCard';
import StrategyResult from './components/StrategyResult';
import FooterSection from './components/FooterSection';
import AuthModal from './components/AuthModal';
import { generateStrategy } from './services/geminiService';

export default function App() {
  const [lang, setLang] = useState('ru');
  const [darkMode, setDarkMode] = useState(false);

  // Generation state
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null);
  const [activeAgent, setActiveAgent] = useState(null);
  const [strategyResult, setStrategyResult] = useState(null);

  // Modals
  const [authModal, setAuthModal] = useState({ isOpen: false, mode: 'login' });

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // Default to light mode unless explicitly set to dark in localStorage
    const isDark = savedTheme === 'dark';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, []);

  // Update HTML & Body class when dark mode changes
  const toggleDarkMode = (val) => {
    setDarkMode(val);
    if (val) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleGenerate = async (problemText) => {
    setIsLoading(true);
    setStrategyResult(null);
    setCurrentStatus({
      step: 1,
      message: lang === 'ru' ? 'Инициализация агентов...' : 'Initializing agents...',
    });

    try {
      // Pass the current website language so Gemini answers in this exact language
      const response = await generateStrategy(problemText, lang, (status) => {
        setCurrentStatus(status);
        setActiveAgent(status.agent);
      });

      setStrategyResult(response);
    } catch (err) {
      console.error(err);
      alert(lang === 'ru' ? 'Произошла ошибка при генерации' : 'Error generating strategy');
    } finally {
      setIsLoading(false);
      setActiveAgent(null);
      setCurrentStatus(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] dark:bg-[#0b0f17] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Navbar matching screenshot top navigation */}
      <Navbar
        lang={lang}
        setLang={setLang}
        darkMode={darkMode}
        setDarkMode={toggleDarkMode}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1120px] w-full mx-auto px-4 sm:px-6">
        
        {/* Hero headline and badge */}
        <HeroHeader lang={lang} />

        {/* 2-Column: 3 Features & Agents Card */}
        <FeaturesAndAgents lang={lang} activeAgent={activeAgent} />

        {/* The Textarea Card for user business task */}
        <StrategyInputCard
          lang={lang}
          onSubmit={handleGenerate}
          isLoading={isLoading}
          currentStatus={currentStatus}
        />

        {/* Display generated Gemini strategy response */}
        {strategyResult && (
          <StrategyResult
            result={strategyResult}
            onReset={() => setStrategyResult(null)}
            lang={lang}
          />
        )}

      </main>

      {/* Footer matching screenshot 2 */}
      <FooterSection lang={lang} />

      {/* Auth Modal for Log In / Register */}
      <AuthModal
        isOpen={authModal.isOpen}
        mode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        lang={lang}
      />

    </div>
  );
}
