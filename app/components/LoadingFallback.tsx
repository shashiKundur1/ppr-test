export default function LoadingFallback() {
  return (
    <div className="px-6 py-8 bg-gradient-to-b from-transparent to-zinc-50 dark:to-zinc-800/30 animate-pulse">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Loading Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Loading Dynamic Content...
          </span>
        </div>

        {/* Contact Skeleton */}
        <section>
          <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-700 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-700 rounded mb-2"></div>
              <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-700 rounded mb-2"></div>
              <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
            </div>
          </div>
        </section>

        {/* Messages Skeleton */}
        <section>
          <div className="h-6 w-40 bg-zinc-200 dark:bg-zinc-700 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-64 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                    <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                    <div className="h-3 w-3/4 bg-zinc-100 dark:bg-zinc-800 rounded"></div>
                  </div>
                  <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-700 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Debug Skeleton */}
        <div className="p-4 rounded-lg bg-zinc-900 dark:bg-black">
          <div className="space-y-2">
            <div className="h-3 w-32 bg-zinc-700 rounded"></div>
            <div className="h-3 w-48 bg-zinc-800 rounded"></div>
            <div className="h-3 w-56 bg-zinc-800 rounded"></div>
            <div className="h-3 w-40 bg-zinc-800 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
