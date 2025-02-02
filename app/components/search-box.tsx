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
import ManualDialog from "./manual-dialog";
import AdvancedFilterBuilder from "./filter-sphere";

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

export default function Search(props: Props) {
  const [useAdvancedSearch, setUseAdvancedSearch] = React.useState(
    props.initAdvancedSearch
  );
  const [isExpertMode, setIsExpertMode] = React.useState(
    props.initAdvancedSearch
  );
  const [sort, setSort] = React.useState<Sort>(Sort.Relevance);
  useEffect(() => {
    props.onSortChange(sort);
  }, [sort]);

  return (
    <div className="w-full font-semibold">
      <div className="flex flex-row items-center justify-end mb-2">
        <div className="mr-auto hidden md:block">
          <ManualDialog />
        </div>
        {useAdvancedSearch && (
          <>
            <label className="mx-2" htmlFor="expert-mode">
              专家模式
            </label>
            <Switch
              className="inline-block"
              id="expert-mode"
              checked={isExpertMode}
              onCheckedChange={(prev) => setIsExpertMode(prev)}
            />
          </>
        )}
        <label className="mx-2" htmlFor="use-advanced">
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
        isExpertMode ? (
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
