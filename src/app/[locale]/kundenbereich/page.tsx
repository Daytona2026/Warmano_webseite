import { Metadata } from 'next'
import Header from '@/components/sections/Header'
import Footer from '@/components/sections/Footer'
import CustomerDashboard from '@/components/sections/CustomerDashboard'

export const metadata: Metadata = {
  title: 'Kundenbereich | WARMANO',
  description: 'Sehen Sie Ihre Rechnungen, Verträge und Support-Tickets ein.',
}

export default function KundenbereichPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <CustomerDashboard />
      </main>
      <Footer />
    </>
  )
}
