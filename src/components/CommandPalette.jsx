import React, { useState, useEffect } from 'react';
import { Search, Command, Sun, Moon, Languages, Volume2, VolumeX, Download, Mail, Phone, ArrowRight, X, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playSound } from '../utils/soundFx';

export const CommandPalette = ({
  isOpen,
  onClose,
  isDark,
  setIsDark,
  lang,
  setLang,
  soundEnabled,
  setSoundEnabled,
  onCopyEmail
}) => {
  const { personal } = portfolioData;
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = [
    {
      id: 'nav-home',
      titleEn: 'Go to Home',
      titleAr: 'الذهاب إلى الرئيسية',
      categoryEn: 'Navigation',
      categoryAr: 'التنقل',
      icon: Sparkles,
      perform: () => { window.location.hash = '#home'; }
    },
    {
      id: 'nav-about',
      titleEn: 'Go to About Me',
      titleAr: 'الذهاب إلى عني',
      categoryEn: 'Navigation',
      categoryAr: 'التنقل',
      icon: Sparkles,
      perform: () => { window.location.hash = '#about'; }
    },
    {
      id: 'nav-skills',
      titleEn: 'Go to Skills',
      titleAr: 'الذهاب إلى المهارات',
      categoryEn: 'Navigation',
      categoryAr: 'التنقل',
      icon: Sparkles,
      perform: () => { window.location.hash = '#skills'; }
    },
    {
      id: 'nav-journey',
      titleEn: 'Go to Journey',
      titleAr: 'الذهاب إلى المسيرة المهنية',
      categoryEn: 'Navigation',
      categoryAr: 'التنقل',
      icon: Sparkles,
      perform: () => { window.location.hash = '#journey'; }
    },
    {
      id: 'nav-projects',
      titleEn: 'Go to Projects',
      titleAr: 'الذهاب إلى المشاريع',
      categoryEn: 'Navigation',
      categoryAr: 'التنقل',
      icon: Sparkles,
      perform: () => { window.location.hash = '#projects'; }
    },
    {
      id: 'nav-contact',
      titleEn: 'Go to Contact',
      titleAr: 'الذهاب إلى التواصل',
      categoryEn: 'Navigation',
      categoryAr: 'التنقل',
      icon: Sparkles,
      perform: () => { window.location.hash = '#contact'; }
    },
    {
      id: 'act-theme',
      titleEn: isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      titleAr: isDark ? 'التحويل إلى الوضع الفاتح' : 'التحويل إلى الوضع الداكن',
      categoryEn: 'Preferences',
      categoryAr: 'التفضيلات',
      icon: isDark ? Sun : Moon,
      perform: () => { setIsDark(!isDark); }
    },
    {
      id: 'act-lang',
      titleEn: lang === 'en' ? 'Switch to Arabic' : 'Switch to English',
      titleAr: lang === 'en' ? 'التحويل للعربية' : 'التحويل للإنجليزية',
      categoryEn: 'Preferences',
      categoryAr: 'التفضيلات',
      icon: Languages,
      perform: () => { setLang(lang === 'en' ? 'ar' : 'en'); }
    },
    {
      id: 'act-sound',
      titleEn: soundEnabled ? 'Mute UI Sound FX' : 'Enable UI Sound FX',
      titleAr: soundEnabled ? 'كتم مؤثرات الصوت' : 'تفعيل مؤثرات الصوت',
      categoryEn: 'Preferences',
      categoryAr: 'التفضيلات',
      icon: soundEnabled ? VolumeX : Volume2,
      perform: () => { setSoundEnabled(!soundEnabled); }
    },
    {
      id: 'act-cv',
      titleEn: 'Download Resume (PDF)',
      titleAr: 'تحميل السيرة الذاتية (PDF)',
      categoryEn: 'Actions',
      categoryAr: 'الإجراءات',
      icon: Download,
      perform: () => {
        const a = document.createElement('a');
        a.href = personal.resumeLink;
        a.download = 'Raed_AlHallaq_Resume.pdf';
        a.click();
      }
    },
    {
      id: 'act-email',
      titleEn: `Copy Email (${personal.email})`,
      titleAr: `نسخ البريد (${personal.email})`,
      categoryEn: 'Actions',
      categoryAr: 'الإجراءات',
      icon: Mail,
      perform: () => { onCopyEmail(personal.email); }
    },
    {
      id: 'act-whatsapp',
      titleEn: `Open WhatsApp Chat`,
      titleAr: `فتح المحادثة عبر الواتساب`,
      categoryEn: 'Actions',
      categoryAr: 'الإجراءات',
      icon: Phone,
      perform: () => { window.open(personal.socials.whatsapp, '_blank'); }
    }
  ];

  const filteredActions = actions.filter((act) => {
    const title = lang === 'ar' ? act.titleAr : act.titleEn;
    const cat = lang === 'ar' ? act.categoryAr : act.categoryEn;
    const search = query.toLowerCase();
    return title.toLowerCase().includes(search) || cat.toLowerCase().includes(search);
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      playSound('hover', soundEnabled);
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      playSound('hover', soundEnabled);
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        playSound('click', soundEnabled);
        filteredActions[selectedIndex].perform();
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Command Palette Card */}
      <div
        onKeyDown={handleKeyDown}
        className={`relative w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border transition-all z-10 ${
          isDark ? 'bg-[#0e131f] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'ابحث عن أمر أو قسم (Ctrl+K)...' : 'Type a command or search... (Ctrl+K)'}
            className="w-full bg-transparent text-sm sm:text-base focus:outline-none placeholder-slate-500 font-medium"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredActions.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-400">
              {lang === 'ar' ? 'لم يتم العثور على نتائج متطابقة.' : 'No matching commands found.'}
            </div>
          ) : (
            filteredActions.map((item, idx) => {
              const IconComp = item.icon;
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playSound('click', soundEnabled);
                    item.perform();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full p-3 rounded-2xl flex items-center justify-between transition-all text-xs sm:text-sm font-medium ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md'
                      : isDark
                      ? 'text-slate-300 hover:bg-white/5'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-white/20' : isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span>{lang === 'ar' ? item.titleAr : item.titleEn}</span>
                  </div>
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'text-slate-400 bg-white/5'
                  }`}>
                    {lang === 'ar' ? item.categoryAr : item.categoryEn}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-black/20 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-white/10">↑↓</span> {lang === 'ar' ? 'للتنقل' : 'Navigate'}
            <span className="px-1.5 py-0.5 rounded bg-white/10 ml-2">↵</span> {lang === 'ar' ? 'للاختيار' : 'Select'}
          </div>
          <div className="flex items-center gap-1">
            <span className="px-1.5 py-0.5 rounded bg-white/10">ESC</span> {lang === 'ar' ? 'للإغلاق' : 'Close'}
          </div>
        </div>
      </div>
    </div>
  );
};
