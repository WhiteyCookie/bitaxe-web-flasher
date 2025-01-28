"use client"

import { ThemeProvider } from 'next-themes'

export function ClientThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="japanese" 
      enableSystem={false}
      themes={["dark", "bitcoin", "japanese"]}
    >
      {children}
    </ThemeProvider>
  )
}
