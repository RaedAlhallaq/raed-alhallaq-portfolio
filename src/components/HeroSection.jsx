import React, { useState, useEffect } from 'react';
import { Download, ArrowRight, Sparkles, Terminal, ShieldCheck, Github, Linkedin, Facebook, Twitter } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playSound } from '../utils/soundFx';

export const HeroSection = ({ isDark, lang, soundEnabled }) => {
  const { personal, typingRolesEn, typingRolesAr } = portfolioData;
  const roles = lang === 'ar' ? typingRolesAr : typingRolesEn;

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText === currentRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => prev + 1);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, roles]);

  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Dynamic Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/15 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left rtl:text-right">
            {/* Status Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 border transition-all ${
              isDark
                ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300 shadow-glow-primary'
                : 'bg-indigo-50 border-indigo-200 text-indigo-700'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-emerald-400 -ml-4" />
              <span>{lang === 'ar' ? 'متاح للعمل والمشاريع المتميزة' : 'Available for High-Impact Projects'}</span>
            </div>

            {/* Main Greeting */}
            <h3 className="text-lg sm:text-xl font-medium text-indigo-400 tracking-wide mb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400 inline" />
              {lang === 'ar' ? 'أهلاً بك، أنا' : "Hello, It's Me"}
            </h3>

            {/* Name */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4">
              <span className={isDark ? 'text-white' : 'text-slate-900'}>
                {lang === 'ar' ? personal.nameAr : personal.nameEn}
              </span>
            </h1>

            {/* Typewriter Role */}
            <div className="h-14 flex items-center mb-6">
              <h2 className="text-xl sm:text-3xl font-semibold">
                <span className="text-slate-400">{lang === 'ar' ? 'وأنا ' : "And, I'm a "}</span>
                <span className="gradient-text-primary underline decoration-indigo-500/40 decoration-wavy">
                  {displayedText}
                </span>
                <span className="inline-block w-1 h-7 bg-cyan-400 ml-1 animate-pulse" />
              </h2>
            </div>

            {/* Bio */}
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed mb-8 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {lang === 'ar' ? personal.bioAr : personal.bioEn}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#projects"
                onClick={() => playSound('click', soundEnabled)}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span>{lang === 'ar' ? 'استعرض أعمالي' : 'Explore Projects'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </a>

              <a
                href={personal.resumeLink}
                download="Raed_AlHallaq_Resume.pdf"
                onClick={() => playSound('click', soundEnabled)}
                className={`px-7 py-3.5 rounded-xl font-semibold border transition-all duration-300 flex items-center gap-2 ${
                  isDark
                    ? 'bg-slate-900/60 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-indigo-500/50'
                    : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50 hover:border-indigo-400'
                }`}
              >
                <Download className="w-4 h-4 text-indigo-400" />
                <span>{lang === 'ar' ? 'تحميل السيرة الذاتية' : 'Download CV'}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {lang === 'ar' ? 'تابعني:' : 'Connect:'}
              </span>
              {[
                { icon: Github, href: personal.socials.github, label: 'GitHub' },
                { icon: Linkedin, href: personal.socials.linkedin, label: 'LinkedIn' },
                { icon: Facebook, href: personal.socials.facebook, label: 'Facebook' },
                { icon: Twitter, href: personal.socials.twitter, label: 'Twitter' }
              ].map((s, idx) => (
                <a
                  key={idx}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playSound('click', soundEnabled)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                    isDark
                      ? 'bg-slate-900/80 border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-110'
                      : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 hover:scale-110'
                  }`}
                  aria-label={s.label}
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Profile Avatar & Orbit Halo */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              {/* Outer Orbital Ring */}
              <div className="absolute inset-0 rounded-full border border-indigo-500/20 animate-spin-slow" />
              
              {/* Glowing Avatar Frame */}
              <div className="w-full h-full rounded-full p-2.5 bg-gradient-to-tr from-indigo-600 via-cyan-500 to-violet-600 shadow-glow-primary avatar-halo">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#07090e] bg-slate-950 relative group">
                  <img
                    src={personal.avatar}
                    alt={personal.nameEn}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="text-white text-xs font-mono tracking-widest uppercase bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                      Raed Al-Hallaq
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Floating Tech Badges */}
              <div className="absolute -bottom-4 -left-4 glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-xl border border-white/10 animate-float">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-mono">Clean Code</div>
                  <div className="text-xs font-bold text-white">Full Stack JS/PHP</div>
                </div>
              </div>

              <div className="absolute -top-2 -right-4 glass-panel px-4 py-2.5 rounded-2xl flex items-center gap-2.5 shadow-xl border border-white/10 animate-float" style={{ animationDelay: '2s' }}>
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-[10px] uppercase text-slate-400 font-mono">Performance</div>
                  <div className="text-xs font-bold text-white">100% Lighthouse</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quick Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {personal.stats.map((stat) => (
            <div
              key={stat.id}
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                isDark
                  ? 'glass-card border-white/5 hover:border-indigo-500/30'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="text-3xl sm:text-4xl font-extrabold gradient-text-primary mb-1 font-mono">
                {stat.value}
              </div>
              <div className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {lang === 'ar' ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
