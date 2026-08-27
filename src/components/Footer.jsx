import React from 'react';
import { Code, Github, Linkedin, Facebook, Twitter, Heart } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const Footer = ({ isDark, lang }) => {
  const { personal } = portfolioData;
  const currentYear = new Date().getFullYear();

  const links = [
    { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية' },
    { id: 'about', labelEn: 'About', labelAr: 'عني' },
    { id: 'skills', labelEn: 'Skills', labelAr: 'مهاراتي' },
    { id: 'journey', labelEn: 'Journey', labelAr: 'مسيرتي' },
    { id: 'projects', labelEn: 'Projects', labelAr: 'مشاريعي' },
    { id: 'contact', labelEn: 'Contact', labelAr: 'اتصل بي' },
  ];

  return (
    <footer className={`relative z-10 border-t py-12 ${
      isDark ? 'bg-[#05070b] border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
              <Code className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-slate-100">
              Raed <span className="gradient-text-primary">Al-Hallaq</span>
            </span>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium">
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="hover:text-indigo-400 transition-colors"
              >
                {lang === 'ar' ? link.labelAr : link.labelEn}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: personal.socials.github },
              { icon: Linkedin, href: personal.socials.linkedin },
              { icon: Facebook, href: personal.socials.facebook },
              { icon: Twitter, href: personal.socials.twitter }
            ].map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
                  isDark
                    ? 'bg-slate-900 border-white/10 hover:text-indigo-400 hover:border-indigo-500/40'
                    : 'bg-white border-slate-200 hover:text-indigo-600 hover:border-indigo-300'
                }`}
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 text-center text-xs font-mono flex items-center justify-center gap-1.5 flex-wrap">
          <span>Copyright &copy; {currentYear} Raed Al-Hallaq. Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>using React & Tailwind CSS. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};
