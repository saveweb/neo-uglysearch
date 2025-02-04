"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchResults from "./search-results";
import debounce from "lodash.debounce";
import SearchBox, { Sort } from "./search-box";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  let initialQuery = decodeURIComponent(searchParams.get("q") || "");
  const authorQuery = decodeURIComponent(searchParams.get("author") || "");
  let simple = !!(searchParams.get("simple") || "");

  if (authorQuery) {
    initialQuery += ` (author=${authorQuery})`;
  }

  let initSort = decodeURIComponent(searchParams.get("sort") || "relevance");
  if (!initSort) initSort = "relevance";
  let [sort, setSort] = useState<Sort>(initSort as Sort);

  const [query, setQuery] = useState(initialQuery);

  const debouncedUpdateURL = useCallback(
    debounce((value: string) => {
      let h = `/search?q=${encodeURIComponent(value)}`;
      if (sort !== "relevance") {
        h += `&sort=${sort}`;
      }
      router.push(h, { scroll: false });
    }, 300),
    [sort]
  );

  function isAdvancedSearch(query: string) {
    return query.includes("(") && query.endsWith(")");
  }

  // 清理 debounce
  useEffect(() => {
    return () => {
      debouncedUpdateURL.cancel();
    };
  }, [debouncedUpdateURL]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.length) return
    const encodedQuery = encodeURIComponent(query);
    router.push(`/search?q=${encodedQuery}&sort=${sort}`, { scroll: false });
  };

  const handleInputChange = (s: string) => {
    if (s === query) return;
    setQuery(s);
    debouncedUpdateURL(s);
  };

  useEffect(() => {
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}&sort=${sort}`, {
        scroll: false,
      });
    }
  }, [sort]);

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className={`flex w-full items-center space-x-2 mx-auto${
          simple ? " hidden" : ""
        }`}
      >
        <SearchBox
          query={query}
          initAdvancedSearch={isAdvancedSearch(query)}
          onChange={handleInputChange}
          onSortChange={setSort}
        />
      </form>

      {query && (
        <SearchResults
          key={`${query}-${sort}`} // 添加 key 属性确保查询变化时重新渲染
          initialQuery={query} // 改用 query 替代 initialQuery
          initialPage={0}
          sort={sort}
        />
      )}
    </div>
  );
}
