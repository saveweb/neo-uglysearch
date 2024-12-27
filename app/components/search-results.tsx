'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import LoadingAnimation from "./loading-animation"
import LoadingSpinner from './loading-spinner'
import { cleanContent } from '../utils/cleanContent'
import NotFoundAnimation from "./not-found-animation"

async function getSearchResults(query: string, page: number) {
  try {
    const res = await fetch(`https://search-api.saveweb.org/api/search?q=${encodeURIComponent(query)}&f=false&p=${page}&h=true`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    return await res.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw new Error('Failed to fetch data. Please try again later.')
  }
}

export default function SearchResults({ initialQuery, initialPage }: { initialQuery: string, initialPage: number }) {
  const [query, setQuery] = useState(initialQuery)
  const [page, setPage] = useState(initialPage)
  const [results, setResults] = useState<any[]>([])
  const [totalHits, setTotalHits] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [noResults, setNoResults] = useState(false)
  const [apiMessage, setApiMessage] = useState<string | null>(null)

  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    setResults([])
    setPage(initialPage)
    setQuery(initialQuery)
    setError(null)
    setNoResults(false)
    setApiMessage(null)
    loadMore(true)
  }, [initialQuery, initialPage])

  useEffect(() => {
    if (inView && !noResults) {
      loadMore()
    }
  }, [inView])

  const loadMore = async (reset = false) => {
    if (loading) return
    setLoading(true)
    try {
      const data = await getSearchResults(query, reset ? initialPage : page)
      if (data.error) {
        setError(data.error)
      } else if (data.hits.length === 0) {
        setNoResults(true)
        setTotalHits(0)
        if (data['humans.txt']) {
          setApiMessage(data['humans.txt'])
        }
      } else {
        const cleanedHits = data.hits.map((hit: any) => ({
          ...hit,
          content: cleanContent(hit.content)
        }))
        setResults(prevResults => reset ? cleanedHits : [...prevResults, ...cleanedHits])
        setTotalHits(data.estimatedTotalHits)
        setPage(prevPage => reset ? initialPage + 1 : prevPage + 1)
        setNoResults(false)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="mt-8 text-center">
        <p className="text-red-500 mb-4">错误: {error}</p>
        <Button onClick={() => loadMore(true)}>重试</Button>
      </div>
    )
  }

  if (noResults) {
    return (
      <div className="mt-8 text-center">
        <p className="mb-4 font-base">没有找到匹配的结果</p>
        
          <NotFoundAnimation />
        
        {apiMessage && (
          <p className="pt-12 text-sm text-gray-500 mt-2">{apiMessage}</p>
        )}
      </div>
    )
  }

  return (
    <div className="mt-8">
      {results.length > 0 && <p className="mb-4 font-base">找到约 {totalHits} 条结果</p>}
      {results.map((hit: any) => (
        <Card key={`${hit.id}-${hit.date}`} className="mb-4 overflow-hidden">
          <CardHeader>
            <CardTitle>
              <Link
                href={hit.link}
                className="hover:underline"
                dangerouslySetInnerHTML={{
                  __html: hit.title.replace(
                    /<span class="uglyHighlight text-purple-500">/g,
                    '<span style="background-color: #E4B7A0;">'
                  )
                }}
              />
            </CardTitle>
            <p className="text-sm mt-1 break-all overflow-hidden">
              {hit.link}
            </p>
          </CardHeader>
          <CardContent>
            <CardDescription
              dangerouslySetInnerHTML={{
                __html: hit.content.replace(
                  /<span class="uglyHighlight text-purple-500">/g,
                  '<span style="background-color: #E4B7A0;">'
                )
              }}
            />
          </CardContent>
          <CardFooter>
            <p className="text-sm">
              {hit.author && hit.author.startsWith(';') && hit.author.slice(1).trim() && (
                <>作者: {hit.author.slice(1).trim()} | </>
              )}
              日期: {new Date(hit.date * 1000).toLocaleDateString()}
            </p>
          </CardFooter>
        </Card>
      ))}
      {loading &&
        
          <LoadingAnimation />
        
      }
      {!noResults && <div ref={ref} className="h-10" />}
    </div>
  )
}

