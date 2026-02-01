import React from 'react';
import { Search, Play, Trash2, Copy } from 'lucide-react';

const XPathInput = ({ value, onChange, onEvaluate, onClear, onCopy }) => {
  return (
    <div className="w-full flex flex-col gap-4 animate-fade-in">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-brand-500 transition-colors" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onEvaluate()}
          placeholder="Enter XPath expression (e.g., //book/title)"
          className="block w-full pl-12 pr-32 py-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500/50 transition-all code-font shadow-sm"
        />
        <div className="absolute inset-y-0 right-0 p-2 flex gap-2">
          <button
            onClick={() => onCopy(value)}
            title="Copy Expression"
            className="p-2 text-slate-400 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-400/10 rounded-xl transition-all"
          >
            <Copy size={20} />
          </button>
          <button
            onClick={onClear}
            title="Clear"
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-400/10 rounded-xl transition-all"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={onEvaluate}
            className="flex items-center gap-2 px-6 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-brand-500/20 active:scale-95"
          >
            <Play size={16} fill="white" />
            <span>Evaluate</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default XPathInput;
