import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../data/portfolioData';

export const ContactSection = ({ isDark, lang }) => {
  const { personal } = portfolioData;

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('raed_portfolio_contact_draft');
    return saved
      ? JSON.parse(saved)
      : { fullName: '', email: '', message: '' };
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('raed_portfolio_contact_draft', JSON.stringify(formData));
  }, [formData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = lang === 'ar' ? 'يرجى كتابة الاسم الكامل' : 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = lang === 'ar' ? 'يرجى كتابة البريد الإلكتروني' : 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = lang === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      newErrors.message = lang === 'ar' ? 'يرجى كتابة نص الرسالة' : 'Message text is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = lang === 'ar' ? 'الرسالة قصيرة جداً (10 حروف على الأقل)' : 'Message must be at least 10 characters';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      localStorage.removeItem('raed_portfolio_contact_draft');
      setFormData({ fullName: '', email: '', message: '' });

      // Trigger Confetti Burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback silently if canvas-confetti fails
      }
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'تواصل معي' : 'Get In Touch'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            {lang === 'ar' ? (
              <>
                دعنا نبني شيئاً <span className="gradient-text-primary">استثنائياً معاً</span>
              </>
            ) : (
              <>
                Let's Build Something <span className="gradient-text-primary">Extraordinary Together</span>
              </>
            )}
          </h2>
          <p className={`text-base sm:text-lg ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {lang === 'ar'
              ? 'سواء كان لديك فكرة مشروع جديد، استفسار تقني، أو رغبة في التوظيف، أنا هنا لمساعدتك.'
              : 'Have an innovative project in mind or need full stack expertise? Send a message below.'}
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Contact Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {[
              {
                icon: Mail,
                titleEn: "Email Address",
                titleAr: "البريد الإلكتروني",
                value: personal.email,
                href: `mailto:${personal.email}`,
                color: "from-indigo-500 to-violet-500"
              },
              {
                icon: Phone,
                titleEn: "Phone / WhatsApp",
                titleAr: "الهاتف والواتساب",
                value: personal.phone,
                href: personal.socials.whatsapp,
                color: "from-cyan-500 to-teal-500"
              },
              {
                icon: MapPin,
                titleEn: "Location",
                titleAr: "الموقع الجغرافي",
                value: lang === 'ar' ? personal.locationAr : personal.locationEn,
                href: "#",
                color: "from-violet-500 to-pink-500"
              }
            ].map((card, idx) => (
              <a
                key={idx}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : '_self'}
                rel="noreferrer"
                className={`p-6 rounded-3xl border flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 block ${
                  isDark
                    ? 'glass-card border-white/10 hover:border-indigo-500/40'
                    : 'bg-white border-slate-200 shadow-md hover:shadow-lg'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    {lang === 'ar' ? card.titleAr : card.titleEn}
                  </h4>
                  <p className="text-base font-bold font-mono text-indigo-400">{card.value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className={`p-8 sm:p-10 rounded-3xl border ${
              isDark ? 'glass-card border-white/10' : 'bg-white border-slate-200 shadow-xl'
            }`}>
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">
                    {lang === 'ar' ? 'تم ارسال رسالتك بنجاح!' : 'Message Sent Successfully!'}
                  </h3>
                  <p className={`text-sm max-w-md mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {lang === 'ar'
                      ? 'شكراً لتواصلك معي. قمت باستلام رسالتك وسأقوم بالرد عليك في أقرب وقت ممكن.'
                      : 'Thank you for reaching out. I have received your message and will respond promptly.'}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition-colors"
                  >
                    {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 font-mono text-slate-400">
                      {lang === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={lang === 'ar' ? 'أدخل اسمك الكريم' : 'e.g. John Doe'}
                      className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.fullName
                          ? 'border-rose-500/60 bg-rose-500/10'
                          : isDark
                          ? 'bg-slate-900/60 border-white/10 text-white focus:border-indigo-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-600'
                      }`}
                    />
                    {errors.fullName && (
                      <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-2 font-mono text-slate-400">
                      {lang === 'ar' ? 'البريد الإلكتروني *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={lang === 'ar' ? 'name@example.com' : 'name@example.com'}
                      className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none ${
                        errors.email
                          ? 'border-rose-500/60 bg-rose-500/10'
                          : isDark
                          ? 'bg-slate-900/60 border-white/10 text-white focus:border-indigo-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-600'
                      }`}
                    />
                    {errors.email && (
                      <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider font-mono text-slate-400">
                        {lang === 'ar' ? 'رسالتك *' : 'Your Message *'}
                      </label>
                      <span className="text-[11px] font-mono text-slate-500">
                        {formData.message.length}/500
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      maxLength={500}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={lang === 'ar' ? 'اكتب تفاصيل المشروع أو الاستفسار هنا...' : 'Describe your project requirements or inquiry...'}
                      className={`w-full px-4 py-3.5 rounded-xl border text-sm transition-all focus:outline-none resize-none ${
                        errors.message
                          ? 'border-rose-500/60 bg-rose-500/10'
                          : isDark
                          ? 'bg-slate-900/60 border-white/10 text-white focus:border-indigo-500'
                          : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-600'
                      }`}
                    />
                    {errors.message && (
                      <span className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white font-semibold text-base transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{lang === 'ar' ? 'إرسال الرسالة' : 'Send Message'}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
