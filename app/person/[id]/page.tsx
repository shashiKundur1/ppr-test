import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import StaticComponent from '@/app/components/StaticComponent'
import CachedComponent from '@/app/components/CachedComponent'
import DynamicComponent from '@/app/components/DynamicComponent'
import LoadingFallback from '@/app/components/LoadingFallback'
import people from '@/app/data/people.json'

// Generate static params for all 100 people - enables static indexing
export async function generateStaticParams() {
  return people.map((person) => ({
    id: person.id,
  }))
}

// Helper to mask sensitive info for meta description
function maskEmail(email: string) {
  const [local, domain] = email.split('@')
  return `${local.slice(0, 3)}***@${domain}`
}

function maskPhone(phone: string) {
  return `${phone.slice(0, 6)}****`
}

// Generate SEO-optimized metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const person = people.find((p) => p.id === id)

  if (!person) {
    return {
      title: 'Person Not Found',
    }
  }

  const title = `${person.name} Email & Phone Number | Contact Info`
  const description = `How to contact ${person.name}? ${person.title}. Email: ${maskEmail(person.email)} | Phone: ${maskPhone(person.phone)}. Get verified contact information.`

  return {
    title,
    description,
    keywords: [
      person.name,
      `${person.name} email`,
      `${person.name} phone number`,
      `${person.name} contact`,
      `how to contact ${person.name}`,
      person.title,
    ],
    authors: [{ name: person.name }],
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `https://ppr-test-eight.vercel.app/person/${id}`,
      siteName: 'Famous People Directory',
      images: [
        {
          url: `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=400&background=3b82f6&color=fff&bold=true`,
          width: 400,
          height: 400,
          alt: person.name,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `https://ppr-test-eight.vercel.app/person/${id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const person = people.find((p) => p.id === id)

  if (!person) {
    notFound()
  }

  // JSON-LD Structured Data for rich search results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    jobTitle: person.title,
    email: person.email,
    telephone: person.phone,
    url: `https://ppr-test-eight.vercel.app/person/${id}`,
    image: `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&size=400&background=3b82f6&color=fff&bold=true`,
    sameAs: [],
    worksFor: {
      '@type': 'Organization',
      name: person.title.split(' of ')[1] || person.title.split(' at ')[1] || 'Various',
    },
  }

  // BreadcrumbList for better navigation in search
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ppr-test-eight.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: person.name,
        item: `https://ppr-test-eight.vercel.app/person/${id}`,
      },
    ],
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <main className="min-h-screen bg-zinc-50 dark:bg-black">
        {/* 1. STATIC CONTENT - prerendered automatically into static shell */}
        <StaticComponent personId={id} />

        {/* 2. CACHED DYNAMIC CONTENT - uses 'use cache' + cacheLife */}
        {/* Included in static shell, revalidated every hour */}
        {/* Same for all users until cache expires */}
        <CachedComponent personId={id} />

        {/* 3. RUNTIME DYNAMIC CONTENT - streams at request time */}
        {/* Personalized per request, wrapped in Suspense */}
        <Suspense fallback={<LoadingFallback />}>
          <DynamicComponent personId={id} />
        </Suspense>
      </main>
    </>
  )
}
