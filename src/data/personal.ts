import type { Contact } from '@/types/contact'
import type { Profile } from '@/types/personal'
import type { Resume } from '@/types/resume'

export const contact: Contact = {
  email: 'raedgamer313@gmail.com',
  phone: '+972 597 886 717',
  whatsapp: 'https://wa.me/972597886717',
  location: 'Gaza, Palestine',
}

export const resume: Resume = {
  status: 'not-provided',
  note: {
    en: 'The official CV is not available yet.',
    ar: 'السيرة الذاتية الرسمية غير متوفرة بعد.',
  },
}

export const profile: Profile = {
  name: {
    en: 'Raed Alhallaq',
    ar: 'رائد الحلاق',
  },
  nameAscii: 'Raed Alhallaq',
  title: {
    en: 'Co-Founder | Front-End Developer (React & TypeScript) | Technical & Training Lead',
    ar: 'شريك مؤسس | مطوّر واجهات أمامية (React وTypeScript) | مسؤول تقني وتدريبي',
  },
  headline: {
    en: 'Co-Founder | Front-End Developer (React & TypeScript) | Technical & Training Lead',
    ar: 'شريك مؤسس | مطوّر واجهات أمامية (React وTypeScript) | مسؤول تقني وتدريبي',
  },
  positioning: {
    en: 'React-first front-end developer building clean, responsive interfaces.',
    ar: 'مطوّر واجهات أمامية يعتمد على React ويبني واجهات نظيفة ومتجاوبة.',
  },
  about: {
    en: [
      "I'm a front-end developer based in Gaza, focused on interfaces that are clear, responsive, and dependable. My work sits where clean React code meets careful visual detail.",
      "I co-founded Hireland and work there as its front-end developer. I also led the front-end team behind VolunGate, the Islamic University of Gaza's volunteering platform.",
      "I study computer science at IUG and keep strengthening my engineering foundations through programmes such as Gaza Sky Geeks' MRDT and Go Digital Palestine.",
    ],
    ar: [
      'أنا مطوّر واجهات أمامية من غزة، أركّز على بناء واجهات واضحة ومتجاوبة وموثوقة. يجتمع في عملي كود React النظيف مع الاهتمام الدقيق بالتفاصيل البصرية.',
      'شاركت في تأسيس Hireland وأعمل فيها مطوّر واجهات أمامية. قدت أيضاً فريق الواجهات الأمامية في VolunGate، منصة التطوع في الجامعة الإسلامية بغزة.',
      'أدرس علوم الحاسوب في الجامعة الإسلامية، وأواصل تقوية أساسياتي الهندسية عبر برامج مثل MRDT من Gaza Sky Geeks وGo Digital Palestine.',
    ],
  },
  contact,
  avatarSrc: '/avatar.png',
  resume,
}
