import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-zinc-900 dark:text-white">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-zinc-700 dark:text-zinc-300">
          Person Not Found
        </h2>
        <p className="mt-2 text-zinc-500 dark:text-zinc-400">
          The person you&apos;re looking for doesn&apos;t exist in our directory.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          &larr; Back to Directory
        </Link>
      </div>
    </main>
  )
}
