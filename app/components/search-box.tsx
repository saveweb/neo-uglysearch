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

export interface Props {
  query: string;
  initAdvancedSearch: boolean;
  onChange: (s: string) => void;
  onSortChange: (sort: Sort) => void;
  onHumanEraChange?: (enabled: boolean) => void;
}

export enum Sort {
  Relevance = "relevance",
  DateDesc = "date:desc",
  DateAsc = "date:asc",
  IdDesc = "id:desc",
  IdAsc = "id:asc",
}

export const PRE_2023_DATE_FILTER = "date < sec(2023-01-01)";

export default function Search(props: Props) {
  const [useAdvancedSearch, setUseAdvancedSearch] = React.useState(
    props.initAdvancedSearch
  );
  const [isQueryMode, setIsQueryMode] = React.useState(
    props.initAdvancedSearch && !getCachedFilterRule(props.query)
  );
  const [sort, setSort] = React.useState<Sort>(Sort.Relevance);
  const [humanEraEnabled, setHumanEraEnabled] = React.useState(false);
  
  useEffect(() => {
    props.onSortChange(sort);
  }, [sort]);

  useEffect(() => {
    if (props.onHumanEraChange) {
      props.onHumanEraChange(humanEraEnabled);
    }
  }, [humanEraEnabled]);



  return (
    <div className="w-full font-semibold">
      <div className="flex flex-row items-center justify-end mb-2">
        <div className="mr-auto hidden md:block">
          <ManualDialog />
        </div>
        <label className="mr-2 flex items-center gap-2" htmlFor="human-era">
          <Clock className="h-4 w-4" />
          <span className="text-sm">人类时代</span>
        </label>
        <Switch
          className="inline-block mr-2"
          id="human-era"
          checked={humanEraEnabled}
          onCheckedChange={setHumanEraEnabled}
          title="搜索 2023 年以前的内容（人类时代）"
        />
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
