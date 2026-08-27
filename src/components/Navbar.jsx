import React, { useState, useEffect } from 'react';
import { Moon, Sun, Languages, Menu, X, Code, Sparkles, Command, Volume2, VolumeX, Search, Mail, Check } from 'lucide-react';
import { playSound } from '../utils/soundFx';

export const Navbar = ({
  isDark,
  setIsDark,
  lang,
  setLang,
  activeSection,
  soundEnabled,
  setSoundEnabled,
  onOpenCommandPalette,
  onCopyEmail,
  copied
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية' },
    { id: 'about', labelEn: 'About', labelAr: 'عني' },
    { id: 'skills', labelEn: 'Skills', labelAr: 'مهاراتي' },
    { id: 'journey', labelEn: 'Journey', labelAr: 'مسيرتي' },
    { id: 'projects', labelEn: 'Projects', labelAr: 'مشاريعي' },
    { id: 'testimonials', labelEn: 'Clients', labelAr: 'العملاء' },
    { id: 'contact', labelEn: 'Contact', labelAr: 'اتصل بي' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30 py-3'
            : 'bg-white/85 backdrop-blur-md border-b border-black/5 shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={() => playSound('click', soundEnabled)}
          className="flex items-center gap-2.5 group cursor-pointer shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform duration-300">
            <Code className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight flex items-center gap-1">
              <span className={isDark ? 'text-white' : 'text-slate-900'}>Raed</span>
              <span className="gradient-text-primary">Al-Hallaq</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-indigo-400 font-mono flex items-center gap-1 hidden sm:flex">
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" /> Full Stack Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 dark:bg-white/[0.03] p-1.5 rounded-full border border-black/5 dark:border-white/10 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => playSound('click', soundEnabled)}
                onMouseEnter={() => playSound('hover', soundEnabled)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                    : isDark
                    ? 'text-slate-300 hover:text-white hover:bg-white/10'
                    : 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100'
                }`}
              >
                {lang === 'ar' ? link.labelAr : link.labelEn}
              </a>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Command Palette Button */}
          <button
            onClick={() => {
              playSound('click', soundEnabled);
              onOpenCommandPalette();
            }}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
              isDark
                ? 'bg-white/5 border-white/10 text-slate-300 hover:border-indigo-500/40 hover:bg-white/10'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:border-indigo-300'
            }`}
            title="Open Command Palette (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">{lang === 'ar' ? 'أوامر سريعة' : 'Quick Menu'}</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/30 border border-white/10 text-[10px] font-mono">
              Ctrl+K
            </kbd>
          </button>

          {/* Quick Copy Email Button */}
          <button
            onClick={() => onCopyEmail('raedgamer313@gmail.com')}
            className={`p-2 sm:px-3 sm:py-1.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ${
              copied
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                : isDark
                ? 'bg-white/5 border-white/10 text-slate-200 hover:border-indigo-500/40'
                : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}
            title="Copy Email Address"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Mail className="w-4 h-4 text-indigo-400" />}
            <span className="hidden xl:inline">{copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : 'Email'}</span>
          </button>

          {/* Audio FX Toggle */}
          <button
            onClick={() => {
              const next = !soundEnabled;
              setSoundEnabled(next);
              playSound('toggle', next);
            }}
            className={`p-2.5 rounded-xl transition-all ${
              soundEnabled
                ? isDark
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                  : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                : isDark
                ? 'bg-white/5 text-slate-400 border border-white/10'
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}
            title={soundEnabled ? 'Disable UI Sound Effects' : 'Enable UI Sound Effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => {
              playSound('toggle', soundEnabled);
              setLang(lang === 'en' ? 'ar' : 'en');
            }}
            className={`p-2.5 rounded-xl flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-all ${
              isDark
                ? 'bg-slate-800/80 text-slate-200 hover:bg-slate-700 border border-white/10'
                : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
            }`}
            title={lang === 'en' ? 'Switch to Arabic' : 'تغيير للإنجليزية'}
          >
            <Languages className="w-4 h-4 text-cyan-400" />
            <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={() => {
              playSound('toggle', soundEnabled);
              setIsDark(!isDark);
            }}
            className={`p-2.5 rounded-xl transition-all ${
              isDark
                ? 'bg-slate-800/80 text-amber-400 hover:bg-slate-700 border border-white/10 shadow-glow-primary'
                : 'bg-slate-100 text-indigo-600 hover:bg-slate-200 border border-slate-200'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-4 h-4 animate-spin-slow" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2.5 rounded-xl transition-all ${
              isDark ? 'bg-slate-800/80 text-white' : 'bg-slate-100 text-slate-900'
            }`}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden px-4 pt-3 pb-6 transition-all ${
          isDark ? 'bg-[#0e131f]/95 border-b border-white/10 text-white' : 'bg-white/95 border-b border-black/10 text-slate-900'
        }`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  activeSection === link.id
                    ? 'bg-indigo-600 text-white font-semibold'
                    : isDark
                    ? 'hover:bg-white/5 text-slate-300'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                {lang === 'ar' ? link.labelAr : link.labelEn}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
