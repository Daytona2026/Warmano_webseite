'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, Gift, Sparkles, ArrowRight, LogIn } from 'lucide-react'
import { Link } from '@/i18n/routing'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import LanguageSwitcher from '@/components/LanguageSwitcher'
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
  const [showBanner, setShowBanner] = useState(true)

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

  const scrollToPricing = () => {
    scrollToSection('pricing')
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
      {/* Promo Banner */}
      <AnimatePresence>
        {showBanner && !isScrolled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-gradient-to-r from-warmano-orange via-amber-500 to-warmano-orange overflow-hidden"
          >
            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />

            <div className="relative px-4 py-2">
              <div className="flex items-center justify-center gap-2 sm:gap-4 text-white text-xs sm:text-sm">
                {/* Icon - hidden on mobile */}
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="hidden sm:flex items-center justify-center w-6 h-6 bg-white/20 rounded-full"
                >
                  <Gift className="w-3 h-3" />
                </motion.div>

                {/* Text */}
                <div className="flex items-center gap-1.5 sm:gap-3 flex-wrap justify-center">
                  <span className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 sm:hidden" />
                    AKTION
                  </span>
                  <span className="text-white/60 hidden sm:inline">|</span>
                  <span className="font-medium">
                    3-Jahresvertrag: <span className="font-bold">1. Jahr GRATIS!</span>
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  onClick={scrollToPricing}
                  className="hidden md:flex items-center gap-1 bg-white/20 hover:bg-white/30 px-2.5 py-1 rounded-full text-xs font-semibold transition-all group"
                >
                  Sichern
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Close Button */}
                <button
                  onClick={() => setShowBanner(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Banner schließen"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
            <LanguageSwitcher />
            <a
              href="tel:+498999951433"
              className="flex items-center gap-2 text-sm text-warmano-gray-400 hover:text-warmano-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>089 99 95 14-133</span>
            </a>
            <a
              href="https://warmano.odoo.com/web/login"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-warmano-gray-400 hover:text-warmano-orange transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
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
                  href="tel:+498999951433"
                  className="flex items-center gap-2 py-3 text-warmano-gray-400 hover:text-warmano-orange transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  089 99 95 14-133
                </a>
                <a
                  href="https://warmano.odoo.com/web/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-3 text-warmano-gray-400 hover:text-warmano-orange transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  Kundenportal Login
                </a>
                <div className="py-3">
                  <LanguageSwitcher />
                </div>
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
