import { beforeEach, describe, expect, it, vi } from 'vitest';
import { post } from './post';

describe('post', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const response = { json: () => {} };
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(response as any);
  });

  it('should read JSON from the response', async () => {
    const result = await post('url', {});

    expect(result).toStrictEqual({});
  });

  it('should use POST method, and specified url, body and headers', async () => {
    const url = 'url';
    const body = { foo: 'bar' };
    const headers = { bar: 'foo' };

    await post(url, body, headers);

    expect(fetch).toBeCalledWith(url, {
      body: JSON.stringify(body),
      headers,
      method: 'POST',
    });
  });

  it.only('should handle errors', async () => {
    const error = { description: 'description' };
    vi.mocked(fetch).mockResolvedValueOnce({ json: () => ({ error }) } as any);

    const act = post('url', {});

    await expect(act).rejects.toThrow(
      new Error(error.description, { cause: error }),
    );
  });
});
