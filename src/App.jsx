import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { SpotlightCursor } from './components/SpotlightCursor';
import { CommandPalette } from './components/CommandPalette';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { JourneySection } from './components/JourneySection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { playSound } from './utils/soundFx';

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('raed_portfolio_theme');
    return savedTheme !== null ? savedTheme === 'dark' : true;
  });

  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem('raed_portfolio_lang');
    return savedLang || 'ar'; // Default to Arabic as requested by user
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    const savedSound = localStorage.getItem('raed_portfolio_sound');
    return savedSound !== null ? savedSound === 'true' : true;
  });

  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem('raed_portfolio_theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('raed_portfolio_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('raed_portfolio_sound', soundEnabled ? 'true' : 'false');
  }, [soundEnabled]);

  // Global Keyboard Shortcuts (Ctrl+K or Cmd+K for Command Palette)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        playSound('toggle', soundEnabled);
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [soundEnabled]);

  // Section Observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'journey', 'projects', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = (emailText) => {
    navigator.clipboard.writeText(emailText);
    playSound('success', soundEnabled);
    setCopied(true);
    setToastMessage(lang === 'ar' ? `تم نسخ البريد الإلكتروني (${emailText})` : `Copied email (${emailText})`);
    setTimeout(() => setCopied(false), 2500);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className={`min-h-screen relative transition-colors duration-300 ${
        isDark ? 'bg-[#07090e] text-slate-100 bg-grid-pattern' : 'bg-slate-50 text-slate-900 bg-grid-pattern-light'
      }`}
    >
      {/* Ambient Glowing Mouse Spotlight */}
      <SpotlightCursor isDark={isDark} />

      {/* Canvas Interactive Constellation Background */}
      <ParticleBackground isDark={isDark} />

      {/* Main Sticky Navbar */}
      <Navbar
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang}
        setLang={setLang}
        activeSection={activeSection}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onCopyEmail={handleCopyEmail}
        copied={copied}
      />

      {/* Main Page Sections */}
      <main className="relative z-10">
        <HeroSection isDark={isDark} lang={lang} soundEnabled={soundEnabled} />
        <AboutSection isDark={isDark} lang={lang} soundEnabled={soundEnabled} />
        <SkillsSection isDark={isDark} lang={lang} soundEnabled={soundEnabled} />
        <JourneySection isDark={isDark} lang={lang} soundEnabled={soundEnabled} />
        <ProjectsSection
          isDark={isDark}
          lang={lang}
          soundEnabled={soundEnabled}
          onSelectProject={(proj) => setSelectedProject(proj)}
        />
        <TestimonialsSection isDark={isDark} lang={lang} soundEnabled={soundEnabled} />
        <ContactSection isDark={isDark} lang={lang} soundEnabled={soundEnabled} />
      </main>

      {/* Footer */}
      <Footer isDark={isDark} lang={lang} />

      {/* Floating Scroll To Top Indicator */}
      <ScrollToTop isDark={isDark} soundEnabled={soundEnabled} />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        isDark={isDark}
        lang={lang}
        soundEnabled={soundEnabled}
      />

      {/* Command Palette (Ctrl+K Modal) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        isDark={isDark}
        setIsDark={setIsDark}
        lang={lang}
        setLang={setLang}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onCopyEmail={handleCopyEmail}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-2xl border border-indigo-400/30 backdrop-blur-md animate-bounce flex items-center gap-2">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
