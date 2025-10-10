import { describe, it, expect } from "vitest";
import {
  deserializeFilterGroup,
  filterRuleToQueryString,
  serializeFilterGroup,
} from "./transform";
import type { FilterGroup } from "@fn-sphere/filter";

describe("filterRuleToQueryString", () => {
  it("should transform simple equals filter", () => {
    const filter: FilterGroup = {
      id: "0" as FilterGroup["id"],
      type: "FilterGroup",
      op: "and",
      conditions: [
        {
          id: "1" as FilterGroup["id"],
          type: "Filter",
          path: ["title"],
          name: "equals",
          args: ["hello world"],
        },
      ],
    };
    expect(filterRuleToQueryString(filter)).toBe('(title = "hello world")');
  });

  it("should handle multiple conditions with AND", () => {
    const filter: FilterGroup = {
      id: "0" as FilterGroup["id"],
      type: "FilterGroup",
      op: "and",
      conditions: [
        {
          id: "1" as FilterGroup["id"],
          type: "Filter",
          path: ["title"],
          name: "startsWith",
          args: ["2025"],
        },
        {
          id: "2" as FilterGroup["id"],
          type: "Filter",
          path: ["content_length"],
          name: "lessThan",
          args: [10],
        },
      ],
    };
    expect(filterRuleToQueryString(filter)).toBe(
      '(title STARTS WITH "2025" AND content_length < 10)'
    );
  });

  it("should handle nested filter groups", () => {
    const filter: FilterGroup = {
      id: "0" as FilterGroup["id"],
      type: "FilterGroup",
      op: "or",
      conditions: [
        {
          id: "1" as FilterGroup["id"],
          type: "FilterGroup",
          op: "and",
          conditions: [
            {
              id: "1" as FilterGroup["id"],
              type: "Filter",
              path: ["title"],
              name: "startsWith",
              args: ["2025"],
            },
            {
              id: "2" as FilterGroup["id"],
              type: "Filter",
              path: ["content_length"],
              name: "lessThan",
              args: [10],
            },
          ],
        },
        {
          id: "4" as FilterGroup["id"],
          type: "Filter",
          path: ["id"],
          name: "equals",
          args: ["1726778286371046"],
        },
      ],
    };
    expect(filterRuleToQueryString(filter)).toBe(
      '((title STARTS WITH "2025" AND content_length < 10) OR id = "1726778286371046")'
    );
  });

  it("should handle tag for CONTAINS operator", () => {
    const filter: FilterGroup = {
      id: "0" as FilterGroup["id"],
      type: "FilterGroup",
      op: "and",
      conditions: [
        {
          id: "1" as FilterGroup["id"],
          type: "Filter",
          path: ["tags"],
          name: "contains",
          args: ["ctf"],
        },
      ],
    };
    expect(filterRuleToQueryString(filter)).toBe(`(tags CONTAINS "ctf")`);
  });

  it("should handle date values", () => {
    const date = new Date(2024, 0, 1); // January 1, 2024
    const filter: FilterGroup = {
      id: "0" as FilterGroup["id"],
      type: "FilterGroup",
      op: "and",
      conditions: [
        {
          id: "1" as FilterGroup["id"],
          type: "Filter",
          path: ["createdAt"],
          name: "before",
          args: [date],
        },
      ],
    };
    expect(filterRuleToQueryString(filter)).toBe("(createdAt < sec(2024-1-1))");
  });

  it("should handle unary filter cases", () => {
    const filter: FilterGroup = {
      id: "0" as FilterGroup["id"],
      type: "FilterGroup",
      op: "and",
      conditions: [
        {
          id: "1" as FilterGroup["id"],
          type: "Filter",
          path: ["title"],
          name: "isEmpty",
          args: [],
        },
      ],
    };

    expect(filterRuleToQueryString(filter)).toBe("(title IS EMPTY)");
  });

  it("should return empty string for empty filter", () => {
    const filter: FilterGroup = {
      id: "0" as FilterGroup["id"],
      type: "FilterGroup",
      op: "and",
      conditions: [
        {
          id: "1" as FilterGroup["id"],
          type: "Filter",
          path: ["title"],
          name: "equals",
          args: [],
        },
      ],
    };

    expect(filterRuleToQueryString(filter)).toBe("");
  });

  it("should return empty string for empty filter group", () => {
    const filter: FilterGroup = {
      id: "0" as FilterGroup["id"],
      type: "FilterGroup",
      op: "and",
      conditions: [],
    };
    expect(filterRuleToQueryString(filter)).toBe("");
  });
});

describe("FilterGroup Serialization", () => {
  it("should serialize and deserialize a basic FilterGroup", () => {
    const filter: FilterGroup = {
      id: "0" as FilterGroup["id"],
      type: "FilterGroup",
      op: "and",
      conditions: [
        {
          id: "1" as FilterGroup["id"],
          type: "Filter",
          path: ["title"],
          name: "equals",
          args: ["test"],
        },
      ],
    };

    const serialized = serializeFilterGroup(filter);
    const deserialized = deserializeFilterGroup(serialized);
    expect(deserialized).toEqual(filter);
  });

  it("should handle Date objects in args correctly", () => {
    const date = new Date("2024-03-15T12:00:00Z");
    const filter: FilterGroup = {
      id: "0" as FilterGroup["id"],
      type: "FilterGroup",
      op: "and",
      conditions: [
        {
          id: "1" as FilterGroup["id"],
          type: "Filter",
          path: ["createdAt"],
          name: "equals",
          args: [date],
        },
      ],
    };

    const serialized = serializeFilterGroup(filter);
    const deserialized = deserializeFilterGroup(serialized);
    expect((deserialized.conditions[0] as any).args[0]).toBeInstanceOf(Date);
    expect((deserialized.conditions[0] as any).args[0].toISOString()).toBe(
      date.toISOString()
    );
  });
});
