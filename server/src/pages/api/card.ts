import type { APIRoute } from 'astro';
import { createClientSession } from '../../api/createClientSession';
import { createPayment } from '../../api/createPayment';
import { createPaymentMethodToken } from '../../api/createPaymentMethodToken';
import { parseAccessToken } from '../../utils/parseAccessToken';

export const POST: APIRoute = async ({ request }) => {
  const data = Object.fromEntries(await request.formData()) as Obj;

  if (!data)
    return new Response(
      JSON.stringify({ message: 'Missing required fields' }),
      { status: 400 },
    );

  const [expirationMonth, year] = data.expiryDate.trim().split('/');

  const { clientToken } = await createClientSession({
    amount: 100,
    currencyCode: 'GBP',
  });
  const accessToken = parseAccessToken(clientToken);

  const paymentMethodToken = await createPaymentMethodToken(accessToken, {
    cardholderName: data.name,
    cvv: data.securityCode.trim(),
    expirationMonth,
    expirationYear: `${new Date().getFullYear().toString().slice(0, 2)}${year}`,
    number: data.cardNumber.replaceAll(/\s/g, ''),
  });

  const response = await createPayment(accessToken, paymentMethodToken);

  return new Response(JSON.stringify(response, null, 2), { status: 200 });
};

type Obj = Record<string, string>;
