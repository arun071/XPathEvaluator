import React from 'react';
import { Database, Sun, Moon } from 'lucide-react';

const Layout = ({ children, isDark, onToggleDark }) => {
  return (
    <div className="min-h-screen flex flex-col pt-8 px-4 pb-12 gap-8 max-w-7xl mx-auto transition-colors duration-300 bg-white dark:bg-slate-950">
      <header className="flex flex-col items-center gap-4 text-center animate-fade-in relative">
        <div className="absolute top-0 right-0">
          <button
            onClick={onToggleDark}
            className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:scale-110 transition-all active:scale-95 shadow-lg"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        <div className="p-4 bg-brand-500/10 rounded-2xl border border-brand-500/20 shadow-2xl shadow-brand-500/10">
          <Database size={40} className="text-brand-400" />
        </div>
        <div className="space-y-1">
          <h1 className="text-4xl font-black bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
            XPATH EVALUATOR
          </h1>
          <p className="text-slate-500 font-medium">
            Analyze, query, and transform your XML with ease
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-8">
        {children}
      </main>

      <footer className="text-center text-slate-600 text-xs py-4">
        Built with React & Tailwind CSS • Functional XPath 1.0 Support
      </footer>
    </div>
  );
};

export default Layout;
