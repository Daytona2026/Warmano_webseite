export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'WARMANO',
    description: 'Professionelle Wärmepumpen-Wartung & Service in München',
    url: 'https://warmano.de',
    telephone: '+49-89-123456789',
    email: 'info@warmano.de',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'München',
      addressRegion: 'Bayern',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.1351,
      longitude: 11.582,
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 48.1351,
        longitude: 11.582,
      },
      geoRadius: '50000',
    },
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    sameAs: ['https://www.linkedin.com/company/warmano', 'https://www.instagram.com/warmano'],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Wärmepumpen-Wartung',
    description: 'Professionelle Wartung und Service für alle Wärmepumpen-Marken',
    provider: {
      '@type': 'LocalBusiness',
      name: 'WARMANO',
    },
    areaServed: {
      '@type': 'City',
      name: 'München',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Wartungspakete',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Basis Wartungspaket',
          price: '249',
          priceCurrency: 'EUR',
          description: '1x jährliche Wartung, digitales Scheckheft, Notfall-Hotline',
        },
        {
          '@type': 'Offer',
          name: 'Standard Wartungspaket',
          price: '349',
          priceCurrency: 'EUR',
          description:
            '1x jährliche Wartung, priorisierte Terminierung, kostenlose Reparaturen bis 100€',
        },
        {
          '@type': 'Offer',
          name: 'Premium Wartungspaket',
          price: '499',
          priceCurrency: 'EUR',
          description: '1x jährliche Wartung, 24/7 Notfall-Service, kostenlose Reparaturen bis 250€',
        },
      ],
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Welche Wärmepumpen-Marken warten Sie?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wir warten alle gängigen Marken wie Viessmann, Bosch, Vaillant, Daikin, Mitsubishi, Panasonic, Stiebel Eltron und viele mehr.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie schnell bekomme ich einen Termin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mit dem Basis-Paket erhalten Sie einen Termin innerhalb von 10 Tagen, mit Standard in 3-5 Tagen und mit Premium bereits in 1-2 Tagen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Bleibt meine Herstellergarantie erhalten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, unsere Wartungen werden nach Herstellervorgaben durchgeführt und vollständig dokumentiert. Das digitale Scheckheft dient als Nachweis für den Garantieerhalt.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
