import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StructuredData from '@/components/StructuredData'
import CookieBanner from '@/components/CookieBanner'
import OdooLiveChat from '@/components/OdooLiveChat'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://warmano.de'),
  title: 'WARMANO | Professionelle Wärmepumpen-Wartung & Service',
  description: 'Ihr Partner für Wärmepumpen-Wartung in München. Transparente Festpreise, digitales Scheckheft, schnelle Termine. Ab 249€/Jahr als Subscription.',
  keywords: ['Wärmepumpe', 'Wartung', 'Service', 'München', 'Bayern', 'Heizung', 'Subscription', 'Festpreis'],
  authors: [{ name: 'WARMANO GmbH' }],
  creator: 'WARMANO',
  publisher: 'WARMANO GmbH',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://warmano.de',
    siteName: 'WARMANO',
    title: 'WARMANO | Professionelle Wärmepumpen-Wartung & Service',
    description: 'Ihr Partner für Wärmepumpen-Wartung in München. Transparente Festpreise, digitales Scheckheft, schnelle Termine.',
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
    title: 'WARMANO | Professionelle Wärmepumpen-Wartung & Service',
    description: 'Ihr Partner für Wärmepumpen-Wartung in München. Transparente Festpreise, digitales Scheckheft, schnelle Termine.',
    images: ['/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#FF4D00',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={inter.variable}>
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        {children}
        <CookieBanner />
        <OdooLiveChat />
      </body>
    </html>
  )
}
