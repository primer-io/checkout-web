import { describe, expect, it, vi } from 'vitest';
import { post } from '../utils/post';
import { createPaymentMethodToken } from './createPaymentMethodToken';

vi.mock('./const', () => ({
  primerSdkApiUrl: 'primerSdkApiUrl',
  primerHeaders: { foo: 'bar' },
}));
vi.mock('../utils/post');

describe('createPaymentMethodToken', () => {
  it('should post correctly', async () => {
    const accessToken = 'accessToken';
    const cardInfo = {
      cardholderName: 'cardholderName',
      cvv: 'cvv',
      expirationMonth: 'expirationMonth',
      expirationYear: 'expirationYear',
      number: 'number',
    };
    const response = { token: 'token' };
    vi.mocked(post).mockResolvedValueOnce(response);

    const result = await createPaymentMethodToken(accessToken, cardInfo);

    expect(result).toBe(response.token);
    expect(post).toBeCalledWith(
      'primerSdkApiUrl/payment-instruments',
      { paymentInstrument: cardInfo },
      {
        foo: 'bar',
        'primer-client-token': accessToken,
      },
    );
  });
});
