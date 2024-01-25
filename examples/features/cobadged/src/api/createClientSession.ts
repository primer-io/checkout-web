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

      // emailAddress and billingAddress are required for 3DS
      customer: {
        emailAddress: 'test@test.com',
        mobileNumber: '+6588889999',
        firstName: 'John',
        lastName: 'Smith',
        billingAddress: {
          firstName: 'John',
          lastName: 'Smith',
          postalCode: 'CB94BQ',
          addressLine1: '47A',
          countryCode: 'CL',
          city: 'Cambridge',
          state: 'Cambridgeshire',
        },
      },

      paymentMethod: {
        orderedAllowedCardNetworks: ['CARTES_BANCAIRES', 'VISA', 'MASTERCARD'],
      },
    },
    primerHeaders,
  );
}

export type ClientSession = {
  clientToken: string;
};
