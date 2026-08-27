import React, { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const TestimonialsSection = ({ isDark, lang }) => {
  const { testimonials } = portfolioData;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const item = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'آراء العملاء' : 'Client Feedback'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {lang === 'ar' ? (
              <>
                ماذا يقول العملاء <span className="gradient-text-amber">عن جودة الأعمال</span>
              </>
            ) : (
              <>
                Trusted By Clients: <span className="gradient-text-amber">Testimonials & Reviews</span>
              </>
            )}
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {lang === 'ar'
              ? 'شهادات من شركاء العمل والعملاء الذين تم إنجاز مشاريعهم بنجاح واحترافية.'
              : 'Feedback from partners and clients showcasing engineering standards and satisfaction.'}
          </p>
        </div>

        {/* Testimonial Card Slider */}
        <div className="relative max-w-3xl mx-auto">
          <div className={`p-8 sm:p-12 rounded-3xl border relative transition-all duration-500 ${
            isDark
              ? 'glass-card border-white/10 shadow-2xl'
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            {/* Quote Icon Background */}
            <MessageSquareQuote className="absolute top-6 right-6 w-16 h-16 text-indigo-500/10 pointer-events-none" />

            {/* Stars */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(item.stars)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Comment Quote */}
            <blockquote className={`text-lg sm:text-xl italic leading-relaxed mb-8 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              "{lang === 'ar' ? item.commentAr : item.commentEn}"
            </blockquote>

            {/* Client Info */}
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <div>
                <h4 className="font-bold text-lg">{lang === 'ar' ? item.nameAr : item.nameEn}</h4>
                <p className="text-xs font-mono text-indigo-400">{lang === 'ar' ? item.roleAr : item.roleEn}</p>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentIndex === idx
                        ? 'w-8 bg-indigo-500'
                        : isDark
                        ? 'bg-slate-700 hover:bg-slate-600'
                        : 'bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className={`absolute top-1/2 -left-5 sm:-left-7 -translate-y-1/2 p-3 rounded-full border transition-all ${
              isDark
                ? 'bg-slate-900 border-white/10 text-white hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-md'
            }`}
          >
            <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
          </button>
          <button
            onClick={handleNext}
            className={`absolute top-1/2 -right-5 sm:-right-7 -translate-y-1/2 p-3 rounded-full border transition-all ${
              isDark
                ? 'bg-slate-900 border-white/10 text-white hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-md'
            }`}
          >
            <ChevronRight className="w-5 h-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
};
