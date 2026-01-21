"use client";

import BasicSearchBox from "./basic-search-box";
import AdvancedSearchInput from "./advanced-search-box";
import { Switch } from "@/components/ui/switch";
import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Code, Clock } from "lucide-react";
import ManualDialog from "./manual-dialog";
import AdvancedFilterBuilder, { getCachedFilterRule } from "./filter-sphere";
import { Button } from "@/components/ui/button";

export interface Props {
  query: string;
  initAdvancedSearch: boolean;
  onChange: (s: string) => void;
  onSortChange: (sort: Sort) => void;
}

export enum Sort {
  Relevance = "relevance",
  DateDesc = "date:desc",
  DateAsc = "date:asc",
  IdDesc = "id:desc",
  IdAsc = "id:asc",
}

const PRE_2023_DATE_FILTER = "date < sec(2023-01-01)";

export default function Search(props: Props) {
  const [useAdvancedSearch, setUseAdvancedSearch] = React.useState(
    props.initAdvancedSearch
  );
  const [isQueryMode, setIsQueryMode] = React.useState(
    props.initAdvancedSearch && !getCachedFilterRule(props.query)
  );
  const [sort, setSort] = React.useState<Sort>(Sort.Relevance);
  useEffect(() => {
    props.onSortChange(sort);
  }, [sort]);

  const handlePre2023Search = () => {
    const currentQuery = props.query.trim();
    const dateFilter = `(${PRE_2023_DATE_FILTER})`;
    
    // Check if the query already contains the pre-2023 date filter
    if (currentQuery.includes(PRE_2023_DATE_FILTER)) {
      // Already has the filter, no need to add again
      return;
    }
    
    // Check if current query already has a filter (ends with parenthesis)
    if (currentQuery.endsWith(")")) {
      // Extract simple query and existing filter
      const firstParen = currentQuery.indexOf("(");
      if (firstParen !== -1) {
        const simpleQuery = currentQuery.substring(0, firstParen).trim();
        const existingFilter = currentQuery.substring(firstParen);
        // Combine filters with AND
        const combinedFilter = `(${existingFilter.slice(1, -1)} AND ${PRE_2023_DATE_FILTER})`;
        const newQuery = simpleQuery ? `${simpleQuery} ${combinedFilter}` : combinedFilter;
        props.onChange(newQuery);
      } else {
        // Should not happen, but fallback
        props.onChange(`${currentQuery} ${dateFilter}`);
      }
    } else {
      // Simple query or empty, append filter
      const newQuery = currentQuery ? `${currentQuery} ${dateFilter}` : dateFilter;
      props.onChange(newQuery);
    }
    
    setUseAdvancedSearch(true);
    setIsQueryMode(true);
  };

  return (
    <div className="w-full font-semibold">
      <div className="flex flex-row items-center justify-end mb-2">
        <div className="mr-auto hidden md:block">
          <ManualDialog />
        </div>
        <Button
          variant="reverse"
          size="sm"
          onClick={handlePre2023Search}
          className="mr-2"
          title="搜索 2023 年以前的内容（人类时代）"
        >
          <Clock className="h-4 w-4" />
          人类时代
        </Button>
        {useAdvancedSearch && (
          <>
            <Toggle
              aria-label="Toggle query mode"
              id="query-mode"
              size="sm"
              defaultPressed={!isQueryMode}
              variant="neutral"
              onPressedChange={(pressed) => setIsQueryMode(!pressed)}
            >
              <Code strokeWidth={3.2} />
              Query
            </Toggle>
          </>
        )}
        <label className="mx-2 ms-4" htmlFor="use-advanced">
          高级搜索
        </label>
        <Switch
          className="inline-block"
          id="use-advanced"
          checked={useAdvancedSearch}
          onCheckedChange={(prev) => setUseAdvancedSearch(prev)}
        />
        <div className="flex flex-row items-center">
          <label className="mx-2" htmlFor="">
            排序方式
          </label>
          <Select
            value={sort}
            onValueChange={(value) => setSort(value as Sort)}
          >
            <SelectTrigger className="w-[120px] md:w-[160px]">
              <SelectValue placeholder="默认相关性" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="relevance">相关性</SelectItem>
                <SelectLabel
                  style={{
                    marginInlineStart: "-3ch",
                  }}
                >
                  文章元数据
                </SelectLabel>
                <SelectItem value="date:desc">最新发布</SelectItem>
                <SelectItem value="date:asc">最早发布</SelectItem>
                <SelectLabel
                  style={{
                    marginInlineStart: "-3ch",
                  }}
                >
                  收录时间
                </SelectLabel>
                <SelectItem value="id:desc">最新收录</SelectItem>
                <SelectItem value="id:asc">最早收录</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {useAdvancedSearch ? (
        isQueryMode ? (
          <AdvancedSearchInput value={props.query} onChange={props.onChange} />
        ) : (
          <AdvancedFilterBuilder
            value={props.query}
            onChange={props.onChange}
          />
        )
      ) : (
        <BasicSearchBox query={props.query} handleChange={props.onChange} />
      )}
      {/* <Button size="lg" type="submit">搜索</Button> */}
    </div>
  );
}
