import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Languages, Menu, Moon, Sparkles, Sun, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/providers/language'
import { useTheme } from '@/providers/theme'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import { navItems, siteSectionIds } from './nav-items'
import { useActiveSection } from '@/hooks/use-active-section'
import { ReadingProgress } from './reading-progress'

const MOTION_KEY = 'raed_portfolio_motion'

function readMotionPreference(): 'on' | 'off' {
  if (typeof window === 'undefined') return 'on'
  try {
    return window.localStorage.getItem(MOTION_KEY) === 'off' ? 'off' : 'on'
  } catch {
    return 'on'
  }
}

export function AppHeader() {
  const { language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [motion, setMotion] = useState<'on' | 'off'>(readMotionPreference)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef<boolean>(false)

  const activeSection = useActiveSection(siteSectionIds)
  const activeId = activeSection ?? 'home'
  const isArabic = language === 'ar'

  const themeActionLabel =
    theme === 'dark'
      ? isArabic ? 'التبديل إلى الوضع الفاتح' : 'Switch to light mode'
      : isArabic ? 'التبديل إلى الوضع الداكن' : 'Switch to dark mode'

  const languageActionLabel = isArabic ? 'Switch to English' : 'التبديل إلى العربية'
  const menuActionLabel = isArabic
    ? menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'
    : menuOpen ? 'Close menu' : 'Open menu'
  const motionActionLabel = isArabic
    ? motion === 'on' ? 'إيقاف الحركة' : 'تشغيل الحركة'
    : motion === 'on' ? 'Motion: on' : 'Motion: off'

  // Persist and broadcast the Motion preference site-wide.
  useEffect(() => {
    try {
      window.localStorage.setItem(MOTION_KEY, motion)
    } catch {
      /* storage unavailable */
    }
    const root = document.documentElement
    if (motion === 'off') {
      root.dataset.motion = 'off'
    } else {
      delete root.dataset.motion
    }
  }, [motion])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (wasOpenRef.current && !menuOpen) {
      menuButtonRef.current?.focus()
    }
    wasOpenRef.current = menuOpen
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-[70] w-full border-b border-border bg-background/95 backdrop-blur-sm">
      <ReadingProgress />
      <div className="container-page">
        <div className="flex h-[66px] items-center justify-between gap-4">
          <Link
            to="/#home"
            onClick={closeMenu}
            aria-label={`${localize({ en: 'Raed Alhallaq', ar: 'رائد الحلاق' }, language)} — ${isArabic ? 'الرئيسية' : 'home'}`}
            className="group inline-flex min-h-11 items-center gap-0.5 outline-none transition-opacity hover:opacity-75 focus-visible:ring-2 focus-visible:ring-accent/50"
          >
            <span className="display text-2xl uppercase">
              {isArabic ? 'رائد' : 'Raed'}
            </span>
            <span aria-hidden="true" className="text-xs text-accent">
              .
            </span>
          </Link>

          <nav aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'} className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navItems.map((item) => {
                const active = item.id === activeId
                return (
                  <li key={item.id} className="relative">
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute -start-3 top-1/2 size-1 -translate-y-1/2 rounded-full bg-accent"
                      />
                    ) : null}
                    <Link
                      to={item.href}
                      aria-current={active ? 'location' : undefined}
                      className={cn(
                        'flex min-h-11 items-center text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/50 sm:text-sm',
                        active
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {localize(item.label, language)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <Button
              variant="ghost"
              size="sm"
              aria-pressed={motion === 'off'}
              aria-label={motionActionLabel}
              title={motionActionLabel}
              onClick={() => setMotion((value) => (value === 'on' ? 'off' : 'on'))}
              className="h-11 gap-2 px-2 font-mono text-[0.625rem] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground"
            >
              <Sparkles className="size-3.5 shrink-0 text-accent" aria-hidden="true" />
              <span className="hidden sm:inline">
                {isArabic ? (motion === 'on' ? 'حركة' : 'حركة: إيقاف') : motion === 'on' ? 'Motion' : 'Motion off'}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={themeActionLabel}
              title={themeActionLabel}
              onClick={toggleTheme}
              className="h-11 w-11 text-muted-foreground hover:text-foreground"
            >
              {theme === 'dark' ? <Sun className="size-4 shrink-0" /> : <Moon className="size-4 shrink-0" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label={languageActionLabel}
              title={languageActionLabel}
              onClick={toggleLanguage}
              className="h-11 gap-1.5 px-2 font-mono text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <Languages className="size-3.5 shrink-0" aria-hidden="true" />
              {isArabic ? 'EN' : 'ع'}
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              ref={menuButtonRef}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuActionLabel}
              title={menuActionLabel}
              onClick={() => setMenuOpen((open) => !open)}
              className="h-11 w-11 text-muted-foreground hover:text-foreground lg:hidden"
            >
              {menuOpen ? <X className="size-4 shrink-0" /> : <Menu className="size-4 shrink-0" />}
            </Button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={cn(
            'absolute inset-x-0 top-full z-[70] border-b border-accent/25 bg-card lg:hidden',
            menuOpen ? 'block' : 'hidden',
          )}
        >
          <nav aria-label={isArabic ? 'قائمة الهاتف' : 'Mobile navigation'} className="container-page">
            <ul className="divide-y divide-border">
              {navItems.map((item) => {
                const active = item.id === activeId
                return (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      onClick={closeMenu}
                      aria-current={active ? 'location' : undefined}
                      className={cn(
                        'flex min-h-14 items-center gap-4 text-lg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent/50',
                        active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <span className="display text-sm text-accent">
                        {String(navItems.findIndex((entry) => entry.id === item.id) + 1).padStart(2, '0')}
                      </span>
                      {localize(item.label, language)}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
