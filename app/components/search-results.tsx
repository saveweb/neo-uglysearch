"use client";

import { useState, useEffect } from "react";
import { Link } from "next-view-transitions";
import { useInView } from "react-intersection-observer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingAnimation from "./loading-animation";
import { cleanContent } from "../utils/cleanContent";
import NotFoundAnimation from "./not-found-animation";
import { Switch } from "@/components/ui/switch";
import NoMoreAnimation from "./no-more-animation";
import { Sort } from "./search-box";

async function getSearchResults(query: string, page: number, sort: Sort) {
  const baseUrl = "https://search-api.saveweb.org/api/search";
  const url = new URL(baseUrl);
  const params = new URLSearchParams({
    q: query.trim(),
    f: "false",
    p: page.toString(),
    h: "true",
  });
  if (sort !== Sort.Relevance) {
    params.append("sort", sort);
  }
  url.search = params.toString();
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw new Error("Failed to fetch data. Please try again later.");
  }
}

export default function SearchResults({
  initialQuery,
  initialPage,
  sort,
}: {
  initialQuery: string;
  initialPage: number;
  sort: Sort;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [results, setResults] = useState<any[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noResults, setNoResults] = useState(false);
  const [apiMessage, setApiMessage] = useState<string | null>(null);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setResults([]);
    setPage(initialPage);
    setQuery(initialQuery);
    setError(null);
    setNoResults(false);
    setApiMessage(null);
    loadMore(true);
  }, [initialQuery, initialPage]);

  const [showContent, setShowContent] = useState(true);
  const handleToggle = () => {
    setShowContent((prev) => !prev);
  };

  useEffect(() => {
    if (inView && !noResults) {
      loadMore();
    }
  }, [inView]);

  const loadMore = async (reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await getSearchResults(
        query,
        reset ? initialPage : page,
        sort
      );
      setTotalHits(totalHits + (data?.hits?.length ?? 0));
      if (data.error) {
        setError(data.error);
      } else if (data.hits.length === 0) {
        setNoResults(true);
        if (data["humans.txt"]) {
          setApiMessage(data["humans.txt"]);
        }
      } else {
        const cleanedHits = data.hits.map((hit: any) => ({
          ...hit,
          content: cleanContent(hit.content),
        }));
        setResults((prevResults) =>
          reset ? cleanedHits : [...prevResults, ...cleanedHits]
        );
        setTotalHits(data.estimatedTotalHits);
        setPage((prevPage) => (reset ? initialPage + 1 : prevPage + 1));
        setNoResults(false);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="mt-8 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => loadMore(true)}>重试</Button>
      </div>
    );
  }

  if (noResults && totalHits === 0) {
    return (
      <div className="mt-8 mb-12 text-center">
        <p className="mb-4 font-heading text-lg">没有找到匹配的结果</p>

        <NotFoundAnimation />

        {apiMessage && (
          <p className="pt-12 text-sm text-gray-500 mt-2">{apiMessage}</p>
        )}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between">
        <div className="mb-4 font-base font-medium">
          {results.length > 0 ? `找到约 ${totalHits} 条结果` : "正在查询"}
        </div>
        <div>
          <label className="mx-2" htmlFor="show-desc">
            显示内容
          </label>
          <Switch
            id="show-desc"
            checked={showContent}
            onCheckedChange={handleToggle}
          />
        </div>
      </div>
      {results.map((hit: any) => (
        <Card key={`${hit.id}-${hit.date}`} className="mb-4 overflow-hidden">
          <CardHeader>
            <CardTitle>
              <Link
                href={hit.link}
                className="no-underline hover:underline leading-8	font-base font-bold"
                dangerouslySetInnerHTML={{
                  __html: hit.title.replace(
                    /<span class="uglyHighlight text-purple-500">/g,
                    '<span class="uglyHighlight">'
                  ),
                }}
              />
            </CardTitle>
            <section className="text-sm mt-1 break-all overflow-hidden flex flex-col sm:flex-row sm:justify-between">
              <div className="flex-1 truncate font-mono mb-1 sm:mb-0">
                {decodeURI(hit.link).replace(/ /g, "%20")}
              </div>
              <div className="flex items-center justify-end">
                {hit.author && (
                  <div className="mr-2">
                    作者：
                    <span
                      dangerouslySetInnerHTML={{
                        __html: hit.author
                          .replace(/text-purple-500/g, "text-rose-500")
                          .slice(1)
                          .trim(),
                      }}
                    ></span>
                  </div>
                )}
                <div>
                  日期：
                  <time dateTime={hit.date} suppressHydrationWarning>
                    {new Date(hit.date * 1000).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </section>
          </CardHeader>
          <CardContent className={showContent ? "" : "hidden"}>
            <CardDescription
              dangerouslySetInnerHTML={{
                __html: hit.content /* .replace(/</g, "&lt;") */
                  .replace(
                    /<span class="uglyHighlight text-purple-500">/g,
                    '<span class="uglyHighlight">'
                  ),
              }}
            />
          </CardContent>
        </Card>
      ))}
      {loading && <LoadingAnimation />}
      {!noResults && <div ref={ref} className="h-10" />}
      {noResults && totalHits > 0 && (
        <div className="mt-8 mb-12 text-center">
          <p className="font-heading text-lg">没有更多结果了</p>
          <NoMoreAnimation />
        </div>
      )}
    </div>
  );
}
