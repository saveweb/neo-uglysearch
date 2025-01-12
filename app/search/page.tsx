import { Suspense } from 'react'
import Search from '../components/search'
import LoadingSpinner from '../components/loading-spinner'
import ManualDialog from '../components/manual-dialog'

export default function SearchPage() {
  return (
    <main className="flex min-h-screen flex-col items-center sm:px-2 md:px-4 sm:px-8 md:px-16 lg:px-24 bg-bg">
      <div className="w-full max-w-5xl">
        <h1 className="mt-8 mb-4 font-black text-4xl font-heading text-text shadow-shadow relative">
          <img src="/neosearch.svg" alt="NeoSearch" className="w-24 h-24 inline-block mr-2 absolute move-lr" />
          <a className='no-underline' href="/">丑搜 v3</a>
          <div className="float-end block md:hidden pr-4" style={{ marginTop: "-1rem" }}>
            <ManualDialog />
          </div>
        </h1>
        <Suspense fallback={<LoadingSpinner />}>
          <Search />
        </Suspense>
      </div>
    </main>
  )
}

