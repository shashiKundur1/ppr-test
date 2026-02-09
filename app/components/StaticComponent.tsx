import Link from 'next/link'
import people from '@/app/data/people.json'

interface StaticComponentProps {
  personId?: string
  showPeopleList?: boolean
}

export default function StaticComponent({ personId, showPeopleList = false }: StaticComponentProps) {
  const person = personId ? people.find(p => p.id === personId) : null

  return (
    <div className="bg-white dark:bg-zinc-900">
      {/* Hero Section - Always Static */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-4 inline-block">
            &larr; Back to Directory
          </Link>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mt-2">
            Famous People Directory
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Next.js Cache Components Demo - Testing Partial Prerendering
          </p>
          <div className="mt-4 flex gap-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Static Shell
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
              Pre-rendered at Build Time
            </span>
          </div>
        </div>
      </header>

      {/* Person Static Info - If viewing a person */}
      {person && (
        <section className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                {person.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {person.name}
                </h2>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mt-1">
                  {person.title}
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Profile ID: {person.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* About This Demo - Static */}
      <section className="border-b border-zinc-200 dark:border-zinc-800 px-6 py-6 bg-zinc-50 dark:bg-zinc-800/50">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
            About This Demo
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            This page demonstrates Next.js 16&apos;s Cache Components feature. The content above this section is
            <strong className="text-zinc-900 dark:text-white"> statically pre-rendered</strong> at build time and served instantly.
            The contact details and messages below are <strong className="text-zinc-900 dark:text-white">dynamically streamed</strong> at
            request time, wrapped in Suspense boundaries.
          </p>
        </div>
      </section>

      {/* People List - Only shown on home page */}
      {showPeopleList && (
        <section className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6">
              Browse {people.length} Famous People
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {people.map((p) => (
                <Link
                  key={p.id}
                  href={`/person/${p.id}`}
                  className="group flex items-center gap-3 p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                    {p.avatar}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {p.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {p.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
