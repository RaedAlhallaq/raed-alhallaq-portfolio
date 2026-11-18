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
    id: 'khibra-cofounder',
    role: {
      en: 'Co-Founder & Technical/Training Supervisor',
      ar: 'شريك مؤسس ومشرف تقني وتدريبي',
    },
    organization: {
      en: 'Khibra Center for Training and Development',
      ar: 'مركز خبرة للتدريب والتطوير',
    },
    type: 'work',
    current: true,
    period: {
      en: 'Oct 2026 — Present',
      ar: 'أكتوبر 2026 — حتى الآن',
    },
    summary: {
      en: 'Co-founding Khibra, a center for training and digital-knowledge development, and supervising its technical and training work.',
      ar: 'المشاركة في تأسيس مركز خبرة للتدريب وتطوير المعرفة الرقمية، والإشراف على عمله التقني والتدريبي.',
    },
  },
  {
    id: 'hireland-cofounder',
    role: {
      en: 'Co-Founder & Front-End Developer',
      ar: 'شريك مؤسس ومطوّر واجهات أمامية',
    },
    organization: {
      en: 'Hireland',
      ar: 'Hireland',
    },
    type: 'work',
    current: true,
    period: {
      en: 'Sep 2026 — Present',
      ar: 'سبتمبر 2026 — حتى الآن',
    },
    summary: {
      en: 'Co-founded Hireland, an AI-powered platform that matches freelance opportunities with developers’ CVs and skills. Building scalable React and TypeScript interfaces with reusable, accessible RTL/LTR components in a cross-functional team.',
      ar: 'شاركت في تأسيس Hireland، منصة تعتمد على الذكاء الاصطناعي لمطابقة فرص العمل الحر مع سير المطوّرين ومهاراتهم. أبني واجهات React وTypeScript قابلة للتوسّع، ومكوّنات قابلة لإعادة الاستخدام تدعم RTL/LTR وإمكانية الوصول، ضمن فريق متعدد التخصصات.',
    },
  },
  {
    id: 'junior-frontend-freelance',
    role: {
      en: 'Junior Front-End Developer',
      ar: 'مطوّر واجهات أمامية',
    },
    organization: {
      en: 'Personal Projects · Freelance',
      ar: 'مشاريع شخصية · عمل حر',
    },
    type: 'work',
    current: true,
    period: {
      en: 'Sep 2024 — Present',
      ar: 'سبتمبر 2024 — حتى الآن',
    },
    summary: {
      en: 'Building personal projects to master front-end technologies and strengthen software-engineering foundations: responsive HTML/CSS interfaces, interactive ES6+ components, clean code, and UI/UX practice.',
      ar: 'أبني مشاريع شخصية لإتقان تقنيات الواجهات الأمامية وتقوية أساسيات هندسة البرمجيات: واجهات HTML/CSS متجاوبة، ومكوّنات تفاعلية بـ ES6+، وكود نظيف، وتطبيق لمبادئ UI/UX.',
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
