'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Linkedin, Instagram, Heart } from 'lucide-react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

const footerLinks = {
  services: [
    { name: 'Wartung', href: '/#services' },
    { name: 'Preise', href: '/#pricing' },
    { name: 'Buchen', href: '/#booking' },
    { name: 'FAQ', href: '/#faq' },
  ],
  company: [
    { name: 'Über uns', href: '/#' },
    { name: 'Kontakt', href: '/#booking' },
  ],
  legal: [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' },
  ],
}

// Munich Skyline SVG component
function MunichSkyline() {
  return (
    <svg
      viewBox="0 0 1200 200"
      className="w-full h-auto opacity-[0.03] absolute bottom-0 left-0 right-0"
      preserveAspectRatio="xMidYMax slice"
    >
      {/* Frauenkirche (twin towers) */}
      <path
        d="M200 200V100 M200 100L200 60 C200 50 210 40 210 30 L210 20 L190 20 L190 30 C190 40 200 50 200 60 M180 200V110 H220 V200"
        fill="currentColor"
      />
      <path
        d="M260 200V100 M260 100L260 60 C260 50 270 40 270 30 L270 20 L250 20 L250 30 C250 40 260 50 260 60 M240 200V110 H280 V200"
        fill="currentColor"
      />
      {/* Frauenkirche main building */}
      <rect x="170" y="120" width="120" height="80" fill="currentColor" />

      {/* Neues Rathaus */}
      <rect x="350" y="80" width="100" height="120" fill="currentColor" />
      <rect x="380" y="40" width="40" height="40" fill="currentColor" />
      <polygon points="400,10 370,40 430,40" fill="currentColor" />

      {/* Olympic Tower */}
      <rect x="550" y="30" width="8" height="170" fill="currentColor" />
      <ellipse cx="554" cy="60" rx="25" ry="15" fill="currentColor" />
      <ellipse cx="554" cy="80" rx="20" ry="10" fill="currentColor" />

      {/* BMW Tower (4 cylinders) */}
      <rect x="680" y="60" width="20" height="140" fill="currentColor" />
      <rect x="705" y="50" width="20" height="150" fill="currentColor" />
      <rect x="730" y="55" width="20" height="145" fill="currentColor" />
      <rect x="755" y="65" width="20" height="135" fill="currentColor" />

      {/* Generic buildings */}
      <rect x="50" y="140" width="60" height="60" fill="currentColor" />
      <rect x="850" y="100" width="80" height="100" fill="currentColor" />
      <rect x="950" y="120" width="60" height="80" fill="currentColor" />
      <rect x="1030" y="90" width="70" height="110" fill="currentColor" />
      <rect x="1120" y="130" width="50" height="70" fill="currentColor" />

      {/* Alps in background (very subtle) */}
      <path
        d="M0 200 L100 150 L200 180 L350 130 L500 160 L650 120 L800 150 L950 100 L1100 140 L1200 120 V200 Z"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="relative bg-warmano-black border-t border-warmano-gray-800 overflow-hidden">
      {/* Munich Skyline Background */}
      <MunichSkyline />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-warmano-black via-warmano-black/95 to-warmano-black/80 pointer-events-none" />

      <Container className="relative z-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <motion.a
              href="#"
              className="inline-block mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-3xl font-bold text-warmano-white tracking-tight">
                WARMANO
                <span className="text-warmano-orange">.</span>
              </span>
            </motion.a>
            <p className="text-warmano-gray-500 text-xs mb-2">
              Eine Marke der Bavaria Heizungstechnik GmbH
            </p>
            <p className="text-warmano-gray-400 mb-6 max-w-sm leading-relaxed">
              Professionelle Wärmepumpen-Wartung mit transparenten Preisen, digitalem
              Scheckheft und schnellen Terminen.
            </p>

            {/* Contact info with hover effects */}
            <div className="space-y-3">
              <motion.a
                href="tel:+498999951433"
                className="flex items-center gap-3 text-warmano-gray-400 hover:text-warmano-orange transition-colors group"
                whileHover={{ x: 4 }}
              >
                <div className="w-9 h-9 rounded-lg bg-warmano-gray-800/50 flex items-center justify-center group-hover:bg-warmano-orange/10 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">089 99 95 14-133</span>
              </motion.a>
              <motion.a
                href="mailto:info@warmano.de"
                className="flex items-center gap-3 text-warmano-gray-400 hover:text-warmano-orange transition-colors group"
                whileHover={{ x: 4 }}
              >
                <div className="w-9 h-9 rounded-lg bg-warmano-gray-800/50 flex items-center justify-center group-hover:bg-warmano-orange/10 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">info@warmano.de</span>
              </motion.a>
              <div className="flex items-center gap-3 text-warmano-gray-400">
                <div className="w-9 h-9 rounded-lg bg-warmano-orange/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-warmano-orange" />
                </div>
                <span className="text-sm font-medium">München & Umland</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-warmano-white uppercase tracking-wider mb-5">
              Leistungen
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-warmano-gray-400 hover:text-warmano-orange transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-warmano-white uppercase tracking-wider mb-5">
              Unternehmen
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-warmano-gray-400 hover:text-warmano-orange transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-warmano-white uppercase tracking-wider mb-5">
              Rechtliches
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-warmano-gray-400 hover:text-warmano-orange transition-colors inline-block hover:translate-x-1 transform duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-warmano-gray-800/50 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm text-warmano-gray-500 flex items-center gap-1.5 flex-wrap">
            &copy; {new Date().getFullYear()} Bavaria Heizungstechnik GmbH. Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500 inline" />
            in München.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <motion.a
              href="#"
              className="w-11 h-11 rounded-xl bg-warmano-gray-800/50 border border-warmano-gray-700/50 flex items-center justify-center text-warmano-gray-400 hover:text-warmano-orange hover:border-warmano-orange/30 hover:bg-warmano-orange/10 transition-all"
              aria-label="LinkedIn"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              className="w-11 h-11 rounded-xl bg-warmano-gray-800/50 border border-warmano-gray-700/50 flex items-center justify-center text-warmano-gray-400 hover:text-warmano-orange hover:border-warmano-orange/30 hover:bg-warmano-orange/10 transition-all"
              aria-label="Instagram"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Instagram className="w-5 h-5" />
            </motion.a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
