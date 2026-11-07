import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Languages, Menu, Moon, Sun, X } from 'lucide-react'
import { useLanguage } from '@/providers/language'
import { useTheme } from '@/providers/theme'
import { localize } from '@/lib/localize'
import { cn } from '@/lib/utils'
import { contact, profile } from '@/data'
import { useActiveSection } from '@/hooks/use-active-section'
import { headerNavItems, navItems, siteSectionIds } from './nav-items'

const COPY = {
  mainNav: { en: 'Main navigation', ar: 'التنقل الرئيسي' },
  mobileNav: { en: 'Mobile navigation', ar: 'قائمة الهاتف' },
  menu: { en: 'Menu', ar: 'القائمة' },
  close: { en: 'Close menu', ar: 'إغلاق القائمة' },
  open: { en: 'Open menu', ar: 'فتح القائمة' },
  talk: { en: "Let's talk", ar: 'لنتحدث' },
  emailMe: { en: 'Email me', ar: 'راسلني' },
  themeLight: { en: 'Switch to light mode', ar: 'التبديل إلى الوضع الفاتح' },
  themeDark: { en: 'Switch to dark mode', ar: 'التبديل إلى الوضع الداكن' },
  lang: { en: 'Switch to Arabic', ar: 'Switch to English' },
}

export function AppHeader() {
  const { language, toggleLanguage } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  const lastScrollRef = useRef(0)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)

  const activeSection = useActiveSection(siteSectionIds)
  const isArabic = language === 'ar'

  const themeActionLabel = localize(
    theme === 'dark' ? COPY.themeLight : COPY.themeDark,
    language,
  )
  const languageActionLabel = localize(COPY.lang, language)
  const menuActionLabel = localize(menuOpen ? COPY.close : COPY.open, language)

  /* Hide the bar on downward scroll, reveal it on upward scroll. */
  useEffect(() => {
    let frame = 0

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        const delta = y - lastScrollRef.current

        setScrolled(y > 16)
        setHidden((previous) => {
          if (menuOpen) return false
          if (y < 160) return false
          if (delta > 8) return true
          if (delta < -8) return false
          return previous
        })
        lastScrollRef.current = y
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [menuOpen])

  /* Lock scroll, trap focus, and close on Escape while the overlay is open. */
  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const getFocusable = () => {
      const panel = panelRef.current
      if (!panel) return [] as HTMLElement[]
      return Array.from(
        panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'),
      )
    }

    getFocusable()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const items = getFocusable()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  useEffect(() => {
    if (wasOpenRef.current && !menuOpen) {
      menuButtonRef.current?.focus()
    }
    wasOpenRef.current = menuOpen
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const controls = (
    <>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={themeActionLabel}
        title={themeActionLabel}
        className="inline-flex size-11 items-center justify-center border border-transparent text-muted-foreground transition-colors hover:border-line hover:text-foreground"
      >
        {theme === 'dark' ? (
          <Sun className="size-4" aria-hidden="true" />
        ) : (
          <Moon className="size-4" aria-hidden="true" />
        )}
      </button>
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label={languageActionLabel}
        title={languageActionLabel}
        className="inline-flex size-11 items-center gap-1.5 border border-transparent font-mono text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:border-line hover:text-foreground"
      >
        <Languages className="size-3.5" aria-hidden="true" />
        {isArabic ? 'EN' : 'ع'}
      </button>
    </>
  )

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out',
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0',
        )}
      >
        <div
          className={cn(
            'transition-[background-color,border-color,backdrop-filter] duration-300',
            scrolled && !menuOpen
              ? 'border-b border-line bg-background/82 backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent',
          )}
        >
          <div className="container-page flex h-[4.5rem] items-center justify-between gap-3">
            <Link
              to="/#home"
              onClick={closeMenu}
              className="group inline-flex min-h-11 min-w-0 items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="relative grid size-9 shrink-0 place-items-center border border-line-strong font-display text-[0.8rem] font-extrabold leading-none tracking-tight transition-colors group-hover:border-accent group-hover:text-accent"
              >
                RA
                <span
                  aria-hidden="true"
                  className="absolute -end-0.5 -top-0.5 size-1.5 bg-accent"
                />
              </span>
              <span className="truncate font-display text-[0.72rem] font-bold uppercase tracking-[0.22em] sm:text-[0.78rem]">
                <span className="sm:hidden">{isArabic ? 'رائد' : 'Raed'}</span>
                <span className="hidden sm:inline">{localize(profile.name, language)}</span>
              </span>
            </Link>

            <nav
              aria-label={localize(COPY.mainNav, language)}
              className="hidden lg:block"
            >
              <ul className="flex items-center gap-7">
                {headerNavItems.map((item) => {
                  const active = item.id === activeSection
                  return (
                    <li key={item.id}>
                      <Link
                        to={item.href}
                        aria-current={active ? 'location' : undefined}
                        className={cn(
                          'group relative inline-flex min-h-11 items-center gap-2 py-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] transition-colors',
                          active
                            ? 'text-foreground'
                            : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            'size-1 bg-accent transition-opacity',
                            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-40',
                          )}
                        />
                        {localize(item.label, language)}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-1">
              <Link
                to="/#contact"
                className="btn btn-primary me-1 hidden sm:inline-flex"
              >
                {localize(COPY.talk, language)}
                <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden="true" />
              </Link>
              {controls}
              <button
                ref={menuButtonRef}
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuActionLabel}
                title={menuActionLabel}
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex size-11 items-center justify-center border border-transparent text-foreground transition-colors hover:border-line lg:hidden"
              >
                {menuOpen ? (
                  <X className="size-5" aria-hidden="true" />
                ) : (
                  <Menu className="size-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen ? (
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={localize(COPY.mobileNav, language)}
          className="menu-panel fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-background lg:hidden"
        >
          <div className="container-page flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line">
            <Link
              to="/#home"
              onClick={closeMenu}
              className="inline-flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="relative grid size-9 place-items-center border border-line-strong font-display text-[0.8rem] font-extrabold leading-none"
              >
                RA
                <span aria-hidden="true" className="absolute -end-0.5 -top-0.5 size-1.5 bg-accent" />
              </span>
              <span className="font-display text-[0.72rem] font-bold uppercase tracking-[0.22em]">
                {localize(profile.name, language)}
              </span>
            </Link>
            <button
              type="button"
              onClick={closeMenu}
              aria-label={localize(COPY.close, language)}
              className="inline-flex size-11 items-center justify-center border border-line text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label={localize(COPY.mobileNav, language)}
            className="container-page flex flex-1 flex-col justify-between py-8"
          >
            <ul className="divide-y divide-line border-y border-line">
              {navItems.map((item, index) => (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    onClick={closeMenu}
                    aria-current={item.id === activeSection ? 'location' : undefined}
                    className="group flex items-center justify-between gap-4 py-5"
                  >
                    <span className="flex min-w-0 items-baseline gap-4">
                      <span className="label-mono shrink-0 text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="display-md truncate transition-colors group-hover:text-accent">
                        {localize(item.label, language)}
                      </span>
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:text-accent rtl:-scale-x-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                to="/#contact"
                onClick={closeMenu}
                className="btn btn-primary w-full"
              >
                {localize(COPY.talk, language)}
                <ArrowUpRight className="size-4 rtl:-scale-x-100" aria-hidden="true" />
              </Link>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                <div className="flex items-center gap-1">
                  {controls}
                </div>
                <a
                  href={`mailto:${contact.email}`}
                  onClick={closeMenu}
                  className="link-underline text-sm text-muted-foreground hover:text-foreground"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  )
}
