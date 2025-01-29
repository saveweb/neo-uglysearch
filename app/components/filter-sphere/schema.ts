import { defineTypedFn, FnSchema, presetFilter } from "@fn-sphere/filter";
import { z } from "zod";
import { zhCN } from "@fn-sphere/filter/locales";

export const filterSchema = z.object({
  id: z.string().describe("ID"),
  title: z.string().describe("文章标题"),
  id_feed: z.number().describe("Feed ID"),
  author: z.array(z.string()).describe("文章作者"),
  tags: z.array(z.string()).describe("文章标签"),
  date: z.date().describe("发布时间"),
  content: z.string().describe("文章内容"),
  link: z.string().describe("文章链接"),
  content_length: z.string().describe("文章字数"),
  // fn: z.union([z.literal("us"), z.literal("sec")]).describe("魔法函数"),
});

const notStartsWithFilter = defineTypedFn({
  name: "notStartsWith",
  define: z.function().args(z.string(), z.coerce.string()).returns(z.boolean()),
  // Just a placeholder since we don't need filter data at frontend.
  implement: () => false,
});

export const filterFnList: FnSchema[] = [
  ...presetFilter.filter((fn) => fn.name !== "endsWith"),
  notStartsWithFilter,
];

const locale: Record<string, string> = {
  ...zhCN,
  startsWith: "以...开始",
  notStartsWith: "不以...开始",
};

export const getLocaleText = (key: string): string => {
  if (!(key in locale)) return key;
  return locale[key];
};
