'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'
import { Globe } from 'lucide-react'

const languages = [
  { code: 'de', label: 'DE', fullName: 'Deutsch' },
  { code: 'en', label: 'EN', fullName: 'English' },
] as const

export default function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  const handleLanguageChange = (newLocale: 'de' | 'en') => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-1">
      <Globe className="w-4 h-4 text-warmano-gray-400" />
      <div className="flex gap-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
              locale === lang.code
                ? 'bg-warmano-orange text-white'
                : 'text-warmano-gray-400 hover:text-white hover:bg-warmano-gray-800'
            }`}
            title={lang.fullName}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  )
}
