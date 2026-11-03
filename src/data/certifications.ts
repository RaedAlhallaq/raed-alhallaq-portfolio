import type { Certification } from '@/types/certification'

/** Certificates listed by Raed; names kept close to the issuer wording. */
export const certifications: Certification[] = [
  {
    id: 'meta-front-end',
    name: { en: 'Meta Front-End', ar: 'Meta للواجهات الأمامية' },
    issuer: { en: 'Meta', ar: 'Meta' },
    year: '2025',
  },
  {
    id: 'gsg-problem-solving',
    name: { en: 'Problem Solving', ar: 'حل المشكلات' },
    issuer: { en: 'Gaza Sky Geeks', ar: 'Gaza Sky Geeks' },
    year: '2025',
  },
  {
    id: 'gsg-dsa',
    name: { en: 'Data Structures & Algorithms', ar: 'هياكل البيانات والخوارزميات' },
    issuer: { en: 'Gaza Sky Geeks', ar: 'Gaza Sky Geeks' },
    year: '2025',
  },
  {
    id: 'itc-digital-freelancing',
    name: { en: 'Digital Freelancing', ar: 'العمل الحر الرقمي' },
    issuer: { en: 'International Trade Centre (ITC)', ar: 'مركز التجارة الدولية (ITC)' },
    year: '2026',
  },
  {
    id: 'edureka-github-copilot',
    name: { en: 'GitHub Copilot', ar: 'GitHub Copilot' },
    issuer: { en: 'Edureka', ar: 'Edureka' },
    year: '2026',
  },
]
