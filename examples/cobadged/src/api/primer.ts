import { Primer } from '@primer-io/checkout-web';

const token = '';
const primer = await Primer.createHeadless(token);

primer.configure({
  async onAvailablePaymentMethodsLoad(paymentMethods) {
    for (const paymentMethod of paymentMethods)
      switch (paymentMethod.managerType) {
        case 'CARD': {
          const cardManager =
            await primer.createPaymentMethodManager('PAYMENT_CARD');
          const { cardNumberInput, cvvInput, expiryInput } =
            cardManager?.createHostedInputs() ?? {};

          const cardForm = document.querySelector('#card') as HTMLFormElement;

          cardForm
            .querySelector('button')
            ?.addEventListener('submit', (event) => {
              event.preventDefault();
              cardManager?.submit();
            });

          cardNumberInput?.render('#card-number', {});
          cvvInput?.render('#card-security-code', {});
          expiryInput?.render('#card-expiry', {});

          break;
        }
        case 'NATIVE':
        case 'REDIRECT': {
          // ignoring these types for simplicity in this example.
          // make sure you implement them in case you're using such payment types.
          break;
        }
        default:
          throw new Error(
            `Type of payment method manager not supported: ${paymentMethod.managerType}`,
          );
      }
  },
});

primer.start();
