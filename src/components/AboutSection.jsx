import React, { useState, useRef, useEffect } from 'react';
import { User, Terminal as TerminalIcon, Sparkles, Download, CheckCircle2, CornerDownLeft, Play } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playSound } from '../utils/soundFx';

export const AboutSection = ({ isDark, lang, soundEnabled }) => {
  const { personal, aboutTabs } = portfolioData;
  const tabs = lang === 'ar' ? aboutTabs.ar : aboutTabs.en;
  const [activeTab, setActiveTab] = useState('story');

  // Terminal State
  const [termInput, setTermInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [userCmds, setUserCmds] = useState([]);
  const [matrixMode, setMatrixMode] = useState(false);
  const [termHistory, setTermHistory] = useState([
    { type: 'system', text: 'Welcome to Raed Al-Hallaq CLI v2.5. Type "help" for commands or "matrix" for cyber mode.' }
  ]);

  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [termHistory, matrixMode]);

  const handleTermSubmit = (e) => {
    e.preventDefault();
    const cmd = termInput.trim().toLowerCase();
    if (!cmd) return;

    playSound('click', soundEnabled);

    setUserCmds((prev) => [...prev, termInput]);
    setHistoryIndex(-1);

    const newHistory = [...termHistory, { type: 'user', text: `raed@portfolio:~$ ${termInput}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'system',
          text: 'Available commands:\n  - whoami    : Learn about Raed\n  - skills    : Tech stack summary\n  - projects  : Recent projects\n  - contact   : Get contact details\n  - socials   : Social media links\n  - matrix    : Toggle cyberpunk matrix stream\n  - quote     : Engineering mindset quote\n  - clear     : Clear terminal history'
        });
        break;
      case 'whoami':
        newHistory.push({
          type: 'system',
          text: `${personal.nameEn} - ${personal.titleEn}. Graduate in Computer Science (2025). 3+ years building full stack web platforms.`
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'system',
          text: 'Primary Stack: React, Vite, Node.js, Express, PHP, Laravel, MySQL, MongoDB, Tailwind CSS, Python.'
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'system',
          text: 'Recent Projects:\n  1. E-Commerce Platform (React, Node, Mongo)\n  2. AI Learning Platform (React, Laravel, Python)\n  3. Cyber Arcade Game (Python Pygame)'
        });
        break;
      case 'contact':
        newHistory.push({
          type: 'system',
          text: `Email: ${personal.email}\nPhone: ${personal.phone}\nLocation: ${personal.locationEn}`
        });
        break;
      case 'socials':
        newHistory.push({
          type: 'system',
          text: `GitHub   : ${personal.socials.github}\nLinkedIn : ${personal.socials.linkedin}\nWhatsApp : ${personal.socials.whatsapp}`
        });
        break;
      case 'matrix':
        setMatrixMode(!matrixMode);
        newHistory.push({
          type: 'system',
          text: matrixMode ? 'Exited Cyber Matrix Mode.' : 'Cyber Matrix Rain Mode Initiated! Type "matrix" to toggle.'
        });
        break;
      case 'quote':
        newHistory.push({
          type: 'system',
          text: '"Simplicity is prerequisite for reliability." - Edsger W. Dijkstra'
        });
        break;
      case 'clear':
        setTermHistory([]);
        setTermInput('');
        return;
      default:
        newHistory.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" for a list of commands.`
        });
        break;
    }

    setTermHistory(newHistory);
    setTermInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (userCmds.length > 0) {
        const nextIndex = historyIndex + 1 < userCmds.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setTermInput(userCmds[userCmds.length - 1 - nextIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setTermInput(userCmds[userCmds.length - 1 - nextIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setTermInput('');
      }
    }
  };

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
            <User className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'من أنا' : 'About Me'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {lang === 'ar' ? (
              <>
                شغف بتطوير الويب <span className="gradient-text-primary">وحول الرؤية إلى واقع</span>
              </>
            ) : (
              <>
                Crafting Digital Solutions <span className="gradient-text-primary">With Passion & Precision</span>
              </>
            )}
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {lang === 'ar'
              ? 'أنا مطور ويب متكامل أجمع بين الفكر الهندسي الخلاق والتصميم السلس لتقديم تجارب مستخدم استثنائية.'
              : 'Full Stack Engineer bridging technical architecture with user-centered digital experiences.'}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Bio Cards with Tabs */}
          <div className="lg:col-span-6 space-y-6">
            {/* Tab Navigation */}
            <div className="flex p-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    playSound('click', soundEnabled);
                    setActiveTab(tab.id);
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content Box */}
            <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 ${
              isDark ? 'glass-card border-white/10' : 'bg-white border-slate-200 shadow-md'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xl font-bold">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h3>
              </div>
              <p className={`text-base leading-relaxed mb-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {tabs.find((t) => t.id === activeTab)?.content}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-white/10">
                {[
                  lang === 'ar' ? 'هندسة الويب المتكاملة' : 'Full Stack Architecture',
                  lang === 'ar' ? 'كود نظيف وقابل للتوسع' : 'Clean & Scalable Code',
                  lang === 'ar' ? 'أداء وسرعة عالية' : 'High Performance & Speed',
                  lang === 'ar' ? 'تصاميم متجاوبة 100%' : '100% Responsive Design'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="flex items-center gap-4">
              <a
                href={personal.resumeLink}
                download="Raed_AlHallaq_Resume.pdf"
                onClick={() => playSound('click', soundEnabled)}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/25"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تحميل السيرة الذاتية (PDF)' : 'Download Full CV'}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive CLI Terminal */}
          <div className="lg:col-span-6">
            <div className={`rounded-3xl overflow-hidden border transition-all ${
              matrixMode
                ? 'border-emerald-500/60 shadow-glow-emerald bg-[#021207]'
                : 'border-white/10 bg-[#0c101d] terminal-window'
            }`}>
              {/* Header Bar */}
              <div className={`px-4 py-3 border-b flex items-center justify-between ${
                matrixMode ? 'bg-[#04240e] border-emerald-500/30' : 'bg-[#13192b] border-white/10'
              }`}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className={`text-xs font-mono ml-2 ${matrixMode ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                    raed@portfolio:~ {matrixMode ? '(CYBER MATRIX)' : '(bash)'}
                  </span>
                </div>
                <TerminalIcon className={`w-4 h-4 ${matrixMode ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
              </div>

              {/* Terminal Logs Viewport */}
              <div className={`p-4 sm:p-6 h-72 overflow-y-auto font-mono text-xs sm:text-sm space-y-3 ${
                matrixMode ? 'text-emerald-400 font-bold' : ''
              }`}>
                {termHistory.map((item, idx) => (
                  <div key={idx} className="leading-relaxed">
                    {item.type === 'user' ? (
                      <span className={matrixMode ? 'text-emerald-300' : 'text-cyan-400 font-semibold'}>{item.text}</span>
                    ) : item.type === 'error' ? (
                      <span className="text-rose-400">{item.text}</span>
                    ) : (
                      <pre className={`whitespace-pre-wrap font-mono ${matrixMode ? 'text-emerald-400' : 'text-slate-300'}`}>{item.text}</pre>
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Input Form */}
              <form onSubmit={handleTermSubmit} className={`p-3 border-t flex items-center gap-2 ${
                matrixMode ? 'bg-[#010903] border-emerald-500/30' : 'bg-[#080b14] border-white/10'
              }`}>
                <span className={`font-mono text-xs font-bold ${matrixMode ? 'text-emerald-400' : 'text-emerald-400'}`}>$</span>
                <input
                  type="text"
                  value={termInput}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setTermInput(e.target.value)}
                  placeholder='Type "help", "whoami", "skills", "projects", "matrix", or "clear"...'
                  className={`flex-1 bg-transparent text-xs sm:text-sm font-mono focus:outline-none placeholder-slate-600 ${
                    matrixMode ? 'text-emerald-300' : 'text-slate-200'
                  }`}
                />
                <button type="submit" className={`p-1.5 rounded-lg text-white transition-colors ${
                  matrixMode ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-500'
                }`}>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
