import { connection } from 'next/server'
import people from '@/app/data/people.json'

interface DynamicComponentProps {
  personId: string
}

export default async function DynamicComponent({ personId }: DynamicComponentProps) {
  // Explicitly defer to request time - this makes the component dynamic
  await connection()

  // Simulate database/API latency
  await new Promise((resolve) => setTimeout(resolve, 1500))

  const person = people.find(p => p.id === personId)

  if (!person) {
    return (
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-500">Person not found</p>
        </div>
      </div>
    )
  }

  // Generate some "live" data
  const currentTime = new Date().toLocaleTimeString()
  const randomSessionId = crypto.randomUUID().slice(0, 8)

  return (
    <div className="px-6 py-8 bg-gradient-to-b from-transparent to-zinc-50 dark:to-zinc-800/30">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Dynamic Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 animate-pulse">
            Dynamic Content
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            Streamed at {currentTime}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            Session: {randomSessionId}
          </span>
        </div>

        {/* Contact Information */}
        <section>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Email</p>
              <p className="text-zinc-900 dark:text-white font-medium">{person.email}</p>
            </div>
            <div className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">Phone</p>
              <p className="text-zinc-900 dark:text-white font-medium">{person.phone}</p>
            </div>
          </div>
        </section>

        {/* Recent Messages */}
        <section>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            Recent Messages ({person.messages.length})
          </h3>
          <div className="space-y-3">
            {person.messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg border shadow-sm transition-all hover:shadow-md ${
                  message.unread
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                    : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                        {message.subject}
                      </h4>
                      {message.unread && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-blue-500 text-white">
                          New
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {message.preview}
                    </p>
                  </div>
                  <time className="text-xs text-zinc-500 dark:text-zinc-500 whitespace-nowrap">
                    {message.date}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Info */}
        <section className="p-4 rounded-lg bg-zinc-900 dark:bg-black text-green-400 font-mono text-sm">
          <p className="text-zinc-500 mb-2"># PPR Debug Info</p>
          <p>render_type: <span className="text-green-300">dynamic</span></p>
          <p>streamed_at: <span className="text-green-300">{new Date().toISOString()}</span></p>
          <p>person_id: <span className="text-green-300">{personId}</span></p>
          <p>session_id: <span className="text-green-300">{randomSessionId}</span></p>
          <p>simulated_delay: <span className="text-green-300">1500ms</span></p>
        </section>
      </div>
    </div>
  )
}
