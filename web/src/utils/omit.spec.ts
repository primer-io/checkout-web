import { describe, expect, it } from 'vitest';
import { omit } from './omit';

describe('omit', () => {
  it('should map the values of an object', () => {
    const result = omit({ foo: 'foo', bar: 'bar' }, 'foo');
    expect(result).toStrictEqual({ bar: 'bar' });
  });
});
