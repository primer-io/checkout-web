import { describe, expect, it } from 'vitest';
import { mapValue } from './mapValue';

describe('mapValue', () => {
  it('should map the values of an object', () => {
    const result = mapValue({ foo: 1, bar: 2 }, (n) => n + 1);
    expect(result).toStrictEqual({ foo: 2, bar: 3 });
  });
});
