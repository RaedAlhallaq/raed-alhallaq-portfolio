import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { playSound } from '../utils/soundFx';

export const ScrollToTop = ({ isDark, soundEnabled }) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollPercent(Math.min(100, Math.max(0, Math.round(progress))));
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playSound('click', soundEnabled);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  // SVG Progress circle calculations
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-xl border transition-all duration-300 hover:scale-110 ${
        isDark
          ? 'bg-slate-900/90 border-white/10 text-white shadow-glow-primary'
          : 'bg-white/90 border-slate-200 text-slate-900 shadow-md'
      }`}
      aria-label="Scroll to top"
      title={`Scroll to top (${scrollPercent}%)`}
    >
      <svg className="w-14 h-14 transform -rotate-90 absolute inset-0">
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          className="text-white/10"
          fill="transparent"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          stroke="url(#scrollGradient)"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-150"
        />
        <defs>
          <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
      <ArrowUp className="w-5 h-5 relative z-10 text-indigo-400" />
    </button>
  );
};
