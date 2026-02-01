import React, { useState, useEffect, useCallback } from 'react';
import Layout from './components/Layout';
import XMLEditor from './components/XMLEditor';
import XPathInput from './components/XPathInput';
import ResultViewer from './components/ResultViewer';
import { evaluateXPath } from './utils/xpathEvaluator';
import { BookOpen, Sparkles } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import 'prismjs/themes/prism-tomorrow.css';
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="bk101">
    <author>Gambardella, Matthew</author>
    <title>XML Developer's Guide</title>
    <genre>Computer</genre>
    <price>44.95</price>
    <publish_date>2000-10-01</publish_date>
    <description>An in-depth look at creating applications with XML.</description>
  </book>
  <book id="bk102">
    <author>Ralls, Kim</author>
    <title>Midnight Rain</title>
    <genre>Fantasy</genre>
    <price>5.95</price>
    <publish_date>2000-12-16</publish_date>
    <description>A former architect battles corporate zombies.</description>
  </book>
  <book id="bk103">
    <author>Corets, Eva</author>
    <title>Maeve Ascendant</title>
    <genre>Fantasy</genre>
    <price>5.95</price>
    <publish_date>2000-11-17</publish_date>
    <description>After the collapse of a nanotechnology society, the young survivors lay the foundation for a new society.</description>
  </book>
</catalog>`;

const SAMPLE_XPATH = "//book[price > 10]/title";

function App() {
  const [xmlContent, setXmlContent] = useState(SAMPLE_XML);
  const [xpathQuery, setXpathQuery] = useState(SAMPLE_XPATH);
  const [results, setResults] = useState([]);
  const [xmlError, setXmlError] = useState(null);
  const [xpathError, setXpathError] = useState(null);
  const [isDark, setIsDark] = useState(true);

  // Sync theme to body class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleEvaluate = useCallback(() => {
    setXpathError(null);
    try {
      const result = evaluateXPath(xmlContent, xpathQuery);
      setResults(result);
    } catch (err) {
      setXpathError(err.message);
      setResults([]);
    }
  }, [xmlContent, xpathQuery]);

  // Synchronous XML validation
  useEffect(() => {
    if (!xmlContent.trim()) {
      setXmlError(null);
      return;
    }
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "application/xml");
    const parseError = xmlDoc.getElementsByTagName("parsererror");
    if (parseError.length > 0) {
      setXmlError(parseError[0].textContent);
    } else {
      setXmlError(null);
    }
  }, [xmlContent]);

  // Initial evaluation
  useEffect(() => {
    handleEvaluate();
  }, []);

  const loadSample = () => {
    setXmlContent(SAMPLE_XML);
    setXpathQuery(SAMPLE_XPATH);
    setTimeout(handleEvaluate, 100);
  };

  const handleClear = () => {
    setXmlContent('');
    setXpathQuery('');
    setResults([]);
    setXmlError(null);
    setXpathError(null);
  };

  const toggleDark = () => setIsDark(!isDark);

  return (
    <Layout isDark={isDark} onToggleDark={toggleDark}>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: isDark ? '#1e293b' : '#fff',
          color: isDark ? '#f1f5f9' : '#1e293b',
          border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
        }
      }} />
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/10 transition-all">
          <div className="flex gap-4">
            <button
              onClick={loadSample}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm transition-all border border-slate-200 dark:border-white/5 shadow-sm"
            >
              <BookOpen size={16} />
              <span>Load Sample</span>
            </button>
            <button
              onClick={() => {
                setXpathQuery('//book[genre="Fantasy"]/title');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm transition-all border border-slate-200 dark:border-white/5 shadow-sm"
            >
              <Sparkles size={16} />
              <span>Try: Fantasy Books</span>
            </button>
          </div>
        </div>

        <XPathInput
          value={xpathQuery}
          onChange={setXpathQuery}
          onEvaluate={handleEvaluate}
          onClear={handleClear}
          onCopy={(text) => {
            navigator.clipboard.writeText(text);
            toast.success('Expression copied!', {
              style: {
                borderRadius: '12px',
                background: isDark ? '#1e293b' : '#fff',
                color: isDark ? '#f1f5f9' : '#1e293b',
              },
            });
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          <XMLEditor 
            value={xmlContent} 
            onChange={setXmlContent} 
            error={xmlError} 
          />
          <ResultViewer 
            results={results} 
            error={xpathError} 
          />
        </div>
      </div>
    </Layout>
  );
}

export default App;
