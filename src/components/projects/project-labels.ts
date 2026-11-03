import { localize } from '@/lib/localize'
import type { LocalizedString, LocaleCode } from '@/types/localized'
import type { Project, ProjectCategory, ProjectLinkType } from '@/types/project'

export const CATEGORY_LABELS: Record<ProjectCategory, LocalizedString> = {
  'full-stack': { en: 'Full-stack', ar: 'متكامل' },
  frontend: { en: 'Frontend', ar: 'واجهات أمامية' },
  backend: { en: 'Backend', ar: 'خلفي' },
}

export const LINK_TYPE_LABELS: Record<ProjectLinkType, LocalizedString> = {
  'live-demo': { en: 'Live demo', ar: 'عرض مباشر' },
  repository: { en: 'Repository', ar: 'المستودع' },
}

export const ALL_CATEGORIES_LABEL: LocalizedString = { en: 'All', ar: 'الكل' }

export const OWNERSHIP_EVIDENCE_LABELS: Record<'individual' | 'team' | 'lead', LocalizedString> = {
  individual: { en: 'Individual', ar: 'فردي' },
  team: { en: 'Team', ar: 'جماعي' },
  lead: { en: 'Team Lead', ar: 'قائد الفريق' },
}

/** Derived ownership evidence label — single source for grid and detail pages. */
export function ownershipEvidenceLabel(project: Project, language: LocaleCode): string {
  if (project.ownership.kind !== 'team') {
    return localize(OWNERSHIP_EVIDENCE_LABELS.individual, language)
  }
  if (project.ownership.isLead === true && project.ownership.role) {
    return localize(OWNERSHIP_EVIDENCE_LABELS.lead, language)
  }
  return localize(OWNERSHIP_EVIDENCE_LABELS.team, language)
}

export const VIEW_DETAILS_LABEL: LocalizedString = { en: 'View details', ar: 'عرض التفاصيل' }

export const BACK_TO_PROJECTS_LABEL: LocalizedString = {
  en: 'Back to all projects',
  ar: 'العودة إلى كل المشاريع',
}

export const PROJECT_NOT_FOUND_TITLE: LocalizedString = {
  en: 'Project not found',
  ar: 'المشروع غير موجود',
}

export const PROJECT_NOT_FOUND_TEXT: LocalizedString = {
  en: 'No project exists for this link.',
  ar: 'لا يوجد مشروع بهذا الرابط.',
}

export const PROJECT_INFORMATION_LABEL: LocalizedString = {
  en: 'Project information',
  ar: 'معلومات المشروع',
}

export const NOTE_LABEL: LocalizedString = { en: 'Note', ar: 'ملاحظة' }

export const DATE_LABEL: LocalizedString = { en: 'Date', ar: 'التاريخ' }

export const EMPTY_CATEGORY_TEXT: LocalizedString = {
  en: 'No projects in this category yet.',
  ar: 'لا توجد مشاريع في هذه الفئة بعد.',
}