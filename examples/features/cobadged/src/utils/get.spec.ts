import { beforeEach, describe, expect, it, vi } from 'vitest';
import { get } from './get';

describe('get', () => {
  const fetch = vi.spyOn(globalThis, 'fetch');

  beforeEach(() => {
    vi.clearAllMocks();
    const response = { json: () => ({}) };
    fetch.mockResolvedValue(response as any);
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
