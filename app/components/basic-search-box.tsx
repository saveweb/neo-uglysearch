"use client";

import { Input } from "@/components/ui/input";

export interface Props {
  query: string;
  handleChange: (s: string) => void;
}

function SearchBox(props: Props) {
  const { query, handleChange } = props;
  return (
    <Input
      type="text"
      placeholder="输入搜索关键词..."
      value={query}
      handleChange={handleChange}
      className="w-full text-lg"
    />
  );
}

export default SearchBox;
