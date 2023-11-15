import { post } from '../utils/post.js';
import { primerApiUrl, primerHeaders } from './const.js';

export function createClientSession(info: Info) {
  return post<ClientSession>(
    `${primerApiUrl}/client-session`,
    {
      ...info,
      orderId: crypto.randomUUID(),
    },
    primerHeaders,
  );
}

type Info = {
  amount: number;
  currencyCode: string;
};

type ClientSession = {
  clientToken: string;
};
