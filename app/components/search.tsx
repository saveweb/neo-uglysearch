'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SearchResults from './search-results'
import debounce from 'lodash.debounce'

export default function Search() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery)

  const debouncedSetQuery = useCallback(
    debounce((value: string) => {
      setDebouncedQuery(value)
      router.push(`/search?q=${encodeURIComponent(value)}`, { scroll: false })
    }, 300),
    []
  )

  useEffect(() => {
    return () => {
      debouncedSetQuery.cancel()
    }
  }, [debouncedSetQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debouncedSetQuery(value)
  }

  return (
    <div>
      <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2 mx-auto">
        <Input
          type="text"
          placeholder="输入搜索关键词..."
          value={query}
          onChange={handleInputChange}
          className="w-full"
        />
        <Button type="submit">搜索</Button>
      </form>
      {debouncedQuery && <SearchResults initialQuery={debouncedQuery} initialPage={1} />}
    </div>
  )
}

