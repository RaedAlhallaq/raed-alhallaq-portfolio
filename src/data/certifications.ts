import type { Certification } from '@/types/certification'

/** Certificates listed by Raed; names kept close to the issuer wording. */
export const certifications: Certification[] = [
  {
    id: 'taqat-codemap',
    name: { en: 'CodeMap 2026', ar: 'CodeMap 2026' },
    issuer: { en: 'TAQAT Academy', ar: 'TAQAT Academy' },
    year: '2026',
  },
  {
    id: 'taqat-ai-coding',
    name: { en: 'AI Coding — Beginner', ar: 'البرمجة بالذكاء الاصطناعي — مبتدئ' },
    issuer: { en: 'TAQAT Academy', ar: 'TAQAT Academy' },
    year: '2026',
  },
  {
    id: 'edureka-github-copilot',
    name: {
      en: 'GitHub Copilot: The AI Pair Programmer for Coding',
      ar: 'GitHub Copilot: مبرمج الاقتران بالذكاء الاصطناعي',
    },
    issuer: { en: 'Edureka', ar: 'Edureka' },
    year: '2026',
  },
  {
    id: 'itc-digital-freelancing',
    name: {
      en: 'Introduction to Digital Freelancing',
      ar: 'مقدمة في العمل الحر الرقمي',
    },
    issuer: { en: 'International Trade Centre (ITC)', ar: 'مركز التجارة الدولية (ITC)' },
    year: '2026',
  },
  {
    id: 'gsg-problem-solving',
    name: {
      en: '60-Hour Problem Solving & Algorithmic Thinking Training',
      ar: 'تدريب حل المشكلات والتفكير الخوارزمي (60 ساعة)',
    },
    issuer: { en: 'Gaza Sky Geeks (GSG)', ar: 'Gaza Sky Geeks (GSG)' },
    year: '2025',
  },
  {
    id: 'gsg-dsa',
    name: {
      en: 'Data Structures and Algorithms — SkillStack Path',
      ar: 'هياكل البيانات والخوارزميات — مسار SkillStack',
    },
    issuer: { en: 'Gaza Sky Geeks (GSG)', ar: 'Gaza Sky Geeks (GSG)' },
    year: '2025',
  },
  {
    id: 'meta-front-end',
    name: {
      en: 'Introduction to Front-End Development',
      ar: 'مقدمة في تطوير الواجهات الأمامية',
    },
    issuer: { en: 'Meta', ar: 'Meta' },
    year: '2025',
  },
]
