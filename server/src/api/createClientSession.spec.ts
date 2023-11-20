import { describe, expect, it, vi } from 'vitest';
import { post } from '../utils/post';
import { createClientSession } from './createClientSession';

vi.mock('./const', () => ({
  primerApiUrl: 'primerApiUrl',
  primerHeaders: { foo: 'bar' },
}));
vi.mock('../utils/post');

describe('createClientSession', () => {
  it('should post correctly', async () => {
    const info = { amount: 100, currencyCode: 'EUR' };
    const response = {};
    vi.mocked(post).mockResolvedValueOnce(response);
    const orderId = 'uuid-1234-4321-asdf-qwer';
    globalThis.crypto = {
      randomUUID: vi.fn().mockReturnValueOnce(orderId),
    } as any;

    const result = await createClientSession(info);

    expect(result).toBe(response);
    expect(post).toBeCalledWith(
      'primerApiUrl/client-session',
      { ...info, orderId },
      { foo: 'bar' },
    );
  });
});
