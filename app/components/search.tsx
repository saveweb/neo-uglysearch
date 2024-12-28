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

  let initialQuery = searchParams.get('q') || ''
  const authorQuery = searchParams.get('author') || ''
  let simple = !!(searchParams.get('simple') || '')

  if (authorQuery) {
    initialQuery = `;${authorQuery} ${initialQuery}`
  }

  const [query, setQuery] = useState(initialQuery)

  const debouncedUpdateURL = useCallback(
    debounce((value: string) => {
      router.push(`/search?q=${encodeURIComponent(value)}`, { scroll: false })
    }, 300),
    []
  )

  // 清理 debounce
  useEffect(() => {
    return () => {
      debouncedUpdateURL.cancel()
    }
  }, [debouncedUpdateURL])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const encodedQuery = encodeURIComponent(query)
    router.push(`/search?q=${encodedQuery}`, { scroll: false })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    debouncedUpdateURL(value)
  }

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className={`flex w-full max-w-sm items-center space-x-2 mx-auto${simple ? " hidden" : ""}`}
      >
        <Input
          type="text"
          placeholder="输入搜索关键词..."
          value={query}
          onChange={handleInputChange}
          className="w-full text-lg"
        />
        <Button size="lg" type="submit">搜索</Button>
      </form>

      {query && (
        <SearchResults
          key={query} // 添加 key 属性确保查询变化时重新渲染
          initialQuery={query} // 改用 query 替代 initialQuery
          initialPage={0}
        />
      )}
    </div>
  )
}