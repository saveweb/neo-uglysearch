import { FilterGroup } from "@fn-sphere/filter";
import { deserializeFilterGroup, serializeFilterGroup } from "./transform";

const STORAGE_KEY = "filter-rule-cache";

export const cacheFilterRule = (query: string, rule: FilterGroup) => {
  if (!("localStorage" in globalThis)) return;
  if (!query) return;

  const obj = {
    key: query,
    value: serializeFilterGroup(rule),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
};

export const getCachedFilterRule = (query: string) => {
  if (!("localStorage" in globalThis)) return;

  const str = localStorage.getItem(STORAGE_KEY);
  if (!str) return null;

  try {
    const obj = JSON.parse(str);
    if (obj.key !== query) return null;
    return deserializeFilterGroup(obj.value);
  } catch (error) {
    console.error("Failed to parse cached filter rule!", str);
    return null;
  }
};
