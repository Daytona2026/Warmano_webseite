'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'So funktioniert\'s', href: 'services' },
  { name: 'Preise', href: 'pricing' },
  { name: 'Bewertungen', href: 'testimonials' },
  { name: 'FAQ', href: 'faq' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const scrollToBooking = () => {
    scrollToSection('booking')
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-warmano-black/95 backdrop-blur-lg border-b border-warmano-gray-800'
          : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold text-warmano-white tracking-tight group-hover:text-warmano-orange transition-colors">
              WARMANO
              <span className="text-warmano-orange group-hover:text-warmano-white transition-colors">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-warmano-gray-400 hover:text-warmano-white transition-colors"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+4989123456789"
              className="flex items-center gap-2 text-sm text-warmano-gray-400 hover:text-warmano-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>089 123 456 789</span>
            </a>
            <Button size="sm" onClick={scrollToBooking} className="shadow-glow-orange hover:shadow-glow-orange-lg transition-shadow">
              Jetzt buchen
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-warmano-gray-400 hover:text-warmano-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menü"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-warmano-black/95 backdrop-blur-lg border-b border-warmano-gray-800 overflow-hidden"
          >
            <Container className="py-4">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="py-3 text-left text-warmano-gray-300 hover:text-warmano-white transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                <hr className="my-2 border-warmano-gray-800" />
                <a
                  href="tel:+4989123456789"
                  className="flex items-center gap-2 py-3 text-warmano-gray-400 hover:text-warmano-orange transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  089 123 456 789
                </a>
                <Button className="mt-2 shadow-glow-orange" onClick={scrollToBooking}>
                  Jetzt buchen
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
