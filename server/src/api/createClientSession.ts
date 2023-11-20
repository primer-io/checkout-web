import { post } from '../utils/post';
import { primerApiUrl, primerHeaders } from './const';

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
