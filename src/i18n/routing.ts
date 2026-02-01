import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  // All supported locales
  locales: ['de', 'en'],

  // Default locale (German for WARMANO)
  defaultLocale: 'de',

  // Don't show locale prefix for default locale
  localePrefix: 'as-needed',
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing)
