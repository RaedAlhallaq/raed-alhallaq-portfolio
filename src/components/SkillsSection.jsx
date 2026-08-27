import React, { useState } from 'react';
import { Cpu, Code2, Server, Terminal, Palette, Database, HardDrive, GitBranch, Figma, Layout, FileCode } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playSound } from '../utils/soundFx';

export const SkillsSection = ({ isDark, lang, soundEnabled }) => {
  const { skillCategories, skills } = portfolioData;
  const categories = lang === 'ar' ? skillCategories.ar : skillCategories.en;
  const [selectedCategory, setSelectedCategory] = useState(0);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'FileCode': return FileCode;
      case 'Layout': return Layout;
      case 'Palette': return Palette;
      case 'Server': return Server;
      case 'Database': return Database;
      case 'HardDrive': return HardDrive;
      case 'Terminal': return Terminal;
      case 'GitBranch': return GitBranch;
      case 'Figma': return Figma;
      default: return Cpu;
    }
  };

  const filteredSkills = skills.filter((skill) => {
    if (selectedCategory === 0) return true;
    const catName = categories[selectedCategory];
    return lang === 'ar' ? skill.categoryAr === catName : skill.category === catName;
  });

  return (
    <section id="skills" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'الخبرات والمهارات' : 'Technical Proficiency'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {lang === 'ar' ? (
              <>
                ترسانتي التقنية <span className="gradient-text-secondary">والأدوات الاحترافية</span>
              </>
            ) : (
              <>
                My Tech Stack & <span className="gradient-text-secondary">Core Competencies</span>
              </>
            )}
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {lang === 'ar'
              ? 'مجموعة من التقنيات الحديثة والأدوات القوية التي أتقن استخدامها لتطوير تطبيقات ويب بمستوى عالمي.'
              : 'A curated suite of battle-tested frameworks, languages, and tools utilized to engineer modern digital platforms.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                playSound('click', soundEnabled);
                setSelectedCategory(idx);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === idx
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25'
                  : isDark
                  ? 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-white/10'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill, idx) => {
            const IconComp = getIcon(skill.icon);
            return (
              <div
                key={idx}
                onMouseEnter={() => playSound('hover', soundEnabled)}
                className={`p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  isDark
                    ? 'glass-card border-white/10 hover:border-cyan-500/40 hover:shadow-glow-cyan'
                    : 'bg-white border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                      style={{ backgroundColor: `${skill.color}25`, border: `1px solid ${skill.color}50` }}
                    >
                      <IconComp className="w-5 h-5" style={{ color: skill.color }} />
                    </div>
                    <div>
                      <h4 className="font-bold text-base">{skill.name}</h4>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {lang === 'ar' ? skill.categoryAr : skill.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-mono hidden sm:inline">
                      {skill.level >= 90 ? (lang === 'ar' ? 'خبير' : 'Expert') : skill.level >= 80 ? (lang === 'ar' ? 'متقدم' : 'Advanced') : (lang === 'ar' ? 'متمكن' : 'Proficient')}
                    </span>
                    <span className="text-sm font-extrabold font-mono text-cyan-400">{skill.level}%</span>
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-3 rounded-full bg-slate-800/80 overflow-hidden p-0.5 border border-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
