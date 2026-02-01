import React, { useEffect } from 'react';
import { Copy, Terminal, Info, AlertTriangle, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism-tomorrow.css';

const ResultViewer = ({ results, error }) => {
  const isArray = Array.isArray(results);
  const isEmpty = isArray && results.length === 0;
  
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!', {
      icon: <Check size={16} className="text-green-500" />,
      style: {
        borderRadius: '12px',
        fontSize: '14px',
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#111111] backdrop-blur-md rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl transition-all">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-slate-400 dark:text-slate-500" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Results</span>
        </div>
        {!isEmpty && !error && isArray && (
          <span className="text-[10px] bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold px-2 py-1 rounded border border-brand-500/30 uppercase">
            {results.length} Match{results.length !== 1 ? 'es' : ''}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-auto p-4 custom-scrollbar bg-white dark:bg-transparent">
        {error ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-4">
            <AlertTriangle size={48} className="text-amber-500/30" />
            <p className="max-w-xs text-center text-sm font-medium">{error}</p>
          </div>
        ) : isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 gap-4 opacity-50">
            <Info size={48} />
            <p className="text-sm font-medium">Ready for evaluation</p>
          </div>
        ) : !isArray ? (
          <div className="space-y-4 animate-fade-in">
            <div className="p-6 bg-slate-50 dark:bg-zinc-900/50 rounded-2xl border border-slate-200 dark:border-white/5 shadow-inner">
              <div className="text-[10px] uppercase text-slate-400 dark:text-slate-500 mb-3 font-bold tracking-[0.2em]">Returned Value</div>
              <div className="text-brand-600 dark:text-brand-400 code-font break-all text-2xl font-bold">{results.toString()}</div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((item, idx) => (
              <div key={idx} className="group relative bg-slate-50 dark:bg-zinc-900/20 border border-slate-200 dark:border-white/5 rounded-xl p-4 hover:border-brand-500/40 hover:shadow-xl hover:dark:bg-zinc-900/40 transition-all animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                <div className="flex justify-between items-start mb-3">
                  <div className="flex gap-2 items-center">
                    <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 font-bold tracking-wider">
                      {item.type}
                    </span>
                    <span className="text-brand-600 dark:text-brand-300 font-bold text-sm tracking-tight">{item.name}</span>
                  </div>
                  <button 
                    onClick={() => handleCopy(item.outerHTML)}
                    className="p-1.5 text-slate-400 hover:text-brand-600 dark:hover:text-white bg-slate-100 dark:bg-white/5 hover:bg-brand-50 dark:hover:bg-white/10 rounded-lg transition-all shadow-sm"
                    title="Copy to clipboard"
                  >
                    <Copy size={14} />
                  </button>
                </div>
                
                <div className="text-[10px] text-slate-400 dark:text-slate-500 mb-3 code-font truncate italic py-1 border-y border-slate-200/50 dark:border-white/5" title={item.path}>
                  {item.path}
                </div>
                
                <div className="max-h-60 overflow-auto custom-scrollbar rounded-lg border border-slate-200 dark:border-white/5 bg-white dark:bg-black/40">
                  <pre 
                    className="p-3 m-0 text-xs leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: highlight(item.outerHTML || '', languages.markup, 'markup') 
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultViewer;
