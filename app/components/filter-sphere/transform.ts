import { FilterGroup, SingleFilter } from "@fn-sphere/filter";

// Define operator mapping
const FILTER_OPERATORS: Record<string, string> = {
  equals: "=",
  notEquals: "!=",
  greaterThan: ">",
  greaterThanOrEqual: ">=",
  lessThan: "<",
  lessThanOrEqual: "<=",
  contains: "CONTAINS",
  notContains: "NOT CONTAINS",
  startsWith: "STARTS WITH",
  notStartsWith: "NOT STARTS WITH",
  in: "IN",
  notIn: "NOT IN",
  isNull: "IS NULL",
  isNotNull: "IS NOT NULL",
  isEmpty: "IS EMPTY",
  isNotEmpty: "IS NOT EMPTY",
  before: "<",
  after: ">",
};

function transformSingleFilter(filter: SingleFilter): string | null {
  const path = filter.path?.[0];
  const value = filter.args[0];
  const operator = filter.name ? FILTER_OPERATORS[filter.name] : undefined;

  if (path === undefined || operator === undefined || value === undefined) {
    return null;
  }

  // Handle array values for IN/NOT IN operators
  if (Array.isArray(value)) {
    return `${path} ${operator} [${value
      .map((v) => (typeof v === "string" ? `${v}` : v))
      .join(", ")}]`;
  }

  // Handle string values
  if (typeof value === "string") {
    return `${path} ${operator} "${value}"`;
  }
  // Handle date values
  if (value instanceof Date) {
    const dateStr = `sec(${value.getFullYear()}-${
      value.getMonth() + 1
    }-${value.getDate()})`;
    return `${path} ${operator} ${dateStr}`;
  }

  return `${path} ${operator} ${value}`;
}

function transformFilterGroup(filterGroup: FilterGroup): string | null {
  if (!filterGroup.conditions.length) return "";

  const conditions = filterGroup.conditions.map((condition) => {
    if (condition.type === "Filter") {
      return transformSingleFilter(condition);
    } else {
      return transformFilterGroup(condition);
    }
  });

  const operator = filterGroup.op.toUpperCase() as Uppercase<FilterGroup["op"]>;
  const result = conditions.filter((i) => i !== null).join(` ${operator} `);
  if (!result) {
    return null;
  }

  return `(${result})`;
}

/**
 * Transforms a FilterGroup object into a query string format for advanced search.
 *
 * @example
 * ```ts
 * filterRuleToQueryString({
 *   type: "FilterGroup",
 *   op: "and",
 *   conditions: [{
 *     type: "Filter",
 *     path: ["title"],
 *     name: "equals",
 *     args: ["hello world"]
 *   }]
 * })
 * // "(title = "hello world")"
 * ```
 */
export const filterRuleToQueryString = (filterGroup: FilterGroup) => {
  return transformFilterGroup(filterGroup) ?? "";
};
