import type { ReactNode } from 'react'
import { LanguageProvider } from './language'
import { ThemeProvider } from './theme'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  )
}