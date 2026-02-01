import type { Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#FF4D00',
  width: 'device-width',
  initialScale: 1,
}

// Root layout - minimal, just passes children to locale layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
