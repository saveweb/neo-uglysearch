"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { EditorView } from "@codemirror/view";

export interface Props {
  value?: string;
  onChange?: (value: string, viewUpdate: any) => void;
}

export default function AdvancedSearchInput(props: Props) {
  /*
  title: str, 文章标题
  id: int, 文章被抓取入库的实际时间，以微秒计 (1/1,000,000)，UTC 时间
  id_feed: int, 文章所属的 feed ID
  author: list[str], 文章作者（注意是列表）
  tags: list[str], 文章标签（注意是列表）
  date: int, feed 自行声明的文章发布时间，以秒计，UTC 时间（注意时间直接取自 feed，可能不准确）
  content: str, 文章内容（markdown）
  link: str, 文章链接
  */
  const TABLES = [
    "id",
    "id_feed",
    "title",
    "author",
    "tags",
    "date",
    "content",
    "link",
  ].map((label) => ({ label }));
  const [value, setValue] = React.useState(
    props.value ??
      `前端 (((id_feed=24 AND title STARTS WITH "科技爱好者周刊") OR 
    (title STARTS WITH "产品周刊") OR
    (link CONTAINS "blog.save-web.org" AND title CONTAINS "周报") OR 
    (link CONTAINS "pseudoyu.com" AND title CONTAINS "周报")
    ) AND id >= us(2025-1-1) AND id <= us(2025-1-11))`
  );
  const onChange = React.useCallback((val: string, viewUpdate: any) => {
    console.log("val:", val);
    setValue(val);
    props.onChange && props.onChange(val, viewUpdate);
  }, []);
  return (
    <CodeMirror
      className="rounded-base border-2 font-base border-border bg-bw px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      value={value}
      minHeight="100px"
      maxHeight="400px"
      // theme={gruvboxLight}
      extensions={[
        sql({
          tables: TABLES,
        }),
        EditorView.lineWrapping,
      ]}
      onChange={onChange}
      style={{
        fontSize: "1.32em",
      }}
    />
  );
}
