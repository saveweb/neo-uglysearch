"use client";

import { Input } from "@/components/ui/input";

export interface Props {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchBox(props: Props) {
  const { query, onChange } = props;
  return (
    <Input
      type="text"
      placeholder="输入搜索关键词..."
      value={query}
      onChange={onChange}
      className="w-full text-lg"
    />
  );
}

export default SearchBox;
