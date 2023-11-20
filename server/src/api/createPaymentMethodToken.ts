import { post } from '../utils/post';
import { primerHeaders, primerSdkApiUrl } from './const';

export async function createPaymentMethodToken(
  accessToken: string,
  cardInfo: CardInfo,
) {
  const { token } = await post<PaymentInstrument>(
    `${primerSdkApiUrl}/payment-instruments`,
    { paymentInstrument: cardInfo },
    {
      ...primerHeaders,
      'primer-client-token': accessToken,
    },
  );

  return token;
}

type CardInfo = {
  cardholderName: string;
  cvv: string;
  expirationMonth: string;
  expirationYear: string;
  number: string;
};

type PaymentInstrument = {
  token: string;
};
