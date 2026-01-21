import { describe, it, expect } from 'vitest';
import { addDateFilterToQuery } from './queryFilter';

describe('addDateFilterToQuery', () => {
  const dateFilter = 'date < sec(2023-01-01)';

  it('should add filter to simple query', () => {
    const result = addDateFilterToQuery('技术', dateFilter);
    expect(result).toBe('技术 (date < sec(2023-01-01))');
  });

  it('should add filter to empty query', () => {
    const result = addDateFilterToQuery('', dateFilter);
    expect(result).toBe('(date < sec(2023-01-01))');
  });

  it('should not duplicate filter if already present', () => {
    const query = '技术 (date < sec(2023-01-01))';
    const result = addDateFilterToQuery(query, dateFilter);
    expect(result).toBe(query);
  });

  it('should combine with existing filter using AND', () => {
    const query = '技术 (author=test)';
    const result = addDateFilterToQuery(query, dateFilter);
    expect(result).toBe('技术 (author=test AND date < sec(2023-01-01))');
  });

  it('should handle query with whitespace', () => {
    const result = addDateFilterToQuery('  技术  ', dateFilter);
    expect(result).toBe('技术 (date < sec(2023-01-01))');
  });
});
