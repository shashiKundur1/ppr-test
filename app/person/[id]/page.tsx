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

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const person = people.find((p) => p.id === id)

  if (!person) {
    return {
      title: 'Person Not Found',
    }
  }

  return {
    title: `${person.name} - Famous People Directory`,
    description: `Contact information and details for ${person.name}, ${person.title}`,
  }
}

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const person = people.find((p) => p.id === id)

  if (!person) {
    notFound()
  }

  return (
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
  )
}
