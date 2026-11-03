import type { ExperienceEntry } from '@/types/experience'
import type { Education, TrainingEntry } from '@/types/training'

export const education: Education = {
  institution: {
    en: 'Islamic University of Gaza (IUG)',
    ar: 'الجامعة الإسلامية - غزة',
  },
  degree: {
    en: 'B.Sc. in Computer Science',
    ar: 'بكالوريوس علوم الحاسوب',
  },
  field: {
    en: 'Computer Science',
    ar: 'علوم الحاسوب',
  },
  status: 'student',
  period: {
    en: 'Oct 2023 — Present',
    ar: 'أكتوبر 2023 — حتى الآن',
  },
  note: {
    en: 'In progress',
    ar: 'قيد الدراسة',
  },
}

export const experience: ExperienceEntry[] = [
  {
    id: 'hireland-cofounder',
    role: {
      en: 'Co-Founder',
      ar: 'شريك مؤسس',
    },
    organization: {
      en: 'Hireland',
      ar: 'Hireland',
    },
    type: 'work',
    current: true,
    period: {
      en: 'Present',
      ar: 'حتى الآن',
    },
    summary: {
      en: 'Co-founding Hireland and building its front-end experience.',
      ar: 'المشاركة في تأسيس Hireland وبناء تجربة واجهاتها الأمامية.',
    },
  },
  {
    id: 'hireland-frontend',
    role: {
      en: 'Front-End Developer (React & TypeScript)',
      ar: 'مطوّر واجهات أمامية (React وTypeScript)',
    },
    organization: {
      en: 'Hireland',
      ar: 'Hireland',
    },
    type: 'work',
    current: true,
    period: {
      en: 'Present',
      ar: 'حتى الآن',
    },
    summary: {
      en: 'Building Hireland’s interfaces with React and TypeScript.',
      ar: 'بناء واجهات Hireland باستخدام React وTypeScript.',
    },
  },
  {
    id: 'frontend-developer-online',
    role: {
      en: 'Frontend Developer (Online)',
      ar: 'مطوّر واجهات أمامية (عن بُعد)',
    },
    organization: {
      en: 'Online',
      ar: 'عن بُعد',
    },
    type: 'work',
    period: {
      en: 'Jan 2021 — Jan 2022',
      ar: 'يناير 2021 — يناير 2022',
    },
  },
  {
    id: 'volungate-lead',
    role: {
      en: 'Front-End Team Lead',
      ar: 'قائد فريق الواجهات الأمامية',
    },
    organization: {
      en: 'VolunGate — Islamic University of Gaza',
      ar: 'VolunGate — الجامعة الإسلامية بغزة',
    },
    type: 'leadership',
    period: {
      en: 'Project',
      ar: 'مشروع',
    },
    summary: {
      en: 'Led a team of four front-end engineers building the university volunteering platform.',
      ar: 'قدت فريقاً من أربعة مهندسي واجهات أمامية لبناء منصة التطوع الجامعية.',
    },
  },
]

export const trainings: TrainingEntry[] = [
  {
    id: 'mrdt',
    name: {
      en: 'Market Ready Developer Training (MRDT)',
      ar: 'تدريب السوق الجاهز للمطورين (MRDT)',
    },
    provider: {
      en: 'Gaza Sky Geeks',
      ar: 'Gaza Sky Geeks',
    },
    status: 'ongoing',
    topics: [
      { en: 'Advanced OOP / Java', ar: 'البرمجة كائنية التوجه المتقدمة / Java' },
      { en: 'SOLID principles', ar: 'مبادئ SOLID' },
      { en: 'Design Patterns', ar: 'أنماط التصميم' },
      { en: 'Data Structures & Algorithms', ar: 'هياكل البيانات والخوارزميات' },
    ],
  },
  {
    id: 'go-digital-palestine',
    name: {
      en: 'Go Digital Palestine',
      ar: 'Go Digital Palestine',
    },
    provider: {
      en: 'International Trade Centre (ITC) & BTI',
      ar: 'مركز التجارة الدولية (ITC) و BTI',
    },
    status: 'completed',
    period: {
      en: 'Coaching phase',
      ar: 'مرحلة التدريب',
    },
    topics: [
      { en: 'Freelancing', ar: 'العمل الحر' },
      { en: 'Digital presence', ar: 'الحضور الرقمي' },
    ],
  },
  {
    id: 'masar',
    name: {
      en: 'Masar Initiative',
      ar: 'مبادرة مسار',
    },
    provider: {
      en: 'Masar Initiative',
      ar: 'مبادرة مسار',
    },
    status: 'unknown',
    topics: [],
  },
  {
    id: 'freelance-marathon',
    name: {
      en: 'Freelance Marathon',
      ar: 'ماراثون العمل الحر',
    },
    provider: {
      en: 'ITC / Leaders International & GIZ',
      ar: 'ITC / Leaders International و GIZ',
    },
    status: 'unknown',
    topics: [],
  },
  {
    id: 'digiwork',
    name: {
      en: 'DigiWork',
      ar: 'DigiWork',
    },
    provider: {
      en: 'Leaders International & GIZ',
      ar: 'Leaders International و GIZ',
    },
    status: 'unknown',
    topics: [],
  },
]
