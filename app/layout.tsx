import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})

const BASE_URL = 'https://cicloaysen.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Ciclo Aysén | Gestores de Capital Natural en Patagonia',
    template: '%s | Ciclo Aysén',
  },
  description:
    'Empresa ambiental especializada en mercado de carbono, economía azul, compliance ambiental y financiamiento climático. Región de Aysén, Patagonia Chilena.',
  keywords: [
    'empresa ambiental Aysén',
    'mercado de carbono Patagonia',
    'compliance ambiental Chile',
    'economía azul',
    'financiamiento climático',
    'gestión capital natural',
    'Ciclo Aysén',
    'Región de Aysén',
    'Patagonia',
  ],
  authors: [{ name: 'Ciclo Aysén SpA', url: BASE_URL }],
  creator: 'Ciclo Aysén SpA',
  publisher: 'Ciclo Aysén SpA',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: BASE_URL,
    siteName: 'Ciclo Aysén SpA',
    title: 'Ciclo Aysén | Gestores de Capital Natural en Patagonia',
    description:
      'Empresa ambiental: mercado carbono, economía azul, compliance ambiental. Aysén, Chile.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ciclo Aysén — Gestores de Capital Natural en Patagonia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ciclo Aysén | Gestores de Capital Natural en Patagonia',
    description: 'Empresa ambiental: mercado carbono, economía azul, compliance ambiental. Aysén, Chile.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: 'business',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Ciclo Aysén SpA',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.svg`,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'contacto@cicloaysen.com',
        contactType: 'customer service',
        availableLanguage: 'Spanish',
        areaServed: 'CL',
      },
      sameAs: [
        'https://www.instagram.com/cicloaysen',
        'https://www.linkedin.com/company/cicloaysen',
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${BASE_URL}/#localbusiness`,
      name: 'Ciclo Aysén SpA',
      description:
        'Empresa ambiental especializada en gestión de capital natural, mercado de carbono, economía azul y compliance ambiental en la Región de Aysén, Patagonia chilena.',
      url: BASE_URL,
      telephone: '+56987465044',
      email: 'contacto@cicloaysen.com',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Región de Aysén',
        addressCountry: 'CL',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -45.5752,
        longitude: -72.0662,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      priceRange: '$$',
      image: `${BASE_URL}/og-image.jpg`,
      '@parent': { '@id': `${BASE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
