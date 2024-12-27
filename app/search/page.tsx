import { Suspense } from 'react'
import Search from '../components/search'
import LoadingSpinner from '../components/loading-spinner'

export default function SearchPage() {
  return (
    <main className="flex min-h-screen flex-col items-center px-4 sm:px-8 md:px-16 lg:px-24 bg-bg">
      <div className="w-full max-w-5xl">
        <h1 className="mt-8 mb-4 font-black text-4xl font-heading text-text shadow-shadow"><a href="/">丑搜 v3</a></h1>
        <Suspense fallback={<LoadingSpinner />}>
          <Search />
        </Suspense>
      </div>
    </main>
  )
}

