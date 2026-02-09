import { cacheLife } from 'next/cache'
import people from '@/app/data/people.json'

interface CachedComponentProps {
  personId: string
}

// Cached dynamic content - fetches data but caches it in the static shell
// Everyone sees the same cached data (revalidated every hour)
export default async function CachedComponent({ personId }: CachedComponentProps) {
  'use cache'
  cacheLife('hours')

  const person = people.find(p => p.id === personId)

  if (!person) return null

  // Simulate fetching related people (cached for all users)
  const relatedPeople = people
    .filter(p => p.id !== personId)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  // This timestamp will be cached and same for all users until revalidation
  const cachedAt = new Date().toISOString()

  return (
    <section className="px-6 py-8 border-b border-zinc-200 dark:border-zinc-800 bg-blue-50/50 dark:bg-blue-900/10">
      <div className="max-w-4xl mx-auto">
        {/* Cached Badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Cached Content
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            use cache + cacheLife(&apos;hours&apos;)
          </span>
        </div>

        {/* Quick Stats - Cached but dynamic data */}
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Profile Statistics
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{person.messages.filter(m => m.unread).length}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Unread Messages</p>
          </div>
          <div className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{person.messages.length}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Total Messages</p>
          </div>
          <div className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{Math.floor(Math.random() * 1000) + 500}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Connections</p>
          </div>
          <div className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-center">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{Math.floor(Math.random() * 50) + 10}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Projects</p>
          </div>
        </div>

        {/* Related People - Cached */}
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          People You May Know
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {relatedPeople.map((related) => (
            <a
              key={related.id}
              href={`/person/${related.id}`}
              className="group p-3 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {related.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-zinc-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {related.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {related.title.split(' ').slice(0, 3).join(' ')}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Cache Debug Info */}
        <div className="mt-6 p-3 rounded-lg bg-blue-900/80 text-blue-200 font-mono text-xs">
          <p className="text-blue-400 mb-1"># Cache Info (same for all users until revalidation)</p>
          <p>cached_at: <span className="text-blue-100">{cachedAt}</span></p>
          <p>cache_lifetime: <span className="text-blue-100">1 hour</span></p>
          <p>directive: <span className="text-blue-100">&apos;use cache&apos; + cacheLife(&apos;hours&apos;)</span></p>
        </div>
      </div>
    </section>
  )
}
