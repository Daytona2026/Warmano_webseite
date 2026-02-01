import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import StructuredData from '@/components/StructuredData'
import CookieBanner from '@/components/CookieBanner'
import OdooLiveChat from '@/components/OdooLiveChat'
import GoogleAnalytics from '@/components/GoogleAnalytics'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    metadataBase: new URL('https://warmano.de'),
    title: t('title'),
    description: t('description'),
    keywords: ['Wärmepumpe', 'Wartung', 'Service', 'München', 'Bayern', 'Heizung', 'Subscription', 'Festpreis', 'Heat Pump', 'Maintenance'],
    authors: [{ name: 'WARMANO GmbH' }],
    creator: 'WARMANO',
    publisher: 'WARMANO GmbH',
    robots: 'index, follow',
    alternates: {
      canonical: locale === 'de' ? 'https://warmano.de' : `https://warmano.de/${locale}`,
      languages: {
        de: 'https://warmano.de',
        en: 'https://warmano.de/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      url: 'https://warmano.de',
      siteName: 'WARMANO',
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'WARMANO - Wärmepumpen-Wartung & Service',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.jpg'],
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'de' | 'en')) {
    notFound()
  }

  // Providing all messages to the client side
  const messages = await getMessages()

  return (
    <html lang={locale} className={inter.variable}>
      <head>
        <StructuredData />
        <GoogleAnalytics />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <CookieBanner />
        <OdooLiveChat />
      </body>
    </html>
  )
}
