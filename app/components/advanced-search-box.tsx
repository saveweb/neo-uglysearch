"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";

export interface Props {
  value?: string;
  onChange?: (value: string, viewUpdate: any) => void;
}

export default function AdvancedSearchInput(props: Props) {
  const [value, setValue] =
    React.useState(`前端 (((id_feed=24 AND title STARTS WITH "科技爱好者周刊") OR 
    (title STARTS WITH "产品周刊") OR
    (link CONTAINS "blog.save-web.org" AND title CONTAINS "周报") OR 
    (link CONTAINS "pseudoyu.com" AND title CONTAINS "周报")
    ) AND id >= us(2025-1-1) AND id <= us(2025-1-11))`);
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
      extensions={[sql()]}
      onChange={onChange}
      style={{
        fontSize: "1.32em",
      }}
    />
  );
}
