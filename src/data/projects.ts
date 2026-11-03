import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    slug: 'echogrow',
    title: {
      en: 'EchoGrow',
      ar: 'EchoGrow',
    },
    category: 'full-stack',
    summary: {
      en: 'Interview verification and evidence-based upskilling platform, built with React, NestJS, Prisma, and Gemini.',
      ar: 'منصة للتحقق من المقابلات وبناء مسارات تطوير قائمة على الأدلة، مبنية بـ React وNestJS وPrisma وGemini.',
    },
    details: {
      en: 'EchoGrow analyzes interview transcripts, evaluates candidates across four dimensions with verbatim evidence, detects contradictions between spoken claims and résumé data, and generates personalized upskilling roadmaps. My front-end contribution includes the upload page and the brand UI and design tokens.',
      ar: 'يحلّل EchoGrow نصوص المقابلات، ويقيّم المرشحين عبر أربعة أبعاد باستخدام أدلة نصية، ويكشف التناقضات بين ما يُقال وبين بيانات السيرة الذاتية، ثم يولّد مسارات تطوير مخصّصة. تشمل مساهمتي في الواجهة الأمامية صفحة رفع الملفات وهوية الواجهة ورموز التصميم.',
    },
    ownership: {
      kind: 'team',
      role: {
        en: 'Front-End Contributor',
        ar: 'مساهم في الواجهات الأمامية',
      },
      note: {
        en: 'Ongoing team project.',
        ar: 'مشروع جماعي قيد العمل.',
      },
    },
    stack: ['React', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL', 'Gemini'],
    featured: true,
    images: [],
    links: [
      {
        type: 'repository',
        url: 'https://github.com/EchoGrow/echogrow-core',
      },
    ],
    date: { status: 'unavailable' },
  },
  {
    slug: 'roomora',
    title: {
      en: 'Roomora',
      ar: 'Roomora',
    },
    category: 'full-stack',
    summary: {
      en: 'Team-built hotel platform with a React and Vite front end and a NestJS API, covering RBAC, onboarding, and email verification.',
      ar: 'منصة فندقية بُنيت كفريق، بواجهة React وVite وواجهة برمجية NestJS، وتشمل التحكم بالصلاحيات والتأهيل والتحقق من البريد الإلكتروني.',
    },
    details: {
      en: 'Roomora is a hotel platform developed by a team. The web application is built with React, Vite, TypeScript, and Tailwind CSS, and the API with NestJS. My contributions include role-based access control, onboarding flows, and email verification.',
      ar: 'Roomora منصة فندقية يطوّرها فريق. بُنيت واجهة الويب بـ React وVite وTypeScript وTailwind CSS، وبُنيت الواجهة البرمجية بـ NestJS. تشمل مساهماتي التحكم بالصلاحيات حسب الدور ومسارات التأهيل والتحقق من البريد الإلكتروني.',
    },
    ownership: {
      kind: 'team',
      role: {
        en: 'Front-End / Full-Stack Contributor',
        ar: 'مساهم في الواجهات والخدمات الخلفية',
      },
      note: {
        en: 'Ongoing team project.',
        ar: 'مشروع جماعي قيد العمل.',
      },
    },
    stack: ['React', 'Vite', 'TypeScript', 'NestJS', 'Tailwind CSS'],
    featured: true,
    images: [],
    links: [
      {
        type: 'repository',
        url: 'https://github.com/roomora-org/roomora-web',
      },
      {
        type: 'repository',
        url: 'https://github.com/roomora-org/roomora-api',
        label: { en: 'API repository', ar: 'مستودع الواجهة البرمجية' },
      },
    ],
    date: { status: 'unavailable' },
  },
  {
    slug: 'volungate-iug',
    title: {
      en: 'VolunGate IUG',
      ar: 'بوابة التطوع - الجامعة الإسلامية',
    },
    category: 'frontend',
    summary: {
      en: 'Volunteering platform for the Islamic University of Gaza. Led the front-end team and shipped a live product.',
      ar: 'منصة لإدارة التطوع في الجامعة الإسلامية بغزة. قدت فريق الواجهات الأمامية وأطلقت المنتج بشكل مباشر.',
    },
    details: {
      en: 'VolunGate is the Islamic University of Gaza volunteering platform. I led the front-end team of four engineers, working on the interface, component structure, and the experience students use to discover and join volunteering opportunities.',
      ar: 'VolunGate هي منصة التطوع في الجامعة الإسلامية بغزة. قدت فريق الواجهات الأمامية المكوّن من أربعة مهندسين، وعملت على الواجهة وبنية المكوّنات والتجربة التي يستخدمها الطلاب لاكتشاف فرص التطوع والانضمام إليها.',
    },
    ownership: {
      kind: 'team',
      role: {
        en: 'Front-End Team Lead',
        ar: 'قائد فريق الواجهات الأمامية',
      },
      isLead: true,
    },
    stack: ['React', 'TypeScript', 'Vercel'],
    featured: true,
    images: [],
    links: [
      {
        type: 'live-demo',
        url: 'https://volun-gate-iug-4hkb.vercel.app/',
      },
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/VolunGate-IUG',
      },
    ],
    date: { status: 'to-be-confirmed' },
  },
  {
    slug: 'store-pos-management-system',
    title: {
      en: 'Store POS Management System',
      ar: 'نظام إدارة نقاط البيع',
    },
    category: 'full-stack',
    summary: {
      en: 'Arabic-first point-of-sale and store management system built with React 19, Laravel, and MySQL.',
      ar: 'نظام نقاط بيع وإدارة متجر بواجهة عربية أولاً، مبني بـ React 19 و Laravel و MySQL.',
    },
    details: {
      en: 'A full-stack point-of-sale system with an Arabic RTL interface. The front end is built with React 19 and the API with Laravel and MySQL, using Sanctum for authentication.',
      ar: 'نظام نقاط بيع متكامل بواجهة عربية من اليمين إلى اليسار. الواجهة الأمامية مبنية بـ React 19، والـ API بـ Laravel و MySQL مع Sanctum للمصادقة.',
    },
    ownership: { kind: 'individual' },
    stack: ['React 19', 'Laravel', 'MySQL', 'Tailwind CSS', 'Sanctum'],
    featured: true,
    images: [],
    links: [
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/store-pos-management-system',
      },
    ],
    date: { status: 'unavailable' },
  },
  {
    slug: 'reusable-data-table',
    title: {
      en: 'Reusable Data Table',
      ar: 'جدول بيانات قابل لإعادة الاستخدام',
    },
    category: 'frontend',
    summary: {
      en: 'A reusable React data table with filtering, sorting, pagination, URL state, RTL support, and server-side data handling.',
      ar: 'جدول بيانات React قابل لإعادة الاستخدام مع التصفية والترتيب والتقسيم وحالة الرابط ودعم RTL ومعالجة البيانات من الخادم.',
    },
    details: {
      en: 'A production-minded table component built with React, TypeScript, TanStack Table, and Tailwind CSS. It supports filtering, sorting, pagination, URL-synced state, RTL layouts, and server-side data sources.',
      ar: 'مكوّن جدول بيانات موجّه للإنتاج، مبني بـ React و TypeScript و TanStack Table و Tailwind CSS. يدعم التصفية والترتيب والتقسيم ومزامنة الحالة مع الرابط وتخطيطات RTL ومصادر البيانات من الخادم.',
    },
    ownership: { kind: 'individual' },
    stack: ['React', 'TypeScript', 'TanStack Table', 'Tailwind CSS'],
    featured: true,
    images: [],
    links: [
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/reusable-data-table',
      },
    ],
    date: { status: 'unavailable' },
  },
  {
    slug: 'ai-learning-platform',
    title: {
      en: 'AI Learning Platform',
      ar: 'منصة التعلم بالذكاء الاصطناعي',
    },
    category: 'full-stack',
    summary: {
      en: 'Team-built AI learning platform combining a React front end with Laravel and Python services.',
      ar: 'منصة تعلم بالذكاء الاصطناعي بُنيت كفريق، تجمع واجهة React مع خدمات Laravel و Python.',
    },
    ownership: {
      kind: 'team',
      note: {
        en: 'Team project — individual role not verified.',
        ar: 'مشروع جماعي — الدور الفردي غير موثّق.',
      },
    },
    stack: ['React', 'Laravel', 'Python'],
    featured: true,
    images: [],
    links: [
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/ai-learning-platform',
      },
    ],
    date: { status: 'unavailable' },
  },
  {
    slug: 'reusable-stepper',
    title: {
      en: 'Reusable Stepper',
      ar: 'مكوّن خطوات قابل لإعادة الاستخدام',
    },
    category: 'frontend',
    summary: {
      en: 'Controlled multi-step component for React with linear and non-linear flows, error states, RTL, and accessibility.',
      ar: 'مكوّن خطوات متعددة مُتحكَّم به في React، يدعم المسارات الخطية وغير الخطية وحالات الخطأ وRTL وإمكانية الوصول.',
    },
    details: {
      en: 'A presentational, developer-controlled stepper built with React, TypeScript, and Tailwind CSS. It renders progress, connecting rails, and navigation actions while the parent application keeps full control of state and validation.',
      ar: 'مكوّن خطوات عرضي يُدار بالكامل من المطوّر، مبني بـ React و TypeScript و Tailwind CSS. يعرض التقدّم وخطوط الربط وأزرار التنقل، بينما يحتفظ التطبيق الأب بالتحكم الكامل في الحالة والتحقق.',
    },
    ownership: { kind: 'individual' },
    stack: ['React', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    images: [],
    links: [
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/reusable-stepper',
      },
    ],
    date: { status: 'unavailable' },
  },
  {
    slug: 'clinicdesk',
    title: {
      en: 'ClinicDesk',
      ar: 'ClinicDesk',
    },
    category: 'backend',
    summary: {
      en: 'Clinic management system built with PHP and MySQL as part of university coursework.',
      ar: 'نظام إدارة عيادة مبني بـ PHP و MySQL ضمن متطلبات الجامعة.',
    },
    ownership: { kind: 'individual' },
    stack: ['PHP', 'MySQL'],
    images: [],
    links: [
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/ClinicDesk',
      },
    ],
    date: { status: 'unavailable' },
  },
  {
    slug: 'smart-circle',
    title: {
      en: 'Smart Circle',
      ar: 'Smart Circle',
    },
    category: 'frontend',
    summary: {
      en: 'Small interactive web project built with JavaScript and HTML, with a live demo on GitHub Pages.',
      ar: 'مشروع ويب تفاعلي صغير مبني بـ JavaScript و HTML، مع عرض مباشر على GitHub Pages.',
    },
    ownership: { kind: 'individual' },
    stack: ['JavaScript', 'HTML', 'CSS'],
    images: [],
    links: [
      {
        type: 'live-demo',
        url: 'https://raedalhallaq.github.io/Smart-Circle/',
      },
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/Smart-Circle',
      },
    ],
    date: { status: 'unavailable' },
  },
  {
    slug: 'autogate',
    title: {
      en: 'AutoGate',
      ar: 'AutoGate',
    },
    category: 'frontend',
    summary: {
      en: 'Marketing website for automatic doors and gates, built with HTML, CSS, and JavaScript.',
      ar: 'موقع تعريفي للأبواب والبوابات الأوتوماتيكية، مبني بـ HTML و CSS و JavaScript.',
    },
    ownership: { kind: 'individual' },
    stack: ['HTML', 'CSS', 'JavaScript'],
    images: [],
    links: [
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/AutoGate-',
      },
    ],
    date: { status: 'unavailable' },
  },
  {
    slug: 'php-book-library',
    title: {
      en: 'PHP Book Library',
      ar: 'مكتبة كتب بـ PHP',
    },
    category: 'backend',
    summary: {
      en: 'A PHP book library application — repository only.',
      ar: 'تطبيق مكتبة كتب بـ PHP — مستودع فقط.',
    },
    ownership: { kind: 'individual' },
    stack: ['PHP'],
    images: [],
    links: [
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/php-book-library',
      },
    ],
    date: { status: 'unavailable' },
  },
  {
    slug: 'arkan-dashboard-template',
    title: {
      en: 'Arkan Dashboard Template',
      ar: 'قالب لوحة تحكم Arkan',
    },
    category: 'frontend',
    summary: {
      en: 'Responsive multi-page dashboard template built with HTML and CSS, including projects, courses, profile, and settings pages.',
      ar: 'قالب لوحة تحكم متجاوب متعدد الصفحات، مبني بـ HTML وCSS، ويشمل صفحات المشاريع والدورات والملف الشخصي والإعدادات.',
    },
    details: {
      en: 'A dashboard template with dashboard, settings, profile, projects, courses, friends, files, and plans pages. Built with semantic HTML5, CSS3 layouts using Flexbox, Grid, and custom properties, plus Font Awesome icons.',
      ar: 'قالب لوحة تحكم يضم صفحات الرئيسية والإعدادات والملف الشخصي والمشاريع والدورات والأصدقاء والملفات والخطط. مبني بـ HTML5 الدلالي وتخطيطات CSS3 باستخدام Flexbox وGrid وخصائص CSS المخصّصة، مع أيقونات Font Awesome.',
    },
    ownership: { kind: 'individual' },
    stack: ['HTML', 'CSS'],
    featured: false,
    images: [],
    links: [
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/Arkan-Dashboard-Template',
      },
    ],
    date: { status: 'unavailable' },
    note: {
      en: 'Built as part of the Elzero Web School template challenges.',
      ar: 'بُني ضمن تحديات قوالب Elzero Web School.',
    },
  },
  {
    slug: 'elzero-template-three',
    title: {
      en: 'Elzero Template Three',
      ar: 'قالب Elzero الثالث',
    },
    category: 'frontend',
    summary: {
      en: 'Responsive landing page with a mega menu, gallery, pricing, testimonials, and scroll animations, built with HTML and CSS.',
      ar: 'صفحة هبوط متجاوبة بقائمة ضخمة ومعرض وأسعار وآراء وحركات عند التمرير، مبنية بـ HTML وCSS.',
    },
    details: {
      en: 'A multi-section landing page featuring a mega menu, articles, an interactive gallery, feature highlights, testimonials, team profiles, services, progress bars, an event countdown, pricing plans, and a video preview. Built with semantic HTML5 and CSS3 using custom properties, Flexbox, Grid, and keyframe animations.',
      ar: 'صفحة هبوط متعددة الأقسام تضم قائمة ضخمة ومقالات ومعرضاً تفاعلياً وإبرازات ومزايا وآراء وأعضاء فريق وخدمات وأشرطة تقدّم وعدّاً تنازلياً لحدث وخطط أسعار ومعاينة فيديو. مبنية بـ HTML5 الدلالي وCSS3 باستخدام خصائص مخصّصة وFlexbox وGrid وحركات keyframe.',
    },
    ownership: { kind: 'individual' },
    stack: ['HTML', 'CSS'],
    featured: false,
    images: [],
    links: [
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/Elzero-Template-Three',
      },
    ],
    date: { status: 'unavailable' },
    note: {
      en: 'Built as part of the Elzero Web School template challenges.',
      ar: 'بُني ضمن تحديات قوالب Elzero Web School.',
    },
  },
  {
    slug: 'kasper-creative-agency-template',
    title: {
      en: 'Kasper Creative Agency Template',
      ar: 'قالب Kasper لوكالة إبداعية',
    },
    category: 'frontend',
    summary: {
      en: 'Responsive creative agency landing page with a filterable portfolio, services, pricing plans, and a contact section.',
      ar: 'صفحة هبوط متجاوبة لوكالة إبداعية، تضم معرض أعمال قابلاً للتصفية وخدمات وخطط أسعار وقسم تواصل.',
    },
    details: {
      en: 'A creative agency landing page template built with HTML5 and CSS3. It includes a filterable portfolio, service and pricing sections, a contact section, Font Awesome icons, and a responsive layout using Flexbox.',
      ar: 'قالب صفحة هبوط لوكالة إبداعية مبني بـ HTML5 وCSS3. يضم معرض أعمال قابلاً للتصفية وأقسام خدمات وأسعار وقسم تواصل وأيقونات Font Awesome وتخطيطاً متجاوباً باستخدام Flexbox.',
    },
    ownership: { kind: 'individual' },
    stack: ['HTML', 'CSS'],
    featured: false,
    images: [],
    links: [
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/Kasper-Creative-Agency-Template',
      },
    ],
    date: { status: 'unavailable' },
    note: {
      en: 'Built as part of the Elzero Web School template challenges.',
      ar: 'بُني ضمن تحديات قوالب Elzero Web School.',
    },
  },
  {
    slug: 'personal-portfolio',
    title: {
      en: 'Personal Portfolio',
      ar: 'البورتفوليو الشخصي',
    },
    category: 'frontend',
    summary: {
      en: 'This bilingual portfolio: React, TypeScript, Vite, and Tailwind CSS with RTL support and dark mode.',
      ar: 'هذا البورتفوليو ثنائي اللغة: React و TypeScript و Vite و Tailwind CSS مع دعم RTL والوضع الداكن.',
    },
    ownership: { kind: 'individual' },
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    images: [],
    links: [
      {
        type: 'live-demo',
        url: 'https://raed-alhallaq-portfolio.vercel.app/',
      },
      {
        type: 'repository',
        url: 'https://github.com/RaedAlhallaq/raed-alhallaq-portfolio',
      },
    ],
    date: { status: 'unavailable' },
  },
]
