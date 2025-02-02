import { defineTypedFn, FnSchema, presetFilter } from "@fn-sphere/filter";
import { z } from "zod";
import { zhCN } from "@fn-sphere/filter/locales";

export const filterSchema = z.object({
  title: z.string().describe("文章标题"),
  author: z.array(z.string()).describe("文章作者"),
  tags: z.array(z.string()).describe("文章标签"),
  content: z.string().describe("文章内容"),
  date: z.date().describe("发布时间"),
  link: z.string().describe("文章链接"),
  content_length: z.number().describe("文章字数"),
  id: z.string().describe("ID"),
  id_feed: z.number().describe("Feed ID"),
});

const notStartsWithFilter = defineTypedFn({
  name: "notStartsWith",
  define: z.function().args(z.string(), z.coerce.string()).returns(z.boolean()),
  // Just a placeholder since we don't need filter data at frontend.
  implement: () => false,
});

const filterPriority = [
  "contains",
  "notContains",
  "startsWith",
  "notStartsWith",
];

export const filterFnList: FnSchema[] = [
  ...presetFilter.filter((fn) => fn.name !== "endsWith"),
  notStartsWithFilter,
].sort((a, b) => {
  const indexA = filterPriority.indexOf(a.name);
  const indexB = filterPriority.indexOf(b.name);
  return (
    (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB)
  );
});

const locale: Record<string, string> = {
  ...zhCN,
  startsWith: "以...开始",
  notStartsWith: "不以...开始",
};

export const getLocaleText = (key: string): string => {
  if (!(key in locale)) return key;
  return locale[key];
};
