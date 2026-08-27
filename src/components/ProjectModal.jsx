import React from 'react';
import { X, ExternalLink, Github, Sparkles, CheckCircle2 } from 'lucide-react';
import { playSound } from '../utils/soundFx';

export const ProjectModal = ({ project, onClose, isDark, lang, soundEnabled }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => {
          playSound('click', soundEnabled);
          onClose();
        }}
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border transition-all z-10 my-8 ${
        isDark ? 'bg-[#0e131f] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Close Button */}
        <button
          onClick={() => {
            playSound('click', soundEnabled);
            onClose();
          }}
          className="absolute top-4 right-4 rtl:left-4 rtl:right-auto z-20 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Screenshot */}
        <div className="relative h-64 sm:h-80 bg-slate-950">
          <img
            src={project.image}
            alt={lang === 'ar' ? project.titleAr : project.titleEn}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e131f] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-indigo-600 text-white mb-2 inline-block shadow-md">
                {lang === 'ar' ? project.categoryAr : project.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {lang === 'ar' ? project.titleAr : project.titleEn}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الوصف والنطاق' : 'Overview & Scope'}</span>
            </h3>
            <p className={`text-base leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {lang === 'ar' ? project.descAr : project.descEn}
            </p>
          </div>

          {/* Key Architectural Highlights */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-sm font-mono uppercase tracking-wider text-indigo-400 mb-3">
              {lang === 'ar' ? 'المميزات البارزة' : 'Key Features & Architecture'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                lang === 'ar' ? 'تصميم واجهة متجاوب 100%' : '100% Mobile & Desktop Responsive',
                lang === 'ar' ? 'أداء عالي وسرعة استجابة' : 'Optimized Bundle & Fast Load Times',
                lang === 'ar' ? 'ربط محكم بين الخلفية والواجهة' : 'Robust RESTful API Integration',
                lang === 'ar' ? 'معايير أمان وتشفير عالية' : 'Secure State & Data Management'
              ].map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 border-t border-white/10">
            <h3 className="text-sm font-mono uppercase tracking-wider text-indigo-400 mb-3">
              {lang === 'ar' ? 'التقنيات المستعملة' : 'Technologies Used'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click', soundEnabled)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-sm transition-all shadow-lg hover:scale-105 flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{lang === 'ar' ? 'معاينة المشروع المباشر' : 'Live Preview'}</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => playSound('click', soundEnabled)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm border transition-all flex items-center gap-2 ${
                  isDark
                    ? 'bg-slate-800 border-white/10 text-white hover:bg-slate-700'
                    : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>{lang === 'ar' ? 'الكود المصدري على GitHub' : 'Source Code'}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
