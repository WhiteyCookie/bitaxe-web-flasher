"use client"

import { ThemeProvider } from 'next-themes'

export function ClientThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="bitcoin" 
      enableSystem={false}
      themes={["dark", "bitcoin"]}
    >
      {children}
    </ThemeProvider>
  )
}
