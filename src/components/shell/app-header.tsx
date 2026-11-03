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
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/#home"
            onClick={closeMenu}
            className="group inline-flex items-baseline gap-2 rounded-sm outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <span className="text-[0.9375rem] font-semibold tracking-tight">
              {localize({ en: 'Raed Alhallaq', ar: 'رائد الحلاق' }, language)}
            </span>
            <span className="tech-label hidden text-[0.625rem] sm:inline">
              {isArabic ? 'بورتفوليو' : 'Portfolio'}
            </span>
          </Link>

          <nav aria-label={isArabic ? 'التنقل الرئيسي' : 'Main navigation'} className="hidden md:block">
            <ul className="flex items-center gap-7">
              {navItems.map((item) => {
                const active = item.id === activeId
                return (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      aria-current={active ? 'location' : undefined}
                      className={cn(
                        'relative block py-1 text-[0.8125rem] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/40',
                        active
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {localize(item.label, language)}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-foreground transition-transform duration-300 rtl:origin-right',
                          active ? 'scale-x-100' : 'scale-x-0',
                        )}
                      />
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
              className="rounded-full text-muted-foreground hover:text-foreground"
            >
              {theme === 'dark' ? <Sun className="size-4 shrink-0" /> : <Moon className="size-4 shrink-0" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              aria-label={languageActionLabel}
              title={languageActionLabel}
              onClick={toggleLanguage}
              className="rounded-full px-2.5 font-mono text-xs font-medium text-muted-foreground hover:text-foreground"
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
              className="rounded-full text-muted-foreground hover:text-foreground md:hidden"
            >
              {menuOpen ? <X className="size-4 shrink-0" /> : <Menu className="size-4 shrink-0" />}
            </Button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={cn(
            'absolute inset-x-0 top-full border-b border-border/80 bg-background md:hidden',
            menuOpen ? 'block' : 'hidden',
          )}
        >
          <nav aria-label={isArabic ? 'قائمة الهاتف' : 'Mobile navigation'} className="container-page">
            <ul className="divide-y divide-border/70 py-2">
              {navItems.map((item) => {
                const active = item.id === activeId
                return (
                  <li key={item.id}>
                    <Link
                      to={item.href}
                      onClick={closeMenu}
                      aria-current={active ? 'location' : undefined}
                      className={cn(
                        'flex items-baseline justify-between gap-4 py-3 text-lg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/40',
                        active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {localize(item.label, language)}
                      <span className="font-mono text-[0.625rem] text-muted-foreground">
                        {String(navItems.findIndex((entry) => entry.id === item.id) + 1).padStart(2, '0')}
                      </span>
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
