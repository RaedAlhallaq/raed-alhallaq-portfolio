import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Languages, Menu, Moon, Sun, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/providers/language'
import { useTheme } from '@/providers/theme'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import { navItems, siteSectionIds } from './nav-items'
import { useActiveSection } from '@/hooks/use-active-section'

export function AppHeader() {
  const { language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 shadow-header backdrop-blur-xl">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link
            to="/#home"
            onClick={closeMenu}
            aria-label={isArabic ? 'الرئيسية — رائد الحلاق' : 'Home — Raed Alhallaq'}
            className="inline-flex items-center gap-2.5 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-border-strong bg-foreground text-sm font-semibold text-background shadow-soft select-none">
              {isArabic ? 'ر' : 'R'}
              <span aria-hidden="true" className="absolute end-1 top-1 size-1.5 rounded-full bg-brand" />
            </span>
            <span className="hidden text-[0.9375rem] font-semibold tracking-tight sm:block">
              {localize({ en: 'Raed Alhallaq', ar: 'رائد الحلاق' }, language)}
            </span>
          </Link>

          <nav aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'} className="hidden md:block">
            <ul className="flex items-center gap-0.5 rounded-full border border-border/70 bg-card/60 p-1">
              {navItems.map((item) => {
                const active = item.id === activeId
                return (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      aria-current={active ? 'location' : undefined}
                      className={cn(
                        'block rounded-full px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50',
                        active
                          ? 'bg-muted text-foreground shadow-soft'
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

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={themeActionLabel}
              title={themeActionLabel}
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? <Sun className="size-4 shrink-0" /> : <Moon className="size-4 shrink-0" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label={languageActionLabel}
              title={languageActionLabel}
              onClick={toggleLanguage}
              className="gap-1.5 rounded-full px-2.5"
            >
              <Languages className="size-4 shrink-0" />
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
              className="rounded-full md:hidden"
            >
              {menuOpen ? <X className="size-4 shrink-0" /> : <Menu className="size-4 shrink-0" />}
            </Button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={cn(
            'absolute inset-x-0 top-full border-b border-border/70 bg-background/95 shadow-header backdrop-blur-xl md:hidden',
            menuOpen ? 'block' : 'hidden',
          )}
        >
          <nav aria-label={isArabic ? 'قائمة الهاتف' : 'Mobile navigation'} className="container-page">
            <ul className="flex flex-col gap-0.5 py-3">
              {navItems.map((item) => {
                const active = item.id === activeId
                return (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      onClick={closeMenu}
                      aria-current={active ? 'location' : undefined}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50',
                        active
                          ? 'bg-muted text-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      )}
                    >
                      {localize(item.label, language)}
                      {active ? (
                        <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
                      ) : null}
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
