import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useLanguage } from '@/providers/language'
import { AppFooter } from './app-footer'
import { AppHeader } from './app-header'

function useHashScroll() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return
    const target = document.getElementById(hash.slice(1))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (target) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
    }
  }, [hash, pathname])
}

export function AppShell() {
  const { language } = useLanguage()

  useHashScroll()

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only inline-flex items-center border border-line-strong bg-background px-4 py-3 text-sm font-medium text-foreground focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[70]"
      >
        {language === 'en' ? 'Skip to content' : 'تخطَّ إلى المحتوى'}
      </a>
      <AppHeader />
      <main id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  )
}
