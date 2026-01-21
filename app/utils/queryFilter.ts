/**
 * Utility functions for combining search queries with filters
 */

/**
 * Checks if a query already contains a specific date filter
 * Uses more specific matching to avoid false positives
 */
function hasDateFilter(query: string, dateFilter: string): boolean {
  // Escape all special regex characters including backslash
  const escaped = dateFilter.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
  // Match the filter when it's wrapped in parentheses
  const filterPattern = new RegExp(`\\(${escaped}\\)`, 'i');
  return filterPattern.test(query);
}

/**
 * Combines a search query with a date filter
 * @param query - The original search query
 * @param dateFilter - The date filter expression to add
 * @returns The combined query with the date filter applied
 */
export function addDateFilterToQuery(query: string, dateFilter: string): string {
  const trimmedQuery = query.trim();
  const filterExpression = `(${dateFilter})`;
  
  // Check if the query already contains the date filter
  if (hasDateFilter(trimmedQuery, dateFilter)) {
    return trimmedQuery;
  }
  
  // Check if current query already has a filter (ends with parenthesis)
  if (trimmedQuery.endsWith(")")) {
    // Extract simple query and existing filter
    const firstParen = trimmedQuery.indexOf("(");
    if (firstParen !== -1) {
      const simpleQuery = trimmedQuery.substring(0, firstParen).trim();
      const existingFilter = trimmedQuery.substring(firstParen);
      // Combine filters with AND
      const combinedFilter = `(${existingFilter.slice(1, -1)} AND ${dateFilter})`;
      return simpleQuery ? `${simpleQuery} ${combinedFilter}` : combinedFilter;
    }
    // Should not happen, but fallback
    return `${trimmedQuery} ${filterExpression}`;
  }
  
  // Simple query or empty, append filter
  return trimmedQuery ? `${trimmedQuery} ${filterExpression}` : filterExpression;
}
