import { webcrypto } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { uid } from './uid';

describe('uid', () => {
  beforeAll(() => {
    globalThis.crypto = webcrypto as any;
  });

  it('should create a string comprised only of alphanumeric characters', () => {
    const result = uid();
    expect(result).toMatch(/^[0-9a-z]+$/);
  });

  it('should have the speficied length', () => {
    const { length } = uid(3);
    expect(length).toBe(3);
  });

  it('should default to length 8', () => {
    const { length } = uid();
    expect(length).toBe(8);
  });
});
