import React, { useState } from 'react';
import { Layers, ExternalLink, Github, Eye, Sparkles, Search, SlidersHorizontal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { playSound } from '../utils/soundFx';

export const ProjectsSection = ({ isDark, lang, onSelectProject, soundEnabled }) => {
  const { projects } = portfolioData;
  const categories = lang === 'ar'
    ? ["الكل", "متكامل", "واجهة أمامية", "تطوير خلفي"]
    : ["All", "Full Stack", "Frontend", "Backend"];

  const [selectedCat, setSelectedCat] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryCount = (catIndex) => {
    if (catIndex === 0) return projects.length;
    const catName = categories[catIndex];
    return projects.filter((p) => (lang === 'ar' ? p.categoryAr === catName : p.category === catName)).length;
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCat = selectedCat === 0 || (lang === 'ar' ? p.categoryAr === categories[selectedCat] : p.category === categories[selectedCat]);
    const title = lang === 'ar' ? p.titleAr : p.titleEn;
    const desc = lang === 'ar' ? p.descAr : p.descEn;
    const tags = p.tags.join(' ');
    const matchesSearch = !searchQuery.trim() || `${title} ${desc} ${tags}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'معرض الأعمال' : 'Featured Showcase'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {lang === 'ar' ? (
              <>
                نخبة من المشاريع <span className="gradient-text-primary">التي قمت بتطويرها</span>
              </>
            ) : (
              <>
                Crafted With Precision: <span className="gradient-text-primary">Selected Works</span>
              </>
            )}
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {lang === 'ar'
              ? 'مجموعة من التطبيقات المتكاملة، المواقع التفاعلية، وتصاميم الواجهات التي تظهر خبراتي التقنية.'
              : 'Explore a gallery of full stack applications, interactive frontend engines, and digital products.'}
          </p>
        </div>

        {/* Search & Filter Control Bar */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
          {/* Search Input Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 rtl:right-4 rtl:left-auto" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث عن مشروع أو تقنية (React, Laravel, Python)...' : 'Search project or keyword...'}
              className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-xs sm:text-sm font-medium transition-all focus:outline-none ${
                isDark
                  ? 'bg-slate-900/80 border-white/10 text-white focus:border-indigo-500'
                  : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-600 shadow-sm'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          {/* Categories Pills with Badge Counter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat, idx) => {
              const count = getCategoryCount(idx);
              const isSelected = selectedCat === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    playSound('click', soundEnabled);
                    setSelectedCat(idx);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/25'
                      : isDark
                      ? 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-white/10'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 font-mono text-sm">
              {lang === 'ar' ? 'لم يتم العثور على مشاريع تطابق البحث.' : 'No projects match your search parameters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onMouseEnter={() => playSound('hover', soundEnabled)}
                className={`group rounded-3xl overflow-hidden border transition-all duration-500 hover:-translate-y-2 flex flex-col ${
                  isDark
                    ? 'glass-card border-white/10 hover:border-indigo-500/40 hover:shadow-glow-primary'
                    : 'bg-white border-slate-200 shadow-md hover:shadow-xl'
                }`}
              >
                {/* Image Preview Container */}
                <div className="relative h-52 overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={lang === 'ar' ? project.titleAr : project.titleEn}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent opacity-80" />

                  {/* Top Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-indigo-600/90 text-white backdrop-blur-md shadow-md">
                      {lang === 'ar' ? project.categoryAr : project.category}
                    </span>
                  </div>

                  {/* Overlay Action Buttons */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-sm z-20">
                    <button
                      onClick={() => {
                        playSound('click', soundEnabled);
                        onSelectProject(project);
                      }}
                      className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-transform hover:scale-110 shadow-lg"
                      title={lang === 'ar' ? 'معاينة التفاصيل' : 'View Details'}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-full bg-cyan-500 text-white hover:bg-cyan-400 transition-transform hover:scale-110 shadow-lg"
                        title={lang === 'ar' ? 'زيارة الرابط المباشر' : 'Live Demo'}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-transform hover:scale-110 shadow-lg border border-white/20"
                        title="GitHub Repository"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors">
                      {lang === 'ar' ? project.titleAr : project.titleEn}
                    </h3>
                    <p className={`text-sm line-clamp-3 mb-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      {lang === 'ar' ? project.descAr : project.descEn}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium ${
                            isDark
                              ? 'bg-slate-800/80 text-cyan-300 border border-white/5'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        playSound('click', soundEnabled);
                        onSelectProject(project);
                      }}
                      className="w-full py-2.5 rounded-xl border border-indigo-500/30 text-indigo-400 font-semibold text-xs transition-all hover:bg-indigo-600 hover:text-white flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'عرض تفاصيل المشروع' : 'View Project Details'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
