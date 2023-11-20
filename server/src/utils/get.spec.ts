import { beforeEach, describe, expect, it, vi } from 'vitest';
import { get } from './get';

describe('get', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn().mockResolvedValue({ json: () => ({}) } as any);
  });

  it('should fetch', async () => {
    const result = await get('url');

    expect(result).toStrictEqual({});
  });

  it('should use specified url and headers', async () => {
    const url = 'url';
    const headers = { foo: 'bar' };

    await get(url, headers);

    expect(fetch).toBeCalledWith(url, { headers });
  });
});
