import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-markup'; // This handles XML/HTML highlighting
import 'prismjs/themes/prism-tomorrow.css';

const LINE_HEIGHT = '1.5rem';
const EDITOR_PADDING = 16;
const FONT_SIZE = 13;

const XMLEditor = ({ value, onChange, error }) => {
  const lineCount = value.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

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
      
      <div className="flex-1 overflow-hidden relative bg-white dark:bg-[#0a0a0a]">
        <div className="absolute inset-0 overflow-auto custom-scrollbar pt-0">
          <div className="flex min-h-full min-w-full">
            <div 
              className="sticky left-0 z-10 w-12 bg-slate-100 dark:bg-[#1a1a1a] text-slate-400 dark:text-slate-600 text-right pr-3 select-none border-r border-slate-200 dark:border-white/5 h-auto self-stretch"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: FONT_SIZE,
                lineHeight: LINE_HEIGHT,
                paddingTop: EDITOR_PADDING,
              }}
            >
              {lineNumbers.map(n => (
                <div key={n} style={{ height: LINE_HEIGHT }}>{n}</div>
              ))}
            </div>
            
            <div className="flex-1 min-w-0">
              <Editor
                value={value}
                onValueChange={onChange}
                highlight={code => highlight(code, languages.markup)}
                padding={EDITOR_PADDING}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: FONT_SIZE,
                  minHeight: '100%',
                  backgroundColor: 'transparent',
                  outline: 'none',
                  lineHeight: LINE_HEIGHT,
                }}
                className="prism-editor dark:text-slate-300 text-slate-700"
                textareaClassName="outline-none focus:outline-none"
                preClassName="m-0"
              />
            </div>
          </div>
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
