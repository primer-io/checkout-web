import { post } from '../utils/post';
import { primerApiUrl, primerHeaders } from './const';

export function createClientSession() {
  return post<ClientSession>(
    `${primerApiUrl}/client-session`,
    {
      amount: 100,
      currencyCode: 'GBP',
      orderId: crypto.randomUUID(),
      order: {
        countryCode: 'GB',
      },
    },
    primerHeaders,
  );
}

export type ClientSession = {
  clientToken: string;
};
