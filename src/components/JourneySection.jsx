import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const JourneySection = ({ isDark, lang }) => {
  const { journey } = portfolioData;
  const items = lang === 'ar' ? journey.ar : journey.en;

  return (
    <section id="journey" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'الخبرات والتعليم' : 'Career Timeline'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {lang === 'ar' ? (
              <>
                مسيرتي الأكاديمية <span className="gradient-text-primary">والمهنية</span>
              </>
            ) : (
              <>
                My Education & <span className="gradient-text-primary">Professional Journey</span>
              </>
            )}
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {lang === 'ar'
              ? 'محطات رئيسية في دراستي وخبراتي العملية التي شكلت مهاراتي التقنية ونظرتي الهندسية.'
              : 'Milestones documenting academic foundations and professional industry experience.'}
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Spine */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-violet-500 to-cyan-500 transform md:-translate-x-1/2 opacity-30" />

          <div className="space-y-12">
            {items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isEdu = item.type === 'education';

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center text-cyan-400 shadow-glow-primary z-20">
                    {isEdu ? <GraduationCap className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                  </div>

                  {/* Timeline Card */}
                  <div className="w-full md:w-[calc(50%-2.5rem)] ml-12 md:ml-0">
                    <div
                      className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                        isDark
                          ? 'glass-card border-white/10 hover:border-violet-500/40 hover:shadow-glow-violet'
                          : 'bg-white border-slate-200 shadow-md hover:shadow-lg'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-mono ${
                          isEdu
                            ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          <Calendar className="w-3 h-3" />
                          <span>{item.year}</span>
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                          {isEdu ? (lang === 'ar' ? 'تعليم أكاديمي' : 'Education') : (lang === 'ar' ? 'خبرة عمل' : 'Experience')}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold mb-2">{item.title}</h3>
                      
                      <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-medium mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.institution}</span>
                      </div>

                      <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
