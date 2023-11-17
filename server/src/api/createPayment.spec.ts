import { describe, expect, it, vi } from 'vitest';
import { post } from '../utils/post';
import { createPayment } from './createPayment';

vi.mock('./const', () => ({
  primerSdkApiUrl: 'primerSdkApiUrl',
  primerHeaders: { foo: 'bar' },
}));
vi.mock('../utils/post');

describe('createPayment', () => {
  it('should post correctly', async () => {
    const accessToken = 'accessToken';
    const paymentMethodToken = 'paymentMethodToken';
    const response = {};
    vi.mocked(post).mockResolvedValueOnce(response);

    const result = await createPayment(accessToken, paymentMethodToken);

    expect(result).toBe(response);
    expect(post).toBeCalledWith(
      'primerSdkApiUrl/payments',
      { paymentMethodToken },
      {
        foo: 'bar',
        'primer-client-token': accessToken,
      },
    );
  });
});
