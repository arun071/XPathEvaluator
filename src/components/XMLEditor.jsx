import React, { useRef, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup'; // This handles XML/HTML highlighting
import 'prismjs/themes/prism-tomorrow.css';

const XMLEditor = ({ value, onChange, error }) => {
  const containerRef = useRef(null);

  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  // Sync scroll between editor and line numbers
  const handleScroll = (e) => {
    const { scrollTop } = e.target;
    const lineNumberDiv = document.getElementById('line-numbers');
    if (lineNumberDiv) {
      lineNumberDiv.scrollTop = scrollTop;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-[#111111] backdrop-blur-md rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-2xl transition-all">
      <div className="flex items-center justify-between px-4 py-2 border-b border-slate-200 dark:border-white/10 bg-white/50 dark:bg-zinc-900/50">
        <div className="flex items-center gap-2">
           <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-amber-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
           </div>
           <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest ml-2">XML Editor</span>
        </div>
        {error ? (
          <span className="text-[10px] bg-red-500/10 text-red-600 dark:text-red-400 font-bold px-2 py-1 rounded border border-red-500/30 animate-pulse uppercase">
            Parsing Error
          </span>
        ) : (
          <span className="text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 font-bold px-2 py-1 rounded border border-green-500/30 uppercase">
            Ready
          </span>
        )}
      </div>
      
      <div className="flex flex-1 overflow-hidden relative">
        <div 
          id="line-numbers"
          className="w-12 bg-slate-100 dark:bg-black/20 text-slate-400 dark:text-slate-600 text-right pr-3 pt-4 code-font text-xs select-none overflow-hidden border-r border-slate-200 dark:border-white/5"
        >
          {lineNumbers.map(n => (
            <div key={n} className="h-6 leading-6">{n}</div>
          ))}
        </div>
        
        <div className="flex-1 relative overflow-auto custom-scrollbar pt-1 bg-white dark:bg-transparent" onScroll={handleScroll}>
          <Editor
            value={value}
            onValueChange={onChange}
            highlight={code => highlight(code, languages.markup)}
            padding={16}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 13,
              minHeight: '100%',
              backgroundColor: 'transparent',
              outline: 'none',
              lineHeight: '1.5rem',
            }}
            className="prism-editor dark:text-slate-300 text-slate-700"
            textareaClassName="outline-none focus:outline-none"
            preClassName="m-0"
          />
        </div>
      </div>
      
      {error && (
        <div className="mx-4 mb-4 mt-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-[11px] p-3 rounded-lg border border-red-200 dark:border-red-500/30 shadow-sm z-10 break-words font-medium animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
};

export default XMLEditor;
