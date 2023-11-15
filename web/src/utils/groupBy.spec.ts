import { describe, expect, it } from 'vitest';
import { groupBy } from './groupBy';

describe('groupBy', () => {
  it('should group object values by the specified key', () => {
    const result = groupBy([1, 2, 3], (n) => `${n > 2}`);
    expect(result).toStrictEqual({ false: [1, 2], true: [3] });
  });
});
