import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import TrustSection from '@/components/sections/TrustSection'
import ProblemSection from '@/components/sections/ProblemSection'
import SolutionSection from '@/components/sections/SolutionSection'
import PricingSection from '@/components/sections/PricingSection'
import PricingComparison from '@/components/sections/PricingComparison'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import BookingWidget from '@/components/sections/BookingWidget'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* 1. Hook: Starke Headline + Preis + CTA */}
        <Hero />

        {/* 2. Trust: Marken + Vertrauen */}
        <TrustSection />

        {/* 3. Problem: Warum ist es schwierig? */}
        <ProblemSection />

        {/* 4. Lösung: Wie wir es besser machen */}
        <SolutionSection />

        {/* 5. Social Proof: Kundenbewertungen */}
        <TestimonialsSection />

        {/* 6. Pricing: Pakete auswählen */}
        <PricingSection />

        {/* 6b. Pricing Comparison: Details vergleichen */}
        <PricingComparison />

        {/* 7. Booking: Direkt buchen */}
        <BookingWidget />

        {/* 8. FAQ: Letzte Fragen klären */}
        <FAQSection />

        {/* 9. Final CTA */}
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
